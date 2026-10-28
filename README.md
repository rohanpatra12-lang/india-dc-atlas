# India Data Centre Atlas

An open, interactive atlas of how India's data centres are built, powered, cooled, paid for, made green and regulated: 19 chapters, more than 90 calculators, and the 32-part research series behind them. Every headline figure carries a source and a range. Every calculator can show its formulas with the numbers currently on screen.

**Read it:** https://rohanpatra12-lang.github.io/india-dc-atlas/ (or open `site/index.html` in any browser).

**Use it:** copy any figure, chart or calculation, with credit (see [Licence](#licence)). The standards register can be downloaded as open data: [`site/data/standards.csv`](site/data/standards.csv) and [`site/data/chips.csv`](site/data/chips.csv).

**Change it:** edit a file in `src/`, run one command, and the site rebuilds. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## What is in this repository

| Folder | What it holds |
|---|---|
| `site/` | The built atlas: nine self-contained pages (Start, Parts I–V, Growth explorer, Reference, Changelog) plus `data/`. This folder is what GitHub Pages serves. |
| `src/` | The editable source. One file per chapter (`src/page/`), one per script module (`src/scripts/main/`), the stylesheet, the changelog, the growth explorer, and **`src/data/standards.js`, the one place every shared number lives**. |
| `tools/` | The build (`build.py`), the page check (`check.js`), the open-data export, and the optimisation model behind Chapter 16.2 (`tools/models/karnataka_dc_model.py`). |
| `research/` | The 32 research reports and four related studies, in Markdown, each with its numbered source list ([index](research/README.md)). |
| `archive/` | Earlier outputs kept for the record. They carry values from before the October 2026 corrections; do not cite them. |
| `docs/` | How the build and the atlas's conventions work ([ARCHITECTURE.md](docs/ARCHITECTURE.md)). |

## Build it yourself

You need Python 3.9 or newer and Node.js 18 or newer.

```bash
npm install                                  # once: installs the JavaScript parser used by the build
python3 tools/build.py                       # src/ → site/
open site/index.html                         # or double-click it
```

To also open every page in a headless browser and run the atlas's own consistency checks:

```bash
npx playwright install chromium              # once
python3 tools/build.py --check
```

The build reproduces the published pages exactly from `src/`, so a change in `src/` is the only thing that changes the site.

## Publish your own copy on GitHub Pages

1. Fork this repository, or create a new public repository and upload these files.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**. The included workflow (`.github/workflows/pages.yml`) rebuilds `site/` from `src/`, checks every page, and publishes on every push to `main`.
4. After a minute the atlas is live at `https://<your-username>.github.io/<repo-name>/`.

## How the numbers stay consistent

The atlas has one standards register (`src/data/standards.js`, shown on the Reference page). Every value has a range, a source, an owner role and a review date, and every calculator reads from it. Change a value there, rebuild, and it changes in every chapter, chart and formula drawer. The built-in check panel then confirms that headline sentences still match the models.

Evidence tags on every figure say how solid it is: **reported** (published by a named organisation), **model** (computed by the atlas from reported inputs), or **estimate** (a judgement, with its basis).

## Licence

- **Code** (everything in `tools/` and the JavaScript and CSS in `src/`): [MIT](LICENSE).
- **Content** (the atlas text, figures, data, the standards register and everything in `research/`): [Creative Commons Attribution 4.0 International (CC BY 4.0)](LICENSE-CONTENT.md). You may share and adapt it for any purpose, including commercially, as long as you give credit and say what you changed.

Suggested credit: *India Data Centre Atlas (2026), CC BY 4.0, https://github.com/rohanpatra12-lang/india-dc-atlas*.

Third-party material (Chart.js, web fonts, map boundaries and the many sources the atlas cites) keeps its own terms; see [NOTICE.md](NOTICE.md).

## Caveats

The atlas compiles published figures and models built on them. Worked cases are bottom-up estimates, not audited project data; water balances can differ by ±30–50% at real sites; several 2026 policies are known from press and cabinet notes rather than gazettes. The Reference page lists every caveat. Check primary sources before relying on a number for a decision.
