<!--
SPDX-FileCopyrightText: 2025 Basingstoke Repair Network
SPDX-License-Identifier: MIT
-->

# Image Assets Directory

This directory contains all images for the Basingstoke Repair Network website.

## Required Images

### Logos (`logos/`)
- `brn-logo.png` - Main Basingstoke Repair Network logo
  - Format: PNG with transparency
  - Recommended size: 200x200px or larger
  - Used in: Header

### Hero Carousel (`root level`)
- `hero-1.jpg` - First carousel slide image
- `hero-2.jpg` - Second carousel slide image
- `hero-3.jpg` - Third carousel slide image
  - Format: JPG or PNG
  - Recommended size: 1920x1080px (Full HD)
  - Aspect ratio: 16:9
  - Subject: Repair café activities, volunteers helping people, fixed items

### Location Team Photos (`locations/`)
- `chineham-team.jpg` - Chineham Repair Café team photo
- `hatch-warren-team.jpg` - Hatch Warren & Beggarwood team photo
  - Format: JPG
  - Recommended size: 800x600px
  - Aspect ratio: 4:3
  - Subject: Team members at their respective locations

### Supporter Logos (`supporters/`)
- `basingstoke-council.png` - Basingstoke & Deane Council logo
- `four-lanes-trust.png` - Four Lanes Trust logo
- `restarters.png` - Restarters.net logo
- `repair-cafe-international.png` - Repair Café International logo
- `greener-basingstoke.png` - Greener Basingstoke logo
- `national-lottery.png` - National Lottery logo
- `veolia.png` - Veolia logo
  - Format: PNG with transparency preferred
  - Max height: 80px
  - Should be official logos from respective organizations

## Image Optimization Tips

1. **Compress images** before adding them:
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - JPG: 80-85% quality is usually sufficient
   - PNG: Use PNG-8 when possible, PNG-24 for images with transparency

2. **Resize appropriately**:
   - Don't use 4K images if they'll display at 800px
   - Use responsive images if serving different sizes

3. **Use correct formats**:
   - Photos: JPG
   - Graphics/logos with transparency: PNG
   - Modern browsers: Consider WebP

4. **Alt text**: All images have alt text in the HTML for accessibility

## Fallback Behavior

If an image is not found, the website will:
- Hero images: Show gradient background with text
- Team photos: Show placeholder with text
- Logos: Show text labels
- Supporter logos: Show text labels

This ensures the site remains functional even without all images.

## Adding New Images

1. Place images in the appropriate directory
2. Use the exact filenames specified above
3. Ensure images are optimized for web
4. Test the site to verify images load correctly

## Current Status

- [ ] BRN Logo
- [ ] Hero carousel images (3)
- [ ] Chineham team photo
- [ ] Hatch Warren team photo
- [ ] Supporter logos (8)

Replace this checklist as images are added!
