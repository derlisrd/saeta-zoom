
import { usePermissions } from '@/providers/permissions-provider';
import { useEffect, useState } from 'react';

interface UsePermissionCheckOptions {
  permission?: string;
  permissions?: string[];
  requireAll?: boolean;
  requireAdmin?: boolean;
}

export function usePermissionCheck(options: UsePermissionCheckOptions) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isAdmin, isLoading } = usePermissions();
  const [hasAccess, setHasAccess] = useState(false);
  const [checked, setChecked] = useState(false);

  const { permission, permissions, requireAll, requireAdmin } = options;

  useEffect(() => {
    checkPermission();
  }, [permission, permissions, requireAll, requireAdmin, isAdmin, isLoading]);

  const checkPermission = async () => {
    if (isLoading) {
      setChecked(false);
      return;
    }

    try {
      if (requireAdmin) {
        setHasAccess(isAdmin);
        setChecked(true);
        return;
      }

      if (isAdmin) {
        setHasAccess(true);
        setChecked(true);
        return;
      }

      let allowed = false;

      if (permission) {
        allowed = await hasPermission(permission);
      } else if (permissions && Array.isArray(permissions)) {
        allowed = requireAll
          ? await hasAllPermissions(permissions)
          : await hasAnyPermission(permissions);
      } else {
        allowed = true;
      }

      setHasAccess(allowed);
      setChecked(true);
    } catch (error) {
      console.error('Error verificando permisos:', error);
      setHasAccess(false);
      setChecked(true);
    }
  };

  return { hasAccess, checked };
}
