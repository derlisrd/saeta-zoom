import { BrowserRouter } from "react-router-dom";
import ThemeCustomProvider from "./providers/theme-custom-provider";
import App from "./app";
import { AuthProvider } from "./providers/auth-provider";
import { LayoutProvider } from "./providers/layout-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    },
    mutations: {},
  },
});

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <Resto />
    </QueryClientProvider>
  );
}

function Resto() {
  return (
    <BrowserRouter basename="/">
      <AuthProvider>
        <ThemeCustomProvider>
          <LayoutProvider>
            <App />
          </LayoutProvider>
        </ThemeCustomProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
