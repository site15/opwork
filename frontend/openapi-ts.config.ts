import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../backend/swagger.json',
  output: 'apps/web-naive/src/generated/client',
});
