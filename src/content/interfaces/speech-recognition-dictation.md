---
name: Speech Recognition, transcription (Ruan et al., 2016)
year: 2016
modalityTags: ["Voice", "Speech recognition"]
sensingModality: Voice
invasiveness: non-invasive
source:
  authors: "Ruan, Wobbrock, Liou, Ng & Landay"
  venue: "arXiv:1608.07323 (Stanford HCI)"
  year: 2016
  url: "https://arxiv.org/abs/1608.07323"
inputs:
  - symbol: "rate"
    value: "152.86"
    unit: "wpm"
    sourceNote: "English text-entry rate via speech (Baidu Deep Speech 2) on a smartphone, including time to correct recognition errors. Keyboard baseline was 52.24 wpm; speech was 3.0× faster. This is a transcription (read-aloud) task, at the natural speaking-rate ceiling (~150 wpm); the separate composition (Foley 2020) and early-ASR (Karat 1999) speech entries give other points in the category."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon)."
actionSpace:
  kind: context-dependent
  size: continuous
  prior: context-conditioned
  notes: "Open-vocabulary automatic speech recognition with a language model in the loop. The bits/min uses an English character-entropy proxy on the produced text; the per-utterance action space is effectively unbounded, so this is not a fixed-target selection."
calculations:
  - id: transcription
    method: "Character-entropy throughput"
    kind: "Modern ASR, transcription task (Ruan et al. 2016)"
    provenance: recomputed-omitted
    resultBitsPerMin: 764
    steps:
      - title: "Characters per minute"
        math: "152.86 wpm × 5 chars/word = 764 chars/min"
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
        note: "Recognition WER was 4.37% uncorrected (Deep Speech 2, English). The entry rate already includes error-correction time and participants corrected to near-perfect final text, so net throughput ≈ entry rate — the WER is documented here, not re-applied."
      - title: "Information transfer rate"
        math: "ITR = 764 × 1.0 ≈ 764 bits/min"
referenceCalculationId: transcription
---
