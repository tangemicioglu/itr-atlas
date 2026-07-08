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
  - symbol: "N"
    value: "30"
    sourceNote: "Output alphabet size for the raw-character Wolpaw ceiling (uniform prior). Characters are tap chords, but the produced set is the same ~30-symbol alphabet."
  - symbol: "T_char"
    value: "0.5428"
    unit: "s/char"
    sourceNote: "Gross character interval for the Wolpaw ceiling: 60 / (22.11 wpm × 5) = 0.5428 s."
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
        math: "100.6 char/min × 1.0 bit/char ÷ 60 s/min = 1.68 bits/s"
  - id: wolpaw-raw
    method: "Wolpaw bitrate over the raw character set"
    scoreType: wolpaw
    kind: "Uniform-prior ceiling on the character channel, before English redundancy"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 30
      accuracy: 0.9102
      secondsPerSelection: 0.5428
  - id: achieved
    method: "Nuyujukian achieved bitrate over the raw character set"
    scoreType: nuyujukian
    kind: "Achieved-bitrate view of the character channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 7.34
    steps:
      - title: "Achieved-bitrate credit per net-correct character"
        math: "N = 30 → log2(N − 1) = log2(29) = 4.86 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; Nuyujukian 2015, which introduced the metric, used log2(N))."
      - title: "Net-correct character rate"
        math: "net-correct = 2P − 1 = 2(0.9102) − 1 = 0.820 of characters. At 0.5428 s/char → 0.820 / 0.5428 = 1.51 correct/s."
        note: "A chord error commits the wrong character rather than timing out, so incorrect = 1 − P. Same N (30), measured letter accuracy (91.02%) and character interval (0.5428 s) as the entry's raw-character Wolpaw ceiling; netting each wrong chord against a correct one (2P − 1) lands just under the ~7.4 bits/s Wolpaw figure. Both are the uniform-prior character channel, above the 1.68 bits/s Shannon headline."
      - title: "Achieved bitrate"
        math: "4.86 bits × 1.51 correct/s = 7.34 bits/s."
referenceCalculationId: entropy
---
