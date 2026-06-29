---
name: sEMG Silent Speech (Meltzner et al., 2018)
hidden: true
year: 2018
modalityTags: ["sEMG", "Silent speech"]
sensingModality: sEMG
invasiveness: non-invasive
source:
  authors: "Meltzner, Heaton, Deng, De Luca, Roy & Kline"
  venue: "J. Neural Eng. 15(4)"
  year: 2018
  doi: "10.1088/1741-2552/aac965"
  url: "https://doi.org/10.1088/1741-2552/aac965"
inputs:
  - symbol: "N"
    value: "2200"
    sourceNote: "2,200-word vocabulary of continuous phrases (Results)"
  - symbol: "P"
    value: "0.911"
    sourceNote: "1 − 8.9% word error rate on the 2,200-word continuous-phrase task"
  - symbol: "rate"
    value: "100"
    unit: "word/min"
    sourceNote: "ASSUMED ~100 wpm silent-articulation rate (not reported; offline recognition). Used only to convert per-word bits to bits/s; see note."
actionSpace:
  kind: fixed-set
  size: 2200
  prior: context-conditioned
  notes: "Conformable facial/neck sEMG sensors decoding continuous phrases over a large 2,200-word vocabulary with a language model. Large vocabulary + low WER make the per-word comparison metric high, but the rate is assumed rather than measured online, so the headline bits/s should not be read as a demonstrated communication speed."
calculations:
  - id: comm
    method: "Word-entropy throughput"
    scoreType: shannon
    kind: "Assumed-rate estimate, not ranked"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 7.6
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.911 × 100 = 91.1 net word/min"
        note: "Rate is the ASSUMED ~100 wpm articulation rate, not measured."
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
        note: "Independent of vocabulary size, so the 2,200-word vocabulary does not raise this figure the way it raises the Wolpaw comparison metric."
      - title: "Information transfer rate"
        math: "ITR = 7.6 bits/s"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 2,200 words"
    scoreType: wolpaw
    kind: "Uniform-prior comparison metric (assumed rate)"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 2200
      accuracy: 0.911
      secondsPerSelection: 0.6
referenceCalculationId: comm
---
