// services/permissions/adapters/SupabasePermissionsAdapter.ts

import { SupabaseClient} from '@supabase/supabase-js';
import { PermissionsAdapter, Permission } from '../types';

// Tipos para la respuesta de Supabase
type PermisoRow = {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  modulo: string | null;
};

type PermisoAutorizadoRow = {
  permisos: PermisoRow;
};


export class SupabasePermissionsAdapter implements PermissionsAdapter {
  private client: SupabaseClient;

  constructor(client: SupabaseClient) {
    this.client = client;
  }

 async getUserPermissions(userId: string): Promise<Permission[]> {
    try {
      // Primero obtener el ID interno del usuario
      const { data: usuario, error: userError } = await this.client
        .from('usuarios')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();

      if (userError || !usuario) {
        console.warn('Usuario no encontrado:', userId);
        return [];
      }

      // Obtener permisos autorizados con tipo explícito
      const { data, error } = await this.client
        .from('permisos_autorizados')
        .select(`
          permisos (
            id,
            codigo,
            nombre,
            descripcion,
            modulo
          )
        `)
        .eq('usuario_id', usuario.id)
        .returns<PermisoAutorizadoRow[]>(); // Especificar el tipo de retorno

      if (error) {
        console.error('Error obteniendo permisos:', error);
        return [];
      }

      // Mapear los datos al tipo Permission
      return (data || []).map(item => ({
        id: item.permisos.id,
        codigo: item.permisos.codigo,
        nombre: item.permisos.nombre,
        descripcion: item.permisos.descripcion ?? undefined,
        modulo: item.permisos.modulo ?? undefined
      }));
    } catch (error) {
      console.error('Error en getUserPermissions:', error);
      return [];
    }
  }

  async isUserAdmin(userId: string): Promise<boolean> {
    try {
      const { data, error } = await this.client
        .from('usuarios')
        .select('is_admin')
        .eq('user_id', userId)
        .maybeSingle();

      if (error || !data) {
        return false;
      }

      return data.is_admin === 1;
    } catch (error) {
      console.error('Error en isUserAdmin:', error);
      return false;
    }
  }

  async grantPermission(userId: string, permissionCode: string): Promise<void> {
    try {
      // Obtener IDs
      const [usuarioResult, permisoResult] = await Promise.all([
        this.client
          .from('usuarios')
          .select('id')
          .eq('user_id', userId)
          .single(),
        this.client
          .from('permisos')
          .select('id')
          .eq('codigo', permissionCode)
          .single()
      ]);

      if (usuarioResult.error || permisoResult.error) {
        throw new Error('Usuario o permiso no encontrado');
      }

      // Insertar permiso autorizado
      const { error } = await this.client
        .from('permisos_autorizados')
        .insert({
          usuario_id: usuarioResult.data.id,
          permiso_id: permisoResult.data.id
        });

      if (error && error.code !== '23505') { // Ignorar duplicados
        throw error;
      }
    } catch (error) {
      console.error('Error en grantPermission:', error);
      throw error;
    }
  }

  async revokePermission(userId: string, permissionCode: string): Promise<void> {
    try {
      const [usuarioResult, permisoResult] = await Promise.all([
        this.client
          .from('usuarios')
          .select('id')
          .eq('user_id', userId)
          .single(),
        this.client
          .from('permisos')
          .select('id')
          .eq('codigo', permissionCode)
          .single()
      ]);

      if (usuarioResult.error || permisoResult.error) {
        throw new Error('Usuario o permiso no encontrado');
      }

      const { error } = await this.client
        .from('permisos_autorizados')
        .delete()
        .eq('usuario_id', usuarioResult.data.id)
        .eq('permiso_id', permisoResult.data.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error en revokePermission:', error);
      throw error;
    }
  }

  async getAllPermissions(): Promise<Permission[]> {
    try {
      const { data, error } = await this.client
        .from('permisos')
        .select('*')
        .order('modulo', { ascending: true })
        .order('nombre', { ascending: true });

      if (error) {
        throw error;
      }

      return (data || []).map(p => ({
        id: p.id,
        codigo: p.codigo,
        nombre: p.nombre,
        descripcion: p.descripcion,
        modulo: p.modulo
      }));
    } catch (error) {
      console.error('Error en getAllPermissions:', error);
      return [];
    }
  }
}