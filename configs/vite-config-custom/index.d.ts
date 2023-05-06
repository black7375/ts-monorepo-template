import type { PluginBuilder } from "vite-config-builder";
import type { ConfigEnv, mergeConfig } from "vite";

export declare function UserConfig(
  viteConfigEnv: ConfigEnv,
  initConfigs?: Parameters<typeof mergeConfig>[1]
): ReturnType<typeof mergeConfig>;
export { initConfigBuilder as UserConfigBuilder } from "vite-config-builder";
export declare function UserPluginBuilder(): PluginBuilder;
