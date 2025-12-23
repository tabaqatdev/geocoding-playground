import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Use "/" for custom domain, "/geocoding-playground/" for GitHub Pages subdirectory
  // Set VITE_BASE_PATH env var in CI or use default "/"
  base: process.env.VITE_BASE_PATH || "/",
});
