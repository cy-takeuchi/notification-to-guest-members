module.exports = {
  extends: [
    "@cybozu/eslint-config/presets/typescript",
    "@cybozu/eslint-config/presets/typescript-prettier",
  ],
  plugins: ["import"],
  env: {
    node: true,
  },
  rules: {
    // define import rules
    "import/order": [
      "error",
      // the order of import is sorted as follows:
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
  },
};
