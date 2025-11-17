import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [],
  site: 'https://kingsfurlong.basingstoke.repair',
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