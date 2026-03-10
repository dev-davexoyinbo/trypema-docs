// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  ignores: [".nuxt/**", ".output/**", "node_modules/**"],

  rules: {
    "quotes": ["error", "double"],
    "@stylistic/quotes": ["error", "double"],
    "@stylistic/comma-dangle": ["error", "always-multiline"],
    "@stylistic/semi": ["error", "always"],
  },
});
