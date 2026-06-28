---
name: Synchron Stentrode, switch (Oxley et al., 2021)
year: 2021
modalityTags: ["Endovascular", "Switch"]
sensingModality: Endovascular
invasiveness: partially-invasive
source:
  authors: "Oxley, Yoo, Opie et al. (first-in-human study)"
  venue: "J. NeuroInterventional Surgery 13(2)"
  year: 2021
  doi: "10.1136/neurintsurg-2020-016862"
  url: "https://doi.org/10.1136/neurintsurg-2020-016862"
inputs:
  - symbol: "N"
    value: "28"
    sourceNote: "On-screen keyboard targets reached with the switch (letters + space + edits, approx.)"
  - symbol: "rate"
    value: "13.81"
    unit: "char/min"
    sourceNote: "Participant 1 correct characters/min, predictive text disabled (first-in-human typing task; Participant 2 reached 20.10 cpm)"
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); the task produced English text, so the same ~1 bit/char standard used for QWERTY, eye-typing and the ReFIT typing entry applies."
  - symbol: "P"
    value: "0.9263"
    sourceNote: "Participant 1 average click-selection accuracy, 92.63% (first-in-human typing task)"
actionSpace:
  kind: context-dependent
  size: 28
  prior: context-conditioned
  notes: "Credit-assignment caveat: the endovascular electrode supplies a switch signal; spatial pointing is supplied by an eye-tracker, and a scanning/keyboard interface gates the targets. This per-character figure therefore measures the complete assistive stack rather than the endovascular signal alone. Because the task produced English text under a context-conditioned prior, the reference number uses the same character-entropy method as the other text-entry entries (~1 bit/char); the Wolpaw-over-28-targets figure, which assumes a uniform 1-of-28 choice, is kept only as a secondary selection metric."
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.233
    steps:
      - title: "Characters per minute"
        math: "13.81 correct char/min (Participant 1, predictive text disabled; P2 reached 20.10 cpm)"
        note: "The eye-tracker supplies the pointing and the endovascular electrode supplies the click; this is the rate of English text actually produced. The same char-entropy method as QWERTY, eye-typing and the ReFIT typing entry."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 0.233 bits/s"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 28 keyboard targets"
    kind: "Uniform-prior selection metric, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 28
      accuracy: 0.9263
      secondsPerSelection: 4.34468
referenceCalculationId: comm
references:
  - label: "Mitchell et al. 2023 (JAMA Neurology): SWITCH trial 4-patient safety outcomes"
    url: "https://doi.org/10.1001/jamaneurol.2022.4847"
---
