import { createClient } from "https://esm.sh/@supabase/supabase-js";

const SUPABASE_URL = "https://<TU-PROJECT>.supabase.co";
const SUPABASE_ANON_KEY = "<TU-ANON-KEY>";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const FavoritosModel = {
  async obtenerFavoritos() {
    let { data, error } = await supabase.from("favoritos").select("*");
    if (error) console.error("Error al obtener favoritos:", error);
    return data || [];
  },

  async agregarFavorito(nombre, deporte, pais) {
    const { data, error } = await supabase.from("favoritos").insert([{ nombre, deporte, pais }]);
    if (error) console.error("Error al agregar favorito:", error);
    return data;
  },

  async eliminarFavorito(id) {
    const { error } = await supabase.from("favoritos").delete().eq("id", id);
    if (error) console.error("Error al eliminar favorito:", error);
  }
};
