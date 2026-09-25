#!/usr/bin/env python3
"""Servidor con login para tests-universidad.

Solo stdlib (sin dependencias). Sirve los HTML solo a usuarios autenticados.

Uso:
    python3 server.py                       # arranca en http://127.0.0.1:8000
    python3 server.py --host 0.0.0.0 --port 8000
    python3 server.py --add-user maria       # crea/actualiza un usuario (pide contraseña)
    python3 server.py --list-users           # lista usuarios

Seguridad:
    - Contraseñas con PBKDF2-HMAC-SHA256 (210.000 iteraciones) + salt aleatoria.
    - Sesiones opacas (secrets.token_urlsafe) en cookie HttpOnly + SameSite=Lax.
    - Rate-limit: 5 intentos fallidos por IP => bloqueo 15 min.
    - Cabeceras de seguridad + no-cache en HTML privados.
    - Sin HTTPS las contraseñas viajan en claro: en LAN casera vale HTTP;
      para acceso desde internet usa un túnel TLS (Tailscale, Cloudflare Tunnel, Caddy...).

IMPORTANTE: este login solo protege ESTE servidor. Si GitHub Pages sigue
activo (https://pablovip.github.io/tests-universidad/) cualquiera puede entrar
por ahí sin login. Desactívalo (ver README_LOGIN.md) y valora hacer el repo
privado: con el repo en público cualquiera puede clonar los HTML.
"""

import argparse
import base64
import getpass
import hashlib
import hmac
import html
import json
import mimetypes
import os
import secrets
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

BASE_DIR = Path(__file__).resolve().parent
USERS_FILE = BASE_DIR / "users.json"
SESSION_HOURS = float(os.environ.get("SESSION_HOURS", "12"))
MAX_FAILS = 5
BLOCK_SECONDS = 15 * 60

sessions: dict = {}          # token -> {"user": str, "exp": float}
sessions_lock = threading.Lock()
fails: dict = {}             # ip -> {"count": int, "blocked_until": float}
fails_lock = threading.Lock()


# ---------- usuarios / hashing ----------

def hash_password(password: str, iterations: int = 210_000) -> dict:
    salt = secrets.token_bytes(32)
    dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iterations)
    return {
        "salt": salt.hex(),
        "hash": dk.hex(),
        "iterations": iterations,
    }


def verify_password(password: str, rec: dict) -> bool:
    try:
        salt = bytes.fromhex(rec["salt"])
        expected = bytes.fromhex(rec["hash"])
        iters = int(rec.get("iterations", 210_000))
    except (KeyError, ValueError, TypeError):
        return False
    dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, iters)
    return hmac.compare_digest(dk, expected)


def load_users(path: Path = USERS_FILE) -> dict:
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def save_users(users: dict, path: Path = USERS_FILE) -> None:
    tmp = path.with_suffix(".tmp")
    tmp.write_text(json.dumps(users, indent=2) + "\n", encoding="utf-8")
    os.chmod(tmp, 0o600)
    tmp.replace(path)
    try:
        os.chmod(path, 0o600)
    except OSError:
        pass


# ---------- sesiones / rate-limit ----------

def create_session(username: str) -> str:
    token = secrets.token_urlsafe(32)
    with sessions_lock:
        sessions[token] = {"user": username, "exp": time.time() + SESSION_HOURS * 3600}
    return token


def get_session_user(token: str | None) -> str | None:
    if not token:
        return None
    now = time.time()
    with sessions_lock:
        s = sessions.get(token)
        if not s:
            return None
        if s["exp"] < now:
            del sessions[token]
            return None
        s["exp"] = now + SESSION_HOURS * 3600  # deslizante
        return s["user"]


def destroy_session(token: str | None) -> None:
    if not token:
        return
    with sessions_lock:
        sessions.pop(token, None)


def is_blocked(ip: str) -> bool:
    with fails_lock:
        r = fails.get(ip)
        return bool(r and r.get("blocked_until", 0) > time.time())


def register_fail(ip: str) -> None:
    now = time.time()
    with fails_lock:
        r = fails.setdefault(ip, {"count": 0, "blocked_until": 0})
        if r.get("blocked_until", 0) > now:
            return
        r["count"] = r.get("count", 0) + 1
        if r["count"] >= MAX_FAILS:
            r["blocked_until"] = now + BLOCK_SECONDS
            r["count"] = 0


def clear_fails(ip: str) -> None:
    with fails_lock:
        fails.pop(ip, None)


# ---------- servidor HTTP ----------

PUBLIC_EXACT = {"/login.html", "/assets/styles.css", "/assets/app.js", "/favicon.ico"}
PUBLIC_PREFIX = ("/api/",)


