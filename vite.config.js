import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    target: "esnext",
    minify: "terser",
    outDir: "dist",
    rollupOptions: {
      output: {
        // Simplified chunk splitting to avoid dynamic import issues
        manualChunks: undefined,
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "react-icons"],
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    open: true,
  },
  preview: {
    port: 3000,
    host: "0.0.0.0",
  },
});
