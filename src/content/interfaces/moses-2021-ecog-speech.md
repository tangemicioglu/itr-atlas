---
name: ECoG Speech, 50 words (Moses et al., 2021)
year: 2021
modalityTags: ["ECoG", "Speech"]
sensingModality: ECoG
invasiveness: invasive
source:
  authors: "Moses, Metzger, Liu, Anumanchipalli, Chang et al."
  venue: "N. Engl. J. Med. 385"
  year: 2021
  doi: "10.1056/NEJMoa2027540"
  url: "https://doi.org/10.1056/NEJMoa2027540"
inputs:
  - symbol: "N"
    value: "50"
    sourceNote: "50-word vocabulary the participant attempted to say (Abstract; Methods)"
  - symbol: "rate"
    value: "15.2"
    unit: "word/min"
    sourceNote: "Median decoding rate (Abstract)"
  - symbol: "P"
    value: "0.744"
    sourceNote: "1 − 25.6% median word error rate, with the natural-language model (Abstract). Without the model, WER was 47.1%."
actionSpace:
  kind: fixed-set
  size: 50
  prior: context-conditioned
  notes: "A 50-word vocabulary, but decoding ran through a Viterbi/HMM language model over sentence sequences, so successive words are not independent and the effective prior is context-conditioned. Treating the 50 words as an equiprobable set is an idealization."
calculations:
  - id: comm
    method: "Word-entropy throughput"
    kind: "Effective bits actually transmitted as English"
    provenance: recomputed-omitted
    resultBitsPerMin: 57
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.744 × 15.2 = 11.3 net word/min"
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
        note: "Credits only the information in the English produced, independent of vocabulary size."
      - title: "Information transfer rate"
        math: "ITR = 11.3 × 5.0 ≈ 57 bits/min"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 50 words"
    kind: "Uniform-prior comparison metric"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 50
      accuracy: 0.744
      secondsPerSelection: 3.94737
referenceCalculationId: comm
---
