// SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
// SPDX-License-Identifier: MIT

import eslintPluginAstro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['design/**', 'dist/**', '.astro/**', 'node_modules/**'],
  },
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    // Astro's build pipeline strips TypeScript syntax from every
    // <script> block, even without a `lang="ts"` attribute, so lint
    // them all as TS regardless of the declared lang.
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        parser: {
          js: tsParser,
          ts: tsParser,
        },
      },
    },
  },
];
