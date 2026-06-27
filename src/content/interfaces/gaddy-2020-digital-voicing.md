---
name: Digital Voicing of Silent Speech (Gaddy & Klein, 2020)
year: 2020
modalityTags: ["sEMG", "Silent speech"]
sensingModality: sEMG
invasiveness: non-invasive
source:
  authors: "Gaddy & Klein"
  venue: "EMNLP 2020"
  year: 2020
  doi: "10.18653/v1/2020.emnlp-main.445"
  url: "https://aclanthology.org/2020.emnlp-main.445/"
inputs:
  - symbol: "N"
    value: "67"
    sourceNote: "Closed-vocabulary condition: 67-word vocabulary (Table 4)"
  - symbol: "P"
    value: "0.964"
    sourceNote: "1 − 3.6% transcription WER on silent EMG, closed-vocabulary condition (Table 4)"
  - symbol: "rate"
    value: "100"
    unit: "word/min"
    sourceNote: "ASSUMED ~100 wpm articulation rate (synthesis from silently mouthed speech; explicit rate not reported)."
actionSpace:
  kind: fixed-set
  size: 67
  prior: context-conditioned
  notes: "EMG-to-speech SYNTHESIS, scored by transcribing the generated audio. The reference uses the closed-vocabulary condition (67 words, 3.6% WER). The realistic open-vocabulary condition (9,828-word vocabulary) reaches only 68% WER — far harder — which is why open-vocabulary silent speech is nowhere near these bits. ITR is poorly defined for open-vocabulary synthesis; the closed figure is the defensible one."
calculations:
  - id: comm
    method: "Word-entropy throughput"
    kind: "Ceiling only — rate is assumed, not measured (closed vocabulary)"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerMin: 482
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.964 × 100 = 96.4 net word/min"
        note: "Rate is the ASSUMED ~100 wpm articulation rate; accuracy is the closed-vocabulary (67-word) condition."
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
      - title: "Information transfer rate"
        math: "ITR = 96.4 × 5.0 ≈ 482 bits/min"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 67 words (closed-vocabulary condition)"
    kind: "Per-word throughput, uniform-prior ceiling (assumed rate)"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 67
      accuracy: 0.964
      secondsPerSelection: 0.6
referenceCalculationId: comm
---
