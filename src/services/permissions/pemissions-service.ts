// services/permissions/permissions-service.ts

import { Permission, PermissionCheckResult, PermissionsAdapter } from './types';

export class PermissionsService {
  private adapter: PermissionsAdapter;
  private permissionsCache: Map<string, { permissions: Permission[]; isAdmin: boolean; timestamp: number }> = new Map();
  private cacheDuration = 2 * 60 * 1000; // 2 minutos

  constructor(adapter: PermissionsAdapter) {
    this.adapter = adapter;
  }

  // Obtener permisos (con cache)
  async getUserPermissions(userId: string, forceRefresh = false): Promise<Permission[]> {
    const cached = this.permissionsCache.get(userId);
    const now = Date.now();

    if (!forceRefresh && cached && (now - cached.timestamp) < this.cacheDuration) {
      return cached.permissions;
    }

    const [permissions, isAdmin] = await Promise.all([
      this.adapter.getUserPermissions(userId),
      this.adapter.isUserAdmin(userId)
    ]);

    this.permissionsCache.set(userId, {
      permissions,
      isAdmin,
      timestamp: now
    });

    return permissions;
  }

  // Verificar si es admin (con cache)
  async isAdmin(userId: string, forceRefresh = false): Promise<boolean> {
    const cached = this.permissionsCache.get(userId);
    const now = Date.now();

    if (!forceRefresh && cached && (now - cached.timestamp) < this.cacheDuration) {
      return cached.isAdmin;
    }

    const isAdmin = await this.adapter.isUserAdmin(userId);

    const cachedData = this.permissionsCache.get(userId);
    this.permissionsCache.set(userId, {
      permissions: cachedData?.permissions || [],
      isAdmin,
      timestamp: now
    });

    return isAdmin;
  }

  // Verificar un permiso específico
  async hasPermission(userId: string, permissionCode: string): Promise<PermissionCheckResult> {
    // Si es admin, tiene todos los permisos
    const isAdmin = await this.isAdmin(userId);
    if (isAdmin) {
      return {
        allowed: true,
        reason: 'Usuario es administrador'
      };
    }

    const permissions = await this.getUserPermissions(userId);
    const hasPermission = permissions.some(p => p.codigo === permissionCode);

    return {
      allowed: hasPermission,
      reason: hasPermission ? undefined : `Permiso '${permissionCode}' no encontrado`
    };
  }

  // Verificar múltiples permisos (al menos uno)
  async hasAnyPermission(userId: string, permissionCodes: string[]): Promise<PermissionCheckResult> {
    const isAdmin = await this.isAdmin(userId);
    if (isAdmin) {
      return {
        allowed: true,
        reason: 'Usuario es administrador'
      };
    }

    const permissions = await this.getUserPermissions(userId);
    const hasAny = permissionCodes.some(code =>
      permissions.some(p => p.codigo === code)
    );

    return {
      allowed: hasAny,
      reason: hasAny ? undefined : `Ninguno de los permisos requeridos encontrado: ${permissionCodes.join(', ')}`
    };
  }

  // Verificar múltiples permisos (todos)
  async hasAllPermissions(userId: string, permissionCodes: string[]): Promise<PermissionCheckResult> {
    const isAdmin = await this.isAdmin(userId);
    if (isAdmin) {
      return {
        allowed: true,
        reason: 'Usuario es administrador'
      };
    }

    const permissions = await this.getUserPermissions(userId);
    const missingPermissions = permissionCodes.filter(code =>
      !permissions.some(p => p.codigo === code)
    );

    return {
      allowed: missingPermissions.length === 0,
      reason: missingPermissions.length > 0
        ? `Permisos faltantes: ${missingPermissions.join(', ')}`
        : undefined
    };
  }

  // Otorgar permiso
  async grantPermission(userId: string, permissionCode: string): Promise<void> {
    await this.adapter.grantPermission(userId, permissionCode);
    this.invalidateCache(userId);
  }

  // Revocar permiso
  async revokePermission(userId: string, permissionCode: string): Promise<void> {
    await this.adapter.revokePermission(userId, permissionCode);
    this.invalidateCache(userId);
  }

  // Obtener todos los permisos disponibles
  async getAllPermissions(): Promise<Permission[]> {
    return this.adapter.getAllPermissions();
  }

  // Invalidar cache
  invalidateCache(userId: string): void {
    this.permissionsCache.delete(userId);
  }

  // Limpiar todo el cache
  clearCache(): void {
    this.permissionsCache.clear();
  }
}