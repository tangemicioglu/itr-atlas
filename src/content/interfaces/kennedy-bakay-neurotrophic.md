---
name: Neurotrophic Electrode (Kennedy & Bakay, 1998)
year: 1998
modalityTags: ["Intracortical", "Cursor"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Kennedy & Bakay"
  venue: "NeuroReport 9(8)"
  year: 1998
  doi: "10.1097/00001756-199806010-00007"
  url: "https://doi.org/10.1097/00001756-199806010-00007"
inputs:
  - symbol: "rate"
    value: "3"
    unit: "char/min"
    sourceNote: "Patient JR (Johnny Ray, locked-in) drove a 2D cursor over a virtual keyboard and selected characters via imagined hand movements, producing ~3 correct characters/min (Brumberg, Nieto-Castanon, Kennedy & Guenther 2010 — see references). This is the documented real-world typing rate."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); the same ~1 bit/char standard used for QWERTY, eye-typing, Synchron and the ReFIT typing entry."
  - symbol: "signals"
    value: "3"
    sourceNote: "Three neural signals mapped to cursor x, cursor y, and a binary select (Kennedy & Bakay 1998; Kennedy et al. 2000)."
actionSpace:
  kind: continuous
  size: continuous
  prior: context-conditioned
  notes: "The first chronic intracortical communication BCI (patient Johnny Ray, locked-in). A low-DOF continuous cursor plus a select signal, used to point at characters on a virtual keyboard — i.e. pointing-to-type, like the ReFIT typing and Synchron entries. The realized output is English text, so the reference uses the character-entropy method (~1 bit/char) on the documented 3 char/min rate rather than a raw cursor bitrate. Independent reviews quote ~2–3 bits/min for this system, which agrees with the 3 bits/min derived here."
references:
  - label: "Brumberg, Nieto-Castanon, Kennedy & Guenther 2010 (Speech Communication) — reports JR produced ~3 characters/min over a virtual keyboard"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2829990/"
  - label: "Kennedy et al. 2000 (IEEE Trans. Rehabil. Eng.) — fuller 3-signal cursor-and-select control report"
    url: "https://doi.org/10.1109/86.847815"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerMin: 3
    steps:
      - title: "Characters per minute"
        math: "≈ 3 correct char/min (patient JR: 2D cursor over a virtual keyboard, imagined hand movements)"
        note: "The documented real-world typing rate for this first chronic intracortical communication BCI. The cursor supplies the pointing; characters are the realized output."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 3 × 1.0 ≈ 3 bits/min   (independent reviews quote ~2–3 bits/min for this system — close agreement)"
referenceCalculationId: comm
---
