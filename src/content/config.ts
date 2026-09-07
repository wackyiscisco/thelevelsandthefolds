import { defineCollection, z } from 'astro:content';

const songsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    performer: z.string().optional(),
    album: z.string(),
    trackNumber: z.number().optional(),
    levelFold: z.string(),
    featured: z.boolean().optional().default(false),
    spotifyUrl: z.string().optional(),
    youtubeUrl: z.string().optional(),
    quote: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

const wikiCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    aliases: z.union([z.string(), z.array(z.string())]).optional(),
    tags: z.union([z.string(), z.array(z.string())]).optional(),
    levelFold: z.string().optional(),
    canonStatus: z.string().optional(),
    sourcePath: z.string().optional(),
    sourceModified: z.string().optional(),
  }).passthrough(),
});

export const collections = {
  songs: songsCollection,
  wiki: wikiCollection,
};
