import { InsertPedidoModel } from "@/core/models/insert-pedido-model";
import { querylib } from "../libs/query-lib";
import { PedidosInsertAdapter } from "@/core/adapters/pedidos-insert-adapter";



type ListaFacturasParams = {
  desde: string | null;
  hasta: string | null;
};

export const apiPedidos = {
  insert: async (pedido: InsertPedidoModel) => {

      const { data, error } = await querylib
        .from("pedidos")
        .insert([pedido])
        .select();

        if (error) {
          throw new Error(error.message);
        }
        return PedidosInsertAdapter.fromApiToJson(data);

  },
  lista: async ({ desde, hasta }: ListaFacturasParams) => {
    const { error, data } = await querylib
      .from("pedidos")
      .select(
        `*,
        clientes(nombre),
        usuarios(nombre)
        `
      )
      .gte("fecha", desde)
      .lte("fecha", hasta)
      .order("id", { ascending: false });
    //.order('facturas.id',{ ascending: false })
    //.limit(10);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
};
