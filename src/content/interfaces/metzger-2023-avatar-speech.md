---
name: ECoG Speech + Avatar (Metzger et al., 2023)
year: 2023
modalityTags: ["ECoG", "Speech"]
sensingModality: ECoG
invasiveness: invasive
source:
  authors: "Metzger, Littlejohn, Silva, Moses, Anumanchipalli & Chang et al."
  venue: "Nature 620"
  year: 2023
  doi: "10.1038/s41586-023-06443-4"
  url: "https://doi.org/10.1038/s41586-023-06443-4"
inputs:
  - symbol: "N"
    value: "1024"
    sourceNote: "≈1,000-word general-English vocabulary for the text track (1,024-word set; a 1,152-word set was used for a separate character-rate evaluation)"
  - symbol: "rate"
    value: "78"
    unit: "word/min"
    sourceNote: "Median text-decoding rate (Abstract)"
  - symbol: "P"
    value: "0.75"
    sourceNote: "1 − 25% median word error rate for the text track (Abstract)"
actionSpace:
  kind: context-dependent
  size: 1024
  prior: context-conditioned
  notes: "High-density ECoG decoded to text via a neural language model over a ~1,000-word vocabulary. The live action set and word likelihoods are reweighted each step by the model, so this is not a uniform fixed-target selection. The same system also drove speech-audio and avatar outputs."
calculations:
  - id: comm
    method: "Word-entropy throughput"
    kind: "Effective bits actually transmitted as English"
    provenance: recomputed-omitted
    resultBitsPerMin: 293
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.75 × 78 = 58.5 net word/min"
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
        note: "Credits only the information in the English produced, independent of vocabulary size."
      - title: "Information transfer rate"
        math: "ITR = 58.5 × 5.0 ≈ 293 bits/min"
  - id: wolpaw
    method: "Wolpaw mutual information over N = 1,024 words"
    kind: "Per-word mutual information under uniform-prior Wolpaw assumptions"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 1024
      accuracy: 0.75
      secondsPerSelection: 0.76923
referenceCalculationId: comm
---
