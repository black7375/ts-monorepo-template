import { UserConfig, PluginOption } from "vite";

// == Config ==================================================================
interface IObject {
  // eslint-disable-next-line
  [key: string]: any;
  length?: never;
}

export class ConfigBuilder {
  private readonly _configs: UserConfig;

  constructor(configs: UserConfig = {}) {
    this._configs = configs;
  }

  private isObject(obj: UserConfig[keyof UserConfig]) {
    return !!obj && typeof obj === "object";
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
      } else if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        target[key] = this.merge(Object.assign({}, targetValue), sourceValue);
      } else {
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
export class PluginBuilder {
  private readonly _plugins: PluginOption[];

  constructor(plugins: PluginOption[] = []) {
    this._plugins = plugins;
  }

  add(...plugins: PluginOption[]) {
    plugins.forEach(plugin => this._plugins.push(plugin));
    return this;
  }

  build(): PluginOption[] {
    return this._plugins;
  }
}
