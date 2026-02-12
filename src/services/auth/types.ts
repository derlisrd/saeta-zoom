// services/auth/types.ts

export interface Permission {
  id: number;
  /* codigo: string;
  nombre: string;
  descripcion?: string;
  modulo?: string; */
}


export interface AuthUser {
  id: string;
  email: string;
  nombre?: string;
  username?: string;
  metadata?: Record<string, any>;
  is_admin: boolean;
  permissions: Permission[] | null;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  user: AuthUser;
}

export interface SignInCredentials {
  identifier: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  username?: string;
  password: string;
  metadata?: Record<string, any>;
}

export interface AuthError {
  message: string;
  code?: string;
  originalError?: unknown;
}

export interface AuthResult<T = void> {
  data?: T;
  error?: AuthError;
}