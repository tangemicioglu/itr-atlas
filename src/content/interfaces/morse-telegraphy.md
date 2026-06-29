---
name: Morse Telegraphy (Morse, 1844)
year: 1844
modalityTags: ["Manual", "Telegraph"]
sensingModality: Manual
invasiveness: non-invasive
source:
  authors: "Historical records; world record by T. R. McElroy (1939), documented by ARRL"
  venue: "ARRL / amateur-radio historical record"
  year: 1939
  url: "http://www.arrl.org/Events/view/15729"
inputs:
  - symbol: "rate"
    value: "25"
    unit: "wpm"
    sourceNote: "Representative skilled professional copy speed; 30 wpm is not uncommon and experts exceed 40 wpm. The all-time world record is 75.2 wpm (McElroy, 1939). The system date is the first official Morse telegraph message in 1844; the speed benchmark is later operator performance."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); Morse encodes ordinary English letters."
  - symbol: "N"
    value: "36"
    sourceNote: "26 letters + 10 numerals, for the raw-symbol Wolpaw ceiling (uniform prior). The dot/dash code is itself frequency-optimized, so real symbols are not uniform; this is a loose upper bound."
  - symbol: "T_char"
    value: "0.48"
    unit: "s/char"
    sourceNote: "Gross character interval for the Wolpaw ceiling: 60 / (25 wpm × 5) = 0.48 s. Skilled-operator copy error is not reported, so accuracy is taken as perfect (P=1) — a strict upper bound."
actionSpace:
  kind: fixed-set
  size: 36
  prior: context-conditioned
  notes: "26 letters + 10 numerals (plus punctuation/prosigns), keyed serially as English text. The dot/dash code length is itself frequency-optimized for English, so the prior is context-conditioned, not uniform."
references:
  - label: "System date: Library of Congress record of Morse's first official telegraph message"
    url: "https://www.loc.gov/item/mcc.019/"
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 2.08
    steps:
      - title: "Characters per minute"
        math: "25 wpm × 5 chars/word = 125 chars/min"
        note: "The skilled-operator copy error rate is not reported in the ARRL/record source; the 25 wpm sustained rate assumes accurate copy."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 2.08 bits/s"
  - id: wolpaw-raw
    method: "Wolpaw bitrate over the raw symbol set"
    scoreType: wolpaw
    kind: "Uniform-prior, perfect-copy ceiling on the 36-symbol channel"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 36
      accuracy: 1
      secondsPerSelection: 0.48
referenceCalculationId: entropy
---
