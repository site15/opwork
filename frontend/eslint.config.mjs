// @ts-check

import { defineConfig } from '@vben/eslint-config';

export default defineConfig([
  {
    ignores: ['apps/web-antd/src/generated/**/*'],
  },
  {
    rules: {
      'unicorn/no-nested-ternary': 'off',
    },
  },
]);
