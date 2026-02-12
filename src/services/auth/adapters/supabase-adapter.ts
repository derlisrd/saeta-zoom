// services/auth/adapters/SupabaseAuthAdapter.ts

import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import { AuthAdapter } from './auth-adapter';
import {
  AuthUser,
  AuthSession,
  SignInCredentials,
  SignUpCredentials,
  AuthResult,
  AuthError
} from '../types';

export class SupabaseAuthAdapter implements AuthAdapter {
  private client: SupabaseClient;

  constructor(url: string, anonKey: string) {
    this.client = createClient(url, anonKey);
  }

  // Métodos helper para transformar tipos de Supabase a tipos agnósticos
  private mapUser(supabaseUser: User | null): AuthUser | null {
    if (!supabaseUser) return null;
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      metadata: supabaseUser.user_metadata
    };
  }

  private mapSession(supabaseSession: Session | null): AuthSession | null {
    if (!supabaseSession) return null;

    return {
      accessToken: supabaseSession.access_token,
      refreshToken: supabaseSession.refresh_token,
      expiresAt: supabaseSession.expires_at,
      user: this.mapUser(supabaseSession.user)!
    };
  }

  private mapError(error: any): AuthError {
    return {
      message: error.message || 'Error desconocido',
      code: error.code,
      originalError: error
    };
  }

  async signIn(credentials: SignInCredentials): Promise<AuthResult<AuthSession>> {
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) {
        return {
          error: this.mapError(error)
        };
      }

      return {
        data: this.mapSession(data.session)!
      };
    } catch (error) {
      return {
        error: this.mapError(error)
      };
    }
  }

  async signUp(credentials: SignUpCredentials): Promise<AuthResult<AuthSession>> {
    try {
      const { data, error } = await this.client.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: credentials.metadata
        }
      });

      if (error) {
        return {
          error: this.mapError(error)
        };
      }

      return {
        data: this.mapSession(data.session)!
      };
    } catch (error) {
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
    const { data: { subscription } } = this.client.auth.onAuthStateChange(
      (_event, session) => {
        callback(this.mapSession(session));
      }
    );

    return () => subscription.unsubscribe();
  }

  // Método adicional para acceder al cliente de Supabase si es necesario
  getClient(): SupabaseClient {
    return this.client;
  }
}