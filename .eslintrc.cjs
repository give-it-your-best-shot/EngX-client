module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        trailingComma: "es5",
        semi: true,
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "no-unused-vars": ["error"],
      },
    ],
  },
};
