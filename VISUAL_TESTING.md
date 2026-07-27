<!--
SPDX-FileCopyrightText: 2025-2026 Basingstoke Repair Network
SPDX-License-Identifier: MIT
-->

# Visual Comparison Testing

This project uses a "Golden Master" visual regression strategy to ensure the implementation of the site matches the original design reference across multiple device viewports.

## Overview

Instead of comparing the site to its own previous version, this test compares the live development server against a set of baseline screenshots captured directly from the design reference HTML.

## How it Works

1.  **Golden Master Generation**: A specialized test (`tests/visual-baseline.spec.js`) navigates to the design reference HTML and captures a high-resolution screenshot for each configured viewport (Mobile, Tablet, Desktop, Wide Desktop). Alternatively, run the comarison test with --update-snapshots.
2.  **Comparison**: The main test (`tests/visual-comparison.spec.js`) navigates to the local dev server and compares the current state against the corresponding Golden Master snapshot.
3.  **Flakiness Mitigation**: Dynamic elements, such as Google Maps iframes, are automatically masked during both capture and comparison to prevent false positives.
4.  **Tolerance**: The test is configured to allow up to **1,000 differing pixels** to account for minor rendering variations.

## How to Use

### 1. Prerequisites

Create a symlink called design in your local project folder
to the actual folder holding the design index.html

### 2. Initialise Playwright

Install Playwright the first time:

```bash
npx playwright install
```

This is in addition to npm install.

### 3. Generate or Update Baselines

When the design reference changes copy the design HTML file to the design folder and rename to index.html.

When the design reference changes or when first setting up the tests, generate the Golden Master snapshots:

```bash
npx playwright test tests/visual-baseline.spec.js --update-snapshots
```

When snapshotting the current development:

```bash
npx playwright test tests/visual-comparison.spec.js --update-snapshots
```

### 4. Run the Comparison Test

Execute the visual comparison spec to compare the current snapshot:

```bash
npx playwright test tests/visual-comparison.spec.js
```

## Interpreting Results

### The Diff Image

If a test fails, Playwright generates a visual diff image showing exactly where the implementation deviates from the design. These are located in the project's snapshot directories.

### The Pixel Count

The test will fail if more than **1,000 pixels** differ between the implementation and the baseline.

## Configuration

The viewports and server settings are managed in `playwright.config.js`:

- **Base URL**: `http://localhost:4321`
- **Viewports**:
  - `mobile`: Pixel 5
  - `tablet`: iPad Mini
  - `desktop`: Desktop Chrome
  - `wide-desktop`: 1920x1080
- **Tolerance**: Adjusted via `maxDiffPixels: 1000` in `tests/visual-comparison.spec.js`.
