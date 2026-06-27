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
    unit: "bit/min"
    sourceNote: "Authors' online cue-guided Wolpaw ITR (free-spelling 198.67 bit/min) — the highest ITR reported for an EEG BCI at the time. Counts log2(N) per selection."
actionSpace:
  kind: fixed-set
  size: 40
  prior: context-conditioned
  notes: "Same 40-target SSVEP paradigm as Chen et al. 2015; the decoder classifies which flicker frequency the user gazes at (a classifier, not Fitts pointing). The realized output is English text, so the reference uses character-entropy (~1 bit/char) like every other text entry; the authors' 325 bit/min Wolpaw figure counts log2(N) per selection and is kept as a classifier ceiling. The faster decoder (0.8 s/selection vs ~1 s in Chen 2015) is why the realized rate edges above Chen's."
references:
  - label: "Nakanishi et al. 2018 — open-access PMC copy"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5783827/"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerMin: 67
    steps:
      - title: "Correct characters per minute"
        math: "~75 selections/min (0.3 s flicker + 0.5 s gaze shift) × 89.83% ≈ 67 correct char/min"
        note: "Each selection emits one character; this is the rate of correct English text produced in the cue-guided task (free-spelling is lower)."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 67 × 1.0 ≈ 67 bits/min"
  - id: reported
    method: "Wolpaw bitrate over N = 40 targets (authors' reported ITR)"
    kind: "Classifier ceiling — uniform 1-of-40 choice, over-credits English text"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerMin: 325
    steps:
      - title: "Authors' online ITR"
        math: "325.33 bit/min cue-guided (198.67 bit/min free-spelling) ≈ log2(40)-scale bits per selection × ~75 sel/min"
        note: "Holds the speller to log2(N) per selection versus the 1 bit/char we apply to English text — a ceiling, not the realized rate. It was the record EEG-BCI ITR at publication."
referenceCalculationId: comm
---
