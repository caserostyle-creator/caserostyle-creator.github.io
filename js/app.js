// Lógica de la presentación: ciclo con hover, bento, cartas expandibles, visor de proyectos y barra de pasos.
(function () {
  const S = window.SITIO, C = window.CICLO, P = window.PASOS, PR = window.PROYECTOS, R = window.REFERENCIAS;
  const I = "img/";
  const $ = (s, r = document) => r.querySelector(s);
  let actual = 1, abierta = null;

  // ── Ciclo de la portada ───────────────────────────────────────
  const POS = [[50, 8], [91, 36], [76, 87], [24, 87], [9, 36]];
  const ciclo = $("#ciclo");
  ciclo.insertAdjacentHTML("beforeend", C.map((c, i) => `
    <div class="c ${POS[i][0] > 60 ? "izq" : ""}" style="left:${POS[i][0]}%;top:${POS[i][1]}%" tabindex="0" data-i="${i}">
      <i>${c.ico}</i><span>${c.t}</span>
      <div class="info"><b>${c.t}</b>${c.d}</div>
    </div>`).join(""));
  // En pantallas táctiles el toque fija la etiqueta; otro toque la cierra.
  ciclo.addEventListener("click", e => { const c = e.target.closest(".c"); if (!c) return; const on = c.classList.contains("activo"); ciclo.querySelectorAll(".c").forEach(x => x.classList.remove("activo")); if (!on) c.classList.add("activo"); });
  document.addEventListener("click", e => { if (!e.target.closest(".ciclo")) ciclo.querySelectorAll(".c").forEach(x => x.classList.remove("activo")); });

  // ── Bento ─────────────────────────────────────────────────────
  const bento = $("#bento");
  const orden = ["F:closet", 1, 2, 3, 4, 5, 6, "F:cava", 7, 8, 9, "F:tipi", 10, 11, 12];
  const calidos = [3, 8, 10];
  bento.innerHTML = orden.map(o => {
    if (typeof o === "string") { const id = o.slice(2), f = PR[id]; return `<button class="b foto" data-foto="${id}" type="button" aria-label="Ver el proyecto ${f.t}"><img src="${I + f.imgs[f.imgs.length - 1][0]}" alt=""><span>${f.t}</span></button>`; }
    const p = P[o - 1];
    return `<button class="b ${calidos.includes(o) ? "calido" : ""}" data-n="${o}" type="button"><span class="n">${String(o).padStart(2, "0")}</span><b>${p.t}</b><small>${p.s}</small></button>`;
  }).join("");

  // ── Barra de pasos ────────────────────────────────────────────
  const puntos = $("#puntos"), etiqueta = $("#etiqueta"), ant = $("#ant"), sig = $("#sig");
  puntos.innerHTML = P.map((p, i) => `<button type="button" data-n="${i + 1}" title="${p.t}" aria-label="Paso ${i + 1}: ${p.t}">${i + 1}</button>`).join("");
  function pintar() {
    [...puntos.children].forEach((b, i) => { b.classList.toggle("on", i + 1 === actual); b.classList.toggle("visto", i + 1 < actual); });
    etiqueta.innerHTML = `Paso <b>${actual}</b> de ${P.length} · <b>${P[actual - 1].t}</b>`;
    ant.disabled = actual === 1; sig.disabled = actual === P.length;
    ant.textContent = actual === 1 ? "← Inicio" : `← ${actual - 1}. ${P[actual - 2].t}`;
    sig.textContent = actual === P.length ? "Fin" : `${actual + 1}. ${P[actual].t} →`;
    bento.querySelectorAll(".b[data-n]").forEach(b => b.classList.toggle("actual", +b.dataset.n === actual));
  }
  function ir(n, abrir) { actual = Math.min(P.length, Math.max(1, n)); pintar(); if (abrir || abierta) mostrarPaso(actual); }

  // ── Expansión ─────────────────────────────────────────────────
  function expandir(origen, html, clase) {
    cerrar(true);
    const r = origen.getBoundingClientRect();
    const e = document.createElement("div");
    e.className = "expandida " + (clase || "");
    e.style.cssText = `top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px`;
    e.innerHTML = `<button class="cerrar" type="button" aria-label="Cerrar">✕</button><div class="contenido">${html}</div>`;
    document.body.appendChild(e);
    origen.classList.add("hueco");
    abierta = { e, origen };
    document.documentElement.style.setProperty("--nav-h", $(".nav").offsetHeight + "px");
    void e.offsetWidth; // fuerza el cálculo de la posición inicial antes de animar
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) e.classList.add("abierta"); else setTimeout(() => e.classList.add("abierta"), 30);
    e.querySelector(".cerrar").onclick = () => cerrar();
    document.body.style.overflow = "hidden";
    return e;
  }
  function cerrar(rapido) {
    if (!abierta) return;
    const { e, origen } = abierta; abierta = null;
    document.body.style.overflow = "";
    if (rapido) { e.remove(); origen.classList.remove("hueco"); return; }
    const r = origen.getBoundingClientRect();
    e.classList.remove("abierta");
    e.style.cssText = `top:${r.top}px;left:${r.left}px;width:${r.width}px;height:${r.height}px`;
    setTimeout(() => { e.remove(); origen.classList.remove("hueco"); }, 460);
  }

  // ── Composiciones de cada paso ────────────────────────────────
  const lista = arr => `<ul class="puntos-lista">${arr.map((x, i) => `<li><i>${i + 1}</i><span>${x}</span></li>`).join("")}</ul>`;
  const cab = p => `<div class="k">Paso ${p.n} de ${P.length} · ${p.s}</div><h3>${p.t}</h3>`;
  const img = (p, extra = "") => `<div class="img"><img src="${I + p.img}" alt="${p.pie}" ${extra}><span class="pie-img">${p.pie}</span></div>`;

  const LAYOUT = {
    "texto-izq": p => `<div class="det texto-izq"><div class="txt">${cab(p)}<p class="lead">${p.lead}</p>${lista(p.b)}</div>${img(p)}</div>`,
    "galeria-izq": p => `<div class="det galeria-izq"><div class="galeria">${p.galeria.map(([f, c]) => `<figure><img src="${I + f}" alt="${c}"><figcaption>${c}</figcaption></figure>`).join("")}</div><div class="txt">${cab(p)}<p class="lead">${p.lead}</p>${lista(p.b)}</div></div>`,
    "banner": p => `<div class="det banner">${img(p)}<div class="txt"><div>${cab(p)}</div><div><p class="lead">${p.lead}</p>${lista(p.b)}</div><div><div class="cita"><b style="display:block;font-style:normal;font-size:12px;letter-spacing:.12em;color:var(--acento-oscuro);margin-bottom:6px">PREGUNTA PROBLEMA</b>${p.cita}</div></div></div></div>`,
    "tarjetas": p => `<div class="det tarjetas"><div class="txt">${cab(p)}<p class="lead">${p.lead}</p><div class="tarjetas-obj">${p.tarjetas.map(([v, t], i) => `<div><em>OBJETIVO ESPECÍFICO ${i + 1}</em><div><b>${v}</b><span>${t}</span></div></div>`).join("")}</div><p class="nota">${p.nota}</p></div></div>`,
    "linea-tiempo": p => `<div class="det linea-tiempo" style="position:relative"><div class="txt">${cab(p)}<p class="lead">${p.lead}</p><div class="tiempo">${p.fases.map(([t, d], i) => `<div><i>${i + 1}</i><b>${t}</b><span>${d}</span></div>`).join("")}</div><div class="tiempo-fechas"><div><b>INICIO PREVISTO</b>21 de diciembre de 2025</div><div><b>CIERRE PREVISTO</b>21 de abril de 2026</div><div><b>CIERRE REAL</b>20 de febrero de 2026</div></div><div style="height:120px"></div></div><div class="polaroid"><img src="${I + p.img}" alt="${p.pie}"><small>${p.pie}</small></div></div>`,
    "imagen-protagonista": p => `<div class="det imagen-protagonista"><div class="cab"><div>${cab(p)}</div><p class="lead">${p.lead}</p></div><div class="img"><img src="${I + p.img}" alt="${p.pie}"></div><div class="chips">${p.chips.map((c, i) => `<span><i>${i + 1}</i> ${c}</span>`).join("")}<span style="background:transparent;color:#5d6b64;font-weight:500">${p.nota}</span></div></div>`,
    "autores": p => `<div class="det autores"><div class="txt">${cab(p)}<p class="lead">${p.lead}</p><div class="autores-grid">${p.autores.map(([a, y, tema, d]) => `<div><b>${a}</b><em>${y}</em><small>${tema}</small><p>${d}</p></div>`).join("")}</div><details class="ante"><summary>Antecedentes revisados (estado del arte y de la técnica)</summary>${p.antecedentes.map(([g, r]) => `<div class="grupo"><b>${g}</b><span>${r}</span></div>`).join("")}</details></div></div>`,
    "proyectos": (p, sel) => `<div class="det proyectos"><div class="cab">${cab(p)}<p class="lead" style="margin-bottom:0">${p.lead}</p><div class="tabs" id="tabs">${Object.entries(PR).map(([id, f]) => `<button type="button" data-p="${id}" class="${id === sel ? "on" : ""}">${f.t}</button>`).join("")}</div></div><div id="visor"></div></div>`,
    "imagen-alta-izq": p => `<div class="det imagen-alta-izq">${img(p)}<div class="txt">${cab(p)}<p class="lead">${p.lead}</p>${lista(p.b)}</div></div>`,
    "manifiesto": p => `<div class="det manifiesto"><div class="mini"><img src="${I + p.img}" alt="${p.pie}"></div><div class="txt">${cab(p)}<p class="frase">${p.frase}</p><p class="lead">${p.lead}</p>${lista(p.b)}</div></div>`,
    "numeradas": p => `<div class="det numeradas"><div class="txt">${cab(p)}<p class="lead">${p.lead}</p><ol class="numeradas-lista">${p.b.map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join("")}</ol></div>${img(p)}</div>`,
    "cierre": p => `<div class="det cierre"><div class="fondo"></div><div class="txt">${cab(p)}<p class="lead">${p.lead}</p>${lista(p.b)}<div class="gracias"><b>${p.gracias}</b><small><strong style="color:#fff">${S.autor}</strong><br>${S.titulo}<br>${S.programa}<br>${S.universidad}</small></div></div></div>`
  };

  function mostrarPaso(n, proyecto) {
    const p = P[n - 1], origen = bento.querySelector(`.b[data-n="${n}"]`);
    const sel = proyecto || "closet";
    const e = expandir(origen, LAYOUT[p.layout](p, sel), origen.classList.contains("calido") ? "calido" : "");
    if (p.layout === "proyectos") {
      pintarProyecto(sel);
      $("#tabs", e).addEventListener("click", ev => { const b = ev.target.closest("button"); if (!b) return; $("#tabs .on", e)?.classList.remove("on"); b.classList.add("on"); pintarProyecto(b.dataset.p); });
    }
  }
  function ajustarVisor() {
    const v = $("#visor"), cab = $(".det.proyectos .cab"); if (!v || !cab || !abierta) return;
    v.style.height = window.innerWidth > 900 ? (abierta.e.clientHeight - cab.offsetHeight) + "px" : "";
  }
  window.addEventListener("resize", ajustarVisor);
  function pintarProyecto(id) {
    const f = PR[id], v = $("#visor"); if (!v) return;
    ajustarVisor(); setTimeout(ajustarVisor, 60); setTimeout(ajustarVisor, 500);
    let k = f.imgs.length - 1;
    const pinta = () => {
      v.innerHTML = `<div class="visor"><div class="escena"><div class="grande"><img src="${I + f.imgs[k][0]}" alt="${f.imgs[k][1]}"><span>${k + 1} / ${f.imgs.length} · ${f.imgs[k][1]}</span></div><div class="tiras">${f.imgs.map(([s, c], i) => `<button type="button" data-k="${i}" class="${i === k ? "on" : ""}" title="${c}"><img src="${I + s}" alt=""></button>`).join("")}</div></div>
        <div class="ficha"><span class="k" style="margin-top:0">${f.linea}</span><h4>${f.t}</h4><p>${f.d}</p><span class="k">Resultado</span><p>${f.r}</p><span class="k">Participación del diseñador</span><p>${f.rol}</p><div class="proceso">${["Referencia", "Boceto", "Modelado 3D", "Plano técnico", "Producto final"].map((s, i) => `<span><i>${i + 1}</i> ${s}</span>`).join("")}</div></div></div>`;
      v.querySelector(".tiras").addEventListener("click", ev => { const b = ev.target.closest("button"); if (b) { k = +b.dataset.k; pinta(); } });
    };
    pinta();
  }
  function mostrarReferencias() {
    const origen = $("#btn-refs");
    expandir(origen, `<div class="refs"><div class="k">Referencias bibliográficas</div><h3 style="font-size:32px;margin:8px 0 6px">Fuentes citadas en el trabajo</h3><p class="lead">Listado tomado del documento de grado.</p><ol>${R.map(r => `<li>${r}</li>`).join("")}</ol></div>`);
  }

  // ── Eventos ───────────────────────────────────────────────────
  bento.addEventListener("click", e => {
    const b = e.target.closest(".b"); if (!b) return;
    if (b.dataset.foto) { actual = 8; pintar(); const p = P[7], origen = bento.querySelector('.b[data-n="8"]'); const ex = expandir(b, LAYOUT.proyectos(p, b.dataset.foto), ""); pintarProyecto(b.dataset.foto); $("#tabs", ex).addEventListener("click", ev => { const t = ev.target.closest("button"); if (!t) return; $("#tabs .on", ex)?.classList.remove("on"); t.classList.add("on"); pintarProyecto(t.dataset.p); }); void origen; }
    else { actual = +b.dataset.n; pintar(); mostrarPaso(actual); }
  });
  $("#comenzar").onclick = () => { $("#bento").scrollIntoView({ behavior: "smooth", block: "start" }); setTimeout(() => ir(1, true), 450); };
  $("#btn-refs").onclick = mostrarReferencias;
  puntos.addEventListener("click", e => { const b = e.target.closest("button"); if (b) ir(+b.dataset.n); });
  ant.onclick = () => ir(actual - 1); sig.onclick = () => ir(actual + 1);
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); if (e.key === "ArrowRight") ir(actual + 1); if (e.key === "ArrowLeft") ir(actual - 1); });
  window.addEventListener("resize", () => document.documentElement.style.setProperty("--nav-h", $(".nav").offsetHeight + "px"));
  pintar();

  // Enlaces directos: ?paso=8 o ?proyecto=cava
  const q = new URLSearchParams(location.search);
  if (q.get("paso")) setTimeout(() => ir(+q.get("paso"), true), 300);
  if (q.get("proyecto") && PR[q.get("proyecto")]) setTimeout(() => { const b = bento.querySelector(`.b[data-foto="${q.get("proyecto")}"]`); if (b) b.click(); else { actual = 8; pintar(); mostrarPaso(8, q.get("proyecto")); } }, 300);
  if (q.get("ciclo")) setTimeout(() => ciclo.querySelector(`.c[data-i="${q.get("ciclo")}"]`).classList.add("activo"), 300);
})();
