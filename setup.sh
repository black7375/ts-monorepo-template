# == Base =====================================================================
# Init yarn3 with corepack
# https://dev.to/arcanis/yarn-31-corepack-esm-pnpm-optional-packages--3hak
yarn init -2 -w

# Monorepo
# https://turborepo.org/docs/getting-started#install-turbo
yarn add -D turbo

# Typescript
# https://dev.to/mxro/the-ultimate-guide-to-typescript-monorepos-5ap7
yarn add -D typescript@next
yarn run tsc --init
