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
    sourceNote: "Patient JR (Johnny Ray, locked-in) drove a 2D cursor over a virtual keyboard and selected characters via imagined hand movements, producing ~3 correct characters/min (Brumberg, Nieto-Castanon, Kennedy & Guenther 2010; see references). This is the documented real-world typing rate."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); the same ~1 bit/char standard used for QWERTY, eye-typing, Synchron and the ReFIT typing entry."
  - symbol: "N"
    value: "28"
    sourceNote: "≈ alphabet size of the virtual keyboard JR pointed at, for the raw-key Wolpaw ceiling (uniform prior). Approximate; the source documents the rate, not an exact key count."
  - symbol: "T_key"
    value: "20"
    unit: "s/key"
    sourceNote: "Key-selection interval for the Wolpaw ceiling: 60 / 3 char/min = 20 s. No per-selection accuracy is reported, so the bound is taken at perfect copy (P=1) as a strict ceiling."
  - symbol: "signals"
    value: "3"
    sourceNote: "Three neural signals mapped to cursor x, cursor y, and a binary select (Kennedy & Bakay 1998; Kennedy et al. 2000)."
actionSpace:
  kind: continuous
  size: continuous
  prior: context-conditioned
  notes: "The first chronic intracortical communication BCI (patient Johnny Ray, locked-in). A low-DOF continuous cursor plus a select signal, used to point at characters on a virtual keyboard, i.e. pointing-to-type, like the ReFIT typing and Synchron entries. The realized output is English text, so the reference uses the character-entropy method (~1 bit/char) on the documented 3 char/min rate rather than a raw cursor bitrate. Independent reviews quote ~0.03-0.05 bits/s for this system, which agrees with the 0.05 bits/s derived here."
references:
  - label: "Brumberg, Nieto-Castanon, Kennedy & Guenther 2010 (Speech Communication): reports JR produced ~3 characters/min over a virtual keyboard"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2829990/"
  - label: "Kennedy et al. 2000 (IEEE Trans. Rehabil. Eng.): fuller 3-signal cursor-and-select control report"
    url: "https://doi.org/10.1109/86.847815"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.05
    steps:
      - title: "Characters per minute"
        math: "≈ 3 correct char/min (patient JR: 2D cursor over a virtual keyboard, imagined hand movements)"
        note: "The documented real-world typing rate for this first chronic intracortical communication BCI. The cursor supplies the pointing; characters are the realized output."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "3 char/min × 1.0 bit/char ÷ 60 s/min = 0.05 bits/s"
  - id: wolpaw-raw
    method: "Wolpaw bitrate over the raw key set"
    scoreType: wolpaw
    kind: "Uniform-prior, perfect-copy ceiling on the key channel"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 28
      accuracy: 1
      secondsPerSelection: 20
referenceCalculationId: comm
---
