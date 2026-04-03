import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  // loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      // SEO and metadata fields
      tags: z.array(z.string()).optional(),
      keywords: z.string().optional(),
      author: z.string().optional(),
      series: z.string().optional(),
      seriesOrder: z.number().optional(),
      // Related posts for cross-series internal linking
      relatedPosts: z.array(z.string()).optional(),
      // Optional previous post reference
      prev: z
        .object({
          slug: z.string(),
          title: z.string(),
        })
        .optional(),

      // Optional next post reference
      next: z
        .object({
          slug: z.string(),
          title: z.string(),
        })
        .optional(),
    }),
});

export const collections = { blog };
