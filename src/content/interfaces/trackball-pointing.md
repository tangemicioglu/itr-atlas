---
name: Trackball Pointing (DATAR, 1952)
year: 1952
modalityTags: ["Manual", "Pointing"]
sensingModality: Manual
invasiveness: non-invasive
source:
  authors: "MacKenzie, Sellen & Buxton"
  venue: "ACM CHI 1991"
  year: 1991
  doi: "10.1145/108844.108868"
  url: "https://www.yorku.ca/mack/CHI91.html"
inputs:
  - symbol: "TP"
    value: "3.3"
    unit: "bits/s"
    sourceNote: "Fitts' law throughput for the trackball in the 1991 pointing task, lowest of the three devices tested (mouse 4.5, stylus 4.9, trackball 3.3). The system date is the DATAR trackball, dated circa 1952 by the Computer History Museum."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "An indirect pointing device driven by finger/thumb on a ball. Lower throughput than the mouse and stylus. Continuous control channel, comparable to the cursor BCIs' bits/s."
references:
  - label: "System date: Computer History Museum DATAR trackball"
    url: "https://www.computerhistory.org/revolution/input-output/14/350/1881"
calculations:
  - id: fitts
    method: "Fitts' law throughput, re-derived from the task conditions"
    kind: "2D pointing channel"
    provenance: author-reported-verified
    resultBitsPerMin: 198
    steps:
      - title: "Information per movement (index of difficulty)"
        math: "ID = log2(A/W + 1);  4 amplitudes (8–64) × 4 widths (1–8) fully crossed → ID = 1.0–6.0 bits (mean 3.26 bits/movement)"
        note: "Each finger/thumb-driven cursor movement selects among the endpoints set by the distance-to-width ratio; that ratio, in bits, is the Shannon information per movement. Task design: MacKenzie, Sellen & Buxton 1991."
      - title: "Accuracy folded in via effective width"
        math: "W → We for the observed 3.9% error rate (Welford normalization, 4% nominal)"
        note: "Effective width discounts movements that overshot, so throughput is net of real precision."
      - title: "Throughput = information ÷ movement time"
        math: "mean MT = 1101 ms → IP = 3.3 bits/s (Fitts regression; the slowest of the three devices, dragged down by movement time)"
      - title: "Convert to bits per minute"
        math: "ITR = 3.3 bits/s × 60 = 198 bits/min"
referenceCalculationId: fitts
---
