export const FavoritosView = {
  renderFavoritos(lista) {
    const contenedor = document.getElementById("favoritos-lista");
    contenedor.innerHTML = "";

    lista.forEach(fav => {
      const div = document.createElement("div");
      div.classList.add("favorito-item");
      div.innerHTML = `
        <p><strong>${fav.nombre}</strong> - ${fav.deporte} (${fav.pais})</p>
        <button class="eliminar-btn" data-id="${fav.id}">❌ Eliminar</button>
      `;
      contenedor.appendChild(div);
    });
  },

  obtenerDatosFormulario() {
    return {
      nombre: document.getElementById("nombre").value,
      deporte: document.getElementById("deporte").value,
      pais: document.getElementById("pais").value
    };
  },

  limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("deporte").value = "";
    document.getElementById("pais").value = "";
  }
};
