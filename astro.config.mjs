// SPDX-FileCopyrightText: 2025--2026 Basingstoke Repair Network
// SPDX-License-Identifier: MIT

import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [],
  output: 'static',
  build: {
    // Single-page static site — CSS is only ever used once, so inlining
    // it avoids an extra render-blocking request with no repeat-view
    // cache downside.
    inlineStylesheets: 'always',
  },
});
