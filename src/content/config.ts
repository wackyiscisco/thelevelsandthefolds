import { defineCollection, z } from 'astro:content';

const songsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    performer: z.string().optional(),
    album: z.string(),
    trackNumber: z.number().optional(), // Must be allowed!
    levelFold: z.string(),
    featured: z.boolean().optional().default(false),
    spotifyUrl: z.string().optional(),
    youtubeUrl: z.string().optional(),
    quote: z.string().optional(),
    coverImage: z.string().optional(),
  }),
});

export const collections = {
  'songs': songsCollection,
};
