/* Contenuti del sito. Prezzi e tempi sono stime al 7 novembre 2026, da verificare quando prenotate. */
window.C = {};

C.CREW = ["Alessandro", "Augusto", "Davide"];

C.CATS = {
  capodanno: { nome: "Capodanno", colore: "var(--c-capodanno)" },
  moto:      { nome: "Moto e motori", colore: "var(--c-moto)" },
  deserto:   { nome: "Deserto", colore: "var(--c-deserto)" },
  montagna:  { nome: "Valli e Atlante", colore: "var(--c-montagna)" },
  oceano:    { nome: "Surf e oceano", colore: "var(--c-oceano)" },
  citta:     { nome: "Città e medine", colore: "var(--c-citta)" },
  cibo:      { nome: "Mangiare", colore: "var(--c-cibo)" },
  sfide:     { nome: "Sfide tra voi", colore: "var(--c-sfide)" }
};

C.TIPI = {
  locale: "Fuori dai giri",
  esperienza: "Da raccontare",
  classico: "Classico che vale"
};

/* follia: da 1 (tranquillo) a 5 (lo racconterete ai nipoti) */
C.ATT = [
  // IL RIF
  { id: "rif-ketama", cat: "montagna", t: "Le valli di Ketama", dove: "Rif, circa 4 ore da Fes", quando: "variante del 30 dic", prezzo: "€30–50 la guida", durata: "una giornata", follia: 5, tipo: "esperienza",
    desc: "Il cuore storico della coltivazione del Rif: terrazze sui monti, villaggi, foreste di cedri. Si va con una guida locale e si guarda. Vedere i campi si può; comprare e fumare è illegale, anche per i turisti.",
    joke: "Il palermitano dice che è come Corleone, ma con le piante. Nessuno capisce, tutti annuiscono." },
  { id: "rif-chefchaouen", cat: "citta", t: "Chefchaouen, la città blu", dove: "Rif, circa 3,5 ore da Fes", quando: "variante del 29–30 dic", prezzo: "€20–30 a notte", durata: "una notte", follia: 2, tipo: "classico",
    desc: "La medina tutta blu sotto le montagne del Rif. La base più tranquilla per le valli intorno, una notte basta.",
    joke: "Ti offrono roba ogni 40 metri. Tu rispondi «la, shukran» e cammini. Cento volte." },
  { id: "rif-akchour", cat: "montagna", t: "Cascate di Akchour", dove: "45 minuti da Chefchaouen", quando: "variante del 30 dic", prezzo: "gratis, guida facoltativa", durata: "mezza giornata", follia: 3, tipo: "locale",
    desc: "Sentiero tra le gole fino alle cascate e al «ponte di Dio», un arco di roccia naturale.",
    joke: "A dicembre l'acqua è a 8 gradi. Il primo che entra non paga cene per tutto il viaggio." },
  // CAPODANNO
  { id: "cap-club", cat: "capodanno", t: "Club all'Hivernage", dove: "Marrakech", quando: "31 dic", prezzo: "€80–200", durata: "tutta la notte", follia: 4, tipo: "classico",
    desc: "Theatro, dentro il resort Es Saadi, oppure Pacha: DJ, spettacoli, si fa l'alba. Prima cena normale in un ristorante, così spendete solo per la serata.",
    joke: "Il primo che dice «andiamo a casa» alle 2 paga il taxi." },
  { id: "cap-agafay", cat: "capodanno", t: "Capodanno nel deserto di Agafay", dove: "Agafay, 40 min da Marrakech", quando: "31 dic", prezzo: "€120–250", durata: "sera e notte", follia: 4, tipo: "esperienza",
    desc: "Alcuni campi nel deserto di pietra fanno la notte del 31 con DJ, cena e falò, transfer compreso. Diverso da tutto, ma siete legati all'orario del loro rientro.",
    joke: "Fuochi d'artificio: le stelle. Bagno: una tenda. Ricordi: eterni." },
  { id: "cap-darna", cat: "capodanno", t: "Cena-spettacolo al Comptoir Darna", dove: "Marrakech, Hivernage", quando: "31 dic", prezzo: "€320", durata: "sera", follia: 2, tipo: "classico",
    desc: "3.500 dirham a testa da bere escluso, con musicisti, danzatrici e DJ. Cancellabile con rimborso fino al 24 dicembre.",
    joke: "Per sentirvi ricchi una sera e poveri per dieci giorni. Daje." },
  { id: "cap-rooftop", cat: "capodanno", t: "Countdown su un rooftop della medina", dove: "Marrakech, medina", quando: "31 dic", prezzo: "€30–60", durata: "sera", follia: 2, tipo: "locale",
    desc: "Cena su una terrazza con vista sui tetti e sulla Koutoubia, poi taxi verso l'Hivernage. In medina l'alcol si trova poco: chiedete prima di prenotare.",
    joke: "Romantico. Siete in tre. Fate voi." },

  // MOTO
  { id: "moto-tour3", cat: "moto", t: "Tour enduro privato di 3 giorni", dove: "Ouarzazate, Draa, deserto", quando: "3–5 gen", prezzo: "€500–900", durata: "3 giorni", follia: 5, tipo: "esperienza",
    desc: "KTM 450 con guida, meccanico e 4x4 d'appoggio: piste delle gole, valle del Draa e una notte in bivacco. Servono patente A ed esperienza in fuoristrada. Chi non guida può stare sul 4x4.",
    joke: "Chi cade per primo offre la cena. Chi cade per secondo la cucina." },
  { id: "moto-pista", cat: "moto", t: "La pista alta tra Dadès e Todra", dove: "Alto Atlante", quando: "dentro il tour", prezzo: "nel tour", durata: "mezza giornata", follia: 5, tipo: "locale",
    desc: "Lo sterrato di montagna che unisce le due gole dall'alto, un classico dei motociclisti. Solo con guida: d'inverno può essere ghiacciato.",
    joke: "Panorama da cartolina, ammesso che alziate gli occhi dalla pista." },
  { id: "moto-agafay", cat: "moto", t: "Enduro all'alba ad Agafay", dove: "Agafay", quando: "1 gen", prezzo: "€50–90", durata: "1–2 ore", follia: 3, tipo: "esperienza",
    desc: "Moto da fuoristrada nel deserto di pietra a 40 minuti da Marrakech, con una guida davanti.",
    joke: "Il 1° gennaio all'alba: coraggiosi, oppure ancora svegli dalla sera prima." },
  { id: "moto-dune", cat: "moto", t: "Enduro sulle dune di Merzouga", dove: "Erg Chebbi", quando: "3–4 gen", prezzo: "€50–250", durata: "da 1 ora a 1 giorno", follia: 5, tipo: "classico",
    desc: "Le dune vere dell'Erg Chebbi. Sulla sabbia morbida si cade spesso ed è faticoso se non avete mai guidato una moto da cross.",
    joke: "«La sabbia è morbida.» Lo dicono tutti. Mentono tutti." },
  { id: "moto-buggy", cat: "moto", t: "Buggy biposto", dove: "Merzouga o Agafay", quando: "quando volete", prezzo: "€30–80", durata: "1–3 ore", follia: 3, tipo: "classico",
    desc: "L'opzione senza patente né esperienza. Più divertente del quad per chi non guida.",
    joke: "Uno guida, uno urla. Decidete i ruoli prima di salire." },
  { id: "moto-quad", cat: "moto", t: "Quad al tramonto", dove: "Agafay", quando: "1 gen", prezzo: "€30–60", durata: "1–2 ore", follia: 2, tipo: "classico",
    desc: "Il giro in quad nel deserto di pietra, con l'Atlante innevato all'orizzonte.",
    joke: "Foto profilo garantita per i prossimi sei mesi." },
  { id: "moto-noleggio", cat: "moto", t: "Moto a noleggio, da soli", dove: "Marrakech → Atlante", quando: "1–5 gen", prezzo: "€50–90 al giorno", durata: "2–3 giorni", follia: 5, tipo: "esperienza",
    desc: "Himalayan 450 o CRF250L per un anello sull'Atlante. Patente A obbligatoria e nessuno vi viene a prendere se succede qualcosa. Sul passo a gennaio fa molto freddo.",
    joke: "Davide leggerà il contratto di noleggio 40 volte. Poi resterà a piedi a 2.260 metri lo stesso." },

  // DESERTO
  { id: "des-campo", cat: "deserto", t: "Campo piccolo nelle dune di Merzouga", dove: "Erg Chebbi", quando: "3 gen", prezzo: "€40–100", durata: "1 notte", follia: 3, tipo: "esperienza",
    desc: "Lontano dalla fila dei campi grandi vicino al paese, ci arrivate in cammello o in 4x4. Chiedete se le tende sono riscaldate: di notte si va sotto zero.",
    joke: "Wi-Fi assente. Conversazioni profonde obbligatorie." },
  { id: "des-chigaga", cat: "deserto", t: "Erg Chigaga da M'Hamid", dove: "Valle del Draa", quando: "con il tour in moto", prezzo: "€60–120", durata: "1 notte", follia: 4, tipo: "locale",
    desc: "Dune più remote e silenziose, a circa due ore di pista in 4x4 dall'ultimo paese. Ha senso se fate il tour in moto nel Draa.",
    joke: "Così lontano che neanche vostra madre vi trova." },
  { id: "des-nomadi", cat: "deserto", t: "Notte con una famiglia nomade", dove: "Merzouga", quando: "3 gen", prezzo: "€30–60", durata: "1 notte", follia: 3, tipo: "locale",
    desc: "Alcune guide di Merzouga organizzano la notte in una tenda di famiglia, con la cena cucinata da loro. Spartana e indimenticabile.",
    joke: "Portate un regalo. No, la sabbia non vale." },
  { id: "des-cammello", cat: "deserto", t: "Cammello al tramonto", dove: "Merzouga", quando: "3 gen", prezzo: "€15–30", durata: "1–2 ore", follia: 1, tipo: "classico",
    desc: "Il modo classico per arrivare al campo. Il giorno dopo vi faranno male muscoli che non sapevate di avere.",
    joke: "Il cammello vi giudica. Fatevene una ragione." },
  { id: "des-sandboard", cat: "deserto", t: "Sandboard sulle dune", dove: "Erg Chebbi", quando: "4 gen", prezzo: "€5–15", durata: "1–2 ore", follia: 3, tipo: "esperienza",
    desc: "Tavola noleggiata al campo e giù dalle dune. Allenamento per il surf, più o meno.",
    joke: "Risalire la duna a piedi è la parte che nessuno racconta." },
  { id: "des-stelle", cat: "deserto", t: "Notte di stelle", dove: "Deserto", quando: "3 o 4 gen", prezzo: "gratis", durata: "quanto volete", follia: 1, tipo: "esperienza",
    desc: "Lontano dalle luci del campo, con il cielo limpido di gennaio, la Via Lattea si vede a occhio nudo.",
    joke: "Momento perfetto per le confessioni. Poi non lamentatevi." },

  // MONTAGNA E VALLI
  { id: "mon-tichka", cat: "montagna", t: "Passo del Tizi n'Tichka", dove: "Alto Atlante", quando: "2 gen", prezzo: "gratis", durata: "in viaggio", follia: 2, tipo: "classico",
    desc: "La strada dell'Atlante sale a 2.260 metri tra tornanti e villaggi berberi. Può nevicare e chiudere per qualche ora: guardate il meteo la sera prima.",
    joke: "Chi soffre l'auto si siede davanti. Gli altri due glielo rinfacceranno a vita." },
  { id: "mon-benhaddou", cat: "montagna", t: "Aït Benhaddou al tramonto", dove: "vicino a Ouarzazate", quando: "2 gen", prezzo: "gratis o pochi dirham", durata: "1–2 ore", follia: 1, tipo: "classico",
    desc: "Lo ksar di terra dei film, patrimonio UNESCO. Al tramonto si svuota e la luce è la migliore.",
    joke: "Fate la foto epica. Uno di voi sarà comunque mosso." },
  { id: "mon-dades", cat: "montagna", t: "Kasbah di famiglia nel Dadès", dove: "Gole del Dadès", quando: "2 gen", prezzo: "€25–50 a notte", durata: "1 notte", follia: 2, tipo: "locale",
    desc: "Gole rosse e la strada a tornanti di Tisdrine. Dormite in una kasbah gestita da una famiglia, con la cena compresa.",
    joke: "I tornanti si fotografano dall'alto. Dal basso si sopravvivono." },
  { id: "mon-todra", cat: "montagna", t: "Gole del Todra a piedi", dove: "Tinghir", quando: "3 gen", prezzo: "gratis", durata: "1–2 ore", follia: 1, tipo: "classico",
    desc: "Una gola stretta con pareti di circa 300 metri, da attraversare a piedi. Arrivate presto, prima dei pullman delle 10.",
    joke: "Gridate il nome di uno di voi: l'eco lo prende in giro al posto vostro." },
  { id: "mon-arrampicata", cat: "montagna", t: "Arrampicata nel Todra", dove: "Tinghir", quando: "3 gen", prezzo: "€40–70", durata: "mezza giornata", follia: 4, tipo: "esperienza",
    desc: "Il Todra è uno dei posti più famosi del Marocco per arrampicare, con vie per tutti i livelli e guide sul posto che forniscono l'attrezzatura.",
    joke: "Chi si blocca a metà parete viene immortalato. Da due angolazioni." },
  { id: "mon-rose", cat: "montagna", t: "Valle delle Rose a piedi", dove: "Kelaat M'Gouna", quando: "2 gen", prezzo: "€15–30", durata: "mezza giornata", follia: 1, tipo: "locale",
    desc: "Villaggi e campi tra Ouarzazate e il Dadès, con una guida berbera. Pochi turisti, soprattutto d'inverno.",
    joke: "Le rose fioriscono a maggio. Voi ci andate a gennaio. Classico." },
  { id: "mon-ourika", cat: "montagna", t: "Valle dell'Ourika", dove: "1 ora da Marrakech", quando: "1 gen", prezzo: "gratis", durata: "mezza giornata", follia: 2, tipo: "classico",
    desc: "Villaggi e le cascate di Setti Fatma. Mezza giornata il 1° gennaio se non volete guidare tanto.",
    joke: "Detox ufficiale dopo Capodanno. Funziona finché non tornate in città." },

  // OCEANO
  { id: "oc-imsouane", cat: "oceano", t: "Surf a Imsouane", dove: "Imsouane", quando: "5–6 gen", prezzo: "€25–35 a lezione", durata: "2 ore", follia: 2, tipo: "esperienza",
    desc: "Una baia con un'onda destra lunghissima e lenta, ideale per imparare. Villaggio di pescatori, niente vita notturna. Acqua a 16–18 gradi, muta 4/3.",
    joke: "Onda così lunga che fate in tempo a cadere tre volte." },
  { id: "oc-taghazout", cat: "oceano", t: "Surf camp a Taghazout", dove: "Taghazout", quando: "6–8 gen", prezzo: "€40–80 al giorno", durata: "più giorni", follia: 2, tipo: "classico",
    desc: "Lezione, tavola, muta e alloggio tutto compreso, con le serate. Anchor Point e Hash Point solo per chi è già bravo.",
    joke: "Il fisico da surfista arriva il giorno dopo la partenza." },
  { id: "oc-tamraght", cat: "oceano", t: "Base a Tamraght", dove: "accanto a Taghazout", quando: "6–8 gen", prezzo: "€25–50 a notte", durata: "più notti", follia: 1, tipo: "locale",
    desc: "Stesse onde di Taghazout, più vita di paese e meno surf camp. A circa 30 minuti dall'aeroporto di Agadir.",
    joke: "Per dire «non sono un turista» con la tavola a noleggio sotto il braccio." },
  { id: "oc-rabat", cat: "oceano", t: "Surf sotto la kasbah di Rabat", dove: "Rabat, spiaggia degli Oudayas", quando: "30 dic", prezzo: "€25–35", durata: "2 ore", follia: 2, tipo: "locale",
    desc: "Sulla spiaggia sotto la kasbah surfano i ragazzi della città. Ci sono scuole in spiaggia con tavola e muta.",
    joke: "L'ultimo bagno dell'anno. Freddo, ma da raccontare." },
  { id: "oc-paradise", cat: "oceano", t: "Paradise Valley", dove: "entroterra di Agadir", quando: "7 gen", prezzo: "gratis", durata: "mezza giornata", follia: 2, tipo: "classico",
    desc: "Una gola di palme con piscine naturali, a circa un'ora da Taghazout. A gennaio l'acqua è fredda.",
    joke: "Il nome promette tanto. Il tuffo nell'acqua gelata mantiene." },

  // CITTA
  { id: "cit-fes", cat: "citta", t: "Medina di Fes con una guida ufficiale", dove: "Fes", quando: "29 dic", prezzo: "€25–40 per il gruppo", durata: "mezza giornata", follia: 2, tipo: "classico",
    desc: "Nella medina di Fes ci si perde davvero. Una guida con tesserino evita i finti accompagnatori e vi porta nelle botteghe vere, fino alle concerie Chouara.",
    joke: "Senza guida finite in una conceria. Con la guida anche, ma apposta." },
  { id: "cit-merinidi", cat: "citta", t: "Tramonto dalle tombe merinidi", dove: "collina sopra Fes", quando: "29 dic", prezzo: "gratis", durata: "1 ora", follia: 1, tipo: "locale",
    desc: "La medina intera davanti a voi e la chiamata alla preghiera che sale dalla città.",
    joke: "L'unico momento del viaggio in cui starete zitti tutti e tre." },
  { id: "cit-volubilis", cat: "citta", t: "Volubilis e Meknès", dove: "tra Fes e Rabat", quando: "30 dic", prezzo: "€7–10", durata: "mezza giornata", follia: 1, tipo: "classico",
    desc: "Rovine romane con i mosaici ancora al loro posto, sulla strada per Rabat. Poca folla d'inverno.",
    joke: "Tre amici tra le rovine. Le battute si scrivono da sole." },
  { id: "cit-oudayas", cat: "citta", t: "Kasbah degli Oudayas", dove: "Rabat", quando: "30 dic", prezzo: "gratis", durata: "1–2 ore", follia: 1, tipo: "locale",
    desc: "Vicoli bianchi e blu sul mare. Rabat è la capitale e quasi nessun turista ci dorme: per voi è la tappa giusta a metà strada.",
    joke: "Chefchaouen, senza le quattro ore di strada per arrivare a Chefchaouen." },
  { id: "cit-jemaa", cat: "citta", t: "Jemaa el-Fnaa di sera", dove: "Marrakech", quando: "31 dic o 1 gen", prezzo: "gratis", durata: "una sera", follia: 3, tipo: "classico",
    desc: "La piazza si riempie di banchi, musicisti e cantastorie. Tenete d'occhio il telefono e non fotografate gli artisti senza pagare.",
    joke: "Vi offriranno una scimmia, un serpente e l'henné. Tre no, con un sorriso." },
  { id: "cit-hammam", cat: "citta", t: "Hammam di quartiere", dove: "Fes o Marrakech", quando: "quando volete", prezzo: "€5–15 con il kessa", durata: "1–2 ore", follia: 3, tipo: "locale",
    desc: "Quello dei marocchini, non la spa dell'hotel. Portate un ricambio e le ciabatte, e chiedete il kessa: lo scrub che vi toglie uno strato di pelle.",
    joke: "Entrate in tre, uscite in tre, ma più leggeri di un chilo." },
  { id: "cit-majorelle", cat: "citta", t: "Jardin Majorelle", dove: "Marrakech", quando: "1 gen", prezzo: "€15–20", durata: "1–2 ore", follia: 1, tipo: "classico",
    desc: "Il giardino blu di Marrakech. Il biglietto si compra online con l'orario: senza, si fa la fila.",
    joke: "Il blu Majorelle è questo. Ora sapete di che colore è questo sito." },
  { id: "cit-benyoussef", cat: "citta", t: "Medersa Ben Youssef", dove: "Marrakech, medina", quando: "1 gen", prezzo: "€5–10", durata: "1 ora", follia: 1, tipo: "classico",
    desc: "L'antica scuola coranica di Marrakech, con un cortile di zellige e legno di cedro.",
    joke: "Fate la stessa foto di tutti e siatene fieri." },

  // CIBO
  { id: "cibo-tanjia", cat: "cibo", t: "Tanjia dietro la piazza", dove: "Marrakech", quando: "31 dic o 1 gen", prezzo: "€5–8", durata: "un pranzo", follia: 2, tipo: "locale",
    desc: "Carne cotta per ore in un'anfora sotto la cenere dei forni degli hammam. Si mangia nei banchi dietro Jemaa el-Fnaa, non sulla piazza.",
    joke: "Cotta otto ore. Mangiata in otto minuti." },
  { id: "cibo-mechoui", cat: "cibo", t: "Méchoui nel vicolo", dove: "Marrakech, vicino a Jemaa el-Fnaa", quando: "1 gen", prezzo: "€5–10", durata: "un pranzo", follia: 2, tipo: "locale",
    desc: "Agnello cotto in forni sotterranei, venduto a peso con pane e cumino.",
    joke: "Si ordina a peso. Non dite il vostro." },
  { id: "cibo-bissara", cat: "cibo", t: "Bissara la mattina", dove: "Fes", quando: "29 o 30 dic", prezzo: "€1", durata: "colazione", follia: 1, tipo: "locale",
    desc: "Zuppa di fave con olio e cumino, la colazione di chi lavora nella medina.",
    joke: "Un euro per sentirvi locali. L'affare del viaggio." },
  { id: "cibo-pastilla", cat: "cibo", t: "Pastilla", dove: "Fes", quando: "29 dic", prezzo: "€5–10", durata: "una cena", follia: 1, tipo: "locale",
    desc: "Sfoglia dolce e salata con pollo o piccione, mandorle e cannella. Fes è la sua città.",
    joke: "Dolce e salato insieme. Come il vostro rapporto." },
  { id: "cibo-pesce", cat: "cibo", t: "Pesce al porto di Imsouane", dove: "Imsouane", quando: "5–6 gen", prezzo: "€10–15", durata: "un pranzo", follia: 1, tipo: "locale",
    desc: "Lo comprate dai pescatori e ve lo grigliano lì accanto.",
    joke: "Così fresco che vi guarda male." },
  { id: "cibo-corso", cat: "cibo", t: "Corso di cucina marocchina", dove: "Fes o Marrakech", quando: "quando volete", prezzo: "€30–50", durata: "mezza giornata", follia: 1, tipo: "esperienza",
    desc: "Spesa al mercato con un cuoco, poi tagine e pane cucinati da voi.",
    joke: "L'unico tagine del viaggio di cui potrete lamentarvi solo con voi stessi." },
  { id: "cibo-te", cat: "cibo", t: "Tè alla menta, versato dall'alto", dove: "ovunque", quando: "sempre", prezzo: "pochi dirham", durata: "10 minuti", follia: 1, tipo: "locale",
    desc: "Si versa dall'alto per fare la schiuma. Quando ve lo offrono, accettate: rifiutarlo è scortese.",
    joke: "Entro il terzo giorno avrete opinioni forti sullo zucchero." },

  // SFIDE
  { id: "sfida-souk", cat: "sfide", t: "La sfida del souk", dove: "Fes o Marrakech", quando: "un pomeriggio", prezzo: "il prezzo delle babbucce", durata: "1 ora", follia: 3, tipo: "esperienza",
    desc: "Ognuno compra lo stesso oggetto, per esempio un paio di babbucce, in un negozio diverso. Vince chi paga meno. Regola d'oro: partite da un terzo del primo prezzo.",
    joke: "Davide proverà a vincere citando il codice civile. Vincerà il venditore. Porra." },
  { id: "sfida-noapp", cat: "sfide", t: "La medina senza Google Maps", dove: "Fes", quando: "29 dic", prezzo: "gratis", durata: "1–2 ore", follia: 4, tipo: "esperienza",
    desc: "Ognuno da solo raggiunge un punto deciso prima, per esempio Bab Boujloud, senza guardare il telefono. Fissate un orario limite e tenete il telefono acceso in tasca.",
    joke: "Se dopo due ore qualcuno non torna, ha vinto la medina." },
  { id: "sfida-darija", cat: "sfide", t: "Una giornata solo in darija", dove: "ovunque", quando: "un giorno a scelta", prezzo: "un tè a testa", durata: "1 giorno", follia: 2, tipo: "esperienza",
    desc: "Per un giorno si ordina e si saluta solo con le frasi della pagina Kit. Chi parla italiano o inglese con un locale offre il tè a tutti.",
    joke: "Shukran, wakha, bezzaf. Chi dice «bora» o «suave» paga il tè. Sì, parlo con voi." },
  { id: "sfida-foto", cat: "sfide", t: "La foto ricreata", dove: "Fes e Taghazout", quando: "29 dic e 8 gen", prezzo: "gratis", durata: "2 minuti", follia: 1, tipo: "esperienza",
    desc: "Una foto di gruppo il primo giorno a Fes, rifatta identica l'ultimo giorno sull'oceano.",
    joke: "Prima: freschi. Dopo: bruciati dal sole, stanchi, felici." },
  { id: "sfida-tagine", cat: "sfide", t: "Classifica dei tagine", dove: "ovunque", quando: "tutto il viaggio", prezzo: "quanto mangiate", durata: "11 giorni", follia: 1, tipo: "esperienza",
    desc: "Ogni tagine che mangiate prende un voto da 1 a 10 da ognuno di voi. Segnateli sul Muro: l'ultimo giorno si proclama il vincitore.",
    joke: "Alla fine vincerà il primo, perché avevate fame." },
  // DAL PLAYBOOK «WILD & RAW» (scenario E)
  { id: "fes-tihal", cat: "cibo", t: "Tihal e griglie a Place Rcif", dove: "Medina di Fes, Place Rcif", quando: "30 dic sera", prezzo: "€1–3", durata: "una cena", follia: 3, tipo: "locale",
    desc: "Il tihal è milza ripiena cotta sulla piastra: il cibo di strada di chi lavora nella medina. Si va dopo le 19, quando i gruppi di turisti se ne sono andati e arrivano i banchi per la gente del posto.",
    joke: "Il saluzzese lo assaggia, dice «bon» e poi non parla per un'ora." },
  { id: "mon-azrou", cat: "montagna", t: "Le bertucce di Azrou", dove: "Foresta di cedri, un'ora a sud di Fes", quando: "31 dic, scenario E", prezzo: "gratis", durata: "20 minuti", follia: 1, tipo: "classico",
    desc: "Scimmie libere nella foresta di cedri del Medio Atlante, sulla strada per il deserto. Sosta corta: il 31 c'è da guidare.",
    joke: "Tre primati che guardano altri primati. Indovinate chi è il più educato." },
  { id: "des-capodanno", cat: "capodanno", t: "Capodanno nel bivacco tra le dune", dove: "Erg Chebbi, Merzouga", quando: "31 dic, scenario E", prezzo: "da €60, da confermare", durata: "la notte del 31", follia: 4, tipo: "esperienza",
    desc: "Un campo piccolo in mezzo alle dune: cena berbera, falò, tamburi e le stelle a mezzanotte. Il prezzo del 31 fatevelo scrivere: a Capodanno molti campi cambiano listino. Chiedete se si può portare da bere e compratelo a Fes.",
    joke: "Mezzanotte a meno due gradi, abbracciati a un cammello. Il romano dice che è come il Circo Massimo. Non è vero." },
  { id: "des-khamlia", cat: "deserto", t: "La musica gnawa di Khamlia", dove: "Khamlia, 7 km da Merzouga", quando: "1 gen", prezzo: "offerta libera", durata: "un'ora", follia: 2, tipo: "locale",
    desc: "Il villaggio gnawa del deserto: tamburi e qraqeb, le nacchere di ferro, suonati per chi passa, con il tè.",
    joke: "Dopo dieci minuti Davide balla. Dopo venti chiama qualcuno per farglielo sentire." },
  { id: "des-gara", cat: "deserto", t: "Gara Medouar, il cratere di 007", dove: "Circa 40 km da Merzouga, su pista", quando: "1 gen", prezzo: "4x4 con autista, prezzo dal campo", durata: "mezza giornata", follia: 3, tipo: "locale",
    desc: "Una montagna ad anello in mezzo al nulla, usata nel film di 007 Spectre. Ci si arriva su pista: con un 4x4 e un autista del posto, non con l'auto a noleggio, che sulle piste di solito non è assicurata.",
    joke: "La base segreta del cattivo di 007. Il cattivo è Augusto con il foglio delle spese." },
  { id: "des-rissani", cat: "cibo", t: "Medfouna a Rissani", dove: "Rissani, 40 km da Merzouga", quando: "2 gen", prezzo: "€4–8", durata: "un pranzo", follia: 1, tipo: "locale",
    desc: "La «pizza berbera»: pane ripieno di carne, cipolla e spezie, cotto nel forno a legna. Il souk grande, con il parcheggio degli asini, c'è martedì, giovedì e domenica. Il 2 gennaio è sabato.",
    joke: "Il palermitano dice che lo sfincione è meglio. Poi ne ordina un'altra." },
  { id: "oc-timlaline", cat: "oceano", t: "Le dune di Timlaline sull'oceano", dove: "Vicino a Tamri, 40 minuti a nord di Taghazout", quando: "5 gen", prezzo: "gratis, sandboard €5–10", durata: "un'ora", follia: 2, tipo: "locale",
    desc: "Dune di sabbia chiara a due passi dall'oceano, lungo la strada per Imsouane. Ci si ferma, si sale, si scende col sandboard o di sedere.",
    joke: "L'unica duna del viaggio dove nessuno si lamenta del freddo." }
];

