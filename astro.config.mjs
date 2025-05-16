// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network <dev@basingstoke.repair>
//
// SPDX-License-Identifier: CC0-1.0

// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import decapCms from 'astro-decap';
import fulldev from 'fulldev-ui/integration'

// https://astro.build/config
export default defineConfig({
  integrations: [decapCms({
      cmsConfig: {
        local_backend: true,
        backend: { name: "github", repo: "basingstoke-repair-network/apex-site-basingstoke.repair" },
        media_folder: "public",
        public_folder: "/",
      },
    }),
    fulldev(),
    icon(),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  legacy: {
    collections: true,
  },
});
