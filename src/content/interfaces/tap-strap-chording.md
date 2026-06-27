---
name: Tap Strap Wearable Keyboard (Tap Systems, 2018)
year: 2018
modalityTags: ["Touch", "Chord keyboard"]
sensingModality: Touch
invasiveness: non-invasive
source:
  authors: "Tap Systems Inc. (vendor figures)"
  venue: "Vendor documentation"
  year: 2019
  url: "https://www.tapwithus.com/quick-start-guide/tap-strap/"
inputs:
  - symbol: "rate"
    value: "30"
    unit: "wpm"
    sourceNote: "Vendor claim: ~30 wpm after ~5 hours of practice, ~35 wpm after 20 days of training, with a theoretical ceiling of 120 wpm. No controlled, peer-reviewed speed study — treat as a vendor/anecdote estimate. The system date comes from Tap's own press kit, which lists shipping since February 2018."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon)."
actionSpace:
  kind: fixed-set
  size: 30
  prior: context-conditioned
  notes: "A finger-worn band that detects taps of each finger against any surface; characters are tap combinations (chords), like a Twiddler without a physical keypad. Same ~30-symbol English alphabet, counted at Shannon entropy. The rate itself is the weak link here, not the action space."
references:
  - label: "System date: Tap press kit listing shipping since February 2018"
    url: "https://www.tapwithus.com/press-kit/"
  - label: "Mrazek et al. 2021/2022 — independent Tap Strap 2 usability and accuracy evaluation (not the speed source)"
    url: "https://www.researchgate.net/publication/356096675_The_Tap_Strap_2_Evaluating_Performance_of_One-Handed_Wearable_Keyboard_and_Mouse"
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    kind: "Net of English redundancy (vendor-reported rate)"
    provenance: author-reported-unverified
    resultBitsPerMin: 150
    flawReason: "Rate is a vendor/anecdote figure (no controlled study), so the ITR is indicative only."
    steps:
      - title: "Characters per minute"
        math: "30 wpm × 5 chars/word = 150 chars/min"
        note: "No independent error-rate figure is published for this vendor device, and the ~30 wpm is itself a vendor/anecdote rate, so error here is unquantified — another reason this entry is flagged as indicative."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 150 × 1.0 ≈ 150 bits/min"
referenceCalculationId: entropy
---
