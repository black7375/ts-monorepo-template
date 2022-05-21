# == Base =====================================================================
# Init yarn3 with corepack
# https://dev.to/arcanis/yarn-31-corepack-esm-pnpm-optional-packages--3hak
yarn init -2 -w
yarn config set nodeLinker pnpm # pnp | pnpm | node-modules
# yarn config set pnpEnableEsmLoader true # if use pnp mode

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
yarn plugin import typescript
yarn run tsc --init

yarn add -D vite-plugin-dts # vite-dts not works

# Lint & Format
yarn add -D prettier
