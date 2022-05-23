module.exports = {
  $schema: "https://json.schemastore.org/eslintrc.json",
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  env: {
    node: true
  },
  ignorePatterns: ["dist/**", "node_modules/**"]
};
