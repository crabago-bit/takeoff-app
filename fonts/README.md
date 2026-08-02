# Bundled font bank (TEXT-TOOLING)

Open-licensed fonts bundled for on-canvas rich-text markup rendering. All are
served as **same-origin app assets** (never a remote fetch — CSP-safe / fully
offline) and declared via `@font-face` in `src/fonts.css`. Each family maps to a
`FONT_BANK` entry in `src/lib/markup-style.ts` and is exposed in the text format
toolbar's family picker.

Files are **woff2**, each subsetted to Latin-1 + Latin Extended-A + common
punctuation / currency / arrows (see the `pyftsubset` unicode range used at
generation time) to keep the bundle small; 4 styles per family
(Regular / Bold / Italic / Bold-Italic).

## Families, sizes, licenses

| Family (key) | Metric match | Styles | Total | License |
|---|---|---|---|---|
| Liberation Sans (`liberation-sans`) | Arial | R/B/I/BI | ~123 KB | SIL OFL 1.1 |
| Liberation Serif (`liberation-serif`) | Times New Roman | R/B/I/BI | ~135 KB | SIL OFL 1.1 |
| Liberation Mono (`liberation-mono`) | Courier New | R/B/I/BI | ~103 KB | SIL OFL 1.1 |
| Carlito (`carlito`) | Calibri | R/B/I/BI | ~204 KB | SIL OFL 1.1 |
| Caladea (`caladea`) | Cambria | R/B/I/BI | ~101 KB | SIL OFL 1.1 |
| Noto Sans (`noto-sans`) | — (humanist sans) | R/B/I/BI | ~76 KB | SIL OFL 1.1 |

**Total bundle: ~824 KB across 24 woff2 files.**

Every family is licensed under the **SIL Open Font License, Version 1.1**. Full
license texts:

- `LICENSE-Liberation.txt` — Liberation Sans/Serif/Mono (fonts-liberation 2.1.5).
- `OFL-Carlito.txt` — Carlito.
- `OFL-Caladea.txt` — Caladea.
- `OFL-NotoSans.txt` — Noto Sans.

## Lazy loading

A declared-but-unreferenced `@font-face` is **not** fetched. The browser
downloads a given woff2 only the first time a markup actually renders in that
family (e.g. the user selects it in the format toolbar), so the font bank adds
zero eager JS payload beyond the small `@font-face` rules. `font-display: swap`
shows the fallback stack immediately and swaps in the bundled face on arrival.

## Regenerating

Source TTFs: Liberation from the system `fonts-liberation` package; Carlito /
Caladea / Noto Sans from the `google/fonts` OFL repo (Noto Sans instanced from
its variable font at `wght=400/700`, `wdth=100`). Convert + subset with
`fonttools` / `pyftsubset --flavor=woff2`.
