/* Tests de Universidad — utilidades comunes (tema claro/oscuro + barra superior).
   Se carga en <head> sin defer para aplicar el tema antes de pintar. */
(function () {
  var KEY = "tu-theme";
  var root = document.documentElement;

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch (e) {} }
  function systemDark() { return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches; }
  function current() { return root.getAttribute("data-theme") || (systemDark() ? "dark" : "light"); }

  var s = stored();
  if (s === "dark" || s === "light") root.setAttribute("data-theme", s);

  var SUN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

  function paintBtn(btn) {
    var dark = current() === "dark";
    btn.innerHTML = dark ? SUN : MOON;
    btn.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    btn.title = btn.getAttribute("aria-label");
  }

  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* Prefijo hacia la raíz según la profundidad de la página (detrás de carpetas como ABD/). */
  var PREFIX = (function () {
    try {
      var src = (document.currentScript && document.currentScript.getAttribute("src")) || "";
      return src.replace(/assets\/app\.js.*$/, "");
    } catch (e) { return ""; }
  })();

  document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    if (body.hasAttribute("data-no-topbar")) return;
    var crumb = body.getAttribute("data-crumb") || "";
    var bar = document.createElement("header");
    bar.className = "topbar";
    bar.innerHTML =
      '<div class="wrap">' +
      '<a class="brand" href="' + PREFIX + 'index.html">Mis Tests</a>' +
      '<span class="crumb">' + (crumb ? '<a href="' + PREFIX + 'index.html">Inicio</a> / ' + esc(crumb) : "") + "</span>" +
      '<button class="icon-btn" type="button" id="themeBtn"></button>' +
      "</div>";
    body.insertBefore(bar, body.firstChild);
    var btn = document.getElementById("themeBtn");
    paintBtn(btn);
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save(next);
      paintBtn(btn);
    });
  });

  /* Almacenamiento seguro reutilizable por el resto de scripts */
  window.TUStore = {
    get: function (k) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
})();
