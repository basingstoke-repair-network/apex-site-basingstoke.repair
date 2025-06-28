// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network <dev@basingstoke.repair>
//
// SPDX-License-Identifier: CC0-1.0

// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind'; // Import the official Astro Tailwind integration
import image from '@astrojs/image';       // Import the official Astro Image integration (if you're using <Image />)

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), // Use the official Astro Tailwind integration
    image(),    // Use the official Astro Image integration (if applicable)
  ],
  // Remove any 'vite' or 'postcss' blocks if they are trying to configure Tailwind
  // or PostCSS manually. The `tailwind()` integration handles it.
});
