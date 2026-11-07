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
  // CAPODANNO
  { id: "cap-club", cat: "capodanno", t: "Club all'Hivernage", dove: "Marrakech", quando: "31 dic", prezzo: "€80–200", durata: "tutta la notte", follia: 4, tipo: "classico",
    desc: "Theatro, dentro il resort Es Saadi, oppure Pacha: DJ, spettacoli, si fa l'alba. Prima cena normale in un ristorante, così spendete solo per la serata.",
    joke: "Il primo che dice «andiamo a casa» alle 2 paga il taxi." },
  { id: "cap-agafay", cat: "capodanno", t: "Capodanno nel deserto di Agafay", dove: "Agafay, 40 min da Marrakech", quando: "31 dic", prezzo: "€120–250", durata: "sera e notte", follia: 4, tipo: "esperienza",
    desc: "Alcuni campi nel deserto di pietra fanno la notte del 31 con DJ, cena e falò, transfer compreso. Diverso da tutto, ma siete legati all'orario del loro rientro.",
    joke: "Fuochi d'artificio: le stelle. Bagno: una tenda. Ricordi: eterni." },
  { id: "cap-darna", cat: "capodanno", t: "Cena-spettacolo al Comptoir Darna", dove: "Marrakech, Hivernage", quando: "31 dic", prezzo: "€320", durata: "sera", follia: 2, tipo: "classico",
    desc: "3.500 dirham a testa da bere escluso, con musicisti, danzatrici e DJ. Cancellabile con rimborso fino al 24 dicembre.",
    joke: "Augusto ha calcolato il ROI di questa cena. Negativo. Ma «tranquilo, è un investimento»." },
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
    joke: "Davide proverà a vincere citando il codice civile. Augusto con la curva di domanda. Vincerà il venditore. Porra." },
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
    joke: "Alla fine vincerà il primo, perché avevate fame." }
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
  agadir: { n: "Aeroporto di Agadir", lat: 30.325, lng: -9.4131 }
};

C.ROUTES = {
  A: ["fes", "meknes", "volubilis", "rabat", "marrakech", "agafay", "marrakech", "tichka", "benhaddou", "dades", "todra", "merzouga", "ouarzazate", "taroudant", "imsouane", "taghazout", "agadir"],
  B: ["fes", "meknes", "volubilis", "rabat", "marrakech", "agafay", "marrakech", "tichka", "benhaddou", "ouarzazate", "dades", "todra", "mhamid", "ouarzazate", "taghazout", "imsouane", "taghazout", "agadir"],
  C: ["fes", "marrakech", "agafay", "marrakech", "benhaddou", "dades", "todra", "merzouga", "marrakech", "taghazout", "agadir"],
  D: ["fes", "marrakech", "merzouga", "marrakech", "taghazout", "agadir"]
};

C.SCEN = {
  A: { nome: "Auto e riad", costo: 1500, sub: "Massima libertà: valli, dune vere, due posti per il surf. Tanta guida dal 2 al 5.", joke: "Serve un autista con i nervi saldi e due passeggeri che tengono la bocca chiusa. Auguri." },
  B: { nome: "Auto e moto", costo: 2000, sub: "Tour in moto dal 3 al 5 con notte in bivacco. Serve almeno uno con patente A ed esperienza.", joke: "Il viaggio che racconterete ai nipoti. Lividi compresi, tossici." },
  C: { nome: "Treno e tour", costo: 1300, sub: "Nessuno guida: treno, tour organizzato nel deserto, surf camp.", joke: "Comodo come un pensionato in gita. Il minibus con dodici tedeschi è incluso." },
  D: { nome: "Zaino in spalla", costo: 950, sub: "Bus, ostelli, campo standard, due notti in bus.", joke: "Si risparmia tutto, tranne la dignità. Come in Erasmus, ma senza la scusa dei vent'anni." }
};

