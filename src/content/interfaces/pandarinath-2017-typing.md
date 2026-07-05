---
name: BrainGate2 Cursor BCI (ReFIT-KF), text entry (Pandarinath et al., 2017)
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
  - symbol: "N"
    value: "28"
    sourceNote: "Keys on the OPTI-II onscreen keyboard, for the raw-key Wolpaw ceiling (uniform prior over the alphabet). This bounds the keyboard selection itself; the underlying cursor channel is the separate BrainGate2 grid entry."
  - symbol: "T_key"
    value: "1.531"
    unit: "s/key"
    sourceNote: "Key-selection interval for the Wolpaw ceiling: 60 / 39.2 char/min = 1.531 s. Accuracy is not reported separately (the 39.2 is correct char/min), so the bound is taken at perfect copy (P=1) as a strict ceiling."
actionSpace:
  kind: fixed-set
  size: 28
  prior: context-conditioned
  notes: "A cursor-driven onscreen keyboard (OPTI-II / QWERTY) from the BrainGate2 pilot clinical trial, with a ReFIT Kalman-filter decoder: the intracortical cursor selects keys one at a time to spell English text. The action set is the ~28 keys, but real English is non-uniform, so the realized information is the character-entropy of the text (~1 bit/char), not log2(keys). The underlying continuous-cursor channel, along with the separate 6×6 grid benchmark that measures its peak bitrate, is the companion entry (BrainGate2 Cursor BCI (ReFIT-KF), pointing). This entry is what the participant actually communicated; that one is the channel benchmark."
references:
  - label: "Open-access full text (eLife)"
    url: "https://elifesciences.org/articles/18554"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.65
    steps:
      - title: "Characters per minute"
        math: "39.2 correct char/min (T5, OPTI-II keyboard, no word prediction) ≈ 7.8 wpm"
        note: "Copy-typing of English sentences in 2-minute blocks: the rate the user actually communicated. Word-completion was deliberately disabled, so this is the raw BCI typing rate; predictive text would raise it."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "39.2 char/min × 1.0 bit/char ÷ 60 s/min = 0.65 bits/s"
  - id: wolpaw-raw
    method: "Wolpaw bitrate over the raw key set"
    scoreType: wolpaw
    kind: "Uniform-prior, perfect-copy ceiling on the key channel"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 28
      accuracy: 1
      secondsPerSelection: 1.531
  - id: achieved
    method: "Achieved bitrate over the raw key set"
    scoreType: achieved
    kind: "Achieved-bitrate view of the key channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 3.11
    steps:
      - title: "Achieved-bitrate credit per net-correct key"
        math: "N = 28 keys → log2(N − 1) = log2(27) = 4.75 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; the namesake Nuyujukian 2015 used log2(N))."
      - title: "Net-correct key rate"
        math: "Accuracy is not reported separately (39.2 is already correct char/min), so this is a perfect-copy ceiling: net-correct = 39.2 char/min = 0.653 correct/s (one key per 1.531 s)."
        note: "Same N (28 keys) and key interval (1.531 s) as the entry's perfect-copy Wolpaw ceiling. With no error term the achieved and Wolpaw ceilings differ only by log2(N − 1) vs log2(N), so both land near 3.1 bits/s: the uniform-prior key channel, above the 0.65 bits/s Shannon headline. The underlying continuous-cursor channel is the companion BrainGate2 grid entry."
      - title: "Achieved bitrate"
        math: "4.75 bits × 0.653 correct/s = 3.11 bits/s."
referenceCalculationId: comm
---
