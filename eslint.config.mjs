import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist", "node_modules", "vite.config.ts"] },
  {
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
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          ignoreCase: true,
        },
      ],

      // Import 순서 관련 규칙
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "type",
          ],
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
  },
);
