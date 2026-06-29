---
name: Speech Recognition, composition (Foley et al., 2020)
year: 2020
modalityTags: ["Voice", "Speech recognition"]
sensingModality: Voice
invasiveness: non-invasive
source:
  authors: "Foley, Casiez & Vogel"
  venue: "ACM CHI 2020"
  year: 2020
  doi: "10.1145/3313831.3376861"
  url: "https://doi.org/10.1145/3313831.3376861"
inputs:
  - symbol: "rate"
    value: "117"
    unit: "wpm"
    sourceNote: "Speech rate composing original text by voice on a Google Pixel 3 with the default recognizer; touchscreen typing in the same composition task was 35 wpm. Composition is slower than read-aloud transcription because the user is also deciding what to say."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon)."
actionSpace:
  kind: context-dependent
  size: continuous
  prior: context-conditioned
  notes: "Open-vocabulary ASR with a language model in the loop, scored on composed (not read-aloud) text. The bits/s figure uses an English character-entropy proxy; the per-utterance action space is effectively unbounded, so this is not a fixed-target selection."
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    scoreType: shannon
    kind: "Modern ASR, composition task"
    provenance: recomputed-omitted
    resultBitsPerSecond: 9.75
    steps:
      - title: "Characters per minute"
        math: "117 wpm × 5 chars/word = 585 chars/min"
        note: "Residual uncorrected error of the final composed text was ~0.5–0.65% (speech had a lower error rate than touchscreen typing). The 117 wpm is net of correction time, so the error is documented here, not re-applied."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "585 char/min × 1.0 bit/char ÷ 60 s/min = 9.75 bits/s"
referenceCalculationId: entropy
---
