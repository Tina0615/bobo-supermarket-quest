---
name: kenney-asset-finder
description: Search Kenney's live asset catalog and, when requested, download and organize selected packs in the project; route Phaser 4 loading work through the project's loading-assets skill.
---

# Kenney Asset Finder and Importer

Use Kenney's live catalog as the source of truth:

- Catalog: https://kenney.nl/data/itch/preview/
- It offers category filters for 2D, 3D, UI, Icons, Audio, and Other, plus a text filter.

## Find and shortlist

1. Translate the request into a few search concepts: subject, asset type, visual style, camera/view, and intended use. Search the catalog's text filter and relevant category filters; try useful synonyms when the first query is too narrow.
2. Review matching pack names and preview thumbnails. A thumbnail can confirm visible theme or style, but do not infer unseen contents from a title alone.
3. For promising matches, open the official Kenney asset page using the canonical link from the catalog or a search for the exact pack title. Do not invent a URL slug.
4. Return a useful shortlist in the user's language with the English pack name, a Traditional Chinese rendering when useful, category, fit, and official page link. Give a full matching list only when requested.

## Download and organize

- A search or shortlist request alone does not authorize downloading. Download when the user asks to download/import a pack into the project. Do not purchase paid content without explicit authorization.
- On the selected official asset page, verify the download link, license, attribution terms, price, and available formats. Use the official download link; do not guess archive URLs or use third-party mirrors. If terms or cost are unclear, stop and report what is unclear before obtaining the files.
- Keep the downloaded archive at `assets/source-packs/kenney/<pack-slug>.zip` and extract its original contents to `assets/source-packs/kenney/<pack-slug>/`. Preserve the included `License.txt` and source formats for provenance.
- Inspect the project's existing asset layout and copy only the files needed by the game into its runtime asset directory. If the project has no convention yet, use `assets/kenney/<pack-slug>/` and keep a license copy with the runtime assets when the pack supplies one. Do not assume the project uses Vite or a `public/` directory.
- Choose the best format in the pack for the intended use. Keep filenames understandable; rename only when useful and keep a clear mapping to the original names. Report the pack page, license, archive location, runtime asset location, and selected files.
- If the project already has asset download/import scripts, inspect and use those helpers. Do not assume `assets:download`, `assets:import`, `assets:manifest`, `assets:verify`, or `scripts/kenney/` exist; use direct file operations only when no project helper is available.
- Update an existing asset manifest when the project has one. Do not create a manifest or report a verification script result unless that file or script exists and was actually used.

## Connect assets to Phaser 4

When the user asks to use the imported files in the game or verify the full download-to-render flow:

1. Read the project [Phaser 4 loading-assets skill](../loading-assets/SKILL.md) before changing loader code. Use other Phaser skills, such as `sprites-and-images`, when the requested game-object work needs them.
2. Register the chosen files in the relevant existing Scene's `preload()` with the matching loader (`image`, `spritesheet`, `atlas`, audio, or data). Match loader type and metadata to the actual files supplied by the pack; do not treat a sprite sheet as a named-frame atlas without checking its metadata. Use the project's manifest if one exists, but wire only the assets needed by that Scene; a manifest does not auto-load assets or edit game code.
3. Determine the asset URL from the project's bundler and server configuration. Do not assume Vite's `public/` behavior. Use stable, unique Phaser cache keys and reference those keys in `create()` or the relevant game code.
4. Add the asset to the intended game Scene; preserve the project's direct-to-game entry point and existing flow. Do not replace gameplay with an asset gallery unless the user asks for a preview or pipeline demonstration.
5. If the user explicitly asks to verify the pipeline, run the project's available production build and open the game in a browser to confirm the chosen asset loads and renders. Report any build warning or load failure.

## Accuracy

- The catalog is a changing visual index. Revisit it for each search; do not rely on remembered package counts or a stale list.
- The index may show names and previews without written descriptions. When details come from a thumbnail or title, phrase them as a visual summary or inference rather than an official description.
- Verify license, attribution requirements, price, included formats, and file counts on the specific official pack page before stating them. Do not assume one pack's terms apply to another.
