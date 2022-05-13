# == Base =====================================================================
# Init yarn3 with corepack
yarn init -2

# Monorepo
yarn add -D turbo

# Typescript
yarn add -D typescript@next
yarn run tsc --init
