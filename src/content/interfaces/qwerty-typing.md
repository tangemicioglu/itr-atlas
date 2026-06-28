---
name: QWERTY Typing (Sholes & Glidden, 1874)
year: 1874
modalityTags: ["Manual", "Keyboard"]
sensingModality: Manual
invasiveness: non-invasive
source:
  authors: "Dhakal, Feit, Kristensson & Oulasvirta"
  venue: "ACM CHI 2018"
  year: 2018
  doi: "10.1145/3173574.3174220"
  url: "https://doi.org/10.1145/3173574.3174220"
inputs:
  - symbol: "rate"
    value: "51.56"
    unit: "wpm"
    sourceNote: "Average across 168,000 participants (136M keystrokes); fastest users ~120 wpm. The system date comes from the Remington/Sholes & Glidden QWERTY typewriter; the throughput is measured in the 2018 web typing study."
  - symbol: "P"
    value: "0.9884"
    sourceNote: "1 − 1.16% average error rate (2.3 corrections per sentence)"
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon estimate)."
actionSpace:
  kind: fixed-set
  size: 30
  prior: context-conditioned
  notes: "~30 keys, but the ITR uses English character entropy (~1 bit/char), a context-conditioned source, rather than the ~5 bits a uniform keystroke would carry. This bakes in the language's redundancy, so it is not directly comparable to the uniform-prior speller figures."
references:
  - label: "System date: Smithsonian NMAH on the Remington/Sholes & Glidden QWERTY typewriter"
    url: "https://americanhistory.si.edu/collections/object/nmah_850542"
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    kind: "Net of English redundancy and typing errors"
    provenance: recomputed-omitted
    resultBitsPerSecond: 4.25
    steps:
      - title: "Net words per minute"
        math: "51.56 wpm × (1 − 0.0116) = 50.96 net wpm"
      - title: "Characters per minute"
        math: "50.96 × 5 chars/word = 254.8 chars/min"
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
        note: "English is highly redundant, so raw keystroke count would overstate information."
      - title: "Information transfer rate"
        math: "ITR = 4.25 bits/s"
referenceCalculationId: entropy
---
