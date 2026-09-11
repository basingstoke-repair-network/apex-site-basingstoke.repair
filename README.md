<!--
SPDX-FileCopyrightText: 2024-2026 Basingstoke Repair Network
SPDX-License-Identifier: CC0-1.0
-->

# Basingstoke Repair Network - Website (V2)

**Official website for the Basingstoke Repair Network**

A lightweight [Astro.js](https://astro.build) static site showcasing community repair cafés across Basingstoke and North Hampshire. V2 is a component-based rewrite of the original static HTML prototype, built to stay fast, dependency-light, and easy to maintain.

## Features

- **Responsive Design**: Mobile-first layout that works on all devices
- **Zero JS by default**: Astro ships minimal HTML/CSS/JS; JavaScript is only added where genuinely required
- **Content Collections**: Locations and supporters are managed as per-item JSON files through Astro's content layer
- **Accessibility**: WCAG-conscious markup with ARIA labels, keyboard navigation, and high-contrast text
- **Visual Regression Testing**: Playwright golden-master tests guard against unintended visual changes

## Technology Stack

- **[Astro.js v7](https://astro.build)**: Static site generator, `output: 'static'`
- **Plain CSS**: Hand-authored CSS custom properties (`src/styles/global.css`) — no CSS framework
- **Font Awesome**: Icons, loaded via CDN
- **Node.js**: Build tooling and dev server
- **[Playwright](https://playwright.dev)**: Visual regression testing
- **[prek](https://github.com/j178/prek)**: Pre-commit hook runner (linting, formatting, SPDX/REUSE checks, Conventional Commits linting)

Third-party runtime libraries are preferred from a CDN over npm dependencies — see [CLAUDE.md](CLAUDE.md) for the full rationale.

## Project Structure

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
│   └── assets/images/      # Logos, location team photos, supporter logos, hero images
├── tests/                  # Playwright visual regression tests
├── astro.config.mjs        # Astro configuration
├── eslint.config.*         # ESLint (eslint-plugin-astro)
├── playwright.config.js    # Playwright configuration
├── netlify.toml            # Netlify deployment config
├── CLAUDE.md               # AI assistant context and project directives
├── CONTRIBUTING.md         # Contribution guidelines
└── VISUAL_TESTING.md       # Visual regression testing guide
```

## Color Palette

The website uses the official BRN color scheme, defined as CSS custom properties in `src/styles/global.css`:

- **Header**: `#c6c8c9` (light gray background) with `#28276f` (deep blue) for icons/text
- **Main Content**: `#eeeeee` (off-white background) with `#02011A` (near-black) for text
- **Footer**: `#28276f` (deep blue background) with `#eeeeee` (off-white) for text

**Do not change these colors without explicit approval.**

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone <repository-url>
cd apex-site-basingstoke.repair
npm install
```

### Development

```bash
npm run dev
```

The dev server prints its local URL on startup (Astro's default is `http://localhost:4321`).

### Production Build

```bash
npm run build
npm run preview   # serve the built output locally
```

## Content Management

Repair café locations and supporter organizations are managed as per-item JSON files under `src/content/locations/` and `src/content/supporters/`, validated against schemas in `src/content.config.ts`. There is currently no browser-based CMS — content changes go through Git. (A Decap CMS integration has been proposed but is not yet implemented.)

Currently listed locations: Chineham and Hatch Warren & Beggarwood (active), Brookvale (coming soon).

## Quality Checks

```bash
npm run lint          # ESLint (eslint-plugin-astro)
npm run format:check  # Prettier (HTML)
npx playwright test   # Visual regression tests — see VISUAL_TESTING.md
```

Alternatively, run `prek run --all-files` to run the full pre-commit hook suite (linting, formatting, YAML/JSON/TOML validation, SPDX/REUSE compliance, and Conventional Commits message linting) in one pass.

## Deployment

Hosted on **Netlify**, configured via `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist/`

The static output is also compatible with Vercel, Cloudflare Pages, GitHub Pages, and any static file host.

## Accessibility

- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly markup
- High contrast text ratios and visible focus indicators

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming, commit message conventions, and licensing requirements.

## Support

For questions or issues:

- Email: info@chinehamrepair.org.uk

## License

Code is licensed under the **MIT License**; documentation and images are licensed under **CC0-1.0**. See the `LICENSES/` directory and per-file SPDX headers for details.

## Credits

- **Design & Development**: Basingstoke Repair Network
- **Icons**: Font Awesome
- **Inspiration**: Global Repair Café movement

---

**Built with ❤️ for the Basingstoke community**
