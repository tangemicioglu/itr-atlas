---
name: Tap Strap Wearable Keyboard (Tap Systems, 2018)
year: 2018
modalityTags: ["Touch", "Chord keyboard"]
sensingModality: Touch
invasiveness: non-invasive
source:
  authors: "Tu, Jeyachandra, Nagesh, Prabhu & Starner"
  venue: "ISWC '21 Adjunct"
  year: 2021
  doi: "10.1145/3460421.3480428"
  url: "https://doi.org/10.1145/3460421.3480428"
inputs:
  - symbol: "rate"
    value: "22.11"
    unit: "wpm"
    sourceNote: "Average final typing rate measured by Tu et al. 2021 in a controlled Tap Strap text-entry study using standard MacKenzie-Soukoreff phrases."
  - symbol: "P"
    value: "0.9102"
    sourceNote: "Final letter accuracy reported by Tu et al. 2021: 91.02%."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon)."
actionSpace:
  kind: fixed-set
  size: 30
  prior: context-conditioned
  notes: "A finger-worn band that detects taps of each finger against any surface; characters are tap combinations (chords), like a Twiddler without a physical keypad. Same ~30-symbol English alphabet, counted at Shannon entropy. The reference now uses the measured Tu et al. text-entry rate rather than Tap's vendor training claim."
references:
  - label: "System date: Tap press kit listing shipping since February 2018"
    url: "https://www.tapwithus.com/press-kit/"
  - label: "Mrazek et al. 2021/2022: independent Tap Strap 2 usability and accuracy evaluation (not the speed source)"
    url: "https://www.researchgate.net/publication/356096675_The_Tap_Strap_2_Evaluating_Performance_of_One-Handed_Wearable_Keyboard_and_Mouse"
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    scoreType: shannon
    kind: "Net of English redundancy and measured letter accuracy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 1.68
    steps:
      - title: "Characters per minute"
        math: "22.11 wpm × 5 chars/word = 110.55 char/min"
        note: "Tu et al. report the final average Tap Strap typing rate after practice."
      - title: "Discount by measured letter accuracy"
        math: "110.55 × 0.9102 ≈ 100.6 correct char/min"
        note: "Tu et al. report final letter accuracy of 91.02%; applying it separately gives a stricter realized-output estimate."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 1.68 bits/s"
referenceCalculationId: entropy
---
