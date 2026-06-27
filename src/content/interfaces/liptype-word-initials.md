---
name: LipType Word-Initial Silent Speech (Su et al., 2025)
year: 2025
modalityTags: ["Video", "Silent speech", "Touch"]
sensingModality: front-facing camera + touchscreen
invasiveness: non-invasive
source:
  authors: "Su, Fang & Rekimoto"
  venue: "ACM CUI 2025"
  year: 2025
  doi: "10.1145/3719160.3736612"
  url: "https://stfang.me/assets/pdf/LipType_CUI_25.pdf"
inputs:
  - symbol: "rate"
    value: "41.6"
    unit: "word/min"
    sourceNote: "Average of the reported LipType text-entry rates in the user study: 42.96 WPM two-handed and 40.23 WPM one-handed. The paper's WPM definition is characters/5 divided by input time, so this is an end-to-end text-entry speed including candidate selection and correction."
  - symbol: "P"
    value: "0.973"
    sourceNote: "1 - 2.69% final uncorrected WER, averaging the reported LipType values: 2.64% two-handed and 2.74% one-handed."
  - symbol: "rawWER"
    value: "0.1889"
    sourceNote: "Raw LipType silent-speech recognizer WER before correction, reported separately in the speech-speed analysis. Speech-only raw WER was 12.23%; the ranked value uses final text-entry WER because the WPM includes correction and candidate interaction."
  - symbol: "H"
    value: "5.0"
    unit: "bits/word"
    sourceNote: "Shannon per-word entropy of English; same word-level convention used for speech and silent-speech text-output entries."
actionSpace:
  kind: context-dependent
  size: continuous
  prior: context-conditioned
  notes: "LipType is a multimodal silent-speech text-entry system from Rekimoto's group. A phone camera captures lip motion while the user silently articulates a phrase and types each word's initial letter; an LLM-conditioned visual speech recognizer proposes candidates, and the user corrects the result. The typed initials and candidate interface are part of the measured channel, so this should be read as a complete multimodal text-entry system rather than bare lip-reading throughput. It is a cleaner atlas entry than the former Diener synthesis because WPM, final WER, raw recognizer WER, and the interaction protocol all come from one paper and one user study."
references:
  - label: "Project/publication page, Shitao Fang"
    url: "https://stfang.me/publications/"
calculations:
  - id: comm
    method: "Word-entropy throughput from measured LipType text entry"
    kind: "Effective English text throughput, measured end-to-end"
    provenance: recomputed-omitted
    resultBitsPerMin: 202
    steps:
      - title: "Measured end-to-end text-entry rate"
        math: "(42.96 + 40.23) / 2 = 41.6 word/min"
        note: "The paper defines WPM as characters/5 over input time, including the interaction cost of candidate selection and correction."
      - title: "Apply final uncorrected word accuracy"
        math: "P = 1 - ((2.64% + 2.74%) / 2) = 0.973; 41.6 x 0.973 = 40.5 net word/min"
        note: "This uses final uncorrected WER from the text-entry study, not the raw pre-correction VSR output."
      - title: "Information transfer rate"
        math: "ITR = 40.5 x 5.0 = 202 bits/min"
        note: "Raw recognizer WER before correction was much higher (18.89%), so this should be read as a complete text-entry interface, not bare lip-reading throughput."
  - id: raw-vsr-context
    method: "Raw silent-speech recognizer context"
    kind: "Pre-correction recognizer-only context, not ranked"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerMin: 169
    steps:
      - title: "Use the same speech-entry rate with raw recognizer WER"
        math: "41.6 x (1 - 0.1889) = 33.7 net word/min"
        note: "The paper reports raw LipType WER before correction as 18.89% +/- 10.60%."
      - title: "Information transfer rate"
        math: "ITR = 33.7 x 5.0 = 169 bits/min"
        note: "Kept to show the pre-correction recognizer operating point separately from the full text-entry interface."
referenceCalculationId: comm
---
