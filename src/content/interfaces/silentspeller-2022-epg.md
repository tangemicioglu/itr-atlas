---
name: SilentSpeller (Kimura et al., 2022)
year: 2022
modalityTags: ["Electropalatography", "Silent speech"]
sensingModality: Electropalatography
invasiveness: non-invasive
source:
  authors: "Kimura, Gemicioglu, Womack, Zhao, Li, Bedri, Su, Olwal, Rekimoto & Starner"
  venue: "ACM CHI 2022"
  year: 2022
  doi: "10.1145/3491102.3502015"
  url: "https://doi.org/10.1145/3491102.3502015"
inputs:
  - symbol: "N"
    value: "1164"
    sourceNote: "1,164-word dictionary the speller decodes against"
  - symbol: "P"
    value: "0.87"
    sourceNote: "Live word accuracy averaged over 7 participants, at 37 wpm. Offline isolated-word character accuracy was 97% on the dictionary; an earlier eval reached 53 wpm at 90%."
  - symbol: "rate"
    value: "37"
    unit: "word/min"
    sourceNote: "Live text-entry speed, 7-participant average (a real measured rate, unlike most silent-speech recognizers)"
actionSpace:
  kind: fixed-set
  size: 1164
  prior: context-conditioned
  notes: "An oral wearable (dental retainer with capacitive touch sensors) tracks tongue contact to spell words letter by letter, decoded against a 1,164-word dictionary. The dictionary constraint plus a language model make the per-word prior context-conditioned rather than uniform."
references:
  - label: "Author copy (PDF)"
    url: "https://tangemicioglu.com/files/papers/SilentSpeller_CHI_2022.pdf"
calculations:
  - id: comm
    method: "Word-entropy throughput"
    kind: "Effective bits as English (measured rate)"
    provenance: recomputed-omitted
    resultBitsPerMin: 161
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.87 × 37 = 32.2 net word/min"
        note: "37 wpm is a real measured live rate, unlike the assumed-rate silent-speech entries."
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
      - title: "Information transfer rate"
        math: "ITR = 32.2 × 5.0 ≈ 161 bits/min"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 1,164 words"
    kind: "Uniform-prior comparison metric (measured rate)"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 1164
      accuracy: 0.87
      secondsPerSelection: 1.62162
referenceCalculationId: comm
---
