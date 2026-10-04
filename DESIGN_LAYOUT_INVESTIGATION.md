<!--
SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
SPDX-License-Identifier: CC0-1.0
-->

# Design Layout Investigation

Tracks #234: whether `design/index.html` still specifies layout, alignment,
or viewport behaviour that the live Astro implementation
(`src/styles/global.css`) doesn't currently apply. Follows on from #216,
which synced the design reference's spacing/sizing/text to the live site but
didn't audit every breakpoint-driven rule.

## Method

The repo's Playwright golden-master comparison (`VISUAL_TESTING.md`) is the
intended tool for this: render `design/index.html` and the live dev server
at each configured viewport (mobile/tablet/desktop/wide-desktop) and diff
them pixel-by-pixel. That comparison couldn't be run in this environment —
`npx playwright install` fetches a headless Chromium build that fails to
launch here (`libglib-2.0.so.0` and other shared libs are missing from the
host, which isn't a Playwright-supported OS for `install-deps`). Running it
on a supported dev machine or in CI is the natural next step; see
[Follow-up](#follow-up).

In the meantime this investigation did a structural diff instead: extracted
the `<style>` block from `design/index.html`, normalized indentation, and
compared it against `src/styles/global.css`, focused on selectors carrying
`align-items`, `justify-content`, `text-align`, `flex-direction`, or
`flex-wrap`, plus every `@media` breakpoint in both files.

## Findings

- **Breakpoints match.** Both files define exactly the same media query set:
  `max-width: 639px`, `min-width: 640px`, `min-width: 1024px`,
  `min-width: 1440px`, `prefers-reduced-motion: reduce`, `print`.
- **Nav wrap on desktop is missing.** `design/index.html` wraps
  `.site-nav ul { flex-wrap: wrap; ... }` with a
  `@media (min-width: 1024px) { .site-nav ul { flex-wrap: nowrap; } }`
  override. `src/styles/global.css` only has the base `flex-wrap: wrap`
  rule — there's no `nowrap` override at any breakpoint. On desktop and
  wide-desktop viewports the live nav can wrap onto a second line where the
  design intends a single row. This is the one concrete, actionable
  discrepancy found.
- **Everything else surveyed is cosmetic reorganization, not a regression:**
  logo `max-width` breakpoint overrides exist in both files (grouped inline
  in the design HTML; grouped by breakpoint near the end of
  `global.css`); `.logo-text`/`footer`/`.supporter-logo` were intentionally
  renamed to `.logo-fallback`/`.site-footer`/`.supporter-tile`; the hero's
  `text-align`/`color`/gradient properties moved from `.hero-section` onto
  `.hero-slide-overlay`/`.hero-slide-content` as part of the live site's
  slideshow hero, which the static design doesn't have.

## Follow-up

- Add a `flex-wrap: nowrap` override for `.site-nav ul` at
  `min-width: 1024px` in `src/styles/global.css` to match the design intent
  (small, separately-scoped fix — not made here since this issue is scoped
  to investigation).
- Get the Playwright golden-master comparison running (locally with system
  Chromium deps installed, or in CI) to catch further per-viewport drift
  beyond what a static CSS diff can see — see #212.
