---
name: Long-Term Intracortical Speech + Cursor BCI (Card et al., 2026)
year: 2026
modalityTags: ["Intracortical", "Speech", "Cursor"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Card, Singer-Clark, Peracha, Stavisky, Brandman et al."
  venue: "Nature Medicine"
  year: 2026
  doi: "10.1038/s41591-026-04414-6"
  url: "https://doi.org/10.1038/s41591-026-04414-6"
inputs:
  - symbol: "N"
    value: "125000"
    sourceNote: "125,000-word vocabulary for the brain-to-text speech decoder (Abstract; Speech decoding section)"
  - symbol: "rate"
    value: "56"
    unit: "word/min"
    sourceNote: "Average rate across 183,060 personal-use sentences totaling 1,960,163 words (Abstract)"
  - symbol: "P"
    value: "0.992"
    sourceNote: "99.2% word accuracy reported for the transformer-based decoder in prompted word-copy benchmarking; paired here with the personal-use average rate as a high-performance operating-point estimate"
  - symbol: "cursor"
    value: "2.90"
    unit: "bits/s"
    sourceNote: "Structured cursor grid-task throughput, reported as 2.90 +/- 0.16 bits/s (Cursor decoding section)"
actionSpace:
  kind: context-dependent
  size: 125000
  prior: context-conditioned
  notes: "The speech channel is a large-vocabulary brain-to-text decoder with a language model over more than 125,000 words. The live word probabilities are context-conditioned, so the 125k vocabulary is a nominal action space rather than a uniform set. The same implanted arrays also drove a 2D neural cursor; that cursor benchmark is included below as a supplementary channel measure."
references:
  - label: "Nature Medicine full text"
    url: "https://www.nature.com/articles/s41591-026-04414-6"
calculations:
  - id: comm
    method: "Word-entropy throughput"
    kind: "Effective bits actually transmitted as English"
    provenance: recomputed-omitted
    resultBitsPerMin: 278
    steps:
      - title: "Error-corrected words per minute"
        math: "P x rate = 0.992 x 56 = 55.6 net word/min"
        note: "The 56 WPM value is the reported personal-use average; the 99.2% word accuracy comes from prompted benchmarking, so this is a documented operating-point estimate rather than a single task's directly reported ITR."
      - title: "Shannon per-word entropy of English"
        math: "H ~= 5.0 bits/word"
        note: "Credits only the information in the English produced, independent of vocabulary size."
      - title: "Information transfer rate"
        math: "ITR = 55.6 x 5.0 ~= 278 bits/min"
  - id: cursor-grid
    method: "Reported cursor grid throughput"
    kind: "2D cursor-control channel benchmark"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerMin: 174
    steps:
      - title: "Convert reported bits per second"
        math: "2.90 bits/s x 60 = 174 bits/min"
        note: "This is the paper's structured cursor-control benchmark, not the speech word-entropy reference calculation."
  - id: wolpaw
    method: "Wolpaw mutual information over N = 125,000 words"
    kind: "Per-word mutual information under uniform-prior Wolpaw assumptions"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 125000
      accuracy: 0.992
      secondsPerSelection: 1.07143
referenceCalculationId: comm
---
