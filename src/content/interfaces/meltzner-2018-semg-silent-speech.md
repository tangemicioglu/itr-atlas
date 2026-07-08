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
        math: "91.1 word/min × 5.0 bits/word ÷ 60 s/min = 7.6 bits/s"
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
  - id: achieved
    method: "Nuyujukian achieved bitrate over N = 2,200 words"
    scoreType: nuyujukian
    kind: "Achieved-bitrate view of the vocabulary channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 15.2
    steps:
      - title: "Achieved-bitrate credit per net-correct word"
        math: "N = 2,200 → log2(N − 1) = log2(2199) = 11.10 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; Nuyujukian 2015, which introduced the metric, used log2(N))."
      - title: "Net-correct word rate"
        math: "net-correct = 2P − 1 = 2(0.911) − 1 = 0.822 of words. At the assumed 100 word/min (0.6 s/word) → 0.822 × 100 / 60 = 1.37 correct/s."
        note: "A word error commits the wrong word rather than timing out, so incorrect = 1 − P. Same N (2,200), word accuracy (91.1%) and assumed 100 wpm rate as the entry's Wolpaw calc. The large vocabulary makes this per-word capacity figure high, but the rate is assumed and the vocabulary language-model-mediated, so it is notUsedForRanking and not a demonstrated communication speed."
      - title: "Achieved bitrate"
        math: "11.10 bits × 1.37 correct/s = 15.2 bits/s."
referenceCalculationId: comm
---
