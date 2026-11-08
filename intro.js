/* L'intro: schermate a colori che vanno avanti da sole, come la versione 3 ma più pulita.
   Una frase grande, una riga, una citazione in dialetto. Alla prima apertura; si rivede dalla Home. */
window.Intro = (function () {
  "use strict";
  const KEY = "marocco_intro_v7";
  const ls = { get() { try { return localStorage.getItem(KEY); } catch (e) { return "1"; } }, set() { try { localStorage.setItem(KEY, "1"); } catch (e) {} } };
  function shouldShow() { return !ls.get() || /[?&]intro\b/.test(location.search); }
  function E(tag, cls, text, d) {
    const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = text;
    if (d !== undefined) e.style.setProperty("--d", d + "ms"); return e;
  }

  const CAST = [["Alessandro", "Ha fatto il sito. Il viaggio, vedremo."], ["Augusto", "Dice «suave». Poi non prenota niente."], ["Davide", "600.000 chiamate. Mo' è pure avvocato."]];

  /* una schermata: etichetta, frase grande, una riga, citazione con chi la dice */
  function slide(o) {
    return () => {
      const s = E("div", "in-slide");
      s.append(E("span", "in-eye", o.eye, 0), E("h2", "in-big", o.title, 120));
      if (o.line) s.appendChild(E("p", "in-sub", o.line, 320));
      if (o.mock) { const m = o.mock(); m.classList.add("in-anim"); m.style.setProperty("--d", "480ms"); s.appendChild(m); }
      if (o.q) { const q = E("p", "in-quote", null, 700); q.append(E("span", null, "«" + o.q[0] + "»"), E("small", null, o.q[1])); s.appendChild(q); }
      return s;
    };
  }
  function votes() {
    const v = E("div", "in-votes");
    [["🔥", "Ci sto"], ["🤔", "Forse"], ["💀", "Neanche morto"]].forEach(([e, l], i) => { const x = E("span", "in-vote", null, 560 + i * 140); x.append(E("i", null, e), E("span", null, l)); v.appendChild(x); });
    return v;
  }

  const SLIDES = [
    { bg: "#2438C6", make: () => {
      const s = E("div", "in-slide");
      s.append(E("span", "in-eye", "Marocco, dal 29 dicembre all'8 gennaio", 0), E("h2", "in-big", "Ahó, tossici.", 120),
        E("p", "in-sub", "Il sito per organizzare il viaggio. E per prendervi per il culo.", 320));
      return s;
    } },
    { bg: "#6E2BC2", make: () => {
      const s = E("div", "in-slide");
      s.append(E("span", "in-eye", "Il cast", 0), E("h2", "in-big", "Tre uomini, zero piani.", 120));
      const list = E("div", "in-cast");
      CAST.forEach(([n, line], i) => { const row = E("div", "in-row", null, 320 + i * 260); const av = M.avatar(n); av.classList.add("in-av"); const t = E("div"); t.append(E("b", null, n), E("span", null, line)); row.append(av, t); list.appendChild(row); });
      s.appendChild(list);
      const q = E("p", "in-quote", null, 1200); q.append(E("span", null, "«Uno de Roma, uno de Saluzzo, uno de Palermo.»"), E("small", null, "Indovinate chi è chi")); s.appendChild(q);
      return s;
    } },
    { bg: "#D6345A", make: slide({ eye: "Il viaggio", title: "Zona per zona.", line: "Il Marocco in 7 zone, dal Rif all'oceano. Su ogni idea premi uno dei tre.", mock: votes, q: ["Dio fa, ma votate!", "il piemontese"] }) },
    { bg: "#0B7A5C", make: slide({ eye: "I must", title: "Ketama, surf, moto, deserto.", line: "Si fanno per forza. Si decide solo come.", q: ["Nun se discute. Stacce.", "il romano"] }) },
    { bg: "#0F6FB8", make: slide({ eye: "Mappa", title: "Dove c'è la sorca.", line: "Locali, surf, tagine e posti da foto. Ketama c'è, ma per dirvi di no.", q: ["Talìa, unn'è 'a sorca?", "il palermitano"] }) },
    { bg: "#6E2BC2", make: slide({ eye: "La notte", title: "Rimorchio: non chiedete.", line: "Club, Capodanno e ostelli veri. E il registro dei due di picche.", q: ["Me cojoni, n'antro due de picche.", "il romano"] }) },
    { bg: "#B35A00", make: slide({ eye: "Kit", title: "Per non fare figure de merda.", line: "Valigia, frasi in darija, prezzi giusti nel souk.", q: ["Amunì, picciotti. La, shukran.", "il palermitano al souk"] }) },
    { bg: "#2438C6", last: true, make: (done) => {
      const s = E("div", "in-slide");
      const me = M.me();
      s.append(E("span", "in-eye", "Ultima cosa", 0), E("h2", "in-big", me ? "Sei " + me + "?" : "Chi sei?", 120));
      const g = E("div", "in-pick");
      CAST.forEach(([n], i) => {
        const b = E("button", "in-who", null, 320 + i * 120); b.type = "button";
        const av = M.avatar(n); av.classList.add("in-av"); b.append(av, E("b", null, n));
        b.addEventListener("click", (ev) => { ev.stopPropagation(); M.setMe(n); finale(s, n, done); });
        g.appendChild(b);
      });
      const other = E("button", "in-other", "Non sono nessuno dei tre", 760); other.type = "button";
      other.addEventListener("click", (ev) => { ev.stopPropagation(); done(); setTimeout(M.askWho, 200); });
      s.append(g, other);
      return s;
    } }
  ];

  const BYE = { Alessandro: ["Daje, Alessandro.", "Ora prenota qualcosa, che il sito l'hai già fatto."], Augusto: ["Bora, Augusto.", "Suave, ma oggi vota."], Davide: ["Talìa, Davide.", "Ora vota. Senza chiamare nessuno."] };
  function finale(slide, n, done) {
    slide.textContent = "";
    const b = BYE[n] || ["Daje, " + n + ".", "Ora vota, tossico."];
    slide.append(E("h2", "in-big", b[0], 0), E("p", "in-sub", b[1], 200));
    const go = E("button", "in-cta in-anim", "Entra", 400); go.type = "button";
    go.addEventListener("click", (e) => { e.stopPropagation(); done(); });
    slide.appendChild(go);
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
    const hint = E("p", "in-hint", "Tocca per andare avanti");
    ov.append(bars, head, stage, hint);
    SLIDES.forEach(() => { const b = E("span", "in-seg"); b.appendChild(E("i")); bars.appendChild(b); });
    document.body.appendChild(ov); document.documentElement.style.overflow = "hidden";

    let i = 0, timer = null, started = 0, left = 0, dur = 0, paused = false;
    function close() {
      clearTimeout(timer); ls.set(); window.INTRO_ACTIVE = false;
      ov.classList.add("in-out"); setTimeout(() => { ov.remove(); document.documentElement.style.overflow = ""; if (!M.me()) M.askWho(); }, reduce ? 0 : 300);
    }
    function go(n) {
      if (n < 0) n = 0;
      if (n >= SLIDES.length) return close();
      i = n; clearTimeout(timer);
      const sl = SLIDES[i];
      ov.style.backgroundColor = sl.bg;
      stage.textContent = ""; const node = sl.make(close); stage.appendChild(node);
      dur = sl.last ? 0 : Math.min(7500, 3000 + (node.textContent || "").length * 34);
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
      go(e.clientX / window.innerWidth < 0.3 ? i - 1 : i + 1);
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
