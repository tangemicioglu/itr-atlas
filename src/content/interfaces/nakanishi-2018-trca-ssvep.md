---
name: TRCA SSVEP Speller (Nakanishi et al., 2018)
year: 2018
modalityTags: ["EEG", "SSVEP"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Nakanishi, Wang, Chen, Wei, Chuang, Jung & Wang"
  venue: "IEEE Trans. Biomed. Eng. 65(1)"
  year: 2018
  doi: "10.1109/TBME.2017.2694818"
  url: "https://doi.org/10.1109/TBME.2017.2694818"
inputs:
  - symbol: "N"
    value: "40"
    sourceNote: "40-target frequency-phase-coded speller (same stimulus set as Chen et al. 2015); the advance is the task-related component analysis (TRCA) decoder, not the target count."
  - symbol: "rate"
    value: "75"
    unit: "char/min"
    sourceNote: "Cue-guided spelling rate: 0.3 s stimulation + 0.5 s gaze shift = 0.8 s/selection → ~75 selections/min."
  - symbol: "P"
    value: "0.8983"
    sourceNote: "Online cue-guided selection accuracy at the 0.3 s data length."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); the same ~1 bit/char standard applied to QWERTY and every other text entry."
  - symbol: "ITR_reported"
    value: "325.33"
    unit: "bits/s"
    sourceNote: "Authors' online cue-guided Wolpaw ITR (free-spelling 3.31 bits/s): the highest ITR reported for an EEG BCI at the time. Counts log2(N) per selection."
actionSpace:
  kind: fixed-set
  size: 40
  prior: context-conditioned
  notes: "Same 40-target SSVEP paradigm as Chen et al. 2015; the decoder classifies which flicker frequency the user gazes at (a classifier, not Fitts pointing). The realized output is English text, so the reference uses character-entropy (~1 bit/char) like every other text entry; the authors' 5.42 bits/s Wolpaw figure counts log2(N) per selection and is kept as a secondary classifier metric. The faster decoder (0.8 s/selection vs ~1 s in Chen 2015) is why the atlas text-throughput estimate edges above Chen's."
references:
  - label: "Nakanishi et al. 2018: open-access PMC copy"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5783827/"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 1.12
    steps:
      - title: "Correct characters per minute"
        math: "~75 selections/min (0.3 s flicker + 0.5 s gaze shift) × 89.83% ≈ 67 correct char/min"
        note: "Each selection emits one character; this is the rate of correct English text produced in the cue-guided task (free-spelling is lower)."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "67 char/min × 1.0 bit/char ÷ 60 s/min = 1.12 bits/s"
  - id: reported
    method: "Wolpaw bitrate over N = 40 targets (authors' reported ITR)"
    scoreType: wolpaw
    kind: "Uniform 1-of-40 classifier metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerSecond: 5.39
    steps:
      - title: "Bits per selection (Wolpaw, N = 40 at 89.83%)"
        math: "B = log2(40) + 0.8983·log2(0.8983) + 0.1017·log2(0.1017/39) ≈ 4.31 bits/selection"
        note: "Online cue-guided accuracy 89.83%. This counts log2(N) per selection — the classifier metric — not the 1 bit/char the atlas-ranked text figure holds every text entry to."
      - title: "Selections per second"
        math: "0.3 s flicker + 0.5 s gaze shift = 0.8 s/selection → 1.25 selections/s"
      - title: "Information transfer rate"
        math: "ITR = 4.31 × 1.25 ≈ 5.39 bits/s"
        note: "Reproduces the authors' reported online cue-guided ITR (325.33 bit/min ≈ 5.42 bits/s, the small gap being rounding) — the record EEG-BCI ITR at publication."
referenceCalculationId: comm
---
