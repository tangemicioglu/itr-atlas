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
  - symbol: "N"
    value: "30"
    sourceNote: "Distinguishable keys on the on-screen QWERTY, used only for the raw-key Wolpaw ceiling (uniform prior). The headline Shannon figure uses English entropy instead, since touch keystrokes with autocorrect are far from uniform."
  - symbol: "T_key"
    value: "0.3315"
    unit: "s/keystroke"
    sourceNote: "Gross keystroke interval for the Wolpaw ceiling: 60 / (36.2 wpm × 5) = 0.3315 s. Gross because Wolpaw's accuracy term P handles errors separately."
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
    scoreType: shannon
    kind: "Net of English redundancy and typing errors"
    provenance: recomputed-omitted
    resultBitsPerSecond: 2.95
    steps:
      - title: "Net words per minute"
        math: "36.2 wpm × (1 − 0.0234) = 35.3 net wpm"
      - title: "Characters per minute"
        math: "35.3 × 5 chars/word = 176.7 chars/min"
      - title: "Information transfer rate"
        math: "176.7 char/min × 1.0 bit/char ÷ 60 s/min = 2.95 bits/s"
  - id: wolpaw-raw
    method: "Wolpaw bitrate over the raw key set"
    scoreType: wolpaw
    kind: "Uniform-prior ceiling on the touch-key channel, before English redundancy"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 30
      accuracy: 0.9766
      secondsPerSelection: 0.3315
  - id: achieved
    method: "Achieved bitrate over the raw key set"
    scoreType: achieved
    kind: "Achieved-bitrate view of the touch-key channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 14
    steps:
      - title: "Achieved-bitrate credit per net-correct key"
        math: "N = 30 keys → log2(N − 1) = log2(29) = 4.86 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; Nuyujukian 2015, which introduced the metric, used log2(N))."
      - title: "Net-correct key rate"
        math: "net-correct = 2P − 1 = 2(0.9766) − 1 = 0.953 of keys. At 0.3315 s/key → 0.953 / 0.3315 = 2.87 correct/s."
        note: "A touch error commits the wrong character rather than timing out, so incorrect = 1 − P. Same N (30 keys), uncorrected accuracy (97.66%) and keystroke interval (0.3315 s) as the entry's raw-key Wolpaw ceiling, and lands on the same ~14 bits/s. Both are the uniform-prior key channel before English redundancy, above the 2.95 bits/s Shannon headline."
      - title: "Achieved bitrate"
        math: "4.86 bits × 2.87 correct/s = 14.0 bits/s."
referenceCalculationId: entropy
---