class Handler(BaseHTTPRequestHandler):
    server_version = "TestsUni/1.0"

    def log_message(self, fmt, *args):
        pass  # silencioso; cambiar a print si se quiere log

    # -- helpers --
    def _cookies(self) -> dict:
        out = {}
        raw = self.headers.get("Cookie", "")
        for part in raw.split(";"):
            if "=" in part:
                k, v = part.strip().split("=", 1)
                out[k.strip()] = v.strip()
        return out

    def _send_json(self, code: int, obj: dict, extra_headers: list | None = None):
        body = json.dumps(obj).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self._security_headers(api=True)
        for k, v in extra_headers or []:
            self.send_header(k, v)
        self.end_headers()
        self.wfile.write(body)

    def _security_headers(self, api: bool = False):
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("X-Frame-Options", "DENY")
        self.send_header("Referrer-Policy", "no-referrer")
        if api:
            self.send_header("Cache-Control", "no-store")

    def _serve_file(self, rel: str, no_store: bool = False):
        # evita directory traversal
        target = (BASE_DIR / rel.lstrip("/")).resolve()
        if BASE_DIR not in target.parents and target != BASE_DIR:
            self.send_error(403)
            return
        if target.is_dir():
            target = target / "index.html"
        if not target.is_file():
            self.send_error(404)
            return
        ctype, _ = mimetypes.guess_type(str(target))
        data = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", ctype or "application/octet-stream")
        self.send_header("Content-Length", str(len(data)))
        self._security_headers()
        self.send_header("Cache-Control", "no-store" if no_store else "private, max-age=3600")
        self.end_headers()
        self.wfile.write(data)

    def _redirect_login(self, path: str):
        loc = "/login.html?next=" + path
        self.send_response(302)
        self.send_header("Location", loc)
        self._security_headers(api=True)
        self.end_headers()

    # -- rutas --
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path or "/"
        if path == "/":
            path = "/index.html"

        if path == "/api/me":
            user = get_session_user(self._cookies().get("tu_session"))
            if user:
                self._send_json(200, {"user": user})
            else:
                self._send_json(401, {"error": "no autenticado"})
            return

        if path in PUBLIC_EXACT or path.startswith(PUBLIC_PREFIX):
            if path.startswith("/api/"):
                self._send_json(404, {"error": "no encontrado"})
                return
            self._serve_file(path)
            return

        user = get_session_user(self._cookies().get("tu_session"))
        if not user:
            self._redirect_login(path)
            return
        self._serve_file(path, no_store=True)

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path or "/"
        ip = self.client_address[0]

        if path == "/api/login":
            if is_blocked(ip):
                self._send_json(429, {"error": "Demasiados intentos. Espera 15 minutos."})
                return
            length = int(self.headers.get("Content-Length", 0) or 0)
            if length > 4096:
                self._send_json(413, {"error": "petición demasiado grande"})
                return
            try:
                payload = json.loads(self.rfile.read(length) or b"{}")
            except (json.JSONDecodeError, OSError):
                self._send_json(400, {"error": "JSON inválido"})
                return
            username = str(payload.get("username", "")).strip()
            password = str(payload.get("password", ""))
            users = load_users()
            rec = users.get(username)
            # comparación en tiempo ~constante aunque el usuario no exista
            ok = verify_password(password, rec) if rec else False
            if not rec:
                hashlib.pbkdf2_hmac("sha256", b"x", b"0" * 32, 10_000)
            if not ok:
                register_fail(ip)
                # mensaje genérico: no revela si el usuario existe
                self._send_json(401, {"error": "Usuario o contraseña incorrectos"})
                return
            clear_fails(ip)
            token = create_session(username)
            max_age = int(SESSION_HOURS * 3600)
            cookie = f"tu_session={token}; HttpOnly; Path=/; SameSite=Lax; Max-Age={max_age}"
            self._send_json(200, {"ok": True, "user": username}, [("Set-Cookie", cookie)])
            return

        if path == "/api/logout":
            destroy_session(self._cookies().get("tu_session"))
            self._send_json(
                200, {"ok": True},
                [("Set-Cookie", "tu_session=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0")],
            )
            return

        self._send_json(404, {"error": "no encontrado"})


def run(host: str, port: int):
    users = load_users()
    print(f"Usuarios cargados: {len(users)} ({', '.join(sorted(users)) or 'ninguno'})")
    if not users:
        print("AVISO: no hay usuarios. Crea uno con:  python3 server.py --add-user <nombre>")
    print(f"Sirviendo {BASE_DIR} en http://{host}:{port}  (Ctrl+C para parar)")
    ThreadingHTTPServer((host, port), Handler).serve_forever()


def cmd_add_user(username: str):
    users = load_users()
    if username in users:
        print(f"El usuario '{username}' ya existe: se actualizará su contraseña.")
    pw = getpass.getpass(f"Contraseña para '{username}': ")
    pw2 = getpass.getpass("Repite la contraseña: ")
    if pw != pw2:
        print("ERROR: no coinciden.")
        raise SystemExit(1)
    if len(pw) < 8:
        print("ERROR: mínimo 8 caracteres.")
        raise SystemExit(1)
    users[username] = hash_password(pw)
    save_users(users)
    print(f"Usuario '{username}' guardado en users.json.")


def main():
    ap = argparse.ArgumentParser(description="Servidor con login para tests-universidad")
    ap.add_argument("--host", default=os.environ.get("HOST", "127.0.0.1"))
    ap.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8000")))
    ap.add_argument("--add-user", metavar="NOMBRE", help="crear/actualizar un usuario")
    ap.add_argument("--list-users", action="store_true", help="listar usuarios")
    args = ap.parse_args()
    if args.add_user:
        cmd_add_user(args.add_user.strip())
    elif args.list_users:
        for u in sorted(load_users()):
            print(u)
    else:
        run(args.host, args.port)


if __name__ == "__main__":
    main()
