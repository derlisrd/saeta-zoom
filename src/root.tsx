import { BrowserRouter } from "react-router-dom";
import ThemeCustomProvider from "./providers/theme-custom-provider";
import App from "./app";

function Root() {
  return (
    <BrowserRouter basename="/">
      <ThemeCustomProvider>
        <App />
      </ThemeCustomProvider>
    </BrowserRouter>
  );
}

export default Root;
