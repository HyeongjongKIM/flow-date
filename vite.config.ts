/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  cacheDir: './.vite',
  test: {
    globals: true,
    environment: 'node',
  },
});
