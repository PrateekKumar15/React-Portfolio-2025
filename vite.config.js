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
        manualChunks: {
          vendor: ["react", "react-dom"],
          animations: ["framer-motion", "lottie-react"],
          icons: ["react-icons"],
          utils: ["emailjs-com", "react-helmet-async"],
        },
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
