---
name: BrainGate Neural Cursor (Hochberg et al., 2006)
year: 2006
modalityTags: ["Intracortical", "Cursor"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Hochberg, Serruya, Friehs, Donoghue et al."
  venue: "Nature 442"
  year: 2006
  doi: "10.1038/nature04970"
  url: "https://doi.org/10.1038/nature04970"
inputs:
  - symbol: "N"
    value: "16"
    sourceNote: "Grid task with 16 square targets, described in the Nature supplementary information."
  - symbol: "grid"
    value: "4x4"
    sourceNote: "The 16 square targets are treated as a 4x4 square grid for the same Fitts grid correction used on Webgrid and ReFIT grid tasks."
  - symbol: "P"
    value: "0.578"
    sourceNote: "MN selected among 16 targets with 57.8 +/- 25.9% accuracy using a 500 ms dwell requirement."
  - symbol: "t"
    value: "5"
    unit: "s/trial"
    sourceNote: "Each grid-task trial expired after 5 seconds. Mean acquisition time was not reported, so this uses the timeout as a conservative timing denominator."
  - symbol: "array"
    value: "96"
    sourceNote: "96-microelectrode intracortical array implanted in primary motor cortex."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "The first widely cited BrainGate human demonstration: a 2D neural cursor used for center-out and grid tasks, simulated email, simple games, television control, prosthetic hand opening/closing and rudimentary robotic-arm control. Because this is a continuous cursor channel, the reference calculation uses a Fitts-style grid correction on the 16-target task. The paper does not publish pixel geometry, endpoint scatter or mean acquisition time for the grid task, so this is an estimated lower-bound-style historical benchmark using the 4x4 grid layout, reported accuracy and 5 s trial timeout. The Wolpaw-over-16 figure is kept as supplementary."
references:
  - label: "Nature supplementary information"
    url: "https://static-content.springer.com/esm/art%3A10.1038%2Fnature04970/MediaObjects/41586_2006_BFnature04970_MOESM1_ESM.pdf"
  - label: "BrainGate publication page"
    url: "https://www.braingate.org/publications/neuronal-ensemble-control-of-prosthetic-devices-by-a-human-with-tetraplegia/"
calculations:
  - id: fitts
    method: "Fitts' law throughput on the 16-target grid task"
    scoreType: fitts
    kind: "2D cursor channel (estimated from grid density)"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.183
    steps:
      - title: "Grid geometry to movement difficulty"
        math: "4x4 board: cell width W = S/4; random grid targets -> mean amplitude A ~= 0.52 S, so A/W ~= 2.1"
        note: "Same grid correction used for Neuralink Webgrid and the ReFIT cursor grid entry. The target is cued, so the movement carries the Fitts index of difficulty, not log2(16)."
      - title: "Information per movement"
        math: "ID = log2(A/W + 1) = log2(2.1 + 1) ~= 1.62 bits/movement"
        note: "The public text does not publish effective target width or endpoint scatter, so this uses nominal grid-cell width."
      - title: "Net movement rate from timeout and accuracy"
        math: "net movements/s = 0.578 / 5 = 0.116/s"
        note: "The paper reports a 5 s trial timeout rather than mean acquisition time. Using the timeout makes this a lower-bound-style estimate."
      - title: "Fitts throughput"
        math: "ITR = 0.183 bits/s"
  - id: wolpaw-grid
    method: "Wolpaw bitrate over N = 16 targets"
    scoreType: wolpaw
    kind: "Discrete-selection grid benchmark"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 0.267
    steps:
      - title: "Per-selection information with errors"
        math: "B = log2(16) + 0.578 log2(0.578) + 0.422 log2(0.422 / 15) = 1.37 bits/selection"
        note: "This uses the standard Wolpaw discrete-selection formula on the 16-target grid result. The task was cued cursor control, so this is best read as a historical benchmark, not text communication."
      - title: "Selection rate from timeout denominator"
        math: "60 / 5 = 12 trials/min"
        note: "The public supplement reports a 5 s trial timeout, not mean acquisition time. Using the timeout for every trial makes the throughput a lower-bound style estimate."
      - title: "Information transfer rate"
        math: "ITR = 0.267 bits/s"
referenceCalculationId: fitts
---
