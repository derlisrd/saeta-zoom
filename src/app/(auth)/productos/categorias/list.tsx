import TableCustom from "@/components/ui/table-custom";
import { useWindowWidth } from "@/core/hooks/use-window-widht-hook";
import { querylib } from "@/services/libs/query-lib";
import { Container, LinearProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function CategoriasLista() {
  const width = useWindowWidth();
  const { data, isLoading } = useQuery({
    queryKey: ["categorias"],
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      const { error, data } = await querylib.from("categorias").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });

  return (
    <Container>
      <h3>Categorias</h3>
      {isLoading && <LinearProgress />}
      <TableCustom
        height={700}
        data={data ?? []}
        columns={[
          { key: "id", label: "ID", width: width * 0.1 },
          { key: "nombre", label: "Nombre", width: width * 0.2 },
          { key: "created_at", label: "Creado", width: width * 0.3, render: (row) => new Date(row.created_at).toLocaleString() },
        ]}
      />
    </Container>
  );
}
