import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

// Flat config for ESLint 9. Run with `npm.cmd run lint`.
export default [
  // Build output, dependencies and tooling scratch directories are never linted.
  { ignores: ['dist/', 'node_modules/', '.astro/', '.wrangler/'] },

  // Core recommended rules for every JS file, including the Node-side configs.
  js.configs.recommended,

  {
    files: ['*.config.js', '*.config.mjs'],
    languageOptions: { globals: { ...globals.node } },
  },

  // Astro components: parser, JSX/A11y and formatting rules from the plugin.
  ...astro.configs['flat/base'],

  // TypeScript rules for .ts files only: unrestricted, these configs would
  // also claim **/*.astro and replace the Astro parser with the TS one.
  ...tsEslint.configs.recommended.map((config) => ({ ...config, files: ['**/*.ts'] })),
  {
    files: ['**/*.astro'],
    languageOptions: {
      parserOptions: {
        // Parse TS frontmatter and TS <script> blocks inside .astro files.
        parser: tsEslint.parser,
        extraFileExtensions: ['.astro'],
      },
      globals: { ...globals.browser },
    },
  },
  {
    files: ['src/**/*.{ts,astro}'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
];