import type { ConfigEnv } from "vite";

import { UserConfig } from "vite-config-custom";

// == Vite Config =============================================================
// https://vitejs.dev/config/#build-lib
export default (viteConfigEnv: ConfigEnv) => {
  return UserConfig(viteConfigEnv);
};
