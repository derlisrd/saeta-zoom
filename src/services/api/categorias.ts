import { querylib } from "../libs/query-lib";

export const apiCategorias = {
    lista: async () => {
        const { error, data } = await querylib.from("categorias").select("*");
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
}