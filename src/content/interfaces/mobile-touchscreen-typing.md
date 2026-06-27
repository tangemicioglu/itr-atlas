---
name: Mobile Touchscreen Typing (Apple, 2007)
year: 2007
modalityTags: ["Touch", "Keyboard"]
sensingModality: Touch
invasiveness: non-invasive
source:
  authors: "Palin, Feit, Kim, Kristensson & Oulasvirta"
  venue: "ACM MobileHCI 2019"
  year: 2019
  doi: "10.1145/3338286.3340120"
  url: "https://doi.org/10.1145/3338286.3340120"
inputs:
  - symbol: "rate"
    value: "36.2"
    unit: "wpm"
    sourceNote: "Average typing speed across 37,370 volunteers (27M keystrokes). The system date is the 2007 iPhone full-QWERTY touch keyboard; the throughput is measured in the 2019 mobile typing study."
  - symbol: "P"
    value: "0.9766"
    sourceNote: "1 − 2.34% average error rate (uncorrected error rate reported in the study)"
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon)."
actionSpace:
  kind: fixed-set
  size: 30
  prior: context-conditioned
  notes: "On-screen QWERTY with autocorrect and word prediction in the loop; the study found autocorrect raises entry rates. The language model makes the prior context-conditioned, so this is not a uniform key-selection figure."
references:
  - label: "System date: Apple 2007 iPhone announcement with full-QWERTY touchscreen keyboard"
    url: "https://www.apple.com/newsroom/2007/01/09Apple-Reinvents-the-Phone-with-iPhone/"
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    kind: "Net of English redundancy and typing errors"
    provenance: recomputed-omitted
    resultBitsPerMin: 177
    steps:
      - title: "Net words per minute"
        math: "36.2 wpm × (1 − 0.0234) = 35.3 net wpm"
      - title: "Characters per minute"
        math: "35.3 × 5 chars/word = 176.7 chars/min"
      - title: "Information transfer rate"
        math: "ITR = 176.7 × 1.0 ≈ 177 bits/min"
referenceCalculationId: entropy
---
