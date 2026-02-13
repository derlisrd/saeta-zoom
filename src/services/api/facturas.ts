import { querylib } from "../libs/query-lib";

export const apiFacturas = {
  lista: async () => {
    const { error, data } = await querylib
      .from("facturas")
      .select(`id, condicion, fecha,estado,fecha_cobro, forma_pago, numero, total,pagado, usuario_id, 
        usuarios(id,nombre),
        cliente_id, clientes( id, nombre, ruc )`)
    .order("id", { ascending: false })
    //.order('facturas.id',{ ascending: false })
    //.limit(10);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
};
