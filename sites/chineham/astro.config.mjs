import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://chineham.basingstoke.repair',
  base: '/',
  output: 'static',
  
  vite: {
    resolve: {
      alias: {
        '@shared': new URL('../../shared', import.meta.url).pathname
      }
    }
  }
});