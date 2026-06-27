---
name: MELDER Real-Time Lip-Reading (Pandey & Arif, 2024)
year: 2024
modalityTags: ["Video", "Silent speech"]
sensingModality: Video
invasiveness: non-invasive
source:
  authors: "Pandey & Arif"
  venue: "ACM CHI 2024"
  year: 2024
  doi: "10.1145/3613904.3642348"
  url: "https://doi.org/10.1145/3613904.3642348"
inputs:
  - symbol: "rate"
    value: "5.59"
    unit: "word/min"
    sourceNote: "Measured end-to-end entry speed, MELDER in the 20-participant stationary study (best of three real-time lip-reading models). The paper defines wpm = recognized words / (speaking time + computation time) × 60/5, so it already folds in the user's silent articulation and recognizer latency — a genuine measured rate, not an assumption. Mobile/walking: 5.31 wpm; a separate head-to-head put MELDER at 5.62 wpm vs Google Assistant voice ASR at 30.54 wpm."
  - symbol: "P"
    value: "0.802"
    sourceNote: "1 − 19.75% word error rate, MELDER in the stationary user study (≈19.86% in the Google Assistant comparison)."
  - symbol: "H"
    value: "5.0"
    unit: "bits/word"
    sourceNote: "Shannon per-word entropy of English; the same per-word standard applied to the other silent-speech entries."
actionSpace:
  kind: context-dependent
  size: continuous
  prior: context-conditioned
  notes: "A camera-based silent speech interface: a phone's front camera reads lip movements and a streamlined real-time lip-reading model transcribes silently mouthed phrases to text with continuous on-screen feedback. It is folded under the silent-speech color because it decodes articulation into language, but the sensing is optical (video), not muscle — hence the Video tag. The measured operating point is 5.59 wpm at ~20% WER, against ~30 wpm for voice ASR in the authors' own head-to-head. Because this is a measured end-to-end rate, it is not directly comparable to assumed-rate EMG silent-speech estimates."
calculations:
  - id: comm
    method: "Word-entropy throughput (measured end-to-end rate)"
    kind: "Net of English redundancy, at the measured lip-reading rate"
    provenance: recomputed-omitted
    resultBitsPerMin: 22
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.802 × 5.59 ≈ 4.5 net word/min"
        note: "5.59 wpm is a real measured entry speed (speaking + computation time); the 19.75% WER is from the same 20-participant stationary study."
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
      - title: "Information transfer rate"
        math: "ITR = 4.5 × 5.0 ≈ 22 bits/min"
referenceCalculationId: comm
---
