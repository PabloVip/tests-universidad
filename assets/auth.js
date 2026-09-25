/* Puerta de acceso simple para GitHub Pages (DISUASORIA, no es seguridad).
   El contenido sigue siendo público: cualquiera puede ver el código fuente
   o pedir los HTML directamente. Solo evita visitas casuales. */
(function () {
  var KEY = "tu-gate";
  var CODE = [50, 57, 50, 48]; // contraseña en códigos de carácter

  function authenticated() {
    try { return sessionStorage.getItem(KEY) === "1"; } catch (e) { return false; }
  }

  function check(pw) {
    if (!pw || pw.length !== CODE.length) return false;
    for (var i = 0; i < CODE.length; i++) {
      if (pw.charCodeAt(i) !== CODE[i]) return false;
    }
    return true;
  }

  function addLogoutBtn() {
    document.addEventListener("DOMContentLoaded", function () {
      var wrap = document.querySelector(".topbar .wrap");
      if (!wrap || document.getElementById("lockBtn")) return;
      var btn = document.createElement("button");
      btn.id = "lockBtn";
      btn.className = "btn small";
      btn.type = "button";
      btn.textContent = "Bloquear";
      btn.addEventListener("click", function () {
        try { sessionStorage.removeItem(KEY); } catch (e) {}
        location.reload();
      });
      wrap.appendChild(btn);
    });
  }

  if (authenticated()) { addLogoutBtn(); return; }

  // Oculta el contenido hasta verificar (el script carga en <head>).
  var hide = document.createElement("style");
  hide.textContent = "body{visibility:hidden}";
  (document.head || document.documentElement).appendChild(hide);

  function gate() {
    var ov = document.createElement("div");
    ov.id = "gate";
    ov.innerHTML =
      '<div class="gate-card">' +
      '<span class="eyebrow">Grado en Ingeniería Informática</span>' +
      "<h1>Contenido privado</h1>" +
      '<p class="sub">Introduce la contraseña para entrar.</p>' +
      '<p class="login-err" id="gateErr" role="alert"></p>' +
      '<form id="gateForm">' +
      '<div class="field"><label for="gatePw">Contraseña</label>' +
      '<input id="gatePw" type="password" autocomplete="off" required autofocus></div>' +
      '<button class="btn primary" type="submit" style="width:100%">Entrar</button>' +
      "</form></div>";
    document.body.appendChild(ov);
    hide.textContent = "body> :not(#gate){display:none}";

    var form = document.getElementById("gateForm");
    var pw = document.getElementById("gatePw");
    var err = document.getElementById("gateErr");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (check(pw.value)) {
        try { sessionStorage.setItem(KEY, "1"); } catch (ex) {}
        ov.remove();
        hide.remove();
        location.reload();
      } else {
        err.textContent = "Contraseña incorrecta";
        err.classList.add("show");
        pw.value = "";
        pw.focus();
      }
    });
    pw.focus();
  }

  var css = document.createElement("style");
  css.textContent =
    "#gate{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;" +
    "background:var(--bg);padding:16px;visibility:visible}" +
    ".gate-card{background:var(--surface);border:1px solid var(--border);" +
    "border-radius:var(--radius);box-shadow:var(--shadow);" +
    "padding:28px 26px;width:100%;max-width:400px}" +
    ".gate-card h1{font-size:1.4rem;margin:0 0 4px}" +
    ".gate-card p.sub{color:var(--muted);margin:0 0 18px;font-size:.93rem}" +
    ".gate-card .field{margin-bottom:14px}" +
    ".gate-card label{display:block;font-weight:600;font-size:.9rem;margin-bottom:6px}" +
    ".gate-card input{width:100%;font:inherit;padding:10px 12px;" +
    "border:1px solid var(--border);border-radius:10px;" +
    "background:var(--surface);color:var(--text)}" +
    ".gate-card .login-err{display:none;margin:0 0 14px;padding:10px 12px;font-size:.9rem;" +
    "border-radius:10px;background:var(--ko-soft);color:var(--ko)}" +
    ".gate-card .login-err.show{display:block}";
  (document.head || document.documentElement).appendChild(css);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", gate);
  } else {
    gate();
  }
})();
