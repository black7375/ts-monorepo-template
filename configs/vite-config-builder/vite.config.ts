import { resolve } from "path";
import { ConfigEnv } from "vite";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

import { initConfigBuilder, ViteEnv, PluginBuilder } from "./src";

// == Vite Config =============================================================
// https://vitejs.dev/config/#build-lib
export default (viteConfigEnv: ConfigEnv) => {
  return defineConfig({
    ...userOption(viteConfigEnv).build(),
    plugins: pluginOption().build()
  });
};

function userOption(viteConfigEnv: ConfigEnv) {
  const configs = initConfigBuilder(viteConfigEnv, {
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        formats: ["es", "cjs"],
        fileName: format => (format === "es" ? "index.mjs" : "index.cjs")
      }
    }
  });

  if (ViteEnv.isDev()) {
    configs.add({
      build: {
        sourcemap: true,
        minify: false
      }
    });
  }
  if (ViteEnv.isProd()) {
    configs.add({
      build: {
        sourcemap: false,
        minify: "terser"
      }
    });
  }
  if (ViteEnv.isTest()) {
    configs.add({
      test: {
        includeSource: ["src/**/*.ts"],
        globals: true
      }
    });
  } else {
    configs.add({
      define: {
        "import.meta.vitest": "undefined"
      }
    });
  }
  return configs;
}

// == Plugin ==================================================================
function pluginOption() {
  const options = new PluginBuilder();
  if (ViteEnv.isProd()) {
    options.add(dts());
  }
  return options;
}
