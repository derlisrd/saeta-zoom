import { TableCustomColumnConfig } from "@/components/types/table-custom-types";
import TableCustom from "@/components/ui/table-custom";
import { useWindowWidth } from "@/core/hooks/use-window-widht-hook";
import { apiProductos } from "@/services/api/productos";
import { Container, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function ProductosLista() {
  const width = useWindowWidth();
  const { data, isLoading } = useQuery({
    queryKey: ["productos"],
    staleTime: 1000 * 60 * 10,
    queryFn: async () => await apiProductos.lista(),
  });

  const columns: TableCustomColumnConfig<any>[] = [
    { key: "codigo", label: "COD", width: width * 0.1 },
    { key: "nombre", label: "Nombre", width: width * 0.34 },
    { key: "precio", label: "Precio", width: width * 0.1, render: (row) => `${row.precio.toLocaleString("es-PY")}` },
  ];

  return (
    <Container>
      {isLoading && <LinearProgress />}
      <TableCustom height={750} data={data ?? []} columns={columns} />
    </Container>
  );
}
