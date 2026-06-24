---
name: ITR Gallery — Lab Paper
version: alpha
description: >-
  Warm "lab paper" visual system for the ITR Interface Gallery. Monochrome
  accent so color carries meaning (modality, invasiveness, provenance) rather
  than brand; ITR numbers stay ink-black; no gradients.
colors:
  bg: "#F6F3EC"
  card: "#FFFFFF"
  ink: "#1A1A17"
  muted: "#6B675E"
  hairline: "#E3DDD0"
  accent: "#2B2B28"
  invasive: "#8A2E2E"
  photo: "#ECE7DB"
  link: "#24407A"
  tagBg: "#ECE7DB"
  tagInk: "#5C574B"
  invasiveBg: "#F2E0DC"
  provAuthBg: "#E6EDE4"
  provAuthInk: "#3D6B35"
  provRecompBg: "#F3ECD8"
  provRecompInk: "#9A7A20"
typography:
  sans:
    fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif'
  mono:
    fontFamily: 'ui-monospace, "Cascadia Code", Consolas, monospace'
  display:
    fontFamily: "{typography.sans.fontFamily}"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: "1.2"
    letterSpacing: "-0.4px"
  heading:
    fontFamily: "{typography.sans.fontFamily}"
    fontSize: "18px"
    fontWeight: 700
  body:
    fontFamily: "{typography.sans.fontFamily}"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "1.5"
  label:
    fontFamily: "{typography.sans.fontFamily}"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.6px"
  itr:
    fontFamily: "{typography.sans.fontFamily}"
    fontSize: "26px"
    fontWeight: 800
  math:
    fontFamily: "{typography.mono.fontFamily}"
    fontSize: "13px"
    lineHeight: "1.8"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  pill: "20px"
spacing:
  xs: "5px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
components:
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.lg}"
    padding: "13px 15px 15px"
  tag:
    backgroundColor: "{colors.tagBg}"
    textColor: "{colors.tagInk}"
    rounded: "{rounded.md}"
    padding: "5px 11px"
    typography: "{typography.label}"
  tagInvasive:
    backgroundColor: "{colors.invasiveBg}"
    textColor: "{colors.invasive}"
    rounded: "{rounded.md}"
    padding: "5px 11px"
    typography: "{typography.label}"
  provenanceAuthor:
    backgroundColor: "{colors.provAuthBg}"
    textColor: "{colors.provAuthInk}"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
  provenanceRecomputed:
    backgroundColor: "{colors.provRecompBg}"
    textColor: "{colors.provRecompInk}"
    rounded: "{rounded.sm}"
    padding: "3px 8px"
  calculationBlock:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.lg}"
    padding: "16px 18px 8px"
  referenceCalculationBlock:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    borderColor: "{colors.accent}"
    rounded: "{rounded.lg}"
    padding: "16px 18px 8px"
  filterChipActive:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  filterChip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.tagInk}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
---

# ITR Gallery — Lab Paper

The visual system for the [ITR Interface Gallery](./SPEC.md). It should read like a credible,
print-like scientific reference: warm paper, ink text, math you can trust. Color is reserved for
*meaning* — modality, invasiveness, and provenance — never decoration.

## Overview

A curated comparison gallery of information transfer rates across human–machine interfaces. The
aesthetic is "lab paper": a warm off-white page, ink-black text, hairline rules, and a single
graphite accent. The personality is restrained and editorial — the data and the worked derivations
are the visual interest, so the chrome stays quiet. No gradients, no brand hue, no drop shadows
except a faint lift on interactive cards.

## Colors

- **`bg` `#F6F3EC`** — warm paper page background.
- **`card` `#FFFFFF`** — card and panel surfaces, lifted just off the page.
- **`ink` `#1A1A17`** — primary text and, importantly, every ITR number. Numbers never take an
  accent color; their weight carries them.
- **`muted` `#6B675E`** — secondary text, labels, captions.
- **`hairline` `#E3DDD0`** — borders and dividers; the structure is drawn with thin rules, not fills.
- **`accent` `#2B2B28`** (graphite) — active controls (selected filter chip), the reference-method
  badge, and the border of the reference calculation block. Near-black so it reads as emphasis, not color.
- **`invasive` `#8A2E2E`** (muted red) — reserved exclusively for the invasiveness tag.
- **Provenance pair** — `provAuth*` (green) for author-reported figures, `provRecomp*` (amber) for
  recomputed ones. This is the one place green/amber semantics appear.
- **`link` `#24407A`** — hyperlinks (DOIs, citations).
- **`photo` `#ECE7DB`** — placeholder fill behind device images that are missing.

## Typography

- **Sans** (`"Segoe UI", system-ui, …`) for all UI and prose.
- **Mono** (`ui-monospace, …`) for formulas, substitutions, and derivation math — the monospace
  signals "this is computed, check it."
- **`display`** — page titles, 26px/800, slightly tightened tracking.
- **`heading`** — section headings, 18px/700.
- **`itr`** — the headline ITR number, 26px/800, ink-black.
- **`label`** — uppercase 11px with letter-spacing for step titles and table headers.

## Layout

- Centered content column, max width ~1040px, 24px side gutters.
- Gallery grid: 3 columns desktop, 2 at ≤800px, 1 at ≤540px; 16px gap.
- Entry detail: a single readable column; the device photo (220×150) sits left of the title.
- Derivations render as a numbered vertical list with a hairline connector on the left.

## Shapes

- **`rounded.sm` 6px** — small chips (provenance pill).
- **`rounded.md` 8px** — tags, inputs, math blocks, inputs.
- **`rounded.lg` 12px** — cards and calculation blocks.
- **`rounded.pill` 20px** — filter chips.
- Borders are 1px `hairline`; the reference calculation block uses a 1px `accent` border to mark it.

## Components

- **`card`** — gallery stat card (style B): device photo strip, name, modality tags, large ink ITR,
  a right-aligned mini stat, and a provenance pill. Lifts 3px with a faint shadow on hover.
- **`tag` / `tagInvasive`** — modality and invasiveness pills. Invasiveness is the only red element.
- **`provenanceAuthor` / `provenanceRecomputed`** — the honesty signal; visible on cards and in the
  detail view.
- **`calculationBlock` / `referenceCalculationBlock`** — a worked derivation; the reference variant
  is bordered in graphite and carries the "Reference method" badge.
- **`filterChip` / `filterChipActive`** — gallery modality filters; the active chip is solid graphite.

## Do's and Don'ts

- **Do** keep ITR numbers ink-black — their size and weight are the emphasis.
- **Do** reserve color for meaning: red = invasiveness, green/amber = provenance, graphite = active.
- **Do** draw structure with hairlines and whitespace, not fills or shadows.
- **Don't** use gradients, brand colors, or decorative accent color anywhere.
- **Don't** color a calculation's result by how "good" it is — the number is neutral; provenance and
  assumptions carry the judgment.
- **Don't** add shadows beyond the subtle hover lift on cards.
