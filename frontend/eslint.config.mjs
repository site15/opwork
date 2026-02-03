// @ts-check

import { defineConfig } from '@vben/eslint-config';

export default defineConfig([
  {
    ignores: ['apps/web-antd/src/generated/**/*', 'apps/web-antd/scripts/**/*'],
  },
  {
    rules: {
      'unicorn/no-nested-ternary': 'off',
    },
  },
]);
