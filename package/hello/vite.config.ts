import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/#build-lib
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es") ? "index.mjs" : "index.cjs"
    }
  }
});
