---
name: Checkerboard P300 Speller (Townsend et al., 2010)
year: 2010
modalityTags: ["EEG", "P300"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Townsend, LaPallo, Boulay et al."
  venue: "Clinical Neurophysiology 121(7)"
  year: 2010
  doi: "10.1016/j.clinph.2010.01.030"
  url: "https://doi.org/10.1016/j.clinph.2010.01.030"
inputs:
  - symbol: "N"
    value: "72"
    sourceNote: "8×9 character matrix. The checkerboard paradigm (CBP) reshuffles which items flash together, avoiding the adjacency and double-flash problems of the classic row/column paradigm (RCP)."
  - symbol: "rate"
    value: "4.4"
    unit: "char/min"
    sourceNote: "Back-derived from the reported 23 bit/min Wolpaw ITR at N=72, 92% accuracy (≈5.28 bits/selection → ~4.4 selections/min); P300 spellers are slow because each selection needs many flash repetitions averaged."
  - symbol: "P"
    value: "0.92"
    sourceNote: "Mean online selection accuracy across 18 subjects with the checkerboard paradigm (vs the row/column paradigm in the same study)."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); the same ~1 bit/char standard applied to QWERTY and every other text entry."
  - symbol: "ITR_reported"
    value: "23"
    unit: "bit/min"
    sourceNote: "Authors' mean Wolpaw bit rate for the checkerboard paradigm (up from 19 bit/min for row/column). Counts log2(N) per selection."
actionSpace:
  kind: fixed-set
  size: 72
  prior: context-conditioned
  notes: "8×9 matrix; the decoder classifies which character drew the P300 response (covert attention — no pointing, no cursor), the modern descendant of the 1988 Farwell-Donchin speller. The realized output is English text, so the reference uses character-entropy (~1 bit/char) like every other text entry; the authors' 23 bit/min Wolpaw figure assumes a uniform 1-of-72 choice and is kept as a secondary classifier metric. The checkerboard paradigm is a well-cited modern P300 design — useful here as the modern bookend to the 1988 original."
references:
  - label: "Townsend et al. 2010 — open-access PMC copy"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2879474/"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerMin: 4
    steps:
      - title: "Correct characters per minute"
        math: "≈ 4.4 selections/min × 0.92 accuracy ≈ 4.0 correct char/min"
        note: "Each selection emits one character of English; the slow rate is the cost of averaging many P300 flash repetitions per selection."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 4.0 × 1.0 ≈ 4 bits/min  (vs ~2 bits/min for the 1988 original — the paradigm roughly doubled realized rate)"
  - id: reported
    method: "Wolpaw bitrate over N = 72 targets (authors' reported ITR)"
    kind: "Uniform 1-of-72 classifier metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 72
      accuracy: 0.92
      secondsPerSelection: 13.6
referenceCalculationId: comm
---
