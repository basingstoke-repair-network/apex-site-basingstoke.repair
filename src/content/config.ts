// SPDX-FileCopyrightText: 2025--2026 Basingstoke Repair Network
// SPDX-License-Identifier: MIT

import { defineCollection, z } from 'astro:content';

const heroSlides = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    backgroundImage: z.string(),
    ctaText: z.string().optional(),
    ctaLink: z.string().optional(),
    order: z.number().int(),
    isActive: z.boolean().default(true),
  }),
});

const locations = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    status: z.enum(['active', 'coming-soon', 'closed']),
    schedule: z
      .object({
        dayOfWeek: z.string(),
        weekOfMonth: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      })
      .optional(),
    address: z
      .object({
        venue: z.string(),
        street: z.string().optional(),
        postcode: z.string(),
        googleMapsEmbed: z.string().url().optional(),
      })
      .optional(),
    description: z.string(),
    teamImage: z.string().optional(),
    accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    order: z.number().int(),
  }),
});

const supporters = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    websiteUrl: z.string().url(),
    logo: z.string(),
    order: z.number().int(),
    isActive: z.boolean().default(true),
  }),
});

export const collections = {
  'hero-slides': heroSlides,
  locations,
  supporters,
};
