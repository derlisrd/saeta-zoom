// config/permissions.config.ts

import { SupabasePermissionsAdapter } from "@/services/permissions/adapters/supabase-permission-adapter";
import { PermissionsService } from "@/services/permissions/pemissions-service";
import {  supabase as supabaseClient } from '@/services/libs/supabase'


let permissionsServiceInstance: PermissionsService | null = null;

export function getPermissionsService(): PermissionsService {
  if (!permissionsServiceInstance) {
    const provider = import.meta.env.VITE_AUTH_PROVIDER || 'supabase';

    switch (provider) {
      case 'supabase': {
        const adapter = new SupabasePermissionsAdapter(supabaseClient);
        permissionsServiceInstance = new PermissionsService(adapter);
        break;
      }
      // case 'firebase': {
      //   const adapter = new FirebasePermissionsAdapter();
      //   permissionsServiceInstance = new PermissionsService(adapter);
      //   break;
      // }
      default:
        throw new Error(`Proveedor de permisos no soportado: ${provider}`);
    }
  }

  return permissionsServiceInstance;
}