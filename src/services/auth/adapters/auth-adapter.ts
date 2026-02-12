// services/auth/adapters/auth-adapter.ts

import { 
  AuthUser, 
  AuthSession, 
  SignInCredentials, 
  //SignUpCredentials,
  AuthResult 
} from '../types';

export interface AuthAdapter {
  // Métodos de autenticación
  signIn(credentials: SignInCredentials): Promise<AuthResult<AuthSession>>;
  //signUp(credentials: SignUpCredentials): Promise<AuthResult<AuthSession>>;
  signOut(): Promise<AuthResult>;
  resetPassword(email: string): Promise<AuthResult>;
  
  // Gestión de sesión
  getSession(): Promise<AuthSession | null>;
  getCurrentUser(): Promise<AuthUser | null>;
  
  // Listeners
  onAuthStateChange(callback: (session: AuthSession | null) => void): () => void;
}