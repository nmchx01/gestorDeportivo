// ===== Configuración de Supabase =====
const { createClient } = supabase;
const supabaseUrl = "https://lmikjnqplfcllpykzgjp.supabase.co";   // <-- Cambia esto
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtaWtqbnFwbGZjbGxweWt6Z2pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDEzODcsImV4cCI6MjA3MTcxNzM4N30.cu0MnL-ZlzKWh-DgesPFGeLyyIXhtH3oQIME3pR_5_U";                        // <-- Cambia esto
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// ===== Referencias en el DOM =====
const form = document.getElementById("favoritoForm");
const nombreInput = document.getElementById("nombre");
const deporteInput = document.getElementById("deporte");
const listaFavoritos = document.getElementById("favoritosList");

// ===== Función para mostrar favoritos =====
async function cargarFavoritos() {
  listaFavoritos.innerHTML = "";
  let { data: favoritos, error } = await supabaseClient
    .from("favoritos")
    .select("*");

  if (error) {
    console.error("Error al cargar favoritos:", error.message);
    return;
  }

  favoritos.forEach(fav => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${fav.nombre} - <strong>${fav.deporte}</strong>
      <button class="delete-btn" onclick="eliminarFavorito(${fav.id})">X</button>
    `;
    listaFavoritos.appendChild(li);
  });
}

// ===== Función para agregar favorito =====
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = nombreInput.value.trim();
  const deporte = deporteInput.value.trim();

  if (!nombre || !deporte) return;

  const { error } = await supabaseClient
    .from("favoritos")
    .insert([{ nombre, deporte }]);

  if (error) {
    console.error("Error al agregar:", error.message);
  } else {
    nombreInput.value = "";
    deporteInput.value = "";
    cargarFavoritos();
  }
});

// ===== Función para eliminar favorito =====
async function eliminarFavorito(id) {
  const { error } = await supabaseClient
    .from("favoritos")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error al eliminar:", error.message);
  } else {
    cargarFavoritos();
  }
}

// ===== Inicializar =====
cargarFavoritos();
