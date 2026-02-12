// config/auth.config.ts

import { AuthAdapter } from "@/services/auth/adapters/auth-adapter";
import { SupabaseAuthAdapter } from "@/services/auth/adapters/supabase-adapter";



// Aquí defines qué adapter usar
export function createAuthAdapterConfig(): AuthAdapter {
  const provider = import.meta.env.VITE_AUTH_PROVIDER || 'supabase';

  switch (provider) {
    case 'supabase':
      return new SupabaseAuthAdapter(
        import.meta.env.VITE_SUPABASE_URL || '',
        import.meta.env.VITE_SUPABASE_KEY || ''
      );
    
    // Futuro: otros proveedores
    // case 'firebase':
    //   return new FirebaseAuthAdapter(config);
    
    default:
      throw new Error(`Proveedor de autenticación no soportado: ${provider}`);
  }
}