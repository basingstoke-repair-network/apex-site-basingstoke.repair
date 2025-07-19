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

const faqCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
  }),
});

const settingsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    chineham: z.object({
      title: z.string(),
      eventTime: z.string(),
      eventDuration: z.number(),
      skipDecember: z.boolean(),
      beforeEventText: z.string(),
      duringEventText: z.string(),
    }),
    hatchWarren: z.object({
      title: z.string(),
      eventTime: z.string(),
      eventDuration: z.number(),
      skipDecember: z.boolean(),
      beforeEventText: z.string(),
      duringEventText: z.string(),
    }),
  }),
});

const cafesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'coming-soon', 'closed']),
    location: z.object({
      address: z.string(),
      postcode: z.string(),
      venue: z.string(),
    }),
    schedule: z.object({
      frequency: z.enum(['first-saturday', 'third-saturday', 'custom']),
      time: z.string(),
      duration: z.number(),
      skipDecember: z.boolean().default(true),
    }),
    contact: z.object({
      email: z.string().email().optional(),
      phone: z.string().optional(),
      website: z.string().url().optional(),
      subdomain: z.string().optional(),
    }).optional(),
    images: z.object({
      hero: z.string().optional(),
      team: z.string().optional(),
      gallery: z.object({
        enabled: z.boolean().default(false),
        type: z.enum(['google-drive', 'google-photos', 'manual']).default('manual'),
        googleDriveFolderId: z.string().optional(),
        googlePhotosAlbumId: z.string().optional(),
        apiKey: z.string().optional(),
        title: z.string().default('Photo Gallery'),
        columns: z.number().min(0).max(5).default(0),
        maxImages: z.number().min(1).max(100).default(50),
        showTitles: z.boolean().default(false),
        manualImages: z.array(z.object({
          src: z.string(),
          alt: z.string(),
          title: z.string().optional(),
        })).default([]),
      }).optional(),
    }).optional(),
    description: z.string().optional(),
    notes: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  'pages': pagesCollection,
  'herald': heraldCollection,
  'faq': faqCollection,
  'settings': settingsCollection,
  'cafes': cafesCollection,
};