/* Giorno per giorno. ore = ore di guida stimate. att = id delle attività consigliate. */
C.DAYS = [
  { d: "2026-12-29", lab: "Mar 29 dic",
    A: { t: "Fes, la medina", dorme: "Riad a Fes", ore: 0, att: ["cit-fes", "cibo-bissara", "cit-merinidi", "cibo-pastilla", "sfida-noapp"], rischio: "Perdersi nella medina entro 11 minuti." } },
  { d: "2026-12-30", lab: "Mer 30 dic",
    A: { t: "Volubilis, Meknès, Rabat", dorme: "Rabat", ore: 3, att: ["cit-volubilis", "oc-rabat", "cit-oudayas"], rischio: "Fare surf il 30 dicembre e pentirsene per 4 secondi." },
    C: { t: "Treno per Marrakech", dorme: "Marrakech", ore: 0, att: [], rischio: "Sette ore di treno con le stesse due facce." } },
  { d: "2026-12-31", lab: "Gio 31 dic",
    A: { t: "Marrakech e Capodanno", dorme: "Hivernage, Marrakech", ore: 3.5, att: ["cap-club", "cap-agafay", "cap-darna", "cap-rooftop"], rischio: "Addormentarsi alle 23:58." },
    C: { t: "Marrakech e Capodanno", dorme: "Hivernage, Marrakech", ore: 0, att: ["cap-club", "cap-agafay", "cap-darna", "cap-rooftop"], rischio: "Addormentarsi alle 23:58." } },
  { d: "2027-01-01", lab: "Ven 1 gen",
    A: { t: "Recupero, poi Agafay", dorme: "Hivernage, Marrakech", ore: 1, att: ["moto-quad", "moto-agafay", "cibo-mechoui", "cit-majorelle", "mon-ourika"], rischio: "Ricordarsi cosa è successo ieri sera." } },
  { d: "2027-01-02", lab: "Sab 2 gen",
    A: { t: "Atlante, Aït Benhaddou, Dadès", dorme: "Kasbah nel Dadès", ore: 6, att: ["mon-tichka", "mon-benhaddou", "mon-dades"], rischio: "Neve al passo e un passeggero che chiede «quanto manca?» 40 volte." },
    B: { t: "Atlante e Aït Benhaddou", dorme: "Ouarzazate", ore: 4.5, att: ["mon-tichka", "mon-benhaddou"], rischio: "Guardare le moto in vetrina e cambiare idea su tutto." },
    C: { t: "Tour giorno 1: Aït Benhaddou e Dadès", dorme: "Dadès", ore: 0, att: ["mon-benhaddou", "mon-dades"], rischio: "Il minibus parte alle 7. Ripeto: alle 7." },
    D: { t: "Bus notturno per Merzouga", dorme: "sul bus", ore: 0, att: [], rischio: "Dormire seduti accanto a uno sconosciuto che russa." } },
  { d: "2027-01-03", lab: "Dom 3 gen",
    A: { t: "Todra e il deserto", dorme: "Campo nelle dune", ore: 4, att: ["mon-todra", "mon-arrampicata", "des-cammello", "des-campo", "des-stelle"], rischio: "Notte sotto zero e un sacco a pelo per due." },
    B: { t: "Moto giorno 1: gole del Dadès e del Todra", dorme: "Gite o kasbah", ore: 0, att: ["moto-tour3", "moto-pista", "mon-todra"], rischio: "La prima caduta. Statisticamente oggi." },
    C: { t: "Tour giorno 2: Todra e deserto", dorme: "Campo a Merzouga", ore: 0, att: ["mon-todra", "des-cammello", "des-campo"], rischio: "Il cammello di qualcuno sarà più alto degli altri. Gelosie." },
    D: { t: "Merzouga", dorme: "Campo standard", ore: 0, att: ["des-cammello", "des-campo", "des-stelle"], rischio: "Sabbia ovunque. Ovunque." } },
  { d: "2027-01-04", lab: "Lun 4 gen",
    A: { t: "Dune all'alba, enduro, Ouarzazate", dorme: "Ouarzazate", ore: 5, att: ["moto-dune", "des-sandboard", "moto-buggy"], rischio: "Svegliarsi alle 6 per l'alba e trovare le nuvole." },
    B: { t: "Moto giorno 2: piste del Draa", dorme: "Bivacco nel deserto", ore: 0, att: ["moto-tour3", "des-chigaga", "des-stelle"], rischio: "Bivacco a 90 km dalla strada. Nessuno torna indietro a prendere il caricatore." },
    C: { t: "Tour giorno 3: rientro a Marrakech", dorme: "Marrakech", ore: 0, att: [], rischio: "Nove ore di minibus. Playlist da preparare prima." },
    D: { t: "Dune, poi bus notturno", dorme: "sul bus", ore: 0, att: ["des-sandboard"], rischio: "Secondo bus notturno. La schiena presenta il conto." } },
  { d: "2027-01-05", lab: "Mar 5 gen",
    A: { t: "Taroudant e l'oceano", dorme: "Imsouane", ore: 6, att: ["cibo-pesce"], rischio: "La tappa più lunga. Chi guida sceglie la musica, gli altri subiscono." },
    B: { t: "Moto giorno 3: rientro a Ouarzazate", dorme: "Ouarzazate", ore: 0, att: ["moto-tour3"], rischio: "Restituire la moto e piangere un po'." },
    C: { t: "Bus per Taghazout", dorme: "Surf camp", ore: 0, att: ["oc-taghazout"], rischio: "Prima onda, primo bevuto." },
    D: { t: "Bus per Taghazout", dorme: "Ostello sul mare", ore: 0, att: ["oc-taghazout"], rischio: "Prima onda, primo bevuto." } },
  { d: "2027-01-06", lab: "Mer 6 gen",
    A: { t: "Surf a Imsouane", dorme: "Imsouane", ore: 0, att: ["oc-imsouane", "cibo-pesce"], rischio: "Stare in piedi sulla tavola per 2 secondi e raccontarne 20." },
    B: { t: "In auto verso l'oceano", dorme: "Taghazout o Tamraght", ore: 5, att: ["oc-tamraght"], rischio: "Arrivare al tramonto e voler entrare in acqua lo stesso." },
    C: { t: "Surf", dorme: "Surf camp", ore: 0, att: ["oc-taghazout", "oc-paradise"], rischio: "Scottarsi a gennaio. Sì, succede." } },
  { d: "2027-01-07", lab: "Gio 7 gen",
    A: { t: "Taghazout, ultima sera", dorme: "Taghazout o Tamraght", ore: 1.5, att: ["oc-taghazout", "oc-tamraght", "oc-paradise", "sfida-tagine"], rischio: "Promettere di tornare l'anno prossimo." },
    B: { t: "Surf, o gita a Imsouane", dorme: "Taghazout o Tamraght", ore: 0, att: ["oc-imsouane", "oc-paradise", "sfida-tagine"], rischio: "Promettere di tornare l'anno prossimo." } },
  { d: "2027-01-08", lab: "Ven 8 gen",
    A: { t: "Surf la mattina, volo la sera", dorme: "a casa", ore: 0.7, att: ["sfida-foto"], rischio: "Sabbia nel passaporto al controllo." } }
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
  { id: "causa", q: "Chi farà causa a un venditore del souk?" },
  { id: "businessplan", q: "Chi fa il business plan anche per un tè?" },
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
  ["Volo di ritorno da Agadir l'8/1 sera", "2026-11-10"],
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
