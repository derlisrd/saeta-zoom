import { components } from "@/theme/components";
import { pallete } from "@/theme/pallete";
import { shadowsDark } from "@/theme/shadows";
import { typography } from "@/theme/typography";
import { createTheme, Theme } from "@mui/material/styles";
import { createContext, ReactNode, useContext } from "react";

interface ThemeCustomContextValuesType {
  customTheme: Theme;
}

export const ThemeCustomContext = createContext<ThemeCustomContextValuesType | undefined>(undefined);

interface ThemeCustomProviderType {
  children: ReactNode;
}

function ThemeCustomProvider({ children }: ThemeCustomProviderType) {
  const initialCustomTheme = {
    palette: pallete,
    components: components(),
    typography: typography,
    shadows: shadowsDark,
  } as Theme;

  const customTheme = createTheme(initialCustomTheme);

  const values = { customTheme };
  return <ThemeCustomContext.Provider value={values}>{children}</ThemeCustomContext.Provider>;
}

export const useThemeCustom = () => {
  const context = useContext(ThemeCustomContext);
  if (!context) {
    throw new Error("useThemeCustom must be used within a ThemeCustomProvider");
  }
  return context;
};

export default ThemeCustomProvider;
