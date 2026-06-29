---
name: Accurate Speech BCI (Card et al., 2024)
year: 2024
modalityTags: ["Intracortical", "Speech"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Card, Stavisky, Brandman et al."
  venue: "N. Engl. J. Med. 391"
  year: 2024
  doi: "10.1056/NEJMoa2314132"
  url: "https://doi.org/10.1056/NEJMoa2314132"
inputs:
  - symbol: "N"
    value: "125000"
    sourceNote: "125,000-word vocabulary (Abstract)"
  - symbol: "rate"
    value: "32"
    unit: "word/min"
    sourceNote: "Self-paced conversational rate sustained over 248+ hours (Abstract). Faster home-use sessions reached higher rates."
  - symbol: "P"
    value: "0.9734"
    sourceNote: "1 − 2.66% average word error rate on the 125,000-word vocabulary (as low as 1% on the best days; Abstract)"
actionSpace:
  kind: context-dependent
  size: 125000
  prior: context-conditioned
  notes: "Same large-vocabulary, language-model-mediated structure as other free-speech BCIs: 125k words nominally, but context prunes and reweights candidates each step. The standout result is accuracy (≈97.5% sustained), not raw rate. The uniform-prior Wolpaw calculation is kept as a secondary comparison because it is not directly comparable to the atlas English-output convention."
references:
  - label: "Open-access full text (PMC)"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11328962/"
calculations:
  - id: comm
    method: "Word-entropy throughput"
    scoreType: shannon
    kind: "Effective bits actually transmitted as English"
    provenance: recomputed-omitted
    resultBitsPerSecond: 2.6
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.9734 × 32 = 31.1 net word/min"
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
        note: "Credits only the information in the English produced, independent of vocabulary size."
      - title: "Information transfer rate"
        math: "ITR = 2.6 bits/s"
  - id: wolpaw
    method: "Wolpaw mutual information over N = 125,000 words"
    scoreType: wolpaw
    kind: "Per-word mutual information under uniform-prior Wolpaw assumptions"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 125000
      accuracy: 0.9734
      secondsPerSelection: 1.875
referenceCalculationId: comm
---
