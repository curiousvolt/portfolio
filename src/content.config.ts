import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      image: image().optional(),
      tags: z.array(z.string()).optional(),
      authors: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      image: image(),
      link: z.string().url(),
      startDate: z.coerce.date().optional(),
      endDate: z.coerce.date().optional(),
    }),
})

const logs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/logs' }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.string(),
      status: z.enum(['Active', 'Prototyping', 'Shipped']),
      tags: z.array(z.string()).optional(),
    }),
})

const sideProjects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/side-projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      isLargeImage: z.boolean(),
      links: z.array(
        z.object({
          name: z.string(),
          url: z.string(),
        })
      ).optional(),
      tags: z.array(z.string()).optional(),
    }),
})

const media = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/media' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.enum(['movie', 'book', 'music', 'game']),
      image: image(),
      url: z.string(),
    }),
})

export const collections = { blog, projects, logs, sideProjects, media }
