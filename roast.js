/* Il quarto della crew: legge i dati e vi prende per il culo. Pesante, per scelta di Ale. */
window.R = (function () {
  "use strict";
  const CREW = C.CREW;
  function h(s) { let x = 2166136261; for (const c of String(s)) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619); } return x >>> 0; }
  const pick = (a, seed) => a[h(seed) % a.length];
  const rnd = (a) => a[Math.floor(Math.random() * a.length)];
  const today = () => new Date().toISOString().slice(0, 10);
  const E = (n) => "€" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const BR = ["Que porra é essa?", "Caralho, mano.", "Puta merda.", "Deu ruim.", "Tá de brincadeira?", "Nossa senhora.", "Vai dar merda.", "Que isso, cara?", "Tô passado.", "Mano do céu.", "Que vergonha, hein.", "Tá ligado?"];

  function names(d) { return [...new Set(CREW.concat(((d && d.persone) || []).map((p) => p.nome)))]; }
  function fill(t, seed) {
    const a = pick(CREW, seed + "|x"); const rest = CREW.filter((n) => n !== a); const b = pick(rest, seed + "|y");
    return t.replace(/\{X\}/g, a).replace(/\{Y\}/g, b).replace(/\{BR\}/g, pick(BR, seed + "|br"));
  }

  /* -------- statistiche per persona -------- */
  const FOLLIA = {}; C.ATT.forEach((a) => (FOLLIA[a.id] = a.follia));
  function stats(d) {
    d = d || {};
    const ns = names(d), out = {};
    ns.forEach((n) => (out[n] = { n, prof: null, si: 0, forse: 0, no: 0, folli: 0, voti: 0, presi: 0, fatti: 0, late: [], pagato: 0, saldo: 0, condanne: 0, val: 0 }));
    (d.persone || []).forEach((p) => { if (out[p.nome]) out[p.nome].prof = p; });
    (d.reazioni || []).forEach((r) => { const s = out[r.nome]; if (!s) return; s[r.voto] = (s[r.voto] || 0) + 1; s.voti++; if (r.voto === "si" && FOLLIA[r.attivita] >= 4) s.folli++; });
    const t0 = today();
    (d.todo || []).forEach((t) => {
      const s = out[t.chi]; if (!s) return;
      if (t.fatto) s.fatti++; else { s.presi++; const e = t.entro && String(t.entro).slice(0, 10); if (e && e < t0) s.late.push({ t: t.titolo, g: Math.round((new Date(t0) - new Date(e)) / 86400000) }); }
    });
    const tot = (d.spese || []).reduce((a, s) => a + (Number(s.importo) || 0), 0), share = tot / Math.max(ns.length, 1);
    ns.forEach((n) => (out[n].saldo = -share));
    (d.spese || []).forEach((s) => { const p = out[s.pagato_da]; if (!p) return; p.pagato += Number(s.importo) || 0; p.saldo += Number(s.importo) || 0; });
    (d.sondaggi || []).forEach((v) => { if (out[v.scelta]) out[v.scelta].condanne++; });
    const nItems = C.VALIGIA.reduce((a, g) => a + g.items.length, 0);
    (d.valigia || []).forEach((v) => { if (out[v.nome] && v.fatto) out[v.nome].val++; });
    ns.forEach((n) => (out[n].valPct = Math.round((out[n].val / nItems) * 100)));
    return out;
  }
  const maxBy = (arr, f) => arr.reduce((b, x) => (b === null || f(x) > f(b) ? x : b), null);
  const minBy = (arr, f) => arr.reduce((b, x) => (b === null || f(x) < f(b) ? x : b), null);

  /* -------- la pagella: titoli assegnati dai dati -------- */
  function titles(d) {
    const S = stats(d), L = Object.values(S), out = [];
    const add = (tit, s, frase) => s && out.push({ t: tit, n: s.n, f: frase });
    const budg = L.filter((s) => s.prof && s.prof.budget);
    if (budg.length >= 2) { const s = minBy(budg, (x) => Number(x.prof.budget)); add("Il Tirchio", s, s.n + " ha messo " + E(s.prof.budget) + " di budget. Con " + E(s.prof.budget) + " in Marocco ci compri un tappeto e la scusa per restare a casa."); }
    const cod = maxBy(L, (s) => s.no); if (cod && cod.no >= 3) add("Il Codardo", cod, cod.n + " ha detto «Neanche morto» a " + cod.no + " attività. Ha più paura lui del cammello che il cammello di lui.");
    const ind = maxBy(L, (s) => s.forse); if (ind && ind.forse >= 3) add("L'Indeciso", ind, ind.n + ": " + ind.forse + " «Forse». Salluzzo Palermo, decidi. Tá de brincadeira?");
    const tox = maxBy(L, (s) => s.folli); if (tox && tox.folli >= 2) add("Il Tossico", tox, tox.n + " vuole fare " + tox.folli + " cose da follia 4 o 5. Tossico certificato, serve un tutore legale.");
    const voted = L.filter((s) => s.voti > 0);
    if (voted.length >= 2) { const f = minBy(L, (s) => s.voti); if (f && f.voti < maxBy(L, (s) => s.voti).voti / 3) add("Il Fantasma", f, f.n + " ha votato " + f.voti + " attività su " + C.ATT.length + ". Cadê o " + f.n + "? Nessuno lo sa."); }
    const dit = maxBy(L, (s) => s.presi); if (dit && dit.presi >= 2) add("Il Dittatore", dit, dit.n + " si è preso " + dit.presi + " prenotazioni e le tiene in ostaggio. Manager della sorca.");
    const rit = maxBy(L, (s) => s.late.length); if (rit && rit.late.length) add("Il Ritardatario", rit, rit.n + " è in ritardo su «" + rit.late[0].t + "» da " + rit.late[0].g + " giorni. Deu ruim, mano.");
    const pag = maxBy(L, (s) => s.pagato); if (pag && pag.pagato > 0) add("Il Bancomat", pag, pag.n + " ha già tirato fuori " + E(pag.pagato) + ". È il nostro Itaú personale.");
    const scr = minBy(L, (s) => s.saldo); if (scr && scr.saldo < -5) add("Lo Scroccone", scr, scr.n + " deve " + E(-scr.saldo) + " al gruppo. Valeu, mano, ma paga.");
    const col = maxBy(L, (s) => s.condanne); if (col && col.condanne >= 2) add("Il Condannato", col, "Il tribunale ha condannato " + col.n + " " + col.condanne + " volte. Il popolo ha parlato, e il popolo lo schifa.");
    const noProf = L.filter((s) => !s.prof && CREW.includes(s.n));
    noProf.forEach((s) => add("Il Pigro", s, s.n + " non ha neanche compilato il profilo. Tossico e pure pigro."));
    const valLow = L.filter((s) => s.prof);
    if (valLow.length >= 2) { const v = minBy(valLow, (s) => s.valPct); if (v && v.valPct < 50) add("Lo Svaligiato", v, v.n + ": valigia al " + v.valPct + "%. Partirà con un costume e la speranza."); }
    return out;
  }

  /* -------- battute per nome, a rotazione -------- */
  const FILL = [
    "{X} dirà «la sorca» almeno 40 volte al giorno. Ai marocchini sembrerà un saluto.",
    "Quando la guida spiegherà la storia di Volubilis, {X} dirà «Salluzzo Palermo» e andrà a cercare un bar.",
    "{X} proverà a trattare nel souk in portoghese. «Quanto custa, mano?» Il venditore triplica il prezzo.",
    "{X} e {Y} litigheranno su chi guida. Vincerà Google Maps, come sempre.",
    "Probabilità che {X} si perda nella medina di Fes: 94%. Il restante 6% è che si perda a Marrakech.",
    "A Capodanno {X} alle 23:58 dorme. Alle 00:01 giura che era sveglio.",
    "{X} chiederà al campo nel deserto la password del Wi-Fi. Tossico.",
    "Il cammello ha già scelto chi odiare. È {X}.",
    "{X} sopravviverà al deserto. Al tè con quattro cucchiai di zucchero, no.",
    "In Brasile {X} diceva «tô morto» dopo due caipirinha. In Marocco di alcol ce n'è poco: finalmente una scusa.",
    "Saudade di San Paolo in tre, due, uno. {X}, siamo in Marocco, non a Vila Madalena.",
    "{X} ha guardato il programma del giorno e ha chiesto «ma quindi oggi cosa facciamo?». Salluzzo Palermo.",
    "{X} si farà vendere un tappeto da 400 euro e lo chiamerà «affare». {BR}",
    "{X} sale sulla moto, {Y} sul 4x4 d'appoggio. Nessuno dirà chi ha pianto.",
    "{X} metterà la crema solare solo in faccia. Le gambe ringraziano.",
    "Per l'hammam {X} ha detto «tranquilli, ci sono abituato». Non è vero, la sorca.",
    "{X} parlerà inglese col cameriere, portoghese col tassista e italiano urlando a tutti gli altri.",
    "Il tribunale non ha ancora votato, ma tutti sanno che il colpevole è {X}.",
    "{X} farà 600 foto al Jardin Majorelle. Ne pubblicherà una. Mossa.",
    "Rua Augusta è a San Paolo. Augusto invece è qui, e non ha ancora prenotato niente.",
    "Davide, il deserto non è Ibirapuera. Non c'è il chiosco del cocco.",
    "Alessandro ha fatto un sito per organizzare il viaggio. Il viaggio è ancora da organizzare.",
    "{X} dice «bora» a tutti da quando è tornato dal Brasile. In Marocco si dice «yallah». Aggiornati, tossico.",
    "Prima o poi {Y} chiederà a {X} «ma tu hai il passaporto, vero?». La risposta vi spaventerà."
  ];
  function feed(d, n, seed) {
    const T = titles(d).map((x) => x.f);
    const s = seed || today();
    const pool = FILL.map((t, i) => fill(t, s + i));
    const order = pool.map((t, i) => [h(s + "o" + i), t]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    return T.slice(0, Math.max(1, n - 2)).concat(order).slice(0, n);
  }
  function random(d) { const all = titles(d).map((x) => x.f).concat(FILL.map((t) => fill(t, String(Math.random())))); return rnd(all); }

  /* -------- commento per pagina -------- */
  function line(page, d, me) {
    const S = stats(d), m = me && S[me];
    const seed = today() + page;
    if (page === "esplora" && m) {
      if (!m.voti) return me + ", non hai votato neanche un'attività. Sei qui solo per guardare le figure? Salluzzo Palermo.";
      if (m.no > m.si) return me + ": " + m.no + " «Neanche morto» e " + m.si + " «Ci sto». Sei venuto in Marocco per stare in riad a guardare il soffitto?";
      if (m.folli >= 3) return me + ", hai detto sì a " + m.folli + " cose da follia 4 o 5. Tossico. Avvisiamo tua madre?";
      return me + " ha votato " + m.voti + " attività su " + C.ATT.length + ". Le altre " + (C.ATT.length - m.voti) + " le leggerà quando sarà già a casa.";
    }
    if (page === "organizza") {
      const late = Object.values(S).filter((s) => s.late.length);
      if (late.length) return late[0].n + " è in ritardo su «" + late[0].late[0].t + "». Deu ruim. Il gruppo ti guarda, tossico.";
      const free = (d.todo || []).filter((t) => !t.fatto && !t.chi).length;
      if (free >= 6) return free + " prenotazioni senza padrone. Tre adulti, nessuno che alza la mano. La sorca.";
      const lazy = minBy(Object.values(S).filter((s) => CREW.includes(s.n)), (s) => s.presi + s.fatti);
      if (lazy && lazy.presi + lazy.fatti === 0) return lazy.n + " non si è preso neanche una prenotazione. Turista a carico degli altri.";
    }
    if (page === "cassa") {
      const scr = minBy(Object.values(S), (s) => s.saldo);
      if (scr && scr.saldo < -5) return scr.n + " deve " + E(-scr.saldo) + ". " + pick(["Valeu, mano, ma paga.", "Con quei soldi gli altri ci compravano un tagine al giorno.", "Ha il braccino più corto di una pista di Ouarzazate."], seed);
      if (!(d.spese || []).length) return "Nessuna spesa segnata. O non avete prenotato niente, o qualcuno sta facendo il furbo.";
    }
    if (page === "crew") {
      const np = CREW.filter((n) => !S[n] || !S[n].prof);
      if (np.length) return np.join(" e ") + (np.length > 1 ? " non hanno" : " non ha") + " ancora compilato il profilo. " + pick(BR, seed);
      const t = titles(d)[0]; if (t) return t.f;
    }
    if (page === "kit" && m) {
      if (m.valPct === 0) return me + ", valigia allo 0%. Partirai in ciabatte con il passaporto in tasca. Forse.";
      if (m.valPct < 60) return me + ", valigia al " + m.valPct + "%. Nel deserto di notte si va sotto zero, tossico: il piumino non è un optional.";
      return me + " ha la valigia al " + m.valPct + "%. Secchione. Nessuno ti ha chiesto di essere così preciso.";
    }
    if (page === "muro") {
      if (!(d.muro || []).length) return "Muro vuoto. Siete più noiosi di una fila al consolato. Scrivete qualcosa, la sorca.";
      const w = {}; d.muro.forEach((p) => (w[p.nome] = (w[p.nome] || 0) + 1));
      const silent = CREW.find((n) => !w[n]);
      if (silent) return silent + " non ha mai scritto sul muro. Osserva, giudica, tace. Inquietante.";
    }
    if (page === "giro") return fill("Il giro è deciso. Resta da capire chi lo rovinerà per primo. Le quote danno favorito {X}.", seed);
    return fill(pick(FILL, seed), seed);
  }

  /* -------- reazioni alle azioni (per i messaggi a comparsa) -------- */
  const REACT = {
    si: ["Fatto. Poi però ci vieni davvero, tossico.", "Ci sta. Vediamo se lo dici anche il giorno prima.", "Bora! Anzi, yallah."],
    si_folle: ["Follia confermata. Tossico.", "Questa ti costa un osso. Ci sta.", "Puta merda, che coraggio. O che incoscienza."],
    forse: ["«Forse». Salluzzo Palermo.", "Un altro forse. Il Marocco non aspetta te.", "Forse. Come quando dicevi che a San Paolo tornavi presto."],
    no: ["Codardo.", "Neanche morto? Ok, morirai di noia.", "La sorca, ma quanta paura hai?"],
    profilo: ["Profilo salvato. Ora tutti sanno quanto sei tirchio.", "Salvato. Il tribunale prende nota.", "Fatto. Valeu."],
    prendo: ["Te la sei presa. Ora se va male è colpa tua.", "Coraggioso. Hai una settimana, poi finisci sul muro della vergogna.", "Preso. Non fare il Dittatore."],
    fatto: ["Fatto davvero? Miracolo.", "Bravo. Ora non vantarti per tre giorni.", "Una in meno. È nóis."],
    lascia: ["L'hai mollata. Classico.", "Scappato. Il gruppo ricorda.", "Lasciata. Tossico e pure inaffidabile."],
    spesa: ["Segnato. Lo Scroccone trema.", "Spesa salvata. Ora qualcuno ti deve soldi: goditi il momento.", "Fatto. Il Bancomat ringrazia."],
    muro: ["Attaccato al muro. Verrà usato contro di te.", "Fatto. Ora non si cancella dalla memoria.", "Pubblicato. Che vergogna, hein."],
    valigia: ["Spuntato. Un passo più vicino a non dimenticare il passaporto.", "Ok. Il piumino l'hai preso, vero?", "Valigia in crescita. Tossico ma organizzato."],
    voto: ["Condanna registrata.", "Il tribunale ringrazia.", "Voto salvato. Nessuna pietà."]
  };
  function react(kind) { return rnd(REACT[kind] || ["Fatto."]); }

  /* -------- il tasto "non ho capito un cazzo" -------- */
  const SPIEGA = {
    home: "Questa è la pagina iniziale: conto alla rovescia, a che punto siete e chi vi sta facendo fare brutta figura. Tocca le tessere colorate per andare nelle altre pagine.",
    esplora: "Ci sono tutte le cose che si possono fare. Su ognuna premi Ci sto, Forse o Neanche morto. Se tutti e tre dite Ci sto, è un match e la facciamo.",
    giro: "In alto scegli lo scenario, A, B, C o D. Sotto vedi la mappa e cosa si fa ogni giorno, dove si dorme e quante ore si guida.",
    crew: "Compila il tuo profilo: budget, patente, fuoristrada e scenario preferito. Lo scenario del viaggio si decide da solo. Più sotto c'è il tribunale: voti chi è più probabile che faccia una figura di merda.",
    organizza: "Prenotazioni: premi Me ne occupo io su quello che prenoti tu, e Fatto quando hai finito. Cassa: segna quello che paghi per tutti, il sito calcola chi deve dare soldi a chi.",
    kit: "La valigia la spunti tu e gli altri vedono a che punto sei. Sotto trovi le frasi in darija, i prezzi giusti per trattare e il convertitore euro-dirham.",
    muro: "Scrivi quello che vuoi: frasi celebri, voti ai tagine, figure di merda. Lo vedono tutti."
  };
  function mountSalluzzo(page) {
    if (document.getElementById("salluzzo")) return;
    const b = document.createElement("button");
    b.id = "salluzzo"; b.type = "button"; b.className = "salluzzo"; b.textContent = "Non ho capito un cazzo";
    b.addEventListener("click", () => {
      const ov = document.createElement("div"); ov.className = "overlay"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
      const card = document.createElement("div"); card.className = "card";
      const st = document.createElement("span"); st.className = "sticker rosa"; st.textContent = "Salluzzo Palermo";
      const h2 = document.createElement("h2"); h2.textContent = "Tranquillo, te lo spiego piano.";
      const p = document.createElement("p"); p.textContent = SPIEGA[page] || SPIEGA.home;
      const br = document.createElement("p"); br.className = "hand"; br.style.color = "var(--rosa)"; br.textContent = rnd(["Entendeu, mano?", "Tá ligado agora?", "Facile, anche per te.", "Se non hai capito neanche così, la sorca."]);
      const ok = document.createElement("button"); ok.className = "btn"; ok.type = "button"; ok.textContent = "Ho capito. Forse.";
      ok.addEventListener("click", () => ov.remove()); ov.addEventListener("click", (e) => { if (e.target === ov) ov.remove(); });
      card.append(st, h2, p, br, ok); ov.appendChild(card); document.body.appendChild(ov); ok.focus();
    });
    document.body.appendChild(b);
  }

  /* -------- la barra "il sito dice" in cima a ogni pagina -------- */
  function bar(page, d, me) {
    const box = document.getElementById("roast"); if (!box) return;
    box.hidden = false; box.textContent = "";
    const lab = document.createElement("span"); lab.className = "roast-lab"; lab.textContent = "Il sito dice";
    const txt = document.createElement("p"); txt.className = "roast-txt"; txt.textContent = line(page, d, me);
    const more = document.createElement("button"); more.type = "button"; more.className = "btn yellow small"; more.textContent = "Un'altra";
    more.addEventListener("click", () => { txt.textContent = random(d); });
    box.append(lab, txt, more);
  }

  return { titles, feed, random, line, react, bar, mountSalluzzo, fill, stats, CREW };
})();
