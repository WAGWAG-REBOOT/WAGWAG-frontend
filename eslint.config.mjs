// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({ ignores: ["dist", "node_modules", "vite.config.ts"] }, {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    import: importPlugin,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,

    // Import 순서 관련 규칙
    "import/order": [
      "off",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "type"],
        pathGroups: [
          // React를 가장 먼저
          {
            pattern: "react",
            group: "builtin",
            position: "after",
          },
          {
            pattern: "@/apis/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/components/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/pages/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/viewModels/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/queries/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/stores/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/types/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/utils/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "internal",
            position: "before",
          },
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
}, storybook.configs["flat/recommended"]);
