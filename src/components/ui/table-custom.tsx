import { Box } from "@mui/material";
import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface ColumnConfig<T> {
  key: keyof T | string;
  label: string;
  width: number;
  render?: (row: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  height?: number;
}

export default function TableCustom<T extends { id: string | number }>({ data, columns, height = 500 }: GenericTableProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 5,
  });

  // Creamos el template de columnas para Grid
  const gridTemplate = columns.map((c) => `${c.width}px`).join(" ");

  return (
    <Box
      ref={parentRef}
      boxShadow={6}
      sx={{
        height: height,
        overflow: "auto",
        border: "none",
        borderRadius: "4px",
        position: "relative", // Importante para el scroll
      }}
    >
      {/* HEADER: Se mantiene fijo arriba */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: gridTemplate,
          position: "sticky",
          top: 0,
          zIndex: 2,
          bgcolor: "secondary.main",
          borderBottom: "1px solid #eee",
          fontWeight: "bold",
        }}
      >
        {columns.map((col) => (
          <Box key={col.label} sx={{ p: 1, textTransform: "uppercase" }}>
            {col.label}
          </Box>
        ))}
      </Box>

      {/* BODY: Contenedor relativo con la altura total del scroll */}
      <Box
        sx={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          minWidth: "fit-content", // Mantiene el ancho si hay scroll horizontal
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const rowData = data[virtualRow.index];
          return (
            <Box
              key={virtualRow.key}
              sx={{
                display: "grid",
                gridTemplateColumns: gridTemplate,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
                borderBottomColor: "text.secondary",
                alignItems: "center",
                "&:hover": { bgcolor: "background.paper" },
              }}
            >
              {columns.map((col) => (
                <Box key={String(col.key)} sx={{ px: 1 }}>
                  {col.render ? col.render(rowData) : (rowData[col.key as keyof T] as any)}
                </Box>
              ))}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
