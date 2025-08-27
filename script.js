// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBd9kFVsiQJ-hBYr5ESZGYags8feT15XK0",
  authDomain: "formulariopc-d97df.firebaseapp.com",
  databaseURL: "https://formulariopc-d97df-default-rtdb.firebaseio.com",
  projectId: "formulariopc-d97df",
  storageBucket: "formulariopc-d97df.appspot.com",
  messagingSenderId: "950263205159",
  appId: "1:950263205159:web:364e62b539f510ef346d02",
  measurementId: "G-ZLRQLWRL58"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function getFormData() {
  return {
    laboratorio: document.getElementById("laboratorio").value,
    numeroPC: document.getElementById("numPC").value,
    placa: {
      marca: document.getElementById("placaMarca").value,
      modelo: document.getElementById("placaModelo").value
    },
    procesador: {
      marca: document.getElementById("procMarca").value,
      modelo: document.getElementById("procModelo").value,
      generacion: document.getElementById("procGen").value
    },
    ram: {
      marca: document.getElementById("ramMarca").value,
      velocidad: document.getElementById("ramVelocidad").value,
      tipo: document.getElementById("ramTipo").value
    },
    almacenamiento: {
      tipo: document.getElementById("almTipo").value,
      marca: document.getElementById("almMarca").value,
      capacidad: document.getElementById("almCapacidad").value,
      formato: document.getElementById("almFormato").value
    },
    case: {
      marca: document.getElementById("caseMarca").value,
      tipo: document.getElementById("caseTipo").value,
      potencia: document.getElementById("casePotencia").value
    },
    monitor: {
      marca: document.getElementById("monitorMarca").value,
      conexion: document.getElementById("monitorConexion").value,
      tamaño: document.getElementById("monitorTam").value
    },
    teclado: {
      marca: document.getElementById("tecladoMarca").value,
      conexion: document.getElementById("tecladoConexion").value
    },
    mouse: {
      marca: document.getElementById("mouseMarca").value,
      conexion: document.getElementById("mouseConexion").value
    },
    software: {
      so: document.getElementById("so").value,
      office: document.getElementById("office").value,
      lenguaje: document.getElementById("lenguaje").value,
      bd: document.getElementById("bd").value,
      caseTool: document.getElementById("caseTool").value,
      navegador: document.getElementById("navegador").value
    },
    otros: {
      estado: document.getElementById("estado").value,
      estabilizador: {
        marca: document.getElementById("estMarca").value,
        entradas: document.getElementById("estEntradas").value
      },
      antivirus: {
        nombre: document.getElementById("avNombre").value,
        vigencia: document.getElementById("avVigencia").value
      },
      internet: document.getElementById("internet").value
    }
  };
}

// Guardar datos (Crear/Editar según numeroPC)
document.getElementById("pcForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  let data = getFormData();
  if (!data.numeroPC) {
    alert("Debes ingresar el número de PC ⚠️");
    return;
  }

  try {
    await db.ref("pcs/" + data.numeroPC).set(data);
    alert("Guardado/Actualizado en Firebase ✅");
    document.getElementById("pcForm").reset();
  } catch (err) {
    console.error(err);
    alert("Error al guardar ❌");
  }
});

// Eliminar datos con prompt
document.getElementById("eliminarPC").addEventListener("click", async () => {
  const numPC = prompt("Ingrese el número de PC a eliminar:");
  if (!numPC) return;

  try {
    await db.ref("pcs/" + numPC).remove();
    alert(`PC ${numPC} eliminada de Firebase 🗑️`);
    document.getElementById("pcForm").reset();
  } catch (err) {
    console.error(err);
    alert("Error al eliminar ❌");
  }
});

