---
name: Real-Time EMG-to-Speech (Diener & Schultz, 2018)
year: 2018
modalityTags: ["sEMG", "Silent speech"]
sensingModality: sEMG
invasiveness: non-invasive
source:
  authors: "Diener & Schultz"
  venue: "Interspeech 2018 (Cognitive Systems Lab, U. Bremen)"
  year: 2018
  url: "https://www.csl.uni-bremen.de/cms/images/documents/publications/IS2018_EMG_Realtime.pdf"
inputs:
  - symbol: "rate"
    value: "147"
    unit: "word/min"
    sourceNote: "SYNTHESIZED, but online-grounded: the Schultz-lab real-time EMG-to-speech system runs at real-time factor ≈1 (79 ms end-to-end latency), so its throughput is the articulation tempo itself, not an offline batch assumption. Utterances average 4.09 s (Diener & Schultz 2018); Broadcast-News read sentences are ≈10 words, giving ≈147 wpm natural read tempo. The tempo is the soft input here — the online operation is what justifies treating it as a real rate rather than a ceiling."
  - symbol: "P"
    value: "0.517"
    sourceNote: "1 − 48.29% word error rate: the EMG-UKA session-dependent SILENT-mode WER (Wand, Janke & Schultz 2014, Table 4), the realistic silent-articulation recognition accuracy — far below the 26.9% audible-mode WER. This is the honest anchor: silent EMG recognition is hard."
  - symbol: "H"
    value: "5.0"
    unit: "bits/word"
    sourceNote: "Shannon per-word entropy of English; the same per-word standard applied to the other silent-speech entries."
references:
  - label: "Wand, Janke & Schultz 2014 — the EMG-UKA corpus (source of the 48.29% silent-mode WER)"
    url: "https://www.csl.uni-bremen.de/cms/images/documents/publications/WandJankeSchultz_IS14_EMG-UKA-Corpus.pdf"
actionSpace:
  kind: context-dependent
  size: continuous
  prior: context-conditioned
  notes: "Tanja Schultz's lab is the foundation of EMG-based silent speech, and this entry synthesizes a realized rate from two of its studies. The real-time EMG-to-speech system (Diener & Schultz 2018) converts facial sEMG to audible speech online — real-time factor ≈1, 79 ms latency — establishing that the channel genuinely operates at speaking tempo, not as an offline batch recognizer. The recognition accuracy comes from the EMG-UKA corpus (Wand, Janke & Schultz 2014): in the realistic silent-articulation mode, session-dependent WER is 48.29% — dramatically worse than the closed-vocabulary numbers the other EMG entries report, and the reason this lands well below them despite a fast tempo. Because the rate is grounded in a demonstrably online system rather than a round assumption, it is ranked rather than treated as a ceiling — but the articulation tempo (≈147 wpm) is the soft input, so read the result as order-of-magnitude. Unlike the offline EMG recognizers (Jou, Meltzner) this is online; unlike the closed-vocab systems, its accuracy reflects open silent speech."
calculations:
  - id: comm
    method: "Word-entropy throughput (online rate × measured silent-mode accuracy)"
    kind: "Net of English redundancy, synthesized from Schultz-lab online operation + EMG-UKA silent WER"
    provenance: recomputed-omitted
    resultBitsPerMin: 380
    steps:
      - title: "Online articulation rate"
        math: "real-time factor ≈ 1 (79 ms latency); 4.09 s/utterance × ~10 words ≈ 147 word/min natural read tempo"
        note: "The real-time system runs at speaking tempo, so throughput = articulation rate. Tempo is the soft input."
      - title: "Discount by measured silent-mode accuracy"
        math: "× (1 − 0.4829) = × 0.517 → 147 × 0.517 ≈ 76 net correct word/min"
        note: "48.29% WER is the EMG-UKA session-dependent silent-mode recognition error (Wand, Janke & Schultz 2014) — the realistic accuracy for open silent EMG speech."
      - title: "Information transfer rate"
        math: "ITR = 76 × 5.0 ≈ 380 bits/min"
        note: "Optimistic in that it does not charge for correcting the ~48% of words that are wrong; the high WER, not the tempo, is the honest story of silent EMG."
referenceCalculationId: comm
---
