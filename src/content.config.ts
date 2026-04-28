import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
    schema: z.object({
        title: z.string(),
        pubDate: z.coerce.date(),
        description: z.string().optional(),
        heroImage: z.string().optional(),
        gallery: z.array(z.object({
            image: z.string(),
            alt: z.string().optional(),
        })).optional(),
    }),
});

export const collections = { posts };
