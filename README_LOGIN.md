# Acceso privado con login (servidor)

El contenido se sirve con `server.py` (solo librería estándar de Python,
sin dependencias). Sin sesión válida el servidor no entrega ninguna página:
redirige a `login.html`.

## 1. Crear usuarios (uno por compañero)

```bash
cd ~/Proyectos/tests-universidad
python3 server.py --add-user pablo     # pide contraseña (mín. 8 caracteres)
python3 server.py --add-user maria
python3 server.py --list-users         # comprobar
```

Las contraseñas se guardan en `users.json` como hash PBKDF2-SHA256
(210.000 iteraciones + salt). Ese archivo **no se sube a git**
(está en `.gitignore`).

## 2. Arrancar el servidor

```bash
# solo este equipo:
python3 server.py

# accesible en tu red local (tus compañeros entran con tu IP:8000):
python3 server.py --host 0.0.0.0 --port 8000
```

Luego abre `http://localhost:8000` (o `http://TU-IP:8000`).

## 3. MUY IMPORTANTE: cerrar la vía pública de GitHub Pages

Mientras `https://pablovip.github.io/tests-universidad/` siga activa,
**cualquiera entra sin login** por ahí. Desactivarla:

```bash
gh api -X DELETE repos/PabloVip/tests-universidad/pages
```

Y para que nadie pueda clonar los HTML aunque desactives Pages,
haz el repo privado:

```bash
gh repo edit PabloVip/tests-universidad --visibility private
```

(Ojo: al hacerlo privado, `git pull/push` siguen funcionando igual;
solo cambia quién puede verlo en GitHub.)

## 4. Seguridad incluida

- Rate-limit: 5 fallos por IP → bloqueo 15 min (código 429).
- Cookies de sesión `HttpOnly` + `SameSite=Lax`, caducidad deslizante (12 h,
  configurable con `SESSION_HOURS=24 python3 server.py`).
- Cabeceras `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `no-store` en HTML privados y API.
- Mensaje de login genérico (no revela si el usuario existe).

## 5. Acceso desde fuera de casa (opcional)

HTTP en texto plano vale en tu LAN, pero **no lo expongas directo a
internet**. Opciones seguras: Tailscale, Cloudflare Tunnel o Caddy
(terminan TLS por ti). El servidor escucha en `127.0.0.1` por defecto
precisamente para no exponerse sin querer.

## 6. Despliegue permanente en Render (gratis, con login)

El repo ya lleva `render.yaml` (Blueprint) y `server.py` lee los
usuarios desde la variable de entorno `USERS_JSON` (sin subir
contraseñas a git):

```bash
# genera el valor para USERS_JSON (una línea, pégala en Render):
python3 -c "import json; print(json.dumps(json.load(open('users.json'))))"
```

Pasos: crea cuenta en Render → New → Blueprint → conecta el repo
`tests-universidad` → pega `USERS_JSON` en Environment → Deploy.
Te dará una URL `https://tests-universidad.onrender.com` con tu login
delante. (En plan gratis el servicio se duerme tras inactividad y
tarda ~1 min en despertar con la primera visita.)
