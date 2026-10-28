---
name: Neuralink VOICE Speech BCI (Pouratian et al., 2026)
year: 2026
modalityTags: ["Intracortical", "Speech"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Pouratian, Mills, Mupambo, Granatir, Albrecht & Amadio"
  venue: "Muscle & Nerve: Proceedings of the 25th Annual Meeting of the Northeast ALS Consortium (abstract)"
  year: 2026
  doi: "10.1002/mus.70436"
  url: "https://doi.org/10.1002/mus.70436"
inputs:
  - symbol: "N"
    value: "125000"
    sourceNote: "125,000-word open vocabulary used in the structured open-vocabulary evaluation (Results)"
  - symbol: "rate"
    value: "75"
    unit: "word/min"
    sourceNote: "Participant 3 (first-in-human 3,072-channel N1 array), reached in under a week post-implant (Results). The abstract does not say whether this is a peak or a session average. Participant 2 (1,020 channels) reached 54 wpm on the same evaluation."
  - symbol: "P"
    value: "0.942"
    sourceNote: "1 − 5.8% word error rate for participant 3 on the 125,000-word evaluation (Results). Participant 2: 6.6% WER. Participant 1: 45 wpm at 7% WER, but on a 220-word vocabulary, so not comparable."
actionSpace:
  kind: context-dependent
  size: 125000
  prior: context-conditioned
  notes: "First-in-human VOICE trial of the fully implanted, wireless Neuralink N1 decoding attempted speech from left-hemisphere speech motor cortex (ventral premotor and adjacent speech/language regions) in three adults with ALS. Same large-vocabulary, language-model-mediated structure as the other free-speech BCIs: 125k words nominally, but the decoder reweights candidates by context (the abstract also describes a multi-participant foundation model and conversational/personal-context conditioning), so the uniform-prior Wolpaw figure is not directly comparable to the atlas English-output convention. Source is a conference abstract: no methods detail on the evaluation task (prompted vs. free), the number of sentences, or whether 75 wpm / 5.8% WER is a best session or a sustained average, so this is an early operating point rather than a peer-reviewed sustained rate."
references:
  - label: "Proceedings of the 25th Annual NEALS Meeting, Muscle & Nerve (Wiley Online Library)"
    url: "https://onlinelibrary.wiley.com/doi/full/10.1002/mus.70436"
calculations:
  - id: comm
    method: "Word-entropy throughput"
    scoreType: shannon
    kind: "Effective bits actually transmitted as English"
    provenance: recomputed-omitted
    resultBitsPerSecond: 5.89
    steps:
      - title: "Error-corrected words per minute"
        math: "(1 − WER) × rate = 0.942 × 75 = 70.7 net word/min"
        note: "Participant 3's open-vocabulary operating point. Participant 2's 54 wpm at 6.6% WER gives 50.4 net word/min → 4.20 bits/s on the same basis."
      - title: "Shannon per-word entropy of English"
        math: "H ≈ 5.0 bits/word"
        note: "Credits only the information in the English produced, independent of vocabulary size."
      - title: "Information transfer rate"
        math: "70.7 word/min × 5.0 bits/word ÷ 60 s/min = 5.89 bits/s"
  - id: wolpaw
    method: "Wolpaw mutual information over N = 125,000 words"
    scoreType: wolpaw
    kind: "Per-word mutual information under uniform-prior Wolpaw assumptions"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 125000
      accuracy: 0.942
      secondsPerSelection: 0.8
  - id: achieved
    method: "Nuyujukian achieved bitrate over the 125,000-word vocabulary"
    scoreType: nuyujukian
    kind: "Large-vocabulary capacity view, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 18.7
    steps:
      - title: "Achieved-bitrate credit per net-correct word"
        math: "N = 125,000 → log2(N − 1) = log2(124,999) ≈ 16.93 bits per net-correct selection (Nuyujukian 2015, which introduced the metric, used log2(N); at this N the difference is negligible)."
      - title: "Net-correct word rate"
        math: "net-correct = 2P − 1 = 2(0.942) − 1 = 0.884 of words. At 75 word/min (0.8 s/word) → 0.884 × 75 / 60 = 1.105 correct/s."
        note: "A word error commits the wrong word rather than timing out, so incorrect = 1 − P. Same N (125,000), word accuracy (94.2%) and rate (75 wpm) as the entry's Wolpaw calc. As that calc's own caveat notes, the 125k-word vocabulary is context-reweighted by the language model each step, so feeding it into log2(N − 1) is a large-vocabulary capacity view (~17 bits/word) — raw channel capacity, not communication, analogous to the nagel code-space figure. The ranked communication rate is the 5.89 bits/s word-entropy Shannon."
      - title: "Achieved bitrate"
        math: "16.93 bits × 1.105 correct/s = 18.7 bits/s."
referenceCalculationId: comm
---
