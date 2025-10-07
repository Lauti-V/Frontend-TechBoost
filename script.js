/* ===============================
   Datos de recursos (catálogo)
=================================*/
const recursos = [
  {
    id: 1,
    titulo: "Claves para Windows 10/11",
    categoria: "Claves",
    nivel: "Inicial",
    img: "../img/windows_llave.jpg",
    resumen: "Pasos simples para mejorar rendimiento, limpieza temporal y arranque.",
    pasos: [
      "Desinstalar bloatware innecesario.",
      "Limpiar temporales (Win + R → %temp%).",
      "Desactivar apps en segundo plano innecesarias.",
      "Actualizar drivers y Windows Update.",
      "Comprobar estado del disco (TRIM/SMART)."
    ]
  },
  {
    id: 2,
    titulo: "Cuidados esenciales para tu notebook",
    categoria: "Hardware",
    nivel: "Inicial",
    img: "../img/notebook.jpeg", // OJO: .jpeg según tu carpeta
    resumen: "Consejos prácticos para prolongar la vida útil de tu notebook.",
    pasos: [
      "Usar base refrigerante.",
      "Evitar obstruir ventilaciones.",
      "Limpieza periódica del polvo.",
      "Cuidar ciclos de carga de la batería."
    ]
  },
  {
    id: 3,
    titulo: "Optimización básica de Windows 11",
    categoria: "Optimización",
    nivel: "Intermedio",
    img: "../img/windows_opt.jpg",
    resumen: "Servicios, inicio, desbloat, drivers y ajustes visuales.",
    pasos: [
      "Deshabilitar apps en inicio.",
      "Configurar servicios innecesarios.",
      "Aplicar desbloat con scripts confiables.",
      "Actualizar drivers y GPU.",
      "Crear punto de restauración."
    ]
  },
  {
    id: 4,
    titulo: "Instalar paquete de Office",
    categoria: "Software",
    nivel: "Inicial",
    img: "../img/office_instalar.jpg",
    resumen: "Guía para descargar, instalar y activar Microsoft Office correctamente.",
    pasos: [
      "Descargar instalador oficial.",
      "Ejecutar e instalar la edición deseada.",
      "Aplicar activación segura.",
      "Verificar licencia/funcionamiento."
    ]
  }
];

/* ===============================
   Render catálogo (cards)
=================================*/
function renderRecursos() {
  const grid = document.getElementById("grid-recursos");
  if (!grid) return;

  grid.innerHTML = recursos.map(r => `
    <article class="card">
      <img src="${r.img}" alt="${r.titulo}" onerror="this.src='../img/windows_llave.jpg'">
      <div class="pad">
        <h3>${r.titulo}</h3>
        <p class="muted">${r.categoria} · ${r.nivel}</p>
        <p>${r.resumen}</p>
        <a href="producto.html?id=${r.id}" class="btn">Leer más</a>
      </div>
    </article>
  `).join("");
}

/* ===============================
   Render tabla
=================================*/
function renderTabla() {
  const tbody = document.getElementById("tbody-recursos");
  if (!tbody) return;

  tbody.innerHTML = recursos.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${r.titulo}</td>
      <td>${r.categoria}</td>
      <td>${r.nivel}</td>
      <td><a class="btn" href="producto.html?id=${r.id}">Ver ficha</a></td>
    </tr>
  `).join("");
}

/* ===============================
   Render ficha (detalle)
=================================*/
function renderProducto() {
  const cont = document.getElementById("ficha");
  if (!cont) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const item = recursos.find(r => r.id === id);

  if (!item) {
    cont.innerHTML = "<p>No se encontró el recurso solicitado.</p>";
    return;
  }

  cont.innerHTML = `
    <img src="${item.img}" alt="${item.titulo}" onerror="this.src='../img/windows_llave.jpg'">
    <div>
      <h2>${item.titulo}</h2>
      <p><strong>Categoría:</strong> ${item.categoria}</p>
      <p><strong>Nivel:</strong> ${item.nivel}</p>
      <p>${item.resumen}</p>
      <h3>Pasos</h3>
      <ul>${item.pasos.map(p => `<li>${p}</li>`).join("")}</ul>
      <a href="listado_box.html" class="btn">Volver</a>
    </div>
  `;
}

/* ===============================
   Login visual (mostrar/ocultar)
=================================*/
function actualizarNavegacion() {
  const email = localStorage.getItem("usuario");
  const navLogin = document.getElementById("nav-login");
  const navPerfil = document.getElementById("nav-perfil");
  if (!navLogin || !navPerfil) return;
  if (email) { navLogin.style.display = "none"; navPerfil.style.display = "inline-block"; }
  else { navLogin.style.display = "inline-block"; navPerfil.style.display = "none"; }
}

/* ===============================
   Init
=================================*/
document.addEventListener("DOMContentLoaded", () => {
  renderRecursos();
  renderTabla();
  renderProducto();
  actualizarNavegacion();
});
