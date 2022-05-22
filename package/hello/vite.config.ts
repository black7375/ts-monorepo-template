import { resolve } from "path";
import { defineConfig, ConfigEnv, UserConfig, PluginOption } from "vite";
import dts from 'vite-plugin-dts';

// == Vite Config =============================================================
// https://vitejs.dev/config/#build-lib
export default ({ command, mode }: ConfigEnv) => {
  Build.set(command, mode);
  return defineConfig({
    ...userOption(),
    plugins: pluginOption()
  });
};

class Build {
  private static COMMAND: ConfigEnv["command"];
  private static MODE: ConfigEnv["mode"];

  public static set(command: ConfigEnv["command"], mode: ConfigEnv["mode"]) {
    Build.COMMAND = command;
    Build.MODE = mode;
  }
  public static isDev() {
    return (Build.COMMAND === "build" && Build.MODE === "development");
  }
  public static isProd() {
    return (Build.COMMAND === "build" && Build.MODE === "production");
  }
}

// == Config ==================================================================
function userOption() {
  const configs = new UserConfigBuilder({
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        formats: ["es", "cjs"],
        fileName: (format) => (format === "es") ? "index.mjs" : "index.cjs"
      }
    }
  });
  if (Build.isDev()) {
    configs.add({
      build: {
        sourcemap: true,
        minify: false
      }
    });
  }
  if (Build.isProd()) {
    configs.add({
      build: {
        sourcemap: false,
        minify: "terser"
      }
    });
  }
  return configs.build();
}

interface IObject {
  [key: string]: any;
  length?: never;
}

class UserConfigBuilder {
  private readonly _configs: UserConfig;

  constructor(configs: UserConfig = {}) {
    this._configs = configs;
  }

  private isObject(obj: UserConfig[keyof UserConfig]) {
    return !!obj && typeof obj === 'object'
  }

  private merge(target: IObject, source: IObject) {
    if (!this.isObject(target) || !this.isObject(source)) {
      return source;
    }
  
    Object.keys(source).forEach(key => {
      const targetValue = target[key];
      const sourceValue = source[key];
  
      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        target[key] = targetValue.concat(sourceValue);
      }
      else if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        target[key] = this.merge(Object.assign({}, targetValue), sourceValue);
      }
      else {
        target[key] = sourceValue;
      }
    });
  
    return target;
  }

  add(...configs: UserConfig[]) {
    configs.forEach(config => this.merge(this._configs, config));
    return this;
  }

  build(): UserConfig {
    return this._configs;
  }
}

// == Plugin ==================================================================
function pluginOption() {
  const options = new PluginBuilder();
  if (Build.isProd()) {
    options.add( dts() );
  }
  return options.build();
}

class PluginBuilder {
  private readonly _plugins: PluginOption[];

  constructor(plugins: PluginOption[] = []) {
    this._plugins = plugins;
  }

  add(...plugins: PluginOption[]) {
    plugins.forEach(plugin => this._plugins.push( plugin ));
    return this;
  }

  build(): PluginOption[] {
    return this._plugins;
  }
}