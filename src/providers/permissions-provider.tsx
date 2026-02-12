// services/permissions/PermissionsContext.tsx

import { Permission, PermissionCheckResult } from "@/services/permissions/types";
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useAuth } from "./auth-provider";
import { getPermissionsService } from "@/config/permission-config";

interface PermissionsContextType {
  permissions: Permission[];
  isAdmin: boolean;
  isLoading: boolean;
  hasPermission: (permissionCode: string) => Promise<boolean>;
  hasAnyPermission: (permissionCodes: string[]) => Promise<boolean>;
  hasAllPermissions: (permissionCodes: string[]) => Promise<boolean>;
  checkPermission: (permissionCode: string) => Promise<PermissionCheckResult>;
  refreshPermissions: () => Promise<void>;
  grantPermission: (permissionCode: string) => Promise<void>;
  revokePermission: (permissionCode: string) => Promise<void>;
  getAllAvailablePermissions: () => Promise<Permission[]>;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

interface PermissionsProviderProps {
  children: ReactNode;
}

export function PermissionsProvider({ children }: PermissionsProviderProps) {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const permissionsService = getPermissionsService();

  // Cargar permisos cuando cambia el usuario
  useEffect(() => {
    if (!user) {
      setPermissions([]);
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    loadPermissions();
  }, [user]);

  const loadPermissions = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const [userPermissions, adminStatus] = await Promise.all([permissionsService.getUserPermissions(user.id), permissionsService.isAdmin(user.id)]);

      setPermissions(userPermissions);
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error("Error cargando permisos:", error);
      setPermissions([]);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = useCallback(
    async (permissionCode: string): Promise<boolean> => {
      if (!user) return false;
      const result = await permissionsService.hasPermission(user.id, permissionCode);
      return result.allowed;
    },
    [user, permissionsService],
  );

  const hasAnyPermission = useCallback(
    async (permissionCodes: string[]): Promise<boolean> => {
      if (!user) return false;
      const result = await permissionsService.hasAnyPermission(user.id, permissionCodes);
      return result.allowed;
    },
    [user, permissionsService],
  );

  const hasAllPermissions = useCallback(
    async (permissionCodes: string[]): Promise<boolean> => {
      if (!user) return false;
      const result = await permissionsService.hasAllPermissions(user.id, permissionCodes);
      return result.allowed;
    },
    [user, permissionsService],
  );

  const checkPermission = useCallback(
    async (permissionCode: string): Promise<PermissionCheckResult> => {
      if (!user) {
        return {
          allowed: false,
          reason: "Usuario no autenticado",
        };
      }
      return permissionsService.hasPermission(user.id, permissionCode);
    },
    [user, permissionsService],
  );

  const refreshPermissions = async () => {
    if (!user) return;
    await loadPermissions();
  };

  const grantPermission = async (permissionCode: string) => {
    if (!user) throw new Error("Usuario no autenticado");
    await permissionsService.grantPermission(user.id, permissionCode);
    await refreshPermissions();
  };

  const revokePermission = async (permissionCode: string) => {
    if (!user) throw new Error("Usuario no autenticado");
    await permissionsService.revokePermission(user.id, permissionCode);
    await refreshPermissions();
  };

  const getAllAvailablePermissions = async (): Promise<Permission[]> => {
    return permissionsService.getAllPermissions();
  };

  const value: PermissionsContextType = {
    permissions,
    isAdmin,
    isLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    checkPermission,
    refreshPermissions,
    grantPermission,
    revokePermission,
    getAllAvailablePermissions,
  };

  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions debe usarse dentro de PermissionsProvider");
  }
  return context;
}
