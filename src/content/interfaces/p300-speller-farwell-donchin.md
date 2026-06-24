---
name: P300 Matrix Speller
year: 1988
modalityTags: ["EEG", "P300"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Farwell & Donchin"
  venue: "Electroencephalogr. Clin. Neurophysiol. 70(6)"
  year: 1988
  doi: "10.1016/0013-4694(88)90149-6"
  url: "https://doi.org/10.1016/0013-4694(88)90149-6"
inputs:
  - symbol: "N"
    value: "36"
    sourceNote: "6×6 character matrix"
  - symbol: "P"
    value: "0.88"
    sourceNote: "Representative online accuracy"
  - symbol: "t_sel"
    value: "13"
    unit: "s"
    sourceNote: "Time per selection at the cited accuracy"
actionSpace:
  kind: fixed-set
  size: 36
  prior: uniform
  notes: "6×6 character matrix, assumed equiprobable. The supplementary confusion-matrix figure relaxes the symmetric-error assumption but still treats the prior as uniform."
calculations:
  - id: wolpaw
    method: "Wolpaw bitrate over N = 36 targets"
    kind: "Theoretical upper bound"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 36
      accuracy: 0.88
      secondsPerSelection: 13
  - id: confusion
    method: "Confusion-matrix mutual information"
    kind: "Nykopp method"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: confusion-mi
      matrix: [[44, 6], [7, 43]]
      secondsPerSelection: 13
referenceCalculationId: wolpaw
---

The original P300 speller. Slow but robust; the supplementary confusion-matrix figure is a
two-class illustration, not the full 36×36 matrix.
