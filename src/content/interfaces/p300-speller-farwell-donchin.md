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
  - id: achieved
    method: "Achieved bitrate over N = 36 targets"
    scoreType: achieved
    kind: "Achieved-bitrate view of the speller, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 0.2
    steps:
      - title: "Achieved-bitrate credit per net-correct selection"
        math: "N = 36 → log2(N − 1) = log2(35) = 5.13 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; the namesake Nuyujukian 2015 used log2(N))."
      - title: "Net-correct selection rate"
        math: "A speller error commits the wrong character rather than timing out, so incorrect = 1 − P and net-correct = 2P − 1 = 2(0.95) − 1 = 0.90 of selections. At ~2.6 selections/min (23 s each) → 0.90 / 23 = 0.039 correct/s."
        note: "Same N (36), accuracy (95%) and selection time (23 s) as the entry's Wolpaw calc. Because a wrong selection commits an error rather than merely timing out, the achieved bitrate nets each mistake against a correct selection (2P − 1); at this high accuracy it nearly matches the Wolpaw figure, but it falls faster as accuracy drops."
      - title: "Achieved bitrate"
        math: "5.13 bits × 0.039 correct/s = 0.20 bits/s."
referenceCalculationId: comm
---
