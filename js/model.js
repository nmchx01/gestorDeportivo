
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lmikjnqplfcllpykzgjp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


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
