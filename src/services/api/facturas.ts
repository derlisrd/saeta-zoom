import { querylib } from "../libs/query-lib";

export const apiFacturas = {
  lista: async () => {
    const { error, data } = await querylib.from("facturas").select("*").order("id", { ascending: false });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
};