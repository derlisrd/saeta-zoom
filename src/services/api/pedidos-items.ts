
import { InsertPedidoItemModel } from "@/core/models/insert-pedido-item-model";
import { querylib } from "../libs/query-lib";


export const apiPedidosItems = {
  insert: async (items: InsertPedidoItemModel[]) => {

      const { data, error } = await querylib
        .from("pedidos_items")
        .insert(items)
        .select();

        if (error) {
          throw new Error(error.message);
        }
        return data;

  },

};
