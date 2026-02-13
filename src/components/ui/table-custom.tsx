import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { TableCustomGenericProps } from "../types/table-custom-types";
import TableContainerCustomStyled from "../styles/table-container-custom-styled";

const getCellValue = (obj: any, path: string) => {
  if (!path.includes(".")) return obj[path];
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export default function TableCustom<T extends { id: string | number }>({ data, columns, height = 500 }: TableCustomGenericProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const count = data.length;

  const rowVirtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 10,
  });

  // Calcular el ancho total para convertir a porcentajes
  const totalWidth = columns.reduce((sum, col) => sum + col.width, 0);

  return (
    <TableContainerCustomStyled
      ref={parentRef}
      style={{
        height: `${height}px`,
        overflow: "auto",
        width: "100%",
        position: "relative",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          display: "block",
        }}
      >
        {/* HEADER */}
        <thead
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            display: "block",
            width: "100%",
          }}
        >
          <tr className="customtable_header_row">
            {columns.map((col) => (
              <th
                key={col.label}
                style={{
                  width: `${(col.width / totalWidth) * 100}%`, // Convertir a porcentaje
                  minWidth: `${(col.width / totalWidth) * 100}%`,
                  maxWidth: `${(col.width / totalWidth) * 100}%`,
                  textTransform: "uppercase",
                  textAlign: "left",
                  boxSizing: "border-box",
                  flexShrink: 0,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody
          style={{
            display: "block",
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const rowData = data[virtualRow.index];
            if (!rowData) return null;

            return (
              <tr
                key={virtualRow.key}
                className="customtable_table_row"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  display: "flex",
                }}
              >
                {columns.map((col, idx) => (
                  <td
                    key={idx}
                    style={{
                      width: `${(col.width / totalWidth) * 100}%`, // Mismo cálculo que el header
                      minWidth: `${(col.width / totalWidth) * 100}%`,
                      maxWidth: `${(col.width / totalWidth) * 100}%`,
                      padding: "8px",
                      boxSizing: "border-box",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {col.render ? col.render(rowData) : (getCellValue(rowData, col.key as string) ?? "")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainerCustomStyled>
  );
}
