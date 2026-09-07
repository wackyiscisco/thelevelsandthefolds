import { getCollection } from 'astro:content';

export async function GET() {
  const entries = (await getCollection('wiki')).map((entry) => ({
    title: entry.data.title || entry.slug.split('/').at(-1),
    slug: entry.slug,
    url: `/wiki/${entry.slug}`,
    sourcePath: entry.data.sourcePath || null,
    sourceModified: entry.data.sourceModified || null,
    levelFold: entry.data.levelFold || null,
    canonStatus: entry.data.canonStatus || null,
  }));

  return new Response(JSON.stringify({
    name: 'The Cosmos of Wacky Wiki Index',
    generatedAt: new Date().toISOString(),
    excluded: ['THE INNER COSMOS'],
    entries,
  }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
