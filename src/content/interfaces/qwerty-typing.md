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
  - symbol: "N"
    value: "30"
    sourceNote: "Distinguishable keys, used only for the raw-key Wolpaw ceiling (uniform prior over the alphabet). The headline Shannon figure instead uses English entropy, since real keystrokes are not uniform."
  - symbol: "T_key"
    value: "0.2328"
    unit: "s/keystroke"
    sourceNote: "Gross keystroke interval for the Wolpaw ceiling: 60 / (51.56 wpm × 5) = 0.2328 s. Gross (not error-discounted) because Wolpaw's accuracy term P handles errors separately."
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
    scoreType: shannon
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
  - id: wolpaw-raw
    method: "Wolpaw bitrate over the raw key set"
    scoreType: wolpaw
    kind: "Uniform-prior ceiling on the physical key channel, before English redundancy"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 30
      accuracy: 0.9884
      secondsPerSelection: 0.2328
referenceCalculationId: entropy
---
