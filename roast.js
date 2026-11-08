/* Il quarto della crew: legge i dati e vi prende per il culo.
   Voce mista: romano, piemontese, palermitano e brasiliano dell'Erasmus. Pesante, per scelta di Ale. */
window.R = (function () {
  "use strict";
  const CREW = C.CREW;
  function h(s) { let x = 2166136261; for (const c of String(s)) { x ^= c.charCodeAt(0); x = Math.imul(x, 16777619); } return x >>> 0; }
  const pick = (a, seed) => a[h(seed) % a.length];
  const rnd = (a) => a[Math.floor(Math.random() * a.length)];
  const today = () => new Date().toISOString().slice(0, 10);
  const E = (n) => "€" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  /* esclamazioni di tutte le parti */
  const EXCL = ["Ahó", "Talìa", "Minchia", "Bôja fauss", "Caralho", "Porra", "Puta que pariu", "Mortacci", "Bedda matri", "Puta merda", "Ma che davero", "Nossa", "Ma la sorca", "Foda-se"];
  /* «guarda questo tossico», in tutti gli accenti */
  const TOX = ["Guarda questo tossico.", "Ahó, guarda 'sto tossico.", "Talìa a stu tossico.", "Olha esse tossico.", "Guarda 'l tossic, neh.", "Minchia, che tossico.", "Olha esse vacilão.", "Que trouxa, mano."];
  /* chiusure */
  const END = ["Daje.", "Esageruma nen.", "Amunì.", "Valeu.", "Bora.", "Tranquilo.", "Suave.", "Che stai a fa'?", "Chi fa, babbìi?", "Tá de brincadeira?", "Deu ruim.", "Que merda, hein.", "Nun ce sta niente da fa'.", "È na camurrìa.", "Neh.", "Porra, mano."];

  function names(d) { return [...new Set(CREW.concat(((d && d.persone) || []).map((p) => p.nome)))]; }
  function fill(t, seed) {
    const a = pick(CREW, seed + "|x"); const rest = CREW.filter((n) => n !== a); const b = pick(rest, seed + "|y");
    return t.replace(/\{X\}/g, a).replace(/\{Y\}/g, b).replace(/\{EX\}/g, pick(EXCL, seed + "|e")).replace(/\{TOX\}/g, pick(TOX, seed + "|t")).replace(/\{END\}/g, pick(END, seed + "|z"));
  }

  /* -------- statistiche per persona -------- */
  const FOLLIA = {}; C.ATT.forEach((a) => (FOLLIA[a.id] = a.follia));
  function stats(d) {
    d = d || {};
    const ns = names(d), out = {};
    ns.forEach((n) => (out[n] = { n, prof: null, si: 0, forse: 0, no: 0, folli: 0, voti: 0, presi: 0, fatti: 0, late: [], pagato: 0, saldo: 0, condanne: 0, val: 0, valPct: 0 }));
    (d.persone || []).forEach((p) => { if (out[p.nome]) out[p.nome].prof = p; });
    (d.reazioni || []).forEach((r) => { const s = out[r.nome]; if (!s || !(r.attivita in FOLLIA)) return; s[r.voto] = (s[r.voto] || 0) + 1; s.voti++; if (r.voto === "si" && FOLLIA[r.attivita] >= 4) s.folli++; });
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
    if (budg.length >= 2) { const s = minBy(budg, (x) => Number(x.prof.budget)); add("Il Braccino", s, "Ahó, " + s.n + " ha messo " + E(s.prof.budget) + " de budget. Co' " + E(s.prof.budget) + " in Marocco ce compri un tappeto e la scusa pe' restà a casa. Guarda questo tossico."); }
    const cod = maxBy(L, (s) => s.no); if (cod && cod.no >= 3) add("Il Cacasotto", cod, cod.n + " ha detto «Neanche morto» a " + cod.no + " attività. Minchia, ha più paura lui del cammello che il cammello di lui.");
    const ind = maxBy(L, (s) => s.forse); if (ind && ind.forse >= 3) add("L'Indeciso", ind, ind.n + ": " + ind.forse + " volte «Forse». Esageruma nen co' 'ste decisioni, eh. Decidi, tossico.");
    const tox = maxBy(L, (s) => s.folli); if (tox && tox.folli >= 2) add("Il Tossico Supremo", tox, tox.n + " vuole fare " + tox.folli + " cose da follia 4 o 5. Tossico certificato, serve un tutore legale. Caralho.");
    const voted = L.filter((s) => s.voti > 0);
    if (voted.length >= 2) { const f = minBy(L, (s) => s.voti), top = maxBy(L, (s) => s.voti); if (f && f.voti < top.voti / 3) add("Il Desaparecido", f, f.n + " ha votato " + f.voti + " attività su " + C.ATT.length + ". Cadê o " + f.n + "? Unni sì? Nessuno lo sa."); }
    const dit = maxBy(L, (s) => s.presi); if (dit && dit.presi >= 2) add("Il Sequestratore", dit, dit.n + " s'è preso " + dit.presi + " prenotazioni e le tiene in ostaggio. Manager della sorca.");
    const rit = maxBy(L, (s) => s.late.length); if (rit && rit.late.length) add("Il Bogia Nen", rit, rit.n + " è in ritardo su «" + rit.late[0].t + "» da " + rit.late[0].g + " giorni. Bogia nen: non si muove. Deu ruim.");
    const pag = maxBy(L, (s) => s.pagato); if (pag && pag.pagato > 0) add("Il Bancomat", pag, pag.n + " ha già tirato fuori " + E(pag.pagato) + ". È il nostro Itaú personale. Bedda matri, che generosità.");
    const scr = minBy(L, (s) => s.saldo); if (scr && scr.saldo < -5) add("Lo Scroccone", scr, scr.n + " deve " + E(-scr.saldo) + " al gruppo. Valeu, mano, ma paga. Mortacci.");
    const col = maxBy(L, (s) => s.condanne); if (col && col.condanne >= 2) add("Il Condannato", col, "Il tribunale ha condannato " + col.n + " " + col.condanne + " volte. Il popolo ha parlato. Talìa a stu tossico.");
    L.filter((s) => !s.voti && CREW.includes(s.n)).forEach((s) => add("Lo Scansafatiche", s, s.n + " nun ha votato manco un'attività. Tossico e pure pigro."));
    const valOk = L.filter((s) => s.voti);
    if (valOk.length >= 2) { const v = minBy(valOk, (s) => s.valPct); if (v && v.valPct < 50) add("Lo Svaligiato", v, v.n + ": valigia al " + v.valPct + "%. Parte co' un costume e la speranza. Nossa."); }
    return out;
  }

  /* -------- battute per nome, a rotazione -------- */
  const FILL = [
    "{X} dirà «la sorca» almeno 40 volte al giorno. Ai marocchini sembrerà un saluto. {TOX}",
    "Quando la guida spiegherà la storia di Volubilis, {X} chiederà dove sta il bar. {TOX}",
    "{X} proverà a trattare nel souk in portoghese. «Quanto custa, mano?» Il venditore triplica il prezzo. {END}",
    "{X} e {Y} litigheranno su chi guida. Vincerà Google Maps, come sempre. {END}",
    "Probabilità che {X} si perda nella medina di Fes: 94%. Il restante 6% è che si perda a Marrakech. {EX}.",
    "A Capodanno {X} alle 23:58 dorme. Alle 00:01 giura che era sveglio. {TOX}",
    "{X} chiederà al campo nel deserto la password del Wi-Fi. {TOX}",
    "Il cammello ha già scelto chi odiare. È {X}. {END}",
    "{X} sopravviverà al deserto. Al tè con quattro cucchiai di zucchero, no. {EX}.",
    "In Brasile {X} diceva «tô morto» dopo due caipirinha. In Marocco di alcol ce n'è poco: finalmente una scusa.",
    "Saudade di San Paolo in tre, due, uno. {X}, semo in Marocco, non a Vila Madalena. {END}",
    "{X} ha letto il programma del giorno e ha chiesto «ma quindi oggi che famo?». {TOX}",
    "{X} si farà vendere un tappeto da 400 euro e lo chiamerà «affare». {EX}.",
    "{X} sale sulla moto, {Y} sul 4x4 d'appoggio. Nessuno dirà chi ha pianto. {END}",
    "{X} metterà la crema solare solo in faccia. Le gambe ringraziano. {EX}.",
    "Per l'hammam {X} ha detto «tranquilli, so' abituato». Non è vero, la sorca.",
    "{X} parlerà inglese col cameriere, portoghese col tassista e urlerà in dialetto a tutti gli altri. {END}",
    "Il tribunale non ha ancora votato, ma tutti sanno che il colpevole è {X}. {TOX}",
    "{X} farà 600 foto al Jardin Majorelle. Ne pubblicherà una. Mossa. {EX}.",
    "Rua Augusta sta a San Paolo. Augusto invece sta qua, e non ha ancora prenotato niente. Ahó.",
    "Davide, il deserto non è Ibirapuera. Non c'è il chiosco del cocco. Esageruma nen.",
    "Alessandro ha fatto un sito per organizzare il viaggio. Il viaggio è ancora da organizzare. Minchia, che manager.",
    "{X} dice «bora» a tutti da quando è tornato dal Brasile. Qui si dice «yallah». Aggiornati, tossico.",
    "Prima o poi {Y} chiederà a {X}: «ma tu ce l'hai il passaporto, vero?». La risposta vi spaventerà. {END}",
    "Uno de Roma, uno de Saluzzo, uno de Palermo in una tenda nel deserto. Non è una barzelletta, è il 3 gennaio. {EX}.",
    "{X} sostiene che la bagna cauda, la carbonara e le panelle battono il tagine. Ha ragione, ma stai zitto, tossico.",
    "{X} alla dogana: «Nothing to declare». Tranne la vergogna. {END}",
    "{X} ha chiesto se nel Sahara fa freddo. Sì, tossico. Sotto zero. Portate il piumino, amunì.",
    "La guida dirà «sette minuti a piedi». {X} capirà «sette chilometri» e avrà ragione lui. {EX}.",
    "{X} proverà il surf, {Y} lo filmerà, il video girerà nel gruppo per anni. {TOX}",
    "Davide ha chiamato il gruppo 600.000 volte su WhatsApp per organizzare questo viaggio. Il viaggio è sempre lo stesso. Porra.",
    "Davide si è laureato in giurisprudenza da poco. Al primo souk farà ricorso al TAR contro il prezzo delle babbucce.",
    "Davide leggerà il contratto del noleggio auto 40 volte, troverà la clausola vessatoria e firmerà comunque. Avvocato de che?",
    "«Obiezione, vostro onore»: Davide al cammello che non parte. Respinta. Caralho.",
    "Davide ha mandato un vocale di 9 minuti per chiedere se il 29 è martedì. È martedì, dottore.",
    "Quando il venditore dirà «prezzo speciale per te», Davide chiederà le condizioni generali di contratto. Puta que pariu.",
    "Piacenza sta a Milano come Fes sta a Marrakech: tutti dicono che è vicina, nessuno ci va. Vero, Augusto? Bora.",
    "Augusto dirà «tranquilo, suave» anche quando il cammello gli morde lo zaino. Porra.",
    "Davide chiama, Augusto dice «suave», Alessandro fa il sito. Il viaggio, intanto, non lo organizza nessuno. Foda-se.",
    "Davide ha chiamato anche mentre scrivevamo questa frase. Non rispondete, è una trappola.",
    "{X}: «tranquilo, suave, bora». Tre parole e ha già perso il passaporto. Porra.",
    "Il saluzzese chiede se il tagine è buono come la bagna cauda. No, e mo' magna.",
    "Er palermitano ha detto «amunì» alle 9. Alle 11 stava ancora a fa' colazione.",
    "Il palermitano corregge il cameriere: «arancina, non arancino». A Fes. Il cameriere annuisce per paura.",
    "Er romano s'è preso tre prenotazioni e nun n'ha chiusa una. Daje, eh, co' calma.",
    "Il saluzzese nel souk: «Esageruma nen» sul prezzo. Il venditore non capisce, ma abbassa lo stesso.",
    "Er palermitano nel deserto: «Minchia, ma unni è u mari?». A 400 chilometri, picciotto.",
    "Er romano al Jardin Majorelle: «Bello, eh. Ma Villa Borghese...». Nessuno gliel'ha chiesto.",
    "Il saluzzese è bogia nen: resta fermo pure in cima alla duna mentre gli altri scendono col sandboard.",
    "Il saluzzese, falso e cortese: «Che buono il tagine!». Poi in camera: «La polenta era un'altra cosa».",
    "Er palermitano al primo caffè marocchino: «Chistu non è café». Per una volta ha ragione.",
    "Er romano trova tranquillo il traffico di Marrakech: «'Sto Raccordo è niente». Poi un motorino gli passa sui piedi.",
    "Tramonto nel deserto. Er romano: «Daje, bello». Il saluzzese: «Esageruma nen». Er palermitano: «Minchia». Poesia.",
    "Er palermitano dice «talìa» a ogni cammello. I cammelli, a loro volta, talìano lui. Male.",
    "Il saluzzese ha portato la giacca a vento da montagna. Per una volta, il più furbo della crew.",
    "Er romano parla col venditore come al mercato di Porta Portese. Il venditore è più romano de lui.",
    "{X} ha chiesto alla guida se a Ketama si fa «il giro panoramico». Panoramico per chi, tossico?",
    "{X} sente «bomba» e pensa ai fuochi di Capodanno. {Y} pensa ad altro. {TOX}",
    "{X} dice che vuole andare nel Rif «per le montagne». Le montagne. Certo. Mortacci.",
    "Il cammello è più rilassato de {X}. E il cammello non s'è fatto niente. Suave.",
    "{X} ha chiesto un tè alla menta «ma de quello forte». È tè, tossico. Solo tè.",
    "Er palermitano vede un campo verde e dice «minchia, che bella menta». Non è menta, picciotto.",
    "Il saluzzese: «Esageruma nen». Detto da uno che a Ketama voleva fermarsi tre giorni.",
    "A Chefchaouen è tutto blu. Pure gli occhi de {X}, a giudicare dalle foto. Porra.",
    "{X}: «Bora, una bomba e poi Jemaa el-Fnaa». La bomba era un msemen col miele. Fidatevi.",
    "Promemoria del sito: in Marocco la legge sulle canne non scherza. {X}, il sito non viene a prenderti in caserma. Caralho.",
    "{X} torna dal deserto e dice «ho visto cose». Erano le stelle, tossico. Erano solo le stelle.",
    "Il tribunale non ha ancora votato chi torna più rilassato del cammello, ma il favorito è {X}. {END}",
    "Tre single, undici giorni. L'unica che vi guarda negli occhi è la cammella. {END}",
    "{X} ha scaricato Tinder in Marocco. Unico match: la guida del deserto, 54 anni, baffi. Suave.",
    "Probabilità che {X} rimorchi a Capodanno: come trovare la neve a Taghazout. {EX}.",
    "{X} dice «stasera è la volta buona». Lo dice dal 2019. Tossico.",
    "Al surf camp {X} si presenterà come «surfista». Dopo tre minuti in acqua, nessuna gli crederà più.",
    "{X} prova l'approccio in portoghese: «oi, tudo bem?». Lei è di Bergamo. Porra.",
    "Il registro dei due di picche è aperto. {X} ha già chiesto se si possono cancellare. No."
  ];
  function feed(d, n, seed) {
    const seen = new Set(), T = [];
    titles(d).forEach((x) => { if (!seen.has(x.t)) { seen.add(x.t); T.push(x.f); } });
    const s = seed || today();
    const order = FILL.map((t, i) => [h(s + "o" + i), fill(t, s + i)]).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
    return T.slice(0, 2).concat(order).slice(0, n);
  }
  function random(d) { const all = titles(d).map((x) => x.f).concat(FILL.map((t) => fill(t, String(Math.random())))); return rnd(all); }

  /* -------- commento per pagina -------- */
  function line(page, d, me) {
    const S = stats(d), m = me && S[me];
    const seed = today() + page;
    if (page === "esplora" && m) {
      if (!m.voti) return "Ahó " + me + ", non hai votato manco un'attività. Stai qua solo pe' guardà le figure? " + pick(TOX, seed);
      if (m.no > m.si) return me + ": " + m.no + " «Neanche morto» e " + m.si + " «Ci sto». Sei venuto in Marocco pe' sta' in riad a guardà il soffitto? Minchia.";
      if (m.folli >= 3) return me + ", hai detto sì a " + m.folli + " cose da follia 4 o 5. Tossico. Avvisiamo tua madre? Caralho.";
      return me + " ha votato " + m.voti + " attività su " + C.ATT.length + ". Le altre " + (C.ATT.length - m.voti) + " le legge quando è già tornato. " + pick(END, seed);
    }
    if (page === "organizza") {
      const late = Object.values(S).filter((s) => s.late.length);
      if (late.length) return late[0].n + " è in ritardo su «" + late[0].late[0].t + "». Deu ruim. Il gruppo ti guarda, tossico.";
      const free = (d.todo || []).filter((t) => !t.fatto && !t.chi).length;
      if (free >= 6) return free + " prenotazioni senza padrone. Tre adulti e nessuno che alza la mano. Ma la sorca.";
      const lazy = minBy(Object.values(S).filter((s) => CREW.includes(s.n)), (s) => s.presi + s.fatti);
      if (lazy && lazy.presi + lazy.fatti === 0) return lazy.n + " non s'è preso manco una prenotazione. Turista a carico degli altri. " + pick(TOX, seed);
    }
    if (page === "cassa") {
      const scr = minBy(Object.values(S), (s) => s.saldo);
      if (scr && scr.saldo < -5) return scr.n + " deve " + E(-scr.saldo) + ". " + pick(["Valeu, mano, ma paga.", "Co' quei soldi gli altri ce se magnavano un tagine al giorno.", "Ha il braccino più corto di una pista di Ouarzazate. Bôja fauss."], seed);
      if (!(d.spese || []).length) return "Nessuna spesa segnata. O non avete prenotato niente, o qualcuno sta a fa' il furbo. " + pick(END, seed);
    }
    if (page === "crew") {
      const np = CREW.filter((n) => !S[n] || !S[n].prof);
      if (np.length) return np.join(" e ") + (np.length > 1 ? " non hanno" : " non ha") + " ancora compilato il profilo. " + pick(TOX, seed);
      const t = titles(d)[0]; if (t) return t.f;
    }
    if (page === "kit" && m) {
      if (m.valPct === 0) return me + ", valigia allo 0%. Parti in ciabatte col passaporto in tasca. Forse. " + pick(TOX, seed);
      if (m.valPct < 60) return me + ", valigia al " + m.valPct + "%. Nel deserto de notte se va sotto zero: il piumino non è un optional. Esageruma nen, ma prendilo.";
      return me + " ha la valigia al " + m.valPct + "%. Secchione. Nessuno t'ha chiesto de esse così preciso. Bedda matri.";
    }
    if (page === "muro") {
      if (!(d.muro || []).length) return "Muro vuoto. Siete più noiosi de 'na fila al consolato. Scrivete qualcosa, la sorca.";
      const w = {}; d.muro.forEach((p) => (w[p.nome] = (w[p.nome] || 0) + 1));
      const silent = CREW.find((n) => !w[n]);
      if (silent) return silent + " non ha mai scritto sul muro. Osserva, giudica, tace. Falso e cortese. Inquietante.";
    }
    if (page === "vota" && m) {
      if (!m.voti) return "Ahó " + me + ", zero voti. Trascina 'sta carta, non ti morde. " + pick(END, seed);
      if (m.no >= 5 && m.no > m.si) return me + ": già " + m.no + " volte «Neanche morto». Sei venuto in Marocco pe' dormì? Cacasotto.";
      return me + ", sei a " + m.voti + " su " + C.ATT.length + ". " + pick(["Daje che ce la fai.", "Bora, mancano poche carte. Più o meno.", "Il cammello vota più veloce de te."], seed);
    }
    if (page === "sifa") return pick(["Tre 🔥 e si fa. Se una cosa sta in «Manca uno», andate a rompere le palle a chi manca.", "Questa pagina dice cosa si fa davvero. Il resto sono chiacchiere da vocale de Davide.", "Quello che sta in «Si fa» va prenotato. Non domani, oggi. Porra."], seed);
    if (page === "budget") return pick(["Per una volta siamo seri. Una.", "I numeri sono stime: quelli veri li vedete quando prenotate. Seriamente.", "Ogni tre 🔥 su Esplora, qui sale il conto. Votate con il portafoglio."], seed);
    if (page === "cuori") return pick(["Tre single in Marocco. L'unica che vi guarda negli occhi è la cammella.", "Le statistiche sono chiare: tornerete single, ma abbronzati.", "Probabilità di rimorchiare nel deserto: zero. Probabilità di innamorarsi del cammello: alta.", "Tinder in Marocco: unico match, la guida del deserto, 54 anni, baffi. Suave."], seed);
    if (page === "tribunale") return fill("Il tribunale è aperto. Le quote danno colpevole {X} su tutto. {END}", seed);
    if (page === "viaggio") return fill(pick(["Undici giorni, una Dacia, zero piani. Votate, tossici. {END}", "Il giorno più a rischio è il 2 gennaio: sei ore di guida e {X} che chiede «quanto manca?». {END}"], seed), seed);
    if (page === "must") return fill(pick(["I must non si discutono. Si discute solo come. {X}, scegli. {END}", "Se tornate senza aver fatto la moto, {X} paga la cena a tutti. {END}"], seed), seed);
    if (page === "mappa") return pick(["Ketama è segnata sulla mappa solo per dirvi di no. Tossici avvisati.", "La sorca più vicina ve la dice il tasto «Dove sono io?». Il risultato vi offenderà.", "Ogni pallino è un posto vero. Gli unici finti siete voi tre quando dite «domani prenotiamo»."], seed);
    if (page === "scenari") return fill(pick(["Quattro scenari, tre tossici, zero decisioni. {X}, vota e non rompere. {END}", "Il più votato vince. Se non votate, decide {X} da solo. Pensateci. {END}", "Scenario B: chi ha la patente A? {X} ha detto «più o meno». {TOX}"], seed), seed);
    if (page === "giro") return fill("Il giro è deciso. Resta da capire chi lo rovinerà per primo: le quote danno favorito {X}. {END}", seed);
    return fill(pick(FILL, seed), seed);
  }

  /* -------- reazioni alle azioni -------- */
  const REACT = {
    si: ["Fatto. Poi però ce vieni davvero, tossico.", "Ci sta. Vediamo se lo dici pure il giorno prima.", "Amunì! Anzi, yallah.", "Bora, caralho!", "Suave. Ci sta."],
    si_folle: ["Follia confermata. Guarda questo tossico.", "Questa te costa un osso. Daje.", "Puta merda, che coraggio. O che incoscienza.", "Tossico certificato. Più del Rif."],
    forse: ["«Forse». Esageruma nen, eh.", "Un altro forse. Il Marocco non aspetta te, tossico.", "Forse. Come quando dicevi che da San Paolo tornavi presto."],
    no: ["Cacasotto.", "Neanche morto? Va bene, morirai de noia.", "Minchia, ma quanta paura hai?", "Ma la sorca. Coraggio zero.", "Que merda, vacilão.", "Porra, mano, che paura."],
    profilo: ["Profilo salvato. Ora tutti sanno quanto sei braccino.", "Salvato. Il tribunale prende nota.", "Fatto. Valeu."],
    prendo: ["Te la sei presa. Ora se va male è colpa tua.", "Coraggioso. Hai una settimana, poi finisci sul muro della vergogna.", "Presa. Non fa' il Sequestratore."],
    fatto: ["Fatto davvero? Miracolo. Bedda matri.", "Bravo. Ora non te vantà per tre giorni.", "Una in meno. È nóis."],
    lascia: ["L'hai mollata. Classico.", "Scappato. Il gruppo se ricorda.", "Lasciata. Tossico e pure inaffidabile."],
    spesa: ["Segnato. Lo Scroccone trema.", "Spesa salvata. Ora qualcuno te deve dei soldi: goditela.", "Fatto. Il Bancomat ringrazia."],
    muro: ["Attaccato al muro. Verrà usato contro de te.", "Fatto. Ora non se cancella dalla memoria.", "Pubblicato. Che vergogna, hein."],
    valigia: ["Spuntato. Un passo più vicino a non dimenticà il passaporto.", "Ok. Il piumino l'hai preso, vero?", "Valigia in crescita. Tossico ma organizzato."],
    voto: ["Condanna registrata.", "Il tribunale ringrazia. Talìa che giustizia.", "Voto salvato. Nessuna pietà.", "Sentenza emessa. Davide farà ricorso, come sempre."],
    chiamata: ["Registrata. Avvocato, il telefono si spegne anche.", "Un'altra. Porra, Davide.", "Segnata. WhatsApp ringrazia per il traffico.", "+1. Puta que pariu, ancora?"],
    chiamata_davide: ["Davide, ti segni le chiamate da solo? Obiezione respinta.", "Autodenuncia accolta. Caralho."]
  };
  function react(kind) { return rnd(REACT[kind] || ["Fatto."]); }

  /* -------- le notifiche: la prima è sempre quella di Davide -------- */
  function notifs(d, page, me) {
    d = d || {};
    const giorni = Math.max(0, Math.ceil((new Date(2026, 11, 28, 23, 30) - new Date()) / 86400000));
    const L = [
      { chi: "Davide", app: "I 4 tossici", t: "Davide", x: "Ragazzi quando prendiamo i voli?", href: "organizza.html" },
      { chi: "Davide", app: "I 4 tossici", t: "Davide", x: "Ragazzi quando prendiamo i voli? 🙏", href: "organizza.html" },
      { ic: "📞", col: "#30b94d", app: "Telefono", t: "Chiamata persa", x: "Davide (3)", quando: "2 min fa", href: "index.html" },
      { chi: "Davide", app: "I 4 tossici", t: "Davide", x: "Ok i voli li abbiamo presi. Ragazzi quando prenotiamo il riad?", href: "organizza.html" },
      { chi: "Davide", app: "I 4 tossici", t: "Davide", x: "Stasera vi chiamo per il transfer da Fes. Solo 5 minuti.", href: "organizza.html" },
      { ic: "🐪", app: "I 4 tossici", t: "I 4 tossici", x: "Davide ha cambiato il nome del gruppo in «Ragazzi quando prendiamo i voli»", href: "index.html" },
      { chi: "Augusto", app: "I 4 tossici", t: "Augusto", x: "Tranquilo, suave. Domani voto tutto.", href: "esplora.html" },
      { chi: "Alessandro", app: "I 4 tossici", t: "Alessandro", x: "Ho fatto un sito intero. Votate, tossici.", href: "esplora.html" },
      { ic: "🥶", col: "#0F6FB8", app: "Meteo", t: "Merzouga, stanotte", x: "-2°. Il piumino l'hai preso? No. Lo sapevo.", href: "kit.html" },
      { ic: "💃", col: "#d70015", app: "Mappa", t: "Sorca nelle vicinanze", x: "Nessun risultato nel raggio di 2.000 km. Mancano " + giorni + " giorni.", href: "mappa.html" },
      { ic: "🌿", col: "#1d8a3a", app: "Mappa", t: "Ketama", x: "Ketama aggiunta ai must. Il navigatore ha chiesto il permesso alla mamma.", href: "must.html#valli" },
      { ic: "💸", col: "#B35A00", app: "Banca", t: "Il saluzzese", x: "Ha controllato il conto del viaggio per la terza volta oggi. Esageruma nen.", href: "budget.html" },
      { ic: "🔥", col: "#D6345A", app: "Il viaggio", t: "Votazione aperta", x: "Capodanno nel deserto aspetta il tuo voto. Il deserto no, quello aspetta da sempre.", href: "viaggio.html#cap-agafay" },
      { ic: "⚖️", col: "#6E2BC2", app: "Tribunale", t: "Avv. Davide", x: "Ha fatto ricorso contro il titolo di Tossico Supremo. Respinto.", href: "tribunale.html" },
      { chi: "Davide", app: "I 4 tossici", t: "Davide", x: "Ragazzi quando prendiamo i voli? Ah no, presi. Allora: quando prendiamo quelli dell'anno prossimo?", href: "viaggio.html" },
      { chi: "Davide", app: "I 4 tossici", t: "Davide", x: "Ho fatto un Excel coi voli. Ve lo spiego in un vocale da 9 minuti.", href: "viaggio.html" },
      { chi: "Augusto", app: "I 4 tossici", t: "Augusto", x: "Ragazzi ma nel deserto fa caldo vero? Porto solo i pantaloncini.", href: "kit.html" },
      { chi: "Alessandro", app: "I 4 tossici", t: "Alessandro", x: "Ho messo i must. Votate o vi tolgo dal gruppo.", href: "must.html" },
      { ic: "⭐", col: "#0B7A5C", app: "I must", t: "La moto", x: "Nessuno ha ancora scelto come fare la moto. Il cammello ride.", href: "must.html#moto" },
      { ic: "🧭", col: "#D6345A", app: "Il viaggio", t: "3 gennaio", x: "Sveglia alle 6 per l'alba nelle dune. Davide metterà 4 sveglie e ne spegnerà 5.", href: "viaggio.html#d=2027-01-03" },
      { ic: "🚨", col: "#d70015", app: "Polizia di Marrakech", t: "Segnalazione", x: "Tre italiani hanno contrattato un tè per 40 minuti. Uno era di Saluzzo.", href: "kit.html" },
      { ic: "🐪", col: "#B35A00", app: "Fatima, cammella", t: "Nuovo match", x: "Fatima ha messo like alla tua foto. È l'unica.", href: "notte.html" },
      { ic: "🧔", col: "#8B5A2B", app: "Ahmed, guida «amica»", t: "Messaggio", x: "Amico! La strada è chiusa. Vieni con me, prezzo buono.", href: "mappa.html#fesguide" },
      { ic: "✈️", col: "#0F6FB8", app: "Volo Agadir → Londra", t: "8 gennaio", x: "A Londra 7 gradi e pioggia. Voi in ciabatte e muta. Welcome.", href: "kit.html" },
      { ic: "🏄", col: "#0071e3", app: "Surf school Taghazout", t: "Prenotazione", x: "Il maestro ha visto le vostre foto. Ha chiesto un supplemento.", href: "must.html#surf" },
      { ic: "🍷", col: "#8e44ad", app: "Capodanno", t: "31 dicembre", x: fill("Ultimo sondaggio: {X} crolla prima di mezzanotte. Quota 1,20.", "cap" + giorni), href: "notte.html" }
    ];
    titles(d).slice(0, 3).forEach((x) => L.push({ chi: x.n, app: "Pagella", t: x.n + " è " + x.t, x: x.f, href: "index.html" }));
    feed(d, 3).forEach((x) => L.push({ ic: "🐪", app: "Il sito", t: "Guarda questo tossico", x, href: "index.html" }));
    return L;
  }

  /* -------- i popup: una domanda, due risposte, una battuta -------- */
  function popups(d, page, me) {
    return [
      { chi: "Davide", app: "I 4 tossici", t: "Davide", x: "Ragazzi quando prendiamo i voli?", a: ["Domani", "Già presi!"], r: ["«Domani» l'hai detto anche il 3 ottobre. Ma ok.", "Presi l'8 novembre. Davide l'ha chiesto lo stesso altre 40 volte."], href: "index.html" },
      { ic: "📞", col: "#30b94d", app: "Chiamata in arrivo", t: "Davide", x: "Vi chiamo 5 minuti per il transfer da Fes?", a: ["Rispondi", "Rifiuta"], r: ["Chiamata durata 47 minuti. Del transfer neanche una parola.", "Ha richiamato. Due volte. Ora sta scrivendo."], href: "organizza.html" },
      { chi: "Augusto", app: "I 4 tossici", t: "Augusto", x: "Ragazzi ma il piumino serve davvero?", a: ["Sì, a Merzouga fa -2°", "No, suave"], r: ["Bravo. Lo comprerà il 27 dicembre alle 23.", "Ok. Ci vediamo nel deserto, ghiacciolo."], href: "kit.html" },
      { ic: "🧔", col: "#8B5A2B", app: "Medina di Fes", t: "Ahmed, guida «amica»", x: "Amico! La strada è chiusa. Vieni con me?", a: ["Ok amico", "La, shukran"], r: ["Hai appena pagato 200 dirham per vedere una strada aperta.", "Bravo. Livello 1 della medina superato."], href: "mappa.html#fesguide" },
      { ic: "🐪", col: "#B35A00", app: "Fatima, cammella", t: "Fatima", x: "Ti va un giro sulle dune stasera?", a: ["Sì 🐪", "Ho già una cammella"], r: ["Match! È l'unico del viaggio. Goditelo.", "Bugia. Non hai nessuno, tossico."], href: "notte.html" },
      { ic: "🔥", col: "#D6345A", app: "Il viaggio", t: "Domanda seria", x: "Hai votato le cose da fare?", a: ["Sì, tutte", "Ehm…"], r: ["Bugia. Il sito vede tutto. Vai al Viaggio.", "Lo sapevo. Guarda questo tossico."], href: "viaggio.html" },
      { ic: "🌿", col: "#1d8a3a", app: "Valle di Ketama", t: "Ketama", x: "Venite a trovarci il 30 dicembre?", a: ["Per la cultura", "Mamma dice di no"], r: ["Certo, per la cultura. Si guarda, non si compra.", "La mamma ha ragione. Ma il voto è nei must."], href: "must.html#valli" },
      { ic: "🛂", col: "#0F6FB8", app: "Dogana di Londra", t: "8 gennaio", x: "Ha qualcosa da dichiarare?", a: ["No", "Solo saudade"], r: ["Bene. Il cane annusa lo stesso.", "La saudade passa. Il volo per Roma no."], href: "kit.html" },
      { ic: "🎆", col: "#8e44ad", app: "Capodanno", t: "31 dicembre, Marrakech", x: "Stasera dove si va?", a: ["Theatro", "A letto alle 22"], r: ["Daje. Stira la camicia.", "Il saluzzese approva. Gli altri no."], href: "notte.html" }
    ];
  }

  /* -------- il tasto «non ho capito un cazzo» -------- */
  const SPIEGA = {
    viaggio: "Il Marocco è diviso in 7 zone. Tocca una zona, sulla mappa o nei riquadri. Sotto vedi le cose da fare lì: puoi filtrarle per tipo e votarle con 🔥, 🤔 o 💀.",
    must: "Valli, surf, moto e deserto si fanno per forza. Per ognuno tocca il modo che preferisci: vince quello scelto da più persone. In fondo, gli altri must da votare.",
    home: "Scorri: ogni blocco spiega una parte del sito, con un link per entrarci. In basso c'è la barra con le pagine principali.",
    mappa: "Sopra scegli cosa vedere: sorca, surf, mangiare… Tocca un pallino per sapere cos'è e premere «Portami qui». «Dove sono io?» ti dice cosa hai vicino. Sotto la mappa puoi accendere il giro di uno scenario.",
    scenari: "In alto vedi chi ha votato cosa. Tocca uno scenario: c'è quanto costa, come vi muovete, dove dormite e il giro giorno per giorno. Premi «Voto questo»: vince il più votato.",
    esplora: "Tocca un tema, poi su ogni idea premi 🔥 se ci stai, 🤔 se forse, 💀 se neanche morto. Quando tutti e tre premete 🔥, sotto compare «Si fa» e il costo va nei soldi.",
    giro: "In alto scegli lo scenario: A, B, C o D. Sotto vedi la mappa e cosa si fa ogni giorno, dove si dorme e quante ore si guida.",
    crew: "Compila il tuo profilo: budget, patente, fuoristrada e scenario preferito. Lo scenario del viaggio si decide da solo. Più sotto c'è il tribunale: si vota chi è più probabile che faccia una figura di merda.",
    organizza: "Prenotazioni: premi Me ne occupo io su quello che prenoti tu, e Fatto quando hai finito. Cassa: segna quello che paghi per tutti, il sito calcola chi deve dare soldi a chi.",
    kit: "La valigia la spunti tu e gli altri vedono a che punto sei. Sotto ci sono le frasi in darija, i prezzi giusti per trattare e il convertitore euro-dirham.",
    muro: "Scrivi quello che vuoi: frasi celebri, voti ai tagine, figure di merda. Lo vedono tutti.",
    vota: "Ti esce una carta alla volta. Premi 🔥 se ci stai, 🤔 se forse, 💀 se neanche morto. Oppure trascina la carta. Quando tutti e tre dite 🔥, esce MATCH e si fa.",
    sifa: "Qui vedi il risultato dei voti. «Si fa»: tutti e tre 🔥, si prenota. «Manca uno»: due 🔥, il terzo deve decidere. «Bocciate»: qualcuno ha detto 💀.",
    budget: "In alto il costo di ogni scenario: toccane uno. Sotto il totale a testa: spese sicure, più lo scenario, più le esperienze con tre 🔥. Cambia da solo quando votate.",
    cuori: "Il registro: premi il tasto quando prendi un due di picche. Sotto: dove forse sì e dove sicuramente no.",
    tribunale: "Per ogni domanda tocca il nome del colpevole. Chi prende più voti si becca l'adesivo.",
    notte: "In alto le probabilità di serata. Poi tocchi una città e vedi locali, feste e ostelli veri. Sotto c'è il registro dei due di picche: premi il tasto quando ne prendi uno.",
    ruota: "Scegli la domanda, premi Gira, e la ruota decide chi tocca. Poi puoi attaccare il verdetto al muro."
  };
  function mountHelp(page) {
    if (document.getElementById("nocapito")) return;
    const b = document.createElement("button");
    b.id = "nocapito"; b.type = "button"; b.className = "salluzzo"; b.textContent = "Non ho capito un cazzo";
    b.addEventListener("click", () => {
      const ov = document.createElement("div"); ov.className = "overlay"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
      const card = document.createElement("div"); card.className = "card";
      const st = document.createElement("span"); st.className = "sticker rosa"; st.textContent = rnd(["Ma che, la sorca?", "Bedda matri", "Bôja fauss", "Ahó, tranquillo"]);
      const h2 = document.createElement("h2"); h2.textContent = "Te lo spiego piano, tossico.";
      const p = document.createElement("p"); p.textContent = SPIEGA[page] || SPIEGA.home;
      const br = document.createElement("p"); br.className = "hand"; br.style.color = "var(--rosa)"; br.textContent = rnd(["Entendeu, mano?", "Capito mo'?", "Amunì, è facile.", "Esageruma nen, ce la puoi fare.", "Se non hai capito manco così, la sorca."]);
      const ok = document.createElement("button"); ok.className = "btn"; ok.type = "button"; ok.textContent = "Ho capito. Forse.";
      ok.addEventListener("click", () => ov.remove()); ov.addEventListener("click", (e) => { if (e.target === ov) ov.remove(); });
      card.append(st, h2, p, br, ok); ov.appendChild(card); document.body.appendChild(ov); ok.focus();
    });
    const top = document.querySelector(".pagehead .topline, .hm-top");
    if (top) { b.classList.add("in-top"); top.appendChild(b); } else document.body.appendChild(b);
  }

  /* -------- la barra «il sito dice» -------- */
  function bar(page, d, me) {
    const box = document.getElementById("roast"); if (!box) return;
    box.hidden = false; box.textContent = "";
    const lab = document.createElement("span"); lab.className = "roast-lab"; lab.textContent = "Il sito dice";
    const txt = document.createElement("p"); txt.className = "roast-txt"; txt.textContent = line(page, d, me);
    const more = document.createElement("button"); more.type = "button"; more.className = "btn yellow small"; more.textContent = "Un'altra";
    more.addEventListener("click", () => { txt.textContent = random(d); });
    box.append(lab, txt, more);
  }

  return { popups, notifs, titles, feed, random, line, react, bar, mountHelp, fill, stats, CREW, TOX };
})();
