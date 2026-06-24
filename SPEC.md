# ITR Interface Gallery — Product & Architecture Spec

> Status: **approved design**, pre-implementation. Last updated 2026-06-24.
> Visual design system (tokens) lives separately in [DESIGN.md](./DESIGN.md) (Google `design.md` format).

A curated, shareable gallery comparing **information transfer rate (ITR, bits/min)** across all
human→machine input modalities — brain–computer interfaces, eye-tracking, speech, typing, Morse,
and more.

The hook is the gallery. The point is **rigor**: every number is sourced and re-derived, and the
site foregrounds the fact that ITR is routinely misapplied. Wolpaw's assumptions (uniform target
prior, symmetric errors, no error-correction cost) rarely hold in real interfaces — see
Yuan et al. 2013, *"A study of the existing problems of estimating the information transfer rate in
online brain–computer interfaces"* ([PMID 23448963](https://pubmed.ncbi.nlm.nih.gov/23448963/)).
Inspired by [this comparison](https://x.com/SumnerLN/status/2069225927486435548).

---

## 1. Goals & non-goals

**Goals**
- Compare interfaces on a single, defensible ITR number per entry.
- Make every figure auditable: sourced inputs + a fully worked, step-by-step derivation.
- Treat "this ITR is misleading" as a first-class, visible property — not a footnote.
- Be shareable and pleasant to browse.

**Non-goals (v1)**
- Live/interactive ITR calculator with editable inputs.
- Multi-entry "compare" mode.
- User accounts, backend, database, moderation queue.
- Automated paper ingestion.

---

## 2. Scope (v1)

- **Static site** built with **Astro**, deployed to a static host (Vercel / Netlify / GitHub Pages).
- **Curated entries** stored as schema-validated content collection files in the repo.
- **Submissions** via a **Google Form** → responses land in a Sheet → maintainer curates good ones
  into entry files by hand. No backend.
- **Browsing**: search + modality filter + sort (ITR high→low default). No compare mode.

---

## 3. Core model

### 3.1 The "reference calculation" principle

Calculation methods are **heterogeneous** — there is no universal formula. The heterogeneity is
**not** primarily about the sensing modality; it is about the **action space** and the **source
statistics** of the task, which are design choices independent of the hardware:

- **Action space** — the set of distinguishable actions available at each selection. It may be a
  fixed set of targets, a set that changes per step (pruned by a dictionary, grammar, or language
  model), or a continuous control space.
- **Source statistics / prior** — how probability mass is spread over that space. Wolpaw assumes a
  uniform prior over a fixed N; real tasks rarely satisfy this (letter frequencies are Zipfian, a
  bigram grammar conditions the next action on the last, a predictive layout reshapes likelihoods).

A text interface is the clearest illustration: free-word (open vocabulary), fixed dictionary, and
bigram-grammar variants of the *same* modality have different action spaces and priors, so they
have different information per selection — and the resulting bits/min are not equivalent. The chosen
method (Wolpaw, confusion-matrix mutual information, entropy/perplexity, Fitts'-law throughput)
follows from the action space and source model, not from the modality label.

**Comparability caveat.** Because the "bit" is defined by the action space, headline bits/min are
only directly comparable across entries that count raw selections over a **uniform, fixed** target
set. When an entry's action space is context-dependent, continuous, or has a non-uniform/learned
prior, its number bakes in extra structure and must be read against its action space (see §3.4), not
ranked naively. The site surfaces this per entry.

Each entry designates **one reference calculation** — the number used for cross-comparison in the
gallery. Other calculations may be shown as **supplementary** (explicitly *not used for ranking*).

**Choosing the reference, in priority order:**
1. Use the **original paper's own** calculation/number where it exists and is sound.
2. If the paper omits ITR, **we compute one** with a modality-appropriate method.
3. If the paper's method is **flawed**, **we recompute** and replace it — and show **both** the
   original derivation and ours, so the discrepancy is auditable rather than asserted.

### 3.2 Provenance taxonomy

Every calculation carries one provenance badge:

| Badge                          | Meaning                                                       |
|--------------------------------|--------------------------------------------------------------|
| `Author-reported · verified`   | We re-derived the paper's own method and matched its number. |
| `Author-reported · unverified` | Paper gives a number but lacks detail to re-derive it.       |
| `Recomputed — paper omitted`   | No ITR in the paper; we computed one.                        |
| `Recomputed — original flawed` | Paper's method was broken; ours replaces it (reason linked). |

### 3.3 Entry shape (conceptual schema)

```
Entry {
  id, name, image, year
  modalityTags[]            // e.g. ["EEG", "SSVEP"]
  sensingModality           // grouping for filters
  invasiveness              // "non-invasive" | "invasive" | ...
  source { authors, venue, year, doi, url }

  inputs[] {                // every constant used, with provenance
    symbol, value, unit,
    sourceNote              // "Mean online accuracy, Table 1"
  }

  actionSpace {             // what defines a "bit" here (see §3.4)
    kind                    // "fixed-set" | "context-dependent" | "continuous"
    size                    // effective N, or "continuous"
    prior                   // "uniform" | "non-uniform" | "context-conditioned"
    notes?                  // modality-specific detail: grammar, language model, Fitts' ID, …
  }

  calculations[] {
    method                  // "Wolpaw bitrate"
    kind                    // short descriptor: "Theoretical upper bound"
    provenance              // one of the taxonomy values above
    steps[]                 // ordered, worked derivation (see §6)
    resultBitsPerMin
    notUsedForRanking?      // true => supplementary
    flawReason?             // when "Recomputed — original flawed"
  }

  referenceCalculationId    // which calculation is the comparison number
  notes                     // caveats, free text
}
```

### 3.4 Action space

`actionSpace` is a first-class, **modality-agnostic** descriptor of what defines a bit for an entry.
The three structured axes map directly to whether Wolpaw's assumptions hold; modality-specific
detail (dictionary vs grammar, language model, Fitts' index of difficulty) lives in `notes`.

| Axis    | Values                                                | Meaning |
|---------|-------------------------------------------------------|---------|
| `kind`  | `fixed-set`, `context-dependent`, `continuous`        | Structure of the available actions. |
| `size`  | a number, or `continuous`                             | Effective count of distinguishable actions. |
| `prior` | `uniform`, `non-uniform`, `context-conditioned`       | How probability mass is distributed over them. |

Examples: an SSVEP grid is `fixed-set / 40 / uniform`; skilled QWERTY (scored by English character
entropy) is `fixed-set / ~30 / context-conditioned`; a 2D cursor is `continuous / continuous / —`; a
grammar-constrained speller is `context-dependent / varies / context-conditioned`. An entry counts
as directly comparable only when `kind = fixed-set` **and** `prior = uniform`; otherwise the detail
page shows a comparability caveat.

---

## 4. Pages

1. **Gallery (home)** — title + one-line thesis + result count; controls (search, modality filter
   chips, sort); responsive 3-up grid of stat cards. Each card: device photo, name, modality tags,
   large ink-black ITR, a mini secondary stat (key inputs + method), and a **provenance pill**.
2. **Entry detail** — self-contained panel: header (photo, tags, invasiveness); **reference ITR**
   with full step-by-step derivation; a "method varies by modality" note; any additional full
   derivations (e.g. paper's vs ours); supplementary calculations; citations.
3. **Methodology / About** — explains ITR and the Wolpaw formula, its assumptions, the Yuan et al.
   critique, and how reference methods and provenance are assigned.
4. **Submit** — embeds/links the Google Form.

---

## 5. Visual system

The full token set (colors, typography, spacing, component tokens) is defined in
[DESIGN.md](./DESIGN.md) using the Google `design.md` format. Summary:

- **Theme**: warm "lab paper". Monochrome accent — color comes from type weight, not brand hue;
  ITR numbers stay ink-black. No gradients.
- **Card style**: stat block ("trading card") — dense, shareable.
- **Type**: clean system sans for UI; **monospace** for formulas and math.

---

## 6. Rendering derivations (key implementation decision)

Derivations must be correct and verifiable, but methods are heterogeneous, so we will **not** build
a symbolic math engine. Approach for v1:

- A shared **compute helper** (TypeScript) implements the *standard* formulas — **Wolpaw bitrate**
  and **confusion-matrix mutual information** — taking stored `inputs` and emitting both the numeric
  result and an ordered list of derivation **steps**. This guarantees the math matches the inputs
  and the numbers can't drift from the prose.
- An **escape hatch**: for non-standard methods (speech entropy, Fitts'), a curator may author
  bespoke derivation `steps` directly, with the final number checked at curation time.

A derivation **step** is structured data (`{ title, math, note?, table? }`) so it renders through a
single component in the chosen theme — see the validated mockups.

---

## 7. Tech

- **Astro** + content collections with **Zod** schema validation for entries.
- Entries as Markdown/JSON (front-matter for structured fields, body for `notes`).
- Build-time computation for standard ITRs (§6).
- Math rendered as styled monospace HTML (KaTeX optional later for nicer typesetting).
- Static output; free hosting.

---

## 8. Open items (resolve during implementation)

- Final choice of math rendering (plain monospace vs KaTeX). **Resolved: monospace for v1.**
- Exact filter taxonomy for sensing modalities as the entry set grows.
- Whether the provenance pill stays on cards long-term (kept for v1).
