---
name: Sensorimotor-Rhythm 2D Cursor BCI (Wolpaw & McFarland, 2004)
year: 2004
modalityTags: ["EEG", "Motor imagery", "Cursor"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Wolpaw & McFarland"
  venue: "PNAS 101(51)"
  year: 2004
  doi: "10.1073/pnas.0403504101"
  url: "https://doi.org/10.1073/pnas.0403504101"
inputs:
  - symbol: "N"
    value: "8"
    sourceNote: "Eight target locations on the screen periphery; the user drove a cursor from the center to a block-randomized target via sensorimotor-rhythm (mu/beta) modulation, i.e. continuous 2D control, not a discrete classifier."
  - symbol: "MT"
    value: "2.75"
    unit: "s"
    sourceNote: "Mean movement time to reach a target, averaged over the four users (individual means 1.9, 3.9, 3.3, 1.9 s). Best users reached targets in ~1.9 s."
  - symbol: "W"
    value: "4.9"
    unit: "% of workspace"
    sourceNote: "Target size as a fraction of the workspace (the paper's precision figure); exact pixel geometry was not published, so the amplitude/width ratio below is an estimate."
  - symbol: "P"
    value: "0.82"
    sourceNote: "Mean fraction of targets reached within the 10 s allowed, averaged over users (89%, 70%, 78%, 92%)."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "A continuous 2D cursor driven by sensorimotor-rhythm modulation (left/right-hand and rest motor imagery): the canonical non-invasive cursor BCI, and the paper that showed scalp EEG can approach invasive cursor control. The paper reports an eight-target center-out task, so the reference follows the Wolpaw-style target-acquisition estimate over those cued endpoints. The Fitts estimate is kept as a geometry-based check, but the paper does not publish pixel geometry or endpoint scatter, so that calculation rests on inferred target size and amplitude."
references:
  - label: "Wolpaw & McFarland 2004: open-access PMC copy"
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC535103/"
calculations:
  - id: fitts
    method: "Fitts' law throughput (estimated from the task conditions)"
    scoreType: fitts
    kind: "2D cursor channel (apples-to-apples with the mouse and the cursor BCIs)"
    provenance: recomputed-omitted
    resultBitsPerSecond: 1
    steps:
      - title: "Information per movement (index of difficulty)"
        math: "ID = log2(A/W + 1); target W ≈ 4.9% of workspace, amplitude A ≈ 45% (center to periphery) → A/W ≈ 9.2 → ID ≈ 3.35 bits/movement"
        note: "ESTIMATE: the paper reports size/precision as a fraction of the workspace but not pixel geometry, so A/W is inferred from the center-out layout. This is one of two load-bearing assumptions in the entry."
      - title: "Throughput = information ÷ movement time"
        math: "mean MT ≈ 2.75 s → TP ≈ 3.35 / 2.75 ≈ 1.22 bits/s (best users ~1.8 bits/s at MT ≈ 1.9 s)"
      - title: "Discount for completion rate"
        math: "× 0.82 (mean fraction of targets reached within the 10 s limit) → ≈ 1.00 bits/s"
        note: "This is a COMPLETION discount, not a Fitts effective-width adjustment: the paper publishes no endpoint scatter (SDx), so the index of difficulty uses nominal width and the 82% is targets reached in time, not a spatial-miss rate. Accuracy is therefore folded as a simple throughput multiplier (the same fallback used for the Neuralink cursor), not via the standard We = 4.133·SDx."
  - id: wolpaw
    method: "Wolpaw / achieved-bitrate over the 8 cued targets"
    scoreType: wolpaw
    kind: "Discrete-selection figure, UNDER-counts the continuous cursor (only 8 targets)"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 8
      accuracy: 0.82
      secondsPerSelection: 2.75
referenceCalculationId: wolpaw
---
