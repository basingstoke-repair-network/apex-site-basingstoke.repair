import { defineConfig } from 'vitest/config';
import { getViteConfig } from 'astro/config';

export default defineConfig(
  getViteConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/**/*.{test,spec}.{js,ts}', 'sites/**/tests/**/*.{test,spec}.{js,ts}'],
      exclude: ['node_modules', 'dist', 'sites/*/node_modules', 'sites/*/dist'],
      coverage: {
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'dist/',
          'sites/*/node_modules/',
          'sites/*/dist/',
          'tests/',
          '**/*.d.ts',
          '**/*.config.*'
        ]
      }
    },
    resolve: {
      alias: {
        '@shared': new URL('./shared', import.meta.url).pathname,
        '@tests': new URL('./tests', import.meta.url).pathname
      }
    }
  })
);