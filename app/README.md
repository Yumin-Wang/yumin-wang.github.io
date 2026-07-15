# Yumin Wang — personal website (source)

React + Vite + Tailwind v4 + Framer Motion + D3. This folder is the one and
only editable source for https://yumin-wang.github.io. The repo root above
this folder holds the *built* static site that GitHub Pages actually serves —
don't hand-edit anything there, it gets overwritten by `npm run build` + copy.

## Develop

```bash
npm install
npm run dev
```

Runs at http://localhost:5173 with hot reload.

## Publish an update

From this folder:

```bash
npm run build
rm -rf ../assets ../index.html
cp -R dist/. ../
cd .. && git add -A && git commit -m "Update site" && git push
```

## Structure

- `src/data/content.js` — all copy (bio, projects, education, publications). Edit this first for text changes.
- `src/components/charts/` — the custom D3/SVG/canvas visualizations (specification curve, UpSet plot, PCA scatter, trial-design tree). All chart data is illustrative/synthetic, tuned to match the real published summary statistics — see comments in each chart file.
- `src/components/` — page sections (Hero, FlagshipProjects, Skills, Education, Publications, Contact, etc.)
