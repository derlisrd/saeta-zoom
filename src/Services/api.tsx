import { supabase } from './supabase';

// =====================================================
// HELPERS
// =====================================================

function stripQuotes(v: string): string {
  return v.trim().replace(/^['"]|['"]$/g, '');
}

// =====================================================
// HELPER: Parsear cláusulas where del formato legacy
// Formato: "field,operator,value,and,field2,operator2,value2"
// Soportado: =, !=, <>, >, >=, <, <=, like, ilike, in, between
// =====================================================
function parseWhere(where: string): { column: string; op: string; value: any }[] {
  if (!where) return [];
  const tokens = where.split(',').map(t => t.trim());
  const conditions: { column: string; op: string; value: any }[] = [];
  let i = 0;
  while (i < tokens.length) {
    const col = tokens[i];
    const op = (tokens[i + 1] || '').toLowerCase();

    if (op === 'between') {
      // col, between, v1, and, v2
      const v1 = stripQuotes(tokens[i + 2] || '');
      const v2 = stripQuotes(tokens[i + 4] || '');
      conditions.push({ column: col, op: 'between', value: [v1, v2] });
      i += 5;
    } else if (op === 'in') {
      // col, in, v1, v2, v3  (hasta and/or/fin)
      const vals: string[] = [];
      i += 2;
      while (i < tokens.length && tokens[i].toLowerCase() !== 'and' && tokens[i].toLowerCase() !== 'or') {
        vals.push(stripQuotes(tokens[i]));
        i++;
      }
      conditions.push({ column: col, op: 'in', value: vals });
    } else if (['=', '!=', '<>', '>', '>=', '<', '<=', 'like', 'ilike'].includes(op)) {
      conditions.push({ column: col, op, value: stripQuotes(tokens[i + 2] || '') });
      i += 3;
    } else {
      i += 1;
    }
  }
  return conditions;
}

// =====================================================
// HELPER: Aplicar filtros where a un query builder
// =====================================================
function applyWhere(builder: any, conditions: { column: string; op: string; value: any }[]) {
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
        builder = builder.in(c.column, c.value);
        break;
      case 'between':
        builder = builder.gte(c.column, c.value[0]).lte(c.column, c.value[1]);
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
// MAPA DE RELACIONES (JOINs manuales)
// table -> include -> { table, base (FK en tabla base), related (PK en relacionada), alias }
// El alias se usa para mapear users -> profiles (nombre -> nombre_user)
// =====================================================
const USERS_ALIAS: Record<string, string> = {
  id: 'id_user',
  nombre: 'nombre_user',
  username: 'username_user',
  rol: 'rol_user',
  estado: 'estado_user',
};

const RELATION_MAP: Record<string, Record<string, { table: string; base: string; related: string; alias?: Record<string, string> }>> = {
  pedidos: {
    clientes: { table: 'clientes', base: 'cliente_id_pedido', related: 'id_cliente' },
    users: { table: 'profiles', base: 'user_id_pedido', related: 'id', alias: USERS_ALIAS },
    profiles: { table: 'profiles', base: 'user_id_pedido', related: 'id', alias: USERS_ALIAS },
  },
  pedidos_items: {
    pedidos: { table: 'pedidos', base: 'pedido_id', related: 'id_pedido' },
    productos: { table: 'productos', base: 'producto_id_item', related: 'id_producto' },
    // Transitive: clientes se une via pedidos.cliente_id_pedido (previamente aplanado)
    clientes: { table: 'clientes', base: 'cliente_id_pedido', related: 'id_cliente' },
  },
  facturas: {
    clientes: { table: 'clientes', base: 'cliente_id', related: 'id_cliente' },
    users: { table: 'profiles', base: 'user_id', related: 'id', alias: USERS_ALIAS },
    profiles: { table: 'profiles', base: 'user_id', related: 'id', alias: USERS_ALIAS },
  },
  facturas_items: {
    productos: { table: 'productos', base: 'producto_id', related: 'id_producto' },
    facturas: { table: 'facturas', base: 'factura_id', related: 'id_factura' },
  },
  recibos: {
    clientes: { table: 'clientes', base: 'cliente_id_recibo', related: 'id_cliente' },
  },
  recibos_items: {
    facturas: { table: 'facturas', base: 'factura_id_recibo', related: 'id_factura' },
  },
  recibo_pedidos: {
    clientes: { table: 'clientes', base: 'cliente_id_recibo', related: 'id_cliente' },
  },
  recibo_pedidos_items: {
    pedidos: { table: 'pedidos', base: 'pedido_id_recibo', related: 'id_pedido' },
  },
  descuentos: {
    clientes: { table: 'clientes', base: 'cliente_id_descuento', related: 'id_cliente' },
    productos: { table: 'productos', base: 'producto_id_descuento', related: 'id_producto' },
  },
  productos: {
    categorias: { table: 'categorias', base: 'id_categoria_producto', related: 'id_categoria' },
  },
  productos_depositos: {
    depositos: { table: 'depositos', base: 'deposito_id', related: 'id_deposito' },
    productos: { table: 'productos', base: 'producto_id', related: 'id_producto' },
  },
  recetas: {
    pedidos: { table: 'pedidos', base: 'pedido_id_receta', related: 'id_pedido' },
  },
};

// =====================================================
// HELPER: PK de una tabla (singularize)
// =====================================================
function pkColumn(table: string): string {
  return `id_${table.replace(/s$/, '')}`;
}

function findIdInRow(row: any, table: string): any {
  if (!row) return null;
  const expected = pkColumn(table);
  if (row[expected] !== undefined) return row[expected];
  const idKey = Object.keys(row).find(k => k.startsWith('id_'));
  return idKey ? row[idKey] : (row.id ?? null);
}

// =====================================================
// APICALLER - Interfaz compatible con el código existente
// =====================================================
export const APICALLER = {
  // Login con Supabase Auth (usa email)
  login: async (datas: { email_user: string; password_user: string }) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: datas.email_user,
        password: datas.password_user,
      });

      if (authError || !authData) {
        return { results: null, response: false, message: 'Credenciales incorrectas', error_code: 2 };
      }

      const userId = authData.user?.id;

      // Buscar el perfil asociado al usuario autenticado
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // Registrar login
      await supabase.from('users_registros').insert({
        id_user_registro: userId,
      });

      // Retornar en formato compatible
      return {
        response: true,
        found: 1,
        results: [{
          token_user: authData.session.access_token,
          id_user: userId,
          nombre_user: profile?.nombre ?? '',
          rol_user: profile?.rol ?? 2,
          username_user: profile?.username ?? '',
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

  // GET - Consulta genérica con JOINs manuales
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
      // --- Agregado SUM ---
      const sumMatch = fields ? fields.match(/SUM\(([^)]+)\)\s+(?:as\s+)?(\w+)/i) : null;
      if (sumMatch) {
        const col = sumMatch[1].trim();
        const alias = sumMatch[2].trim();
        let query = supabase.from(table).select(col);
        if (where) {
          query = applyWhere(query, parseWhere(where));
        }
        const { data, error } = await query;
        if (error) {
          return { results: null, response: false, message: error.message, found: 0, total: 0 };
        }
        const total = (data || []).reduce((acc: number, r: any) => acc + (parseFloat(r[col]) || 0), 0);
        return { results: null, response: true, found: 0, total: 0, first: { [alias]: total } };
      }

      // --- Consulta base ---
      let query = supabase.from(table).select('*', { count: 'exact' });

      if (where) {
        query = applyWhere(query, parseWhere(where));
      }

      // Búsqueda por texto
      if (filtersSearch && filtersField) {
        const searchFields = filtersField.split(',').map(f => f.trim());
        const numeric = /^\d+$/.test(filtersSearch);
        const isNumericCol = (name: string) =>
          name.endsWith('_id') || name.startsWith('id_') ||
          name.startsWith('tipo_') || name.startsWith('estado_') ||
          name.startsWith('facturado_') || name.endsWith('_pago') ||
          name.startsWith('cantidad_') || name.startsWith('precio_') ||
          name.startsWith('stock_') || name.startsWith('rol_');
        const parts = searchFields.map(f => {
          const numCol = isNumericCol(f);
          if (numCol && numeric) return `${f}.eq.${filtersSearch}`;
          if (!numCol) return `${f}.ilike.%${filtersSearch}%`;
          return null;
        }).filter(Boolean) as string[];
        if (parts.length > 0) {
          query = query.or(parts.join(','));
        }
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

      const { data, error, count } = await query;

      if (error) {
        return { results: null, response: false, message: error.message, found: 0, total: 0 };
      }

      let rows = (data || []) as any[];

      // --- JOINs manuales ---
      if (include) {
        const includes = include.split(',').map(i => i.trim()).filter(Boolean);
        for (const inc of includes) {
          const rel = RELATION_MAP[table]?.[inc];
          if (!rel) continue;

          const baseVals = Array.from(new Set(
            rows
              .map(r => r?.[rel.base])
              .filter(v => v !== null && v !== undefined && v !== '' && v !== 0 && v !== '0')
          ));

          if (baseVals.length === 0) continue;

          const { data: relData } = await supabase
            .from(rel.table)
            .select('*')
            .in(rel.related, baseVals);

          const relMap: Record<string, any> = {};
          (relData || []).forEach(r => {
            relMap[String(r[rel.related])] = r;
          });

          rows = rows.map(r => {
            const related = relMap[String(r?.[rel.base])];
            if (!related) return r;
            const merged = { ...r };
            for (const [k, v] of Object.entries(related)) {
              const target = rel.alias?.[k] ?? k;
              if (merged[target] === undefined) {
                merged[target] = v;
              }
            }
            return merged;
          });
        }
      }

      return {
        results: rows,
        response: true,
        found: rows.length,
        total: count ?? rows.length,
        first: rows[0] ?? null,
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

      return { response: true, last_id: findIdInRow(result, table), results: result };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  },

  // UPDATE - Actualizar registro
  update: async ({ table, data, id, idColumn }: { table: string; data: any; id: any; idColumn?: string }) => {
    try {
      const column = idColumn || pkColumn(table);
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
        const column = idColumn || pkColumn(table);
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
        return { response: true, last_id: findIdInRow(result, table), results: result };
      }
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  },

  // DELETE - Eliminar registro (soporta id único o namecolumns/ids compuestos)
  delete: async ({ table, id, idColumn, namecolumns, ids }: { table: string; id?: any; idColumn?: string; namecolumns?: string; ids?: string }) => {
    try {
      let query = supabase.from(table).delete();

      if (namecolumns && ids) {
        const cols = namecolumns.split(',').map(c => c.trim());
        const vals = ids.split(',').map(v => v.trim());
        cols.forEach((c, idx) => {
          query = query.eq(c, vals[idx]);
        });
      } else {
        const column = idColumn || pkColumn(table);
        query = query.eq(column, id);
      }

      const { error } = await query;

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
