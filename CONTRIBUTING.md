# Changing the atlas

Everything you see on the site is built from `src/`. Edit there, run `python3 tools/build.py`, open `site/index.html`, and check your change. Run `python3 tools/build.py --check` before you commit: it opens every page in a headless browser and fails on any script error, any failed consistency check, or a page that scrolls sideways on a phone.

Never edit `site/` by hand; the next build overwrites it.

## Where things live

| You want to change | Edit |
|---|---|
| A number used across chapters (grid carbon, tariffs, capex, cooling PUE/WUE, a chip's power or throughput) | `src/data/standards.js` |
| The text, tables or panel layout of a chapter | `src/page/NN-chXX-*.html` (one file per chapter; `21-numbers` is the Reference page) |
| How a calculator or chart computes | `src/scripts/main/NNN-*.js` (files are named after the chapter or tool; search for the element id shown in the HTML) |
| The "Show the calculation" drawers | `072-explain-…js` (why each equation), `073-formula-forms-…js` (the general formula per row); new entries may also sit next to their calculator, as in `089-ai-accelerators-…js` |
| "How to read this" guides | the `RG` object in `067-detail-panels-…js` (keys are the panel's `<h3>` title) |
| The consistency checks | `036-single-source-of-standard-values-…js` (`ok(name, value, expected)`) and `069-audit-headline-claims-…js` |
| Styles | `src/styles/atlas.css` |
| The changelog | `src/changelog.json` (newest first) |
| The Growth explorer page | `src/growth/india-dc-growth.html` |

`src/manifest.json` lists every source file in the order the build joins them. Add a new file by inserting its path in the right place.

## Recipes

### Change a standard value

1. Open `src/data/standards.js` and find the `def(...)` line, for example `def('co2', 'India grid CO₂ factor…', 0.675, 0.675, 0.727, 't/MWh', 'pw', '2027-08', 'CEA CO₂ Baseline Database v22.0…', 'reported', '…')`.
   The arguments are: key, label, value, low, high, unit, owner role, review date, source, confidence (`reported`, `model`, `estimate`), and where it is used.
2. Change the value, the range and the source together. Keep the source specific: publisher, document, date.
3. Bump `VERSION` and `DATE` at the top of the file and add a line to `history` at the bottom saying what changed and why.
4. Build with `--check`. If a check fails, a sentence somewhere still states the old number: search `src/page/` for it and update the text.

### Add or update an AI chip

Chip records are in the `CHIPS` object in `src/data/standards.js`. Each has specifications, `kw` (server power per GPU, with `kwSrc` and `kwC`: `reported` or `estimate`), rental prices, and `mlp`: MLPerf Inference Server results per GPU as `[tokens/s, 'round · precision · system']`. The register rows, the Chapter 11 tables, the cluster sizer (11.6), the design check (14.6), the data centre model (14.2) and the GPU-hour calculator (15.2) all read from it. To add a chip to the 11.6 comparison, also add its id to `I5` in `089-ai-accelerators-…js`.

Rules: a throughput number must state model, precision, scenario and system; a value you cannot source stays out of the register (put it in the text and mark it as an estimate).

### Edit chapter text

Open the chapter's file in `src/page/`. Panels are `<div class="panel">` with an `<h3>` title and a `<span class="sub">` subtitle. Put an evidence tag after any figure:

```html
<span class="ev r show" data-src="Publisher, document, date">reported</span>   <!-- r = reported, m = model, e = estimate -->
```

### Add a calculator panel

1. Add the HTML to the chapter file: controls use
   `<div class="ctrl"><label for="ID">Label</label><output id="ID-o"></output><input id="ID" type="range" min="…" max="…" step="…" value="…"></div>`
   and button groups use `<div class="seg" id="ID">` with `<button data-v="…" aria-pressed="true|false">`.
2. Add the logic in a script module, wrapped so it only runs on the page that has the panel:
   `(()=>{ if(!document.getElementById('ID')) return; … })();`
   Shared helpers are available: `val(id)`, `out(id, text)`, `fmt(number, decimals)`, `seg(id, fn)`, `readout(el, [[value, label, class]])`, `hbars(el, rows, {max})`, and `STD` for standard values.
3. Give it a formula drawer: `EX['ID'] = {why: ['…'], calc: () => [[step, 'numbers', 'result'], …]}`, a matching `FORMS['ID'] = {'step name': 'general formula'}`, and value notes in `__ASM['ID'] = [[value, used, why, basis, confidence]]`. The "Show the calculation" button appears automatically. These entries must come before `089z-wire-formula-drawers-run-last.js` in the manifest.
4. Add a "How to read this" guide: an entry in `RG` keyed by the panel's exact `<h3>` title, with `s` (what you see), `r` (how to read it), `m` (what it tells you) and optionally `w` (careful).
5. If the panel states a headline number, add a check so the sentence and the model cannot drift apart.

### Record the change

Add an entry at the top of `src/changelog.json`. Describe what changed for a reader, not the code.

## Standards for contributions

- Sources first: every new figure needs a named, dated source or an explicit "estimate" with its basis.
- Ranges, not false precision: where sources disagree, keep both and say why (dense vs sparse, withdrawal vs consumption, plant vs meter).
- Plain English: write for a policymaker, not an engineer; define a term the first time it appears or link the glossary on the Reference page.
- Phone first: every panel must work at 390 px wide (`--check` tests this).
