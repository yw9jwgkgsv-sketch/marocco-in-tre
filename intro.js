/* L'introduzione a storie: breve, va avanti da sola, ogni schermata col suo colore. Si rivede dalla Home. */
window.Intro = (function () {
  "use strict";
  const KEY = "marocco_intro_v3";
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch (e) { return "1"; } },
    set() { try { localStorage.setItem(KEY, "1"); } catch (e) {} }
  };
  function shouldShow() { return !store.get() || /[?&]intro\b/.test(location.search); }
  function E(tag, cls, text, d) {
    const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = text;
    if (d !== undefined) e.style.setProperty("--d", d + "ms"); return e;
  }
  function days() { return Math.max(0, Math.floor((new Date(2026, 11, 28, 23, 30) - new Date()) / 86400000)); }

  const CAST = [["Alessandro", "Ha fatto il sito. Il volo di ritorno no."], ["Augusto", "Dice «suave». Non prenota niente."], ["Davide", "600.000 chiamate. Ora pure avvocato."]];

  /* schermata semplice: etichetta, frase grossa, una riga, eventuale disegnino, battuta */
  function simple(o) {
    return () => {
      const s = E("div", "in-slide");
      s.append(E("span", "in-eye", o.eye, 0), E("h2", "in-big", o.title, 120));
      if (o.line) s.appendChild(E("p", "in-sub", o.line, 350));
      if (o.mock) { const m = o.mock(); m.classList.add("in-anim"); m.style.setProperty("--d", "550ms"); s.appendChild(m); }
      if (o.joke) s.appendChild(E("p", "in-hand", o.joke, 800));
      return s;
    };
  }
  function votes() {
    const v = E("div", "in-votes in-votes-big");
    [["🔥", "Ci sto"], ["🤔", "Forse"], ["💀", "Neanche morto"]].forEach(([e, l], i) => { const x = E("span", "in-vote", null, 600 + i * 150); x.append(E("i", null, e), E("span", null, l)); v.appendChild(x); });
    return v;
  }
  function titles() {
    const g = E("div", "in-chips");
    ["Il Braccino", "Il Cacasotto", "Lo Scroccone", "Il Tossico Supremo", "Lo Scansafatiche"].forEach((t, i) => g.appendChild(E("span", "in-title", t, 600 + i * 130)));
    return g;
  }

  const SLIDES = [
    { bg: "#2438C6", make: () => {
      const s = E("div", "in-slide");
      s.append(E("span", "in-eye", "29 dic → 8 gen · in tre", 0), E("h2", "in-big", "Ahó, tossici.", 120),
        E("p", "in-sub", "Il sito per organizzare il Marocco. E per prendervi per il culo.", 350),
        E("span", "sticker in-pop", "Partenza tra " + days() + " giorni", 650));
      return s;
    } },
    { bg: "#6E2BC2", make: () => {
      const s = E("div", "in-slide");
      s.append(E("span", "in-eye", "Il cast", 0), E("h2", "in-big", "Tre uomini, zero piani.", 120));
      const list = E("div", "in-cast");
      CAST.forEach(([n, line], i) => { const row = E("div", "in-row", null, 350 + i * 300); const av = M.avatar(n); av.classList.add("in-av"); const t = E("div"); t.append(E("b", null, n), E("span", null, line)); row.append(av, t); list.appendChild(row); });
      s.appendChild(list);
      return s;
    } },
    { bg: "#D6345A", make: simple({ eye: "Esplora", title: "Per non passare 11 giorni in riad.", line: "Su ogni idea premi uno dei tre.", mock: votes, joke: "Tre 🔥 sulla stessa idea? Si fa." }) },
    { bg: "#0B7A5C", make: simple({ eye: "Crew", title: "Per non decidere coi vocali di Davide.", line: "Metti budget e scenario preferito. Il sito sceglie da solo.", joke: "E c'è il tribunale: chi è il più tossico?" }) },
    { bg: "#0F6FB8", make: simple({ eye: "Il giro", title: "Per non perdervi.", line: "Mappa e giorno per giorno: dove dormite, quanto guidate.", joke: "Più il rischio del giorno, con nome e cognome." }) },
    { bg: "#B35A00", make: simple({ eye: "Organizza", title: "Per non restare a terra l'8 gennaio.", line: "Prenditi una prenotazione. Segna cosa paghi: i conti li fa il sito.", joke: "Chi è in ritardo finisce sul muro della vergogna." }) },
    { bg: "#B23A12", make: simple({ eye: "Kit", title: "Per non fare figure de merda.", line: "Valigia, frasi in darija, prezzi giusti nel souk.", joke: "«La, shukran»: no, grazie. La direte duemila volte." }) },
    { bg: "#141A4D", make: simple({ eye: "La pagella", title: "Il sito vede tutto.", line: "Da quello che fate, o non fate, escono i titoli.", mock: titles, joke: "Usatelo, o vi insulta. Anzi, vi insulta lo stesso." }) },
    { bg: "#2438C6", last: true, make: (done) => {
      const s = E("div", "in-slide");
      const me = M.me();
      s.append(E("span", "in-eye", "Ultima cosa", 0), E("h2", "in-big", me ? "Sei " + me + "?" : "Chi sei?", 120));
      const g = E("div", "in-pick");
      CAST.forEach(([n], i) => {
        const b = E("button", "in-who", null, 350 + i * 130); b.type = "button";
        const av = M.avatar(n); av.classList.add("in-av"); b.append(av, E("b", null, n));
        b.addEventListener("click", (ev) => { ev.stopPropagation(); M.setMe(n); finale(s, n, done); });
        g.appendChild(b);
      });
      const other = E("button", "in-other", "Non sono nessuno dei tre", 800); other.type = "button";
      other.addEventListener("click", (ev) => { ev.stopPropagation(); done(); setTimeout(M.askWho, 200); });
      s.append(g, other);
      return s;
    } }
  ];

  const NEXT = { Alessandro: "Ora compila il profilo. Poi, magari, prenota il volo.", Augusto: "Ora compila il profilo. Suave, ma oggi.", Davide: "Ora compila il profilo. Senza chiamare nessuno." };
  function finale(slide, n, done) {
    slide.textContent = "";
    slide.append(E("h2", "in-big", "Daje, " + n + ".", 0), E("p", "in-sub", NEXT[n] || "Ora compila il profilo, tossico.", 200));
    const go = E("a", "btn yellow in-anim in-cta", "Compila il profilo", 400); go.href = "crew.html";
    go.addEventListener("click", () => store.set());
    const stay = E("button", "in-other", "Resto in Home", 600); stay.type = "button";
    stay.addEventListener("click", (e) => { e.stopPropagation(); done(); });
    slide.append(go, stay);
  }

  function show() {
    if (document.getElementById("intro")) return;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ov = E("div", "intro zellige"); ov.id = "intro"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "Introduzione al sito");
    const bars = E("div", "in-progress");
    const head = E("div", "in-head");
    const skip = E("button", "in-skip", "Salta"); skip.type = "button";
    head.append(E("span", "in-brand", "Marocco in tre"), skip);
    const stage = E("div", "in-stage");
    const hint = E("p", "in-hint", "Tocca per andare avanti · tieni premuto per fermare");
    ov.append(bars, head, stage, hint);
    SLIDES.forEach(() => { const b = E("span", "in-seg"); b.appendChild(E("i")); bars.appendChild(b); });
    document.body.appendChild(ov); document.documentElement.style.overflow = "hidden";

    let i = 0, timer = null, started = 0, left = 0, dur = 0, paused = false;
    function close() {
      clearTimeout(timer); store.set(); window.INTRO_ACTIVE = false;
      ov.classList.add("in-out"); setTimeout(() => { ov.remove(); document.documentElement.style.overflow = ""; if (!M.me()) M.askWho(); }, reduce ? 0 : 300);
    }
    function go(n) {
      if (n < 0) n = 0;
      if (n >= SLIDES.length) return close();
      i = n; clearTimeout(timer);
      const sl = SLIDES[i];
      ov.style.backgroundColor = sl.bg;
      stage.textContent = ""; const node = sl.make(close); stage.appendChild(node);
      dur = sl.last ? 0 : Math.min(8000, 3200 + (node.textContent || "").length * 38);
      [...bars.children].forEach((b, k) => { b.className = "in-seg" + (k < i || (k === i && !dur) ? " done" : k === i ? " on" : ""); b.style.setProperty("--dur", dur + "ms"); });
      hint.hidden = i > 0;
      paused = false; ov.classList.remove("in-paused");
      if (dur) { started = Date.now(); left = dur; timer = setTimeout(() => go(i + 1), dur); }
    }
    function pause() { if (paused || !dur) return; paused = true; clearTimeout(timer); left -= Date.now() - started; ov.classList.add("in-paused"); }
    function resume() { if (!paused) return; paused = false; ov.classList.remove("in-paused"); started = Date.now(); timer = setTimeout(() => go(i + 1), Math.max(300, left)); }

    skip.addEventListener("click", (e) => { e.stopPropagation(); go(SLIDES.length - 1); });
    let downAt = 0;
    stage.addEventListener("pointerdown", (e) => { if (e.target.closest("button, a")) return; downAt = Date.now(); pause(); });
    stage.addEventListener("pointerup", (e) => {
      if (e.target.closest("button, a")) return;
      if (Date.now() - downAt > 350) return resume();
      const x = e.clientX / window.innerWidth;
      go(x < 0.3 ? i - 1 : i + 1);
    });
    stage.addEventListener("pointercancel", resume);
    document.addEventListener("keydown", function k(e) {
      if (!document.getElementById("intro")) return document.removeEventListener("keydown", k);
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(i + 1); }
      else if (e.key === "ArrowLeft") go(i - 1);
      else if (e.key === "Escape") go(SLIDES.length - 1);
    });
    go(0);
  }
  return { shouldShow, show };
})();
