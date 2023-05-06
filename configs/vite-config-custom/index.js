import { resolve } from "path";
import { initConfigBuilder, ViteEnv, PluginBuilder } from "vite-config-builder";
import { mergeConfig } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";
import incremental from "@mprt/rollup-plugin-incremental";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// == Main Configs ============================================================
export function NodeConfig(viteConfigEnv, extendConfigs = {}) {
  return buildConfig(viteConfigEnv, extendConfigs, NodeBuilder);
}

export function ReactConfig(viteConfigEnv, extendConfigs = {}) {
  return buildConfig(viteConfigEnv, extendConfigs, ReactBuilder);
}

function buildConfig(viteConfigEnv, extendConfigs, configBuilder) {
  return mergeConfig({
    ...configBuilder(viteConfigEnv).build()
  }, extendConfigs);
}

// == Main Configs ============================================================
function NodeBuilder(viteConfigEnv) {
  const { configs, plugins } = initCommonBuilder(viteConfigEnv);

  if (ViteEnv.isDev()) {
    plugins.add(incremental());
  }
  if (ViteEnv.isProd()) {
    plugins.add(dts());
  }

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
    plugins: plugins.build()
  });
  return configs;
}

function ReactBuilder(viteConfigEnv) {
  const { configs, plugins } = initCommonBuilder(viteConfigEnv);

  plugins.add(react());
  configs.add({
    plugins: plugins.build()
  });
  return configs;
}

function initCommonBuilder(viteConfigEnv) {
  const configs = initConfigBuilder(viteConfigEnv);

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
        includeSource: ["src/**/*.ts", "src/**/*.tsx"],
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

  const plugins = new PluginBuilder([
    tsconfigPaths()
  ]);

  return {
    configs,
    plugins
  };
}
