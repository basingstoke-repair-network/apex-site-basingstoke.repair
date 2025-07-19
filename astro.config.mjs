// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network <dev@basingstoke.repair>
//
// SPDX-License-Identifier: CC0-1.0

// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // Import the official Astro Tailwind integration

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), // Use the official Astro Tailwind integration
  ],
  image: {
    // Configure image optimization to preserve quality for logos with text
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Override compression for logos to maintain text clarity
        limitInputPixels: false,
      }
    }
  },
  vite: {
    plugins: [
      {
        name: 'strip-spdx-headers',
        transform(code, id) {
          // Strip SPDX license headers from JS/TS files
          if (id.endsWith('.js') || id.endsWith('.ts') || id.endsWith('.mjs')) {
            return code.replace(/^\/\/ SPDX-.*\n(\/\/.*\n)*/m, '');
          }
          // Strip SPDX headers from Astro files (HTML-style comments)
          if (id.endsWith('.astro')) {
            return code.replace(/^<!--\s*\n?\s*SPDX-FileCopyrightText:.*?\n\s*\n\s*SPDX-License-Identifier:.*?\n\s*-->\s*\n/s, '');
          }
          // Strip SPDX headers from HTML files
          if (id.endsWith('.html')) {
            return code.replace(/^<!--\s*\n?\s*SPDX-FileCopyrightText:.*?\n\s*\n\s*SPDX-License-Identifier:.*?\n\s*-->\s*\n/s, '');
          }
          // Strip SPDX headers from CSS files
          if (id.endsWith('.css')) {
            return code.replace(/^\/\* SPDX-.*\n(\*\/\n|.*\n)*?\*\/\n/m, '');
          }
          return null;
        }
      }
    ]
  }
});
