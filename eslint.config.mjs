import tseslint from '@typescript-eslint/eslint-plugin';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const eslintRecommendedRules = Object.fromEntries(
  [...builtinRules].filter(([, rule]) => rule.meta?.docs?.recommended).map(([name]) => [name, 'error'])
);

export default [
  {
    ignores: ['**/dist', 'packages/block-text/she.mjs'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: eslintRecommendedRules,
  },
  ...tseslint.configs['flat/recommended'].map((config) => ({ ...config, files: ['**/*.{ts,tsx}'] })),
  {
    ...reactHooks.configs.flat.recommended,
    files: ['**/*.{ts,tsx}'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-empty-interface': ['off'],
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/no-unused-vars': ['error'],
      curly: ['error', 'all'],
      indent: ['off'],
      'no-empty': ['error', { allowEmptyCatch: true }],
      'no-extra-boolean-cast': ['error', { enforceForLogicalOperands: false }],
      'no-implicit-coercion': 'error',
      'no-duplicate-imports': 'error',
      quotes: ['error', 'single', { avoidEscape: false, allowTemplateLiterals: true }],
      semi: ['error', 'always'],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000'], ['^\\w'], ['^@'], ['^'], ['^\\.\\.'], ['^\\.']],
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': ['off'],
    },
  },
];
