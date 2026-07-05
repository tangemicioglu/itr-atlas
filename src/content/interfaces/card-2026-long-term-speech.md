---
name: Long-Term Intracortical Speech BCI (Card et al., 2026)
year: 2026
modalityTags: ["Intracortical", "Speech"]
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
    sourceNote: "99.2% word accuracy reported for the transformer-based decoder in prompted word-copy benchmarking. Paired here with the personal-use average rate only as a mixed-task operating-point estimate, not as a single directly reported throughput."
actionSpace:
  kind: context-dependent
  size: 125000
  prior: context-conditioned
  notes: "The speech channel is a large-vocabulary brain-to-text decoder with a language model over more than 125,000 words. The live word probabilities are context-conditioned, so the 125k vocabulary is a nominal action space rather than a uniform set. The same implanted arrays also drove a 2D neural cursor; that cursor benchmark is split into its own entry, matching the channel-vs-application split used for BrainGate2."
references:
  - label: "Nature Medicine full text"
    url: "https://www.nature.com/articles/s41591-026-04414-6"
calculations:
  - id: comm
    method: "Word-entropy throughput"
    scoreType: shannon
    kind: "Effective bits actually transmitted as English"
    provenance: recomputed-omitted
    resultBitsPerSecond: 4.63
    steps:
      - title: "Error-corrected words per minute"
        math: "P x rate = 0.992 x 56 = 55.6 net word/min"
        note: "The 56 WPM value is the reported personal-use average; the 99.2% word accuracy comes from prompted benchmarking. This is a mixed-task estimate built from two reported operating points, not a single task's directly reported ITR."
      - title: "Shannon per-word entropy of English"
        math: "H ~= 5.0 bits/word"
        note: "Credits only the information in the English produced, independent of vocabulary size."
      - title: "Information transfer rate"
        math: "55.6 word/min × 5.0 bits/word ÷ 60 s/min = 4.63 bits/s"
  - id: wolpaw
    method: "Wolpaw mutual information over N = 125,000 words"
    scoreType: wolpaw
    kind: "Per-word mutual information under uniform-prior Wolpaw assumptions"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 125000
      accuracy: 0.992
      secondsPerSelection: 1.07143
  - id: achieved
    method: "Achieved bitrate over the 125,000-word vocabulary"
    scoreType: achieved
    kind: "Large-vocabulary capacity view, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 15.6
    steps:
      - title: "Achieved-bitrate credit per net-correct word"
        math: "N = 125,000 → log2(N − 1) = log2(124,999) ≈ 16.93 bits per net-correct selection (the namesake Nuyujukian 2015 used log2(N); at this N the difference is negligible)."
      - title: "Net-correct word rate"
        math: "A word error commits the wrong word rather than timing out, so incorrect = 1 − P and net-correct = 2P − 1 = 2(0.992) − 1 = 0.984 of words. At 56 word/min (1.071 s/word) → 0.984 × 56 / 60 = 0.919 correct/s."
        note: "Same N (125,000), word accuracy (99.2%) and rate (56 wpm) as the entry's Wolpaw calc. As that calc's own caveat notes, the 125k-word vocabulary is context-reweighted by the language model each step, so feeding it into log2(N − 1) is a large-vocabulary capacity view (~17 bits/word) — raw channel capacity, not communication, analogous to the nagel code-space figure. The ranked communication rate is the 4.63 bits/s word-entropy Shannon."
      - title: "Achieved bitrate"
        math: "16.93 bits × 0.919 correct/s = 15.6 bits/s."
referenceCalculationId: comm
---
