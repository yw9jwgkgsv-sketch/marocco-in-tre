/* Il caricamento del sito: una barra che si riempie con un cammello che corre e le vostre battute al posto
   dei messaggi di caricamento. Lungo la prima volta (con «chi sei?»), corto alle visite successive. */
window.Intro = (function () {
  "use strict";
  const KEY = "marocco_intro_v6", SKEY = "marocco_load_sess";
  const ls = { get(k) { try { return localStorage.getItem(k); } catch (e) { return "1"; } }, set(k) { try { localStorage.setItem(k, "1"); } catch (e) {} } };
  const ss = { get() { try { return sessionStorage.getItem(SKEY); } catch (e) { return "1"; } }, set() { try { sessionStorage.setItem(SKEY, "1"); } catch (e) {} } };
  function shouldShow() { return !ss.get() || !ls.get(KEY) || /[?&]intro\b/.test(location.search); }
  function E(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = text; return e; }

  const MSG = [
    "Svegliando Davide dalla 600.000ª chiamata…",
    "Spiegando ad Augusto che «suave» non è un piano…",
    "Er romano sta a dì «daje» al server…",
    "Traducendo il palermitano in italiano…",
    "Convincendo il saluzzese a spendere un euro…",
    "Cercando la sorca nel raggio di 40 km… 0 risultati",
    "Gonfiando il materassino per il deserto…",
    "Nascondendo il Rif da Google Maps…",
    "Calibrando il tè «ma de quello forte»…",
    "Prenotando lo scalo a Londra: 7 gradi e pioggia. Benvenuti…",
    "Verificando che Davide non chiami dal gate di Londra…",
    "Avvisando i cammelli. Sono preoccupati…",
    "Caricando 49 cose che non farete…",
    "Stirando la camicia per il Theatro…",
    "Contando i due di picche futuri…"
  ];

  function show() {
    if (document.getElementById("intro")) return;
    const first = !ls.get(KEY) || /[?&]intro\b/.test(location.search);
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ov = E("div", "loader zellige"); ov.id = "intro"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "Caricamento");
    const box = E("div", "ld-box");
    const logo = E("div", "ld-logo"); logo.append(E("span", null, "Marocco"), E("em", null, " in tre"));
    const pct = E("b", "ld-pct mono", "0%");
    const track = E("div", "ld-track"); const fill = E("i", "ld-fill"); const camel = E("span", "ld-camel", "🐪"); camel.setAttribute("aria-hidden", "true");
    track.append(fill, camel);
    const msg = E("p", "ld-msg", "Caricamento tossici…"); msg.setAttribute("aria-live", "polite");
    const tip = E("p", "ld-tip", "Tocca per andare più veloce");
    box.append(logo, pct, track, msg, tip);
    ov.appendChild(box); document.body.appendChild(ov); document.documentElement.style.overflow = "hidden";

    const pool = MSG.slice().sort(() => Math.random() - 0.5).slice(0, first ? 6 : 3);
    const total = reduce ? 600 : first ? 6200 : 2600;
    let t0 = performance.now(), speed = 1, done = false, lastIdx = -1, elapsed = 0, prev = t0;
    ov.addEventListener("click", () => { if (!done) speed = 4; });
    function frame(now) {
      if (done) return;
      elapsed += (now - prev) * speed; prev = now;
      const p = Math.min(1, elapsed / total);
      // la barra si ferma un attimo, come i caricamenti veri
      const shown = p < 0.62 ? p : p < 0.72 ? 0.62 + (p - 0.62) * 0.25 : 0.645 + (p - 0.72) * (0.355 / 0.28);
      const v = Math.min(100, Math.round(shown * 100));
      pct.textContent = v + "%"; fill.style.width = v + "%"; camel.style.left = "calc(" + v + "% - 14px)";
      const idx = Math.min(pool.length - 1, Math.floor(p * pool.length));
      if (idx !== lastIdx) { lastIdx = idx; msg.textContent = pool[idx]; msg.classList.remove("ld-in"); void msg.offsetWidth; msg.classList.add("ld-in"); }
      if (p >= 1) { done = true; return finish(); }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    function finish() {
      pct.textContent = "100%"; fill.style.width = "100%"; camel.style.left = "calc(100% - 14px)";
      msg.textContent = "Pronto. Più o meno."; tip.hidden = true;
      ss.set();
      if (first && !M.me()) {
        const q = E("div", "ld-who");
        q.append(E("p", "ld-q", "Ultima cosa: chi sei?"));
        const g = E("div", "ld-pick");
        C.CREW.forEach((n) => { const b = E("button", "ld-btn"); b.type = "button"; b.append(M.avatar(n), E("b", null, n)); b.addEventListener("click", (e) => { e.stopPropagation(); M.setMe(n); msg.textContent = "Daje, " + n + ". Il sito ti stava aspettando."; q.remove(); setTimeout(close, 900); }); g.appendChild(b); });
        const other = E("button", "ld-other", "Non sono nessuno dei tre"); other.type = "button";
        other.addEventListener("click", (e) => { e.stopPropagation(); close(); setTimeout(M.askWho, 250); });
        q.append(g, other); box.appendChild(q);
      } else {
        if (M.me()) msg.textContent = "Pronto, " + M.me() + ". Più o meno.";
        setTimeout(close, first ? 900 : 500);
      }
    }
    function close() {
      ls.set(KEY); window.INTRO_ACTIVE = false;
      ov.classList.add("in-out"); setTimeout(() => { ov.remove(); document.documentElement.style.overflow = ""; if (!M.me()) M.askWho(); }, 300);
    }
  }
  return { shouldShow, show };
})();
