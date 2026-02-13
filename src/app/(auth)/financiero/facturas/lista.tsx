import NoPermissionScreen from "@/components/feedback/no-permission-screen";
import { PermissionGuard } from "@/components/guards/permission-guard";
import { TableCustomColumnConfig } from "@/components/types/table-custom-types";
import TableCustom from "@/components/ui/table-custom";
import { usePermissionCheck } from "@/core/hooks/use-permissions-check";
import { useWindowWidth } from "@/core/hooks/use-window-widht-hook";
import { apiFacturas } from "@/services/api/facturas";
import { Button, Container, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function FacturasLista() {
  const width = useWindowWidth();
  const { hasAccess, checked } = usePermissionCheck({ permission: "facturas.ver" });
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["facturas"],
    staleTime: 1000 * 60 * 10,
    queryFn: async () => await apiFacturas.lista(),
    enabled: hasAccess && checked,
  });

  const columns: TableCustomColumnConfig<any>[] = [
    { key: "id", label: "COD", width: width * 0.05 },
    { key: "fecha", label: "Fecha", width: width * 0.06, render: (row) => new Date(row.fecha).toLocaleDateString("es-PY") },
    { key: "numero", label: "Numero", width: width * 0.09 },
    { key: "estado", label: "Estado", width: width * 0.05 },
    { key: "forma_pago", label: "Forma", width: width * 0.06 },
    { key: "pagado", label: "Abonado", width: width * 0.06 },
    { key: "clientes.nombre", label: "Cliente", width: width * 0.22, render: (row) => row.clientes?.nombre || "Sin Cliente" },
    { key: "usuarios.nombre", label: "Usuario", width: width * 0.08, render: (row) => row.usuarios?.nombre || "Sin Usuario" },
    { key: "condicion", label: "Condición", width: width * 0.07 },
    { key: "total", label: "Total", width: width * 0.07, render: (row) => `${row.total.toLocaleString("es-PY")}` },
  ];

  if (!hasAccess && checked) {
    return <NoPermissionScreen />;
  }

  return (
    <PermissionGuard permission="facturas.ver" onDenied={(reason) => console.log("Acceso denegado:", reason)}>
      <Container>
        <Button variant="contained" color="primary" onClick={() => refetch()} disabled={isLoading || isRefetching || !checked} style={{ marginBottom: 16 }}>
          Refrescar
        </Button>
        {(isLoading || !checked || isRefetching) && <LinearProgress />}
        <TableCustom height={750} data={data ?? []} columns={columns} />
      </Container>
    </PermissionGuard>
  );
}
