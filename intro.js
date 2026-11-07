/* L'introduzione a storie: la prima cosa che vedono.
   Spiega come funziona ogni parte del sito, a cosa serve e perché fa ridere. Si rivede dalla Home. */
window.Intro = (function () {
  "use strict";
  const KEY = "marocco_intro_v2";
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
    ["Alessandro", "Ha fatto questo sito invece di prenotare il volo di ritorno. Priorità."],
    ["Augusto", "Studia economia a Piacenza. Ha già fatto il business plan del tagine: in perdita."],
    ["Davide", "Ci ha chiamato 600.000 volte su WhatsApp. Ora è pure avvocato: farà causa al cammello."]
  ];

  /* una schermata per ogni funzione: come si usa, a cosa serve, perché fa ridere */
  function feature(o) {
    const s = E("div", "in-slide in-feat");
    const eye = E("span", "in-eye in-eye-ic", null, 0);
    eye.append(M.icon(o.icon), document.createTextNode(o.eye));
    s.append(eye, E("h2", "in-big in-mid", o.title, 100));
    if (o.mock) { const m = o.mock(); m.style.setProperty("--d", "300ms"); m.classList.add("in-anim"); s.appendChild(m); }
    const how = E("ol", "in-steps", null, 450);
    o.steps.forEach((t) => how.appendChild(E("li", null, t)));
    s.appendChild(how);
    const why = E("div", "in-why", null, 750);
    const a = E("div", "in-why-box"); a.append(E("b", null, "A cosa serve"), E("span", null, o.serve));
    const b = E("div", "in-why-box in-why-fun"); b.append(E("b", null, "Perché fa ridere"), E("span", null, o.ride));
    why.append(a, b); s.appendChild(why);
    if (o.joke) s.appendChild(E("p", "in-hand", o.joke, 1050));
    return s;
  }
  function voteMock() {
    const card = E("div", "in-card in-card-sm");
    card.append(E("span", "in-cat", "Moto e motori · follia 5"), E("b", null, "Enduro sulle dune di Merzouga"));
    const v = E("div", "in-votes");
    [["🔥", "Ci sto"], ["🤔", "Forse"], ["💀", "Neanche morto"]].forEach(([e, l], i) => { const x = E("span", "in-vote", null, 500 + i * 150); x.append(E("i", null, e), E("span", null, l)); v.appendChild(x); });
    card.appendChild(v); return card;
  }
  function barMock() {
    const q = E("div", "in-card in-card-sm");
    q.append(E("span", "in-cat", "Il tribunale"), E("b", null, "Chi chiama il gruppo più volte su WhatsApp?"));
    const bars = E("div", "in-bars");
    CAST.forEach(([n], i) => { const r = E("div", "in-bar"); const f = E("i"); f.style.background = M.colorFor(n); f.style.setProperty("--w", [8, 12, 96][i] + "%"); f.style.setProperty("--d", 600 + i * 150 + "ms"); r.append(E("span", null, n), f); bars.appendChild(r); });
    q.appendChild(bars); return q;
  }
  function kanMock() {
    const g = E("div", "in-kan");
    [["Da prendere", "Volo di ritorno"], ["Qualcuno ci pensa", "Campo nel deserto · Augusto"], ["Fatto", "Prima notte a Fes"]].forEach(([h, t], i) => { const c = E("div", "in-kcol"); c.append(E("span", "in-cat", h), E("span", "in-ktask", t)); c.style.setProperty("--d", 300 + i * 150 + "ms"); g.appendChild(c); });
    return g;
  }
  function cassaMock() {
    const c = E("div", "in-card in-card-sm");
    c.append(E("span", "in-cat", "Chi paga chi"));
    [["Davide", "Augusto", "€84,50"], ["Alessandro", "Augusto", "€12,00"]].forEach(([a, b, x]) => { const r = E("div", "in-pay"); r.append(M.avatar(a), E("span", null, a + " dà a " + b), E("b", "mono", x)); c.appendChild(r); });
    return c;
  }
  function navMock() {
    const g = E("div", "in-navmock");
    [["home", "Home", "il riassunto e chi vi fa fare figure"], ["esplora", "Esplora", "le cose da fare, si vota"], ["giro", "Giro", "giorno per giorno e mappa"], ["crew", "Crew", "profili, verdetto, tribunale"], ["organizza", "Organizza", "prenotazioni e cassa"], ["kit", "Kit", "valigia, darija, prezzi, cambio"]].forEach(([ic, t, x], i) => {
      const r = E("div", "in-navrow", null, 300 + i * 120); r.append(M.icon(ic), E("b", null, t), E("span", null, x)); g.appendChild(r);
    });
    return g;
  }

  function slides() {
    return [
      () => {
        const s = E("div", "in-slide");
        s.append(
          E("span", "in-eye", "Fes · notte tra il 28 e il 29 dicembre", 0),
          E("h2", "in-big", "Ahó. Benvenuti, tossici.", 150),
          E("p", "in-sub", "Questo sito fa tre cose: vi fa decidere cosa fare, vi fa organizzare chi fa cosa, e vi prende per il culo. Le prime due sono utili. La terza è il motivo per cui lo aprirete.", 450),
          E("span", "sticker in-pop", "Partenza tra " + days() + " giorni", 900),
          E("p", "in-hand", "Due minuti di spiegazione. Davide, sono meno di una tua telefonata.", 1200));
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
        s.append(list, E("p", "in-hand", "Er romano, il saluzzese e er palermitano, ex Erasmus a San Paolo. Chi è chi lo sapete voi. Tranquilo, suave, bora.", 1900));
        return s;
      },
      () => {
        const s = E("div", "in-slide");
        s.append(E("span", "in-eye", "Come si usa", 0), E("h2", "in-big in-mid", "Tre mosse e siete dentro.", 100));
        const how = E("ol", "in-steps in-steps-big", null, 350);
        ["Dici chi sei, alla fine di questa intro. Una volta sola.", "Vai su Crew e compili il profilo: budget, patente, fuoristrada, scenario. Due minuti.", "Vai su Esplora e voti le attività. Tutto il resto il sito lo calcola da solo."].forEach((t) => how.appendChild(E("li", null, t)));
        s.append(how, E("p", "in-sub", "Le pagine stanno nella barra in basso:", 700), navMock(),
          E("p", "in-hand", "E su ogni pagina c'è il tasto rosa «Non ho capito un cazzo». Augusto, è per te.", 1300));
        return s;
      },
      () => feature({ eye: "Esplora", icon: "esplora", title: C.ATT.length + " cose da fare. Si vota.", mock: voteMock,
        steps: ["Scorri le carte: dove, quando, quanto costa, quanto è folle da 1 a 5.", "Su ognuna premi 🔥 Ci sto, 🤔 Forse o 💀 Neanche morto.", "Filtri utili: «Solo fuori dai giri», «Solo i match», e il tasto «Sorprendimi»."],
        serve: "In cinque minuti sapete cosa piace a tutti e tre. Quando dite tutti «Ci sto» compare MATCH: quella si prenota, senza discutere.",
        ride: "Sotto ogni voto compare la faccia di chi l'ha dato. Chi mette «Neanche morto» a tutto diventa il Cacasotto.",
        joke: "Davide voterà «Forse» a tutto per non assumersi responsabilità legali." }),
      () => feature({ eye: "Crew", icon: "crew", title: "Il sito sceglie lo scenario. Voi state zitti.",
        steps: ["Compili il profilo: budget massimo, patente A sì o no, fuoristrada, scenario preferito tra A, B, C e D.", "Aggiungi soprannome, ruolo nel viaggio e superpotere. Facoltativi, ma si ride di più.", "Il «Verdetto» si aggiorna da solo appena rispondete tutti e tre."],
        serve: "Lo scenario esce in automatico: il più votato tra quelli che stanno nel budget più basso, e senza moto se nessuno la sa guidare.",
        ride: "Il budget più basso lo vedono tutti. Il titolo di Braccino arriva in automatico.",
        joke: "Augusto metterà il budget dopo aver calcolato il ROI. Tre giorni." }),
      () => feature({ eye: "Il tribunale", icon: "crew", title: "Si vota chi farà la figura peggiore.", mock: barMock,
        steps: ["Sempre su Crew, sotto il profilo. Ogni domanda ha i vostri tre nomi.", "Tocchi il nome del colpevole. Tocchi di nuovo per ritirare il voto.", "Chi prende più voti si becca l'adesivo «Colpevole»."],
        serve: "A niente. Assolutamente a niente.",
        ride: "Domande come «Chi farà causa a un venditore del souk?». Votarsi da soli si può, ma è triste.",
        joke: "Indovinate chi vince «Chi chiama il gruppo più volte su WhatsApp?». Caralho." }),
      () => feature({ eye: "Il giro", icon: "giro", title: "Giorno per giorno, con la mappa.",
        steps: ["In alto scegli lo scenario: A, B, C o D.", "La mappa mostra le tappe, sotto ci sono gli 11 giorni: dove si dorme, quante ore si guida, cosa si fa.", "Tocchi un'attività del giorno e ti porta alla sua carta su Esplora."],
        serve: "Sapete prima quante ore di macchina vi aspettano e dove dormite ogni notte. Niente sorprese al passo dell'Atlante.",
        ride: "Ogni giorno c'è il «Rischio del giorno», con il nome di chi lo rovinerà.",
        joke: "Rischio del 2 gennaio: Davide chiede «quanto manca?» 40 volte. Porra." }),
      () => feature({ eye: "Organizza · Prenotazioni", icon: "organizza", title: "Chi prenota cosa. Per iscritto.", mock: kanMock,
        steps: ["Tre colonne: Da prendere, Qualcuno ci pensa, Fatto.", "Premi «Me ne occupo io» su quello che prenoti tu, poi «Fatto» quando hai finito.", "Ogni cosa ha una scadenza. Puoi aggiungerne di nuove in fondo."],
        serve: "Nessuno prenota due volte la stessa cosa e niente resta indietro. Il volo di ritorno è il primo della lista, per un motivo.",
        ride: "Chi sfora la scadenza finisce sul «Muro della vergogna», con nome e giorni di ritardo.",
        joke: "«Ma io pensavo lo facesse Augusto» non è più una difesa valida. Neanche in tribunale, avvocato." }),
      () => feature({ eye: "Organizza · Cassa comune", icon: "organizza", title: "Chi paga, chi deve, al centesimo.", mock: cassaMock,
        steps: ["Paghi qualcosa per tutti? Lo segni: cosa, quanto, chi ha pagato, che tipo di spesa.", "Il sito divide per tre e ti dice chi deve dare soldi a chi, con il minor numero di bonifici.", "Vedi anche quanto avete speso finora e quanto resta rispetto allo scenario."],
        serve: "Niente conti sul tovagliolo l'ultima sera. Tre bonifici e siete pari.",
        ride: "Chi ha pagato di più diventa il Bancomat, chi deve di più lo Scroccone. Lo vedono tutti.",
        joke: "Augusto controllerà i conti tre volte. Davide farà ricorso. Valeu, mano." }),
      () => feature({ eye: "Il kit", icon: "kit", title: "Per non fare figure de merda.",
        steps: ["Valigia: spunti le cose che hai messo dentro. Gli altri vedono a che percentuale sei.", "Darija: 21 frasi con pronuncia e traduzione paulista, più un quiz per allenarvi.", "Prezzi giusti nel souk, convertitore euro-dirham, meteo, documenti e numeri di emergenza."],
        serve: "Nel souk sapete quanto offrire, al bancomat sapete quanto prelevare, nel deserto avete il piumino.",
        ride: "Chi ha la valigia allo 0% una settimana prima viene insultato in tutte le lingue della crew.",
        joke: "«La, shukran» vuol dire «Não, valeu». La direte duemila volte. Suave." }),
      () => feature({ eye: "Home e muro", icon: "muro", title: "Il sito vi guarda. Sempre.",
        steps: ["In Home: conto alla rovescia, «Il sito vi giudica» con le battute del giorno e la pagella.", "Il contatore ufficiale delle chiamate di Davide: ogni volta che chiama, premete il tasto.", "Il Muro: scrivete frasi celebri, voti ai tagine, figure di merda. Resta tutto."],
        serve: "In un colpo d'occhio vedete a che punto siete: risposte, prenotazioni, soldi spesi, match.",
        ride: "Più usate il sito, più diventa cattivo: legge budget, voti, ritardi e debiti, e li usa contro di voi.",
        joke: "Il contatore parte da 600.000. Davide, non è un obiettivo da superare." }),
      () => {
        const s = E("div", "in-slide");
        s.append(E("span", "in-eye", "La pagella", 0), E("h2", "in-big in-mid", "Nessuno se salva.", 100),
          E("p", "in-sub", "I titoli si assegnano da soli in base a quello che fate, o non fate. Si aggiornano ogni volta che aprite il sito.", 400));
        const g = E("div", "in-chips");
        [["Il Braccino", "budget più basso"], ["Il Cacasotto", "troppi «Neanche morto»"], ["Il Tossico Supremo", "troppe cose folli"], ["Il Desaparecido", "non vota mai"], ["Il Sequestratore", "si prende le prenotazioni e non le fa"], ["Il Bogia Nen", "in ritardo sulle scadenze"], ["Il Bancomat", "ha pagato di più"], ["Lo Scroccone", "deve più soldi"], ["Il Condannato", "più voti in tribunale"], ["Lo Scansafatiche", "niente profilo"]].forEach(([t, x], i) => {
          const c = E("span", "in-title", null, 600 + i * 110); c.append(E("b", null, t), E("small", null, x)); g.appendChild(c);
        });
        s.append(g, E("p", "in-hand", "L'unico modo per salvarsi è usarlo. Forse. Foda-se.", 1900));
        return s;
      },
      (done) => {
        const s = E("div", "in-slide");
        const me = M.me();
        s.append(E("span", "in-eye", "Ultima cosa", 0), E("h2", "in-big", me ? "Sei " + me + ", giusto?" : "Chi sei?", 100),
          E("p", "in-sub", me ? "Il telefono si ricorda di te. Se non sei tu, scegli il nome giusto." : "Tocca il tuo nome: il telefono se lo ricorda e il sito sa chi insultare. Se ti spacci per un altro, se ne accorge.", 300));
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

  const NEXT = {
    Alessandro: "Ora vai su Crew e compila il profilo. Poi, magari, prenota il volo di ritorno.",
    Augusto: "Ora vai su Crew e compila il profilo. Il budget mettilo prima di calcolare il ROI.",
    Davide: "Ora vai su Crew e compila il profilo. Senza chiamare nessuno, possibilmente."
  };
  function finale(slide, n, done) {
    slide.textContent = "";
    slide.append(E("span", "in-eye", "Accesso consentito", 0), E("h2", "in-big", "Daje, " + n + ".", 100),
      E("p", "in-sub", NEXT[n] || "Ora vai su Crew e compila il profilo, tossico.", 300), E("span", "sticker rosa in-pop", "É nóis. Amunì.", 600));
    const go = E("a", "btn yellow in-anim", "Vai a compilare il profilo", 900); go.href = "crew.html"; go.style.justifySelf = "start";
    const stay = E("button", "in-other", "Resto in Home", 1100); stay.type = "button";
    stay.addEventListener("click", (e) => { e.stopPropagation(); done(); });
    go.addEventListener("click", () => store.set());
    slide.append(go, stay);
  }

  function show() {
    if (document.getElementById("intro")) return;
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ov = E("div", "intro zellige"); ov.id = "intro"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "Introduzione al sito");
    const bars = E("div", "in-progress");
    const head = E("div", "in-head");
    const skip = E("button", "in-skip", "Salta, tanto lo so"); skip.type = "button";
    head.append(E("span", "in-brand", "Come funziona"), skip);
    const stage = E("div", "in-stage");
    const nav = E("div", "in-navbtns");
    const prev = E("button", "in-nb", "Indietro"); prev.type = "button";
    const next = E("button", "in-nb in-nb-main", "Avanti"); next.type = "button";
    nav.append(prev, next);
    ov.append(bars, head, stage, nav);
    const S = slides();
    S.forEach(() => { const b = E("span", "in-seg"); b.appendChild(E("i")); bars.appendChild(b); });
    document.body.appendChild(ov); document.documentElement.style.overflow = "hidden";

    let i = 0;
    function close() {
      store.set(); window.INTRO_ACTIVE = false;
      ov.classList.add("in-out"); setTimeout(() => { ov.remove(); document.documentElement.style.overflow = ""; if (!M.me()) M.askWho(); }, reduce ? 0 : 300);
    }
    function go(n) {
      if (n < 0) n = 0;
      if (n >= S.length) return close();
      i = n;
      stage.textContent = ""; stage.scrollTop = 0; stage.appendChild(S[i](close));
      [...bars.children].forEach((b, k) => { b.className = "in-seg" + (k <= i ? " done" : ""); });
      prev.disabled = i === 0;
      nav.hidden = i === S.length - 1;
    }
    prev.addEventListener("click", (e) => { e.stopPropagation(); go(i - 1); });
    next.addEventListener("click", (e) => { e.stopPropagation(); go(i + 1); });
    skip.addEventListener("click", (e) => { e.stopPropagation(); go(S.length - 1); });
    // tocco: a sinistra indietro, a destra avanti (non sui bottoni)
    stage.addEventListener("click", (e) => {
      if (e.target.closest("button, a")) return;
      if (window.getSelection && String(window.getSelection())) return;
      const x = e.clientX / window.innerWidth;
      go(x < 0.25 ? i - 1 : i + 1);
    });
    document.addEventListener("keydown", function k(e) {
      if (!document.getElementById("intro")) return document.removeEventListener("keydown", k);
      if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
      else if (e.key === "ArrowLeft") go(i - 1);
      else if (e.key === "Escape") go(S.length - 1);
    });
    go(0);
  }

  return { shouldShow, show };
})();
