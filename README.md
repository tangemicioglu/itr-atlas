# Information Transfer Rate — Atlas

A curated atlas comparing **information transfer rate (ITR, bits/s)** across human→machine input
modalities: brain–computer interfaces, eye-tracking, speech, typing, and more.

ITR numbers are easy to quote and surprisingly easy to compare on the wrong basis. Wolpaw's
assumptions, for example, rarely hold cleanly in real interfaces. The atlas keeps the arithmetic
out in the open: **every number is sourced and re-derived, step by step**. Fitts, Wolpaw,
Nuyujukian, and Shannon-entropy scores are treated as upper bounds on the channel, so each entry is
ranked on the **strictest** valid bound. The looser methods are still shown, and the score selector
lets you compare any one method across entries.

> 🌐 **Live: [tangemicioglu.com/itr-atlas](https://tangemicioglu.com/itr-atlas/)**
> 📐 Full spec & data model: **[SPEC.md](./SPEC.md)** — visual design system (tokens): **[DESIGN.md](./DESIGN.md)** (Google `design.md` format)

## Status

✅ **Built and deployed.** ~45 entries across BCI (intracortical, ECoG, endovascular), spellers
(SSVEP, P300, eye, QWERTY), silent speech (sEMG, electropalatography, lip-reading), pointing
devices, and chord keyboards. Each entry has sourced, re-derived figures and is ranked on the
strictest valid one. A few early seed entries still use placeholder figures until they are
re-derived from the papers.

## What each entry shows

Each interface gets:
- **A headline ITR = the strictest upper bound**: the smallest scoring method that fits the entry,
  since each method only caps the true rate. A score selector swaps the displayed number to any
  single method (Fitts / Wolpaw / Nuyujukian / Shannon) across all entries.
- A **full derivation**: every constant traced to its source (paper section / table), every
  operation shown, for each method.
- A **provenance badge**: whether the figure is author-reported and verified, or recomputed by us
  because the paper omitted a comparable number.
- Other applicable methods kept as **secondary derivations** on the entry page.

## Stack

- [Astro](https://astro.build): static site, content collections with Zod-validated entry data.
- Build-time computation of standard ITR formulas (Wolpaw, confusion-matrix mutual information).
- Deployed to **GitHub Pages** on every push to `main` via `.github/workflows/deploy.yml`.

The site is served under the `/itr-atlas` base path (set in `astro.config.mjs`) on the account's
custom domain. Internal links go through `src/lib/url.ts`, so they resolve under any base. To host
at a different path, change `base` there. No link edits needed.

## Contributing an interface

Submissions go through a **Google Form** (link TBD). Responses are reviewed and curated into entry
files by a maintainer. There is no open write access. To propose an interface, include the source
paper or DOI, the reported accuracy and timing, and the number of targets, or the relevant
modality-specific inputs.

## Local development

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:4321
npm test         # run unit tests (ITR compute helpers)
npm run check    # type-check + validate content schema
npm run build    # produce the static site in dist/
```

Add an interface by creating a Markdown file in `src/content/interfaces/`. Front-matter is
validated against the schema in `src/content.config.ts`. Standard calculations use a `compute`
block, non-standard ones supply authored `steps`.

## License

[MIT](./LICENSE).
