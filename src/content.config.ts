import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postSchema = z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
    gallery: z.array(z.object({
        image: z.string(),
        alt: z.string().optional(),
    })).optional(),
});

const posts = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
    schema: postSchema,
});

const postsEn = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/posts-en" }),
    schema: postSchema,
});

export const collections = { posts, postsEn };
