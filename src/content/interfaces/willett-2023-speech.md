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
    scoreType: shannon
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
        math: "47.2 word/min × 5.0 bits/word ÷ 60 s/min = 3.93 bits/s"
  - id: wolpaw
    method: "Wolpaw mutual information over N = 125,000 words"
    scoreType: wolpaw
    kind: "Per-word mutual information under uniform-prior Wolpaw assumptions"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 125000
      accuracy: 0.762
      secondsPerSelection: 0.96774
  - id: achieved
    method: "Achieved bitrate over the 125,000-word vocabulary"
    scoreType: achieved
    kind: "Large-vocabulary capacity view, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 9.17
    steps:
      - title: "Achieved-bitrate credit per net-correct word"
        math: "N = 125,000 → log2(N − 1) = log2(124,999) ≈ 16.93 bits per net-correct selection (the namesake Nuyujukian 2015 used log2(N); at this N the difference is negligible)."
      - title: "Net-correct word rate"
        math: "A word error commits the wrong word rather than timing out, so incorrect = 1 − P and net-correct = 2P − 1 = 2(0.762) − 1 = 0.524 of words. At 62 word/min (0.968 s/word) → 0.524 × 62 / 60 = 0.541 correct/s."
        note: "Same N (125,000), word accuracy (76.2%) and rate (62 wpm) as the entry's Wolpaw calc. As that calc's own caveat notes, the 125k-word vocabulary is context-reweighted by the language model each step, so feeding it into log2(N − 1) is a large-vocabulary capacity view (~17 bits/word) — raw channel capacity, not communication, analogous to the nagel code-space figure. The ranked communication rate is the 3.93 bits/s word-entropy Shannon."
      - title: "Achieved bitrate"
        math: "16.93 bits × 0.541 correct/s = 9.17 bits/s."
referenceCalculationId: comm
---
