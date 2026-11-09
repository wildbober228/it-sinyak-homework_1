import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
      generateScopedName:
        mode === "production"
          ? "[hash:base64:6]"
          : "[name]__[local]__[hash:base64:5]",
    },
  },
}));
