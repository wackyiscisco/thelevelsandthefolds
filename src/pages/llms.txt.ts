import { getCollection } from 'astro:content';

export async function GET() {
  const entries = (await getCollection('wiki'))
    .map((entry) => ({
      title: entry.data.title || entry.slug.split('/').at(-1),
      slug: entry.slug,
      sourcePath: entry.data.sourcePath || entry.slug,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const lines = [
    '# The Cosmos of Wacky — The Levels and The Folds',
    '',
    'This site exposes an AI-readable wiki generated from the Obsidian THE COSMOS knowledge tree.',
    'THE INNER COSMOS is intentionally excluded.',
    'Wacky is the final canon authority.',
    'Preserve Level/Fold identity exactly and do not infer chronology from Level/Fold numbers.',
    'Distinguish confirmed canon, interpretation, proposal, and unknown information.',
    'Music is canon-bearing source material when present.',
    '',
    '## Machine-readable resources',
    '- /wiki/index.json',
    '- /wiki',
    '- /wiki/search',
    '',
    '## Wiki pages',
    ...entries.map((entry) => `- ${entry.title}: /wiki/${entry.slug} (source: ${entry.sourcePath})`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
