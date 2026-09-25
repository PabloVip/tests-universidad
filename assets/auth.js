/* Guardia de sesión para páginas protegidas.
   El servidor ya bloquea a no autenticados (302 a login.html);
   esto solo mejora la UX: redirige si la sesión caducó y añade botón Salir. */
(function () {
  if (location.pathname.endsWith("login.html")) return;
  fetch("api/me", { credentials: "same-origin" }).then(function (r) {
    if (r.status === 401) {
      location.replace("login.html?next=" + encodeURIComponent(location.pathname.split("/").pop() || "index.html"));
      return null;
    }
    return r.json();
  }).then(function (me) {
    if (!me || !me.user) return;
    document.addEventListener("DOMContentLoaded", function () {
      var wrap = document.querySelector(".topbar .wrap");
      if (!wrap || document.getElementById("logoutBtn")) return;
      var btn = document.createElement("button");
      btn.id = "logoutBtn";
      btn.className = "btn small";
      btn.type = "button";
      btn.textContent = "Salir (" + me.user + ")";
      btn.addEventListener("click", function () {
        fetch("api/logout", { method: "POST", credentials: "same-origin" })
          .finally(function () { location.replace("login.html"); });
      });
      wrap.appendChild(btn);
    });
  }).catch(function () {});
})();
