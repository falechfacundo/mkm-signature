import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70),
      description: z.string().max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('MKM Signature'),
      category: z.enum(['tendencias', 'cuidado', 'estilo', 'domicilio']),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string(),
      coverCredit: z.string().optional(),
      draft: z.boolean().default(false),
      service: z.enum(['corte', 'corte_barba', 'barba']).optional(),
      readingTime: z.number().optional(),
    }),
});

export const collections = { blog };
