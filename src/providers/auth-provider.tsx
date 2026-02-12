// services/auth/AuthContext.tsx

import { createAuthAdapter } from "@/config/auth-config";
import { AuthAdapter } from "@/services/auth/adapters/auth-adapter";
import { AuthError, AuthSession, AuthUser } from "@/services/auth/types";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  isLoading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: Record<string, any>) => Promise<void>;
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
  const [adapter] = useState<AuthAdapter>(() => injectedAdapter || createAuthAdapter());
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    // Cargar sesión inicial
    adapter.getSession().then((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Escuchar cambios de autenticación
    const unsubscribe = adapter.onAuthStateChange((session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [adapter]);

  const signIn = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        setError({
          message: "Por favor, ingresa tu correo electrónico y contraseña",
          code: "INVALID_CREDENTIALS",
        });
        return;
      }

      setIsLoading(true);
      setError(null);

      const result = await adapter.signIn({ email, password });

      if (result.error) {
        // Personalizar mensajes de error
        if (result.error.code === "invalid_credentials") {
          setError({
            ...result.error,
            message: "Correo electrónico o contraseña incorrectos",
          });
        } else {
          setError(result.error);
        }
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

  const signUp = async (email: string, password: string, metadata?: Record<string, any>) => {
    try {
      setError(null);
      const result = await adapter.signUp({ email, password, metadata });

      if (result.error) {
        setError(result.error);
        throw result.error;
      }

      if (result.data) {
        setSession(result.data);
        setUser(result.data.user);
      }
    } catch (error) {
      setError({
        message: "Error al crear la cuenta",
        originalError: error,
      });
      throw error;
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
    signUp,
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
