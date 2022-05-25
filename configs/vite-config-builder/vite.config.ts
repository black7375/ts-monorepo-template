import { resolve } from "path";
import { ConfigEnv, UserConfig } from "vite";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

import { Build, UserConfigBuilder, PluginBuilder } from "./src";

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
    plugins: pluginOption().build()
  });
};

// == Plugin ==================================================================
function pluginOption() {
  const options = new PluginBuilder();
  if (Build.isProd()) {
    options.add(dts());
  }
  return options;
}