/* Tappe con coordinate (approssimative) per la mappa */
C.STOPS = {
  fes: { n: "Fes", lat: 34.0331, lng: -5.0003 },
  meknes: { n: "Meknès", lat: 33.8935, lng: -5.5473 },
  volubilis: { n: "Volubilis", lat: 34.0731, lng: -5.5541 },
  rabat: { n: "Rabat", lat: 34.0209, lng: -6.8416 },
  marrakech: { n: "Marrakech", lat: 31.6295, lng: -7.9811 },
  agafay: { n: "Agafay", lat: 31.47, lng: -8.17 },
  tichka: { n: "Tizi n'Tichka", lat: 31.287, lng: -7.38 },
  benhaddou: { n: "Aït Benhaddou", lat: 31.047, lng: -7.132 },
  ouarzazate: { n: "Ouarzazate", lat: 30.9189, lng: -6.8934 },
  dades: { n: "Gole del Dadès", lat: 31.46, lng: -5.95 },
  todra: { n: "Gole del Todra", lat: 31.587, lng: -5.588 },
  merzouga: { n: "Merzouga", lat: 31.0996, lng: -4.0128 },
  mhamid: { n: "M'Hamid e Draa", lat: 29.826, lng: -5.725 },
  taroudant: { n: "Taroudant", lat: 30.4703, lng: -8.877 },
  imsouane: { n: "Imsouane", lat: 30.8406, lng: -9.8227 },
  taghazout: { n: "Taghazout", lat: 30.5446, lng: -9.7088 },
  agadir: { n: "Aeroporto di Agadir", lat: 30.325, lng: -9.4131 },
  ketama: { n: "Ketama", lat: 34.917, lng: -4.567 },
  chefchaouen: { n: "Chefchaouen", lat: 35.1714, lng: -5.2697 },
  akchour: { n: "Akchour", lat: 35.24, lng: -5.17 },
  azrou: { n: "Azrou", lat: 33.4417, lng: -5.2247 },
  midelt: { n: "Midelt", lat: 32.68, lng: -4.73 },
  gara: { n: "Gara Medouar", lat: 31.3008, lng: -4.4006 },
  rissani: { n: "Rissani", lat: 31.2859, lng: -4.2751 },
  taliouine: { n: "Taliouine", lat: 30.5328, lng: -7.9256 },
  tamraght: { n: "Tamraght", lat: 30.513, lng: -9.68 },
  timlaline: { n: "Dune di Timlaline", lat: 30.668, lng: -9.838 }
};

