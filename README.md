# Information Transfer Rate — Interface Gallery

A curated, shareable gallery comparing **information transfer rate (ITR, bits/min)** across all
human→machine input modalities: brain–computer interfaces, eye-tracking, speech, typing, and more.

Most ITR comparisons quietly misapply the math — Wolpaw's assumptions rarely hold in real
interfaces. This project makes the rigor visible: **every number is sourced and re-derived, step by
step**, and each entry shows exactly which method was used and why.

> 📐 Full spec & data model: **[SPEC.md](./SPEC.md)** — visual design system (tokens): **[DESIGN.md](./DESIGN.md)** (Google `design.md` format)

## Status

🏗️ **Pre-implementation.** The spec is approved and frozen in `SPEC.md`. Code has not started.

## What makes an entry honest

Each interface gets:
- **One reference ITR** — the single number used for comparison, chosen to fit the modality.
- A **full derivation** — every constant traced to its source (paper section / table), every
  operation shown.
- A **provenance badge** — whether the figure is author-reported and verified, or recomputed by us
  (because the paper omitted it, or its method was flawed).
- Optional **supplementary calculations**, clearly marked as *not used for ranking*.

## Stack

- [Astro](https://astro.build) — static site, content collections with Zod-validated entry data.
- Build-time computation of standard ITR formulas (Wolpaw, confusion-matrix mutual information).
- Static hosting (Vercel / Netlify / GitHub Pages).

## Contributing an interface

Submissions go through a **Google Form** (link TBD). Responses are reviewed and curated into entry
files by a maintainer — there's no open write access. To propose an interface you'll need: the
source paper/DOI, the reported accuracy and timing, and the number of targets (or the relevant
modality-specific inputs).

## Local development

_Setup instructions will be added once scaffolding lands._

## License

[MIT](./LICENSE).
