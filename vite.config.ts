/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  cacheDir: './.cache/vitest',
  test: {
    globals: true,
    environment: 'node',
  },
});
