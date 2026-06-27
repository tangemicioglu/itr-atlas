---
name: Stenotype Court Reporting (Ireland Stenotype, 1911)
year: 1911
modalityTags: ["Manual", "Chord keyboard"]
sensingModality: Manual
invasiveness: non-invasive
source:
  authors: "National Court Reporters Association"
  venue: "Registered Professional Reporter certification standard"
  year: 2024
  url: "https://www.ncra.org/certification/NCRA-Certifications/registered-professional-reporter"
inputs:
  - symbol: "rate"
    value: "225"
    unit: "wpm"
    sourceNote: "RPR certification Testimony/Q&A leg: 225 wpm. The higher RMR certification requires up to 260 wpm. This is the throughput benchmark; the system date comes from Stenograph's 1911 Ireland Stenotype history."
  - symbol: "P"
    value: "0.95"
    sourceNote: "95% accuracy required to pass each leg; working reporters typically exceed this."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon)."
actionSpace:
  kind: context-dependent
  size: 30
  prior: context-conditioned
  notes: "A chorded phonetic keyboard: each stroke can capture a whole syllable or word, and a steno theory/dictionary maps strokes to English. The reference counts the resulting English character stream at Shannon entropy. The per-stroke action space (thousands of chords) is much larger than the alphabet, but the transmitted information is bounded by the English text produced."
references:
  - label: "System date: Stenograph history of the 1911 Ireland Stenotype"
    url: "https://www.stenograph.com/history-writers"
  - label: "Throughput benchmark: NCRA RPR certification at 225 wpm and 95% accuracy"
    url: "https://www.ncra.org/certification/NCRA-Certifications/registered-professional-reporter"
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    kind: "Net of English redundancy and transcription errors"
    provenance: recomputed-omitted
    resultBitsPerMin: 1069
    steps:
      - title: "Characters per minute"
        math: "225 wpm × 5 chars/word = 1125 chars/min"
      - title: "Net of errors"
        math: "1125 × 0.95 = 1069 correct chars/min"
        note: "Using the 95% certification accuracy threshold."
      - title: "Information transfer rate"
        math: "ITR = 1069 × 1.0 ≈ 1069 bits/min"
referenceCalculationId: entropy
---
