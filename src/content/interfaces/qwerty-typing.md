---
name: Skilled QWERTY Typing
modalityTags: ["Manual", "Keyboard"]
sensingModality: Manual
invasiveness: non-invasive
source:
  authors: "Dhakal et al."
  venue: "CHI"
  year: 2018
  doi: "10.1145/3173574.3174220"
  url: "https://doi.org/10.1145/3173574.3174220"
inputs:
  - symbol: "rate"
    value: "90"
    unit: "wpm"
    sourceNote: "Upper-range typing speed for skilled typists"
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "Entropy of English text (Shannon estimate)"
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerMin: 450
    steps:
      - title: "Characters per minute"
        math: "90 wpm * 5 chars/word = 450 chars/min"
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
        note: "English is highly redundant, so raw keystroke count overstates information."
      - title: "Information transfer rate"
        math: "ITR = 450 chars/min * 1.0 bit/char = 450 bits/min"
referenceCalculationId: entropy
---

A baseline from conventional typing. Counting raw keystrokes would inflate the figure; the
entropy of English text is the honest unit, so this uses an authored derivation rather than Wolpaw.
