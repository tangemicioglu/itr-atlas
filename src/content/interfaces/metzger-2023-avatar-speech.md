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
    scoreType: shannon
    kind: "Effective bits actually transmitted as English"
    provenance: recomputed-omitted
    resultBitsPerSecond: 4.88
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.75 × 78 = 58.5 net word/min"
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
        note: "Credits only the information in the English produced, independent of vocabulary size."
      - title: "Information transfer rate"
        math: "58.5 word/min × 5.0 bits/word ÷ 60 s/min = 4.88 bits/s"
  - id: wolpaw
    method: "Wolpaw mutual information over N = 1,024 words"
    scoreType: wolpaw
    kind: "Per-word mutual information under uniform-prior Wolpaw assumptions"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 1024
      accuracy: 0.75
      secondsPerSelection: 0.76923
  - id: achieved
    method: "Nuyujukian achieved bitrate over N = 1,024 words"
    scoreType: nuyujukian
    kind: "Achieved-bitrate view of the vocabulary channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 6.5
    steps:
      - title: "Achieved-bitrate credit per net-correct word"
        math: "N = 1,024 → log2(N − 1) = log2(1023) = 10.0 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; Nuyujukian 2015, which introduced the metric, used log2(N))."
      - title: "Net-correct word rate"
        math: "net-correct = 2P − 1 = 2(0.75) − 1 = 0.50 of words. At 78 word/min (0.769 s/word) → 0.50 × 78 / 60 = 0.65 correct/s."
        note: "A word error commits the wrong word rather than timing out, so incorrect = 1 − P. Same N (1,024), text-track accuracy (75%) and rate (78 wpm) as the entry's Wolpaw calc. The 1,024-word action set is reweighted each step by a neural language model, so feeding it into log2(N − 1) is a per-word capacity view, not open-vocabulary communication; the ranked figure is the 4.88 bits/s word-entropy Shannon."
      - title: "Achieved bitrate"
        math: "10.0 bits × 0.65 correct/s = 6.50 bits/s."
referenceCalculationId: comm
---
