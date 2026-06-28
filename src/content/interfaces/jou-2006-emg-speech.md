---
name: EMG Continuous Speech (Jou et al., 2006)
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
    sourceNote: "ASSUMED. Offline recognizer with no real-time rate reported; ~100 wpm is taken as a typical silent-articulation rate (see AlterEgo, which reports >100 wpm) so a bits/min can be stated. Treat the rate, not the per-word bits, as the soft number here."
actionSpace:
  kind: fixed-set
  size: 100
  prior: context-conditioned
  notes: "Surface-EMG of the face/neck decoded to words via an HMM acoustic-style model with a language model over a 100-word task. Continuous speech with an LM means successive words are not independent, so the prior is context-conditioned."
calculations:
  - id: comm
    method: "Word-entropy throughput"
    kind: "Assumed-rate estimate, not ranked"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerMin: 351
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.701 × 100 = 70.1 net word/min"
        note: "Rate is the ASSUMED ~100 wpm articulation rate, not a measured one. It is the soft input here."
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
      - title: "Information transfer rate"
        math: "ITR = 70.1 × 5.0 ≈ 351 bits/min"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 100 words"
    kind: "Uniform-prior comparison metric (assumed rate)"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 100
      accuracy: 0.701
      secondsPerSelection: 0.6
referenceCalculationId: comm
---
