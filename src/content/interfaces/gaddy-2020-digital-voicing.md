---
name: Digital Voicing of Silent Speech (Gaddy & Klein, 2020)
hidden: true
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
  notes: "EMG-to-speech synthesis, scored by transcribing the generated audio. The reference uses the closed-vocabulary condition (67 words, 3.6% WER). The paper's open-vocabulary condition (9,828-word vocabulary) has much higher WER (68%), so the closed-vocabulary figure should not be read as open-vocabulary silent-speech throughput. ITR is not directly reported for the synthesis task; the closed-vocabulary calculation is the comparable atlas estimate."
calculations:
  - id: comm
    method: "Word-entropy throughput"
    scoreType: shannon
    kind: "Assumed-rate estimate, not ranked"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 8.03
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.964 × 100 = 96.4 net word/min"
        note: "Rate is the ASSUMED ~100 wpm articulation rate; accuracy is the closed-vocabulary (67-word) condition."
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
      - title: "Information transfer rate"
        math: "96.4 word/min × 5.0 bits/word ÷ 60 s/min = 8.03 bits/s"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 67 words (closed-vocabulary condition)"
    scoreType: wolpaw
    kind: "Uniform-prior comparison metric (assumed rate)"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 67
      accuracy: 0.964
      secondsPerSelection: 0.6
  - id: achieved
    method: "Nuyujukian achieved bitrate over N = 67 words (closed-vocabulary condition)"
    scoreType: nuyujukian
    kind: "Achieved-bitrate view of the closed-vocabulary channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 9.35
    steps:
      - title: "Achieved-bitrate credit per net-correct word"
        math: "N = 67 → log2(N − 1) = log2(66) = 6.04 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; Nuyujukian 2015, which introduced the metric, used log2(N))."
      - title: "Net-correct word rate"
        math: "net-correct = 2P − 1 = 2(0.964) − 1 = 0.928 of words. At the assumed 100 word/min (0.6 s/word) → 0.928 × 100 / 60 = 1.55 correct/s."
        note: "A word error commits the wrong word rather than timing out, so incorrect = 1 − P. Same N (67), closed-vocabulary accuracy (96.4%) and assumed 100 wpm rate as the entry's Wolpaw calc. Like every calc on this entry it rests on the assumed articulation rate, so it is notUsedForRanking; it should not be read as open-vocabulary throughput."
      - title: "Achieved bitrate"
        math: "6.04 bits × 1.55 correct/s = 9.35 bits/s."
referenceCalculationId: comm
---