C.ROUTES = {
  A: ["fes", "meknes", "volubilis", "rabat", "marrakech", "agafay", "marrakech", "tichka", "benhaddou", "dades", "todra", "merzouga", "ouarzazate", "taroudant", "imsouane", "taghazout", "agadir"],
  B: ["fes", "meknes", "volubilis", "rabat", "marrakech", "agafay", "marrakech", "tichka", "benhaddou", "ouarzazate", "dades", "todra", "mhamid", "ouarzazate", "taghazout", "imsouane", "taghazout", "agadir"],
  C: ["fes", "marrakech", "agafay", "marrakech", "benhaddou", "dades", "todra", "merzouga", "marrakech", "taghazout", "agadir"],
  D: ["fes", "marrakech", "merzouga", "marrakech", "taghazout", "agadir"],
  E: ["fes", "ketama", "chefchaouen", "akchour", "chefchaouen", "fes", "azrou", "midelt", "merzouga", "gara", "merzouga", "rissani", "todra", "dades", "ouarzazate", "benhaddou", "taliouine", "tamraght", "timlaline", "imsouane", "taghazout", "agadir"]
};

C.SCEN = {
  A: { nome: "Auto e riad", emoji: "🚗", motto: "Tre tossici, una Dacia, 2.000 km.", sub: "Massima libertà: valli, dune vere, due posti per il surf. Tanta guida dal 2 al 5.",
    joke: "Serve un autista con i nervi saldi e due passeggeri che tengono la bocca chiusa. Auguri.",
    muovete: "Dacia a noleggio da Fes, riconsegna all'aeroporto di Agadir.", dormite: "Riad, kasbah e una notte nelle dune.", guida: "Circa 30 ore in 11 giorni. Il 2 e il 5 sono da 6 ore.",
    perchi: "Per chi vuole vedere tutto e fermarsi dove gli pare.", prezzo: "Qualcuno guida sei ore mentre gli altri dormono. E poi se ne parla per anni.",
    costi: [["Auto per 10 giorni, divisa per tre", 190, "Dacia con assicurazione completa e riconsegna ad Agadir."], ["Benzina e autostrade", 60, "Circa 2.000 km in tre."], ["Dormire: 8 notti normali", 165, "Riad e kasbah in tripla, circa €20 a testa a notte."], ["Notti del 31 e del 1° a Marrakech", 90, "A Capodanno i prezzi raddoppiano."], ["Campo nelle dune, 1 notte", 45, "Standard, con cena e colazione."]],
    include: ["des-campo"] },
  B: { nome: "Auto e moto", emoji: "🏍️", motto: "Il Marocco in sella. Lividi compresi.", sub: "Tour in moto dal 3 al 5 con notte in bivacco. Serve almeno uno con patente A ed esperienza.",
    joke: "Il viaggio che racconterete ai nipoti. Lividi compresi, tossici.",
    muovete: "Dacia fino a Ouarzazate, poi tre giorni di moto con guida, poi di nuovo Dacia fino all'oceano.", dormite: "Riad, una kasbah, un bivacco nel deserto del Draa.", guida: "Circa 20 ore di auto e tre giorni di moto su pista.",
    perchi: "Per chi ha la patente A e non ha paura di cadere nella sabbia.", prezzo: "Il più caro. E chi non va in moto passa tre giorni a fare il passeggero.",
    costi: [["Auto per 10 giorni, divisa per tre", 190, "Resta parcheggiata a Ouarzazate durante il tour."], ["Benzina e autostrade", 55, ""], ["Dormire: 6 notti normali", 120, "Le notti del tour sono nel prezzo della moto."], ["Notti del 31 e del 1° a Marrakech", 90, "A Capodanno i prezzi raddoppiano."], ["Tour in moto di 3 giorni con guida e bivacco", 650, "Moto, guida, benzina, dormire e pasti del tour."]],
    include: ["moto-tour3", "des-chigaga", "des-campo"] },
  C: { nome: "Treno e tour", emoji: "🚆", motto: "Nessuno guida. Nessuno litiga. Forse.", sub: "Nessuno guida: treno, tour organizzato nel deserto, surf camp.",
    joke: "Comodo come un pensionato in gita. Il minibus con dodici tedeschi è incluso.",
    muovete: "Treno Fes → Marrakech, minibus del tour per il deserto, bus per Taghazout.", dormite: "Riad, tre notti del tour, surf camp sul mare.", guida: "Zero. Il volante lo tiene qualcun altro.",
    perchi: "Per chi vuole dormire in viaggio e non decidere niente.", prezzo: "Orari fissi, minibus alle 7 e zero libertà. Il deserto lo vedete dal finestrino.",
    costi: [["Treno Fes → Marrakech", 22, "Sette ore, seconda classe."], ["Dormire a Fes e Marrakech", 180, "Con le notti di Capodanno a prezzo doppio."], ["Tour di 3 giorni nel deserto", 140, "Minibus, campo, cammello, cene."], ["Bus per Taghazout e taxi per l'aeroporto", 22, ""], ["Surf camp di 3 notti con lezioni", 220, "Letto, colazione, tavola e maestro."]],
    include: ["des-campo", "des-cammello", "oc-taghazout"] },
  D: { nome: "Zaino in spalla", emoji: "🎒", motto: "Come in Erasmus. Ma senza la scusa dei vent'anni.", sub: "Bus, ostelli, campo standard, due notti in bus.",
    joke: "Si risparmia tutto, tranne la dignità. Come in Erasmus, ma senza la scusa dei vent'anni.",
    muovete: "Bus CTM e Supratours, due notti sul bus per il deserto e ritorno.", dormite: "Ostelli in camerata e un campo standard.", guida: "Zero. In compenso due notti seduti.",
    perchi: "Per chi vuole spendere poco e conoscere gente negli ostelli.", prezzo: "Due notti in bus. La schiena presenta il conto il 5 gennaio.",
    costi: [["Bus per tutto il giro", 75, "Fes → Marrakech, notturni per Merzouga e ritorno, Taghazout."], ["Ostelli per 8 notti", 135, "Capodanno compreso, che costa il doppio."], ["Campo standard a Merzouga", 25, "Con cena e cammello."]],
    include: ["des-campo", "des-cammello"] },
  E: { nome: "Capodanno nelle dune", emoji: "🔥", motto: "Ketama, il falò nel Sahara, l'onda più lunga d'Africa.", sub: "Si parte dal Rif e da Ketama, Capodanno intorno al fuoco nel deserto, cinque giorni di oceano. Niente Marrakech.",
    joke: "Il Capodanno più bello della vostra vita, o otto ore di Dacia per festeggiare in un autogrill di Midelt. Dipende dalla neve.",
    muovete: "Dacia da Fes, riconsegna all'aeroporto di Agadir.", dormite: "Riad, ostello a Chefchaouen, bivacco nelle dune il 31, kasbah, ostelli surf.", guida: "Circa 30 ore in 11 giorni. Il 31 sono 8 ore: si parte alle 7.",
    perchi: "Per chi vuole Ketama, il deserto e il surf, e a Capodanno preferisce il fuoco al club.", prezzo: "Niente Marrakech e niente club. E il giorno più lungo di guida è proprio il 31, su un passo dove a volte nevica.",
    costi: [["Auto per 11 giorni, divisa per tre", 200, "Dacia Duster con assicurazione completa e riconsegna ad Agadir."], ["Benzina", 60, "Circa 2.000 km in tre."], ["Dormire: 10 notti normali", 170, "Riad, kasbah e ostelli surf, circa €17 a testa a notte."], ["Bivacco nelle dune la notte del 31", 60, "Cena, cammello, colazione. Il prezzo di Capodanno va confermato per scritto."]],
    include: ["des-capodanno", "des-campo", "des-cammello"] }
};


/* Giorno per giorno. ore = ore di guida stimate. att = id delle attività consigliate. */
C.DAYS = [
  { d: "2026-12-29", lab: "Mar 29 dic",
    A: { t: "Fes, la medina", dorme: "Riad a Fes", ore: 0, att: ["cit-fes", "cibo-bissara", "cit-merinidi", "cibo-pastilla", "sfida-noapp"], rischio: "Perdersi nella medina entro 11 minuti." },
    E: { t: "Ketama e Chefchaouen", dorme: "Ostello a Chefchaouen", ore: 6, att: ["rif-ketama", "rif-chefchaouen"], rischio: "Atterrate a mezzanotte e la mattina vi aspettano 6 ore di curve nel Rif, con 5 ore di sonno." } },
  { d: "2026-12-30", lab: "Mer 30 dic",
    A: { t: "Volubilis, Meknès, Rabat", dorme: "Rabat", ore: 3, att: ["cit-volubilis", "oc-rabat", "cit-oudayas"], rischio: "Fare surf il 30 dicembre e pentirsene per 4 secondi." },
    C: { t: "Treno per Marrakech", dorme: "Marrakech", ore: 0, att: [], rischio: "Sette ore di treno con le stesse due facce." },
    E: { t: "Chefchaouen all'alba, Akchour, ritorno a Fes", dorme: "Riad a Fes", ore: 4.5, att: ["rif-akchour", "fes-tihal"], rischio: "Foto alle 7:30 nei vicoli blu. Il romano dorme fino alle 10. Si parte senza di lui." } },
  { d: "2026-12-31", lab: "Gio 31 dic",
    A: { t: "Marrakech e Capodanno", dorme: "Hivernage, Marrakech", ore: 3.5, att: ["cap-club", "cap-agafay", "cap-darna", "cap-rooftop"], rischio: "Addormentarsi alle 23:58." },
    C: { t: "Marrakech e Capodanno", dorme: "Hivernage, Marrakech", ore: 0, att: ["cap-club", "cap-agafay", "cap-darna", "cap-rooftop"], rischio: "Addormentarsi alle 23:58." },
    E: { t: "Fes → Sahara, Capodanno nelle dune", dorme: "Bivacco nell'Erg Chebbi", ore: 8, att: ["mon-azrou", "des-capodanno", "des-stelle"], rischio: "Otto ore con un passo a 2.178 metri. Se nevica, il Capodanno lo fate in macchina." } },
  { d: "2027-01-01", lab: "Ven 1 gen",
    A: { t: "Recupero, poi Agafay", dorme: "Hivernage, Marrakech", ore: 1, att: ["moto-quad", "moto-agafay", "cibo-mechoui", "cit-majorelle", "mon-ourika"], rischio: "Ricordarsi cosa è successo ieri sera." },
    E: { t: "Moto, Khamlia e Gara Medouar", dorme: "Auberge a Merzouga", ore: 1, att: ["moto-dune", "des-khamlia", "des-gara", "moto-buggy"], rischio: "Salire su una KTM 450 il 1° gennaio alle 9. Dopo il Capodanno." } },
  { d: "2027-01-02", lab: "Sab 2 gen",
    A: { t: "Atlante, Aït Benhaddou, Dadès", dorme: "Kasbah nel Dadès", ore: 6, att: ["mon-tichka", "mon-benhaddou", "mon-dades"], rischio: "Neve al passo e un passeggero che chiede «quanto manca?» 40 volte." },
    B: { t: "Atlante e Aït Benhaddou", dorme: "Ouarzazate", ore: 4.5, att: ["mon-tichka", "mon-benhaddou"], rischio: "Guardare le moto in vetrina e cambiare idea su tutto." },
    C: { t: "Tour giorno 1: Aït Benhaddou e Dadès", dorme: "Dadès", ore: 0, att: ["mon-benhaddou", "mon-dades"], rischio: "Il minibus parte alle 7. Ripeto: alle 7." },
    D: { t: "Bus notturno per Merzouga", dorme: "sul bus", ore: 0, att: [], rischio: "Dormire seduti accanto a uno sconosciuto che russa." },
    E: { t: "Rissani, Todra, Ouarzazate", dorme: "Ouarzazate", ore: 6, att: ["des-rissani", "mon-todra", "mon-dades"], rischio: "Il souk di Rissani è martedì, giovedì e domenica. Oggi è sabato. Bravi." } },
  { d: "2027-01-03", lab: "Dom 3 gen",
    A: { t: "Todra e il deserto", dorme: "Campo nelle dune", ore: 4, att: ["mon-todra", "mon-arrampicata", "des-cammello", "des-campo", "des-stelle"], rischio: "Notte sotto zero e un sacco a pelo per due." },
    B: { t: "Moto giorno 1: gole del Dadès e del Todra", dorme: "Gite o kasbah", ore: 0, att: ["moto-tour3", "moto-pista", "mon-todra"], rischio: "La prima caduta. Statisticamente oggi." },
    C: { t: "Tour giorno 2: Todra e deserto", dorme: "Campo a Merzouga", ore: 0, att: ["mon-todra", "des-cammello", "des-campo"], rischio: "Il cammello di qualcuno sarà più alto degli altri. Gelosie." },
    D: { t: "Merzouga", dorme: "Campo standard", ore: 0, att: ["des-cammello", "des-campo", "des-stelle"], rischio: "Sabbia ovunque. Ovunque." },
    E: { t: "Aït Benhaddou, poi l'oceano", dorme: "Ostello surf a Tamraght", ore: 6.5, att: ["mon-benhaddou", "oc-tamraght"], rischio: "Arrivare al tramonto e voler entrare in acqua lo stesso." } },
  { d: "2027-01-04", lab: "Lun 4 gen",
    A: { t: "Dune all'alba, enduro, Ouarzazate", dorme: "Ouarzazate", ore: 5, att: ["moto-dune", "des-sandboard", "moto-buggy"], rischio: "Svegliarsi alle 6 per l'alba e trovare le nuvole." },
    B: { t: "Moto giorno 2: piste del Draa", dorme: "Bivacco nel deserto", ore: 0, att: ["moto-tour3", "des-chigaga", "des-stelle"], rischio: "Bivacco a 90 km dalla strada. Nessuno torna indietro a prendere il caricatore." },
    C: { t: "Tour giorno 3: rientro a Marrakech", dorme: "Marrakech", ore: 0, att: [], rischio: "Nove ore di minibus. Playlist da preparare prima." },
    D: { t: "Dune, poi bus notturno", dorme: "sul bus", ore: 0, att: ["des-sandboard"], rischio: "Secondo bus notturno. La schiena presenta il conto." },
    E: { t: "Surf a Taghazout", dorme: "Ostello surf a Tamraght", ore: 0, att: ["oc-taghazout", "oc-tamraght", "sfida-tagine"], rischio: "Scottarsi a gennaio. Sì, succede." } },
  { d: "2027-01-05", lab: "Mar 5 gen",
    A: { t: "Taroudant e l'oceano", dorme: "Imsouane", ore: 6, att: ["cibo-pesce"], rischio: "La tappa più lunga. Chi guida sceglie la musica, gli altri subiscono." },
    B: { t: "Moto giorno 3: rientro a Ouarzazate", dorme: "Ouarzazate", ore: 0, att: ["moto-tour3"], rischio: "Restituire la moto e piangere un po'." },
    C: { t: "Bus per Taghazout", dorme: "Surf camp", ore: 0, att: ["oc-taghazout"], rischio: "Prima onda, primo bevuto." },
    D: { t: "Bus per Taghazout", dorme: "Ostello sul mare", ore: 0, att: ["oc-taghazout"], rischio: "Prima onda, primo bevuto." },
    E: { t: "Dune sull'oceano, poi Imsouane", dorme: "Imsouane", ore: 1.5, att: ["oc-timlaline", "oc-imsouane"], rischio: "Sandboard sulla duna, poi in acqua con la sabbia ovunque." } },
  { d: "2027-01-06", lab: "Mer 6 gen",
    A: { t: "Surf a Imsouane", dorme: "Imsouane", ore: 0, att: ["oc-imsouane", "cibo-pesce"], rischio: "Stare in piedi sulla tavola per 2 secondi e raccontarne 20." },
    B: { t: "In auto verso l'oceano", dorme: "Taghazout o Tamraght", ore: 5, att: ["oc-tamraght"], rischio: "Arrivare al tramonto e voler entrare in acqua lo stesso." },
    C: { t: "Surf", dorme: "Surf camp", ore: 0, att: ["oc-taghazout", "oc-paradise"], rischio: "Scottarsi a gennaio. Sì, succede." },
    E: { t: "Imsouane: surf e pesce al porto", dorme: "Imsouane", ore: 0, att: ["oc-imsouane", "cibo-pesce"], rischio: "Stare in piedi sulla tavola per 2 secondi e raccontarne 20." } },
  { d: "2027-01-07", lab: "Gio 7 gen",
    A: { t: "Taghazout, ultima sera", dorme: "Taghazout o Tamraght", ore: 1.5, att: ["oc-taghazout", "oc-tamraght", "oc-paradise", "sfida-tagine"], rischio: "Promettere di tornare l'anno prossimo." },
    B: { t: "Surf, o gita a Imsouane", dorme: "Taghazout o Tamraght", ore: 0, att: ["oc-imsouane", "oc-paradise", "sfida-tagine"], rischio: "Promettere di tornare l'anno prossimo." },
    E: { t: "Ultima surfata, ultima sera a Taghazout", dorme: "Taghazout o Tamraght", ore: 1.5, att: ["oc-taghazout", "sfida-tagine"], rischio: "Promettere di tornare l'anno prossimo." } },
  { d: "2027-01-08", lab: "Ven 8 gen",
    A: { t: "Surf la mattina, poi Agadir → Londra → Roma", dorme: "sull'aereo", ore: 0.7, att: ["sfida-foto"], rischio: "Passare dai 22 gradi di Taghazout ai 7 di Londra in mutande da surf." } }
];

