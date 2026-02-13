import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, LazyExoticComponent, type ComponentType } from "react";
import LoadingScreen from "@/components/feedback/loading-screen";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import AuthMenuLayout from "@/layout/auth-layout";
import LogOut from "./logout";
import { PermissionsProvider } from "@/providers/permissions-provider";

dayjs.locale("es");

const Loadable =
  <T extends object>(Component: LazyExoticComponent<ComponentType<T>>) =>
  (props: T) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

function AuthPages() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <PermissionsProvider>
        <Routes>
          <Route path="/" element={<AuthMenuLayout />}>
            <Route index element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/categorias" element={<Categorias />} />
            <Route path="/facturas" element={<Facturas />} />
          </Route>
          <Route path="logout" element={<LogOut />} />
        </Routes>
      </PermissionsProvider>
    </LocalizationProvider>
  );
}

const Home = Loadable(lazy(() => import("./home")));
const Productos = Loadable(lazy(() => import("./productos/productos/lista")));
const Categorias = Loadable(lazy(() => import("./productos/categorias/lista")));
const Facturas = Loadable(lazy(() => import("./financiero/facturas/lista")));

export default AuthPages;
