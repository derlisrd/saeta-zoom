import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const TableContainerCustomStyled = styled(Box)(({ theme }) => ({
  "& .customtable_header_row": {
    borderRadius: "18px 18px 0 0",
    textTransform: "uppercase",
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
  },
  "& .customtable_header_row th": {
    padding: "8px 14px",
    fontSize: "0.75rem",
  },
  "& .customtable_table_row": {
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "0.75rem",
    transition: "background-color 0.1s ease",
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.paper,
    },

    "&:hover": {
      backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[900],
      borderRadius: "4px",
    },
  },
}));

export default TableContainerCustomStyled;
