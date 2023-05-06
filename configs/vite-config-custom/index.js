import { resolve } from "path";
import { initConfigBuilder, ViteEnv, PluginBuilder } from "vite-config-builder";
import { mergeConfig } from "vite";

import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import incremental from "@mprt/rollup-plugin-incremental";

// == Config ==================================================================
export function UserConfig(viteConfigEnv, initConfigs = {}) {
  return mergeConfig({
    ...UserConfigBuilder(viteConfigEnv).build()
  }, initConfigs);
}

export function UserConfigBuilder(viteConfigEnv, initConfigs) {
  const configs = initConfigBuilder(viteConfigEnv, initConfigs);
  configs.add({
    build: {
      // https://vitejs.dev/guide/build.html#library-mode
      lib: {
        entry: resolve(process.cwd(), "src/index.ts"),
        formats: ["es", "cjs"],
        fileName: format => (format === "es" ? "index.mjs" : "index.cjs")
      },
      target: [ "es2020" ]
    },
    plugins: UserPluginBuilder().build()
  });

  if (ViteEnv.isDev()) {
    configs.add({
      build: {
        sourcemap: true,
        minify: false,
        rollupOptions: {
          treeshake: false
        }
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
export function UserPluginBuilder() {
  const options = new PluginBuilder([
    tsconfigPaths()
  ]);
  if (ViteEnv.isDev()) {
    options.add(incremental())
  }
  if (ViteEnv.isProd()) {
    options.add(dts());
  }
  return options;
}
