import { defineConfig } from 'tsup';

export default defineConfig({
  tsconfig: './tsconfig.json',
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
    entry: 'src/index.ts',
  },
  sourcemap: true,
  clean: true,
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.mjs' : '.cjs',
    };
  },
  minify: true,
  target: 'es2020',
  outDir: 'dist',
  external: [],
  splitting: true,
  platform: 'neutral',
});
