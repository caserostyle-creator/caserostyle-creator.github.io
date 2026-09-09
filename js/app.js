// Lógica de la presentación: ciclo con hover, bento, cartas expandibles (animación por transformaciones),
// cambio de paso con transición dentro de la carta, deslizamiento táctil, enlaces entre pasos, visor de proyectos y barra de pasos.
(function () {
  const S = window.SITIO, C = window.CICLO, P = window.PASOS, PR = window.PROYECTOS, R = window.REFERENCIAS;
  const I = "img/";
  const $ = (s, r = document) => r.querySelector(s);
  const reducido = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  const movil = () => window.innerWidth <= 900;
  let actual = 1, abierta = null; // abierta = { e, origen, tipo: "paso"|"proyecto"|"refs", n }

  // ── Ciclo de la portada ───────────────────────────────────────
  const POS = [[50, 8], [91, 36], [76, 87], [24, 87], [9, 36]];
  const ciclo = $("#ciclo");
  ciclo.insertAdjacentHTML("beforeend", C.map((c, i) => `
    <div class="c ${POS[i][0] > 60 ? "izq" : ""}" style="left:${POS[i][0]}%;top:${POS[i][1]}%" tabindex="0" data-i="${i}">
      <i>${c.ico}</i><span>${c.t}</span>
      <div class="info"><b>${c.t}</b>${c.d}</div>
    </div>`).join(""));
  ciclo.addEventListener("click", e => { const c = e.target.closest(".c"); if (!c) return; const on = c.classList.contains("activo"); ciclo.querySelectorAll(".c").forEach(x => x.classList.remove("activo")); if (!on) c.classList.add("activo"); });
  document.addEventListener("click", e => { if (!e.target.closest(".ciclo")) ciclo.querySelectorAll(".c").forEach(x => x.classList.remove("activo")); });

  // ── Bento ─────────────────────────────────────────────────────
  const bento = $("#bento");
  const orden = ["F:closet", 1, 2, 3, 4, 5, 6, "F:cava", 7, 8, 9, "F:tipi", 10, 11, 12];
  const calidos = [3, 8, 10];
  bento.innerHTML = orden.map(o => {
    if (typeof o === "string") { const id = o.slice(2), f = PR[id]; return `<button class="b foto" data-foto="${id}" type="button" aria-label="Ver el proyecto ${f.t}"><img src="${I + f.imgs[f.imgs.length - 1][0]}" alt="" loading="lazy"><span>${f.t}</span></button>`; }
    const p = P[o - 1];
    return `<button class="b ${calidos.includes(o) ? "calido" : ""}" data-n="${o}" type="button"><span class="ico">${p.ico}</span><span class="n">${String(o).padStart(2, "0")}</span><b>${p.t}</b><small>${p.s}</small></button>`;
  }).join("");

  // ── Barra de pasos ────────────────────────────────────────────
  const puntos = $("#puntos"), etiqueta = $("#etiqueta"), ant = $("#ant"), sig = $("#sig");
  puntos.innerHTML = P.map((p, i) => `<button type="button" data-n="${i + 1}" title="${p.t}" aria-label="Paso ${i + 1}: ${p.t}">${i + 1}</button>`).join("");
  function pintar() {
    [...puntos.children].forEach((b, i) => { b.classList.toggle("on", i + 1 === actual); b.classList.toggle("visto", i + 1 < actual); });
    etiqueta.innerHTML = `<b>${actual}</b> / ${P.length} · <b>${P[actual - 1].t}</b>`;
    ant.disabled = actual === 1; sig.disabled = actual === P.length;
    ant.innerHTML = actual === 1 ? "←" : `← <span>${actual - 1}. ${P[actual - 2].t}</span>`;
    sig.innerHTML = actual === P.length ? "→" : `<span>${actual + 1}. ${P[actual].t}</span> →`;
    bento.querySelectorAll(".b[data-n]").forEach(b => b.classList.toggle("actual", +b.dataset.n === actual));
    const on = puntos.querySelector(".on"); if (on && movil()) on.scrollIntoView({ inline: "center", block: "nearest", behavior: reducido() ? "auto" : "smooth" });
  }
  function ir(n, abrir) {
    const antes = actual;
    actual = Math.min(P.length, Math.max(1, n)); pintar();
    if (abrir || abierta) mostrarPaso(actual, null, actual >= antes ? 1 : -1);
  }

  // ── Expansión con transformaciones (fluida) ───────────────────
  function altoNav() { return $(".nav").offsetHeight; }
  function expandir(origen, html, clase, tipo, n) {
    cerrar(true);
    document.documentElement.style.setProperty("--nav-h", altoNav() + "px");
    const r = origen.getBoundingClientRect();
    const e = document.createElement("div");
    e.className = "expandida " + (clase || "");
    e.innerHTML = `<button class="cerrar" type="button" aria-label="Cerrar">✕</button><div class="contenido"><div class="lienzo">${html}</div></div>`;
    document.body.appendChild(e);
    const W = window.innerWidth, H = window.innerHeight - altoNav();
    // Estado inicial: la carta ya ocupa la pantalla, pero transformada para coincidir con su lugar en la grilla.
    e.style.transform = `translate(${r.left}px, ${r.top}px) scale(${r.width / W}, ${r.height / H})`;
    void e.offsetWidth;
    origen.classList.add("hueco");
    abierta = { e, origen, tipo, n };
    if (reducido()) { e.classList.add("abierta"); e.style.transform = ""; }
    else requestAnimationFrame(() => { e.classList.add("abierta"); e.style.transform = ""; });
    e.querySelector(".cerrar").onclick = () => cerrar();
    e.addEventListener("click", ev => { const a = ev.target.closest("[data-ir]"); if (a) { ev.preventDefault(); ir(+a.dataset.ir, true); } });
    document.body.style.overflow = "hidden";
    activarDeslizar(e);
    return e;
  }
  function cerrar(rapido) {
    if (!abierta) return;
    const { e, origen } = abierta; abierta = null;
    document.body.style.overflow = "";
    if (rapido || reducido()) { e.remove(); origen.classList.remove("hueco"); return; }
    const r = origen.getBoundingClientRect(), W = window.innerWidth, H = window.innerHeight - altoNav();
    e.classList.remove("abierta");
    e.style.transform = `translate(${r.left}px, ${r.top}px) scale(${r.width / W}, ${r.height / H})`;
    setTimeout(() => { e.remove(); origen.classList.remove("hueco"); }, 420);
  }
  // Cambio de paso con la carta abierta: el contenido nuevo entra deslizándose, sin volver a expandir.
  function transicionar(origenNuevo, html, clase, n, dir) {
    const { e, origen } = abierta;
    origen.classList.remove("hueco"); origenNuevo.classList.add("hueco");
    abierta.origen = origenNuevo; abierta.n = n; abierta.tipo = "paso";
    e.className = "expandida abierta " + (clase || "");
    const cont = e.querySelector(".contenido"), viejo = cont.querySelector(".lienzo");
    const nuevo = document.createElement("div"); nuevo.className = "lienzo"; nuevo.innerHTML = html;
    cont.scrollTop = 0;
    if (reducido()) { viejo.remove(); cont.appendChild(nuevo); return; }
    viejo.classList.add(dir > 0 ? "sale-izq" : "sale-der");
    nuevo.classList.add(dir > 0 ? "entra-der" : "entra-izq");
    cont.appendChild(nuevo);
    requestAnimationFrame(() => requestAnimationFrame(() => nuevo.classList.remove("entra-der", "entra-izq")));
    setTimeout(() => viejo.remove(), 380);
  }
  // Deslizar con el dedo para cambiar de paso.
  function activarDeslizar(e) {
    let x0 = 0, y0 = 0, t0 = 0;
    e.addEventListener("touchstart", ev => { const t = ev.touches[0]; x0 = t.clientX; y0 = t.clientY; t0 = Date.now(); }, { passive: true });
    e.addEventListener("touchend", ev => {
      const t = ev.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      if (Math.abs(dx) > 60 && Math.abs(dy) < 70 && Date.now() - t0 < 800 && abierta && abierta.tipo !== "refs") { if (dx < 0) ir(actual + 1); else ir(actual - 1); }
    }, { passive: true });
  }

  // ── Composiciones de cada paso ────────────────────────────────
  const lista = (arr, icos) => `<ul class="puntos-lista">${arr.map((x, i) => `<li><i>${icos && icos[i] ? icos[i] : i + 1}</i><span>${x}</span></li>`).join("")}</ul>`;
  const cab = p => `<div class="k"><span class="ico-paso">${p.ico}</span> Paso ${p.n} de ${P.length} · ${p.s}</div><h3>${p.t}</h3>`;
  const datos = p => p.datos ? `<div class="datos">${p.datos.map(([v, t]) => `<div><b>${v}</b><span>${t}</span></div>`).join("")}</div>` : "";
  const img = p => `<div class="img"><img src="${I + p.img}" alt="${p.pie}"><span class="pie-img">${p.pie}</span></div>`;
  const rel = p => p.rel ? `<div class="relacionado"><span>Relacionado</span>${p.rel.map(n => `<a href="#" data-ir="${n}">${P[n - 1].ico} ${n}. ${P[n - 1].t}</a>`).join("")}</div>` : "";

  const LAYOUT = {
    "texto-izq": p => `<div class="det texto-izq"><div class="txt">${cab(p)}<p class="lead">${p.lead}</p>${datos(p)}${lista(p.b, ["🎓", "🪚", "♻️", "👁️"])}${rel(p)}</div>${img(p)}</div>`,
    "galeria-izq": p => `<div class="det galeria-izq"><div class="galeria">${p.galeria.map(([f, c]) => `<figure><img src="${I + f}" alt="${c}"><figcaption>${c}</figcaption></figure>`).join("")}</div><div class="txt">${cab(p)}<p class="lead">${p.lead}</p>${datos(p)}${lista(p.b, ["🧰", "🗂️", "✨", "🌱"])}${rel(p)}</div></div>`,
    "banner": p => `<div class="det banner">${img(p)}<div class="txt"><div>${cab(p)}</div><div><p class="lead">${p.lead}</p>${lista(p.b, ["⏱️", "🔁", "📏"])}</div><div><div class="cita"><b>PREGUNTA PROBLEMA</b>${p.cita}</div>${rel(p)}</div></div></div>`,
    "tarjetas": p => `<div class="det tarjetas"><div class="txt">${cab(p)}<p class="lead">${p.lead}</p><div class="tarjetas-obj">${p.tarjetas.map(([v, t], i) => `<div><em>OBJETIVO ESPECÍFICO ${i + 1}</em><div><b>${v}</b><span>${t}</span></div></div>`).join("")}</div><p class="nota">${p.nota}</p>${rel(p)}</div></div>`,
    "linea-tiempo": p => `<div class="det linea-tiempo"><div class="txt">${cab(p)}<p class="lead">${p.lead}</p><div class="tiempo">${p.fases.map(([t, d], i) => `<div><i>${i + 1}</i><b>${t}</b><span>${d}</span></div>`).join("")}</div><div class="tiempo-fechas"><div><b>INICIO PREVISTO</b>21 de diciembre de 2025</div><div><b>CIERRE PREVISTO</b>21 de abril de 2026</div><div><b>CIERRE REAL</b>20 de febrero de 2026</div><div class="polaroid"><img src="${I + p.img}" alt="${p.pie}"><small>${p.pie}</small></div></div>${rel(p)}</div></div>`,
    "imagen-protagonista": p => `<div class="det imagen-protagonista"><div class="cab"><div>${cab(p)}</div><p class="lead">${p.lead}</p></div><div class="img"><img src="${I + p.img}" alt="${p.pie}"></div><div class="chips">${p.chips.map((c, i) => `<span><i>${i + 1}</i> ${c}</span>`).join("")}</div><div class="pie-flujo"><p class="nota-suelta">${p.nota}</p>${rel(p)}</div></div>`,
    "autores": p => `<div class="det autores"><div class="txt">${cab(p)}<p class="lead">${p.lead}</p><div class="autores-grid">${p.autores.map(([a, y, tema, d]) => `<div><b>${a}</b><em>${y}</em><small>${tema}</small><p>${d}</p></div>`).join("")}</div><details class="ante"><summary>Antecedentes revisados (estado del arte y de la técnica)</summary>${p.antecedentes.map(([g, r]) => `<div class="grupo"><b>${g}</b><span>${r}</span></div>`).join("")}</details>${rel(p)}</div></div>`,
    "proyectos": (p, sel) => `<div class="det proyectos"><div class="cab">${cab(p)}<p class="lead">${p.lead}</p><div class="tabs" id="tabs">${Object.entries(PR).map(([id, f]) => `<button type="button" data-p="${id}" class="${id === sel ? "on" : ""}">${f.t}</button>`).join("")}</div></div><div id="visor"></div></div>`,
    "imagen-alta-izq": p => `<div class="det imagen-alta-izq">${img(p)}<div class="txt">${cab(p)}<p class="lead">${p.lead}</p>${datos(p)}${lista(p.b, ["🧊", "📐", "🪵", "🧠"])}${rel(p)}</div></div>`,
    "manifiesto": p => `<div class="det manifiesto"><div class="mini"><img src="${I + p.img}" alt="${p.pie}"></div><div class="txt">${cab(p)}<p class="frase">${p.frase}</p><p class="lead">${p.lead}</p>${lista(p.b, ["🧑‍🔧", "📜", "🌐", "🔍"])}${rel(p)}</div></div>`,
    "numeradas": p => `<div class="det numeradas"><div class="txt">${cab(p)}<p class="lead">${p.lead}</p><ol class="numeradas-lista">${p.b.map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join("")}</ol>${rel(p)}</div>${img(p)}</div>`,
    "cierre": p => `<div class="det cierre"><div class="fondo"></div><div class="txt">${cab(p)}<p class="lead">${p.lead}</p>${lista(p.b, ["🤝", "📐", "⚖️", "🎓"])}${rel(p)}<div class="gracias"><b>${p.gracias}</b><small><strong>${S.autor}</strong><br>${S.titulo}<br>${S.programa}<br>${S.universidad}</small></div></div></div>`
  };

  function mostrarPaso(n, proyecto, dir = 1) {
    const p = P[n - 1], origen = bento.querySelector(`.b[data-n="${n}"]`);
    const sel = proyecto || "closet", clase = origen.classList.contains("calido") ? "calido" : "";
    const html = LAYOUT[p.layout](p, sel);
    let e;
    if (abierta && abierta.tipo === "paso") { transicionar(origen, html, clase, n, dir); e = abierta.e; }
    else e = expandir(origen, html, clase, "paso", n);
    if (p.layout === "proyectos") activarProyectos(e, sel);
  }
  function activarProyectos(e, sel) {
    pintarProyecto(sel);
    const tabs = e.querySelector("#tabs");
    tabs.addEventListener("click", ev => { const b = ev.target.closest("button"); if (!b) return; tabs.querySelector(".on")?.classList.remove("on"); b.classList.add("on"); pintarProyecto(b.dataset.p); });
  }
  function ajustarVisor() {
    const v = $("#visor"), cab = $(".det.proyectos .cab"); if (!v || !cab || !abierta) return;
    v.style.height = movil() ? "" : (abierta.e.clientHeight - cab.offsetHeight) + "px";
  }
  window.addEventListener("resize", () => { ajustarVisor(); document.documentElement.style.setProperty("--nav-h", altoNav() + "px"); });
  function pintarProyecto(id) {
    const f = PR[id], v = $("#visor"); if (!v) return;
    ajustarVisor(); setTimeout(ajustarVisor, 60); setTimeout(ajustarVisor, 500);
    let k = f.imgs.length - 1;
    const pinta = () => {
      v.innerHTML = `<div class="visor"><div class="escena"><div class="grande"><img src="${I + f.imgs[k][0]}" alt="${f.imgs[k][1]}"><span>${k + 1} / ${f.imgs.length} · ${f.imgs[k][1]}</span></div><div class="tiras">${f.imgs.map(([s, c], i) => `<button type="button" data-k="${i}" class="${i === k ? "on" : ""}" title="${c}"><img src="${I + s}" alt=""></button>`).join("")}</div></div>
        <div class="ficha"><span class="k">${f.linea}</span><h4>${f.t}</h4><p>${f.d}</p><span class="k">Resultado</span><p>${f.r}</p><span class="k">Participación del diseñador</span><p>${f.rol}</p><div class="proceso">${["Referencia", "Boceto", "Modelado 3D", "Plano técnico", "Producto final"].map((s, i) => `<span><i>${i + 1}</i> ${s}</span>`).join("")}</div>${rel(P[7])}</div></div>`;
      v.querySelector(".tiras").addEventListener("click", ev => { const b = ev.target.closest("button"); if (b) { k = +b.dataset.k; pinta(); } });
    };
    pinta();
  }
  function mostrarReferencias() {
    expandir($("#btn-refs"), `<div class="refs"><div class="k">Referencias bibliográficas</div><h3>Fuentes citadas en el trabajo</h3><p class="lead">Listado tomado del documento de grado.</p><ol>${R.map(r => `<li>${r}</li>`).join("")}</ol></div>`, "", "refs");
  }

  // ── Eventos ───────────────────────────────────────────────────
  bento.addEventListener("click", e => {
    const b = e.target.closest(".b"); if (!b) return;
    if (b.dataset.foto) {
      actual = 8; pintar();
      const ex = expandir(b, LAYOUT.proyectos(P[7], b.dataset.foto), "", "proyecto", 8);
      activarProyectos(ex, b.dataset.foto);
    } else { actual = +b.dataset.n; pintar(); mostrarPaso(actual); }
  });
  $("#comenzar").onclick = () => { bento.scrollIntoView({ behavior: reducido() ? "auto" : "smooth", block: "start" }); setTimeout(() => ir(1, true), reducido() ? 0 : 450); };
  $("#btn-refs").onclick = mostrarReferencias;
  puntos.addEventListener("click", e => { const b = e.target.closest("button"); if (b) ir(+b.dataset.n); });
  ant.onclick = () => ir(actual - 1); sig.onclick = () => ir(actual + 1);
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); if (e.key === "ArrowRight") ir(actual + 1); if (e.key === "ArrowLeft") ir(actual - 1); });
  pintar();

  // Enlaces directos: ?paso=8 · ?proyecto=cava · ?ciclo=2
  const q = new URLSearchParams(location.search);
  if (q.get("paso")) setTimeout(() => ir(+q.get("paso"), true), 300);
  if (q.get("proyecto") && PR[q.get("proyecto")]) setTimeout(() => { const b = bento.querySelector(`.b[data-foto="${q.get("proyecto")}"]`); if (b) b.click(); else { actual = 8; pintar(); mostrarPaso(8, q.get("proyecto")); } }, 300);
  if (q.get("ciclo")) setTimeout(() => ciclo.querySelector(`.c[data-i="${q.get("ciclo")}"]`).classList.add("activo"), 300);
})();
