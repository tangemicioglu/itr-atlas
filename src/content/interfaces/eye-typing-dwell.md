---
name: Eye-Tracking Keyboard (dwell)
modalityTags: ["Eye", "Gaze"]
sensingModality: Eye
invasiveness: non-invasive
source:
  authors: "Majaranta et al."
  venue: "CHI"
  year: 2009
  doi: "10.1145/1518701.1518758"
  url: "https://doi.org/10.1145/1518701.1518758"
inputs:
  - symbol: "N"
    value: "29"
    sourceNote: "On-screen keyboard keys (letters + space + edits)"
  - symbol: "P"
    value: "0.95"
    sourceNote: "Representative selection accuracy"
  - symbol: "t_sel"
    value: "1.2"
    unit: "s"
    sourceNote: "Dwell + saccade per key"
actionSpace:
  kind: fixed-set
  size: 29
  prior: uniform
  notes: "On-screen keyboard keys, assumed equiprobable. A predictive layout that reorders keys by likelihood would make the prior non-uniform and change the bits per selection."
calculations:
  - id: wolpaw
    method: "Wolpaw bitrate over N = 29 keys"
    kind: "Theoretical upper bound"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 29
      accuracy: 0.95
      secondsPerSelection: 1.2
referenceCalculationId: wolpaw
---

Dwell-based gaze typing. Throughput is dominated by the dwell time chosen to avoid misclicks.
