(function () {
  "use strict";

  const COST = { A: 1500, B: 2000, C: 1300, D: 950 };
  const NAMES = { A: "A · Auto e riad", B: "B · Auto e moto", C: "C · Treno e tour", D: "D · Zaino in spalla" };
  const GROUP = 3;
  const COLORS = ["#2B43C4", "#167055", "#B97A06", "#8E3B9E", "#C2410C", "#0E7490"];
  const SEED = [
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

  const $ = (id) => document.getElementById(id);
  const eur = (n) => "€" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const eur2 = (n) => "€" + n.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- dati: Supabase se configurato, altrimenti modalità prova ---------- */
  const cfg = window.MAROCCO_CONFIG || {};
  const LIVE = !!(cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY && window.supabase);

  function supaLayer() {
    const sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
    const check = (r) => { if (r.error) throw r.error; return r.data; };
    return {
      async load() {
        const [p, t, s] = await Promise.all([
          sb.from("persone").select("*"),
          sb.from("todo").select("*"),
          sb.from("spese").select("*")
        ]);
        return { persone: check(p), todo: check(t), spese: check(s) };
      },
      savePersona: async (o) => check(await sb.from("persone").upsert(o, { onConflict: "nome" })),
      updateTodo: async (id, patch) => check(await sb.from("todo").update(patch).eq("id", id)),
      addTodo: async (o) => check(await sb.from("todo").insert(o)),
      addSpesa: async (o) => check(await sb.from("spese").insert(o)),
      deleteSpesa: async (id) => check(await sb.from("spese").delete().eq("id", id)),
      onChange(cb) {
        sb.channel("marocco")
          .on("postgres_changes", { event: "*", schema: "public", table: "persone" }, cb)
          .on("postgres_changes", { event: "*", schema: "public", table: "todo" }, cb)
          .on("postgres_changes", { event: "*", schema: "public", table: "spese" }, cb)
          .subscribe();
        // rete di sicurezza: ricarica quando si torna sulla pagina
        document.addEventListener("visibilitychange", () => { if (!document.hidden) cb(); });
      }
    };
  }

  function demoLayer() {
    const KEY = "marocco_demo_v1";
    const read = () => {
      const raw = store.get(KEY);
      if (raw) { try { return JSON.parse(raw); } catch (e) {} }
      return {
        persone: [],
        todo: SEED.map(([titolo, entro], i) => ({ id: "t" + (i + 1), titolo, entro, ordine: i + 1, fatto: false, chi: null })),
        spese: []
      };
    };
    let db = read();
    const save = () => store.set(KEY, JSON.stringify(db));
    let listener = null;
    const fire = () => { save(); if (listener) listener(); };
    const uid = () => "x" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    return {
      async load() { return JSON.parse(JSON.stringify(db)); },
      async savePersona(o) { db.persone = db.persone.filter((p) => p.nome !== o.nome).concat([o]); fire(); },
      async updateTodo(id, patch) { db.todo = db.todo.map((t) => (t.id === id ? Object.assign({}, t, patch) : t)); fire(); },
      async addTodo(o) { db.todo.push(Object.assign({ id: uid() }, o)); fire(); },
      async addSpesa(o) { db.spese.push(Object.assign({ id: uid(), creato: new Date().toISOString() }, o)); fire(); },
      async deleteSpesa(id) { db.spese = db.spese.filter((s) => s.id !== id); fire(); },
      onChange(cb) { listener = cb; }
    };
  }

  const Data = LIVE ? supaLayer() : demoLayer();
  const S = { me: store.get("marocco_nome") || "", persone: [], todo: [], spese: [], loaded: false };

  function setStatus(msg) { const el = $("conn"); el.textContent = msg || ""; el.hidden = !msg; }

  /* ---------- utilità ---------- */
  function colorFor(name) { let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0; return COLORS[h % COLORS.length]; }
  function participants() {
    const set = new Set(S.persone.map((p) => p.nome));
    S.spese.forEach((s) => s.pagato_da && set.add(s.pagato_da));
    if (S.me) set.add(S.me);
    return [...set];
  }
  function todayStr() { const d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function fmtDate(s) { if (!s) return ""; const [, m, d] = String(s).slice(0, 10).split("-").map(Number); return d + " " + ["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic"][m - 1]; }
  function el(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }

  /* ---------- conto alla rovescia ---------- */
  const dep = new Date(2026, 11, 28, 23, 0, 0);
  $("cd-days").textContent = String(Math.max(0, Math.ceil((dep - new Date()) / 86400000)));

  /* ---------- chi sei ---------- */
  function showWho() {
    const list = $("who-list"); list.textContent = "";
    S.persone.map((p) => p.nome).forEach((n) => {
      const b = el("button", "btn ghost small", n); b.type = "button";
      b.addEventListener("click", () => setMe(n)); list.appendChild(b);
    });
    $("who-name").value = S.me || "";
    $("who").hidden = false;
    setTimeout(() => $("who-name").focus(), 50);
  }
  function setMe(n) {
    S.me = n.trim().slice(0, 30);
    if (!S.me) return;
    store.set("marocco_nome", S.me);
    $("who").hidden = true;
    renderMe(); fillForm(); render();
  }
  function renderMe() {
    $("me-chip").hidden = !S.me;
    $("me-name").textContent = S.me ? "Ciao, " + S.me : "";
  }
  $("f-who").addEventListener("submit", (e) => { e.preventDefault(); setMe($("who-name").value); });
  $("me-change").addEventListener("click", showWho);

  /* ---------- render ---------- */
  function render() { renderDecision(); renderTodo(); renderSpese(); }

  function fillForm() {
    const r = S.persone.find((p) => p.nome === S.me);
    if (!r) return;
    if (document.activeElement && document.activeElement.closest && document.activeElement.closest("#f-risp")) return;
    $("r-budget").value = r.budget || "";
    const pick = (name, val) => { const x = document.querySelector('#f-risp input[name="' + name + '"][value="' + val + '"]'); if (x) x.checked = true; };
    if (r.patente) pick("patente", r.patente);
    if (r.fuoristrada) pick("fuori", r.fuoristrada);
    if (r.scenario) pick("scen", r.scenario);
  }

  function renderDecision() {
    const list = S.persone;
    $("k-n").textContent = list.length + "/" + GROUP;
    const budgets = list.map((r) => Number(r.budget)).filter((n) => n > 0);
    const bmin = budgets.length ? Math.min(...budgets) : null;
    $("k-budget").textContent = bmin ? eur(bmin) : "—";
    const riders = list.filter((r) => r.patente === "si" && r.fuoristrada && r.fuoristrada !== "mai").length;
    $("k-riders").textContent = String(riders);
    const votes = { A: 0, B: 0, C: 0, D: 0 };
    list.forEach((r) => { if (votes[r.scenario] !== undefined) votes[r.scenario]++; });
    const maxV = Math.max(...Object.values(votes));
    const top = maxV > 0 ? Object.keys(votes).filter((k) => votes[k] === maxV) : [];
    $("k-top").textContent = top.length ? top.join(" = ") : "—";

    const ul = $("people"); ul.textContent = "";
    if (!list.length) ul.appendChild(el("li", "empty", "Nessuna risposta ancora."));
    list.slice().sort((a, b) => a.nome.localeCompare(b.nome)).forEach((r) => {
      const li = el("li");
      const av = el("div", "avatar", (r.nome[0] || "?").toUpperCase()); av.style.background = colorFor(r.nome); li.appendChild(av);
      const mid = el("div"); mid.style.minWidth = "0";
      mid.appendChild(el("div", "who", r.nome + (r.nome === S.me ? " (tu)" : "")));
      const fs = { mai: "mai fuoristrada", poco: "un po' di fuoristrada", si: "fuoristrada spesso" }[r.fuoristrada] || "fuoristrada ?";
      mid.appendChild(el("div", "meta", "Patente A: " + (r.patente === "si" ? "sì" : r.patente === "no" ? "no" : "?") + " · " + fs + " · budget " + (r.budget ? eur(Number(r.budget)) : "?")));
      li.appendChild(mid);
      li.appendChild(el("span", "pill", r.scenario ? "Vota " + r.scenario : "Nessun voto"));
      ul.appendChild(li);
    });

    const vt = $("v-title"), vw = $("v-why");
    if (!list.length) { vt.textContent = "Mancano le risposte"; vw.textContent = "Appena rispondete tutti e tre, qui compare lo scenario che rientra nel budget e che avete votato di più."; return; }
    let possible = Object.keys(COST).filter((k) => bmin === null || COST[k] <= bmin);
    if (riders < 1) possible = possible.filter((k) => k !== "B");
    if (!possible.length) { vt.textContent = "D · Zaino in spalla, o alzate il budget"; vw.textContent = "Il budget più basso del gruppo è " + eur(bmin) + ": nessuno scenario ci sta dentro del tutto. D è il più vicino."; return; }
    possible.sort((a, b) => (votes[b] - votes[a]) || (COST[b] - COST[a]));
    const pick = possible[0];
    vt.textContent = NAMES[pick] + " · " + eur(COST[pick]);
    const parts = [votes[pick] + " " + (votes[pick] === 1 ? "voto" : "voti") + " su " + list.length];
    if (bmin) parts.push("rientra nel budget più basso (" + eur(bmin) + ")");
    top.filter((k) => k !== pick && !possible.includes(k)).forEach((k) => {
      parts.push(k === "B" && riders < 1 ? "B, il più votato, è escluso perché nessuno ha patente A con esperienza in fuoristrada" : k + ", il più votato, supera il budget più basso");
    });
    if (riders < 1 && !top.includes("B")) parts.push("B escluso perché nessuno ha patente A con esperienza in fuoristrada");
    if (list.length < GROUP) parts.push("mancano ancora " + (GROUP - list.length) + " risposte");
    vw.textContent = parts.join(" · ") + ".";
  }

  function renderTodo() {
    const ul = $("todo"); ul.textContent = "";
    const key = (t) => String(t.entro || "9999").slice(0, 10);
    const items = S.todo.slice().sort((a, b) => (Number(!!a.fatto) - Number(!!b.fatto)) || key(a).localeCompare(key(b)) || ((a.ordine || 0) - (b.ordine || 0)));
    const done = S.todo.filter((t) => t.fatto).length;
    $("cd-done").textContent = S.loaded ? done + "/" + S.todo.length : "—";
    if (!items.length) { ul.appendChild(el("li", "empty", S.loaded ? "Nessuna prenotazione in lista. Aggiungine una qui sotto." : "Caricamento…")); return; }
    const today = todayStr();
    items.forEach((t) => {
      const li = el("li"); if (t.fatto) li.className = "done";
      const cb = el("input"); cb.type = "checkbox"; cb.checked = !!t.fatto; cb.id = "todo-" + t.id;
      cb.addEventListener("change", () => act(() => Data.updateTodo(t.id, { fatto: cb.checked })));
      li.appendChild(cb);
      const mid = el("div"); mid.style.minWidth = "0";
      const lab = el("label", "t", t.titolo || ""); lab.htmlFor = cb.id; mid.appendChild(lab);
      const sub = el("div", "sub");
      if (t.entro) sub.appendChild(el("span", "due" + (!t.fatto && key(t) < today ? " late" : ""), "entro " + fmtDate(t.entro)));
      sub.appendChild(el("span", "", t.chi ? "se ne occupa " + t.chi : "nessuno se ne occupa"));
      mid.appendChild(sub); li.appendChild(mid);
      const mine = t.chi && t.chi === S.me;
      const b = el("button", "btn ghost small", mine ? "Lascia" : t.chi ? "Prendo io" : "Me ne occupo io"); b.type = "button";
      b.disabled = !!t.fatto;
      b.addEventListener("click", () => { if (!S.me) return showWho(); act(() => Data.updateTodo(t.id, { chi: mine ? null : S.me })); });
      li.appendChild(b);
      ul.appendChild(li);
    });
  }

  function renderSpese() {
    const sel = $("e-who"); const cur = sel.value; sel.textContent = "";
    const ppl = participants();
    ppl.forEach((n) => { const o = el("option", "", n + (n === S.me ? " (tu)" : "")); o.value = n; sel.appendChild(o); });
    if (cur && ppl.includes(cur)) sel.value = cur; else if (S.me) sel.value = S.me;

    const ul = $("exp"); ul.textContent = "";
    const items = S.spese.slice().sort((a, b) => String(b.creato || "").localeCompare(String(a.creato || "")));
    if (!items.length) ul.appendChild(el("li", "empty", "Nessuna spesa ancora."));
    items.forEach((s) => {
      const li = el("li");
      const mid = el("div"); mid.style.minWidth = "0";
      mid.appendChild(el("div", "", s.descrizione || ""));
      mid.appendChild(el("div", "sub", "pagato da " + s.pagato_da));
      li.appendChild(mid);
      li.appendChild(el("span", "amt", eur2(Number(s.importo) || 0)));
      const del = el("button", "btn ghost small", "Elimina"); del.type = "button";
      del.addEventListener("click", () => {
        if (del.dataset.armed) return act(() => Data.deleteSpesa(s.id));
        del.dataset.armed = "1"; del.textContent = "Conferma";
        setTimeout(() => { if (del.isConnected) { delete del.dataset.armed; del.textContent = "Elimina"; } }, 4000);
      });
      li.appendChild(del);
      ul.appendChild(li);
    });

    const total = S.spese.reduce((t, s) => t + (Number(s.importo) || 0), 0);
    $("e-total").textContent = eur2(total);
    const bal = $("bal"); bal.textContent = "";
    if (!S.spese.length) { const e = el("div", "empty", "Il saldo compare con la prima spesa."); e.style.padding = "0"; bal.appendChild(e); return; }
    const n = Math.max(ppl.length, 1), share = total / n;
    const note = el("div", "empty", "Diviso per " + n + ": " + eur2(share) + " a testa."); note.style.padding = "0"; bal.appendChild(note);
    ppl.forEach((name) => {
      const paid = S.spese.filter((s) => s.pagato_da === name).reduce((t, s) => t + (Number(s.importo) || 0), 0);
      const net = paid - share;
      const row = el("div", "row");
      row.appendChild(el("span", "", name + (name === S.me ? " (tu)" : "")));
      row.appendChild(el("span", net >= 0 ? "pos" : "neg", Math.abs(net) < 0.005 ? "in pari" : net > 0 ? "riceve " + eur2(net) : "deve " + eur2(-net)));
      bal.appendChild(row);
    });
  }

  /* ---------- azioni ---------- */
  async function act(fn) {
    try { await fn(); await reload(); }
    catch (e) { setStatus("Non sono riuscito a salvare. Controlla la connessione e riprova."); console.error(e); }
  }

  $("f-risp").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (!S.me) return showWho();
    const val = (n) => { const x = document.querySelector('#f-risp input[name="' + n + '"]:checked'); return x ? x.value : null; };
    const o = { nome: S.me, budget: Number($("r-budget").value) || null, patente: val("patente"), fuoristrada: val("fuori"), scenario: val("scen"), aggiornato: new Date().toISOString() };
    $("r-save").disabled = true; $("r-msg").textContent = "Salvataggio…";
    try { await Data.savePersona(o); await reload(); $("r-msg").textContent = "Salvato. Lo vedono anche gli altri."; }
    catch (e) { $("r-msg").textContent = "Non salvato. Controlla la connessione e riprova."; console.error(e); }
    $("r-save").disabled = false;
  });

  $("f-todo").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const t = $("t-new").value.trim(); if (!t) return;
    act(async () => {
      await Data.addTodo({ titolo: t.slice(0, 120), entro: $("t-date").value || null, ordine: Date.now() % 1000000, fatto: false, chi: null });
      $("t-new").value = ""; $("t-date").value = "";
    });
  });

  $("f-exp").addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (!S.me) return showWho();
    const d = $("e-desc").value.trim(), a = Number($("e-amt").value), w = $("e-who").value || S.me;
    if (!d || !(a > 0)) return;
    act(async () => {
      await Data.addSpesa({ descrizione: d.slice(0, 80), importo: Math.round(a * 100) / 100, pagato_da: w });
      $("e-desc").value = ""; $("e-amt").value = "";
    });
  });

  /* ---------- caricamento ---------- */
  let reloading = null;
  async function reload() {
    if (reloading) return reloading;
    reloading = (async () => {
      try {
        const d = await Data.load();
        S.persone = d.persone || []; S.todo = d.todo || []; S.spese = d.spese || []; S.loaded = true;
        if (LIVE) setStatus("");
        fillForm(); render();
      } catch (e) {
        setStatus("Non riesco a raggiungere il database. Riprova tra poco: se il problema resta, il progetto Supabase potrebbe essere in pausa.");
        console.error(e);
      } finally { reloading = null; }
    })();
    return reloading;
  }

  if (!LIVE) setStatus("Modalità prova: i dati restano solo su questo dispositivo finché non colleghi il database.");
  renderMe(); render();
  reload().then(() => { if (!S.me) showWho(); });
  let t = null;
  Data.onChange(() => { clearTimeout(t); t = setTimeout(reload, 250); });
})();
