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
    unit: "bits/min"
    sourceNote: "Authors' reported passive (raw discrimination) ITR: mean 701 bit/min ≈ 11.7 bits/s, best subject 1237 bit/min ≈ 20.6 bits/s (the 'world's fastest BCI' headline). Reproduced in the passive calculation below."
  - symbol: "T_detect"
    value: "0.25"
    unit: "s"
    sourceNote: "Detection window: EEG2Code predicts each stimulation bit from a 250 ms EEG window (shifted sample-wise at 600 Hz)."
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
    scoreType: shannon
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
        math: "35 char/min × 1.0 bit/char ÷ 60 s/min = 0.583 bits/s"
  - id: utility
    method: "Authors' utility rate (log2(N) per selection over the speller alphabet)"
    scoreType: nuyujukian
    kind: "Alphabet-level achieved-bitrate metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerSecond: 2.92
    steps:
      - title: "Information per selection over the speller alphabet"
        math: "32-target speller → log2(32) = 5 bits per correct selection"
        note: "The authors' utility rate credits the full alphabet entropy per selection, unlike the atlas-ranked text figure which holds every text entry to 1 bit/char."
      - title: "Apply the error-free spelling rate"
        math: "35 error-free letters/min × 5 bits = 175 bit/min ≈ 2.92 bits/s"
        note: "Matches the authors' reported 175 bit/min utility rate (98.5% mean target accuracy)."
  - id: passive
    method: "Raw channel discrimination (passive ITR)"
    scoreType: wolpaw
    kind: "Passive signal-discrimination metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerSecond: 11.68
    steps:
      - title: "Binary bit channel (EEG2Code)"
        math: "N = 2. The decoder predicts each stimulation bit (black/white) from a 250 ms EEG window"
        note: "EEG2Code classifies the binary stimulation code, not 1-of-many targets, so the raw channel is a stream of per-bit predictions."
      - title: "Wolpaw ITR on the bit channel (authors' Eq. 2)"
        math: "ITR = [log2(N) + P·log2(P) + (1−P)·log2((1−P)/(N−1))] / T,  N = 2"
        note: "The authors apply the standard Wolpaw formula to the binary bit channel at the per-bit prediction accuracy over the 250 ms detection window."
      - title: "Reported passive ITR"
        math: "mean 701 bit/min ≈ 11.68 bits/s;  best subject 1237 bit/min ≈ 20.6 bits/s"
        note: "Equivalently, the 250 ms decoder can discriminate 500,000 distinct 2 s stimulation patterns (log2(500,000) ≈ 18.9 bits per 2 s). The authors flag a 'ceiling effect' for very large code spaces, so this is a raw-discrimination capacity kept for comparison, not the ranked communication rate."
referenceCalculationId: comm
---
