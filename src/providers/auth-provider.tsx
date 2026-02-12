// services/auth/AuthContext.tsx

import { createAuthAdapterConfig } from "@/config/auth-config";
import { AuthAdapter } from "@/services/auth/adapters/auth-adapter";
import { AuthError, AuthSession, AuthUser } from "@/services/auth/types";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: AuthError | null;
  signIn: (identifier: string, password: string) => Promise<void>; // Cambio aquí
  //signUp: (email: string, password: string, username?: string, metadata?: Record<string, any>) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  adapter?: AuthAdapter; // Permitir inyección del adapter (útil para testing)
}

export function AuthProvider({ children, adapter: injectedAdapter }: AuthProviderProps) {
  const [adapter] = useState<AuthAdapter>(() => injectedAdapter || createAuthAdapterConfig());
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    adapter.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      //console.log("Sesión inicial cargada:", session);
    });

    const unsubscribe = adapter.onAuthStateChange((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      //console.log("unsuscribe", session);
    });

    return () => unsubscribe();
  }, [adapter]);

  const signIn = async (identifier: string, password: string) => {
    try {
      if (!identifier || !password) {
        setError({
          message: "Por favor, ingresa tu usuario/email y contraseña",
          code: "INVALID_CREDENTIALS",
        });
        return;
      }

      setIsLoading(true);
      setError(null);

      const result = await adapter.signIn({ identifier, password });

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.data) {
        setSession(result.data);
        setUser(result.data.user);
      }
    } catch (error) {
      setError({
        message: "Error inesperado al iniciar sesión",
        originalError: error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setUser(null);
      setSession(null);

      const result = await adapter.signOut();

      if (result.error) {
        setError(result.error);
      }
    } catch (error) {
      setError({
        message: "Error al cerrar sesión",
        originalError: error,
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      const result = await adapter.resetPassword(email);

      if (result.error) {
        setError(result.error);
        throw result.error;
      }
    } catch (error) {
      setError({
        message: "Error al restablecer contraseña",
        originalError: error,
      });
      throw error;
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    error,
    signIn,
    //signUp,
    signOut,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
}
