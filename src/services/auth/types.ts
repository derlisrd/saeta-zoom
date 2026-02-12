// services/auth/types.ts

export interface AuthUser {
  id: string;
  email: string;
  metadata?: Record<string, any>;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
  user: AuthUser;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
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