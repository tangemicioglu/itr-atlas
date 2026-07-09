---
name: "Brain2voice 2.0: Intracortical Voice Synthesis BCI (Wairagkar et al., 2026)"
year: 2026
modalityTags: ["Intracortical", "Speech"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Wairagkar, Srinivasan, Card, Brandman, Stavisky et al."
  venue: "bioRxiv"
  year: 2026
  doi: "10.64898/2026.06.30.735633"
  url: "https://www.biorxiv.org/content/10.64898/2026.06.30.735633v1"
inputs:
  - symbol: "rate"
    value: "25"
    unit: "word/min"
    sourceNote: "Not reported by the paper as a WPM figure. Measured directly from the 22 benchmark-test-set target (attempted-speech-aligned) audio clips released with the paper: 149 words across 358.1 s = 24.96 word/min. Reflects participant T15's slow, largely one-word-at-a-time cadence from severe ALS dysarthria, distinct from his faster self-paced brain-to-text conversational rate (32–56 wpm; Card et al. 2024, 2026 — same participant, different task)."
  - symbol: "P"
    value: "0.9476"
    sourceNote: "1 − 5.24% word error rate: median WER from naive human listeners transcribing the continuous-acoustic-head synthesized voice on benchmark test trials (this is the paper's primary evaluation output; Results §4.1, Table 1). The tokenized-acoustic-head output scored nearly identically (WER 5.65%)."
  - symbol: "H"
    value: "5.0"
    unit: "bits/word"
    sourceNote: "Shannon per-word entropy of English, the same convention used across the atlas's other free-text/speech entries."
actionSpace:
  kind: continuous
  size: continuous
  prior: context-conditioned
  notes: "Brain2voice 2.0 causally predicts continuous LPCNet acoustic features directly from intracortical activity every 10 ms and vocodes them to a waveform; there is no discrete word- or key-level classification step gating the primary output. (The model also emits an auxiliary phoneme stream — 39 phonemes + silence + blank — and RVQ acoustic tokens, but neither is the evaluated channel: intelligibility is scored by human listeners transcribing the synthesized voice.) With no natural fixed-N action space, a Wolpaw or achieved-bitrate selection bound doesn't soundly apply the way it does for keyboard- or vocabulary-list decoders; the Shannon word-entropy throughput is the only method used here. Evaluated on the same intracortical dataset (BrainGate2 participant T15, four 64-electrode arrays in ventral precentral gyrus) as the entry's predecessor, Wairagkar et al. 2025's instantaneous voice-synthesis neuroprosthesis (WER 43.75%); brain2voice 2.0 is an 8x intelligibility improvement over that prior SOTA on the same benchmark."
references:
  - label: "Wairagkar et al. 2026 (bioRxiv): 'Brain2voice 2.0: High-performance voice synthesis brain-computer interface'"
    url: "https://www.biorxiv.org/content/10.64898/2026.06.30.735633v1"
  - label: "Project page with synthesized voice examples"
    url: "https://neuroprosthetics-lab.github.io/brain2voice2.0"
  - label: "Wairagkar et al. 2025 (Nature): predecessor 'instantaneous voice-synthesis neuroprosthesis', WER 43.75%"
    url: "https://doi.org/10.1038/s41586-025-09127-3"
calculations:
  - id: comm
    method: "Word-entropy throughput (synthesized voice, net of human-listener transcription errors)"
    scoreType: shannon
    kind: "Effective bits actually transmitted as English"
    provenance: recomputed-omitted
    resultBitsPerSecond: 1.97
    steps:
      - title: "Words-per-minute rate (recomputed from released audio)"
        math: "22 benchmark test-set sentences (149 words) released with the paper span 358.1 s of time-aligned target speech → 149 / 358.1 × 60 = 25.0 word/min"
        note: "The paper reports WER and PER but no explicit speaking rate; this rate is measured from the paper's own released target audio, not author-stated."
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.9476 × 25.0 = 23.7 net word/min"
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
        note: "Credits only the information in the English produced, independent of vocabulary size."
      - title: "Information transfer rate"
        math: "23.7 word/min × 5.0 bits/word ÷ 60 s/min = 1.97 bits/s"
referenceCalculationId: comm
---
