import { ConfigEnv } from "vite";
import { defineConfig } from "vitest/config";

import { UserConfigBuilder, UserPluginBuilder } from "vite-config-custom";

// == Vite Config =============================================================
// https://vitejs.dev/config/#build-lib
export default (viteConfigEnv: ConfigEnv) => {
  return defineConfig({
    ...UserConfigBuilder(viteConfigEnv).build()
  });
};
