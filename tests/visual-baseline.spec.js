// SPDX-FileCopyrightText: 2025-2026 Basingstoke Repair Network
// SPDX-License-Identifier: MIT

import { test, expect } from '@playwright/test';
import path from 'path';
import { pathToFileURL } from 'url';

test('Generate Golden Master baseline from design reference', async ({ page }) => {
  // Use the symlink in the project root to make this portable across machines
  const designFilePath = path.resolve('design/index.html');
  const designPath = pathToFileURL(designFilePath).href;

  await page.goto(designPath);

  // Mask dynamic elements that cause flakiness (e.g., Google Maps)
  const mapContainer = page.locator('.map-container iframe');

  // We use toHaveScreenshot here specifically to generate/update the baseline
  // This will save a snapshot for each project/viewport configured in playwright.config.js
  await expect(page).toHaveScreenshot('golden-master', {
    fullPage: true,
    mask: [mapContainer],
    timeout: 15000,
  });
});
