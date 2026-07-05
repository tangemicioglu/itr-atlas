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
    sourceNote: "English-text entropy (Shannon); the task produced English text, so the same ~1 bit/char standard used for QWERTY, eye-typing and the BrainGate2 typing entry applies."
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
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.23
    steps:
      - title: "Characters per minute"
        math: "13.81 correct char/min (Participant 1, predictive text disabled; P2 reached 20.10 cpm)"
        note: "The eye-tracker supplies the pointing and the endovascular electrode supplies the click; this is the rate of English text actually produced. The same char-entropy method as QWERTY, eye-typing and the BrainGate2 typing entry."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "13.81 char/min × 1.0 bit/char ÷ 60 s/min = 0.23 bits/s"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 28 keyboard targets"
    scoreType: wolpaw
    kind: "Uniform-prior selection metric, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 28
      accuracy: 0.9263
      secondsPerSelection: 4.34468
  - id: achieved
    method: "Achieved bitrate over N = 28 keyboard targets"
    scoreType: achieved
    kind: "Achieved-bitrate view of the selection channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 0.93
    steps:
      - title: "Achieved-bitrate credit per net-correct selection"
        math: "N = 28 → log2(N − 1) = log2(27) = 4.75 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; Nuyujukian 2015, which introduced the metric, used log2(N))."
      - title: "Net-correct selection rate"
        math: "net-correct = 2P − 1 = 2(0.9263) − 1 = 0.853 of selections. At 4.34 s/selection → 0.853 / 4.34 = 0.196 correct/s."
        note: "A wrong click commits the wrong key rather than timing out, so incorrect = 1 − P. Same N (28), Participant 1 click accuracy (92.63%) and selection interval (4.34 s) as the entry's Wolpaw calc; netting each wrong click against a correct one (2P − 1) lands just under the ~0.94 bits/s Wolpaw figure. Like it, this measures the whole assistive stack (eye-tracker pointing + endovascular click), not the endovascular signal alone."
      - title: "Achieved bitrate"
        math: "4.75 bits × 0.196 correct/s = 0.93 bits/s."
referenceCalculationId: comm
references:
  - label: "Mitchell et al. 2023 (JAMA Neurology): SWITCH trial 4-patient safety outcomes"
    url: "https://doi.org/10.1001/jamaneurol.2022.4847"
---
