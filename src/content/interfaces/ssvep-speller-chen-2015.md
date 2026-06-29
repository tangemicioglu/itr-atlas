---
name: High-Speed SSVEP Speller (Chen et al., 2015)
year: 2015
modalityTags: ["EEG", "SSVEP"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Chen, Wang, Gao, Jung & Gao"
  venue: "PNAS 112(44)"
  year: 2015
  doi: "10.1073/pnas.1508080112"
  url: "https://doi.org/10.1073/pnas.1508080112"
inputs:
  - symbol: "N"
    value: "40"
    sourceNote: "40-character speller; each target tagged with a 0.5 s joint frequency–phase-modulated flicker"
  - symbol: "ITR"
    value: "4.45"
    unit: "bits/s"
    sourceNote: "Mean online ITR across subjects, including the 0.5 s gaze-shift time (Abstract). Peak individual 5.32 bits/s; spelling rate up to ~60 char/min (~12 wpm)."
actionSpace:
  kind: fixed-set
  size: 40
  prior: context-conditioned
  notes: "40 flicker-coded characters; the decoder classifies which flicker frequency the user is gazing at: a classifier, not Fitts pointing (selection time is set by the flicker-integration window, not by target distance/size). The realized output is English text, so the reference uses character-entropy (~1 bit/char) like the other text entries; the Wolpaw-over-40 figure counts log2(N) per selection and is kept as a secondary classifier metric. The c-VEP entry (EEG2Code) is a useful comparison point because it reports very large code-space discrimination separately from active spelling throughput."
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.9
    steps:
      - title: "Correct characters per minute"
        math: "~1 selection/s (0.5 s flicker + 0.5 s gaze shift) → ~60 char/min × 89.83% ≈ 54 correct char/min"
        note: "Each selection emits one character; this is the rate of correct English text produced (~12 wpm gross)."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon), the same predictor used for QWERTY and the other text entries"
      - title: "Information transfer rate"
        math: "ITR = 0.9 bits/s"
  - id: reported
    method: "Wolpaw bitrate over N = 40 targets (authors' reported ITR)"
    scoreType: wolpaw
    kind: "Uniform 1-of-40 classifier metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerSecond: 4.45
    steps:
      - title: "Bits per selection (Wolpaw, N = 40 at 89.83%)"
        math: "B = log2(40) + 0.8983·log2(0.8983) + 0.1017·log2(0.1017/39) ≈ 4.31 bits/selection"
        note: "Forward from the online accuracy (89.83%) over the 40 targets. Perfect-accuracy ceiling is log2(40) = 5.32 bits, approached by the best subject."
      - title: "Authors' reported online ITR (includes the gaze-shift time)"
        math: "ITR = 4.45 bits/s  (mean across subjects; 0.5 s flicker + 0.5 s gaze shift ≈ 1 selection/s)"
        note: "Author-reported and verified: B ≈ 4.31 bits/selection at ≈1 selection/s reproduces it. This counts log2(N) per selection — the classifier metric — not the 1 bit/char the atlas-ranked text figure holds every text entry to."
referenceCalculationId: comm
---
