import { Suspense, lazy, LazyExoticComponent, type ComponentType } from "react";
import LoadingScreen from "@/components/feedback/loading-screen";
import { Route, Routes } from "react-router-dom";
import AuthMenuLayout from "@/layout/auth-layout";
import LogOut from "@/app/(auth)/logout";
import NotFoundScreen from "@/app/not-found";

const Loadable =
  <T extends object>(Component: LazyExoticComponent<ComponentType<T>>) =>
  (props: T) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthMenuLayout />}>
        <Route index element={<Home />} />

        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/categorias" element={<Categorias />} />

        <Route path="/facturas" element={<Facturas />} />
        <Route path="/pedidos" element={<Pedidos />} />
      </Route>
      <Route path="logout" element={<LogOut />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

const Home = Loadable(lazy(() => import("../app/(auth)/home")));
const Productos = Loadable(lazy(() => import("../app/(auth)/productos/productos/lista")));
const Categorias = Loadable(lazy(() => import("../app/(auth)/productos/categorias/lista")));
const Facturas = Loadable(lazy(() => import("../app/(auth)/financiero/facturas/lista")));
const Pedidos = Loadable(lazy(() => import("../app/(auth)/comercial/pedidos/lista")));
