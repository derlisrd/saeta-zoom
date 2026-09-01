import { supabase } from '../Services/supabase';

function useQuerys() {
  // Parsear where del formato legacy: "field,operator,value,and,..."
  const parseWhere = (where: string) => {
    if (!where) return {};
    const parts = where.split(',').map(p => p.trim());
    const conditions: Record<string, any> = {};
    let i = 0;
    while (i < parts.length) {
      if (parts[i].toLowerCase() === 'and' || parts[i].toLowerCase() === 'or') {
        i++;
        continue;
      }
      if (i + 2 < parts.length) {
        const field = parts[i];
        const op = parts[i + 1];
        const value = parts[i + 2].replace(/^['"]|['"]$/g, '');
        conditions[field] = { op, value };
        i += 3;
      } else {
        break;
      }
    }
    return conditions;
  };

  const get = async ({ table, where }: { table: string; where: string }) => {
    try {
      let query = supabase.from(table).select('*');
      const conditions = parseWhere(where);

      for (const [field, cond] of Object.entries(conditions)) {
        const { op, value } = cond as { op: string; value: string };
        switch (op) {
          case '=':
            query = query.eq(field, value);
            break;
          case '!=':
          case '<>':
            query = query.neq(field, value);
            break;
          case '>':
            query = query.gt(field, value);
            break;
          case '>=':
            query = query.gte(field, value);
            break;
          case '<':
            query = query.lt(field, value);
            break;
          case '<=':
            query = query.lte(field, value);
            break;
          case 'like':
            query = query.like(field, value);
            break;
          case 'ilike':
            query = query.ilike(field, value);
            break;
          default:
            query = query.eq(field, value);
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error('GET error:', error);
        return { results: null, response: false, message: error.message };
      }

      return {
        results: data,
        response: true,
        found: data?.length || 0,
        total: data?.length || 0,
      };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  };

  const insert = async ({ table, data }: { table: string; data: any }) => {
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

      return { response: true, last_id: result?.id || null, results: result };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  };

  const actualizar = async ({ table, data, id }: { table: string; data: any; id: any }) => {
    try {
      // Detectar la columna ID basada en el nombre de la tabla
      const idColumn = table.endsWith('s')
        ? `id_${table.slice(0, -1)}`
        : `id_${table}`;

      const { error } = await supabase
        .from(table)
        .update(data)
        .eq(idColumn, id);

      if (error) {
        console.error('UPDATE error:', error);
        return { results: null, response: false, message: error.message };
      }

      return { response: true };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  };

  const borrar = async ({ table, id }: { table: string; id: any }) => {
    try {
      const idColumn = table.endsWith('s')
        ? `id_${table.slice(0, -1)}`
        : `id_${table}`;

      const { error } = await supabase
        .from(table)
        .delete()
        .eq(idColumn, id);

      if (error) {
        console.error('DELETE error:', error);
        return { results: null, response: false, message: error.message };
      }

      return { response: true };
    } catch (error) {
      return { results: null, response: false, message: (error as Error).message };
    }
  };

  return { insert, actualizar, get, borrar };
}

export default useQuerys;
