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
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerMin: 125
    steps:
      - title: "Characters per minute"
        math: "25 wpm × 5 chars/word = 125 chars/min"
        note: "The skilled-operator copy error rate is not reported in the ARRL/record source; the 25 wpm sustained rate assumes accurate copy."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 125 × 1.0 = 125 bits/min   (world-record 75.2 wpm → ~376 bits/min)"
referenceCalculationId: entropy
---
