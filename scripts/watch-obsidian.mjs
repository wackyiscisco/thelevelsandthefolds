import fs from 'node:fs';
import process from 'node:process';
import { execFileSync } from 'node:child_process';

const candidates = [
  process.env.COSMOS_OBSIDIAN_ROOT,
  'E:\\The Cosmos of Wacky\\Obsidian\\thelevelsandthefolds\\THE COSMOS',
  'E:\\The Cosmos of Wacky\\Obsidian\\THE COSMOS',
].filter(Boolean);

const sourceRoot = candidates.find((candidate) => fs.existsSync(candidate));
if (!sourceRoot) {
  console.error('Could not locate THE COSMOS. Set COSMOS_OBSIDIAN_ROOT first.');
  process.exit(1);
}

const run = () => {
  try {
    execFileSync(process.execPath, ['scripts/sync-obsidian.mjs'], { stdio: 'inherit' });

    if (process.env.COSMOS_AUTO_PUSH === '1') {
      execFileSync('git', ['add', 'src/content/wiki', 'public/wiki-assets', 'src/data/wiki-sync-manifest.json'], { stdio: 'inherit' });
      try {
        execFileSync('git', ['diff', '--cached', '--quiet']);
      } catch {
        const stamp = new Date().toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ' UTC');
        execFileSync('git', ['commit', '-m', `Sync Cosmos wiki ${stamp}`], { stdio: 'inherit' });
        execFileSync('git', ['push'], { stdio: 'inherit' });
      }
    }
  } catch (error) {
    console.error('Wiki sync failed:', error.message);
  }
};

run();

let timer;
console.log(`Watching ${sourceRoot}`);
console.log('THE INNER COSMOS remains excluded.');
console.log(process.env.COSMOS_AUTO_PUSH === '1' ? 'Automatic git push: ON' : 'Automatic git push: OFF');

fs.watch(sourceRoot, { recursive: true }, (_event, filename) => {
  if (!filename) return;
  const normalized = filename.replaceAll('\\', '/').toLowerCase();
  if (normalized.includes('the inner cosmos') || normalized.includes('theinnercosmos')) return;
  clearTimeout(timer);
  timer = setTimeout(run, 1500);
});
