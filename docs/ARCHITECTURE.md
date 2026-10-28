# How the atlas is built

## Pipeline

```
src/manifest.json ──► build/atlas.html ──► build/pages/ ──► build/inline/ ──► site/ ──► site/growth.html, site/data/
     (assemble)            (split)            (inline)          (slim)        (growth, export)
```

| Step | Script | What it does |
|---|---|---|
| assemble | `tools/build.py` | Joins every file in `src/manifest.json`, in order, into one HTML document. Text entries in the manifest (`{"text": …}`) are the small joins between script blocks. |
| split | `tools/split.py` | Cuts the document into pages (Start, Parts I–V, Reference, Changelog) at the `part-*` and `numbers` anchors; builds the header, the search index and the changelog page (from `src/changelog.json` and `src/changelog-extra.html`); rewrites `href="#id"` links that point to another page. Each script block is passed through `tools/isolate.js`, which wraps top-level statements so one failing calculator cannot stop the others. |
| inline | `tools/inline.py` | Puts the CSS, the scripts and the search index inside each page, so every page is a single self-contained file. |
| slim | `tools/slim.py` | Drops data a page does not use (the district map outside Part IV, the changelog's scripts) and simplifies map outlines. |
| growth | `tools/growth.py` | Adds the Growth explorer page and links it from the header, Part III, the landing page and the changelog. |
| export | `tools/export.js` | Writes the standards register and chip records to `site/data/` as JSON and CSV. |

## Runtime conventions

- **One standards module.** `src/data/standards.js` defines `window.STD`. Models read `STD.co2`, `STD.gw.India`, `STD.tA[state]`, `STD.chips.b300.kw` and so on, never their own copies. `STD.E` holds every register row with its range, owner, review date and source; the Reference page renders it.
- **Page guards.** Pages are split, so an element may not exist on the current page. Calculators start with `if(!document.getElementById('…')) return;`.
- **Formula drawers.** `EX[id]` (why, live calculation), `FORMS[id]` (general formulas) and `__ASM[id]` (why these values) are collected by `089z-wire-formula-drawers-run-last.js`, which builds the "Show the calculation" box inside the panel containing the element `id`.
- **Reading guides.** `RG[h3 title] = {s, r, m, w}` adds a "How to read this" box to the matching panel.
- **Evidence tags.** `<span class="ev r|m|e show" data-src="…">` marks a figure as reported, model or estimate; the source appears on hover and in brief mode.
- **Checks.** `V2.check()` returns `[name, value, expected, ok]` rows comparing models with the register and headline sentences with the models; the consistency panel and `tools/check.js` both run it.

## Models outside the browser

`tools/models/karnataka_dc_model.py` is the hourly linear programme behind Chapter 16.2 (least-water power for a 50 MW data centre in Karnataka; SciPy HiGHS). Its results are embedded in the Chapter 16 script as data; rerun it with `python3 tools/models/karnataka_dc_model.py` (needs NumPy and SciPy) if you change its inputs; it writes `results.json`, whose values then replace the embedded data in `026-14-karnataka-least-water-power.js`.

## History

The atlas was assembled between September and October 2026 by successive scripted edits to one document. In October 2026 that document was decomposed into the files in `src/` without changing a byte of the output, so the change history before v33 is recorded in the changelog rather than in version control.
