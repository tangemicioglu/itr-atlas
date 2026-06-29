---
name: Handwriting BCI (Willett et al., 2021)
year: 2021
modalityTags: ["Intracortical", "Handwriting"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Willett, Avansino, Hochberg, Henderson & Shenoy"
  venue: "Nature 593"
  year: 2021
  doi: "10.1038/s41586-021-03506-2"
  url: "https://doi.org/10.1038/s41586-021-03506-2"
inputs:
  - symbol: "N"
    value: "31"
    sourceNote: "Character set: 26 lowercase letters + comma, apostrophe, question mark, period, space (Methods)"
  - symbol: "rate"
    value: "90"
    unit: "char/min"
    sourceNote: "Real-time copy-typing speed (Abstract; Fig. 2)"
  - symbol: "P"
    value: "0.941"
    sourceNote: "Raw online character accuracy (5.9% character error rate, no language model). With a general-purpose autocorrect, >99%."
  - symbol: "WER"
    value: "0.251"
    sourceNote: "25.1% raw word error rate for online output, versus 5.9% raw character error rate (Table 1)."
actionSpace:
  kind: fixed-set
  size: 31
  prior: non-uniform
  notes: "Per-character classification of attempted handwriting over a 31-symbol set. The reference figure uses the RAW decoder (no language model); the headline >99% accuracy adds an autocorrect/language model, which would make the prior strongly context-conditioned. English letters are not equiprobable, so even the raw figure is an upper bound on transmitted information. The paper also reports a stricter raw word error rate; that word-level view is included as a supplementary calculation."
references:
  - label: "Open-access full text (PMC)"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8163299/"
calculations:
  - id: comm
    method: "Character-entropy throughput"
    scoreType: shannon
    kind: "Effective bits transmitted as English text"
    provenance: recomputed-omitted
    resultBitsPerSecond: 1.41
    steps:
      - title: "Error-corrected characters per minute"
        math: "(1 − CER) × rate = 0.941 × 90 = 84.7 net char/min"
      - title: "Shannon per-character entropy of English"
        math: "H ≈ 1.0 bit/char"
        note: "English letters are redundant, so the atlas-ranked figure uses 1 bit/char for consistency with the typing entries rather than the raw 31-symbol alphabet size."
      - title: "Information transfer rate"
        math: "84.7 char/min × 1.0 bit/char ÷ 60 s/min = 1.41 bits/s"
  - id: raw-word-entropy
    method: "Word-entropy throughput from raw WER"
    scoreType: shannon
    kind: "Effective bits transmitted as English words, using the stricter raw word-level error rate"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 1.12
    steps:
      - title: "Convert character rate to words per minute"
        math: "90 char/min ÷ 5.0 char/word ≈ 18.0 word/min"
        note: "Uses the same average English word length convention (one word = five characters) as the other word-entropy calculations."
      - title: "Apply raw word error rate"
        math: "(1 − WER) × rate = (1 − 0.251) × 18.0 ≈ 13.5 net word/min"
        note: "The 25.1% raw word error rate is much higher than the 5.9% raw character error rate because any character edit can make a whole word wrong."
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
      - title: "Information transfer rate"
        math: "13.5 word/min × 5.0 bits/word ÷ 60 s/min ≈ 1.12 bits/s"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 31 characters"
    scoreType: wolpaw
    kind: "Uniform-prior character metric (raw decoder)"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 31
      accuracy: 0.941
      secondsPerSelection: 0.66667
referenceCalculationId: comm
---
