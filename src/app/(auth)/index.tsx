import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";

import { PermissionsProvider } from "@/providers/permissions-provider";
import AuthRoutes from "@/routes/auth-routes";

dayjs.locale("es");

function AuthPages() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <PermissionsProvider>
        <AuthRoutes />
      </PermissionsProvider>
    </LocalizationProvider>
  );
}

export default AuthPages;
