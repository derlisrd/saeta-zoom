import { useThemeCustom } from "@/providers/theme-custom-provider";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import PublicPages from "./(public)";
import { useAuth } from "@/providers/auth-provider";
import AuthPages from "./(auth)";

export default function App() {
  const { customTheme } = useThemeCustom();
  const { user } = useAuth();
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {user ? <AuthPages /> : <PublicPages />}
    </ThemeProvider>
  );
}
