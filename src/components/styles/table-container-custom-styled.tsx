import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const TableContainerCustomStyled = styled(Box)(({ theme }) => ({
  "&::-webkit-scrollbar": {
    width: "9px",
    backgroundColor: theme.palette.grey[900],
    borderRadius: "10px",
    padding: "2px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[700],
    borderRadius: "11px",
  },
  "& .customtable_header_row": {
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    width: "100%",
  },
  "& .customtable_header_row th": {
    padding: "8px 14px",
    fontSize: "0.7rem",
    textTransform: "uppercase",
    fontWeight: "bold",
    boxSizing: "border-box",
    flexShrink: 0,
  },
  "& .customtable_table_row": {
    cursor: "pointer",
    fontSize: "0.7rem",
    transition: "background-color 0.1s ease",
    borderBottom: `1px solid ${theme.palette.grey[700]}`,
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.background.paper,
    },

    "&:hover": {
      backgroundColor: theme.palette.grey[900],
      borderRadius: "4px",
    },
  },
  "& .customtable_table_row td": {
    textAlign: "center",
    paddingTop: "8px",
    paddingBottom: "8px",
    fontSize: "0.7rem",
    borderRight: `1px solid ${theme.palette.grey[800]}`,
    boxSizing: "border-box",
  },
}));

export default TableContainerCustomStyled;
