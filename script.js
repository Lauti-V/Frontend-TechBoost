/* ===============================
   CONFIG / CONSTANTES
=================================*/
const ADMIN_EMAIL = "veralautharo@gmail.com";

/* ===============================
   UTILIDADES DE USUARIO
=================================*/
const getUser = () => localStorage.getItem("usuario") || "";
const setUser = (email) => localStorage.setItem("usuario", email);
const clearUser = () => localStorage.removeItem("usuario");
const isAdmin = () => getUser().toLowerCase() === ADMIN_EMAIL.toLowerCase();

/* ===============================
   NAV (mostrar Ingresar / Mi Perfil)
=================================*/
function actualizarNavegacion() {
  const navLogin = document.getElementById("nav-login");
  const navPerfil = document.getElementById("nav-perfil");
  if (!navLogin || !navPerfil) return;
  if (getUser()) {
    navLogin.style.display = "none";
    navPerfil.style.display = "inline-block";
  } else {
    navLogin.style.display = "inline-block";
    navPerfil.style.display = "none";
  }
}

/* ===============================
   LOGIN PAGE
=================================*/
function bindLogin() {
  const btn = document.getElementById("login-btn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const email = (document.getElementById("login-email").value || "").trim();
    if (!email) { alert("Ingresá un email"); return; }
    setUser(email);
    // Volver a trabajos si es admin, o al inicio
    if (isAdmin()) location.href = "trabajos.html";
    else location.href = "../index.html";
  });
}

/* ===============================
   RECURSOS (catálogo / tabla / ficha)
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
    img: "../img/notebook.jpeg", // ojo: .jpeg en tu repo
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

function renderTablaRecursos() {
  const tbody = document.getElementById("tbody-recursos");
  if (!tbody) return;
  tbody.innerHTML = recursos.map((r,i) => `
    <tr>
      <td>${i+1}</td>
      <td>${r.titulo}</td>
      <td>${r.categoria}</td>
      <td>${r.nivel}</td>
      <td><a class="btn" href="producto.html?id=${r.id}">Ver ficha</a></td>
    </tr>
  `).join("");
}

function renderProducto() {
  const cont = document.getElementById("ficha");
  if (!cont) return;
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));
  const item = recursos.find(r => r.id === id);
  if (!item) { cont.innerHTML = "<p>No se encontró el recurso solicitado.</p>"; return; }
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
   TRABAJOS (localStorage)
=================================*/
const LS_WORKS = "tb_works_v1";

function getWorks() {
  try { return JSON.parse(localStorage.getItem(LS_WORKS)) || []; }
  catch { return []; }
}
function setWorks(arr) { localStorage.setItem(LS_WORKS, JSON.stringify(arr)); }

function seedWorksIfEmpty() {
  const cur = getWorks();
  if (cur.length) return;
  setWorks([
    {
      id: Date.now(),
      titulo: "Cambio de pantalla touch Notebook ACER",
      tipo: "Reparación",
      fecha: "2025-10-05",
      descripcion: "Cambio de flex y reemplazo de pantalla touch.",
      img: "../img/trabajo1.jpg",
      reel: ""
    },
    {
      id: Date.now()+1,
      titulo: "Limpieza + pasta térmica",
      tipo: "Mantenimiento",
      fecha: "2025-01-31",
      descripcion: "Limpieza interna, cambio de pasta y revisión general.",
      img: "../img/trabajo2.jpg",
      reel: ""
    }
  ]);
}

function fillWorkForm(w) {
  document.getElementById("w-id").value   = w?.id || "";
  document.getElementById("w-title").value= w?.titulo || "";
  document.getElementById("w-type").value = w?.tipo || "Reparación";
  document.getElementById("w-date").value = w?.fecha || "";
  document.getElementById("w-desc").value = w?.descripcion || "";
  document.getElementById("w-img").value  = w?.img || "../img/trabajo1.jpg";
  document.getElementById("w-reel").value = w?.reel || "";
}

function renderTrabajos() {
  const tbody = document.getElementById("tbody-works");
  if (!tbody) return;

  const works = getWorks().sort((a,b) => (a.fecha < b.fecha ? 1 : -1));
  const admin = isAdmin();

  const thAcc = document.getElementById("th-acciones");
  if (thAcc) thAcc.style.display = admin ? "" : "none";

  tbody.innerHTML = works.map((w,idx) => `
    <tr>
      <td>${idx+1}</td>
      <td>${w.titulo}</td>
      <td><span class="badge">${w.tipo}</span></td>
      <td>${formatDate(w.fecha)}</td>
      <td>${w.descripcion}</td>
      <td>${w.img ? `<img src="${w.img}" alt="" style="width:64px;height:48px;object-fit:cover;border-radius:6px">` : "-"}</td>
      <td>${w.reel ? `<a class="btn" href="${w.reel}" target="_blank">Ver</a>` : "-"}</td>
      <td ${admin ? "" : 'style="display:none"'}>
        <a class="btn" data-edit="${w.id}">Editar</a>
        <a class="btn" data-del="${w.id}">Eliminar</a>
      </td>
    </tr>
  `).join("");

  // listeners admin
  if (admin) {
    tbody.querySelectorAll("[data-edit]").forEach(a => {
      a.addEventListener("click", () => {
        const id = a.getAttribute("data-edit");
        const w = getWorks().find(x => String(x.id) === String(id));
        fillWorkForm(w);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    tbody.querySelectorAll("[data-del]").forEach(a => {
      a.addEventListener("click", () => {
        const id = a.getAttribute("data-del");
        if (!confirm("¿Eliminar este trabajo?")) return;
        const arr = getWorks().filter(x => String(x.id) !== String(id));
        setWorks(arr);
        renderTrabajos();
      });
    });
  }
}

function bindAdminUI() {
  const adminBox = document.getElementById("admin-box");
  if (adminBox) adminBox.style.display = isAdmin() ? "" : "none";
  // botones
  const btnClear = document.getElementById("w-clear");
  const btnSave  = document.getElementById("w-save");
  if (btnClear) btnClear.addEventListener("click", (e)=>{e.preventDefault(); fillWorkForm({});});
  if (btnSave) btnSave.addEventListener("click", (e)=>{
    e.preventDefault();
    const id   = document.getElementById("w-id").value.trim();
    const wNew = {
      id: id || Date.now(),
      titulo: (document.getElementById("w-title").value||"").trim(),
      tipo:   document.getElementById("w-type").value,
      fecha:  document.getElementById("w-date").value,
      descripcion: (document.getElementById("w-desc").value||"").trim(),
      img:    (document.getElementById("w-img").value||"").trim(),
      reel:   (document.getElementById("w-reel").value||"").trim()
    };
    if (!wNew.titulo || !wNew.fecha) { alert("Completá al menos Título y Fecha"); return; }
    const arr = getWorks();
    const i = arr.findIndex(x => String(x.id) === String(id));
    if (i >= 0) arr[i] = wNew; else arr.push(wNew);
    setWorks(arr);
    fillWorkForm({});
    renderTrabajos();
  });
}

/* ===============================
   HELPERS
=================================*/
function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("es-AR", { day:"2-digit", month:"2-digit", year:"numeric" });
}

/* ===============================
   INIT
=================================*/
document.addEventListener("DOMContentLoaded", () => {
  actualizarNavegacion();
  bindLogin();

  // Recursos (catálogo/tabla/ficha)
  renderRecursos();
  renderTablaRecursos();
  renderProducto();

  // Trabajos (solo en su página)
  if (document.getElementById("tbody-works")) {
    seedWorksIfEmpty();
    bindAdminUI();
    renderTrabajos();
  }
});
