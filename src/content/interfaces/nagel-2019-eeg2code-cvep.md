---
name: EEG2Code c-VEP Speller (Nagel & Spüler, 2019)
year: 2019
modalityTags: ["EEG", "c-VEP"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Nagel & Spüler"
  venue: "PLOS ONE 14(9)"
  year: 2019
  doi: "10.1371/journal.pone.0221909"
  url: "https://doi.org/10.1371/journal.pone.0221909"
inputs:
  - symbol: "rate"
    value: "35"
    unit: "char/min"
    sourceNote: "Active online spelling: ~35 error-free letters/min (a 2.92 bits/s 'utility rate') for the proof-of-concept online subject."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); the same ~1 bit/char standard applied to QWERTY and the other text-entry entries."
  - symbol: "ITR_passive"
    value: "701"
    unit: "bits/s"
    sourceNote: "Mean passive (raw discrimination) ITR; best subject 20.6 bits/s, the 'world's fastest BCI' headline. This is a signal-discrimination metric, separate from active spelling throughput."
  - symbol: "N"
    value: "500000"
    sourceNote: "The decoder discriminated 500,000 distinct random black/white stimulation patterns at ~100% from 2 s of EEG: log2(500000) ≈ 19 bits per selection. N is a code-space size, not a set of communicative choices."
actionSpace:
  kind: fixed-set
  size: 32
  prior: context-conditioned
  notes: "c-VEP: targets flicker by random black/white codes and the decoder classifies which code the user is gazing at (a classifier, not Fitts pointing). The ranked atlas figure uses the active speller's English text output (~35 letters/min), so it follows the same character-entropy convention as the other text entries. The headline 11.7-20.6 bits/s and the 500,000-stimulus discrimination are retained as secondary signal-discrimination metrics. The authors explicitly discuss a ceiling effect for very large code spaces, which is why the atlas separates raw code discrimination from ranked text throughput."
references:
  - label: "Nagel & Spüler 2019 (PLOS ONE): 'World's fastest brain-computer interface: Combining EEG2Code with deep learning'"
    url: "https://doi.org/10.1371/journal.pone.0221909"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.583
    steps:
      - title: "Correct characters per minute"
        math: "≈ 35 error-free letters/min (active online spelling)"
        note: "The information the interface actually delivers as communication, under the same predictor as every other text entry."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 0.583 bits/s"
  - id: utility
    method: "Authors' utility rate (log2(N) per selection over the speller alphabet)"
    kind: "Alphabet-level utility metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerSecond: 2.92
    steps:
      - title: "Utility rate"
        math: "ITR = 2.92 bits/s"
        note: "Uses ~5 bits/char from the speller alphabet. The atlas-ranked text figure uses 1 bit/char for consistency with the other English text entries."
  - id: passive
    method: "Raw channel discrimination (passive ITR)"
    kind: "Passive signal-discrimination metric, shown for comparison"
    provenance: author-reported-unverified
    notUsedForRanking: true
    resultBitsPerSecond: 11.7
    steps:
      - title: "Discrimination capacity"
        math: "ITR = 11.7 bits/s"
        note: "The authors flag a 'ceiling effect' for very large code spaces. This is kept as a signal-discrimination result rather than the ranked communication-throughput figure."
referenceCalculationId: comm
---
