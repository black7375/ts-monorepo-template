import { resolve } from "path";
import { defineConfig, PluginOption } from "vite";
import dts from 'vite-plugin-dts';

// == Vite Config =============================================================
// https://vitejs.dev/config/#build-lib
export default ({ command, mode }: typeof process.env) => defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es") ? "index.mjs" : "index.cjs"
    }
  },
  plugins: pluginOption(command, mode)
});

// == Plugin ==================================================================
function pluginOption(command: string, mode: string) {
  const options = new PluginBuilder();
  if (command === "build") {
    options.add( dts() );
  }
  return options.build();
}

class PluginBuilder {
  private readonly _plugins: PluginOption[];

  constructor(plugins: PluginOption[] = []) {
    this._plugins = plugins;
  }

  add(...plugins: PluginOption[]): PluginBuilder {
    plugins.forEach(plugin => this._plugins.push( plugin ));
    return this;
  }

  build(): PluginOption[] {
    return this._plugins;
  }
}
