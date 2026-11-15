import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/it-sinyak-homework_1/" : "/",
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
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
