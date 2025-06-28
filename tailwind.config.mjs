// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.html', // If you have public/admin/index.html or other plain HTML
  ],
  theme: {
    extend: {
      colors: {
        'brn-dark': '#02011A',
        'brn-light': '#EEEEEE',
        'brn-header': '#c6c8c9',
        'brn-primary': '#28276f',
        'brn-accent': '#e86046',
      },
    },
  },
  plugins: [],
};

// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network <dev@basingstoke.repair>
//
// SPDX-License-Identifier: CC0-1.0
