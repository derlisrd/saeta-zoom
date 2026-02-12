import { querylib } from "../libs/query-lib";

export const apiPermisos = {
    getPermisos: async (user_id: string) => {
        const { error, data } = await querylib.from('usuarios')
          .select('username, is_admin')
          .eq('user_id', user_id)
          .single();

            if (error) {
              throw new Error(error.message);
            }
            return data;
    }
}