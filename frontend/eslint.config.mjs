// @ts-check

import { defineConfig } from '@vben/eslint-config';

export default defineConfig([
  {
    ignores: ['apps/web-naive/src/generated/**/*'],
  },
  {
    rules: {
      'unicorn/no-nested-ternary': 'off',
    },
  },
]);
