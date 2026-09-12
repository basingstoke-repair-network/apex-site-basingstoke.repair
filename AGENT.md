<!--
SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
SPDX-License-Identifier: CC0-1.0
-->

# Agent Context & Directives

This file contains context and directives for AI assistants working on the Basingstoke Repair Network (BRN) website project. (Previously named `CLAUDE.md`.)

## Project Overview

**Project Name**: Basingstoke Repair Network - Website (V2)
**Project Type**: Astro.js static site for community repair cafés
**Repository**: apex-site-basingstoke.repair
**Main branch**: `live`
**Status**: V2 in Continual Enhancement sprints alongside ongoing support (e.g. content changes)
**Hosted on**: Netlify

## Project Purpose

Build a lightweight, performant static website to establish an online presence for the Basingstoke Repair Network, serving three main audiences:
- **Visitors**: what to expect, locations, dates/times, photos
- **Volunteers**: how to get involved
- **Supporters/funders**: who backs the network and how

Some information (e.g. why repair matters) spans more than one audience.

## Technology Stack

### Core Technologies
- **Astro.js v7**: Static site generator — component-based, outputs minimal HTML/CSS/JS. Content is managed via Astro's content layer (`src/content.config.ts`) with `glob()` loaders over per-item JSON files — there is no CMS wired up yet (Decap CMS + DecapBridge integration has only been proposed, not implemented; see git history for `docs: propose Decap CMS...`).
- **Plain CSS**: No CSS framework — brand colors, spacing, and typography are hand-authored as CSS custom properties in `src/styles/global.css` (TailwindCSS was used in the V1 static prototype only and has since been dropped).
- **Node.js**: Build tooling and dev server

### Performance Philosophy
- **Lightweight by default**: Prefer zero-JS pages; only ship JavaScript where genuinely required
- **CDN for external resources**: Load third-party libraries (icons, fonts, carousels, etc.) from CDNs rather than bundling them — reduces build complexity and leverages CDN caching
- **No unnecessary dependencies**: Evaluate each new package against its benefit; prefer native browser features or CDN-served micro-libraries over large npm dependencies
- **Static output**: The site must build to fully static HTML (`output: 'static'` in `astro.config.mjs`) — no server-side rendering at runtime. The build also inlines all stylesheets (`inlineStylesheets: 'always'`), since this is a single page and inlining avoids an extra render-blocking request.

### CDN Dependencies (preferred over npm installs)
- Font Awesome: Icons and visual elements
- Any carousel/slider library (e.g. Swiper.js) if needed
- Any other runtime UI library should come from a CDN, not bundled

