/* ==========================================================
   Motor de tests — Tests de Universidad
   Uso: definir window.TEST = { id, cats:[...], qs:[{cat, t, o:[...], e}] }
   IMPORTANTE: en los datos, la opción CORRECTA es SIEMPRE la primera (o[0]).
   El motor baraja las opciones al mostrarlas, así que en pantalla nunca
   está en la misma posición. El progreso se guarda en el navegador.
   ========================================================== */
(function () {
  var T = window.TEST;
  var app = document.getElementById("app");
  if (!T || !app) return;

  var N = T.qs.length;
  var KEY = "tu-test:" + T.id;
  var SUM = "tu-sum:" + T.id;
  var LET = ["a", "b", "c", "d", "e", "f"];
  var store = window.TUStore || { get: function () { return null; }, set: function () {}, del: function () {} };

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function range(n) { var r = []; for (var i = 0; i < n; i++) r.push(i); return r; }
  function freshPerm(i) { return shuffle(range(T.qs[i].o.length)); }

  /* ---------- Estado ---------- */
  var st = store.get(KEY);
  function valid(s) { return s && s.v === 2 && s.perm && s.perm.length === N; }
  if (!valid(st)) {
    st = { v: 2, perm: T.qs.map(function (q, i) { return freshPerm(i); }), ans: {}, random: false, qorder: null, filter: "all" };
  }
  function save() {
    store.set(KEY, st);
    var c = counts();
    store.set(SUM, { done: c.done, ok: c.ok, total: N });
  }

  function counts() {
    var done = 0, ok = 0, perCat = T.cats.map(function () { return { done: 0, ok: 0, total: 0 }; });
    T.qs.forEach(function (q, i) {
      perCat[q.cat].total++;
      if (st.ans[i] !== undefined) {
        done++; perCat[q.cat].done++;
        if (st.ans[i] === 0) { ok++; perCat[q.cat].ok++; }
      }
    });
    return { done: done, ok: ok, ko: done - ok, perCat: perCat };
  }

  /* ---------- Render ---------- */
  function qCard(i, pos) {
    var q = T.qs[i];
    var html = '<article class="q" id="q' + i + '" data-i="' + i + '">';
    html += '<div class="q-top"><span>Pregunta ' + pos + " de " + N + '</span><span class="verdict" aria-live="polite"></span></div>';
    html += '<div class="q-text" id="qt' + i + '">' + q.t + "</div>";
    html += '<fieldset class="opts" aria-labelledby="qt' + i + '">';
    st.perm[i].forEach(function (orig, k) {
      html += '<label class="opt" data-o="' + orig + '">' +
        '<input type="radio" name="r' + i + '" value="' + orig + '">' +
        '<span class="letter">' + LET[k] + ")</span><span>" + q.o[orig] + "</span></label>";
    });
    html += "</fieldset>";
    html += '<div class="explain" hidden></div>';
    html += "</article>";
    return html;
  }

  function render() {
    var html = "";
    html += '<div class="test-bar"><div class="row">' +
      '<span class="stats"><b id="sDone">0</b>/' + N + " respondidas</span>" +
      '<div class="track" aria-hidden="true"><div class="f-ok" id="fOk"></div><div class="f-ko" id="fKo"></div></div>' +
      '<span class="stats ok">✓ <b id="sOk">0</b></span><span class="stats ko">✗ <b id="sKo">0</b></span>' +
      "</div></div>" +
      '<div class="filters" role="group" aria-label="Filtrar preguntas">' +
      '<button class="btn small" data-f="all">Todas</button>' +
      '<button class="btn small" data-f="pending">Pendientes</button>' +
      '<button class="btn small" data-f="wrong">Falladas</button>' +
      '<button class="btn small" id="bRandom" aria-pressed="' + (st.random ? "true" : "false") + '">Orden aleatorio</button>' +
      "</div>";

    html += '<div id="result"></div>';

    if (st.random) {
      if (!st.qorder || st.qorder.length !== N) st.qorder = shuffle(range(N));
      html += '<section class="cat" data-cat="all"><h2 class="cat-title">Todas las secciones mezcladas</h2>';
      st.qorder.forEach(function (i, p) { html += qCard(i, p + 1); });
      html += "</section>";
    } else {
      var pos = 0;
      html += '<nav class="toc" aria-label="Secciones">';
      T.cats.forEach(function (c, ci) { html += '<a href="#cat' + ci + '">' + c + "</a>"; });
      html += "</nav>";
      T.cats.forEach(function (c, ci) {
        html += '<section class="cat" id="cat' + ci + '" data-cat="' + ci + '"><h2 class="cat-title">' + c + ' <span class="cat-score" id="cs' + ci + '"></span></h2>';
        T.qs.forEach(function (q, i) { if (q.cat === ci) { pos++; html += qCard(i, pos); } });
        html += "</section>";
      });
    }
    html += '<p class="empty-msg" id="emptyMsg" hidden></p>';
    html += '<div class="toolbar" style="margin-top:22px">' +
      '<button class="btn" id="bRetry">Repetir las falladas</button>' +
      '<button class="btn" id="bReset">Reiniciar test</button></div>';
    app.innerHTML = html;

    Object.keys(st.ans).forEach(function (k) { paint(+k); });
    wire();
    applyFilter();
    update();
  }

  function paint(i) {
    var card = document.getElementById("q" + i);
    if (!card) return;
    var chosen = st.ans[i];
    var ok = chosen === 0;
    card.classList.remove("correct", "wrong");
    card.classList.add(ok ? "correct" : "wrong");
    card.querySelector(".verdict").textContent = ok ? "✓ Correcta" : "✗ Incorrecta";
    var correctLetter = "";
    card.querySelectorAll(".opt").forEach(function (lbl, k) {
      var o = +lbl.getAttribute("data-o");
      var inp = lbl.querySelector("input");
      inp.disabled = true;
      if (o === chosen) inp.checked = true;
      lbl.classList.add("locked");
      if (o === 0) correctLetter = LET[k];
      if (o === chosen && ok) lbl.classList.add("pick-ok");
      else if (o === chosen) lbl.classList.add("pick-ko");
      else if (o === 0) lbl.classList.add("show-ok");
    });
    var ex = card.querySelector(".explain");
    ex.hidden = false;
    ex.innerHTML = '<div class="head">' + (ok ? "Correcto." : "Incorrecto. La respuesta correcta es la " + correctLetter + ").") + "</div>" + (T.qs[i].e || "");
  }

  function update() {
    var c = counts();
    document.getElementById("sDone").textContent = c.done;
    document.getElementById("sOk").textContent = c.ok;
    document.getElementById("sKo").textContent = c.ko;
    document.getElementById("fOk").style.width = (c.ok / N * 100) + "%";
    document.getElementById("fKo").style.width = (c.ko / N * 100) + "%";
    c.perCat.forEach(function (pc, ci) {
      var el = document.getElementById("cs" + ci);
      if (el) el.textContent = pc.done ? pc.ok + "/" + pc.done + " aciertos" : "";
    });
    var res = document.getElementById("result");
    if (c.done === N) {
      var pct = Math.round(c.ok / N * 100);
      var cls = pct >= 90 ? "bien" : pct >= 70 ? "aceptable" : "mal";
      var msg = pct >= 90 ? "Dominas el tema. Repasa solo lo que has fallado." : pct >= 70 ? "Buen nivel. Repite las falladas y repasa esas secciones en el resumen." : "Toca repasar el resumen y repetir las falladas.";
      var h = '<div class="result ' + cls + '"><h2>Resultado</h2><div class="big">' + c.ok + "/" + N + " · " + pct + "%</div><p>" + msg + "</p>";
      h += '<ul class="breakdown">';
      T.cats.forEach(function (cat, ci) { var pc = c.perCat[ci]; h += "<li><span>" + cat + "</span><b>" + pc.ok + "/" + pc.total + "</b></li>"; });
      h += "</ul>";
      if (c.ko) h += '<div class="toolbar" style="margin:16px 0 0"><button class="btn primary" id="bRetry2">Repetir las ' + c.ko + " falladas</button></div>";
      h += "</div>";
      res.innerHTML = h;
      var b2 = document.getElementById("bRetry2");
      if (b2) b2.addEventListener("click", retryWrong);
    } else {
      res.innerHTML = "";
    }
    document.getElementById("bRetry").disabled = c.ko === 0;
  }

  function applyFilter() {
    var f = st.filter || "all";
    document.querySelectorAll("[data-f]").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-f") === f ? "true" : "false"); });
    var visible = 0;
    document.querySelectorAll(".q").forEach(function (card) {
      var i = +card.getAttribute("data-i");
      var a = st.ans[i];
      var show = f === "all" || (f === "pending" && a === undefined) || (f === "wrong" && a !== undefined && a !== 0);
      card.hidden = !show;
      if (show) visible++;
    });
    document.querySelectorAll("section.cat").forEach(function (sec) {
      sec.hidden = !sec.querySelector(".q:not([hidden])");
    });
    var em = document.getElementById("emptyMsg");
    em.hidden = visible > 0;
    em.textContent = f === "wrong" ? "No tienes preguntas falladas." : f === "pending" ? "No te quedan preguntas pendientes." : "";
  }

  function retryWrong() {
    Object.keys(st.ans).forEach(function (k) {
      if (st.ans[k] !== 0) { delete st.ans[k]; st.perm[k] = freshPerm(+k); }
    });
    st.filter = "pending";
    save(); render();
    app.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  var resetArmed = null;
  function wire() {
    app.querySelectorAll(".opt input").forEach(function (inp) {
      inp.addEventListener("change", function () {
        var i = +inp.name.slice(1);
        if (st.ans[i] !== undefined) return;
        st.ans[i] = +inp.value;
        paint(i); save(); update();
        if (counts().done === N) {
          var r = document.getElementById("result");
          if (r) r.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
    app.querySelectorAll("[data-f]").forEach(function (b) {
      b.addEventListener("click", function () { st.filter = b.getAttribute("data-f"); save(); applyFilter(); });
    });
    document.getElementById("bRandom").addEventListener("click", function () {
      st.random = !st.random;
      st.qorder = st.random ? shuffle(range(N)) : null;
      save(); render();
    });
    document.getElementById("bRetry").addEventListener("click", retryWrong);
    var bReset = document.getElementById("bReset");
    bReset.addEventListener("click", function () {
      if (!resetArmed) {
        bReset.textContent = "¿Seguro? Pulsa otra vez para borrar";
        resetArmed = setTimeout(function () { bReset.textContent = "Reiniciar test"; resetArmed = null; }, 4000);
        return;
      }
      clearTimeout(resetArmed); resetArmed = null;
      st = { v: 2, perm: T.qs.map(function (q, i) { return freshPerm(i); }), ans: {}, random: st.random, qorder: st.random ? shuffle(range(N)) : null, filter: "all" };
      save(); render();
      window.scrollTo({ top: 0 });
    });
  }

  render();
})();
