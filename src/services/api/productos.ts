import { ProductoBusquedaModel } from "@/core/models/producto-busqueda-model";
import { querylib } from "../libs/query-lib";

export const apiProductos = {
  lista: async () => {
    const { error, data } = await querylib.from("productos").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  buscar: async (q: string) => {
    const { error, data } = await querylib
      .from("productos")
      .select("*")
      .like("codigo", `%${q}%`)
    if (error) {
      throw new Error(error.message);
    }
    return data as ProductoBusquedaModel[];
  }
};