C.dayFor = function (day, scen) {
  if (day[scen]) return day[scen];
  if (scen === "B" && day.A) return day.A;
  if (scen === "D" && day.C) return day.C;
  return day.A;
};

C.RUOLI = ["Autista ufficiale", "Cassiere", "Negoziatore del souk", "Navigatore", "DJ di bordo", "Fotografo", "Responsabile sveglie", "Quello che si perde"];

C.SONDAGGI = [
  { id: "tossico", q: "Chi è il più tossico della crew?" },
  { id: "whatsapp", q: "Chi chiama il gruppo più volte su WhatsApp?" },
  { id: "rilassato", q: "Chi torna dal Marocco più rilassato del cammello?" },
  { id: "teforte", q: "Chi chiederà il tè alla menta «ma de quello forte»?" },
  { id: "causa", q: "Chi farà causa a un venditore del souk?" },
  { id: "sorca", q: "Chi dice «la sorca» più volte in un giorno?" },
  { id: "minchia", q: "Chi dice «minchia» davanti a una guida?" },
  { id: "portoghese", q: "Chi tratterà nel souk in portoghese?" },
  { id: "saudade", q: "Chi ha ancora saudade di San Paolo?" },
  { id: "souk", q: "Chi si fa fregare per primo nel souk?" },
  { id: "moto", q: "Chi cade per primo dalla moto?" },
  { id: "capodanno", q: "Chi dorme prima di mezzanotte a Capodanno?" },
  { id: "medina", q: "Chi si perde nella medina di Fes?" },
  { id: "rimorchio", q: "Chi ci prova con una turista e torna a mani vuote?" },
  { id: "freddo", q: "Chi piange per il freddo nel deserto?" },
  { id: "surf", q: "Chi sta in piedi sulla tavola per primo?" },
  { id: "soldi", q: "Chi finisce i soldi per primo?" },
  { id: "foto", q: "Chi fa più foto a sé stesso?" }
];

C.DARIJA = [
  { it: "Ciao", dj: "Salam", br: "E aí", pr: "sa-LÀM", uso: "Ovunque. Risposta: «Salam» o «Alaikum salam»." },
  { it: "Grazie", dj: "Shukran", br: "Valeu", pr: "SHUK-ran", uso: "La parola più utile del viaggio." },
  { it: "No, grazie", dj: "La, shukran", br: "Não, valeu", pr: "là SHUK-ran", uso: "La direte duemila volte nei souk. Sorridendo." },
  { it: "Quanto costa?", dj: "Bshhal?", br: "Quanto custa?", pr: "b-SHHAL", uso: "Prima di toccare qualsiasi cosa." },
  { it: "Troppo caro", dj: "Ghali bezzaf", br: "Tá caro pra caralho", pr: "GHA-li bez-ZAF", uso: "Subito dopo «Bshhal?». Sempre." },
  { it: "Molto, troppo", dj: "Bezzaf", br: "Pra caramba", pr: "bez-ZAF", uso: "Funziona per i prezzi, il cibo e le emozioni." },
  { it: "Un po'", dj: "Shwiya", br: "Um pouquinho", pr: "SHWI-ya", uso: "«Shwiya shwiya»: piano piano, con calma." },
  { it: "Ok, d'accordo", dj: "Wakha", br: "Fechou", pr: "WA-kha", uso: "Quando avete chiuso una trattativa." },
  { it: "Sì / No", dj: "Iyyeh / La", br: "Sim / Não", pr: "IY-yeh / là", uso: "Basi." },
  { it: "Per favore", dj: "Afak", br: "Por favor", pr: "AA-fak", uso: "In fondo a ogni richiesta." },
  { it: "Il conto, per favore", dj: "L-hsab, afak", br: "A conta, por favor", pr: "l-HSAB AA-fak", uso: "Al ristorante." },
  { it: "Scusa, permesso", dj: "Smahli", br: "Com licença", pr: "SMAH-li", uso: "Nei vicoli stretti della medina." },
  { it: "Nessun problema", dj: "Mashi mushkil", br: "De boa", pr: "MA-shi mush-KIL", uso: "La risposta a quasi tutto, in Marocco." },
  { it: "Basta, finito", dj: "Safi", br: "Chega", pr: "SA-fi", uso: "Quando il venditore insiste. O quando siete pieni." },
  { it: "Dov'è...?", dj: "Fin kayn...?", br: "Cadê...?", pr: "fin KAYN", uso: "Più il posto. Poi seguite il dito." },
  { it: "Andiamo", dj: "Yallah", br: "Bora", pr: "YAL-lah", uso: "Per far partire il gruppo la mattina." },
  { it: "Bello", dj: "Zwin", br: "Massa", pr: "ZWIN", uso: "Per i posti, le cose e le persone." },
  { it: "Buono (da mangiare)", dj: "Bnin", br: "Delícia", pr: "b-NIN", uso: "Al cuoco del tagine. Lo farete felice." },
  { it: "Tè", dj: "Atay", br: "Chá", pr: "a-TAY", uso: "Con o senza zucchero: «bla sukkar» è senza." },
  { it: "Arrivederci", dj: "Bslama", br: "Falou", pr: "b-SLA-ma", uso: "Uscendo dai negozi senza aver comprato niente." },
  { it: "Se Dio vuole", dj: "Inshallah", br: "Se Deus quiser", pr: "in-SHAL-lah", uso: "Significa «forse». A volte «mai»." }
];

/* Prezzi indicativi in dirham, stime da verificare */
C.PREZZI = [
  { cosa: "Tè alla menta al bar", giusto: "10–15", nota: "Nei posti per turisti anche 30." },
  { cosa: "Spremuta in piazza", giusto: "10–15", nota: "Controllate il prezzo scritto sul banco." },
  { cosa: "Tagine in un posto locale", giusto: "50–80", nota: "Nei ristoranti per turisti 100–150." },
  { cosa: "Petit taxi in città", giusto: "10–30", nota: "Chiedete il tassametro, «compteur», o fissate il prezzo prima." },
  { cosa: "Taxi aeroporto di Marrakech-centro", giusto: "100–150", nota: "Fissate il prezzo prima di salire." },
  { cosa: "Bottiglia d'acqua 1,5 litri", giusto: "6–8", nota: "In negozio. Nei posti turistici il doppio." },
  { cosa: "Babbucce", giusto: "80–150", nota: "Partite da un terzo del primo prezzo." },
  { cosa: "Hammam locale con kessa", giusto: "50–120", nota: "Solo ingresso 15–30." },
  { cosa: "SIM con internet", giusto: "20–50", nota: "Con il passaporto, in aeroporto o nei negozi delle compagnie." },
  { cosa: "Parcheggio custodito per la notte", giusto: "20–40", nota: "Al guardiano, quando ripartite." }
];

C.VALIGIA = [
  { g: "Documenti", items: ["Passaporto valido almeno 6 mesi", "Biglietti di andata e ritorno sul telefono", "Patente, più quella internazionale se serve", "Polizza dell'assicurazione sul telefono", "Foto del passaporto nel cloud"] },
  { g: "Soldi", items: ["Bancomat per prelevare dirham", "Carta di credito di riserva", "Un po' di euro in contanti"] },
  { g: "Vestiti", items: ["Piumino leggero", "Felpa o pile pesante", "Cappello e guanti per il deserto", "Scarpe da trekking", "Ciabatte per hammam e docce", "Costume"] },
  { g: "Deserto e moto", items: ["Bandana o scaldacollo contro la sabbia", "Occhiali da sole", "Torcia frontale", "Casco e guanti, se li avete"] },
  { g: "Varie", items: ["Crema solare", "Power bank", "Kit medicine base", "Fazzoletti e salviette", "Lucchetto per gli ostelli", "Busta impermeabile per il telefono"] }
];

C.METEO = [
  { dove: "Fes", giorno: "15–17", notte: "3–5", nota: "Fresco, piove qualche giorno." },
  { dove: "Rabat", giorno: "17–18", notte: "8–9", nota: "Umido, vento dal mare." },
  { dove: "Marrakech", giorno: "18–20", notte: "5–7", nota: "Sole, sere fredde." },
  { dove: "Passo dell'Atlante", giorno: "5–10", notte: "sotto zero", nota: "Può nevicare e chiudere per qualche ora." },
  { dove: "Merzouga", giorno: "17–20", notte: "da -2 a 3", nota: "Il freddo vero è di notte nel deserto." },
  { dove: "Taghazout", giorno: "20–22", notte: "9–11", nota: "Acqua a 16–18 gradi, muta 4/3." }
];

C.NUMERI = [
  { n: "19", cosa: "Polizia in città" },
  { n: "177", cosa: "Gendarmeria, fuori città" },
  { n: "15", cosa: "Ambulanza e vigili del fuoco" }
];

C.INFO = [
  { t: "Documenti", x: "Serve il passaporto, la carta d'identità non basta. Per turismo nessun visto fino a 3 mesi. All'arrivo possono chiedere il biglietto di ritorno." },
  { t: "Soldi", x: "Il dirham non si compra in Italia: si preleva al bancomat in aeroporto o in città. Nei souk, nei taxi e nei campi si paga quasi solo in contanti." },
  { t: "Telefono", x: "Una SIM locale di Maroc Telecom, Orange o inwi si compra con il passaporto. Con circa 10 € avete decine di giga." },
  { t: "Guida", x: "I controlli di velocità sono frequenti anche nei paesini e le multe si pagano sul posto. Di notte evitate le strade di montagna." },
  { t: "Truffe tipiche", x: "«La strada è chiusa, ti accompagno io»: no, grazie, e andate avanti. Nei taxi piccoli chiedete il tassametro o fissate il prezzo prima." },
  { t: "Alcol e rispetto", x: "L'alcol si trova nei locali, negli hotel e in alcuni supermercati, ma non si beve per strada. Chiedete prima di fotografare le persone." },
  { t: "Rif e Ketama", x: "È la zona della cannabis e le leggi sulla droga sono severe anche per i turisti. Se ci passate: di giorno, senza dormirci e senza comprare niente." },
  { t: "Prese elettriche", x: "Uguali a quelle italiane. Non serve l'adattatore." }
];

