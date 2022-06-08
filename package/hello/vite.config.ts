import { resolve } from "path";
import { ConfigEnv } from "vite";
import { defineConfig } from "vitest/config";

import { UserConfigBuilder, UserPluginBuilder } from "vite-config-custom";

// == Vite Config =============================================================
// https://vitejs.dev/config/#build-lib
export default (viteConfigEnv: ConfigEnv) => {
  return defineConfig({
    ...UserConfigBuilder(viteConfigEnv, {
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.ts"),
          formats: ["es", "cjs"],
          fileName: format => (format === "es" ? "index.mjs" : "index.cjs")
        }
      }
    }).build(),
    plugins: UserPluginBuilder().build()
  });
};
