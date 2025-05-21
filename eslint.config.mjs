import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import packageJson from 'eslint-plugin-package-json';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.yarn/**',
      '**/*.config.{js,ts,mjs,cjs,mts,cts}',
      '.pnp.*',
    ],
  },
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...prettier.rules,
      '@typescript-eslint/explicit-function-return-type': 'warn',
      // '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
      'no-restricted-exports': [
        'error',
        {
          restrictDefaultExports: {
            named: true,
            direct: true,
          },
        },
      ],
    },
  },
  {
    files: ['package.json'],
    ...packageJson.configs.recommended,
  },
);
