# Cosmos Wiki Sync

This branch turns the Obsidian `THE COSMOS` knowledge tree into an Astro wiki under `/wiki`.

## Source boundary

Included:
- everything inside the local `THE COSMOS` folder
- Markdown notes
- linked/static assets located inside that tree

Excluded by hard rule:
- `THE INNER COSMOS`
- `.obsidian`
- `.git`
- `node_modules`

## Local source detection

The sync script checks these locations in order:

1. `COSMOS_OBSIDIAN_ROOT` environment variable
2. `E:\\The Cosmos of Wacky\\Obsidian\\thelevelsandthefolds\\THE COSMOS`
3. `E:\\The Cosmos of Wacky\\Obsidian\\THE COSMOS`

If the real source differs, set `COSMOS_OBSIDIAN_ROOT` to the exact local `THE COSMOS` directory.

## Commands

One-time/manual sync:

```bash
npm run wiki:sync
```

Continuously watch Obsidian and regenerate the wiki mirror:

```bash
npm run wiki:watch
```

To also commit and push generated changes automatically from the local clone, set:

```powershell
$env:COSMOS_AUTO_PUSH="1"
npm run wiki:watch
```

The auto-push mode stages only:
- `src/content/wiki`
- `public/wiki-assets`
- `src/data/wiki-sync-manifest.json`

## Generated web surfaces

- `/wiki` — browsable wiki
- `/wiki/search` — full-text browser search over mirrored notes
- `/wiki/<generated-path>` — one page per Obsidian note
- `/wiki/index.json` — machine-readable index
- `/llms.txt` — AI/LLM discovery and operating guidance

## Obsidian links

The sync bridge converts ordinary Obsidian `[[wikilinks]]` into web links whenever a target can be resolved. Unresolved links route to wiki search instead of inventing a destination.

Embedded local assets are copied to `/wiki-assets` when they live inside `THE COSMOS`.

## Canon law

The wiki is a mirror of source material, not an independent canon authority. Wacky remains the final canon authority. The renderer must never invent missing content.
