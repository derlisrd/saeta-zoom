import { querylib } from "../libs/query-lib";



type ListaFacturasParams = {
  desde: string | null;
  hasta: string | null;
};

export const apiPedidos = {
  lista: async ({desde, hasta}: ListaFacturasParams) => {
    const { error, data } = await querylib
      .from("pedidos")
      .select(`*,
        clientes(nombre),
        usuarios(nombre)
        `)
        .gte("fecha", desde)    
      .lte("fecha", hasta)  
    .order("id", { ascending: false })
    //.order('facturas.id',{ ascending: false })
    //.limit(10);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
};
