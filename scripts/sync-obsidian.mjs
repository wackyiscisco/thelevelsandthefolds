import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const wikiRoot = path.join(repoRoot, 'src', 'content', 'wiki');
const assetRoot = path.join(repoRoot, 'public', 'wiki-assets');

// Authoritative local Obsidian source confirmed by Wacky on 2026-09-07.
const DEFAULT_SOURCE_ROOT = 'E:\\The Cosmos of Wacky\\Obsidian\\thelevelsandthefolds\\THE COSMOS';
const sourceRoot = process.env.COSMOS_OBSIDIAN_ROOT || DEFAULT_SOURCE_ROOT;

if (!fs.existsSync(sourceRoot)) {
  console.error('Could not locate the authoritative THE COSMOS source folder.');
  console.error(`Expected: ${sourceRoot}`);
  console.error('Override with COSMOS_OBSIDIAN_ROOT only if the local vault is intentionally moved.');
  process.exit(1);
}

const blocked = (relPath) => {
  const normalized = relPath.replaceAll('\\', '/').toLowerCase();
  return normalized.includes('the inner cosmos') ||
    normalized.includes('theinnercosmos') ||
    normalized.includes('/.obsidian/') ||
    normalized.startsWith('.obsidian/') ||
    normalized.includes('/.git/') ||
    normalized.includes('/node_modules/');
};

const safeSlug = (relPath) => relPath
  .replaceAll('\\', '/')
  .replace(/\.md$/i, '')
  .split('/')
  .map((part) => encodeURIComponent(part.trim().replace(/\s+/g, '-').toLowerCase()))
  .join('/');

const walk = (dir, base = dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const rel = path.relative(base, abs);
    if (blocked(rel)) continue;
    if (entry.isDirectory()) out.push(...walk(abs, base));
    else out.push({ abs, rel });
  }
  return out;
};

const files = walk(sourceRoot);
const mdFiles = files.filter((f) => /\.md$/i.test(f.rel));
const assetFiles = files.filter((f) => !/\.md$/i.test(f.rel));

const noteMap = new Map();
for (const file of mdFiles) {
  const base = path.basename(file.rel, path.extname(file.rel)).toLowerCase();
  if (!noteMap.has(base)) noteMap.set(base, safeSlug(file.rel));
  noteMap.set(file.rel.replaceAll('\\', '/').replace(/\.md$/i, '').toLowerCase(), safeSlug(file.rel));
}

const assetMap = new Map();
for (const file of assetFiles) {
  const key = path.basename(file.rel).toLowerCase();
  if (!assetMap.has(key)) assetMap.set(key, file.rel.replaceAll('\\', '/'));
}

const resolveWikiTarget = (rawTarget) => {
  const target = rawTarget.split('#')[0].trim();
  const normalized = target.replaceAll('\\', '/').replace(/\.md$/i, '').toLowerCase();
  const base = path.basename(normalized);
  const slug = noteMap.get(normalized) || noteMap.get(base);
  if (slug) return `/wiki/${slug}`;
  return `/wiki/search?q=${encodeURIComponent(target)}`;
};

// Obsidian notes may contain arbitrary YAML frontmatter that Astro's content
// parser rejects. The wiki mirror does not need to trust or reinterpret that
// YAML, so strip only a leading frontmatter block and replace it with a small,
// deterministic schema owned by the wiki sync. The source note remains untouched.
const stripLeadingFrontmatter = (text) => {
  const cleaned = text.replace(/^\uFEFF/, '');
  const lines = cleaned.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return cleaned;

  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') {
      return lines.slice(i + 1).join('\n').replace(/^\n+/, '');
    }
  }

  // If a note starts with an unterminated YAML fence, preserve the text as body
  // rather than feeding invalid frontmatter to Astro.
  return cleaned;
};

const transformMarkdown = (text, relPath, mtime) => {
  let output = stripLeadingFrontmatter(text);

  output = output.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_match, target, label) => {
    const assetRel = assetMap.get(path.basename(target.trim()).toLowerCase());
    if (!assetRel) return `![${label || target}](/wiki-assets/missing/${encodeURIComponent(target.trim())})`;
    return `![${label || path.basename(target.trim())}](/wiki-assets/${assetRel.split('/').map(encodeURIComponent).join('/')})`;
  });

  output = output.replace(/\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (_match, target, label) => {
    const href = resolveWikiTarget(target);
    return `[${(label || target).trim()}](${href})`;
  });

  const metadata = [
    '---',
    `title: ${JSON.stringify(path.basename(relPath, path.extname(relPath)))}`,
    `sourcePath: ${JSON.stringify(relPath.replaceAll('\\', '/'))}`,
    `sourceModified: ${JSON.stringify(mtime.toISOString())}`,
    '---',
    '',
  ].join('\n');

  return `${metadata}${output}`;
};

fs.rmSync(wikiRoot, { recursive: true, force: true });
fs.rmSync(assetRoot, { recursive: true, force: true });
fs.mkdirSync(wikiRoot, { recursive: true });
fs.mkdirSync(assetRoot, { recursive: true });

for (const file of mdFiles) {
  const destination = path.join(wikiRoot, file.rel);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const stat = fs.statSync(file.abs);
  const text = fs.readFileSync(file.abs, 'utf8');
  fs.writeFileSync(destination, transformMarkdown(text, file.rel, stat.mtime));
}

for (const file of assetFiles) {
  const destination = path.join(assetRoot, file.rel);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(file.abs, destination);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  sourceRoot,
  markdownFiles: mdFiles.length,
  assetFiles: assetFiles.length,
  excludedRule: 'THE INNER COSMOS is never mirrored',
};
fs.writeFileSync(path.join(repoRoot, 'src', 'data', 'wiki-sync-manifest.json'), JSON.stringify(manifest, null, 2));

console.log(`Wiki sync complete: ${mdFiles.length} notes, ${assetFiles.length} assets.`);
console.log(`Source: ${sourceRoot}`);
console.log('Excluded: THE INNER COSMOS');
