---
name: EMG Continuous Speech (Jou et al., 2006)
hidden: true
year: 2006
modalityTags: ["sEMG", "Silent speech"]
sensingModality: sEMG
invasiveness: non-invasive
source:
  authors: "Jou, Schultz, Walliczek, Kraft & Waibel"
  venue: "Interspeech 2006"
  year: 2006
  url: "https://www.csl.uni-bremen.de/cms/images/documents/publications/JouSchultz_Interspeech2006.pdf"
inputs:
  - symbol: "N"
    value: "100"
    sourceNote: "100-word vocabulary recognition task (Results)"
  - symbol: "P"
    value: "0.701"
    sourceNote: "1 − 29.9% word error rate, the system's best result (improved from 86.8% baseline)"
  - symbol: "rate"
    value: "100"
    unit: "word/min"
    sourceNote: "ASSUMED. Offline recognizer with no real-time rate reported; ~100 wpm is taken as a typical silent-articulation rate (see AlterEgo, which reports >100 wpm) so a bits/s figure can be stated. Treat the rate, not the per-word bits, as the soft number here."
actionSpace:
  kind: fixed-set
  size: 100
  prior: context-conditioned
  notes: "Surface-EMG of the face/neck decoded to words via an HMM acoustic-style model with a language model over a 100-word task. Continuous speech with an LM means successive words are not independent, so the prior is context-conditioned."
calculations:
  - id: comm
    method: "Word-entropy throughput"
    scoreType: shannon
    kind: "Assumed-rate estimate, not ranked"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 5.84
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.701 × 100 = 70.1 net word/min"
        note: "Rate is the ASSUMED ~100 wpm articulation rate, not a measured one. It is the soft input here."
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
      - title: "Information transfer rate"
        math: "70.1 word/min × 5.0 bits/word ÷ 60 s/min = 5.84 bits/s"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 100 words"
    scoreType: wolpaw
    kind: "Uniform-prior comparison metric (assumed rate)"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 100
      accuracy: 0.701
      secondsPerSelection: 0.6
  - id: achieved
    method: "Nuyujukian achieved bitrate over N = 100 words"
    scoreType: nuyujukian
    kind: "Achieved-bitrate view of the closed-vocabulary channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 4.44
    steps:
      - title: "Achieved-bitrate credit per net-correct word"
        math: "N = 100 → log2(N − 1) = log2(99) = 6.63 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; Nuyujukian 2015, which introduced the metric, used log2(N))."
      - title: "Net-correct word rate"
        math: "net-correct = 2P − 1 = 2(0.701) − 1 = 0.402 of words. At the assumed 100 word/min (0.6 s/word) → 0.402 × 100 / 60 = 0.67 correct/s."
        note: "A word error commits the wrong word rather than timing out, so incorrect = 1 − P. Same N (100), word accuracy (70.1%) and assumed 100 wpm rate as the entry's Wolpaw calc. At this low accuracy the 2P − 1 netting drops achieved (4.44) below the ranked Shannon figure (5.84) — an error-netting artifact. Rests on the assumed rate; notUsedForRanking."
      - title: "Achieved bitrate"
        math: "6.63 bits × 0.67 correct/s = 4.44 bits/s."
referenceCalculationId: comm
---
