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
    sourceNote: "Active online spelling: ~35 error-free letters/min (a 175 bit/min 'utility rate') for the proof-of-concept online subject."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); the same ~1 bit/char standard applied to QWERTY and the other text-entry entries."
  - symbol: "ITR_passive"
    value: "701"
    unit: "bit/min"
    sourceNote: "Mean passive (raw discrimination) ITR; best subject 1237 bit/min — the 'world's fastest BCI' headline. This is channel discrimination, not communication."
  - symbol: "N"
    value: "500000"
    sourceNote: "The decoder discriminated 500,000 distinct random black/white stimulation patterns at ~100% from 2 s of EEG — log2(500000) ≈ 19 bits per selection. N is a code-space size, not a set of communicative choices."
actionSpace:
  kind: fixed-set
  size: 32
  prior: context-conditioned
  notes: "c-VEP: targets flicker by random black/white codes and the decoder classifies which code the user is gazing at (a classifier, not Fitts pointing). The realized communication is the active speller's English text (~35 letters/min), so the reference uses character-entropy (~1 bit/char) like the other text entries. The headline 701–1237 bit/min and the 500,000-stimulus discrimination are raw channel-capacity ceilings: the authors themselves flag a 'ceiling effect' where the extracted bits cannot be converted into control. This entry is the published reductio of log2(N) — N is a knob (500,000 codes here), which is exactly why raw per-selection bits cannot be the ranked number."
references:
  - label: "Nagel & Spüler 2019 (PLOS ONE) — 'World's fastest brain-computer interface: Combining EEG2Code with deep learning'"
    url: "https://doi.org/10.1371/journal.pone.0221909"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerMin: 35
    steps:
      - title: "Correct characters per minute"
        math: "≈ 35 error-free letters/min (active online spelling)"
        note: "The information the interface actually delivers as communication, under the same predictor as every other text entry."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 35 × 1.0 ≈ 35 bits/min"
  - id: utility
    method: "Authors' utility rate (log2(N) per selection over the speller alphabet)"
    kind: "Classifier ceiling — over-credits English text"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerMin: 175
    steps:
      - title: "Utility rate"
        math: "175 bit/min ≈ 35 letters/min × ~5 bits/letter (log2 of the keyboard alphabet)"
        note: "Holds the speller to ~5 bits/char versus the 1 bit/char we apply to English text everywhere else — a ceiling, not the realized rate."
  - id: passive
    method: "Raw channel discrimination (passive ITR)"
    kind: "Channel-capacity ceiling — not communication"
    provenance: author-reported-unverified
    notUsedForRanking: true
    resultBitsPerMin: 701
    steps:
      - title: "Discrimination capacity"
        math: "100% discrimination of 500,000 stimuli from 2 s EEG → log2(500000) ≈ 19 bits/selection; 701 bit/min mean, 1237 peak"
        note: "The authors flag a 'ceiling effect' — these bits cannot all be converted into BCI control. Shown as the channel ceiling; never ranked."
referenceCalculationId: comm
---
