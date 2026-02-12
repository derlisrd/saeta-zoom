// services/permissions/types.ts

export interface Permission {
  id: string | number;
  codigo: string;
  nombre: string;
  descripcion?: string;
  modulo?: string;
}

export interface PermissionCheckResult {
  allowed: boolean;
  reason?: string;
}

export interface PermissionsAdapter {
  // Obtener permisos de un usuario
  getUserPermissions(userId: string): Promise<Permission[]>;
  
  // Verificar si un usuario es admin
  isUserAdmin(userId: string): Promise<boolean>;
  
  // Otorgar permiso
  grantPermission(userId: string, permissionCode: string): Promise<void>;
  
  // Revocar permiso
  revokePermission(userId: string, permissionCode: string): Promise<void>;
  
  // Listar todos los permisos disponibles
  getAllPermissions(): Promise<Permission[]>;
}