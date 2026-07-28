<!--
SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
SPDX-License-Identifier: MIT
-->

# Claude Context & Directives

This file contains context and directives for AI assistants working on the Basingstoke Repair Network (BRN) website project.

## Project Overview

**Project Name**: Basingstoke Repair Network - Website (V2)
**Project Type**: Astro.js static site with Decap CMS for community repair cafés
**Repository**: apex-site-basingstoke.repair
**Branch**: astro-refactor/implement-astro-design
**Status**: V2 in active development (rewrite of V1 static HTML site)
**Hosted on**: Netlify

## Project Purpose

Build a lightweight, performant static website to establish an online presence for the Basingstoke Repair Network, providing information about:
- Three repair café locations (Chineham, Hatch Warren, Kings Furlong)
- Repair café concept and environmental benefits
- Volunteer opportunities
- Contact information and supporter organizations

## Technology Stack

### Core Technologies
- **Astro.js**: Static site generator — component-based, outputs minimal HTML/CSS/JS
- **TailwindCSS v3**: Utility-first CSS framework (integrated via Astro integration)
- **Decap CMS**: Git-based headless CMS for content editing via Netlify Identity
- **Node.js**: Build tooling and dev server

### Performance Philosophy
- **Lightweight by default**: Prefer zero-JS pages; only ship JavaScript where genuinely required
- **CDN for external resources**: Load third-party libraries (icons, fonts, carousels, etc.) from CDNs rather than bundling them — reduces build complexity and leverages CDN caching
- **No unnecessary dependencies**: Evaluate each new package against its benefit; prefer native browser features or CDN-served micro-libraries over large npm dependencies
- **Static output**: The site must build to fully static HTML — no server-side rendering at runtime

### CDN Dependencies (preferred over npm installs)
- Font Awesome: Icons and visual elements
- Any carousel/slider library (e.g. Swiper.js) if needed
- Any other runtime UI library should come from a CDN, not bundled

### Development Tools
- `astro` CLI: dev server, build, preview
- npm scripts: `dev`, `build`, `preview`

## File Structure

```
apex-site-basingstoke.repair/
├── src/
│   ├── components/         # Reusable Astro components
│   ├── layouts/            # Page layout templates
│   ├── pages/              # File-based routing (each .astro = a page)
│   └── content/            # Decap CMS managed content collections
├── public/                 # Static assets served as-is
│   └── assets/
│       ├── images/
│       │   ├── logos/      # BRN logo
│       │   ├── locations/  # Team photos
│       │   ├── supporters/ # Supporter logos
│       │   └── hero-*.jpg  # Hero images
│       └── admin/          # Decap CMS config (config.yml)
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # TailwindCSS configuration
├── package.json            # Node.js dependencies
├── netlify.toml            # Netlify deployment config
├── .gitignore
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

1. **Chineham Repair Café**
   - When: 3rd Saturday of each month, 10am–1pm
   - Where: Christ Church Chineham, Reading Road (next to Surgery), RG24 8LT

2. **Hatch Warren & Beggarwood Repair Café**
   - When: 1st Saturday of each month, 10:30am–1pm
   - Where: Hatch Warren Community Centre, RG22 4XF

3. **Kings Furlong Repair Café**
   - Status: Coming Later in 2025

**When adding a new location**: check its address (in `src/content/locations/`)
against the number of lines rendered by `.location-address` in
`src/components/Locations.astro`. The card grid uses a shared min-height
(defined in `src/styles/global.css`, currently sized for a 3-line address —
venue, street, postcode) so map iframes stay aligned across cards on
multi-column layouts. An address needing a 4th line requires bumping that
min-height too.

### Contact Information
- Email: info@chinehamrepair.org.uk

### Supporter Organizations
1. Basingstoke & Deane Council
2. Four Lanes Trust
3. Restarters.net
4. North Hampshire Repair Network
5. Repair Café International
6. Greener Basingstoke
7. National Lottery
8. Veolia

## Git Workflow & Commit Standards

### Commit Message Format

Follow **Conventional Commits** specification:

```
<type>: <short summary>

<detailed description>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
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
7. Tests (Playwright specs, snapshot updates)

