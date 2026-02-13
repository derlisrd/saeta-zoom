import NoPermissionScreen from "@/components/feedback/no-permission-screen";
import { PermissionGuard } from "@/components/guards/permission-guard";
import { TableCustomColumnConfig } from "@/components/types/table-custom-types";
import TableCustom from "@/components/ui/table-custom";
import { usePermissionCheck } from "@/core/hooks/use-permissions-check";
import { useWindowWidth } from "@/core/hooks/use-window-widht-hook";
import { apiProductos } from "@/services/api/productos";
import { Container, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function ProductosLista() {
  const width = useWindowWidth();
  const { hasAccess, checked } = usePermissionCheck({ permission: "productos.ver" });
  const { data, isLoading } = useQuery({
    queryKey: ["productos"],
    staleTime: 1000 * 60 * 10,
    queryFn: async () => await apiProductos.lista(),
    enabled: hasAccess && checked,
  });

  const columns: TableCustomColumnConfig<any>[] = [
    { key: "id", label: "ID", width: width * 0.1 },
    { key: "codigo", label: "COD", width: width * 0.1 },
    { key: "nombre", label: "Nombre", width: width * 0.34 },
    { key: "precio", label: "Precio", width: width * 0.1, render: (row) => `${row.precio.toLocaleString("es-PY")}` },
  ];

  if (!hasAccess) {
    return <NoPermissionScreen />;
  }

  return (
    <PermissionGuard permission="productos.ver" onDenied={(reason) => console.log("Acceso denegado:", reason)}>
      <Container>
        {(isLoading || !checked) && <LinearProgress />}
        <TableCustom height={750} data={data ?? []} columns={columns} />
      </Container>
    </PermissionGuard>
  );
}
