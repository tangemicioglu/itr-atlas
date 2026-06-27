---
name: Eye-Gaze Pointing (Jacob, 1990)
year: 1990
modalityTags: ["Eye", "Pointing"]
sensingModality: Eye
invasiveness: non-invasive
source:
  authors: "Hansen, Rajanna, MacKenzie & Bækgaard"
  venue: "COGAIN @ ETRA 2018"
  year: 2018
  doi: "10.1145/3206343.3206344"
  url: "https://doi.org/10.1145/3206343.3206344"
inputs:
  - symbol: "TP"
    value: "2.127"
    unit: "bits/s"
    sourceNote: "Fitts' law throughput for eye-gaze pointing on a head-mounted display, computed per ISO 9241-9 (effective width). Same study, same task: head pointing 2.472 bits/s, mouse 3.239 bits/s. The system date comes from Jacob's 1990 eye-movement interaction paper; the throughput is measured in the 2018 HMD study."
  - symbol: "MT"
    value: "812"
    unit: "ms"
    sourceNote: "Mean time to activate a target by gaze (head pointing was 850 ms, mouse 642 ms in the same study)."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "Eye gaze used as a POINTING channel: the user fixates a spatially-placed target and confirms by dwell or click. Fitts' throughput folds in speed and spatial accuracy (effective width), so it is directly comparable to the mouse, trackball, stylus, tongue and head-pointing entries — eye gaze lands at ~66% of this study's mouse throughput. Crucially, the rate scales with target size and distance (Fitts), which is what makes it a pointing task — in contrast to an SSVEP speller, where the same eyes feed a discrete frequency classifier: the decoder emits a genuine 1-of-N decision, so log2(N) is the decoded information. (SSVEP is not perfectly geometry-free — foveation, crowding, eccentricity and a gaze shift all matter — but that spatial sensitivity is incidental, not Fitts-scaled difficulty, so it stays a classifier.) The realized text-entry application of gaze pointing is the separate Eye-Tracking Keyboard (dwell) entry; this entry is the bare eye-gaze pointing channel. Head pointing from the same Hansen et al. study is split into its own entry."
references:
  - label: "System date: Jacob 1990 gaze interaction paper"
    url: "https://www.cs.tufts.edu/~jacob/papers/chi90.pdf"
  - label: "I. S. MacKenzie — paper page with full results"
    url: "https://www.yorku.ca/mack/etra2018.html"
calculations:
  - id: fitts
    method: "Fitts' law throughput, re-derived from the task conditions"
    kind: "2D pointing channel (apples-to-apples with the mouse)"
    provenance: author-reported-verified
    resultBitsPerMin: 128
    steps:
      - title: "Information per movement (index of difficulty)"
        math: "ID = log2(A/W + 1);  amplitudes (160, 260 px) × widths (50, 100 px) → ID = 1.4–2.6 bits (mean ≈ 2.0 bits/movement)"
        note: "Each eye-gaze acquisition selects among the endpoints set by the distance-to-width ratio — that ratio, in bits, is the information the movement carries. Because it depends on target geometry, this is a genuine pointing task."
      - title: "Accuracy folded in via effective width"
        math: "W → We per ISO 9241-9, from the observed 1.53% error rate / endpoint scatter"
        note: "Effective width discounts fixations that landed off-target, so throughput is net of the user's real gaze precision."
      - title: "Throughput = information ÷ movement time"
        math: "mean MT = 812 ms → TP = 2.127 bits/s for eye gaze (head 2.472, mouse 3.239 in the same study)"
      - title: "Convert to bits per minute"
        math: "ITR = 2.127 bits/s × 60 ≈ 128 bits/min"
referenceCalculationId: fitts
---
