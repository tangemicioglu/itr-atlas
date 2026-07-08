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
        math: "31.1 word/min × 5.0 bits/word ÷ 60 s/min = 2.6 bits/s"
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
  - id: achieved
    method: "Nuyujukian achieved bitrate over the 125,000-word vocabulary"
    scoreType: nuyujukian
    kind: "Large-vocabulary capacity view, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 8.55
    steps:
      - title: "Achieved-bitrate credit per net-correct word"
        math: "N = 125,000 → log2(N − 1) = log2(124,999) ≈ 16.93 bits per net-correct selection (Nuyujukian 2015, which introduced the metric, used log2(N); at this N the difference is negligible)."
      - title: "Net-correct word rate"
        math: "net-correct = 2P − 1 = 2(0.9734) − 1 = 0.947 of words. At 32 word/min (1.875 s/word) → 0.947 × 32 / 60 = 0.505 correct/s."
        note: "A word error commits the wrong word rather than timing out, so incorrect = 1 − P. Same N (125,000), word accuracy (97.34%) and rate (32 wpm) as the entry's Wolpaw calc. As that calc's own caveat notes, the 125k-word vocabulary is context-reweighted by the language model each step, so feeding it into log2(N − 1) is a large-vocabulary capacity view (~17 bits/word) — raw channel capacity, not communication, analogous to the nagel code-space figure. The ranked communication rate is the 2.6 bits/s word-entropy Shannon."
      - title: "Achieved bitrate"
        math: "16.93 bits × 0.505 correct/s = 8.55 bits/s."
referenceCalculationId: comm
---