C.SEED_TODO = [
  ["Volo di ritorno: Agadir → Londra → Roma, l'8/1 sera", "2026-11-10"],
  ["Prima notte a Fes dal 28 al 29, con transfer dall'aeroporto", "2026-11-10"],
  ["Serata del 31: club o festa nel deserto di Agafay", "2026-11-20"],
  ["Alloggio all'Hivernage per le notti del 31 e del 1°", "2026-11-20"],
  ["Noleggio auto Fes → Agadir con il supplemento di riconsegna scritto", "2026-11-20"],
  ["Tour in moto privato dal 3 al 5 gennaio (se scegliamo B)", "2026-11-20"],
  ["Permesso internazionale di guida, se il noleggio lo chiede", "2026-11-30"],
  ["Campo nel deserto", "2026-12-01"],
  ["Alloggi a Fes, Rabat e nelle valli", "2026-12-01"],
  ["Surf camp e alloggi sulla costa", "2026-12-10"],
  ["Assicurazione di viaggio che copra moto e fuoristrada", "2026-12-10"]
];

/* ---------- Budget: per una volta siamo seri ---------- */
/* Stime a testa all'8 novembre 2026. Voli di andata e ritorno esclusi: già pagati.
   Le spese sicure sono solo quelle che ci sono in ogni scenario: auto, benzina e dormire stanno negli scenari. */
C.BUDGET = {
  fissi: [
    { t: "Mangiare per 11 giorni", e: 200, nota: "Tagine a €6–10, pesce sull'oceano a €15." },
    { t: "Varie", e: 50, nota: "SIM, mance, parcheggi, ingressi." },
    { t: "Assicurazione di viaggio", e: 30, nota: "Che copra moto e fuoristrada." }
  ],
  scelte: [
    { id: "capodanno", t: "Capodanno", tipo: "uno", def: 1, opz: [
      { t: "Niente di speciale", e: 0 }, { t: "Club all'Hivernage", e: 110 }, { t: "Festa nel deserto di Agafay", e: 180 }, { t: "Cena-spettacolo al Comptoir Darna", e: 320 } ] },
    { id: "moto", t: "Moto e motori", tipo: "uno", def: 1, opz: [
      { t: "Niente", e: 0 }, { t: "Quad o buggy, un paio d'ore", e: 45 }, { t: "Enduro con guida, mezza giornata", e: 90 }, { t: "Tour privato di 3 giorni con bivacco", e: 650 } ] },
    { id: "surf", t: "Surf", tipo: "uno", def: 1, opz: [
      { t: "Niente, guardo", e: 0 }, { t: "Due lezioni con tavola e muta", e: 60 }, { t: "Surf camp per 3 giorni", e: 150 } ] },
    { id: "campo", t: "Notte nel deserto", tipo: "uno", def: 0, opz: [
      { t: "Campo standard, già nel conto", e: 0 }, { t: "Campo di lusso, con bagno e riscaldamento", e: 80 } ] },
    { id: "extra", t: "Extra", tipo: "piu", opz: [
      { t: "Hammam con kessa", e: 12 }, { t: "Jardin Majorelle", e: 17 }, { t: "Corso di cucina", e: 40 }, { t: "Arrampicata nel Todra", e: 55 }, { t: "Guida ufficiale a Fes", e: 12 } ] }
  ],
  shopping: { min: 0, max: 300, step: 10, def: 60 }
};

/* Costo extra a testa di ogni esperienza, oltre alle spese sicure (stime).
   0 = già dentro le spese sicure (dormire, mangiare, campo standard) oppure gratis. */
C.COSTO = {
  "rif-ketama": 40, "rif-chefchaouen": 25, "rif-akchour": 5,
  "cap-club": 140, "cap-agafay": 185, "cap-darna": 320, "cap-rooftop": 45,
  "moto-tour3": 700, "moto-pista": 0, "moto-agafay": 70, "moto-dune": 100, "moto-buggy": 55, "moto-quad": 45, "moto-noleggio": 175,
  "des-campo": 25, "des-chigaga": 45, "des-nomadi": 0, "des-cammello": 22, "des-sandboard": 10, "des-stelle": 0,
  "mon-tichka": 0, "mon-benhaddou": 2, "mon-dades": 0, "mon-todra": 0, "mon-arrampicata": 55, "mon-rose": 22, "mon-ourika": 0,
  "oc-imsouane": 60, "oc-taghazout": 90, "oc-tamraght": 0, "oc-rabat": 30, "oc-paradise": 0,
  "cit-fes": 11, "cit-merinidi": 0, "cit-volubilis": 8, "cit-oudayas": 0, "cit-jemaa": 0, "cit-hammam": 10, "cit-majorelle": 17, "cit-benyoussef": 7,
  "cibo-tanjia": 0, "cibo-mechoui": 0, "cibo-bissara": 0, "cibo-pastilla": 0, "cibo-pesce": 0, "cibo-corso": 40, "cibo-te": 0,
  "sfida-souk": 10, "sfida-noapp": 0, "sfida-darija": 0, "sfida-foto": 0, "sfida-tagine": 0
};
C.SICURI = C.BUDGET.fissi.reduce((a, f) => a + f.e, 0);
Object.keys(C.SCEN).forEach((k) => { const s = C.SCEN[k]; s.logistica = s.costi.reduce((a, c) => a + c[1], 0); s.costo = C.SICURI + s.logistica; });
/* stato di ogni attività per la crew: "si" (tre 🔥), "quasi" (due 🔥 e nessun 💀), "no" (almeno un 💀), "aperta" */
C.stato = function (reaz) {
  const by = {};
  (reaz || []).forEach((r) => { if (String(r.attivita).includes(":")) return; const o = (by[r.attivita] = by[r.attivita] || { si: [], forse: [], no: [] }); if (o[r.voto]) o[r.voto].push(r.nome); });
  const out = {};
  C.ATT.forEach((a) => {
    const v = by[a.id] || { si: [], forse: [], no: [] };
    out[a.id] = { v, s: v.no.length ? "no" : C.CREW.every((n) => v.si.includes(n)) ? "si" : v.si.length === 2 ? "quasi" : "aperta" };
  });
  return out;
};
C.spesa = function (reaz, scen) {
  const st = C.stato(reaz), S = C.SCEN[scen] || null, inc = S ? S.include : [];
  let dec = 0, ballo = 0; const decise = [], inballo = [];
  C.ATT.forEach((a) => { if (inc.includes(a.id)) return; const c = C.COSTO[a.id] || 0; if (st[a.id].s === "si") { dec += c; decise.push([a, c]); } else if (st[a.id].s === "quasi") { ballo += c; inballo.push([a, c]); } });
  const sc = S ? S.logistica : 0;
  return { sicuri: C.SICURI, scen: sc, decise: dec, ballo, tot: C.SICURI + sc + dec, max: C.SICURI + sc + dec + ballo, listaDecise: decise, listaBallo: inballo };
};
/* lo scenario del gruppo: il più votato in sondaggi (domanda "scenario"); a parità vince quello che costa meno; nessun voto = A */
C.scenGruppo = function (sond) {
  const v = {}; Object.keys(C.SCEN).forEach((k) => (v[k] = 0));
  (sond || []).forEach((r) => { if (r.domanda === "scenario" && v[r.scelta] !== undefined) v[r.scelta]++; });
  const max = Math.max(...Object.values(v));
  if (!max) return { pick: "A", v, voted: false };
  const top = Object.keys(v).filter((k) => v[k] === max).sort((a, b) => C.SCEN[a].logistica - C.SCEN[b].logistica);
  return { pick: top[0], v, voted: true };
};

