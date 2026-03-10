import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    landing: defineCollection({
      type: 'page',
      source: 'index.md'
    }),
    docs: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: ['index.md']
      },
      schema: z.object({
        links: z.array(z.object({
          label: z.string(),
          icon: z.string(),
          to: z.string(),
          target: z.string().optional()
        })).optional(),
        date: z.string().optional(),
        badge: z.string().optional(),
        authors: z.array(z.object({
          name: z.string(),
          description: z.string().optional(),
          avatar: z.object({
            src: z.string(),
            alt: z.string().optional(),
            loading: z.enum(['eager', 'lazy']).optional()
          }).optional(),
          to: z.string().optional(),
          target: z.string().optional()
        })).optional()
      })
    })
  }
})
