---
name: P300 Matrix Speller (Farwell & Donchin, 1988)
year: 1988
modalityTags: ["EEG", "P300"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Farwell & Donchin"
  venue: "Electroencephalogr. Clin. Neurophysiol. 70(6)"
  year: 1988
  doi: "10.1016/0013-4694(88)90149-6"
  url: "https://doi.org/10.1016/0013-4694(88)90149-6"
inputs:
  - symbol: "N"
    value: "36"
    sourceNote: "6×6 character matrix (row/column flashing)"
  - symbol: "P"
    value: "0.95"
    sourceNote: "≈95% selection accuracy, the figure cited for the original speller"
  - symbol: "t_sel"
    value: "23"
    unit: "s"
    sourceNote: "≈2.6 selections/min; the original relied on extensive ERP signal averaging, so each selection was slow"
actionSpace:
  kind: fixed-set
  size: 36
  prior: context-conditioned
  notes: "6×6 character matrix; the decoder classifies which letter drew the P300 response (covert attention, no pointing, no cursor). The realized output is English text, so the reference uses the same character-entropy method (~1 bit/char) as the other text-entry entries; the Wolpaw-over-36 figure assumes a uniform 1-of-36 choice and is kept as a secondary classifier metric. Modern P300 spellers are far faster, but this is the 1988 original."
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.041
    steps:
      - title: "Correct characters per minute"
        math: "≈ 2.6 selections/min × 0.95 accuracy ≈ 2.5 correct char/min"
        note: "Each selection emits one character of English; ~23 s/selection due to extensive ERP signal averaging. This is the rate of correct text actually produced."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon), the same predictor used for QWERTY, eye-typing and the other BCI text entries"
      - title: "Information transfer rate"
        math: "2.5 char/min × 1.0 bit/char ÷ 60 s/min = 0.041 bits/s"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 36 targets"
    scoreType: wolpaw
    kind: "Uniform 1-of-36 classifier metric, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 36
      accuracy: 0.95
      secondsPerSelection: 23
referenceCalculationId: comm
---
