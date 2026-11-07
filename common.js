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
    return { persone: [], spese: [], reazioni: [], sondaggi: [], valigia: [], muro: [],
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
    const b = document.getElementById("upgrade");
    if (b) b.hidden = false;
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
    /* carica più tabelle; una tabella mancante torna [] e accende l'avviso */
    async many(tables) {
      const out = {};
      await Promise.all(tables.map(async (t) => {
        try { out[t] = await db.list(t); }
        catch (e) { out[t] = []; out._err = out._err || e; if (!isMissing(e)) out._down = true; }
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
  const FIXED = { Alessandro: "#2438C6", Augusto: "#0F8A68", Davide: "#E04C66" };
  function colorFor(name) { if (FIXED[name]) return FIXED[name]; let h = 7; for (const c of String(name)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return COLORS[h % COLORS.length]; }
  function initials(name) {
    const n = String(name || "?").trim(); const f = (n[0] || "?").toUpperCase();
    const crew = (window.C && C.CREW) || [];
    const clash = crew.some((o) => o !== n && (o[0] || "").toUpperCase() === f);
    return clash ? f + (n[1] || "").toLowerCase() : f;
  }
  function avatar(name, cls) { return el("span", { class: "av " + (cls || ""), style: "background:" + colorFor(name || "?"), title: name || "", text: initials(name) }); }
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
  function err(e) { console.error(e); toast(isMissing(e) ? "Questa parte va attivata: guarda l'avviso in alto." : "Non salvato. Controlla la connessione e riprova."); }

  /* ---------------- icone ---------------- */
  const P = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
    esplora: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    giro: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    crew: '<circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 20c.5-3.5 3-5.5 5.5-5.5S13 16.5 13.5 20M14 14.8c2.8-.4 6 1 7 5.2"/>',
    organizza: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8l1.5 1.5L12 7M8 13l1.5 1.5L12 12M8 18h.01M14 8h3M14 13h3M14 18h3"/>',
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
    box.append(avatar(me), el("span", { text: me }), el("button", { type: "button", onclick: askWho }, "Cambia"));
  }

  /* ---------------- barra in basso ---------------- */
  const NAV = [["index.html", "home", "Home"], ["esplora.html", "esplora", "Esplora"], ["giro.html", "giro", "Giro"], ["crew.html", "crew", "Crew"], ["organizza.html", "organizza", "Organizza"], ["kit.html", "kit", "Kit"]];
  function nav(active) {
    const ul = el("ul");
    NAV.forEach(([href, ic, lab]) => ul.appendChild(el("li", null, el("a", { href, "aria-current": ic === active ? "page" : null }, icon(ic), lab))));
    document.body.appendChild(el("nav", { class: "bottomnav", "aria-label": "Pagine" }, ul));
  }

  /* ---------------- decisione dello scenario ---------------- */
  const GROUP = 3;
  function decide(persone) {
    const COST = {}; Object.keys(C.SCEN).forEach((k) => (COST[k] = C.SCEN[k].costo));
    const budgets = persone.map((r) => Number(r.budget)).filter((n) => n > 0);
    const bmin = budgets.length ? Math.min(...budgets) : null;
    const riders = persone.filter((r) => r.patente === "si" && r.fuoristrada && r.fuoristrada !== "mai").length;
    const votes = { A: 0, B: 0, C: 0, D: 0 };
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

  /* ---------------- testata comune ---------------- */
  function start(active) {
    nav(active);
    renderMeChip();
    const up = document.getElementById("upgrade");
    if (up && !LIVE) { up.hidden = false; up.innerHTML = "<b>Modalità prova</b>I dati restano solo su questo dispositivo finché il sito non è collegato al database."; }
    if (!me) setTimeout(askWho, 300);
    if (window.R) R.mountHelp(active || "home");
    // «ultimo avvistamento»: se la colonna manca si ignora in silenzio, senza avviso
    if (me && LIVE) sb.from("persone").update({ visto: new Date().toISOString() }).eq("nome", me).then(() => {}, () => {});
  }
  function roast(kind) { toast(window.R ? R.react(kind) : "Fatto."); }

  return { db, el, avatar, colorFor, eur, eur2, fmtDate, todayStr, daysBetween, ago, toast, roast, err, icon, nav, start, decide, GROUP,
    me: () => me, onMe: (f) => meListeners.push(f), askWho, store, isMissing };
})();
