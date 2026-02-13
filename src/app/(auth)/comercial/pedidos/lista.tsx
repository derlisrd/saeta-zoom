import NoPermissionScreen from "@/components/feedback/no-permission-screen";
import { PermissionGuard } from "@/components/guards/permission-guard";
import { TableCustomColumnConfig } from "@/components/types/table-custom-types";
import TableCustom from "@/components/ui/table-custom";
import { usePermissionCheck } from "@/core/hooks/use-permissions-check";
import { useWindowWidth } from "@/core/hooks/use-window-widht-hook";
import { helpers } from "@/core/utils/helpers";
import { format } from "@formkit/tempo";
import { Button, Chip, Container, LinearProgress, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { apiPedidos } from "@/services/api/pedidos";

export default function PedidosLista() {
  const width = useWindowWidth();
  const { hasAccess, checked } = usePermissionCheck({ permission: "pedidos.ver" });

  const rangoInicial = helpers.RangoHoyfechaEnString();
  const [desde, setDesde] = useState<string>(rangoInicial.desde);
  const [hasta, setHasta] = useState<string>(rangoInicial.hasta);

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["pedidos", desde, hasta],
    staleTime: 1000 * 60 * 10,
    enabled: hasAccess && checked,
    queryFn: async () => await apiPedidos.lista({ desde: desde, hasta: hasta }),
  });

  const columns: TableCustomColumnConfig<any>[] = [
    { key: "id", label: "ID", width: width * 0.05 },
    { key: "clientes.nombre", label: "Cliente", width: width * 0.22, render: (row) => row.clientes?.nombre || "Sin Cliente" },
    { key: "usuarios.nombre", label: "Usuario", width: width * 0.08, render: (row) => row.usuarios?.nombre || "Sin Usuario" },
    {
      key: "pagado",
      label: "Abonado",
      width: width * 0.06,
      render: (row) => <Chip label={row.pagado} />,
    },
    { key: "fecha", label: "Fecha", width: width * 0.05, render: (row) => format(row.fecha, "DD-MM-YYYY") },
    { key: "estado", label: "ESTADO", width: width * 0.05 },
  ];

  if (!hasAccess && checked) {
    return <NoPermissionScreen />;
  }

  const handleDesdeChange = (newValue: Dayjs | null) => {
    const date = new Date(newValue?.toISOString() || "");
    const valor = helpers.fechaEnString(date, true);
    setDesde(valor);
  };

  const handleHastaChange = (newValue: Dayjs | null) => {
    const date = new Date(newValue?.toISOString() || "");
    const valor = helpers.fechaEnString(date, false);
    setHasta(valor);
  };

  return (
    <PermissionGuard permission="pedidos.ver" onDenied={(reason) => console.log("Acceso denegado:", reason)}>
      <Typography variant="button">Pedidos</Typography>
      <Container>
        <Stack direction="row" spacing={1} my={1}>
          <DatePicker
            label="Desde"
            value={dayjs(desde)}
            onChange={handleDesdeChange}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                size: "small",
              },
            }}
          />

          <DatePicker
            label="Hasta"
            value={dayjs(hasta)}
            onChange={handleHastaChange}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                size: "small",
              },
            }}
          />

          <Button variant="contained" onClick={() => refetch()} disabled={isLoading || isRefetching || !checked}>
            Refrescar
          </Button>
        </Stack>
        {(isLoading || !checked || isRefetching) && <LinearProgress />}
        <TableCustom height={700} data={data ?? []} columns={columns} />
      </Container>
    </PermissionGuard>
  );
}
