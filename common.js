/* Parti condivise da tutte le pagine: database, identità, barra in basso, icone, utilità. */
window.M = (function () {
  "use strict";
  const cfg = window.MAROCCO_CONFIG || {};
  const LIVE = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------------- database ---------------- */
  const BASE_COLS = {
    persone: ["nome", "patente", "fuoristrada", "budget", "scenario", "aggiornato"],
    spese: ["descrizione", "importo", "pagato_da", "creato"]
  };
  let sb = null;
  if (LIVE) sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

  const DEMO_KEY = "marocco_demo_v2";
  function demoRead() {
    const raw = store.get(DEMO_KEY);
    if (raw) { try { return JSON.parse(raw); } catch (e) {} }
    return { persone: [], spese: [], reazioni: [], sondaggi: [], valigia: [], muro: [], proposte: [], documenti: [], files: {},
      todo: (window.C ? C.SEED_TODO : []).map(([titolo, entro], i) => ({ id: "t" + (i + 1), titolo, entro, ordine: i + 1, fatto: false, chi: null })) };
  }
  let demo = LIVE ? null : demoRead();
  const demoSave = () => store.set(DEMO_KEY, JSON.stringify(demo));
  const uid = () => "x" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const matches = (row, m) => Object.keys(m).every((k) => row[k] === m[k]);
  const listeners = [];
  const fireLocal = () => { demoSave(); listeners.forEach((f) => f()); };

  function isMissing(err) {
    if (!err) return false;
    const msg = String(err.message || "") + " " + String(err.details || "") + " " + String(err.hint || "");
    return err.code === "42P01" || err.code === "PGRST205" || err.code === "42703" || err.code === "PGRST204" || /does not exist|Could not find|schema cache/i.test(msg);
  }
  let missingShown = false;
  function needUpgrade() {
    if (missingShown) return; missingShown = true;
    let b = document.getElementById("upgrade");
    if (me !== "Alessandro") { if (b) b.hidden = true; return; }   // gli altri non devono vederlo
    if (!b) { b = el("div", { id: "upgrade", class: "banner" }); const m = document.querySelector("main"); if (m) m.prepend(b); }
    b.hidden = false; b.className = "banner fixdb"; b.textContent = "";
    const copy = el("button", { type: "button", class: "btn small" }, "1. Copia il codice");
    let sql = null; fetch("schema_v3.sql", { cache: "no-store" }).then((r) => r.text()).then((t) => (sql = t)).catch(() => {});
    const box = el("textarea", { class: "fixdb-sql", readonly: "readonly", rows: "5", "aria-label": "Codice da copiare", hidden: true });
    copy.addEventListener("click", () => {
      const manual = () => { box.value = sql || "Il codice non si è caricato. Ricarica la pagina."; box.hidden = false; box.focus(); box.select(); box.setSelectionRange(0, 999999); copy.textContent = "Tieni premuto qui sotto → Seleziona tutto → Copia"; };
      if (!sql || !navigator.clipboard) return manual();
      navigator.clipboard.writeText(sql).then(() => { copy.textContent = "Copiato ✓"; }, manual);
    });
    b.append(
      el("b", { text: "Solo per te, Ale: manca un pezzo del database" }),
      el("p", { text: "Documenti, profili e proposte non si salvano finché non lo attivi. Gli altri non vedono questo avviso. Sono 3 minuti:" }),
      el("ol", null, el("li", null, copy, box), el("li", null, el("a", { class: "btn small", href: "https://supabase.com/dashboard/project/dssjsegjucnzvqlmcaaa/sql/new", target: "_blank", rel: "noopener" }, "2. Apri Supabase")), el("li", { text: "3. Nella pagina di Supabase tocca il riquadro vuoto, incolla e premi Run. Deve comparire «Success». Poi ricarica il sito." })));
  }
  function chk(r) { if (r.error) { if (isMissing(r.error)) needUpgrade(); throw r.error; } return r.data; }

  const db = {
    live: LIVE,
    async list(table) {
      if (!LIVE) return JSON.parse(JSON.stringify(demo[table] || []));
      return chk(await sb.from(table).select("*"));
    },
    async upsert(table, row, conflict) {
      if (!LIVE) {
        const keys = conflict.split(",");
        const m = {}; keys.forEach((k) => (m[k] = row[k]));
        demo[table] = (demo[table] || []).filter((r) => !matches(r, m)).concat([Object.assign({}, row)]);
        return fireLocal();
      }
      const r = await sb.from(table).upsert(row, { onConflict: conflict });
      if (r.error && isMissing(r.error) && BASE_COLS[table]) {
        const slim = {}; BASE_COLS[table].forEach((k) => { if (k in row) slim[k] = row[k]; });
        needUpgrade();
        return chk(await sb.from(table).upsert(slim, { onConflict: conflict }));
      }
      return chk(r);
    },
    async insert(table, row) {
      if (!LIVE) { demo[table] = (demo[table] || []).concat([Object.assign({ id: uid(), creato: new Date().toISOString() }, row)]); return fireLocal(); }
      const r = await sb.from(table).insert(row);
      if (r.error && isMissing(r.error) && BASE_COLS[table]) {
        const slim = {}; BASE_COLS[table].forEach((k) => { if (k in row) slim[k] = row[k]; });
        needUpgrade();
        return chk(await sb.from(table).insert(slim));
      }
      return chk(r);
    },
    async update(table, match, patch) {
      if (!LIVE) { demo[table] = (demo[table] || []).map((r) => (matches(r, match) ? Object.assign({}, r, patch) : r)); return fireLocal(); }
      let q = sb.from(table).update(patch);
      Object.keys(match).forEach((k) => (q = q.eq(k, match[k])));
      return chk(await q);
    },
    async remove(table, match) {
      if (!LIVE) { demo[table] = (demo[table] || []).filter((r) => !matches(r, match)); return fireLocal(); }
      let q = sb.from(table).delete();
      Object.keys(match).forEach((k) => (q = q.eq(k, match[k])));
      return chk(await q);
    },
    /* i file dei documenti: nello spazio «documenti» di Supabase; in prova restano sul telefono */
    async upload(path, file) {
      if (!LIVE) {
        if (file.size > 1.5e6) throw new Error("In prova si caricano solo file sotto 1,5 MB.");
        const url = await new Promise((ok, ko) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = ko; r.readAsDataURL(file); });
        demo.files = demo.files || {}; demo.files[path] = url; demoSave(); return path;
      }
      const r = await sb.storage.from("documenti").upload(path, file, { contentType: file.type || "application/octet-stream", upsert: false });
      if (r.error) throw r.error; return path;
    },
    fileUrl(path) {
      if (!LIVE) return (demo.files || {})[path] || "#";
      return sb.storage.from("documenti").getPublicUrl(path).data.publicUrl;
    },
    async removeFile(path) {
      if (!LIVE) { if (demo.files) delete demo.files[path]; demoSave(); return; }
      const r = await sb.storage.from("documenti").remove([path]); if (r.error) throw r.error;
    },
    /* carica più tabelle; una tabella mancante torna [] e accende l'avviso */
    async many(tables) {
      const out = {};
      await Promise.all(tables.map(async (t) => {
        try { out[t] = await db.list(t); }
        catch (e) { out[t] = []; out._err = out._err || e; if (!isMissing(e)) out._down = true; else (out._miss = out._miss || []).push(t); }
      }));
      return out;
    },
    subscribe(tables, cb) {
      let timer = null;
      const go = () => { clearTimeout(timer); timer = setTimeout(cb, 250); };
      if (!LIVE) { listeners.push(go); window.addEventListener("storage", (e) => { if (e.key === DEMO_KEY) { demo = demoRead(); go(); } }); return; }
      const ch = sb.channel("m-" + tables.join("-"));
      tables.forEach((t) => ch.on("postgres_changes", { event: "*", schema: "public", table: t }, go));
      ch.subscribe();
      document.addEventListener("visibilitychange", () => { if (!document.hidden) go(); });
    }
  };

  /* ---------------- utilità ---------------- */
  function el(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === "class") e.className = v;
      else if (k === "text") e.textContent = v;
      else if (k === "html") e.innerHTML = v;
      else if (k === "style") e.setAttribute("style", v);
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? "" : v);
    }
    kids.flat().forEach((c) => { if (c === null || c === undefined || c === false) return; e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  const COLORS = ["#2438C6", "#0F8A68", "#E04C66", "#8B3FD9", "#E08A00", "#1683D1", "#C2471B"];
  const FIXED = { Alessandro: "#FF7A45", Augusto: "#0F8A68", Davide: "#E04C66" };
  function colorFor(name) { if (FIXED[name]) return FIXED[name]; let h = 7; for (const c of String(name)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return COLORS[h % COLORS.length]; }
  function initials(name) {
    const n = String(name || "?").trim(); const f = (n[0] || "?").toUpperCase();
    const crew = (window.C && C.CREW) || [];
    const clash = crew.some((o) => o !== n && (o[0] || "").toUpperCase() === f);
    return clash ? f + (n[1] || "").toLowerCase() : f;
  }
  let PROF = {}; try { PROF = JSON.parse(store.get("marocco_profili") || "{}"); } catch (e) { PROF = {}; }
  function setProfiles(rows) {
    const p = {}; (rows || []).forEach((r) => { if (r && r.nome) p[r.nome] = { colore: r.colore || null, emoji: r.emoji || null, soprannome: r.soprannome || null, tormentone: r.tormentone || null }; });
    PROF = p; store.set("marocco_profili", JSON.stringify(p));
  }
  function avatar(name, cls) {
    const pr = PROF[name] || {};
    return el("span", { class: "av " + (cls || "") + (pr.emoji ? " av-emo" : ""), style: "background:" + (pr.colore || colorFor(name || "?")), title: name || "", text: pr.emoji || initials(name) });
  }
  const eur = (n) => "€" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const eur2 = (n) => { const neg = n < 0; const [i, d] = Math.abs(n).toFixed(2).split("."); return (neg ? "-" : "") + "€" + i.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + d; };
  const MESI = ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"];
  function fmtDate(s) { if (!s) return ""; const p = String(s).slice(0, 10).split("-").map(Number); return p[2] + " " + MESI[p[1] - 1]; }
  function todayStr() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function daysBetween(a, b) { return Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 86400000); }
  function ago(iso) {
    if (!iso) return ""; const s = (Date.now() - new Date(iso).getTime()) / 1000;
    if (s < 60) return "adesso"; if (s < 3600) return Math.floor(s / 60) + " min fa"; if (s < 86400) return Math.floor(s / 3600) + " ore fa";
    const d = Math.floor(s / 86400); return d === 1 ? "ieri" : d + " giorni fa";
  }
  let toastT = null;
  function toast(msg) {
    let t = document.getElementById("toast");
    if (!t) { t = el("div", { id: "toast", class: "toast", role: "status" }); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => (t.hidden = true), 2600);
  }
  function err(e) { console.error(e); toast(isMissing(e) || /bucket/i.test(String(e && e.message)) ? (me === "Alessandro" ? "Questa parte va attivata: guarda l'avviso in alto." : "Questa parte la deve ancora attivare Ale. Diteglielo, e chiamate Davide.") : "Non salvato. Controlla la connessione e riprova."); }

  /* ---------------- icone ---------------- */
  const P = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    esplora: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    viaggio: '<circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="6" r="2.2"/><path d="M7 17c5-1 2-6 6-7s3-3 4-3" stroke-dasharray="2.5 2.5"/>',
    must: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    mappa: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    scenari: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    giro: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    crew: '<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 20c.5-3.5 3-5.5 5.5-5.5S13 16.5 13.5 20M14 14.8c2.8-.4 6 1 7 5.2"/>',
    organizza: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l1.5 1.5L12 7M8 13l1.5 1.5L12 12M8 18h.01M14 8h3M14 13h3M14 18h3"/>',
    notte: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/><path d="M16 3.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z"/>',
    ruota: '<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4"/>',
    vota: '<path d="M12 3c1 3 4 4.5 4 8.5A4 4 0 0 1 8 11.5c0-1.6.7-2.7 1.6-3.6.2 1.4 1 2.1 1.8 2.3C11 7.7 11.2 5.2 12 3z"/><path d="M6 15.5A6 6 0 0 0 18 15.5"/>',
    sifa: '<path d="M4 12.5l5 5L20 6.5"/>',
    budget: '<circle cx="9" cy="9" r="5"/><path d="M14.5 7.4A5 5 0 1 1 9.6 14.9"/><path d="M9 7v4M7.5 9h3"/>',
    kit: '<path d="M6 8a6 6 0 0 1 12 0v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"/><path d="M9 8V6a3 3 0 0 1 6 0v2M9 14h6M9 21v-4h6v4"/>',
    muro: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    capodanno: '<path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5L19 19M19 5l-3.5 3.5M8.5 15.5L5 19"/><circle cx="12" cy="12" r="2"/>',
    moto: '<circle cx="5.5" cy="16.5" r="3.5"/><circle cx="18.5" cy="16.5" r="3.5"/><path d="M5.5 16.5L9 10h5l3 6.5M14 10l-1.5-4H16M9 10l3 6.5h2"/>',
    deserto: '<circle cx="16" cy="7" r="3"/><path d="M2 19c3-4 6-6 10-6s7 2 10 6M2 21h20"/>',
    montagna: '<path d="M2 20l7-12 4 6 3-4 6 10z"/><path d="M7.5 10.5L9 8l1.5 2.5"/>',
    oceano: '<path d="M2 15c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 19c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M7 10c0-3.5 3-6 7-6-2 1.5-3 3.5-3 6"/>',
    citta: '<path d="M5 21V10a7 7 0 0 1 14 0v11"/><path d="M9 21v-7a3 3 0 0 1 6 0v7M3 21h18"/>',
    cibo: '<path d="M4 17h16M6 17a6 6 0 0 1 12 0M12 5v6M10 5h4M3 20h18"/>',
    sfide: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4"/>'
  };
  function icon(name, cls) {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("fill", "none"); s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "1.8"); s.setAttribute("stroke-linecap", "round"); s.setAttribute("stroke-linejoin", "round");
    s.setAttribute("aria-hidden", "true"); if (cls) s.setAttribute("class", cls);
    s.innerHTML = P[name] || ""; return s;
  }

  /* ---------------- identità ---------------- */
  let me = store.get("marocco_nome") || "";
  const meListeners = [];
  function setMe(n) { me = String(n || "").trim().slice(0, 30); if (!me) return; store.set("marocco_nome", me); renderMeChip(); meListeners.forEach((f) => f(me)); }
  async function askWho() {
    let names = [];
    try { names = (await db.list("persone")).map((p) => p.nome); } catch (e) {}
    names = [...new Set((window.C && C.CREW ? C.CREW : []).concat(names))];
    const ov = el("div", { class: "overlay", role: "dialog", "aria-modal": "true", "aria-labelledby": "who-h" });
    const input = el("input", { type: "text", id: "who-name", maxlength: "30", autocomplete: "given-name", value: me });
    const form = el("form", { class: "card" },
      el("span", { class: "sticker" }, "Controllo passaporti"),
      el("h2", { id: "who-h", text: "Chi sei?" }),
      el("p", { class: "muted", text: "Tocca il tuo nome. Questo telefono se lo ricorda. Se fai il furbo e ti spacci per un altro, il sito se ne accorge." }),
      names.length ? el("div", { class: "chips" }, names.map((n) => el("button", { type: "button", class: "chip", onclick: () => { setMe(n); ov.remove(); } }, avatar(n), n))) : null,
      el("details", null, el("summary", { class: "muted", style: "cursor:pointer;font-size:14px", text: "Non sono nessuno dei tre" }),
        el("div", { class: "field", style: "margin-top:8px" }, el("label", { for: "who-name", text: "Il tuo nome" }), input)),
      el("button", { class: "btn", type: "submit" }, "Entra")
    );
    form.addEventListener("submit", (e) => { e.preventDefault(); if (input.value.trim()) { setMe(input.value); ov.remove(); } });
    ov.appendChild(form); document.body.appendChild(ov);
    setTimeout(() => input.focus(), 60);
  }
  function renderMeChip() {
    const box = document.getElementById("me-chip"); if (!box) return;
    box.textContent = "";
    if (!me) { box.appendChild(el("button", { type: "button", onclick: askWho }, "Chi sei?")); return; }
    box.append(el("a", { href: "profilo.html", class: "me-link", title: "Il tuo profilo" }, avatar(me), el("span", { text: me })), el("button", { type: "button", onclick: askWho }, "Cambia"));
  }

  /* ---------------- barra in basso ---------------- */
  const NAV = [["index.html", "home", "Home"], ["viaggio.html", "viaggio", "Viaggio"], ["must.html", "must", "Must"], ["mappa.html", "mappa", "Mappa"], ["notte.html", "notte", "Notte"], ["kit.html", "kit", "Kit"]];
  function nav(active) {
    const ul = el("ul");
    NAV.forEach(([href, ic, lab]) => ul.appendChild(el("li", null, el("a", { href, "aria-current": ic === active ? "page" : null }, icon(ic), lab))));
    document.body.appendChild(el("nav", { class: "bottomnav", "aria-label": "Pagine" }, ul));
  }

  /* ---------------- domande veloci ---------------- */
  function answerOf(q, d, who) {
    who = who || me; if (!who) return null;
    if (q.k === "att") { const r = (d.reazioni || []).find((x) => x.nome === who && x.attivita === q.id); return r ? r.voto : null; }
    const r = (d.sondaggi || []).find((x) => x.nome === who && x.domanda === "q-" + q.id); return r ? r.scelta : null;
  }
  async function answer(q, v) {
    if (!me) return askWho();
    if (q.k === "att") await db.upsert("reazioni", { nome: me, attivita: q.id, voto: v, aggiornato: new Date().toISOString() }, "nome,attivita");
    else await db.upsert("sondaggi", { nome: me, domanda: "q-" + q.id, scelta: v }, "nome,domanda");
  }

  /* ---------------- decisione dello scenario ---------------- */
  const GROUP = 3;
  function decide(persone) {
    const COST = {}; Object.keys(C.SCEN).forEach((k) => (COST[k] = C.SCEN[k].costo));
    const budgets = persone.map((r) => Number(r.budget)).filter((n) => n > 0);
    const bmin = budgets.length ? Math.min(...budgets) : null;
    const riders = persone.filter((r) => r.patente === "si" && r.fuoristrada && r.fuoristrada !== "mai").length;
    const votes = {}; Object.keys(C.SCEN).forEach((k) => (votes[k] = 0));
    persone.forEach((r) => { if (votes[r.scenario] !== undefined) votes[r.scenario]++; });
    const maxV = Math.max(...Object.values(votes));
    const top = maxV > 0 ? Object.keys(votes).filter((k) => votes[k] === maxV) : [];
    let possible = Object.keys(COST).filter((k) => bmin === null || COST[k] <= bmin);
    if (riders < 1) possible = possible.filter((k) => k !== "B");
    const res = { n: persone.length, bmin, riders, votes, top, pick: null, why: [] };
    if (!persone.length) return res;
    if (!possible.length) { res.pick = "D"; res.why.push("il budget più basso (" + eur(bmin) + ") non basta per nessuno scenario: D è il più vicino"); return res; }
    possible.sort((a, b) => (votes[b] - votes[a]) || (COST[b] - COST[a]));
    res.pick = possible[0];
    res.why.push(votes[res.pick] + " " + (votes[res.pick] === 1 ? "voto" : "voti") + " su " + persone.length);
    if (bmin) res.why.push("rientra nel budget più basso (" + eur(bmin) + ")");
    top.filter((k) => k !== res.pick && !possible.includes(k)).forEach((k) =>
      res.why.push(k === "B" && riders < 1 ? "B è il più votato ma nessuno ha patente A con esperienza in fuoristrada" : k + " è il più votato ma supera il budget più basso"));
    const miss = GROUP - persone.length;
    if (miss > 0) res.why.push(miss === 1 ? "manca ancora una risposta" : "mancano ancora " + miss + " risposte");
    return res;
  }

  /* ---------------- comparsa delle sezioni, come su apple.com ---------------- */
  const SEL = "main.wrap > *, .lsec, .catblock, .scard, .tl, .place, .tile, .erow, .post";
  let io = null;
  function revealScan(root, first) {
    if (!("IntersectionObserver" in window) || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    if (!io) io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    const vh = window.innerHeight;
    (root || document).querySelectorAll(SEL).forEach((n) => {
      if (n.dataset.rv) return; n.dataset.rv = "1";
      if (n.closest(".overlay,.loader,.bottomnav")) return;
      const top = n.getBoundingClientRect().top;
      if (top < vh * 0.92 && !first) return;   // già sullo schermo dopo un aggiornamento: niente animazione
      if (top < vh * 0.92) return;              // già visibile all'apertura: resta fermo
      n.classList.add("rv"); io.observe(n);
    });
  }
  function reveal() {
    revealScan(document, true);
    let t = null;
    const mo = new MutationObserver(() => { clearTimeout(t); t = setTimeout(() => revealScan(document, false), 60); });
    const main = document.querySelector("main"); if (main) mo.observe(main, { childList: true, subtree: true });
  }

  /* ---------------- notifiche finte, come quelle del telefono ---------------- */
  /* n = { ic: emoji, chi: nome per l'avatar, app, t: titolo, x: testo, href } */
  function ntfNode(n, live) {
    const ic = n.chi ? avatar(n.chi, "ic") : el("span", { class: "ic", style: n.col ? "background:" + n.col : null, text: n.ic || "🐪" });
    return el(n.href ? "a" : "div", { class: "ntf", href: n.href || null, role: live ? "status" : null },
      ic, el("div", null, el("div", { class: "hd" }, el("span", { text: n.app || "Marocco in tre" }), el("span", { text: n.quando || "ora" })), el("b", { text: n.t }), el("p", { text: n.x })));
  }
  let ntfT = null;
  function notify(n) {
    if (document.getElementById("intro") || document.querySelector(".overlay")) return false;
    const old = document.getElementById("ntf-live"); if (old) old.remove();
    const node = ntfNode(n, true); node.id = "ntf-live";
    let y0 = null;
    node.addEventListener("touchstart", (e) => { y0 = e.touches[0].clientY; }, { passive: true });
    node.addEventListener("touchmove", (e) => { if (y0 !== null && e.touches[0].clientY - y0 < -25) hide(); }, { passive: true });
    function hide() { node.classList.add("out"); setTimeout(() => node.remove(), 400); }
    document.body.appendChild(node);
    requestAnimationFrame(() => requestAnimationFrame(() => node.classList.add("in")));
    clearTimeout(ntfT); ntfT = setTimeout(hide, 6500);
    return true;
  }
  /* il popup al centro, con due risposte: chi risponde si becca la battuta */
  function popup(n) {
    if (document.getElementById("intro") || document.querySelector(".overlay,.pop-dim")) return false;
    const ic = n.chi ? avatar(n.chi, "pop-av") : el("span", { class: "pop-ic", style: n.col ? "background:" + n.col : null, text: n.ic || "🐪" });
    const dim = el("div", { class: "pop-dim", role: "dialog", "aria-modal": "true", "aria-label": n.t });
    const card = el("div", { class: "pop" },
      el("div", { class: "pop-bd" }, ic, el("span", { class: "pop-app", text: n.app || "Marocco in tre" }), el("b", { text: n.t }), el("p", { text: n.x })),
      el("div", { class: "pop-bt" }, n.a.map((lab, i) => el("button", { type: "button", onclick: () => {
        dim.classList.add("out"); setTimeout(() => dim.remove(), 250);
        if (n.on) n.on(i);
        const r = n.r && n.r[i]; if (r) setTimeout(() => notify({ ic: n.ic || "🐪", chi: n.chi, col: n.col, app: n.app, t: n.t, x: r, href: n.href }), 350);
      } }, lab))));
    dim.appendChild(card); document.body.appendChild(dim);
    requestAnimationFrame(() => dim.classList.add("in"));
    return true;
  }

  /* ogni tanto ne arriva una: la prima dopo 5 secondi, poi una ogni 60-90 secondi, al massimo 2 per pagina */
  function ntfLoop(page) {
    if (!window.R || !R.notifs) return;
    /* poche: al massimo una notifica ogni 5 minuti e un popup ogni 20, contando tutte le pagine */
    let data = null;
    const ss = { get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };
    const since = (k) => Date.now() - Number(ss.get(k) || 0);
    async function load() { if (!data) { try { data = await db.many(["persone", "reazioni", "todo", "valigia", "sondaggi", "spese", "muro"]); } catch (e) { data = {}; } } return data; }
    async function next() {
      if (document.hidden || window.INTRO_ACTIVE) return setTimeout(next, 4000);
      if (since("marocco_ntf_t") < 5 * 60000) return;
      await load();
      const pool = R.notifs(data, page, me);
      let k = Number(ss.get("marocco_ntf_i") || 0);
      const n = k === 0 ? pool[0] : pool[1 + ((k - 1) % (pool.length - 1))];
      if (notify(n)) { ss.set("marocco_ntf_i", String(k + 1)); ss.set("marocco_ntf_t", String(Date.now())); }
    }
    async function pop() {
      if (page === "home" || !me || !C.DOMANDE) return;
      if (document.hidden || window.INTRO_ACTIVE || document.getElementById("ntf-live")) return setTimeout(pop, 5000);
      if (since("marocco_pop_t") < 20 * 60000) return;
      await load();
      const q = C.DOMANDE.find((x) => !answerOf(x, data));
      if (!q) return;
      const n = { ic: q.tag.split(" ")[0], app: "Domanda veloce", t: q.t, x: q.x, a: ["No", "Sì"],
        on: (i) => answer(q, i ? "si" : "no").then(() => toast(i ? "Segnato: sì. 🔥" : "Segnato: no. 💀")).catch(err) };
      if (popup(n)) ss.set("marocco_pop_t", String(Date.now())); else setTimeout(pop, 8000);
    }
    setTimeout(next, 6000);
    setTimeout(pop, 50000 + Math.random() * 20000);
  }

  /* ---------------- testata comune ---------------- */
  function entrance() {
    let seen = null; try { seen = sessionStorage.getItem("marocco_entrata_v8"); } catch (e) { seen = "1"; }
    if (seen && !/[?&]intro\b/.test(location.search)) return;
    window.INTRO_ACTIVE = true;
    const go = () => { if (window.Intro) Intro.show(); else window.INTRO_ACTIVE = false; };
    if (window.Intro) return go();
    const sc = document.createElement("script"); sc.src = "intro.js"; sc.onload = go; sc.onerror = () => { window.INTRO_ACTIVE = false; };
    document.head.appendChild(sc);
  }
  function start(active) {
    entrance();
    nav(active);
    renderMeChip();
    const up = document.getElementById("upgrade");
    if (up && !LIVE) { up.hidden = false; up.innerHTML = "<b>Modalità prova</b>I dati restano solo su questo dispositivo finché il sito non è collegato al database."; }
    if (!me && !window.INTRO_ACTIVE) setTimeout(askWho, 300);
    if (window.R) R.mountHelp(active || "home");
    setTimeout(reveal, 30);
    ntfLoop(active || "home");
    db.list("persone").then((rows) => { const before = JSON.stringify(PROF); setProfiles(rows); if (JSON.stringify(PROF) !== before) renderMeChip(); }, () => {});
    // «ultimo avvistamento»: se la colonna manca si ignora in silenzio, senza avviso
    if (me && LIVE) sb.from("persone").update({ visto: new Date().toISOString() }).eq("nome", me).then(() => {}, () => {});
  }
  function roast(kind) { toast(window.R ? R.react(kind) : "Fatto."); }

  return { setProfiles, profile: (n) => PROF[n] || {}, notify, popup, answer, answerOf, ntfNode, db, el, avatar, colorFor, eur, eur2, fmtDate, todayStr, daysBetween, ago, toast, roast, err, icon, nav, start, decide, GROUP,
    me: () => me, setMe, onMe: (f) => meListeners.push(f), askWho, store, isMissing };
})();
