const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  // https://github.com/jsx-eslint/eslint-plugin-react#configuration
  extends: [
    "custom",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended"
  ],
  plugins: [
    "react-refresh"
  ],
  rules: {
    "react-refresh/only-export-components": "warn",
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    es2020: true
  }
});
