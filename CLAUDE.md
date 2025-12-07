<!--
SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
SPDX-License-Identifier: MIT
-->

# Claude Context & Directives

This file contains context and directives for AI assistants working on the Basingstoke Repair Network (BRN) website project.

## Project Overview

**Project Name**: Basingstoke Repair Network - Initial Website
**Project Type**: Static HTML website for community repair cafés
**Repository**: apex-site-basingstoke.repair
**Branch**: live-initial-page
**Status**: Initial version completed

## Project Purpose

Create a static HTML website to establish an online presence for the Basingstoke Repair Network, providing information about:
- Three repair café locations (Chineham, Hatch Warren, Kings Furlong)
- Repair café concept and environmental benefits
- Volunteer opportunities
- Contact information and supporter organizations

## Technology Stack

### Core Technologies
- **HTML5**: Semantic markup with accessibility features
- **TailwindCSS v3**: CDN-served utility-first CSS framework
- **JavaScript**: Vanilla JS for interactivity (no build step)
- **Node.js**: Development server only (using `serve` package)

### CDN Dependencies
- TailwindCSS: https://cdn.tailwindcss.com
- Font Awesome v6.5.1: Icons and visual elements
- Swiper.js v11: Hero carousel functionality

### Development Tools
- `serve` package: Local development server
- npm scripts: `dev` and `start` commands

## File Structure

```
apex-site-basingstoke.repair/
├── public/                      # Static site files
│   ├── index.html              # Main HTML file with full website
│   └── assets/
│       ├── css/
│       │   └── styles.css      # Custom CSS with BRN brand colors
│       ├── js/
│       │   └── main.js         # Interactive features
│       └── images/
│           ├── logos/          # BRN logo
│           ├── locations/      # Team photos
│           ├── supporters/     # Supporter logos
│           └── hero-*.jpg      # Carousel images (3)
├── package.json                # Node.js configuration
├── netlify.toml               # Netlify deployment config
├── .gitignore                 # Git ignore patterns
└── README.md                  # Project documentation
```

## Brand Colors (BRN Color Palette)

Defined in `public/assets/css/styles.css`:

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
   - When: 3rd Saturday of each month, 10am-1pm
   - Where: Christ Church Chineham, Reading Road (next to Surgery), RG24 8LT

2. **Hatch Warren & Beggarwood Repair Café**
   - When: 1st Saturday of each month, 10:30am-1pm
   - Where: Hatch Warren Community Centre, RG22 4XF

3. **Kings Furlong Repair Café**
   - Status: Coming Later in 2025

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
1. Config files (package.json, netlify.toml)
2. HTML structure
3. CSS styling
4. JavaScript functionality
5. Documentation

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

#### HTML/Markdown files:
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

#### JavaScript files:
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
❌ **WRONG**: `Caf\u00e9`, `caf\u00e9s`

✅ **CORRECT**: `❤️` (heart emoji)
❌ **WRONG**: `\u2764\ufe0f`

### Common Characters Used
- é (U+00E9): Café, cafés
- – (U+2013): En dash for ranges
- — (U+2014): Em dash for emphasis
- ❤️ (U+2764 U+FE0F): Heart emoji

**Always verify no `\u` escape sequences exist before committing.**

## Image Requirements

### Required Images (Not Yet Added)

Images should be placed in `public/assets/images/`:

1. **Logo**: `logos/brn-logo.png` (200x200px+, transparent PNG)
2. **Hero Carousel**: `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` (1920x1080px)
3. **Team Photos**:
   - `locations/chineham-team.jpg` (800x600px)
   - `locations/hatch-warren-team.jpg` (800x600px)
4. **Supporter Logos**: 8 PNG files in `supporters/` (max 80px height)

### Fallback Behavior
The website gracefully handles missing images:
- Hero: Shows gradient background with text
- Team photos: Shows placeholder via `via.placeholder.com`
- Logos: Shows text labels

**Do not remove fallback handlers from HTML.**

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Production server
npm start
```

## Deployment

### Netlify
The site is configured for Netlify deployment via `netlify.toml`:
- Publish directory: `public/`
- No build command needed (static site)
- Includes security headers and cache optimization

### Other Static Hosts
Compatible with:
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3
- Any static file host

## Key Features Implemented

### Accessibility
- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast text ratios
- Focus indicators on all interactive elements

### Performance
- CDN-served libraries for fast loading
- Lazy loading for images (IntersectionObserver)
- Optimized CSS and JavaScript
- Proper cache headers in Netlify config
- Responsive images support

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly navigation

### Interactive Features
- Auto-play hero carousel with manual controls
- Smooth scroll for anchor navigation
- Mobile menu toggle with animations
- Header shadow on scroll
- Fade-in animations for sections

## Coding Standards

### HTML
- Use semantic elements (`<header>`, `<main>`, `<section>`, `<footer>`)
- Include alt text for all images
- Use proper heading hierarchy (h1 → h2 → h3)
- Add `rel="noopener noreferrer"` to external links

### CSS
- Use CSS custom properties for theme colors
- Mobile-first media queries
- BEM-like naming for custom classes
- Leverage TailwindCSS utility classes

### JavaScript
- Vanilla JS (no frameworks)
- ES6+ syntax
- Event delegation where appropriate
- Graceful degradation (check for feature support)
- Always use `addEventListener`, never inline handlers

## Important Directives

### Do NOT Do These Without User Request:
1. Change brand colors
2. Modify location information or schedules
3. Change contact information
4. Remove supporter organizations
5. Add new dependencies or frameworks
6. Change the project structure
7. Remove accessibility features
8. Remove SPDX headers

### Always Do These:
1. Commit changes in compartmentalized, isolated commits
2. Add SPDX headers to all new files
3. Use proper UTF-8 characters (no escape sequences)
4. Follow conventional commit message format
5. Test responsive design on multiple screen sizes
6. Maintain accessibility standards
7. Keep the site performant (no unnecessary dependencies)

## Testing Checklist

Before committing changes:
- [ ] No `\u` escape sequences in any files
- [ ] All files have SPDX headers
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All links work correctly
- [ ] Images have appropriate alt text
- [ ] Console has no errors
- [ ] Accessibility: keyboard navigation works
- [ ] Git commit messages follow format
- [ ] Changes are in isolated, logical commits

## Future Considerations

### Potential Enhancements (Not Implemented Yet)
- Blog/news section
- Event calendar integration
- Photo gallery
- Contact form
- Repair item booking system
- Multi-language support
- Progressive Web App (PWA) features

**Do not implement these without explicit user request.**

## Resources

### Official Links
- North Hampshire Repair Network: https://www.northhampshirerepair.org.uk
- Repair Café International: https://www.repaircafe.org

### Development Resources
- TailwindCSS Docs: https://tailwindcss.com/docs
- Swiper.js Docs: https://swiperjs.com
- Font Awesome Icons: https://fontawesome.com/icons
- REUSE Specification: https://reuse.software

## Session History

### Initial Creation (2025-12-07)
- Created static HTML website for BRN
- Implemented responsive design with TailwindCSS
- Added hero carousel with Swiper.js
- Created location sections for 3 repair cafés
- Added volunteer/contact sections
- Implemented REUSE compliance with SPDX headers
- Fixed Unicode character encoding issues
- Compartmentalized commits following conventional commits
- Added Netlify deployment configuration

---

**Last Updated**: 2025-12-07
**Claude Version**: Claude Sonnet 4.5
**Project Status**: Initial version complete, ready for image assets
