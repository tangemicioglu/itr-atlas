---
name: TongueBoard Intraoral Silent Speech (Li et al., 2019)
year: 2019
modalityTags: ["Electropalatography", "Silent speech"]
sensingModality: Electropalatography
invasiveness: non-invasive
source:
  authors: "Li, Wu & Starner"
  venue: "Augmented Human (AH) 2019"
  year: 2019
  doi: "10.1145/3311823.3311831"
  url: "https://doi.org/10.1145/3311823.3311831"
inputs:
  - symbol: "N"
    value: "17"
    sourceNote: "Choices in the user study: 15 non-vocalized words plus 2 tongue gestures, operating a calculator application."
  - symbol: "P"
    value: "0.971"
    sourceNote: "Recognition accuracy, held across stationary (desktop) and mobile (walking) contexts."
  - symbol: "rate"
    value: "2.18"
    unit: "bits/s"
    sourceNote: "Authors' reported information transfer rate (≈2.18 bits/s), held across stationary and mobile contexts: a real measured online rate. Equivalent to 3.78 bits/decision at ~0.58 decisions/s (≈1.73 s/decision)."
references:
  - label: "Open-access PDF"
    url: "https://andymatuschak.org/files/papers/Li%20et%20al.%20-%202019%20-%20TongueBoard%20An%20Oral%20Interface%20for%20Subtle%20Input.pdf"
actionSpace:
  kind: fixed-set
  size: 17
  prior: uniform
  notes: "An intraoral retainer with capacitive touch sensors on the palate tracks absolute tongue position to recognize non-vocalized (silently mouthed) input. The user study operated a calculator with 15 non-vocalized words plus 2 tongue gestures (17 choices) at 97.1% accuracy, both stationary and while walking. Because the output is a closed command-and-control set rather than free English text, the realized measure is the selection bitrate: log2(N) over the real action set, discounted by accuracy (Wolpaw). This is exactly the non-language carve-out the methodology applies to command interfaces, and what the authors themselves report. Same lab lineage as the SilentSpeller electropalatography speller; folded under the silent-speech color and tagged Electropalatography for the capacitive-palate sensing. Unlike the offline EMG recognizers, this rate is measured online."
calculations:
  - id: reported
    method: "Wolpaw bitrate over the 17-choice calculator set (authors' reported ITR)"
    scoreType: wolpaw
    kind: "Command-and-control selection: non-language output, so log2(N) over the real action set is the realized measure"
    provenance: author-reported-verified
    compute:
      method: wolpaw
      targets: 17
      accuracy: 0.971
      secondsPerSelection: 1.73
  - id: achieved
    method: "Nuyujukian achieved bitrate over the 17-choice calculator set"
    scoreType: nuyujukian
    kind: "Achieved-bitrate view of the command set, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 2.18
    steps:
      - title: "Achieved-bitrate credit per net-correct selection"
        math: "N = 17 → log2(N − 1) = log2(16) = 4.0 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; Nuyujukian 2015, which introduced the metric, used log2(N))."
      - title: "Net-correct selection rate"
        math: "net-correct = 2P − 1 = 2(0.971) − 1 = 0.942 of selections. At 1.73 s/decision → 0.942 / 1.73 = 0.545 correct/s."
        note: "A misrecognition commits the wrong command rather than timing out, so incorrect = 1 − P. Same N (17), recognition accuracy (97.1%) and decision interval (1.73 s) as the entry's Wolpaw calc, which is the ranked figure here because the output is a closed command set rather than English text. At this high accuracy the achieved view coincides with that Wolpaw ITR (~2.18 bits/s)."
      - title: "Achieved bitrate"
        math: "4.0 bits × 0.545 correct/s = 2.18 bits/s."
referenceCalculationId: reported
---
