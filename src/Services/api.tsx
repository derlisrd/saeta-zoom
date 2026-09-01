import { supabase } from './supabase';

// =====================================================
// HELPER: Parsear cláusulas where del formato legacy
// Formato: "field,operator,value,and,field2,operator2,value2"
// =====================================================
function parseWhere(where: string): { column: string; op: string; value: string }[] {
  if (!where) return [];
  const parts = where.split(',').map(p => p.trim());
  const conditions: { column: string; op: string; value: string }[] = [];
  let i = 0;
  while (i < parts.length) {
    if (parts[i].toLowerCase() === 'and' || parts[i].toLowerCase() === 'or') {
      i++;
      continue;
    }
    if (i + 2 < parts.length) {
      conditions.push({
        column: parts[i],
        op: parts[i + 1],
        value: parts[i + 2].replace(/^['"]|['"]$/g, ''),
      });
      i += 3;
    } else {
      break;
    }
  }
  return conditions;
}

// =====================================================
// HELPER: Aplicar filtros where a un query builder
// =====================================================
function applyWhere(builder: any, conditions: { column: string; op: string; value: string }[]) {
  for (const c of conditions) {
    switch (c.op) {
      case '=':
        builder = builder.eq(c.column, c.value);
        break;
      case '!=':
      case '<>':
        builder = builder.neq(c.column, c.value);
        break;
      case '>':
        builder = builder.gt(c.column, c.value);
        break;
      case '>=':
        builder = builder.gte(c.column, c.value);
        break;
      case '<':
        builder = builder.lt(c.column, c.value);
        break;
      case '<=':
        builder = builder.lte(c.column, c.value);
        break;
      case 'like':
        builder = builder.like(c.column, c.value);
        break;
      case 'ilike':
        builder = builder.ilike(c.column, c.value);
        break;
      case 'in':
        builder = builder.in(c.column, c.value.split(','));
        break;
      case 'between':
        // Necesita el siguiente valor
        break;
      default:
        builder = builder.eq(c.column, c.value);
    }
  }
  return builder;
}

// =====================================================
// HELPER: Parsear sort del formato legacy
// Formato: "field1,-field2" (- = ASC, sin prefijo = DESC)
// =====================================================
function parseSort(sort: string): { column: string; ascending: boolean }[] {
  if (!sort) return [];
  return sort.split(',').map(s => {
    const trimmed = s.trim();
    if (trimmed.startsWith('-')) {
      return { column: trimmed.substring(1), ascending: true };
    }
    return { column: trimmed, ascending: false };
  });
}

// =====================================================
// HELPER: Parsear include (JOINs) a selects de Supabase
// Mapeo de relaciones FK -> nombres de relación
// =====================================================
const RELATION_MAP: Record<string, Record<string, string>> = {
  pedidos: {
    clientes: 'clientes:id_cliente',
    users: 'profiles:user_id_pedido',
    profiles: 'profiles:user_id_pedido',
  },
  pedidos_items: {
    pedidos: 'pedidos:id_pedido',
    productos: 'productos:id_producto',
  },
  facturas: {
    clientes: 'clientes:id_cliente',
    users: 'profiles:user_id',
    profiles: 'profiles:user_id',
  },
  facturas_items: {
    productos: 'productos:id_producto',
    facturas: 'facturas:id_factura',
  },
  recibos: {
    clientes: 'clientes:id_cliente_recibo',
  },
  recibos_items: {
    recibos: 'recibos:id_recibo',
  },
  recetas: {
    pedidos: 'pedidos:id_pedido_receta',
  },
  productos_depositos: {
    depositos: 'depositos:id_deposito',
    productos: 'productos:id_producto',
  },
  recibo_pedidos: {
    profiles: 'profiles:generado_por',
    clientes: 'clientes:cliente_id_recibo',
  },
  recibo_pedidos_items: {
    recibo_pedidos: 'recibo_pedidos:id_recibo_pedido',
  },
  descuentos: {
    clientes: 'clientes:cliente_id_descuento',
    productos: 'productos:producto_id_descuento',
  },
  permisos_users: {
    permisos: 'permisos:id_permiso_permiso',
  },
  clientes: {},
  proveedors: {},
  empleados: {},
  categorias: {},
  depositos: {},
  productos: {
    categorias: 'categorias:id_categoria_producto',
  },
  empresas: {},
  permisos: {},
  monedas: {},
  users_registros: {},
};

function buildSelectFields(include: string, table: string): string {
  if (!include) return '*';
  const includes = include.split(',').map(i => i.trim());
  const relations = RELATION_MAP[table] || {};
  const fields = ['*'];
  for (const inc of includes) {
    const relName = relations[inc] || inc;
    fields.push(relName);
  }
  return fields.join(', ');
}

// =====================================================
// APICALLER - Interfaz compatible con el código existente
// =====================================================
export const APICALLER = {
  // Login con Supabase Auth
  login: async (datas: { username_user: string; password_user: string }) => {
    try {
      // Buscar el perfil por username para obtener el email
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', datas.username_user)
        .single();

      if (profileError || !profile) {
        return { results: null, response: false, message: 'Usuario no encontrado', error_code: 1 };
      }

      // Login con Supabase Auth usando el email del perfil
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        password: datas.password_user,
      });

      if (authError || !authData) {
        return { results: null, response: false, message: 'Credenciales incorrectas', error_code: 2 };
      }

      // Registrar login
      await supabase.from('users_registros').insert({
        id_user_registro: profile.id,
      });

      // Retornar en formato compatible
      return {
        response: true,
        found: 1,
        results: [{
          token_user: authData.session.access_token,
          id_user: profile.id,
          nombre_user: profile.nombre,
          rol_user: profile.rol,
          username_user: profile.username,
        }],
      };
    } catch (error) {
      console.error('Login error:', error);
      return { results: null, response: false, message: (error as Error).message };
    }
  },

  // Registrar usuario con Supabase Auth
  register: async ({ datos }: { datos: any }) => {
    try {
      // Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: datos.email_user || `${datos.username_user}@zoom.local`,
        password: datos.password_user,
        options: {
          data: {
            nombre: datos.nombre_user,
            username: datos.username_user,
            rol: datos.rol_user || 2,
          },
        },
      });

      if (authError) {
        return { results: null, response: false, message: authError.message };
      }

      // Crear perfil
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user?.id,
        nombre: datos.nombre_user,
        username: datos.username_user,
        rol: datos.rol_user || 2,
        estado: datos.estado_user || 1,
      });

      if (profileError) {
        return { results: null, response: false, message: profileError.message };
      }

      return { response: true, last_id: authData.user?.id };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  },

  // Validar token (Supabase maneja esto automáticamente)
  validateToken: async (_token: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        return { response: true };
      }
      return { response: false };
    } catch {
      return { response: false };
    }
  },

  // Revalidar token (Supabase maneja esto automáticamente)
  ReValidateToken: async (_token: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        await supabase.auth.refreshSession();
        return { response: true };
      }
      return { response: false };
    } catch {
      return { response: false };
    }
  },

  // Confirmar contraseña
  confirmPassword: async (datas: { username_user: string; password_user: string }) => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', datas.username_user)
        .single();

      if (!profile) {
        return { response: false };
      }

      // Intentar login para verificar contraseña
      const { error } = await supabase.auth.signInWithPassword({
        password: datas.password_user,
      });

      return { response: !error };
    } catch {
      return { response: false };
    }
  },

  // Actualizar contraseña
  updatePassword: async (datas: { password_user: string }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: datas.password_user,
      });
      return { response: !error };
    } catch {
      return { response: false };
    }
  },

  // GET - Consulta genérica
  get: async ({
    table,
    sort = '',
    pagenumber = '',
    pagesize = '',
    fields = '',
    where = '',
    include = '',
    on = '',
    filtersSearch = '',
    filtersField = '',
  }: {
    table: string;
    sort?: string;
    pagenumber?: string;
    pagesize?: string;
    fields?: string;
    where?: string;
    include?: string;
    on?: string;
    filtersSearch?: string;
    filtersField?: string;
  }) => {
    try {
      const selectFields = buildSelectFields(include, table);
      let query = supabase.from(table).select(selectFields, { count: 'exact' });

      // Aplicar filtros where
      if (where) {
        const conditions = parseWhere(where);
        query = applyWhere(query, conditions);
      }

      // Aplicar búsqueda
      if (filtersSearch && filtersField) {
        const searchFields = filtersField.split(',').map(f => f.trim());
        const searchConditions = searchFields.map(f => `${f}.ilike.%${filtersSearch}%`);
        query = query.or(searchConditions.join(','));
      }

      // Aplicar ordenamiento
      if (sort) {
        const sorts = parseSort(sort);
        for (const s of sorts) {
          query = query.order(s.column, { ascending: s.ascending });
        }
      }

      // Aplicar paginación
      if (pagesize) {
        const size = parseInt(pagesize);
        const page = pagenumber ? parseInt(pagenumber) : 0;
        const from = page * size;
        const to = from + size - 1;
        query = query.range(from, to);
      }

      // Campos específicos (cuando no hay include)
      if (fields && !include) {
        const fieldList = fields.split(',').map(f => f.trim());
        query = supabase.from(table).select(fieldList.join(', '), { count: 'exact' });
        if (where) {
          const conditions = parseWhere(where);
          query = applyWhere(query, conditions);
        }
        if (sort) {
          const sorts = parseSort(sort);
          for (const s of sorts) {
            query = query.order(s.column, { ascending: s.ascending });
          }
        }
        if (pagesize) {
          const size = parseInt(pagesize);
          const page = pagenumber ? parseInt(pagenumber) : 0;
          query = query.range(page * size, page * size + size - 1);
        }
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('GET error:', error);
        return { results: null, response: false, message: error.message, found: 0, total: 0 };
      }

      return {
        results: data,
        response: true,
        found: data?.length || 0,
        total: count || 0,
        first: data?.[0] || null,
      };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message, found: 0, total: 0 };
    }
  },

  // INSERT - Insertar registro
  insert: async ({ table, data }: { table: string; data: any }) => {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();

      if (error) {
        console.error('INSERT error:', error);
        return { results: null, response: false, message: error.message };
      }

      return { response: true, last_id: result?.id || result?.[`id_${table}`] || null, results: result };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  },

  // UPDATE - Actualizar registro
  update: async ({ table, data, id, idColumn }: { table: string; data: any; id: any; idColumn?: string }) => {
    try {
      const column = idColumn || `id_${table.replace(/s$/, '')}`;
      const { error } = await supabase
        .from(table)
        .update(data)
        .eq(column, id);

      if (error) {
        console.error('UPDATE error:', error);
        return { results: null, response: false, message: error.message };
      }

      return { response: true };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  },

  // UPSERT - Insertar o actualizar
  updateOrInsert: async ({ table, data, id, idColumn }: { table: string; data: any; id?: any; idColumn?: string }) => {
    try {
      if (id) {
        const column = idColumn || `id_${table.replace(/s$/, '')}`;
        const { error } = await supabase
          .from(table)
          .update(data)
          .eq(column, id);

        if (error) {
          return { results: null, response: false, message: error.message };
        }
        return { response: true };
      } else {
        const { data: result, error } = await supabase
          .from(table)
          .upsert(data)
          .select()
          .single();

        if (error) {
          return { results: null, response: false, message: error.message };
        }
        return { response: true, last_id: result?.id || null, results: result };
      }
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  },

  // DELETE - Eliminar registro
  delete: async ({ table, id, idColumn }: { table: string; id: any; idColumn?: string }) => {
    try {
      const column = idColumn || `id_${table.replace(/s$/, '')}`;
      const { error } = await supabase
        .from(table)
        .delete()
        .eq(column, id);

      if (error) {
        console.error('DELETE error:', error);
        return { results: null, response: false, message: error.message };
      }

      return { response: true };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  },

  // DELETE con condición personalizada
  deleteWhere: async ({ table, conditions }: { table: string; conditions: Record<string, any> }) => {
    try {
      let query = supabase.from(table).delete();
      for (const [key, value] of Object.entries(conditions)) {
        query = query.eq(key, value);
      }
      const { error } = await query;

      if (error) {
        return { results: null, response: false, message: error.message };
      }
      return { response: true };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  },
};

// =====================================================
// STORAGE - Funciones para manejo de archivos
// =====================================================
export const STORAGE = {
  uploadImage: async (bucket: string, path: string, file: File) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: true });

      if (error) {
        return { response: false, message: error.message };
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path);

      return { response: true, url: urlData.publicUrl };
    } catch (error) {
      return { response: false, message: (error as Error).message };
    }
  },

  deleteImage: async (bucket: string, paths: string[]) => {
    try {
      const { error } = await supabase.storage
        .from(bucket)
        .remove(paths);

      if (error) {
        return { response: false, message: error.message };
      }
      return { response: true };
    } catch (error) {
      return { response: false, message: (error as Error).message };
    }
  },

  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    return data.publicUrl;
  },
};

export default APICALLER;
