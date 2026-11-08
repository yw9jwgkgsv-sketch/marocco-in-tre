/* L'ingresso nel sito: prima il caricamento (la barra col cammello e le vostre battute),
   poi l'intro a schermate colorate. Ogni volta che si entra nel sito, anche se il telefono vi conosce già.
   Dentro il sito, passando da una pagina all'altra, non si ripete. */
window.Intro = (function () {
  "use strict";
  const KEY = "marocco_entrata_v8";
  const ls = { get() { try { return sessionStorage.getItem(KEY); } catch (e) { return "1"; } }, set() { try { sessionStorage.setItem(KEY, "1"); } catch (e) {} } };
  function shouldShow() { return !ls.get() || /[?&]intro\b/.test(location.search); }
  const MSG = [
    "Svegliando Davide dalla 600.000ª chiamata…", "Spiegando ad Augusto che «suave» non è un piano…", "Er romano sta a dì «daje» al server…",
    "Traducendo il palermitano in italiano…", "Convincendo il saluzzese a spendere un euro…", "Cercando la sorca nel raggio di 40 km… 0 risultati",
    "Gonfiando il materassino per il deserto…", "Avvisando la valle di Ketama. È preoccupata…", "Calibrando il tè «ma de quello forte»…",
    "Prenotando lo scalo a Londra: 7 gradi e pioggia…", "Avvisando i cammelli. Sono preoccupati…", "Stirando la camicia per il Theatro…", "Contando i due di picche futuri…"
  ];
  function E(tag, cls, text, d) {
    const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = text;
    if (d !== undefined) e.style.setProperty("--d", d + "ms"); return e;
  }

  let forcePick = false;
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
      if (me && !forcePick) {
        s.append(E("span", "in-eye", "Bentornato", 0), E("h2", "in-big", "Daje, " + me + ".", 120), E("p", "in-sub", (BYE[me] || ["", "Ora vota, tossico."])[1], 260));
        const go = E("button", "in-cta in-anim", "Entra", 420); go.type = "button";
        go.addEventListener("click", (ev) => { ev.stopPropagation(); done(); });
        const other = E("button", "in-other", "Non sono " + me, 600); other.type = "button";
        other.addEventListener("click", (ev) => { ev.stopPropagation(); forcePick = true; s.replaceWith(SLIDES[SLIDES.length - 1].make(done)); });
        s.append(go, other);
        return s;
      }
      s.append(E("span", "in-eye", "Ultima cosa", 0), E("h2", "in-big", "Chi sei?", 120));
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

    /* 1. il caricamento */
    bars.hidden = true; head.hidden = true; hint.hidden = true; stage.hidden = true;
    const ld = E("div", "ld-box");
    const logo = E("div", "ld-logo"); logo.append(E("span", null, "Marocco"), E("em", null, " in tre"));
    const pct = E("b", "ld-pct", "0%");
    const track = E("div", "ld-track"); const fill = E("i", "ld-fill"); const camel = E("span", "ld-camel", "🐪"); camel.setAttribute("aria-hidden", "true");
    track.append(fill, camel);
    const msg = E("p", "ld-msg", "Caricamento tossici…"); msg.setAttribute("aria-live", "polite");
    ld.append(logo, pct, track, msg, E("p", "ld-tip", "Tocca per andare più veloce"));
    ov.appendChild(ld);
    const pool = MSG.slice().sort(() => Math.random() - 0.5).slice(0, 4);
    const total = reduce ? 400 : 3200;
    let el0 = 0, prev = performance.now(), speed = 1, lastIdx = -1, ldDone = false;
    function speedUp() { speed = 4; }
    ov.addEventListener("click", speedUp);
    function frame(now) {
      if (ldDone) return;
      el0 += (now - prev) * speed; prev = now;
      const p = Math.min(1, el0 / total);
      const shown = p < 0.62 ? p : p < 0.72 ? 0.62 + (p - 0.62) * 0.25 : 0.645 + (p - 0.72) * (0.355 / 0.28);
      const v = Math.min(100, Math.round(shown * 100));
      pct.textContent = v + "%"; fill.style.width = v + "%"; camel.style.left = "calc(" + v + "% - 14px)";
      const idx = Math.min(pool.length - 1, Math.floor(p * pool.length));
      if (idx !== lastIdx) { lastIdx = idx; msg.textContent = pool[idx]; msg.classList.remove("ld-in"); void msg.offsetWidth; msg.classList.add("ld-in"); }
      if (p >= 1) { ldDone = true; ov.removeEventListener("click", speedUp); setTimeout(startSlides, 350); return; }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    function startSlides() { ld.remove(); bars.hidden = false; head.hidden = false; stage.hidden = false; go(0); }

    /* 2. le schermate */
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
      hint.hidden = i > 0 || stage.hidden;
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
  }
  return { shouldShow, show };
})();