### Development-Phase Workflow: Small Commits, Then Squash

While actively developing a feature or fix on a branch:
- Commit early and often, in small isolated units per the pattern above — each
  commit must still be conventional-commits-formatted and buildable in isolation
  where practical.
- Do not wait until a feature is "finished" to make the first commit — checkpoint
  progress so work is never at risk of being lost and history shows the actual
  path taken.

Once the feature/fix is complete and ready to merge:
- **Squash the development-phase commits into a single commit** (interactive
  rebase, e.g. `git rebase -i <base>`) before opening/updating a PR into a shared
  branch, wherever the branch's history is still local/unpublished and squashing
  is safe to do.
- The squashed commit message must still follow the Conventional Commits format
  below and summarize the net change — not a list of the intermediate WIP steps.
- Never squash commits that have already been pushed to a shared branch other
  collaborators may have based work on, without explicit user confirmation —
  rewriting shared history is a destructive operation.
- Never use `git rebase -i` non-interactively or with `--no-edit`; if a squash
  requires resolving conflicts or editing the message, do so explicitly and
  confirm the resulting diff/message with the user before pushing.

### HEREDOC for Commit Messages

Always use HEREDOC for multi-line commit messages:

```bash
git commit -m "$(cat <<'EOF'
feat: add feature description

Detailed explanation of changes.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)"
```

## REUSE Compliance (SPDX)

### Licensing Standard

**ALL files must include SPDX licensing headers:**

#### Astro/HTML/Markdown files:
```html
<!--
SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
SPDX-License-Identifier: MIT
-->
```

#### CSS files:
```css
/*
 * SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
 * SPDX-License-Identifier: MIT
 */
```

#### JavaScript/TypeScript files:
```javascript
// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
// SPDX-License-Identifier: MIT
```

#### Configuration files (TOML, YAML, etc.):
```toml
# SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
# SPDX-License-Identifier: MIT
```

#### JSON files:
Create a companion `.license` file:
```
SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
SPDX-License-Identifier: MIT
```

### License
This project uses the **MIT License**. See LICENSE file for details.

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
- Decap CMS identity and Git Gateway enabled for content editing
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
- TailwindCSS breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly navigation

### Content Management
- Decap CMS provides a browser-based editor for non-technical contributors
- Content stored as Markdown/YAML in the repository
- Edits go through Git — no separate database

## Coding Standards

### Astro Best Practices
- Keep components small and single-purpose; one responsibility per `.astro` file
- Pass data via `Astro.props` (typed with a `Props` interface); avoid global state
- Use `<slot>` / named slots for composable layouts instead of duplicating markup
- Prefer `.astro` files for everything static; only reach for a framework component
  (React, etc.) when genuine client-side interactivity is required, and hydrate it
  with the narrowest directive that works (`client:visible` / `client:idle` over
  `client:load`)
- Content collections (`src/content/`) are the source of truth for CMS-managed data
  (locations, supporters) — never hardcode content that already has a collection entry
- Use `getStaticPaths` for any dynamic routes; the site remains `output: 'static'` —
  no SSR, no API routes, no adapters that imply a server runtime
- Co-locate a component's styles in its own `<style>` block unless the rule is a
  shared token/utility that belongs in `src/styles/global.css`
- Run `npx astro check` before considering a change complete — treat new type errors
  as blocking

### CSS / TailwindCSS
- Use CSS custom properties for brand colors — never hardcode hex values that
  duplicate `--header-bg`, `--footer-bg`, etc.
- Mobile-first utility classes; match the breakpoints already defined in
  `design/index.html` (640px tablet, 1024px desktop, 1440px large desktop)
- Avoid arbitrary Tailwind values where a design token or custom property suffices

### JavaScript
- Ship JS only when necessary (interactivity, not decoration)
- Vanilla JS or lightweight CDN libraries preferred over heavy npm packages
- ES6+ syntax; always `addEventListener`, never inline handlers
- Graceful degradation — check for feature support

## Visual Design Fidelity (STRICT)

`design/index.html` is the **golden master**. It is the single source of truth for
layout, spacing, color, typography, and interaction behaviour (including the burger
menu). This is not a mood board — every visual detail implemented in Astro must match
it pixel-for-pixel within the tolerance enforced by the Playwright visual tests.

