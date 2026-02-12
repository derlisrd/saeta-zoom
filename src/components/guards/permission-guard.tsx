// components/PermissionGuard.tsx

import { usePermissions } from "@/providers/permissions-provider";
import { ReactNode, useEffect, useState } from "react";

interface PermissionGuardProps {
  permission?: string;
  permissions?: string[];
  requireAll?: boolean;
  requireAdmin?: boolean;
  fallback?: ReactNode;
  onDenied?: (reason?: string) => void;
  children: ReactNode;
}

export function PermissionGuard({ permission, permissions, requireAll = false, requireAdmin = false, fallback = null, onDenied, children }: PermissionGuardProps) {
  const {
    //hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    checkPermission,
    isAdmin,
    isLoading,
  } = usePermissions();

  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAccess();
  }, [permission, permissions, requireAll, requireAdmin, isAdmin, isLoading]);

  const checkAccess = async () => {
    if (isLoading) {
      setChecking(true);
      return;
    }

    setChecking(true);

    try {
      // Si requiere admin
      if (requireAdmin) {
        if (!isAdmin) {
          onDenied?.("Se requieren privilegios de administrador");
          setHasAccess(false);
          return;
        }
        setHasAccess(true);
        return;
      }

      // Si es admin, permitir acceso automáticamente
      if (isAdmin) {
        setHasAccess(true);
        return;
      }

      // Verificar permisos
      let allowed = false;

      if (permission) {
        const result = await checkPermission(permission);
        allowed = result.allowed;
        if (!allowed) {
          onDenied?.(result.reason);
        }
      } else if (permissions && Array.isArray(permissions)) {
        allowed = requireAll ? await hasAllPermissions(permissions) : await hasAnyPermission(permissions);

        if (!allowed) {
          onDenied?.(requireAll ? `Se requieren todos los permisos: ${permissions.join(", ")}` : `Se requiere al menos uno de: ${permissions.join(", ")}`);
        }
      } else {
        allowed = true; // Si no se especifican permisos, permitir
      }

      setHasAccess(allowed);
    } catch (error) {
      console.error("Error verificando permisos:", error);
      setHasAccess(false);
      onDenied?.("Error al verificar permisos");
    } finally {
      setChecking(false);
    }
  };

  if (checking || isLoading) {
    return <div>Verificando permisos...</div>;
  }

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
