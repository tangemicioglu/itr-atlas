---
name: AlterEgo (Kapur et al., 2018)
year: 2018
modalityTags: ["sEMG", "Silent speech"]
sensingModality: sEMG
invasiveness: non-invasive
source:
  authors: "Kapur, Kapur & Maes"
  venue: "ACM IUI 2018"
  year: 2018
  doi: "10.1145/3172944.3172977"
  url: "https://www.media.mit.edu/publications/alterego-IUI/"
inputs:
  - symbol: "N"
    value: "20"
    sourceNote: "~20-word application vocabulary (digit/command recognition task)"
  - symbol: "P"
    value: "0.92"
    sourceNote: "Median word accuracy across application datasets"
  - symbol: "rate"
    value: "100"
    unit: "word/min"
    sourceNote: "Reported >100 word/min throughput — but from the follow-on continuous-AlterEgo system (Wadkins, MIT MEng thesis 2019), not this IUI 2018 paper, which reports ~200 bits/min on a 15-phrase set (~0.8 acc) and the ~20-word command task used here. 100 is taken as the conservative floor of that >100 wpm figure."
actionSpace:
  kind: fixed-set
  size: 20
  prior: uniform
  notes: "A small, roughly balanced closed vocabulary (digits / commands) decoded from facial sEMG. With a near-uniform 20-class set this behaves like a genuine fixed-target selection, so unlike the large-vocabulary speech systems it is reasonably comparable to a 20-target speller — though it is silent internal articulation, not overt selection. Note on the headline: its bits/min comes from fast selection among only ~20 commands, so although it lands near the open-vocabulary silent-speech systems (e.g. Meltzner's 2,200-word recogniser at ~456), it expresses far less. A 110× larger vocabulary raises the per-selection ceiling only from log2(20)≈4.3 to log2(2,200)≈11 bits — and for natural English the realistic content is ~5 bits/word regardless of dictionary size. Vocabulary buys expressivity, not proportional throughput; this is exactly why bits/min alone can mislead. Unlike the offline EMG recognizers (Jou, Meltzner), AlterEgo's >100 wpm rate is actually demonstrated — though in the follow-on continuous system, not this paper."
references:
  - label: "Wadkins 2019 — continuous AlterEgo system (MIT MEng thesis), source of the >100 wpm rate"
    url: "https://dspace.mit.edu/handle/1721.1/123121"
calculations:
  - id: wolpaw
    method: "Wolpaw bitrate over N = 20 words"
    kind: "Per-word throughput"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 20
      accuracy: 0.92
      secondsPerSelection: 0.6
referenceCalculationId: wolpaw
---
