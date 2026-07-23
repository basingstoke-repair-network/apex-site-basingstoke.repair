<!--
SPDX-FileCopyrightText: 2025--2026 Basingstoke Repair Network
SPDX-License-Identifier: MIT
-->

# Basingstoke Repair Network - Initial Website

**Initial landing page for the Basingstoke Repair Network**

A static HTML website for the Basingstoke Repair Network, showcasing community repair cafés across Basingstoke and North Hampshire. This is the initial version of the website, designed to establish an online presence and provide essential information about our repair cafés.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **TailwindCSS**: Utility-first CSS framework served via CDN
- **Image Carousel**: Hero section with automatic image rotation
- **Mobile Navigation**: Hamburger menu for mobile devices
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance**: Optimized with lazy loading and smooth animations
- **No Build Step**: Pure static HTML, CSS, and JavaScript

## Technology Stack

- **HTML5**: Semantic markup
- **TailwindCSS**: v3.x via CDN
- **Font Awesome**: v6.5.1 for icons
- **Swiper.js**: v11 for carousel functionality
- **JavaScript**: Vanilla JS for interactivity
- **Node.js**: For local development server

## Project Structure

```
apex-site-basingstoke.repair/
├── public/
│   ├── index.html              # Main HTML file
│   └── assets/
│       ├── css/
│       │   └── styles.css      # Custom CSS with color palette
│       ├── js/
│       │   └── main.js         # JavaScript for interactivity
│       └── images/
│           ├── logos/           # BRN logo files
│           ├── locations/       # Team photos for each café
│           ├── supporters/      # Supporter logos
│           └── hero-1.jpg, hero-2.jpg, hero-3.jpg  # Hero carousel images
├── package.json
└── README.md
```

## Color Palette

The website uses the official BRN color scheme:

- **Header**: `#c6c8c9` (light gray background) with `#28276f` (deep blue) for icons/text
- **Main Content**: `#eeeeee` (off-white background) with `#02011A` (near-black) for text
- **Footer**: `#28276f` (deep blue background) with `#eeeeee` (off-white) for text

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd apex-site-basingstoke.repair
```

2. Install dependencies:
```bash
npm install
```

3. Add your images to the appropriate directories:
   - `public/assets/images/logos/brn-logo.png` - Main BRN logo
   - `public/assets/images/hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg` - Hero carousel images
   - `public/assets/images/locations/chineham-team.jpg` - Chineham team photo
   - `public/assets/images/locations/hatch-warren-team.jpg` - Hatch Warren team photo
   - `public/assets/images/supporters/*` - Supporter logos

### Development

Run the local development server:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Production

Run the production server:

```bash
npm start
```

## Adding Images

### Required Images

1. **BRN Logo** (`public/assets/images/logos/brn-logo.png`)
   - Transparent PNG recommended
   - Recommended size: 200x200px or larger

2. **Hero Carousel Images** (`public/assets/images/hero-[1-3].jpg`)
   - 3 images showcasing repair café activities
   - Recommended size: 1920x1080px
   - Format: JPG or PNG

3. **Team Photos** (`public/assets/images/locations/`)
   - `chineham-team.jpg`
   - `hatch-warren-team.jpg`
   - Recommended size: 800x600px

> **Note (Astro V2):** the locations grid itself now lives in
> `src/components/Locations.astro` / `src/styles/global.css` rather than
> `public/index.html`. Its `.location-address` block has a min-height sized
> for a 3-line address (venue, street, postcode) so map iframes stay aligned
> when cards sit side-by-side — check that value if a new location's address
> needs more lines.

4. **Supporter Logos** (`public/assets/images/supporters/`)
   - Individual logo files for each supporter
   - Transparent PNG recommended
   - Max height: 80px

### Image Optimization

For best performance, optimize images before adding them:

- Use WebP format where possible
- Compress JPG images to 80-85% quality
- Ensure images are appropriately sized (don't use 4K images for thumbnails)

## Customization

### Updating Content

All content is in `public/index.html`. Key sections to update:

- **Header Navigation**: Lines 31-47
- **Hero Section**: Lines 51-92
- **Introduction**: Lines 98-114
- **Locations**: Lines 135-213
- **Get Involved**: Lines 232-293
- **Supporters**: Lines 296-327
- **Footer**: Lines 334-375

### Updating Colors

Edit `public/assets/css/styles.css` and modify the CSS variables:

```css
:root {
    --header-bg: #c6c8c9;
    --header-icon: #28276f;
    --content-bg: #eeeeee;
    --content-text: #02011A;
    --footer-bg: #28276f;
    --footer-text: #eeeeee;
}
```

### Adding New Sections

1. Add HTML in `public/index.html`
2. Add styles in `public/assets/css/styles.css` if needed
3. Add JavaScript functionality in `public/assets/js/main.js` if needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast text
- Focus indicators
- Skip to content link support

## Performance

- CDN-served libraries for fast loading
- Lazy loading for images
- Optimized CSS and JavaScript
- Smooth scroll animations
- Responsive images

## Deployment

### Static Hosting

This site can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `public` folder
- **Vercel**: Connect your git repository
- **GitHub Pages**: Push the `public` folder to `gh-pages` branch
- **AWS S3**: Upload the `public` folder
- **Cloudflare Pages**: Connect your git repository

### Example: Deploying to Netlify

1. Build is not required (static site)
2. Set publish directory to `public`
3. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues:

- Email: info@chinehamrepair.org.uk

## License

MIT License - See LICENSE file for details

## Credits

- **Design & Development**: Basingstoke Repair Network
- **Icons**: Font Awesome
- **CSS Framework**: TailwindCSS
- **Carousel**: Swiper.js
- **Inspiration**: Global Repair Café movement

## Changelog

### Version 1.0.0 (2025)
- Initial release
- Full responsive design
- Hero carousel
- Three location sections
- Get involved section
- Supporter section
- Mobile navigation

---

**Built with ❤️ for the Basingstoke community**