/* ---------- La mappa: punti d'interesse ---------- */
/* Coordinate approssimate: per arrivarci si usa il tasto «Portami qui», che cerca il nome su Google Maps. */
C.POICAT = {
  sorca:     { e: "💃", n: "Sorca: probabilità alta", c: "#d70015" },
  zero:      { e: "🧊", n: "Sorca: zero assoluto", c: "#8e8e93" },
  tossico:   { e: "🌿", n: "Zona tossici", c: "#1d8a3a" },
  capodanno: { e: "🎆", n: "Capodanno", c: "#8e44ad" },
  surf:      { e: "🏄", n: "Surf", c: "#0071e3" },
  mangiare:  { e: "🍢", n: "Mangiare", c: "#bf4800" },
  foto:      { e: "📸", n: "Foto da profilo", c: "#5e5ce6" },
  vedere:    { e: "🏛️", n: "Da vedere", c: "#8B5A2B" },
  occhio:    { e: "⚠️", n: "Occhio", c: "#b25000" }
};
C.POI = [
  // sorca: dove forse sì
  { id: "theatro", cat: "sorca", n: "Theatro", dove: "Hivernage, Marrakech", lat: 31.6237, lng: -8.0075, q: "Theatro Marrakech",
    x: "Il club più famoso della città, dentro il resort Es Saadi. Dress code: niente scarpe da trekking.", j: "Probabilità 75%. Il restante 25% è Davide al telefono fuori dal locale." },
  { id: "555", cat: "sorca", n: "555 Famous Club", dove: "Boulevard Mohamed VI, Marrakech", lat: 31.6151, lng: -8.0190, q: "555 Famous Club Marrakech",
    x: "Terrazza grande, house e hit. Caro.", j: "Ti costa un rene entrare. L'altro rene ti serve per il drink. Suave." },
  { id: "equity", cat: "sorca", n: "Equity Point Hostel", dove: "Medina, Marrakech", lat: 31.6298, lng: -7.9902, q: "Equity Point Hostel Marrakech",
    x: "Ostello sociale con bar sul tetto. Il 31 fa cena e festa a €25, solo per chi dorme lì.", j: "Ostello pieno di ventenni del nord Europa. Voi avete 25 anni e la schiena di 50." },
  { id: "azoul", cat: "sorca", n: "Azoul Hostel", dove: "Taghazout", lat: 30.5437, lng: -9.7083, q: "Azoul Hostel Taghazout",
    x: "Falò sul tetto, poker, cene di gruppo, niente coprifuoco. Da €13.", j: "Qui le surfiste ci sono. Alle 22 dormono. Voi alle 22 avete appena aperto la terza birra." },
  { id: "papagayo", cat: "sorca", n: "Papagayo", dove: "Lungomare, Agadir", lat: 30.4045, lng: -9.6005, q: "Papagayo Agadir",
    x: "Club sulla spiaggia, DJ e musica commerciale. Mezz'ora di taxi da Taghazout.", j: "Il ritorno in taxi fissatelo prima. Alle 4 il tassista vi chiede il doppio e ha ragione lui." },
  { id: "lechill", cat: "sorca", n: "Le Chill", dove: "Rabat", lat: 34.0090, lng: -6.8345, q: "Le Chill Rabat",
    x: "Bar pieno di ragazzi dopo il lavoro, musica internazionale.", j: "Il 30 sera. Una birra e a letto, che domani si guida. Sì, come no." },
  // sorca: zero
  { id: "erg", cat: "zero", n: "Campo nelle dune", dove: "Erg Chebbi, Merzouga", lat: 31.1300, lng: -3.9800, q: "Erg Chebbi Merzouga",
    x: "Notte sotto le stelle, falò, tamburi.", j: "Uniche presenze femminili: una cammella di nome Fatima e una tedesca di 60 anni con la frontale." },
  { id: "fesnotte", cat: "zero", n: "Fes dopo le 22", dove: "Medina di Fes", lat: 34.0640, lng: -4.9760, q: "Fes el Bali",
    x: "La medina chiude presto e di notte è buia.", j: "Alle 22 chiude la medina. Pure voi. Talìa che vita." },
  { id: "tamraght", cat: "zero", n: "Tamraght", dove: "5 km da Taghazout", lat: 30.5120, lng: -9.6800, q: "Tamraght",
    x: "Paese di surfisti, bellissimo e tranquillo.", j: "Zero bar. Il massimo della vita notturna è un cane che abbaia alle 23." },
  { id: "tichka", cat: "zero", n: "Passo del Tizi n'Tichka", dove: "Alto Atlante, 2.260 m", lat: 31.2870, lng: -7.3800, q: "Tizi n'Tichka",
    x: "Il passo di montagna sulla strada per il deserto.", j: "A 2.260 metri a gennaio l'unica cosa calda è il motore della Dacia." },
  // tossici
  { id: "ketama", cat: "tossico", n: "Valle di Ketama", dove: "Rif, circa 4 ore a nord di Fes", lat: 34.9170, lng: -4.5670, q: "Ketama Morocco",
    x: "La valle più famosa del Rif, il cuore storico della coltivazione. Si vede con una guida locale: il 29 nello scenario E, la variante del 30 negli altri.", j: "Guarda questo tossico: ha messo Ketama sul navigatore e ha detto «è per la cultura». Certo.",
    serio: "In Marocco la cannabis è legale solo per usi medici e industriali, con licenza (legge 13-21 del 2021). Comprarla e fumarla resta illegale, anche per i turisti. Sulle strade del Rif ci sono posti di blocco e le auto a noleggio vengono fermate. Si va a guardare, non a comprare." },
  { id: "akchour", cat: "vedere", n: "Cascate di Akchour", dove: "45 minuti da Chefchaouen", lat: 35.2400, lng: -5.1700, q: "Akchour waterfalls",
    x: "Sentiero tra le gole fino alle cascate e al «ponte di Dio». Mezza giornata.", j: "L'acqua a 8 gradi. Il primo che entra non paga cene per tutto il viaggio." },
  { id: "chefchaouen", cat: "tossico", n: "Chefchaouen", dove: "La città blu, 4 ore da Fes", lat: 35.1688, lng: -5.2636, q: "Chefchaouen",
    x: "La città blu sotto le montagne: la base tranquilla per le valli del Rif, nella variante del 29–30 dicembre.", j: "Ti offrono roba ogni 40 metri. Tu rispondi «la, shukran» e cammini. Come con le ragazze, ma al contrario." },
  { id: "fesguide", cat: "tossico", n: "Le guide «amiche» di Fes", dove: "Porte della medina, Fes", lat: 34.0617, lng: -4.9836, q: "Bab Boujloud Fes",
    x: "Ragazzi che si offrono di accompagnarvi e poi propongono di tutto.", j: "«Amico, la strada è chiusa». Non è chiusa. Non è mai chiusa. Bora, si cammina." },
  // capodanno
  { id: "elfenn", cat: "capodanno", n: "El Fenn, rooftop", dove: "Medina, Marrakech", lat: 31.6296, lng: -7.9940, q: "El Fenn Marrakech",
    x: "Festa sul tetto il 31. L'anno scorso: dalle 21 all'1:30, €50. Il programma esce a dicembre.", j: "Il posto più fico per mezzanotte. Ci si va vestiti bene, non con la felpa dell'Erasmus." },
  { id: "darna", cat: "capodanno", n: "Comptoir Darna", dove: "Hivernage, Marrakech", lat: 31.6219, lng: -8.0112, q: "Comptoir Darna Marrakech",
    x: "Cena-spettacolo con DJ, 3.500 dirham a testa. Cancellabile fino al 24 dicembre.", j: "€320 a testa. Il saluzzese è già svenuto. Esageruma nen." },
  { id: "agafay", cat: "capodanno", n: "Deserto di Agafay", dove: "40 minuti da Marrakech", lat: 31.4700, lng: -8.1700, q: "Agafay Desert",
    x: "Campi nel deserto di pietra con cena, DJ e falò il 31, transfer compreso.", j: "Mezzanotte sotto le stelle. Romantico. Peccato siate voi tre." },
  { id: "jemaa", cat: "capodanno", n: "Piazza Jemaa el-Fna", dove: "Marrakech", lat: 31.6258, lng: -7.9891, q: "Jemaa el-Fna",
    x: "La piazza più famosa del Marocco: bancarelle, musica, incantatori di serpenti. Gratis.", j: "Il piano B gratis. Il serpente ti guarda. Tu guardi il portafoglio." },
  // surf
  { id: "anchor", cat: "surf", n: "Anchor Point", dove: "Taghazout", lat: 30.5530, lng: -9.7190, q: "Anchor Point Taghazout",
    x: "L'onda più famosa del paese. Per esperti. Dalle scogliere sopra c'è il tramonto più bello.", j: "Voi la guardate dalla scogliera con una birra. È il vostro livello. Ed è giusto così." },
  { id: "imsouane", cat: "surf", n: "La baia di Imsouane", dove: "1 ora a nord di Taghazout", lat: 30.8406, lng: -9.8227, q: "Imsouane Bay",
    x: "Onda lunghissima e lenta: la migliore per imparare.", j: "Due secondi in piedi sulla tavola. Venti minuti a raccontarli. Caralho." },
  { id: "banana", cat: "surf", n: "Banana Point", dove: "Aourir, vicino a Tamraght", lat: 30.4910, lng: -9.6720, q: "Banana Point Aourir",
    x: "Spot per principianti con le scuole di surf.", j: "Il nome dice già tutto. Le battute fatevele da soli." },
  // mangiare
  { id: "bancarelle", cat: "mangiare", n: "Bancarelle di Jemaa el-Fna", dove: "Marrakech", lat: 31.6252, lng: -7.9880, q: "Jemaa el-Fna food stalls",
    x: "Cena sulle panche, spiedini, lumache, teste di pecora. Scegliete i banchi pieni di marocchini.", j: "Chi ordina la testa di pecora paga il giro. Regola della casa." },
  { id: "mechoui", cat: "mangiare", n: "Vicolo del mechoui", dove: "Souk Ablueh, Marrakech", lat: 31.6268, lng: -7.9877, q: "Mechoui Alley Marrakech",
    x: "Agnello cotto per ore sottoterra, venduto a peso col pane e il cumino.", j: "Mezzo chilo a testa. Il palermitano ne chiede un chilo e chiama tutto «stigghiola»." },
  { id: "bissara", cat: "mangiare", n: "Bissara a Talaa Kebira", dove: "Medina di Fes", lat: 34.0623, lng: -4.9790, q: "Talaa Kebira Fes",
    x: "Zuppa di fave con olio e cumino, la colazione di Fes. Meno di un euro.", j: "Costa 7 dirham. Il saluzzese chiede lo sconto lo stesso." },
  { id: "porto", cat: "mangiare", n: "Pesce al porto", dove: "Porto di Agadir", lat: 30.4250, lng: -9.6260, q: "Agadir fish market port",
    x: "Scegli il pesce dal banco e te lo grigliano lì. Circa €15 a testa.", j: "Il palermitano dirà che a Mondello è meglio. Ignoratelo." },
  // foto
  { id: "chouara", cat: "foto", n: "Concerie Chouara", dove: "Medina di Fes", lat: 34.0663, lng: -4.9708, q: "Chouara Tannery",
    x: "Le vasche colorate dove conciano le pelli. Si vedono dalle terrazze dei negozi, ti danno la menta da annusare.", j: "La menta serve per l'odore. Lo stesso odore della Dacia il quinto giorno." },
  { id: "benhaddou", cat: "foto", n: "Aït Benhaddou", dove: "Vicino a Ouarzazate", lat: 31.0470, lng: -7.1320, q: "Ait Benhaddou",
    x: "Il villaggio di terra del Gladiatore e del Trono di spade.", j: "Foto in posa da gladiatore. Il risultato: un tossico in ciabatte." },
  { id: "dune", cat: "foto", n: "Dune all'alba", dove: "Erg Chebbi", lat: 31.1500, lng: -3.9700, q: "Erg Chebbi dunes",
    x: "Sveglia alle 6, salita sulla duna grande, il sole che esce dal deserto.", j: "La foto profilo per i prossimi tre anni. Unica condizione: nessuno di voi tre fa pipì sullo sfondo." },
  { id: "majorelle", cat: "foto", n: "Jardin Majorelle", dove: "Marrakech", lat: 31.6417, lng: -8.0033, q: "Jardin Majorelle",
    x: "Il giardino blu di Yves Saint Laurent. Ingresso circa €17, prenotate online.", j: "Pieno di influencer. Statisticamente, l'unico posto dove c'è più sorca che a Theatro." },
  { id: "oudayas", cat: "foto", n: "Kasbah degli Oudayas", dove: "Rabat", lat: 34.0315, lng: -6.8360, q: "Kasbah of the Udayas",
    x: "Vicoli bianchi e blu sull'oceano. Gratis.", j: "La Chefchaouen dei poveri. E dei non tossici." },
  // da vedere
  { id: "koutoubia", cat: "vedere", n: "Koutoubia", dove: "Marrakech", lat: 31.6237, lng: -7.9936, q: "Koutoubia Mosque", w: "Koutoubia_Mosque",
    x: "Il minareto simbolo di Marrakech. Si guarda da fuori, gratis, al tramonto.", j: "L'unico posto di Marrakech dove nessuno vi vende niente. Godetevelo." },
  { id: "bahia", cat: "vedere", n: "Palazzo Bahia", dove: "Medina, Marrakech", lat: 31.6216, lng: -7.9831, q: "Bahia Palace", w: "Bahia_Palace",
    x: "Palazzo dell'Ottocento: cortili, giardini, soffitti di cedro. Circa €7.", j: "Il riad che non vi potete permettere. Foto e via." },
  { id: "benyoussef", cat: "vedere", n: "Medersa Ben Youssef", dove: "Medina, Marrakech", lat: 31.6318, lng: -7.9862, q: "Ben Youssef Madrasa", w: "Ben_Youssef_Madrasa",
    x: "L'antica scuola coranica con il cortile più fotografato del paese. Circa €5.", j: "Qui studiavano 900 ragazzi. Voi tre non arrivate a 900 parole di darija." },
  { id: "bouinania", cat: "vedere", n: "Medersa Bou Inania", dove: "Medina di Fes", lat: 34.0619, lng: -4.9830, q: "Bou Inania Madrasa Fes", w: "Bou_Inania_Madrasa",
    x: "Legno intagliato, stucchi e zellige. Una delle poche dove si entra.", j: "Il 29, primo giorno. L'ultimo in cui sarete ancora puliti." },
  { id: "merinidi", cat: "vedere", n: "Tombe merinidi", dove: "Collina sopra Fes", lat: 34.0674, lng: -4.9829, q: "Marinid Tombs Fes", w: "Marinid_Tombs",
    x: "Rovine sulla collina: da qui al tramonto si vede tutta la medina.", j: "Il tramonto più bello di Fes. Ci si arriva in taxi, non a piedi, tossici." },
  { id: "babmansour", cat: "vedere", n: "Bab Mansour", dove: "Meknès", lat: 33.8932, lng: -5.5664, q: "Bab Mansour Meknes", w: "Bab_Mansour",
    x: "La porta più bella del Marocco, sulla strada del 30 dicembre.", j: "Dieci minuti, una foto, si riparte. Chi guida decide." },
  { id: "volubilis", cat: "vedere", n: "Volubilis", dove: "Tra Fes e Meknès", lat: 34.0731, lng: -5.5541, q: "Volubilis", w: "Volubilis",
    x: "Rovine romane con mosaici veri, in mezzo agli ulivi. Circa €7.", j: "Il romano si sente a casa. Fa la guida e sbaglia tutto. Daje." },
  { id: "hassan", cat: "vedere", n: "Torre Hassan", dove: "Rabat", lat: 34.0240, lng: -6.8226, q: "Hassan Tower Rabat", w: "Hassan_Tower",
    x: "Il minareto incompiuto del 1195 e il mausoleo con le guardie a cavallo. Gratis.", j: "Incompiuta da 800 anni. Come il programma del viaggio." },
  { id: "todra", cat: "vedere", n: "Gole del Todra", dove: "Tinghir", lat: 31.5870, lng: -5.5880, q: "Todra Gorge", w: "Todgha_Gorge",
    x: "Pareti di roccia alte 300 metri e larghe 10. Si cammina nel fiume.", j: "Lo spazio tra le pareti è lo stesso che lascia Davide tra una chiamata e l'altra." },
  { id: "dades", cat: "vedere", n: "Gole del Dadès", dove: "Alto Atlante", lat: 31.4600, lng: -5.9500, q: "Dades Gorges", w: "Dadès_Gorges",
    x: "La strada a tornanti più fotografata del Marocco.", j: "Chi soffre la macchina si siede davanti. E soffre lo stesso." },
  { id: "ourika", cat: "vedere", n: "Valle dell'Ourika", dove: "1 ora da Marrakech", lat: 31.3500, lng: -7.7500, q: "Ourika Valley", w: "Ourika_Valley",
    x: "Villaggi berberi e cascate. Il recupero perfetto del 1° gennaio.", j: "L'aria di montagna aiuta col post-Capodanno. Dicono." },
  { id: "paradise", cat: "vedere", n: "Paradise Valley", dove: "Entroterra di Agadir", lat: 30.5680, lng: -9.5170, q: "Paradise Valley Morocco", w: "Paradise_Valley,_Morocco",
    x: "Piscine naturali tra le palme, a 40 minuti da Taghazout.", j: "A gennaio l'acqua è gelida. Il primo che si tuffa vince il rispetto eterno." },
  { id: "oufella", cat: "vedere", n: "Agadir Oufella", dove: "Collina sopra Agadir", lat: 30.4290, lng: -9.6230, q: "Agadir Oufella", w: "Agadir_Oufella",
    x: "La vecchia kasbah sulla collina: vista su tutta la baia al tramonto.", j: "L'ultimo tramonto prima di Londra. Piangete pure, nessuno vi giudica. Il sito sì." },
  // occhio
  { id: "fesair", cat: "occhio", n: "Aeroporto di Fes, mezzanotte", dove: "Fes-Saïss", lat: 33.9273, lng: -4.9779, q: "Fes Saiss Airport",
    x: "Si arriva il 28 a mezzanotte: niente bus. Taxi grande a prezzo da fissare prima, o transfer del riad.", j: "Tre tossici all'uscita alle 00:30 senza transfer. Il tassista vi vede e sorride. Prenotate." },
  { id: "tichkaneve", cat: "occhio", n: "Neve sul Tichka", dove: "Alto Atlante", lat: 31.2700, lng: -7.3500, q: "Tizi n'Tichka road",
    x: "A gennaio può nevicare e chiudono la strada per qualche ora. Controllate la mattina stessa.", j: "Chi guida qui non è quello che ha fatto serata il 31. Ce lo diciamo adesso." },
  { id: "agadirair", cat: "occhio", n: "Aeroporto di Agadir", dove: "Agadir Al Massira", lat: 30.3250, lng: -9.4131, q: "Agadir Al Massira Airport",
    x: "L'8 si riparte: Agadir → Londra → Roma. Dacia da riconsegnare qui con il pieno.", j: "Niente regalini del Rif in valigia: a Londra i cani all'arrivo fanno il loro lavoro. Benissimo." },
  // dal playbook (scenario E)
  { id: "rcif", cat: "mangiare", n: "Place Rcif, le griglie della sera", dove: "Medina di Fes", lat: 34.0618, lng: -4.9726, q: "Place R'cif Fes",
    x: "Dopo le 19 arrivano i banchi per la gente del posto: tihal, spiedini, harira. Si mangia con pochi dirham.", j: "Tutto molto igienico. Davvero. Più o meno." },
  { id: "azrou", cat: "foto", n: "Le bertucce di Azrou", dove: "Foresta di cedri, Medio Atlante", lat: 33.415, lng: -5.175, q: "Cèdre Gouraud Azrou", w: "Barbary_macaque",
    x: "Scimmie libere tra i cedri, sulla strada Fes → deserto.", j: "La foto più bella del viaggio ha una scimmia. E non è Augusto." },
  { id: "colzad", cat: "occhio", n: "Neve sulla strada del deserto", dove: "Col du Zad e Midelt, statale N13", lat: 32.98, lng: -5.06, q: "Col du Zad",
    x: "Da Fes a Merzouga si passa a 2.178 metri. A gennaio 2026 la neve ha chiuso la N13 tra Timahdite e Aït Oufella. Nello scenario E ci passate il 31: controllate la mattina, partite alle 7, gomme buone.", j: "Capodanno a Midelt con le catene montate da un saluzzese. Esageruma nen." },
  { id: "gara", cat: "foto", n: "Gara Medouar", dove: "A nord-ovest di Merzouga, su pista", lat: 31.3008, lng: -4.4006, q: "Gara Medouar", w: "Gara_Medouar",
    x: "Montagna ad anello usata nel film di 007 Spectre. Si va in 4x4 con autista: l'auto a noleggio sulla pista di solito non è assicurata.", j: "Tre tossici nella base del cattivo di Bond. Il cattivo vero è il conto del 4x4." },
  { id: "khamlia", cat: "vedere", n: "Khamlia, il villaggio gnawa", dove: "7 km a sud di Merzouga", lat: 31.0351, lng: -4.0073, q: "Khamlia", w: "Khamlia",
    x: "Tamburi e nacchere di ferro suonati per chi passa, con il tè. Offerta libera.", j: "Davide balla. Nessuno lo ferma. Nessuno lo filma, purtroppo per lui." },
  { id: "rissani", cat: "mangiare", n: "Rissani e la medfouna", dove: "40 km da Merzouga", lat: 31.2859, lng: -4.2751, q: "Rissani medfouna", w: "Medfouna",
    x: "La pizza berbera cotta nel forno a legna. Il souk grande è martedì, giovedì e domenica.", j: "Il palermitano la chiama sfincione. Lo correggono in quattro lingue." },
  { id: "timlaline", cat: "foto", n: "Dune di Timlaline", dove: "Vicino a Tamri, sulla costa", lat: 30.668, lng: -9.838, q: "Timlaline dunes",
    x: "Dune chiare che finiscono nell'oceano, sulla strada Taghazout → Imsouane.", j: "Il deserto, ma a 20 gradi. Il freddone di Saluzzo qui non serve." },
  { id: "tifnit", cat: "occhio", n: "Tifnit non c'è più", dove: "Parco di Souss-Massa, a sud di Agadir", lat: 30.19, lng: -9.64, q: "Tifnit",
    x: "Il villaggio di pescatori dei vecchi video è stato raso al suolo tra fine 2023 e inizio 2024. Anche a Imsouane hanno demolito le case sul mare a gennaio 2024: oggi è aperta, ma prima di pagare un ostello controllate che abbia recensioni recenti.", j: "Se un video dice «posto segreto», è del 2019 e il posto non esiste più." }
];

