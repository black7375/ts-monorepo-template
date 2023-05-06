# == Self update ==============================================================
yarn set version latest

# == Plugins ==================================================================
# Re import plugin
# https://github.com/yarnpkg/berry/discussions/4823
yarn plugin import interactive-tools
yarn plugin import typescript
yarn plugin import https://mskelton.dev/yarn-outdated/v3

# == Packages =================================================================
yarn upgrade-interactive
