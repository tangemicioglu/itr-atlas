---
name: Twiddler Chording Keyboard (HandyKey, 1991)
year: 1991
modalityTags: ["Manual", "Chord keyboard"]
sensingModality: Manual
invasiveness: non-invasive
source:
  authors: "Lyons, Plaisted & Starner"
  venue: "IEEE ISWC 2004"
  year: 2004
  doi: "10.1109/ISWC.2004.19"
  url: "https://faculty.cc.gatech.edu/~thad/p/030_10_MTE/twiddler-iswc.pdf"
inputs:
  - symbol: "rate"
    value: "47"
    unit: "wpm"
    sourceNote: "Expert average across 5 subjects after ~25 hours of practice; one subject reached 67 wpm, matching a 10-year Twiddler user. A separate longitudinal study had 10 novices average >26 wpm after 400 minutes. The system date follows a HandyKey Corporation Twiddler brochure copyrighted January 1991, listed in Google Patents' non-patent citations; the throughput is measured in the 2004 ISWC study."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon)."
  - symbol: "N"
    value: "30"
    sourceNote: "Output alphabet size for the raw-character Wolpaw ceiling (uniform prior). The chord layout changes production speed, not the size of the character set produced."
  - symbol: "T_char"
    value: "0.2553"
    unit: "s/char"
    sourceNote: "Gross character interval for the Wolpaw ceiling: 60 / (47 wpm × 5) = 0.2553 s."
actionSpace:
  kind: fixed-set
  size: 30
  prior: context-conditioned
  notes: "A one-handed keyboard where each character is a finger chord (button combination) rather than a key. The alphabet is the same ~30-symbol set as a keyboard, so the reference counts the English character stream at Shannon entropy, consistent with the other typing entries; the chording layout changes how fast the symbols can be produced, not how much information each carries."
references:
  - label: "System date: HandyKey Corporation Twiddler brochure, copyright January 1991"
    url: "https://patents.google.com/patent/USD359479"
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 3.92
    steps:
      - title: "Characters per minute"
        math: "47 wpm × 5 chars/word = 235 chars/min"
        note: "Uncorrected word-level error was ~0.3% for experts (chording errors fell below 5% after the second session). Users mostly left errors in, so the 47 wpm already reflects them; documented, not re-applied."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 3.92 bits/s"
  - id: wolpaw-raw
    method: "Wolpaw bitrate over the raw character set"
    scoreType: wolpaw
    kind: "Uniform-prior, perfect-copy ceiling on the character channel"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 30
      accuracy: 1
      secondsPerSelection: 0.2553
referenceCalculationId: entropy
---
