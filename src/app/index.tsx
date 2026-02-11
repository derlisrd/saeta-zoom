import { useThemeCustom } from "@/providers/theme-custom-provider";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./(public)";
import { AuthProvider } from "@/providers/auth-provider";

export default function App() {
  const { customTheme } = useThemeCustom();

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <AuthProvider>
        <PublicPages />
      </AuthProvider>
    </ThemeProvider>
  );
}
