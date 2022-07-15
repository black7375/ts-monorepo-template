# ts-monorepo-template

## Features

- Package Manage: Yarn PNPM mode
- Monorepo Task: Turborepo
- Build: Vite
- Test: Vitest
- Pre-Commit hook: Husky
- Shared eslint, prettier, typescript, vite configs

## Useage

- `build`: Build with development mode
- `build:release`: Build with production mode
- `lint`: Lint `.ts` files with EsLint
- `fix`: Try to fix the lint results
- `check`: Check the type
- `check:all`: Type check and lint at the same time
- `test`: Run `.ts` files test with vitest
- `test:all`: Run test, type check, lint at the same time
- `coverage`: Show test coverage
- `clean`: Remove the results of builds and tests
