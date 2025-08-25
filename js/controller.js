import { FavoritosModel } from "./model.js";
import { FavoritosView } from "./view.js";

const cargarFavoritos = async () => {
  const favoritos = await FavoritosModel.obtenerFavoritos();
  FavoritosView.renderFavoritos(favoritos);
};

const agregarFavorito = async (event) => {
  event.preventDefault();
  const { nombre, deporte, pais } = FavoritosView.obtenerDatosFormulario();
  await FavoritosModel.agregarFavorito(nombre, deporte, pais);
  FavoritosView.limpiarFormulario();
  cargarFavoritos();
};

const eliminarFavorito = async (event) => {
  if (event.target.classList.contains("eliminar-btn")) {
    const id = event.target.getAttribute("data-id");
    await FavoritosModel.eliminarFavorito(id);
    cargarFavoritos();
  }
};

export const init = () => {
  document.getElementById("favorito-form").addEventListener("submit", agregarFavorito);
  document.getElementById("favoritos-lista").addEventListener("click", eliminarFavorito);
  cargarFavoritos();
};
