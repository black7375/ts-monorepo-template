# == Base =====================================================================
# Init yarn3 with corepack
# https://dev.to/arcanis/yarn-31-corepack-esm-pnpm-optional-packages--3hak
yarn init -2 -w
yarn config set nodeLinker pnpm # pnp | pnpm | node-modules
# yarn config set pnpEnableEsmLoader true # if use pnp mode

# Yarn package plugins
yarn plugin import interactive-tools
yarn plugin import https://mskelton.dev/yarn-outdated/v3

# Monorepo
# https://turborepo.org/docs/getting-started#install-turbo
yarn add -D turbo
# yarn create turbo

# Bundler
yarn add -D vite
# yarn create vite

# Typescript
# https://dev.to/mxro/the-ultimate-guide-to-typescript-monorepos-5ap7
yarn add -D typescript @types/node
yarn add tslib
yarn plugin import typescript
yarn run tsc --init

# Plugins
yarn add -D vite-plugin-dts # vite-dts not works

# Lint & Format
yarn add -D eslint \
            esprint \
            prettier \
            @typescript-eslint/eslint-plugin \
            eslint-plugin-prettier
yarn workspace eslint-config-custom add -D \
  @typescript-eslint/parser \
  eslint-config-prettier
yarn workspace eslint-config-custom add -P eslint
# yarn run -T eslint --init

# Test
yarn add -D vitest c8

# hook
# https://typicode.github.io/husky/
yarn add -D husky
yarn husky install configs/husky
yarn husky add configs/husky/pre-commit "yarn check:all"

# Others
yarn add -D rimraf
