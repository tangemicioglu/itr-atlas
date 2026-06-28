---
name: Intracortical Speech (Willett et al., 2023)
year: 2023
modalityTags: ["Intracortical", "Speech"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Willett, Kunz, Fan, Hochberg, Druckmann, Shenoy & Henderson"
  venue: "Nature 620"
  year: 2023
  doi: "10.1038/s41586-023-06377-x"
  url: "https://doi.org/10.1038/s41586-023-06377-x"
inputs:
  - symbol: "N"
    value: "125000"
    sourceNote: "125,000-word large-vocabulary decoding (Abstract): the reference operating point"
  - symbol: "rate"
    value: "62"
    unit: "word/min"
    sourceNote: "Decoding rate of attempted speech (Abstract)"
  - symbol: "P"
    value: "0.762"
    sourceNote: "1 − 23.8% word error rate on the 125,000-word vocabulary (Abstract). On a constrained 50-word set the WER was 9.1%."
actionSpace:
  kind: context-dependent
  size: 125000
  prior: context-conditioned
  notes: "Intracortical decoding of attempted speech through an n-gram/neural language model over a 125k-word vocabulary. The language model reweights candidates by context, so the uniform-prior Wolpaw figure is not directly comparable to the atlas English-output convention."
references:
  - label: "Open-access full text (PMC)"
    url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10468393/"
calculations:
  - id: comm
    method: "Word-entropy throughput"
    kind: "Effective bits actually transmitted as English"
    provenance: recomputed-omitted
    resultBitsPerSecond: 3.93
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = (1 − 0.238) × 62 = 47.2 net word/min"
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word (1 bit/char × 5 chars/word)"
        note: "Credits only the information in the English actually produced, independent of vocabulary size."
      - title: "Information transfer rate"
        math: "ITR = 3.93 bits/s"
  - id: wolpaw
    method: "Wolpaw mutual information over N = 125,000 words"
    kind: "Per-word mutual information under uniform-prior Wolpaw assumptions"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 125000
      accuracy: 0.762
      secondsPerSelection: 0.96774
referenceCalculationId: comm
---
