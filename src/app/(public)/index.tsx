import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, LazyExoticComponent } from "react";
import LoadingScreen from "@/components/feedback/loading-screen";

const Loadable =
  <T extends object>(Component: LazyExoticComponent<() => JSX.Element>) =>
  (props: T) => {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

function PublicPages() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

const Login = Loadable(lazy(() => import("./login")));

export default PublicPages;
