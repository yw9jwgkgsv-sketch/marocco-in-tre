/* L'introduzione a storie: la prima cosa che vedono. Si rivede dalla Home. */
window.Intro = (function () {
  "use strict";
  const KEY = "marocco_intro_v1";
  const DUR = 7000;
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

  const CAST = [
    ["Alessandro", "Ha fatto il sito. Il viaggio è ancora da organizzare."],
    ["Augusto", "Studia economia a Piacenza. Ha già fatto il business plan del tagine: in perdita."],
    ["Davide", "Ci ha chiamato 600.000 volte su WhatsApp. Ora è pure avvocato: farà causa al cammello."]
  ];
  const STOPS = [["29 · 30 dic", "Fes", "medina, concerie, ci si perde"], ["31 dic · 1 gen", "Marrakech", "Capodanno, poi si contano i danni"], ["2 gen", "Atlante", "2.260 metri e un passeggero che chiede «quanto manca?»"], ["2 · 3 gen", "Dadès e Todra", "gole, kasbah, eco che vi insulta"], ["3 · 4 gen", "Deserto", "dune, moto, tenda sotto zero"], ["5 → 8 gen", "Oceano", "surf, pesce, volo da Agadir la sera"]];
  const TITOLI = ["Il Braccino", "Il Cacasotto", "Lo Scroccone", "Il Tossico Supremo", "Il Desaparecido", "Il Sequestratore", "Il Bogia Nen", "Lo Scansafatiche", "Il Bancomat", "Il Condannato"];

  function slides() {
    return [
      () => {
        const s = E("div", "in-slide");
        s.append(
          E("span", "in-eye", "Fes · notte tra il 28 e il 29 dicembre", 0),
          E("h2", "in-big", "Ahó. Benvenuti, tossici.", 150),
          E("p", "in-sub", "Tre ex Erasmus de San Paolo, undici giorni in Marocco e un sito che vi conosce meglio de vostra madre.", 450),
          E("span", "sticker in-pop", "Partenza tra " + days() + " giorni", 800),
          E("p", "in-hand", "Che poteva andà storto? Tutto. Talìa.", 1100));
        return s;
      },
      () => {
        const s = E("div", "in-slide");
        s.append(E("span", "in-eye", "Il cast", 0), E("h2", "in-big", "Tre uomini, zero piani.", 100));
        const list = E("div", "in-cast");
        CAST.forEach(([n, line], i) => {
          const row = E("div", "in-row", null, 400 + i * 450);
          const av = M.avatar(n); av.classList.add("in-av");
          const txt = E("div"); txt.append(E("b", null, n), E("span", null, line));
          row.append(av, txt); list.appendChild(row);
        });
        s.append(list, E("p", "in-hand", "Uno de Roma, uno de Saluzzo, uno de Palermo. Tranquilo, suave, bora. Bedda matri.", 1900));
        return s;
      },
      () => {
        const s = E("div", "in-slide");
        s.append(E("span", "in-eye", "Il giro", 0), E("h2", "in-big", "Da Fes all'oceano.", 100));
        const tl = E("ol", "in-tl");
        STOPS.forEach(([d, t, x], i) => { const li = E("li", null, null, 300 + i * 220); li.append(E("span", "in-d", d), E("b", null, t), E("span", "in-x", x)); tl.appendChild(li); });
        s.append(tl, E("p", "in-hand", "Chi perde il volo dell'8 resta a fare surf per sempre. Non sarebbe neanche male.", 1700));
        return s;
      },
      () => {
        const s = E("div", "in-slide");
        s.append(E("span", "in-eye", "Esplora", 0), E("h2", "in-big", C.ATT.length + " cose da fare. Si vota.", 100));
        const card = E("div", "in-card", null, 400);
        card.append(E("span", "in-cat", "Moto e motori"), E("b", null, "Enduro sulle dune di Merzouga"), E("span", "in-joke", "«La sabbia è morbida.» Lo dicono tutti. Mentono tutti."));
        const votes = E("div", "in-votes");
        [["🔥", "Ci sto"], ["🤔", "Forse"], ["💀", "Neanche morto"]].forEach(([e, l], i) => { const b = E("span", "in-vote", null, 700 + i * 200); b.append(E("i", null, e), E("span", null, l)); votes.appendChild(b); });
        card.appendChild(votes);
        s.append(card, E("p", "in-sub", "Se dite «Ci sto» tutti e tre è un match, e si fa. Se uno dice «Neanche morto», lo sapranno tutti.", 1300), E("p", "in-hand", "Il Cacasotto si riconosce da qui. Daje.", 1700));
        return s;
      },
      () => {
        const s = E("div", "in-slide");
        s.append(E("span", "in-eye", "Crew e tribunale", 0), E("h2", "in-big", "Il sito decide. Il tribunale condanna.", 100),
          E("p", "in-sub", "Nel profilo metti budget, patente, fuoristrada e scenario preferito. Lo scenario del viaggio esce da solo: niente discussioni, niente vocali da sette minuti.", 400));
        const q = E("div", "in-card", null, 900);
        q.append(E("span", "in-cat", "Il tribunale"), E("b", null, "Chi dice «la sorca» più volte in un giorno?"));
        const bars = E("div", "in-bars");
        CAST.forEach(([n], i) => { const r = E("div", "in-bar"); const fill = E("i"); fill.style.background = M.colorFor(n); fill.style.setProperty("--w", [72, 18, 44][i] + "%"); fill.style.setProperty("--d", 1200 + i * 150 + "ms"); r.append(E("span", null, n), fill); bars.appendChild(r); });
        q.appendChild(bars); s.append(q, E("p", "in-hand", "Votarsi da soli è permesso. Ma è triste, neh.", 1800));
        return s;
      },
      () => {
        const s = E("div", "in-slide");
        s.append(E("span", "in-eye", "Organizza", 0), E("h2", "in-big", "Chi prenota, chi paga.", 100));
        const g = E("div", "in-grid");
        [["Me ne occupo io", "Ti prendi una prenotazione. Se poi non la fai, finisci sul muro della vergogna, con nome e giorni di ritardo."],
         ["Cassa comune", "Paghi qualcosa per tutti, lo segni. Il sito calcola chi deve cosa a chi, al centesimo. Valeu, mano."]].forEach(([t, x], i) => { const c = E("div", "in-card", null, 400 + i * 300); c.append(E("b", null, t), E("span", "in-x", x)); g.appendChild(c); });
        s.append(g, E("p", "in-hand", "«Ma io pensavo lo facesse Augusto» non è più una scusa valida.", 1300));
        return s;
      },
      () => {
        const s = E("div", "in-slide");
        s.append(E("span", "in-eye", "Kit e muro", 0), E("h2", "in-big", "Per non fare figure de merda.", 100));
        const g = E("div", "in-chips");
        ["Valigia condivisa: si vede chi è indietro", "Darija con la traduzione paulista", "Prezzi giusti per trattare nel souk", "Convertitore euro-dirham", "Meteo, documenti, numeri utili", "Il muro: frasi celebri e voti ai tagine"].forEach((t, i) => g.appendChild(E("span", "in-chip", t, 300 + i * 150)));
        s.append(g, E("div", "in-card in-dj", null, 1300));
        const dj = s.lastChild; dj.append(E("span", "in-cat", "Lezione di darija"), E("b", null, "La, shukran"), E("span", "in-x", "No, grazie. A San Paolo: «Não, valeu». La direte duemila volte nei souk."));
        return s;
      },
      () => {
        const s = E("div", "in-slide");
        s.append(E("span", "in-eye", "Le regole", 0), E("h2", "in-big", "Il sito vede tutto. E vi dà un titolo.", 100),
          E("p", "in-sub", "Budget, voti, prenotazioni, soldi, valigia: tutto quello che fate, o non fate, finisce in pagella. Nessuno se salva.", 400));
        const g = E("div", "in-chips");
        TITOLI.forEach((t, i) => g.appendChild(E("span", "in-title", t, 700 + i * 110)));
        s.append(g, E("p", "in-hand", "L'unico modo per salvarsi è usarlo. Forse. Caralho.", 2000));
        return s;
      },
      (done) => {
        const s = E("div", "in-slide");
        const me = M.me();
        s.append(E("span", "in-eye", "Ultima domanda", 0), E("h2", "in-big", me ? "Sei " + me + ", giusto?" : "Chi sei?", 100),
          E("p", "in-sub", me ? "Il telefono si ricorda di te. Se non sei tu, scegli il nome giusto." : "Tocca il tuo nome. Se fai il furbo e ti spacci per un altro, il sito se ne accorge.", 300));
        const g = E("div", "in-pick");
        CAST.forEach(([n], i) => {
          const b = E("button", "in-who", null, 500 + i * 150); b.type = "button";
          const av = M.avatar(n); av.classList.add("in-av"); b.append(av, E("b", null, n));
          b.addEventListener("click", (ev) => { ev.stopPropagation(); M.setMe(n); finale(s, n, done); });
          g.appendChild(b);
        });
        s.appendChild(g);
        const other = E("button", "in-other", "Non sono nessuno dei tre", 1000); other.type = "button";
        other.addEventListener("click", (ev) => { ev.stopPropagation(); done(); setTimeout(M.askWho, 200); });
        s.appendChild(other);
        return s;
      }
    ];
  }

  function finale(slide, n, done) {
    slide.textContent = "";
    slide.append(E("span", "in-eye", "Accesso consentito", 0), E("h2", "in-big", "Daje, " + n + ".", 100),
      E("p", "in-sub", "Il sito ti stava aspettando. Ora vai a compilare il profilo, tossico.", 300), E("span", "sticker rosa in-pop", "É nóis. Amunì.", 600));
    setTimeout(done, 2000);
  }

  function show() {
    if (document.getElementById("intro")) return;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ov = E("div", "intro zellige"); ov.id = "intro"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "Introduzione al sito");
    const bars = E("div", "in-progress");
    const head = E("div", "in-head");
    const skip = E("button", "in-skip", "Salta, tanto lo so"); skip.type = "button";
    head.append(E("span", "in-brand", "Marocco in tre"), skip);
    const stage = E("div", "in-stage");
    const hint = E("p", "in-hint", "Tocca per andare avanti");
    ov.append(bars, head, stage, hint);
    const S = slides();
    S.forEach(() => { const b = E("span", "in-seg"); b.appendChild(E("i")); bars.appendChild(b); });
    document.body.appendChild(ov); document.documentElement.style.overflow = "hidden";

    let i = 0, timer = null, started = 0, left = DUR, paused = false;
    function close() {
      clearTimeout(timer); store.set(); window.INTRO_ACTIVE = false;
      ov.classList.add("in-out"); setTimeout(() => { ov.remove(); document.documentElement.style.overflow = ""; if (!M.me()) M.askWho(); }, reduce ? 0 : 300);
    }
    function go(n) {
      if (n < 0) n = 0;
      if (n >= S.length) return close();
      i = n; clearTimeout(timer);
      stage.textContent = ""; stage.appendChild(S[i](close));
      [...bars.children].forEach((b, k) => { b.className = "in-seg" + (k < i ? " done" : k === i ? " on" : ""); });
      hint.hidden = i === S.length - 1;
      const last = i === S.length - 1;
      bars.children[i].style.setProperty("--dur", DUR + "ms");
      left = DUR; paused = false; ov.classList.remove("in-paused");
      if (!last) { started = Date.now(); timer = setTimeout(() => go(i + 1), DUR); }
    }
    function pause() { if (paused || i === S.length - 1) return; paused = true; clearTimeout(timer); left -= Date.now() - started; ov.classList.add("in-paused"); }
    function resume() { if (!paused) return; paused = false; ov.classList.remove("in-paused"); started = Date.now(); timer = setTimeout(() => go(i + 1), Math.max(300, left)); }

    skip.addEventListener("click", (e) => { e.stopPropagation(); go(S.length - 1); });
    let downAt = 0;
    stage.addEventListener("pointerdown", () => { downAt = Date.now(); pause(); });
    stage.addEventListener("pointerup", (e) => {
      const held = Date.now() - downAt > 350;
      if (held) return resume();
      if (e.target.closest("button")) return resume();
      const x = e.clientX / window.innerWidth;
      if (x < 0.3) go(i - 1); else go(i + 1);
    });
    stage.addEventListener("pointercancel", resume);
    document.addEventListener("keydown", function k(e) {
      if (!document.getElementById("intro")) return document.removeEventListener("keydown", k);
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); go(i + 1); }
      else if (e.key === "ArrowLeft") go(i - 1);
      else if (e.key === "Escape") go(S.length - 1);
    });
    go(0);
  }

  return { shouldShow, show };
})();
