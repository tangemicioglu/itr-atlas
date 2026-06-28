---
name: Head-Tracking Pointing (Ballard & Stockman, 1995)
year: 1995
modalityTags: ["Head", "Pointing"]
sensingModality: Head
invasiveness: non-invasive
source:
  authors: "Hansen, Rajanna, MacKenzie & Bækgaard"
  venue: "COGAIN @ ETRA 2018"
  year: 2018
  doi: "10.1145/3206343.3206344"
  url: "https://doi.org/10.1145/3206343.3206344"
inputs:
  - symbol: "TP"
    value: "2.472"
    unit: "bits/s"
    sourceNote: "Fitts' law throughput for head pointing on a head-mounted display, computed per ISO 9241-9 (effective width). Same study, same task: eye-gaze pointing 2.127 bits/s, mouse 3.239 bits/s. The system date follows Ballard & Stockman's 1995 facial-aspect computer-control paper; the throughput is measured in the 2018 HMD study."
  - symbol: "MT"
    value: "850"
    unit: "ms"
    sourceNote: "Mean time to activate a target by head pointing (gaze was 812 ms, mouse 642 ms in the same study)."
  - symbol: "E"
    value: "0.26"
    unit: "%"
    sourceNote: "Click-condition error rate for head pointing; gaze was 1.53% and mouse 0.06% in the same study. Effective width folds endpoint scatter into the reported throughput."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "Head pointing used as a 2D cursor-control channel: the headset's central forward projection acts as the pointer, and the user moves the head to acquire spatial targets. This is distinct from eye-gaze pointing in the same Hansen et al. experiment, which used the intersection of gaze vectors as the pointer. Fitts' throughput folds in speed and spatial accuracy, so this entry is comparable to mouse, trackball, stylus, tongue, eye-gaze and cursor-BCI pointing channels."
references:
  - label: "System date: Ballard & Stockman 1995 facial-aspect computer control"
    url: "https://doi.org/10.1109/21.370199"
  - label: "I. S. MacKenzie: paper page with full results"
    url: "https://www.yorku.ca/mack/etra2018.html"
calculations:
  - id: fitts
    method: "Fitts' law throughput, re-derived from the task conditions"
    kind: "2D pointing channel (apples-to-apples with the mouse)"
    provenance: author-reported-verified
    resultBitsPerMin: 148
    steps:
      - title: "Information per movement (index of difficulty)"
        math: "ID = log2(A/W + 1);  amplitudes (160, 260 px) × widths (50, 100 px) → ID = 1.4–2.6 bits (mean ≈ 2.0 bits/movement)"
        note: "Each head-pointing acquisition selects among endpoints set by the distance-to-width ratio; that ratio, in bits, is the information the movement carries."
      - title: "Accuracy folded in via effective width"
        math: "W → We per ISO 9241-9, from endpoint scatter; head effective target width = 51.707 px"
        note: "The head pointer had lower click-condition error than eye gaze in this study (0.26% vs 1.53%), and the effective-width correction is already reflected in the reported throughput."
      - title: "Throughput = information ÷ movement time"
        math: "mean MT = 850 ms → TP = 2.472 bits/s for head pointing (gaze 2.127, mouse 3.239 in the same study)"
      - title: "Convert to bits per minute"
        math: "ITR = 2.472 bits/s × 60 = 148.32 ≈ 148 bits/min"
referenceCalculationId: fitts
---