/* ---------- Citazioni: una al giorno in Home, e nell'intro ---------- */
/* [frase, cosa vuol dire, da dove viene] */
C.CITAZIONI = [
  ["Dio fa!", "va bene per tutto: stupore, rabbia, conto del ristorante", "piemontese"],
  ["Esageruma nen.", "non esageriamo", "piemontese"],
  ["Bogia nen.", "non ti muovere. Il motto del Piemonte, e di chi non prenota", "piemontese"],
  ["Fa nen 'l fol.", "non fare lo scemo", "piemontese"],
  ["Va a ciapé ij rat.", "vai a prendere i topi. Cioè: sparisci", "piemontese"],
  ["Bôja fauss!", "accidenti!", "piemontese"],
  ["Talìa!", "guarda!", "palermitano"],
  ["Amunì!", "andiamo!", "palermitano"],
  ["Chi fa, babbìi?", "che fai, scherzi?", "palermitano"],
  ["Bedda matri!", "madonna santa!", "palermitano"],
  ["Nun fari u babbu.", "non fare lo scemo", "palermitano"],
  ["Chi camurrìa!", "che rottura!", "palermitano"],
  ["Daje!", "forza, andiamo", "romano"],
  ["Me cojoni!", "accidenti, che roba", "romano"],
  ["Stacce.", "fattene una ragione", "romano"],
  ["Ma che stai a dì?", "ma cosa dici?", "romano"],
  ["Nun ce sta niente da fa'.", "non c'è niente da fare", "romano"],
  ["Sto a rosicà.", "sono invidioso", "romano"],
  ["Bora!", "andiamo! Ricordo di San Paolo", "brasiliano"],
  ["Tá de brincadeira?", "stai scherzando?", "brasiliano"]
];

/* ---------- Foto vere da Wikipedia (Wikimedia Commons, licenze libere) ---------- */
C.WIKI = {
 "Ketama": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Ketama.jpg/330px-Ketama.jpg",
 "Chefchaouen": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/MoroccoChefchaouen_fromhill1.jpg/330px-MoroccoChefchaouen_fromhill1.jpg",
 "Akchour": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a1/Akchour_waterfall.jpg/330px-Akchour_waterfall.jpg",
 "Agafay": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Agafay_desert.jpg/330px-Agafay_desert.jpg",
 "Ouarzazate": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Kasbah_Taourirt_in_Ouarzazate_2011.jpg/330px-Kasbah_Taourirt_in_Ouarzazate_2011.jpg",

 "Agadir": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/South_view_sea_side_from_Kasbah_of_Agadir_Oufella_%28cropped%29.jpg/330px-South_view_sea_side_from_Kasbah_of_Agadir_Oufella_%28cropped%29.jpg",
 "Agadir_Oufella": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/aa/AGADIR_OFELLA.jpg/330px-AGADIR_OFELLA.jpg",
 "All-terrain_vehicle": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Four_wheeler.jpg/330px-Four_wheeler.jpg",
 "Atlas_Mountains": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Plateau_Yagour%2C_Agdal%2C_Morocco.jpg/330px-Plateau_Yagour%2C_Agdal%2C_Morocco.jpg",
 "Aït_Benhaddou": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Ksar_A%C3%AFt_Benhaddou%2C_Marocco_%28%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%D8%8C_%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8%2C_%E2%B4%B0%E2%B5%A2%E2%B5%9C_%E2%B5%83%E2%B4%B0%E2%B4%B7%E2%B4%B7%E2%B5%93%29.jpg/330px-Ksar_A%C3%AFt_Benhaddou%2C_Marocco_%28%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%D8%8C_%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8%2C_%E2%B4%B0%E2%B5%A2%E2%B5%9C_%E2%B5%83%E2%B4%B0%E2%B4%B7%E2%B4%B7%E2%B5%93%29.jpg",
 "Bab_Bou_Jeloud": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Bab_Bou_Jeloud_%28Fes%2C_Marocco%29.jpg/330px-Bab_Bou_Jeloud_%28Fes%2C_Marocco%29.jpg",
 "Bab_Mansour": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Bab_mansour_DSCF5811.jpg/330px-Bab_mansour_DSCF5811.jpg",
 "Bahia_Palace": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Bahia_Palace_large_court.jpg/330px-Bahia_Palace_large_court.jpg",
 "Ben_Youssef_Madrasa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Coranic_School_%28106589859%29.jpeg/330px-Coranic_School_%28106589859%29.jpeg",
 "Bissara": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/42/Bissara_Moroccan_split_pea_and_fava_bean_soup.jpg/330px-Bissara_Moroccan_split_pea_and_fava_bean_soup.jpg",
 "Bou_Inania_Madrasa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Courtyard_Minaret_Bou_Inania_Fes_Nov25_A7CR_09138-42_HDR3.jpg/330px-Courtyard_Minaret_Bou_Inania_Fes_Nov25_A7CR_09138-42_HDR3.jpg",
 "Chouara_Tannery": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Chouara_Tannery_-_154_-_Marokko_Handybilder_2018_-_Fes_%2827347707917%29.jpg/330px-Chouara_Tannery_-_154_-_Marokko_Handybilder_2018_-_Fes_%2827347707917%29.jpg",
 "Dadès_Gorges": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/%22Spektakul%C3%A4re_Haarnadelkurven%22._04.jpg/330px-%22Spektakul%C3%A4re_Haarnadelkurven%22._04.jpg",
 "Draa_River": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Draa_River.jpg/330px-Draa_River.jpg",
 "Dromedary": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Camelus_dromedarius_in_Nuweiba.jpg/330px-Camelus_dromedarius_in_Nuweiba.jpg",
 "Enduro": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Stefan_Merriman.jpg/330px-Stefan_Merriman.jpg",
 "Erg_Chebbi": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/84/Merzouga_Dunes_2011.jpg/330px-Merzouga_Dunes_2011.jpg",
 "Erg_Chigaga": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c6/Caravan_in_the_desert.jpg/330px-Caravan_in_the_desert.jpg",
 "Fes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Bab_Bou_Jeloud_Frame_Minaret_Fes_Nov25_A7CR_09127-8_HDR3.jpg/330px-Bab_Bou_Jeloud_Frame_Minaret_Fes_Nov25_A7CR_09127-8_HDR3.jpg",
 "Fes_el_Bali": "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Fes_Bab_Bou_Jeloud_2011.jpg/330px-Fes_Bab_Bou_Jeloud_2011.jpg",
 "Hassan_Tower": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Hassan_Tower%2C_Rabat%2C_Marocco_%28%D8%B5%D9%88%D9%85%D8%B9%D8%A9_%D8%AD%D8%B3%D8%A7%D9%86_%29.jpg/330px-Hassan_Tower%2C_Rabat%2C_Marocco_%28%D8%B5%D9%88%D9%85%D8%B9%D8%A9_%D8%AD%D8%B3%D8%A7%D9%86_%29.jpg",
 "Hivernage": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Camp_de_S%C3%A9n%C3%A9galais_-_Fr%C3%A9jus_-_M%C3%A9diath%C3%A8que_de_l%27architecture_et_du_patrimoine_-_APZ0001924.jpg/330px-Camp_de_S%C3%A9n%C3%A9galais_-_Fr%C3%A9jus_-_M%C3%A9diath%C3%A8que_de_l%27architecture_et_du_patrimoine_-_APZ0001924.jpg",
 "Imsouane": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Plage_Sud_Imsouane_-_2023.jpg/330px-Plage_Sud_Imsouane_-_2023.jpg",
 "Jemaa_el-Fnaa": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/79/Djemaa_el_Fna.jpg/330px-Djemaa_el_Fna.jpg",
 "Kalaat_M'Gouna": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Modern_Pachalik_Building_Facade_in_Kelaa_M%27Gouna.jpg/330px-Modern_Pachalik_Building_Facade_in_Kelaa_M%27Gouna.jpg",
 "Kasbah": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Kasbah_of_Sfax.jpg/330px-Kasbah_of_Sfax.jpg",
 "Kasbah_of_the_Udayas": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Kasbah_Oudayas_exterior.jpg/330px-Kasbah_Oudayas_exterior.jpg",
 "Koutoubia_Mosque": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Marokko0112_%28retouched%29.jpg/330px-Marokko0112_%28retouched%29.jpg",
 "Maghrebi_mint_tea": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Tunisian_Tea_with_pine_nuts.jpg/330px-Tunisian_Tea_with_pine_nuts.jpg",
 "Majorelle_Garden": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Le_jardin_des_majorelle_40.JPG/330px-Le_jardin_des_majorelle_40.JPG",
 "Marinid_Tombs": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Marinid_Tombs_in_April_2016_1.jpg/330px-Marinid_Tombs_in_April_2016_1.jpg",
 "Marrakesh": "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Marrakech%2C_Morocco_%285421595453%29_%285%29.jpg/330px-Marrakech%2C_Morocco_%285421595453%29_%285%29.jpg",
 "Mechoui": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/Mechoui.jpg/330px-Mechoui.jpg",
 "Meknes": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Bab_Mansour_in_Meknes1732.jpg/330px-Bab_Mansour_in_Meknes1732.jpg",
 "Merzouga": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Merzouga_2024.jpg/330px-Merzouga_2024.jpg",
 "Milky_Way": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/ESO-VLT-Laser-phot-33a-07.jpg/330px-ESO-VLT-Laser-phot-33a-07.jpg",
 "Moroccan_cuisine": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/%D9%85%D8%B3%D9%85%D9%86.jpg/330px-%D9%85%D8%B3%D9%85%D9%86.jpg",
 "Ourika_Valley": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Ourika_Valley.jpg/330px-Ourika_Valley.jpg",
 "Paradise_Valley,_Morocco": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Paradise_Valley_palmiers.jpg/330px-Paradise_Valley_palmiers.jpg",
 "Pastilla": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ed/Bisteeya.jpg/330px-Bisteeya.jpg",
 "Rabat": "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/%22Eine_beeindruckende_Festung%22._09.jpg/330px-%22Eine_beeindruckende_Festung%22._09.jpg",
 "Souk": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Turkey_%2868742801%29.jpeg/330px-Turkey_%2868742801%29.jpeg",
 "Surfing": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Mavericks_Surf_Contest_2010b.jpg/330px-Mavericks_Surf_Contest_2010b.jpg",
 "Taghazout": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Taghazout_street_-_2026-02-02.jpg/330px-Taghazout_street_-_2026-02-02.jpg",
 "Tajine": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Tajine-marocain-un-plat-varie-et-sain_%28cropped%29.jpg/330px-Tajine-marocain-un-plat-varie-et-sain_%28cropped%29.jpg",
 "Tanjia": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Tanjia-959.jpg/330px-Tanjia-959.jpg",
 "Tinghir": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3e/Tinghir_DSC_0092_%2841274419445%29.jpg/330px-Tinghir_DSC_0092_%2841274419445%29.jpg",
 "Tizi_n'Tichka": "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Tizi_n%27Tichka.jpg/330px-Tizi_n%27Tichka.jpg",
 "Todgha_Gorge": "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/%22Ein_beeindruckendes_Naturwunder%22%2C_17.jpg/330px-%22Ein_beeindruckendes_Naturwunder%22%2C_17.jpg",
 "Volubilis": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Volubilis_Longshot_II.jpg/330px-Volubilis_Longshot_II.jpg",
 "Barbary_macaque": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Macaca_sylvanus.Mother_and_baby.jpg/330px-Macaca_sylvanus.Mother_and_baby.jpg",
 "Khamlia": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Khamlia_village.jpg/330px-Khamlia_village.jpg",
 "Gara_Medouar": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Capel_1_Vue_g%C3%A9n%C3%A9rale_du_Jebel_Mudawwar_depuis_le_sud-ouest.jpg/330px-Capel_1_Vue_g%C3%A9n%C3%A9rale_du_Jebel_Mudawwar_depuis_le_sud-ouest.jpg",
 "Medfouna": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Medfouna_or_Berber_Pizza_at_a_local_restaurant_near_Merzouga%2C_Errachidia%2C_Morocco.jpg/330px-Medfouna_or_Berber_Pizza_at_a_local_restaurant_near_Merzouga%2C_Errachidia%2C_Morocco.jpg",
 "Midelt": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/Midelt_ayachi.jpg/330px-Midelt_ayachi.jpg"
};
C.FOTO_ATT = {"rif-ketama": "Ketama", "rif-chefchaouen": "Chefchaouen", "rif-akchour": "Akchour", "cap-agafay": "Agafay", "moto-quad": "Agafay", "cap-rooftop": "Koutoubia_Mosque", "moto-tour3": "Draa_River", "moto-pista": "Dadès_Gorges", "moto-agafay": "Enduro", "moto-dune": "Erg_Chebbi", "moto-buggy": "All-terrain_vehicle", "moto-noleggio": "Atlas_Mountains", "des-campo": "Merzouga", "des-chigaga": "Erg_Chigaga", "des-cammello": "Dromedary", "des-stelle": "Milky_Way", "mon-tichka": "Tizi_n'Tichka", "mon-benhaddou": "Aït_Benhaddou", "mon-dades": "Kasbah", "mon-todra": "Todgha_Gorge", "mon-arrampicata": "Tinghir", "mon-ourika": "Ourika_Valley", "oc-imsouane": "Imsouane", "oc-taghazout": "Taghazout", "oc-rabat": "Rabat", "oc-paradise": "Paradise_Valley,_Morocco", "cit-fes": "Fes_el_Bali", "cit-merinidi": "Marinid_Tombs", "cit-volubilis": "Volubilis", "cit-oudayas": "Kasbah_of_the_Udayas", "cit-jemaa": "Jemaa_el-Fnaa", "cit-majorelle": "Majorelle_Garden", "cit-benyoussef": "Ben_Youssef_Madrasa", "cibo-tanjia": "Tanjia", "cibo-mechoui": "Mechoui", "cibo-bissara": "Bissara", "cibo-pastilla": "Pastilla", "cibo-pesce": "Moroccan_cuisine", "cibo-corso": "Tajine", "cibo-te": "Maghrebi_mint_tea", "sfida-souk": "Souk", "sfida-noapp": "Bab_Bou_Jeloud", "sfida-darija": "Fes", "sfida-foto": "Chouara_Tannery", "sfida-tagine": "Tajine", "mon-azrou": "Barbary_macaque", "des-capodanno": "Erg_Chebbi", "des-khamlia": "Khamlia", "des-gara": "Gara_Medouar", "des-rissani": "Medfouna"};
C.FOTO_POI = {"ketama": "Ketama", "chefchaouen": "Chefchaouen", "agafay": "Agafay", "akchour": "Akchour", "erg": "Erg_Chebbi", "fesnotte": "Fes_el_Bali", "tichka": "Tizi_n'Tichka", "fesguide": "Bab_Bou_Jeloud", "jemaa": "Jemaa_el-Fnaa", "anchor": "Taghazout", "imsouane": "Imsouane", "mechoui": "Mechoui", "bissara": "Bissara", "porto": "Agadir", "chouara": "Chouara_Tannery", "benhaddou": "Aït_Benhaddou", "dune": "Merzouga", "majorelle": "Majorelle_Garden", "oudayas": "Kasbah_of_the_Udayas", "tichkaneve": "Atlas_Mountains", "agadirair": "Agadir", "cap-club": "Hivernage"};
/* foto(chiave, "500px" o "960px"): l'indirizzo della foto alla grandezza giusta */
C.foto = function (k, size) { const u = C.WIKI[k]; return u ? u.replace("/330px-", "/" + (size || "500px") + "-") : null; };