// Editar datos con prompt (rellena el formulario)
document.getElementById("editarPC").addEventListener("click", async () => {
  const numPC = prompt("Ingrese el número de PC a editar:");
  if (!numPC) return;

  try {
    const snapshot = await db.ref("pcs/" + numPC).once("value");
    if (!snapshot.exists()) {
      alert(`No existe la PC ${numPC} ⚠️`);
      return;
    }

    const d = snapshot.val();

    // Rellenar formulario con los datos
    document.getElementById("laboratorio").value = d.laboratorio || "";
    document.getElementById("numPC").value = d.numeroPC || "";
    document.getElementById("placaMarca").value = d.placa?.marca || "";
    document.getElementById("placaModelo").value = d.placa?.modelo || "";
    document.getElementById("procMarca").value = d.procesador?.marca || "";
    document.getElementById("procModelo").value = d.procesador?.modelo || "";
    document.getElementById("procGen").value = d.procesador?.generacion || "";
    document.getElementById("ramMarca").value = d.ram?.marca || "";
    document.getElementById("ramVelocidad").value = d.ram?.velocidad || "";
    document.getElementById("ramTipo").value = d.ram?.tipo || "";
    document.getElementById("almTipo").value = d.almacenamiento?.tipo || "";
    document.getElementById("almMarca").value = d.almacenamiento?.marca || "";
    document.getElementById("almCapacidad").value = d.almacenamiento?.capacidad || "";
    document.getElementById("almFormato").value = d.almacenamiento?.formato || "";
    document.getElementById("caseMarca").value = d.case?.marca || "";
    document.getElementById("caseTipo").value = d.case?.tipo || "";
    document.getElementById("casePotencia").value = d.case?.potencia || "";
    document.getElementById("monitorMarca").value = d.monitor?.marca || "";
    document.getElementById("monitorConexion").value = d.monitor?.conexion || "";
    document.getElementById("monitorTam").value = d.monitor?.tamaño || "";
    document.getElementById("tecladoMarca").value = d.teclado?.marca || "";
    document.getElementById("tecladoConexion").value = d.teclado?.conexion || "";
    document.getElementById("mouseMarca").value = d.mouse?.marca || "";
    document.getElementById("mouseConexion").value = d.mouse?.conexion || "";
    document.getElementById("so").value = d.software?.so || "";
    document.getElementById("office").value = d.software?.office || "";
    document.getElementById("lenguaje").value = d.software?.lenguaje || "";
    document.getElementById("bd").value = d.software?.bd || "";
    document.getElementById("caseTool").value = d.software?.caseTool || "";
    document.getElementById("navegador").value = d.software?.navegador || "";
    document.getElementById("estado").value = d.otros?.estado || "";
    document.getElementById("estMarca").value = d.otros?.estabilizador?.marca || "";
    document.getElementById("estEntradas").value = d.otros?.estabilizador?.entradas || "";
    document.getElementById("avNombre").value = d.otros?.antivirus?.nombre || "";
    document.getElementById("avVigencia").value = d.otros?.antivirus?.vigencia || "";
    document.getElementById("internet").value = d.otros?.internet || "";

    alert(`Datos de PC ${numPC} cargados en el formulario ✍️`);
  } catch (err) {
    console.error(err);
    alert("Error al cargar datos ❌");
  }
});


// Descargar Excel
document.getElementById("descargarExcel").addEventListener("click", async () => {
  const snapshot = await db.ref("pcs").once("value");
  let rows = [];

  snapshot.forEach(child => {
    const d = child.val();
    let flat = {
      Laboratorio: d.laboratorio,
      "Número de PC": d.numeroPC || "",
      "Placa Marca": d.placa?.marca || "",
      "Placa Modelo": d.placa?.modelo || "",
      "Procesador Marca": d.procesador?.marca || "",
      "Procesador Modelo": d.procesador?.modelo || "",
      "Procesador Generación": d.procesador?.generacion || "",
      "RAM Marca": d.ram?.marca || "",
      "RAM Velocidad": d.ram?.velocidad || "",
      "RAM Tipo": d.ram?.tipo || "",
      "Almacenamiento Tipo": d.almacenamiento?.tipo || "",
      "Almacenamiento Marca": d.almacenamiento?.marca || "",
      "Almacenamiento Capacidad": d.almacenamiento?.capacidad || "",
      "Almacenamiento Formato": d.almacenamiento?.formato || "",
      "Case Marca": d.case?.marca || "",
      "Case Tipo": d.case?.tipo || "",
      "Case Potencia": d.case?.potencia || "",
      "Monitor Marca": d.monitor?.marca || "",
      "Monitor Conexión": d.monitor?.conexion || "",
      "Monitor Tamaño": d.monitor?.tamaño || "",
      "Teclado Marca": d.teclado?.marca || "",
      "Teclado Conexión": d.teclado?.conexion || "",
      "Mouse Marca": d.mouse?.marca || "",
      "Mouse Conexión": d.mouse?.conexion || "",
      "SO Versión": d.software?.so || "",
      "Office Versión": d.software?.office || "",
      "Lenguaje": d.software?.lenguaje || "",
      "Base de Datos": d.software?.bd || "",
      "Herramienta CASE": d.software?.caseTool || "",
      "Navegador": d.software?.navegador || "",
      "Estado": d.otros?.estado || "",
      "Estabilizador Marca": d.otros?.estabilizador?.marca || "",
      "Estabilizador Entradas": d.otros?.estabilizador?.entradas || "",
      "Antivirus Nombre": d.otros?.antivirus?.nombre || "",
      "Antivirus Vigencia": d.otros?.antivirus?.vigencia || "",
      "Internet": d.otros?.internet || ""
    };
    rows.push(flat);
  });

  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, "Inventario");
  XLSX.writeFile(wb, "inventario.xlsx");
});