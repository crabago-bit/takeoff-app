# Offline OCR assets (tesseract.js)

These files let the OCR path (`src/lib/ocr/`) run **fully offline** — no CDN
fetch at runtime, which is required for the packaged Tauri app. They are served
same-origin from `/tessdata/…` and wired via `createWorker`'s
`workerPath` / `corePath` / `langPath` in `src/lib/ocr/ocr-service.ts`.

Vite copies everything in `public/` verbatim into the build output root, so
these ship with the app and load from the app origin.

## Files (tesseract.js 5.1.1)

| File                            | Size    | Source                                             | Purpose                                              |
| ------------------------------- | ------- | -------------------------------------------------- | ---------------------------------------------------- |
| `worker.min.js`                 | ~121 KB | `node_modules/tesseract.js/dist/worker.min.js`     | The web-worker script (`workerPath`).                |
| `tesseract-core-simd.wasm.js`   | ~4.6 MB | `node_modules/tesseract.js-core/`                  | Emscripten wasm-core loader (SIMD build). Preferred. |
| `tesseract-core.wasm.js`        | ~4.6 MB | `node_modules/tesseract.js-core/`                  | Non-SIMD fallback loader (`corePath` picks per env). |
| `eng.traineddata.gz`            | ~1.9 MB | `tessdata_fast` 4.0.0 (naptha/tessdata gh-pages)   | English model (`langPath`, gzipped — `gzip: true`).  |

Total: ~11 MB on disk (loaded lazily, only when OCR is first invoked).

## Refreshing

```sh
# worker + core (from the installed tesseract.js)
cp node_modules/tesseract.js/dist/worker.min.js               public/tessdata/
cp node_modules/tesseract.js-core/tesseract-core-simd.wasm.js public/tessdata/
cp node_modules/tesseract.js-core/tesseract-core.wasm.js      public/tessdata/

# English model (tessdata_fast — smaller than _best, ample for CAD sheet text)
curl -sSL -o public/tessdata/eng.traineddata.gz \
  https://github.com/naptha/tessdata/raw/gh-pages/4.0.0_fast/eng.traineddata.gz
```

## Why these are NOT in the eager JS bundle

`tesseract.js` is imported via a dynamic `import()` inside
`ocr-service.ts` / `ocr-batch.ts`, so Rollup/Vite emits it (and the wasm-core
loader it pulls) as a **separate async chunk**. The eager app bundle is
unaffected; the ~11 MB of OCR assets only load when the user actually runs
"Recognize text (OCR)".
