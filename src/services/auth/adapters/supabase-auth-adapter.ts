// services/auth/adapters/SupabaseAuthAdapter.ts

import { createClient, SupabaseClient, User, Session } from "@supabase/supabase-js";

import {
  AuthUser,
  AuthSession,
  SignInCredentials,
  //SignUpCredentials,
  AuthResult,
  AuthError,
  Permission
} from "../types";
import { AuthAdapter } from "./auth-adapter";

interface UsuarioData {
  id: string;
  username: string | null;
  nombre: string | null;
  is_admin: number;
  email: string;
  permisos_autorizados: Array<{
    permisos: {
      id: number;
    };
  }>;
}

export class SupabaseAuthAdapter implements AuthAdapter {
  private client: SupabaseClient;
  private userCache: Map<string, AuthUser> = new Map(); // Cache de usuarios

  constructor(url: string, anonKey: string) {
    this.client = createClient(url, anonKey);
  }

  private async getUserData(userId: string): Promise<UsuarioData | null> {
    const { data } = await this.client
  .from("usuarios")
  .select(`
    id,
    username,
    nombre,
    email,
    is_admin,
    permisos_autorizados(
      id,
      usuario_id,
      permiso_id,
      permisos(
      id
      )
    )
  `)
  .eq("user_id", userId) // Aquí usas el UUID de la sesión (auth.uid())
  .single();


    return {
      id: data?.id || "",
      username: data?.username || null,
      nombre: data?.nombre || null,
      is_admin: data?.is_admin || 0,
      email: data?.email || "",
      permisos_autorizados: []// Aquí deberías mapear los permisos autorizados del usuario
    }
  }

  // Helper para verificar si es email o username
  private isEmail(identifier: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  }

  // Helper para obtener email desde username
  private async getEmailFromIdentifier(identifier: string): Promise<string> {
    // Si ya es un email, retornarlo directamente
    if (this.isEmail(identifier)) {
      return identifier;
    }

    // Si es username, buscar el email en la tabla usuarios
    const { data: usuario, error } = await this.client.from("usuarios").select("email").eq("username", identifier).single();

    if (error || !usuario) {
      throw new Error("Usuario no encontrado");
    }

    return usuario.email;
  }

  private async mapUser(supabaseUser: User | null, forceFetch: boolean = false): Promise<AuthUser | null> {
    if (!supabaseUser) return null;
    // Verificar cache
    if (!forceFetch && this.userCache.has(supabaseUser.id)) {
      return this.userCache.get(supabaseUser.id)!;
    }

    // Valores por defecto
    let authUser: AuthUser = {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      username: undefined,
      nombre: undefined,
      is_admin: false,
      permissions: [],
      metadata: supabaseUser.user_metadata
    };

    // Obtener datos completos si se requiere
    if (forceFetch) {
      try {
        const userData = await this.getUserData(supabaseUser.id);

        if (userData) {
          // Extraer permisos del usuario
          const permissions: Permission[] =
            userData.permisos_autorizados?.map((pa) => ({
              id: pa.permisos.id,
            })) || [];

          authUser = {
            id: supabaseUser.id,
            email: userData.email,
            username: userData.username || undefined,
            nombre: userData.nombre || undefined,
            is_admin: userData.is_admin === 1,
            permissions,
            metadata: supabaseUser.user_metadata
          };
        }
      } catch (error) {
        console.warn("Error mapeando usuario completo:", error);
      }
    }

    // Guardar en cache
    this.userCache.set(supabaseUser.id, authUser);

    return authUser;
  }

  private async mapSession(supabaseSession: Session | null, forceFetch: boolean = false): Promise<AuthSession | null> {
    if (!supabaseSession) return null;

    const user = await this.mapUser(supabaseSession.user, forceFetch);

    return {
      accessToken: supabaseSession.access_token,
      refreshToken: supabaseSession.refresh_token,
      expiresAt: supabaseSession.expires_at,
      user: user!
    };
  }

  private mapError(error: any): AuthError {
    let message = error.message || "Error desconocido";

    if (error.message === "Usuario no encontrado") {
      message = "Usuario o contraseña incorrectos";
    } else if (error.code === "invalid_credentials") {
      message = "Usuario o contraseña incorrectos";
    }

    return {
      message,
      code: error.code,
      originalError: error
    };
  }

  async signIn(credentials: SignInCredentials): Promise<AuthResult<AuthSession>> {
    try {
      const email = await this.getEmailFromIdentifier(credentials.identifier);

      const { data, error } = await this.client.auth.signInWithPassword({
        email,
        password: credentials.password
      });

      if (error) {
        return {
          error: this.mapError(error)
        };
      }
      // Actualizar last_login
      if (data.user) {
        await this.client.from("usuarios").update({ last_login: new Date().toISOString() }).eq("user_id", data.user.id);
      }

      // Forzar fetch completo en signIn
      const session = await this.mapSession(data.session, true);

      return {
        data: session!
      };
    } catch (error: any) {
      return {
        error: this.mapError(error)
      };
    }
  }

  async signOut(): Promise<AuthResult> {
    try {
      const { error } = await this.client.auth.signOut();

      if (error) {
        return {
          error: this.mapError(error)
        };
      }

      return {};
    } catch (error) {
      return {
        error: this.mapError(error)
      };
    }
  }

  async resetPassword(email: string): Promise<AuthResult> {
    try {
      const { error } = await this.client.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return {
          error: this.mapError(error)
        };
      }

      return {};
    } catch (error) {
      return {
        error: this.mapError(error)
      };
    }
  }

  async getSession(): Promise<AuthSession | null> {
    const { data } = await this.client.auth.getSession();
    return this.mapSession(data.session);
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const { data } = await this.client.auth.getUser();
    return this.mapUser(data.user);
  }

  onAuthStateChange(callback: (session: AuthSession | null) => void): () => void {
    const {
      data: { subscription }
    } = this.client.auth.onAuthStateChange(async (_event, session) => {
      const mappedSession = await this.mapSession(session);
      callback(mappedSession);
    });

    return () => subscription.unsubscribe();
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
