import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// @ts-ignore

const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": root
    }
  },
  build:{
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'utils-vendor': [
            '@formkit/tempo'
          ]
        },
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    }
  },
  server: {
    port: 3000,
  }
});
