import { initConfigBuilder, ViteEnv, PluginBuilder } from "vite-config-builder";

import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import incremental from "@mprt/rollup-plugin-incremental";

// == Config ==================================================================
export function UserConfigBuilder(viteConfigEnv, initConfigs) {
  const configs = initConfigBuilder(viteConfigEnv, initConfigs);

  if (ViteEnv.isDev()) {
    configs.add({
      build: {
        sourcemap: true,
        minify: false,
        rollupOptions: {
          treeshake: false,
          output: {
            preserveModules: true,
          }
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
