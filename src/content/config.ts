// SPDX-FileCopyrightText: 2025 Basingstoke Repair Network <dev@basingstoke.repair>
//
// SPDX-License-Identifier: CC0-1.0

// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

const heraldCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'pages': pagesCollection,
  'herald': heraldCollection,
};
