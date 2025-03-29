import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  {
    ignores: ["esbuild.config.js", "dist/**", "node_modules/**"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': 'error',
      'no-debugger': 'off',
      'no-console': 'off',
      'eol-last': ['error', 'always'],
      'no-empty': 'warn',
      'no-empty-function': 'warn',
      'no-var': 'error',
      indent: [
        'error',
        2,
        {
          SwitchCase: 1,
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          offsetTernaryExpressions: false,
          ignoredNodes: ['ConditionalExpression'],
        },
      ],
      camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'func-call-spacing': ['error', 'never'],
      'block-spacing': ['error', 'always'],
      'no-trailing-spaces': [
        'error',
        { skipBlankLines: true, ignoreComments: true },
      ],
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: true,
          memberSyntaxSortOrder: ['all', 'single', 'multiple', 'none'],
          allowSeparatedGroups: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
  },
}
];
