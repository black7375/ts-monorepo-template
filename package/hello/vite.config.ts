import { resolve } from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/#build-lib
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es") ? "index.mjs" : "index.cjs"
    }
  },
  plugins: [dts()]
});
