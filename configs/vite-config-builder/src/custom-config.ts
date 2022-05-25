import { ConfigEnv, UserConfig } from "vite";
import { ConfigBuilder } from "./config-builder";

// == Shared Config ============================================================
export function UserConfigBuilder(
  { command, mode }: ConfigEnv,
  defaultOption: UserConfig = {}
) {
  console.log("command: " + command + " mode: " + mode);
  Build.set(command, mode);

  const configs = new ConfigBuilder(defaultOption);
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
  if (Build.isTest()) {
    configs.add({
      test: {
        includeSource: ["src/**/*.ts"]
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

// == Build Types =============================================================
export class Build {
  private static COMMAND: ConfigEnv["command"];
  private static MODE: ConfigEnv["mode"];

  public static set(command: ConfigEnv["command"], mode: ConfigEnv["mode"]) {
    Build.COMMAND = command;
    Build.MODE = mode;
  }
  public static isDev() {
    return Build.COMMAND === "build" && Build.MODE === "development";
  }
  public static isProd() {
    return Build.COMMAND === "build" && Build.MODE === "production";
  }
  public static isTest() {
    return Build.COMMAND === "serve" && Build.MODE === "test";
  }
}
