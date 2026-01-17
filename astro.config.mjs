// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
// SPDX-License-Identifier: MIT

import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://basingstoke.repair',
  outDir: './dist',
  publicDir: './public',
  build: {
    assets: 'assets'
  },
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }
});
