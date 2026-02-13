import NoPermissionScreen from "@/components/feedback/no-permission-screen";
import { PermissionGuard } from "@/components/guards/permission-guard";
import { TableCustomColumnConfig } from "@/components/types/table-custom-types";
import TableCustom from "@/components/ui/table-custom";
import { usePermissionCheck } from "@/core/hooks/use-permissions-check";
import { useWindowWidth } from "@/core/hooks/use-window-widht-hook";
import { apiFacturas } from "@/services/api/facturas";
import { Container, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function FacturasLista() {
  const width = useWindowWidth();
  const { hasAccess, checked } = usePermissionCheck({ permission: "facturas.ver" });
  const { data, isLoading } = useQuery({
    queryKey: ["facturas"],
    staleTime: 1000 * 60 * 10,
    queryFn: async () => await apiFacturas.lista(),
    enabled: hasAccess && checked,
  });

  const columns: TableCustomColumnConfig<any>[] = [
    { key: "id", label: "COD", width: width * 0.05 },
    { key: "numero", label: "Numero", width: width * 0.1 },
    { key: "estado", label: "Estado", width: width * 0.05 },
    { key: "forma_pago", label: "Forma Pago", width: width * 0.1 },
    { key: "total", label: "Total", width: width * 0.07, render: (row) => `${row.total.toLocaleString("es-PY")}` },
    { key: "fecha", label: "Fecha", width: width * 0.1, render: (row) => new Date(row.fecha).toLocaleDateString("es-PY") },
  ];

  if (!hasAccess) {
    return <NoPermissionScreen />;
  }

  return (
    <PermissionGuard permission="facturas.ver" onDenied={(reason) => console.log("Acceso denegado:", reason)}>
      <Container>
        {(isLoading || !checked) && <LinearProgress />}
        <TableCustom height={750} data={data ?? []} columns={columns} />
      </Container>
    </PermissionGuard>
  );
}
