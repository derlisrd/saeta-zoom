import { querylib } from "../libs/query-lib";

export const apiProductos = {
  lista: async () => {
    const { error, data } = await querylib.from("productos").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },
};