/* ---------- Domande veloci: sì o no, in Home e nei popup ----------
   k: "att" = voto su un'idea (va in reazioni e conta in Il viaggio), "q" = informazione su di voi (va in sondaggi come q-<id>) */
C.DOMANDE = [
  { id: "capodanno-deserto", k: "q", tag: "🎆 Capodanno", f: "Erg_Chebbi", t: "Capodanno nel deserto, invece che a Marrakech?", x: "Falò, tamburi e stelle nelle dune. In cambio, niente club." },
  { id: "rif-ketama", k: "att", tag: "🌿 Il Rif", f: "Ketama", t: "Un giorno nelle valli di Ketama?", x: "Con una guida locale. Si guarda, non si compra." },
  { id: "patente-a", k: "q", tag: "🏍️ Su di te", f: "Enduro", t: "Hai la patente della moto?", x: "Serve per la KTM e per il tour in moto. Sinceramente, Davide." },
  { id: "moto-dune", k: "att", tag: "🏍️ Deserto", f: "Merzouga", t: "Enduro sulle dune di Merzouga?", x: "Da un'ora a un giorno intero, con la guida davanti." },
  { id: "guida", k: "q", tag: "🚗 Su di te", f: "Atlas_Mountains", t: "Te la senti di guidare 4 ore di fila?", x: "Serve per sapere su chi contare nei giorni lunghi." },
  { id: "oc-imsouane", k: "att", tag: "🏄 Oceano", f: "Imsouane", t: "Lezione di surf a Imsouane?", x: "L'onda lunga e lenta, la migliore per imparare." },
  { id: "passaporto", k: "q", tag: "🛂 Su di te", f: "Fes", t: "Il tuo passaporto scade dopo luglio 2027?", x: "Deve valere almeno 6 mesi. La carta d'identità non basta." },
  { id: "rif-chefchaouen", k: "att", tag: "🌿 Il Rif", f: "Chefchaouen", t: "Una notte a Chefchaouen, la città blu?", x: "La base tranquilla per le valli del Rif." },
  { id: "cit-hammam", k: "att", tag: "🕌 Fes", f: "Fes_el_Bali", t: "Hammam tutti e tre insieme?", x: "Vapore, sapone nero e lo scrub che toglie anche i peccati." },
  { id: "assicurazione", k: "q", tag: "🛡️ Su di te", f: "Agadir", t: "Hai già un'assicurazione di viaggio?", x: "Sanitaria e valida in Marocco. Se no, la facciamo insieme." },
  { id: "des-gara", k: "att", tag: "🐪 Deserto", f: "Gara_Medouar", t: "Gara Medouar in 4x4, il cratere di 007?", x: "Mezza giornata, con un autista del posto." },
  { id: "surf-sai", k: "q", tag: "🏄 Su di te", f: "Taghazout", t: "Sei mai stato in piedi su una tavola da surf?", x: "Anche solo due secondi. Contano." }
];

/* ---------- Il viaggio: dove siete ogni giorno (tappe del giorno, in ordine) ---------- */
C.DAYSTOPS = {
  "2026-12-29": { A: ["fes"] },
  "2026-12-30": { A: ["fes", "meknes", "volubilis", "rabat"], C: ["fes", "marrakech"] },
  "2026-12-31": { A: ["rabat", "marrakech"], C: ["marrakech"] },
  "2027-01-01": { A: ["marrakech", "agafay"] },
  "2027-01-02": { A: ["marrakech", "tichka", "benhaddou", "dades"], B: ["marrakech", "tichka", "benhaddou", "ouarzazate"], C: ["marrakech", "benhaddou", "dades"], D: ["marrakech", "merzouga"] },
  "2027-01-03": { A: ["dades", "todra", "merzouga"], B: ["ouarzazate", "dades", "todra"], C: ["dades", "todra", "merzouga"], D: ["merzouga"] },
  "2027-01-04": { A: ["merzouga", "ouarzazate"], B: ["todra", "mhamid"], C: ["merzouga", "marrakech"], D: ["merzouga", "marrakech"] },
  "2027-01-05": { A: ["ouarzazate", "taroudant", "imsouane"], B: ["mhamid", "ouarzazate"], C: ["marrakech", "taghazout"], D: ["marrakech", "taghazout"] },
  "2027-01-06": { A: ["imsouane"], B: ["ouarzazate", "taghazout"], C: ["taghazout"] },
  "2027-01-07": { A: ["imsouane", "taghazout"], B: ["taghazout"] },
  "2027-01-08": { A: ["taghazout", "agadir"] }
};
Object.entries({ "2026-12-29": ["fes", "ketama", "chefchaouen"], "2026-12-30": ["chefchaouen", "akchour", "fes"], "2026-12-31": ["fes", "azrou", "midelt", "merzouga"], "2027-01-01": ["merzouga", "gara", "merzouga"], "2027-01-02": ["merzouga", "rissani", "todra", "dades", "ouarzazate"], "2027-01-03": ["ouarzazate", "benhaddou", "taliouine", "tamraght"], "2027-01-04": ["tamraght", "taghazout"], "2027-01-05": ["tamraght", "timlaline", "imsouane"], "2027-01-06": ["imsouane"], "2027-01-07": ["imsouane", "taghazout"] }).forEach(([d, t]) => (C.DAYSTOPS[d].E = t));
C.stopsFor = function (d, s) { const x = C.DAYSTOPS[d] || {}; return x[s] || (s === "B" && x.A) || (s === "D" && x.C) || x.A || []; };
/* idee che non stanno in un giorno preciso: le mettiamo dove si può farle */
C.EXTRA_DAY = { "2026-12-29": ["cit-hammam", "cibo-corso", "sfida-souk", "sfida-darija", "cibo-te"], "2027-01-01": ["cit-jemaa", "cit-benyoussef", "cibo-tanjia"], "2027-01-02": ["mon-rose", "moto-noleggio"], "2027-01-03": ["des-nomadi"] };

/* ---------- I must: si fanno per forza, si decide solo come ---------- */
C.MUST = [
  { id: "valli", e: "🌿", t: "Le valli del Rif", foto: "Ketama",
    why: "Le valli di Ketama, dove c'è la produzione. Il motivo segreto per cui il tossico ha comprato il biglietto. Si guarda, non si compra.",
    serio: "Cannabis legale solo per usi medici e industriali con licenza; comprarla e fumarla è illegale anche per i turisti. Posti di blocco sulle strade del Rif. E il Rif è a nord, il resto del giro a sud: costa un giorno.",
    opz: [
      { id: "ketama", t: "Ketama con una guida locale", x: "Un giorno nelle valli della coltivazione, il 30 dicembre. Si salta Rabat e il 31 sono 6–8 ore di strada fino a Marrakech. Oppure lo scenario E, che parte proprio da qui.", e: 40, att: "rif-ketama" },
      { id: "chaouen", t: "Chefchaouen e le valli intorno", x: "La città blu come base, una notte, le cascate di Akchour. Più turistico e più tranquillo.", e: 35, att: "rif-chefchaouen" },
      { id: "atlante", t: "Niente Rif: le valli dell'Atlante", x: "Dadès e Todra, già nel giro. Niente piante, solo rocce. E il 31 arrivate riposati.", e: 0, att: "mon-todra" } ] },
  { id: "surf", e: "🏄", t: "Il surf", foto: "Imsouane",
    why: "Sei mesi a San Paolo e manco un'onda presa. Ora basta, tossici.",
    opz: [
      { id: "lezioni", t: "Due lezioni a Taghazout", x: "Tavola, muta e maestro, due mattine.", e: 60, att: "oc-taghazout" },
      { id: "camp", t: "Surf camp di 3 giorni", x: "Letto, colazione, lezioni ogni giorno. Già dentro il giro C.", e: 150 },
      { id: "imsouane", t: "La baia di Imsouane", x: "L'onda lunga e lenta, la migliore per imparare. Il 6 gennaio.", e: 60, att: "oc-imsouane" },
      { id: "guardo", t: "Guardo dalla scogliera", x: "Birra, tramonto e commenti tecnici senza sapere niente.", e: 0 } ] },
  { id: "moto", e: "🏍️", t: "La moto", foto: "Enduro",
    why: "Il Marocco in moto è il motivo per cui siete partiti. Tranne il saluzzese: lui è partito perché costava poco.",
    opz: [
      { id: "quad", t: "Quad al tramonto", x: "Agafay, un paio d'ore. Non serve la patente.", e: 45, att: "moto-quad" },
      { id: "alba", t: "Enduro all'alba ad Agafay", x: "Mezza giornata con la guida, vicino a Marrakech.", e: 70, att: "moto-agafay" },
      { id: "dune", t: "Enduro sulle dune di Merzouga", x: "Il più bello. Si cade sulla sabbia, almeno.", e: 100, att: "moto-dune" },
      { id: "tour", t: "Tour di 3 giorni con bivacco", x: "Il giro B. Serve la patente A e un po' di esperienza.", e: 700, att: "moto-tour3" } ] },
  { id: "deserto", e: "🐪", t: "Il deserto", foto: "Erg_Chebbi",
    why: "Una notte nelle dune. Freddo, stelle, zero campo. Si fa e basta.",
    opz: [
      { id: "campo", t: "Campo nelle dune di Merzouga", x: "Standard, cena e colazione. Già dentro i giri A, C e D.", e: 0, att: "des-campo" },
      { id: "lusso", t: "Campo di lusso", x: "Bagno e riscaldamento: per chi a -2° piange.", e: 80 },
      { id: "chigaga", t: "Erg Chigaga da M'Hamid", x: "Più lontano e più vuoto. Dentro il giro B.", e: 45, att: "des-chigaga" },
      { id: "agafay", t: "Agafay, vicino a Marrakech", x: "Deserto di pietra a 40 minuti. Il deserto per chi ha fretta.", e: 40 } ] }
];
/* gli altri must: cose che se tornate senza averle fatte, non siete stati in Marocco */
C.MUST_ALTRI = ["cit-jemaa", "mon-benhaddou", "des-stelle", "cit-hammam", "cibo-te", "sfida-souk", "sfida-tagine", "cit-fes", "cap-rooftop"];

/* ---------- Il viaggio: il Marocco diviso in zone, da nord a sud ---------- */
C.AREE = [
  { id: "rif", n: "Il Rif e Ketama", e: "🌿", foto: "Chefchaouen", lat: 35.0, lng: -4.9, z: 8, quando: "29–30 dicembre nello scenario E, variante negli altri", dir: "Montagne, valli della coltivazione, la città blu.", j: "La zona preferita del Tossico Supremo. Si guarda, non si compra." },
  { id: "fes", n: "Fes e Meknès", e: "🕌", foto: "Fes_el_Bali", lat: 34.0, lng: -5.2, z: 9, quando: "29 e 30 dicembre", dir: "La medina più grande del mondo, Volubilis, le porte di Meknès.", j: "Ci si perde entro 11 minuti. Il record è di Davide: 4 minuti, al telefono." },
  { id: "rabat", n: "Rabat", e: "🏛️", foto: "Kasbah_of_the_Udayas", lat: 34.02, lng: -6.83, z: 12, quando: "30 dicembre, solo nel giro A", dir: "La capitale sull'oceano: la kasbah bianca e blu, la torre Hassan.", j: "Capitale, gente giovane, prezzi umani. Una birra e via, domani si guida." },
  { id: "marrakech", n: "Marrakech e Agafay", e: "🎆", foto: "Jemaa_el-Fnaa", lat: 31.6, lng: -8.0, z: 10, quando: "31 dicembre e 1° gennaio, non nello scenario E", dir: "Capodanno, la piazza, i souk, il deserto di pietra a 40 minuti.", j: "La notte giusta è qui. Se non succede a Marrakech, non succede. Daje." },
  { id: "atlante", n: "Atlante e valli", e: "⛰️", foto: "Dadès_Gorges", lat: 31.3, lng: -6.4, z: 8, quando: "2 e 3 gennaio", dir: "Il passo a 2.260 metri, Aït Benhaddou, le gole del Dadès e del Todra.", j: "Sei ore di curve. Chi soffre la macchina sta davanti, e soffre lo stesso." },
  { id: "deserto", n: "Il deserto", e: "🐪", foto: "Erg_Chebbi", lat: 30.6, lng: -4.9, z: 7, quando: "3 e 4 gennaio, o Capodanno nello scenario E", dir: "Le dune di Merzouga, la notte nel campo, moto e buggy sulla sabbia.", j: "Freddo, stelle, zero sorca. Bellissimo lo stesso." },
  { id: "oceano", n: "L'oceano", e: "🏄", foto: "Imsouane", lat: 30.65, lng: -9.7, z: 9, quando: "dal 5 all'8 gennaio", dir: "Imsouane, Taghazout, il surf, il pesce, l'ultimo tramonto ad Agadir.", j: "Due secondi in piedi sulla tavola, venti minuti a raccontarlo. Caralho." }
];
/* a quale zona appartiene ogni idea */
C.AREA_ATT = {
  rif: ["rif-ketama", "rif-chefchaouen", "rif-akchour"],
  fes: ["cit-fes", "cit-merinidi", "cit-volubilis", "cit-hammam", "cibo-bissara", "cibo-pastilla", "sfida-noapp", "sfida-darija", "sfida-foto", "fes-tihal"],
  rabat: ["cit-oudayas", "oc-rabat"],
  marrakech: ["cap-club", "cap-agafay", "cap-darna", "cap-rooftop", "moto-agafay", "moto-quad", "cit-jemaa", "cit-majorelle", "cit-benyoussef", "mon-ourika", "cibo-tanjia", "cibo-mechoui", "cibo-corso", "cibo-te", "sfida-souk"],
  atlante: ["mon-tichka", "mon-benhaddou", "mon-dades", "mon-todra", "mon-arrampicata", "mon-rose", "moto-pista", "moto-noleggio", "mon-azrou"],
  deserto: ["des-campo", "des-cammello", "des-stelle", "des-sandboard", "des-nomadi", "des-chigaga", "moto-dune", "moto-buggy", "moto-tour3", "des-capodanno", "des-khamlia", "des-gara", "des-rissani"],
  oceano: ["oc-imsouane", "oc-taghazout", "oc-tamraght", "oc-paradise", "cibo-pesce", "sfida-tagine", "oc-timlaline"]
};
C.areaOf = function (id) { for (const k in C.AREA_ATT) if (C.AREA_ATT[k].includes(id)) return k; return null; };