- **Never deviate** from `design/index.html` unless the user explicitly requests a
  visual change. If a component seems to need a different layout, treat that as a
  signal to re-read the design file, not license to improvise.
- CSS custom properties, breakpoints, spacing scale (`--space-*`), and component
  class names (`.card`, `.location-card`, `.hero`, `.notice`, etc.) in
  `src/styles/global.css` should mirror `design/index.html`'s `<style>` block —
  don't invent parallel naming schemes.
- Content differences are expected (Astro renders from content collections rather
  than the static placeholder text/images in the design file) but structural and
  stylistic differences are not.
- Any change touching layout or styling **must** be verified against the golden
  master via the Playwright visual regression tests (see below) before being
  considered done — do not rely on eyeballing a screenshot.
- If `design/index.html` itself changes, regenerate the baseline
  (`tests/visual-baseline.spec.js`) deliberately and call this out in the commit —
  never let the baseline drift silently out of sync with the design file.

## Testing with Playwright

Tests live in `tests/` and are configured in `playwright.config.js`.

- **`tests/visual-baseline.spec.js`** — generates the golden-master screenshots
  directly from `design/index.html`, per viewport project (`mobile`, `tablet`,
  `desktop`, `wide-desktop`). Run with `--update-snapshots` only when the design
  file has intentionally changed.
- **`tests/visual-comparison.spec.js`** — renders the live Astro dev server
  (`http://localhost:4321`) and diffs it against the golden master
  (`maxDiffPixels: 1000`), masking dynamic elements like the Google Maps iframe.
- Run the full suite with `npx playwright test` before treating any visual/layout
  change as complete; investigate every failed diff instead of bumping
  `maxDiffPixels` or masking new elements to make a failure disappear.
- Add new Playwright specs under `tests/` for any new interactive behaviour
  (e.g. burger menu open/close, keyboard navigation, anchor scrolling) — don't
  rely on visual diffing alone to catch functional regressions.
- All new/modified spec files need SPDX headers, matching the existing files in
  `tests/`.

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
4. Follow conventional commit message format
5. Test responsive design on mobile/tablet/desktop
6. Maintain accessibility standards
7. Keep the site lightweight — question every new dependency
8. Prefer CDN delivery for external runtime libraries

## Testing Checklist

Before committing changes:
- [ ] No `\u` escape sequences in any files
- [ ] All files have SPDX headers
- [ ] `npm run build` completes without errors
- [ ] `npx astro check` passes with no new type errors
- [ ] `npx playwright test` passes — implementation matches `design/index.html`
      within the configured diff tolerance
- [ ] Responsive design works on mobile/tablet/desktop (matches golden master
      at each breakpoint)
- [ ] All links work correctly
- [ ] Images have appropriate alt text
- [ ] Browser console has no errors
- [ ] Accessibility: keyboard navigation works
- [ ] Git commit messages follow conventional commits format
- [ ] Changes are in isolated, logical commits during development, squashed to
      one before merge (see Git Workflow above)

## Future Considerations

### Potential Enhancements (Not Implemented Yet)
- Blog/news section via Decap CMS content collections
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
- TailwindCSS Docs: https://tailwindcss.com/docs
- Decap CMS Docs: https://decapcms.org/docs
- Font Awesome Icons: https://fontawesome.com/icons
- REUSE Specification: https://reuse.software

## Version History

### V1 — Initial Static Site (2025-12-07)
- Plain HTML/CSS/JS with TailwindCSS via CDN
- Hero carousel via Swiper.js (CDN)
- No build step; served directly from `public/`

### V2 — Astro Rewrite (in progress, 2026)
- Migrated to Astro.js for component-based authoring
- Added Decap CMS for content management
- Hosted on Netlify with Git Gateway
- Maintained CDN-first philosophy for external runtime libraries
- Added Playwright visual regression testing against `design/index.html` as the
  golden master, plus a squash-before-merge git workflow

---

**Last Updated**: 2026-07-28
**Claude Version**: Claude Sonnet 5
**Project Status**: V2 in active development
