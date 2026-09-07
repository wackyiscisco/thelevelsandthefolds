import fs from 'node:fs';
import path from 'node:path';

export type WikiAssetRecord = {
  name: string;
  sourcePath: string;
  folderPath: string;
  folderSlug: string;
  publicPath: string;
  extension: string;
  isImage: boolean;
};

export function loadWikiAssetIndex(): WikiAssetRecord[] {
  const file = path.join(process.cwd(), 'src', 'data', 'wiki-asset-index.json');
  if (!fs.existsSync(file)) return [];

  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(parsed.assets) ? parsed.assets : [];
  } catch {
    return [];
  }
}