### Development & QA Tools
- `astro` CLI: dev server, build, preview
- npm scripts: `dev`, `build`, `preview`, `lint` (ESLint via `eslint-plugin-astro`), `format:check` (Prettier, HTML)
- **Playwright**: golden-master visual regression testing against a design reference (`tests/visual-baseline.spec.js`, `tests/visual-comparison.spec.js`) — see `VISUAL_TESTING.md` for setup and usage
- **[prek](https://github.com/j178/prek) hooks** (`.pre-commit-config.yaml`): a Rust reimplementation of `pre-commit`, run locally via `prek run --all-files` (or plain `pre-commit`, which the config stays compatible with) and enforced in CI by `.github/workflows/pre-commit.yml`. Runs on every commit — trailing-whitespace/EOF/line-ending fixers, YAML/JSON/TOML validation, merge-conflict and large-file checks, Conventional Commits message linting (`commit-msg` stage), REUSE/SPDX header compliance, and ESLint + Prettier (HTML) against this repo's own `node_modules`. Install once with `prek install` so hooks run automatically before you hand off a commit.
- GitHub Actions workflows (`.github/workflows/`): `build.yml`, `pre-commit.yml`, `pull-requests-depends.yml`

## File Structure

```
apex-site-basingstoke.repair/
├── src/
│   ├── components/         # Reusable Astro components (Header, Hero, HowItWorks,
│   │                       # WhyRepair, Locations, NextDate, Volunteer, Supporters,
│   │                       # Footer, GalleryCarousel)
│   ├── layouts/            # Page layout templates (BaseLayout.astro)
│   ├── pages/              # File-based routing — currently a single page (index.astro)
│   ├── content.config.ts   # Astro content layer collection definitions
│   ├── content/
│   │   ├── locations/      # One JSON file per repair café location
│   │   └── supporters/     # One JSON file per supporter organization
│   └── styles/
│       └── global.css      # Brand colors, spacing, typography as CSS custom properties
├── public/                 # Static assets served as-is
│   ├── assets/
│   │   └── images/
│   │       ├── logos/      # BRN logo
│   │       ├── locations/  # Team photos
│   │       ├── supporters/ # Supporter logos
│   │       └── hero-*.jpg  # Hero images
│   └── robots.txt
├── tests/                  # Playwright visual regression tests
├── astro.config.mjs        # Astro configuration
├── eslint.config.*         # ESLint (eslint-plugin-astro)
├── playwright.config.js    # Playwright configuration
├── package.json            # Node.js dependencies
├── netlify.toml            # Netlify deployment config
├── .gitignore
├── VISUAL_TESTING.md       # Visual regression testing guide
└── README.md
```

## Brand Colors (BRN Color Palette)

```css
:root {
    --header-bg: #c6c8c9;        /* Light gray header background */
    --header-icon: #28276f;      /* Deep blue for icons/links */
    --content-bg: #eeeeee;       /* Off-white content background */
    --content-text: #02011A;     /* Near-black text */
    --footer-bg: #28276f;        /* Deep blue footer background */
    --footer-text: #eeeeee;      /* Off-white footer text */
}
```

**Never change these colors without explicit approval.**

## Content Structure

### Location Information (DO NOT MODIFY without user request)

Each location is a JSON file in `src/content/locations/`, validated against the
`locations` collection schema in `src/content.config.ts`.

**When adding a new location**: check its address (in `src/content/locations/`)
against the number of lines rendered by `.location-address` in
`src/components/Locations.astro`. The card grid uses a shared min-height
(defined in `src/styles/global.css`, currently sized for a 3-line address —
venue, street, postcode) so map iframes stay aligned across cards on
multi-column layouts. An address needing a 4th line requires bumping that
min-height too.

### Contact Information
- Email: info@basingstoke.repair

### Supporter Organizations
Each supporter is a JSON file in `src/content/supporters/`, validated against
the `supporters` collection schema in `src/content.config.ts`.

## Git Workflow & Commit Standards

### Never Push Directly to `live`

**`live` is the protected main/production branch — nothing is ever pushed to it directly, including by AI assistants.** All changes go through a feature branch and a pull request, even when the remote allows a bypass.

This matters especially when creating a branch with `git checkout -b <name> origin/live`: Git sets that branch's upstream tracking to `origin/live` itself, not to a same-named remote branch. A plain `git push -u origin <name>` in that state pushes straight onto `live`. Always push new branches explicitly by refspec instead:

```bash
git push -u origin HEAD:refs/heads/<branch-name>
```

After the first push, double-check with `git branch -vv` that the branch tracks `origin/<branch-name>`, not `origin/live`, before pushing again.

### Commit Message Format

Follow **Conventional Commits** specification (checked by the
`conventional-pre-commit` [prek hook](#development--qa-tools) at
`commit-msg` stage). Commits authored or assisted by an AI assistant
**must** also carry an `Assisted-by:` trailer identifying the tool:

```
<type>: <short summary>

<detailed description>

Assisted-by: Claude Code <noreply@anthropic.com>
```

**Types**: feat, fix, docs, style, refactor, test, chore

### Compartmentalized Commits

**ALWAYS commit changes in logical, isolated units:**
- Each commit should represent ONE logical change
- Group related files together
- Never mix unrelated changes in a single commit

**Example Pattern:**
1. Config files (astro.config.mjs, netlify.toml, package.json)
2. Layout/component structure
3. Page content
4. Styling
5. CMS configuration
6. Documentation

### HEREDOC for Commit Messages

Always use HEREDOC for multi-line commit messages:

```bash
git commit -m "$(cat <<'EOF'
feat: add feature description

Detailed explanation of changes.

Assisted-by: Claude Code <noreply@anthropic.com>
EOF
)"
```

## REUSE Compliance (SPDX)

### Licensing Standard

**ALL files must include SPDX licensing headers.** The identifier depends on
the kind of file:

<!-- REUSE-IgnoreStart -->

- **Code** (Astro/HTML components, CSS, JS/TS, config files such as
  TOML/YAML): `SPDX-License-Identifier: MIT`
- **Documentation, other Markdown, and images** (README/CLAUDE.md/docs,
  `.md` files generally, and image assets under `public/assets/images/`
  and test snapshots): `SPDX-License-Identifier: CC0-1.0`

#### Astro/HTML files (code):
```html
<!--
SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
SPDX-License-Identifier: MIT
-->
```

#### Markdown/documentation files:
```html
<!--
SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
SPDX-License-Identifier: CC0-1.0
-->
```

#### CSS files:
```css
/*
 * SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
 * SPDX-License-Identifier: MIT
 */
```

#### JavaScript/TypeScript files:
```javascript
// SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
// SPDX-License-Identifier: MIT
```

#### Configuration files (TOML, YAML, etc.):
```toml
# SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
# SPDX-License-Identifier: MIT
```

#### JSON files:
Create a companion `.license` file:
```
SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
SPDX-License-Identifier: MIT
```

#### Image files:
Create a companion `.license` file:
```
SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
SPDX-License-Identifier: CC0-1.0
```

<!-- REUSE-IgnoreEnd -->

### License
This project's code is licensed under the **MIT License**; documentation and
images are licensed under **CC0-1.0**. See LICENSE file for details.

## Character Encoding

### Unicode Handling

**CRITICAL**: Always use proper UTF-8 characters, never escape sequences:

✅ **CORRECT**: `Café`, `cafés`
❌ **WRONG**: `Café`, `cafés`

✅ **CORRECT**: `❤️` (heart emoji)
❌ **WRONG**: `❤️`

### Common Characters Used
- é (U+00E9): Café, cafés
- – (U+2013): En dash for ranges
- — (U+2014): Em dash for emphasis
- ❤️ (U+2764 U+FE0F): Heart emoji

**Always verify no `\u` escape sequences exist before committing.**

## Image Requirements

Images live in `public/assets/images/`:

1. **Logo**: `logos/brn-logo.png` (200×200px+, transparent PNG)
2. **Hero Images**: `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` (1920×1080px)
3. **Team Photos**:
   - `locations/chineham-team.jpg` (800×600px)
   - `locations/hatch-warren-team.jpg` (800×600px)
4. **Supporter Logos**: PNG files in `supporters/` (max 80px height)

### Fallback Behavior
The site should gracefully handle missing images:
- Hero: gradient background with text overlay
- Team photos: styled placeholder
- Logos: text label fallback

**Do not remove fallback handlers.**

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Deployment

### Netlify (primary host)
Configured via `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist/`
- Security headers and cache optimization included

### Compatibility
The static output is also compatible with:
- Vercel
- Cloudflare Pages
- GitHub Pages (with adapter if needed)
- Any static file host

## Key Features

### Accessibility
- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly markup
- High contrast text ratios
- Focus indicators on all interactive elements

### Performance
- Astro outputs zero JS by default — only hydrate what needs it
- External libraries loaded via CDN (not bundled) to leverage caching
- Lazy loading for images
- Responsive image handling
- Proper cache headers via Netlify config

### Responsive Design
- Mobile-first approach
- Hamburger menu for small screens
- Breakpoints defined ad hoc per component via `min-width` media queries (no framework breakpoint scale)
- Touch-friendly navigation

### Content Management
- Content lives as per-item JSON files under `src/content/locations/` and `src/content/supporters/`, loaded through Astro's content layer (`src/content.config.ts`)
- Edits go through Git — no separate database, no browser-based editor yet (Decap CMS integration is proposed but not implemented)

## Coding Standards

### Astro Components
- Keep components small and single-purpose
- Pass data via props; avoid global state
- Use Astro's `<slot>` for composable layouts
- Prefer `.astro` files; use framework components (React, etc.) only if essential and never for static content

### CSS
- Use the CSS custom properties defined in `src/styles/global.css` for brand colors, spacing, and typography — don't hardcode hex values or magic pixel numbers in component styles
- Mobile-first: base styles target small screens, with `min-width` media queries layering on larger-screen adjustments
- No CSS framework is in use (Tailwind was dropped after the V1 prototype) — don't reintroduce one without explicit user request

### JavaScript
- Ship JS only when necessary (interactivity, not decoration)
- Vanilla JS or lightweight CDN libraries preferred over heavy npm packages
- ES6+ syntax; always `addEventListener`, never inline handlers
- Graceful degradation — check for feature support

### Astro-specific
- Use `Astro.props` typing for components
- Content collections (via `glob()` loaders in `src/content.config.ts`) for locations and supporters data
- Static paths (`getStaticPaths`) for dynamic routes

## Important Directives

### Do NOT Do These Without User Request:
1. Change brand colors
2. Modify location information or schedules
3. Change contact information
4. Remove supporter organizations
5. Add new npm dependencies without justification
6. Introduce server-side rendering or API routes
7. Remove accessibility features
8. Remove SPDX headers
9. Bundle libraries that should be CDN-served

### Always Do These:
1. Commit changes in compartmentalized, isolated commits
2. Add SPDX headers to all new files
3. Use proper UTF-8 characters (no escape sequences)
4. Follow conventional commit message format, with an `Assisted-by:` trailer on AI-assisted commits
5. Test responsive design on mobile/tablet/desktop
6. Maintain accessibility standards
7. Keep the site lightweight — question every new dependency
8. Prefer CDN delivery for external runtime libraries

## Testing Checklist

Before committing changes:
- [ ] No `\u` escape sequences in any files
- [ ] All files have SPDX headers
- [ ] `npm run lint` and `npm run format:check` pass (or run `prek run --all-files` to cover the full hook set at once)
- [ ] `npm run build` completes without errors
- [ ] Commit message has an `Assisted-by:` trailer if AI-assisted
- [ ] Playwright visual regression tests pass (see `VISUAL_TESTING.md`)
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All links work correctly
- [ ] Images have appropriate alt text
- [ ] Browser console has no errors
- [ ] Accessibility: keyboard navigation works
- [ ] Git commit messages follow conventional commits format
- [ ] Changes are in isolated, logical commits

## Future Considerations

### Potential Enhancements (Not Implemented Yet)
- Decap CMS + DecapBridge integration for browser-based content editing (proposed, see git history)
- Blog/news section
- Event calendar integration
- Photo gallery
- Contact form (Netlify Forms)
- Repair item booking system
- Multi-language support
- Progressive Web App (PWA) features

**Do not implement these without explicit user request.**

## Resources

### Official Links
- North Hampshire Repair Network: https://www.northhampshirerepair.org.uk
- Repair Café International: https://www.repaircafe.org

### Development Resources
- Astro Docs: https://docs.astro.build
- Playwright Docs: https://playwright.dev/docs
- Decap CMS Docs: https://decapcms.org/docs (for the proposed future integration)
- Font Awesome Icons: https://fontawesome.com/icons
- REUSE Specification: https://reuse.software

## Version History

### V1 — Initial Static Site (2025-12-07)
- Plain HTML/CSS/JS with TailwindCSS via CDN
- Hero carousel via Swiper.js (CDN)
- No build step; served directly from `public/`

### V2 — Astro Rewrite (in progress, 2026)
- Migrated to Astro.js for component-based authoring, upgraded to Astro v7 and its content layer (`src/content.config.ts` with `glob()` loaders)
- Dropped TailwindCSS in favor of hand-authored CSS custom properties (`src/styles/global.css`)
- Legacy V1 static HTML removed from `public/`
- Added Playwright golden-master visual regression testing
- Hosted on Netlify
- Maintained CDN-first philosophy for external runtime libraries
- Decap CMS integration for content editing is proposed but not yet implemented

---

**Last Updated**: 2026-09-11
**Claude Version**: Claude Sonnet 5
**Project Status**: V2 in active development
