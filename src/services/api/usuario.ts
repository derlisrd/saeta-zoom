import { querylib } from "../libs/query-lib";

export const apiUsuarios = {
  signIn: async (username: string, password: string) => {
    const { data: usuario, error} = await querylib
        .from('usuarios')
        .select('email')
        .eq('username', username)
        .single()

      if (error || !usuario) {
        throw new Error('Usuario no encontrado')
      }
      const { data, error: signInError } = await querylib.auth.signInWithPassword({
        email: usuario.email,
        password: password,
      })

    if (signInError) {
      throw new Error('Ha ocurrido un error: ' + signInError);
    }
    return data;
  },
};