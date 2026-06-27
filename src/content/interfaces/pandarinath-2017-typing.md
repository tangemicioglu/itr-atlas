---
name: ReFIT Cursor BCI, text entry (Pandarinath et al., 2017)
year: 2017
modalityTags: ["Intracortical", "Keyboard"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Pandarinath, Nuyujukian, Henderson, Shenoy et al."
  venue: "eLife 6:e18554"
  year: 2017
  doi: "10.7554/eLife.18554"
  url: "https://doi.org/10.7554/eLife.18554"
inputs:
  - symbol: "rate"
    value: "39.2"
    unit: "correct char/min"
    sourceNote: "Best sustained copy-typing rate: participant T5 on the OPTI-II onscreen keyboard, NO word-completion or prediction (T5 QWERTY 36.1; T6 OPTI-II 31.6; T7 ABCDEF 13.5). ≈7.8 wpm. This copy-typing of English sentences is the paper's real-world communication task."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); participants copy-typed English sentences, so the same ~1 bit/char standard used for QWERTY, eye-typing and Morse applies."
actionSpace:
  kind: fixed-set
  size: 28
  prior: context-conditioned
  notes: "A cursor-driven onscreen keyboard (OPTI-II / QWERTY): the intracortical cursor selects keys one at a time to spell English text. The action set is the ~28 keys, but real English is non-uniform, so the realized information is the character-entropy of the text (~1 bit/char), not log2(keys). The underlying continuous-cursor channel — and the separate 6×6 grid benchmark that measures its peak bitrate — is the companion entry (ReFIT Cursor BCI, pointing). This entry is what the participant actually communicated; that one is the channel benchmark."
references:
  - label: "Open-access full text (eLife)"
    url: "https://elifesciences.org/articles/18554"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerMin: 39
    steps:
      - title: "Characters per minute"
        math: "39.2 correct char/min (T5, OPTI-II keyboard, no word prediction) ≈ 7.8 wpm"
        note: "Copy-typing of English sentences in 2-minute blocks — the rate the user actually communicated. Word-completion was deliberately disabled, so this is the raw BCI typing rate; predictive text would raise it."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 39.2 × 1.0 ≈ 39 bits/min"
referenceCalculationId: comm
---
