# Cosmos Wiki Sync

This branch turns the Obsidian `THE COSMOS` knowledge tree into an Astro wiki under `/wiki`.

## Authoritative local source

Confirmed by Wacky on 2026-09-07:

`E:\\The Cosmos of Wacky\\Obsidian\\thelevelsandthefolds\\THE COSMOS`

That folder is the default and authoritative local source for the wiki mirror. `COSMOS_OBSIDIAN_ROOT` remains available only as an intentional override if the vault is physically moved later.

## Source boundary

Included:
- everything inside the authoritative local `THE COSMOS` folder
- Markdown notes
- linked/static assets located inside that tree

Excluded by hard rule:
- `THE INNER COSMOS`
- `.obsidian`
- `.git`
- `node_modules`

## Commands

One-time/manual sync:

```bash
npm run wiki:sync
```

Continuously watch Obsidian and regenerate the wiki mirror:

```bash
npm run wiki:watch
```

Windows launcher with automatic Git commit/push enabled:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\wiki-watch.ps1
```

Install the watcher to start automatically whenever Wacky logs into Windows:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-wiki-watch-task.ps1
```

The automatic mode stages only:
- `src/content/wiki`
- `public/wiki-assets`
- `src/data/wiki-sync-manifest.json`

It does not stage unrelated website work.

## Update flow

1. Wacky or High Mei edits/adds/removes something inside the authoritative Obsidian `THE COSMOS` folder.
2. The local watcher detects the filesystem change.
3. The mirror regenerates the wiki Markdown and eligible assets.
4. Automatic mode commits and pushes only generated wiki changes.
5. The existing site deployment rebuilds from GitHub.
6. `/wiki`, `/wiki/search`, `/wiki/index.json`, and `/llms.txt` expose the refreshed knowledge to humans and AI systems.

The GitHub/cloud site cannot directly watch the local E: drive; the Windows watcher is the required local-to-cloud bridge.

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
