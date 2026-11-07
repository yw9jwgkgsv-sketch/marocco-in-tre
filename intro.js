/* L'introduzione: una pagina da scorrere, una fascia colorata per funzione, tutte uguali.
   Nome grande, cosa fa in una riga, una battuta. Si rivede dalla Home. */
window.Intro = (function () {
  "use strict";
  const KEY = "marocco_intro_v5";
  const store = {
    get() { try { return localStorage.getItem(KEY); } catch (e) { return "1"; } },
    set() { try { localStorage.setItem(KEY, "1"); } catch (e) {} }
  };
  function shouldShow() { return !store.get() || /[?&]intro\b/.test(location.search); }
  function E(tag, cls, text) { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = text; return e; }
  function days() { return Math.max(0, Math.floor((new Date(2026, 11, 28, 23, 30) - new Date()) / 86400000)); }

  const CAST = [["Alessandro", "Ha fatto il sito. Il volo de ritorno no."], ["Augusto", "Dice «suave». Non prenota niente."], ["Davide", "600.000 chiamate. Mo' è pure avvocato."]];

  /* [colore, icona, nome, cosa fa, battuta] */
  const FEAT = [
    ["#D6345A", "esplora", "Esplora", "49 cose da fare. Su ognuna dici 🔥, 🤔 o 💀.", "Chi dice 💀 a tutto diventa er Cacasotto. Ufficiale."],
    ["#0B7A5C", "sifa", "Si fa", "Tre 🔥 sulla stessa cosa e si fa. Il resto non si discute.", "Finalmente d'accordo su qualcosa. Porra."],
    ["#6E2BC2", "notte", "La notte", "Locali, feste e ostelli veri, città per città. Più il registro dei due di picche.", "Dove forse c'è la sorca. E dove sicuramente no."],
    ["#2438C6", "budget", "Budget", "Quanto spendete davvero, voce per voce. Accendi e spegni le cose.", "Per una volta siamo seri. Una."],
    ["#B35A00", "organizza", "Organizza", "Chi prenota cosa, e chi deve soldi a chi. Al centesimo.", "Chi sfora la scadenza finisce sul muro della vergogna. Daje."],
    ["#0F6FB8", "ruota", "La ruota", "Chi paga il tè, chi guida, chi dorme vicino alla porta. Gira e basta.", "La ruota non si contesta. Manco con l'avvocato, Davide."],
    ["#B23A12", "crew", "Il tribunale", "Si vota chi è il più tossico. Chi vince si becca l'adesivo.", "Votarsi da soli si può. Ma è triste, neh."],
    ["#141A4D", "kit", "Kit", "Valigia, frasi in darija, prezzi giusti nel souk, meteo vero.", "Per non fare figure de merda. O farne meno."]
  ];

  function show() {
    if (document.getElementById("intro")) return;
    const ov = E("div", "intro2"); ov.id = "intro"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("aria-label", "Introduzione al sito");
    const skip = E("button", "i2-skip", "Salta"); skip.type = "button";
    ov.appendChild(skip);

    const hero = E("section", "i2-band i2-hero zellige"); hero.style.backgroundColor = "#2438C6";
    const hi = E("div", "i2-in");
    hi.append(E("span", "i2-eye", "29 dic → 8 gen · in tre"), E("h1", "i2-h1", "Ahó, tossici."),
      E("p", "i2-line", "Il sito per organizzare il Marocco. E per prendervi per il culo."),
      E("span", "sticker", "Partenza tra " + days() + " giorni"));
    const cast = E("div", "i2-cast");
    CAST.forEach(([n, l]) => { const r = E("div", "i2-person"); const av = M.avatar(n); const t = E("div"); t.append(E("b", null, n), E("span", null, l)); r.append(av, t); cast.appendChild(r); });
    hi.append(cast, E("p", "i2-down", "Scorri ↓"));
    hero.appendChild(hi); ov.appendChild(hero);

    FEAT.forEach(([bg, ic, name, what, joke], i) => {
      const b = E("section", "i2-band zellige"); b.style.backgroundColor = bg;
      const inn = E("div", "i2-in");
      const top = E("div", "i2-top"); top.append(E("span", "i2-num", String(i + 1).padStart(2, "0")), M.icon(ic, "i2-ic"));
      inn.append(top, E("h2", "i2-name", name), E("p", "i2-what", what), E("p", "i2-joke", joke));
      b.appendChild(inn); ov.appendChild(b);
    });

    const end = E("section", "i2-band i2-end zellige"); end.style.backgroundColor = "#2438C6";
    const ei = E("div", "i2-in");
    const me = M.me();
    ei.append(E("h2", "i2-name", me ? "Sei " + me + "?" : "Chi sei?"), E("p", "i2-what", "Tocca il tuo nome: il sito sa chi insultare."));
    const pick = E("div", "i2-pick");
    CAST.forEach(([n]) => { const b = E("button", "i2-who"); b.type = "button"; b.append(M.avatar(n), E("b", null, n)); b.addEventListener("click", () => { M.setMe(n); close(); }); pick.appendChild(b); });
    const other = E("button", "in-other", "Non sono nessuno dei tre"); other.type = "button"; other.addEventListener("click", () => { close(); setTimeout(M.askWho, 200); });
    ei.append(pick, other); end.appendChild(ei); ov.appendChild(end);

    document.body.appendChild(ov); document.documentElement.style.overflow = "hidden";
    skip.addEventListener("click", () => end.scrollIntoView({ behavior: "smooth" }));
    function close() {
      store.set(); window.INTRO_ACTIVE = false;
      ov.classList.add("in-out"); setTimeout(() => { ov.remove(); document.documentElement.style.overflow = ""; if (!M.me()) M.askWho(); }, 300);
    }
    document.addEventListener("keydown", function k(e) { if (!document.getElementById("intro")) return document.removeEventListener("keydown", k); if (e.key === "Escape") end.scrollIntoView(); });
  }
  return { shouldShow, show };
})();
