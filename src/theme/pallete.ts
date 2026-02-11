import { PaletteOptions } from "@mui/material";

export const pallete = {
  mode: "dark",
  primary: {
    main: "#74ccae",
    // light: will be calculated from palette.primary.main,
    // dark: will be calculated from palette.primary.main,
    // contrastText: will be calculated to contrast with palette.primary.main,
    contrastText: "#fff"
  },
  secondary: {
    main: "#74aacc",
    //light: "#F5EBFF",
    // dark: will be calculated from palette.secondary.main,
    contrastText: "#f9f9f9"
  },
  background: {
    default: "#242b33",
    paper: "#15181cff"
  },
  text:{
    primary: "#EDF2F7",
    secondary: "#A0AEC0"
  }
} as PaletteOptions;
