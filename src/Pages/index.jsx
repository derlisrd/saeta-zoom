import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../Providers/AuthProvider";
import TemaProvider from "../Providers/TemaProvider";
import MainPages from "./MainPages";

function Pages() {
  return (
    <TemaProvider>
      <BrowserRouter>
        <AuthProvider>
          <MainPages />
        </AuthProvider>
      </BrowserRouter>
    </TemaProvider>
  );
}

export default Pages;
