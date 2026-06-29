---
name: Speech Recognition, early ASR (Karat et al., 1999)
year: 1999
modalityTags: ["Voice", "Speech recognition"]
sensingModality: Voice
invasiveness: non-invasive
source:
  authors: "Karat, Halverson, Horn & Karat"
  venue: "ACM CHI 1999"
  year: 1999
  doi: "10.1145/302979.303160"
  url: "https://doi.org/10.1145/302979.303160"
inputs:
  - symbol: "rate"
    value: "25"
    unit: "wpm"
    sourceNote: "Effective transcription rate AFTER error correction for experienced users on late-1990s large-vocabulary continuous dictation; raw dictation was ~107 wpm before correction. New users averaged ~14 wpm transcribing and ~8 wpm composing."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon)."
actionSpace:
  kind: context-dependent
  size: continuous
  prior: context-conditioned
  notes: "Late-1990s desktop ASR (IBM ViaVoice / Dragon era). Recognition errors were frequent, so correction time dominated: ~107 wpm raw dictation collapsed to ~25 wpm effective. This is the historical floor that modern deep-learning ASR (see the 2016 transcription and 2020 composition speech entries) later lifted ~6×."
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    scoreType: shannon
    kind: "Early ASR, corrected transcription"
    provenance: recomputed-omitted
    resultBitsPerSecond: 2.08
    steps:
      - title: "Characters per minute"
        math: "25 wpm (corrected) × 5 chars/word = 125 chars/min"
        note: "Recognition errors were frequent: raw dictation ran ~105–107 wpm but correction cut the effective rate to ~25 wpm. The error shows up here as that correction overhead rather than a published WER%, and it is already in the corrected rate, not re-applied."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 2.08 bits/s"
referenceCalculationId: entropy
---
