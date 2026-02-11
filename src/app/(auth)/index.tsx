import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, LazyExoticComponent } from "react";
import LoadingScreen from "@/components/feedback/loading-screen";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";
import AuthMenuLayout from "@/layout/auth-layout";
import LogOut from "./logout";

dayjs.locale("es");

const Loadable =
  <T extends object>(Component: LazyExoticComponent<() => JSX.Element>) =>
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
      <Routes>
        <Route path="/" element={<AuthMenuLayout />}>
          <Route index element={<Home />} />

          <Route path="/productos/categorias" element={<Categorias />} />
        </Route>
        <Route path="logout" element={<LogOut />} />
      </Routes>
    </LocalizationProvider>
  );
}

const Home = Loadable(lazy(() => import("./home")));
const Categorias = Loadable(lazy(() => import("./productos/categorias/list")));

export default AuthPages;
