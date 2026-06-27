---
name: BrainGate Point-and-Click Cursor (Kim et al., 2011)
year: 2011
modalityTags: ["Intracortical", "Cursor"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Kim, Simeral, Hochberg, Donoghue, Friehs & Black"
  venue: "IEEE Trans. Neural Syst. Rehabil. Eng. 19(2)"
  year: 2011
  doi: "10.1109/TNSRE.2011.2107750"
  url: "https://doi.org/10.1109/TNSRE.2011.2107750"
inputs:
  - symbol: "A"
    value: "278"
    unit: "px"
    sourceNote: "Mean center-to-target distance across the eight radial targets: 300 px horizontal, 255 px vertical and 278 px diagonal/overall mean."
  - symbol: "W"
    value: "48"
    unit: "px"
    sourceNote: "Target diameter in the radial point-and-click task."
  - symbol: "MT"
    value: "7.20"
    unit: "s"
    sourceNote: "S3 average successful target-acquisition movement time across four sessions."
  - symbol: "success"
    value: "97.4"
    unit: "%"
    sourceNote: "S3 successfully acquired 97.4% of targets across 193 runs; all misses were timeouts, with no false target selections."
  - symbol: "targets"
    value: "8"
    sourceNote: "Eight-target center-out point-and-click task plus a random-target Fitts metric task adapted from HCI pointing-device evaluation."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "A 2D neural cursor with a decoded click state, moving from the 2006 proof-of-concept toward a mouse-like computer-control channel. The participant could move the cursor, hold it still and click target regions. This entry uses a Fitts-style calculation from the published radial-task geometry and timing because the task is a continuous point-and-click channel, directly ancestral to later ReFIT cursor and Webgrid-style benchmarks. The Wolpaw-over-8 radial-target figure is kept as supplementary."
references:
  - label: "MPI publication page with abstract and citation"
    url: "https://is.mpg.de/ps/publications/kim-nsre-11"
  - label: "BrainGate publication page"
    url: "https://www.braingate.org/publications/point-and-click-cursor-control-with-an-intracortical-neural-interface-system-by-humans-with-tetraplegia/"
  - label: "Simeral et al. 2011 chronic point-and-click abstract"
    url: "https://pubmed.ncbi.nlm.nih.gov/21436513/"
calculations:
  - id: fitts
    method: "Fitts' law throughput on the radial point-and-click task"
    kind: "2D pointing channel"
    provenance: recomputed-omitted
    resultBitsPerMin: 22
    steps:
      - title: "Compute the radial-task index of difficulty"
        math: "ID = log2(A/W + 1) = log2(278/48 + 1) = 2.76 bits"
        note: "The paper reports the target diameter and center-to-target distances, but not endpoint scatter for an ISO effective-width calculation. This uses nominal width, then discounts for completion failures."
      - title: "Compute successful-run pointing throughput"
        math: "TP_success = 2.76 bits / 7.20 s = 0.384 bits/s"
        note: "Movement time is defined only for successful acquisitions in the paper."
      - title: "Discount for incomplete runs"
        math: "TP_net = 0.384 bits/s x 0.974 = 0.374 bits/s"
        note: "S3 missed 2.6% of runs by timeout and made no false target selections, so completion rate is applied as a simple net-throughput discount."
      - title: "Convert to bits per minute"
        math: "ITR = 0.374 bits/s x 60 = 22.4 ~= 22 bits/min"
  - id: wolpaw-radial
    method: "Wolpaw bitrate over N = 8 radial targets"
    kind: "Discrete-selection radial-target benchmark"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerMin: 23
    steps:
      - title: "Per-selection information with errors"
        math: "B = log2(8) + 0.974 log2(0.974) + 0.026 log2(0.026 / 7) = 2.75 bits/selection"
        note: "This is the standard Wolpaw discrete-selection view of the eight cued targets. Because the target is cued and the user drives a continuous cursor to it, this is supplementary rather than the ranking number."
      - title: "Selection rate"
        math: "60 / 7.20 = 8.33 selections/min"
        note: "Uses the same S3 four-session average successful-run movement time as the Fitts reference calculation."
      - title: "Information transfer rate"
        math: "ITR = 2.75 x 8.33 = 22.9 ~= 23 bits/min"
  - id: best-session-check
    method: "Fitts' law best-session check"
    kind: "2D pointing channel"
    provenance: recomputed-omitted
    resultBitsPerMin: 26
    notUsedForRanking: true
    steps:
      - title: "Apply the same calculation to S3 day 303"
        math: "ID = 2.76 bits; MT = 6.18 s; success = 96.1%; ITR = (2.76 / 6.18) x 0.961 x 60 = 25.8 ~= 26 bits/min"
        note: "This reproduces the old 26 bits/min scale from raw task values rather than accepting a standalone throughput number. The reference remains the S3 four-session average."
referenceCalculationId: fitts
---
