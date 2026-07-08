---
name: Eye-Tracking Keyboard, dwell (Majaranta et al., 2009)
year: 2009
modalityTags: ["Eye", "Gaze"]
sensingModality: Eye
invasiveness: non-invasive
source:
  authors: "Majaranta, Ahola & Špakov"
  venue: "ACM CHI 2009"
  year: 2009
  doi: "10.1145/1518701.1518758"
  url: "https://doi.org/10.1145/1518701.1518758"
inputs:
  - symbol: "rate"
    value: "19.9"
    unit: "wpm"
    sourceNote: "Best (session 10) entry rate in a 10-session longitudinal study; first session was 6.9 wpm. Adjustable dwell fell from 876 ms to 282 ms."
  - symbol: "P"
    value: "0.9964"
    sourceNote: "1 − 0.36% error rate at session 10 (1.28% at session 1)"
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon)."
  - symbol: "N"
    value: "30"
    sourceNote: "On-screen keys, for the raw-key Wolpaw ceiling (uniform prior over the alphabet). The headline Shannon figure uses English entropy instead."
  - symbol: "T_key"
    value: "0.603"
    unit: "s/key"
    sourceNote: "Gross dwell-selection interval for the Wolpaw ceiling: 60 / (19.9 wpm × 5) = 0.603 s. The bare gaze-pointing Fitts channel is a separate entry (Eye-Gaze Pointing), not duplicated here."
actionSpace:
  kind: fixed-set
  size: 30
  prior: context-conditioned
  notes: "An on-screen keyboard selected by gaze dwell. The reference counts the English character stream at Shannon entropy (consistent with the other typing entries); a predictive layout that reorders keys by likelihood would change the per-selection information. The bare eye-gaze pointing channel underneath (Fitts throughput) is a separate entry (Eye-Gaze Pointing); this entry is its realized text output, the same channel-vs-application split as the BrainGate2 cursor BCI."
calculations:
  - id: entropy
    method: "Character-entropy throughput"
    scoreType: shannon
    kind: "Net of English redundancy and dwell errors"
    provenance: recomputed-omitted
    resultBitsPerSecond: 1.65
    steps:
      - title: "Net words per minute"
        math: "19.9 wpm × (1 − 0.0036) = 19.83 net wpm"
      - title: "Characters per minute"
        math: "19.83 × 5 chars/word = 99.1 chars/min"
      - title: "Information transfer rate"
        math: "99.1 char/min × 1.0 bit/char ÷ 60 s/min = 1.65 bits/s"
  - id: wolpaw-raw
    method: "Wolpaw bitrate over the raw key set"
    scoreType: wolpaw
    kind: "Uniform-prior ceiling on the dwell-key channel, before English redundancy"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 30
      accuracy: 0.9964
      secondsPerSelection: 0.603
  - id: achieved
    method: "Nuyujukian achieved bitrate over the raw key set"
    scoreType: nuyujukian
    kind: "Achieved-bitrate view of the dwell-key channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 8
    steps:
      - title: "Achieved-bitrate credit per net-correct key"
        math: "N = 30 keys → log2(N − 1) = log2(29) = 4.86 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; Nuyujukian 2015, which introduced the metric, used log2(N))."
      - title: "Net-correct key rate"
        math: "net-correct = 2P − 1 = 2(0.9964) − 1 = 0.993 of keys. At 0.603 s/key → 0.993 / 0.603 = 1.65 correct/s."
        note: "A dwell error commits the wrong key rather than timing out, so incorrect = 1 − P. Same N (30 keys), accuracy (99.64%) and key interval (0.603 s) as the entry's raw-key Wolpaw ceiling, and lands on the same ~8 bits/s. Both are the uniform-prior key channel before English redundancy, far above the 1.65 bits/s Shannon headline that holds this entry to the realized text."
      - title: "Achieved bitrate"
        math: "4.86 bits × 1.65 correct/s = 8.0 bits/s."
referenceCalculationId: entropy
---
