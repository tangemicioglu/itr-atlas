---
name: Stylus/Tablet Pointing (RAND, 1964)
year: 1964
modalityTags: ["Stylus", "Pointing"]
sensingModality: Stylus
invasiveness: non-invasive
source:
  authors: "MacKenzie, Sellen & Buxton"
  venue: "ACM CHI 1991"
  year: 1991
  doi: "10.1145/108844.108868"
  url: "https://www.yorku.ca/mack/CHI91.html"
inputs:
  - symbol: "TP"
    value: "4.9"
    unit: "bits/s"
    sourceNote: "Fitts' law throughput for the stylus/tablet in the 1991 pointing task, the highest of the three devices tested (mouse 4.5, stylus 4.9, trackball 3.3). The system date is the 1964 RAND Tablet / GRAIL graphical input lineage."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "Direct pen-on-tablet pointing. Throughput edged out the mouse for pointing in this study (though not for dragging). Continuous control channel, comparable to the cursor BCIs' bits/s, not to discrete spellers."
references:
  - label: "System date: RAND Tablet / GRAIL stylus system"
    url: "https://www.rand.org/pubs/articles/2018/the-rand-tablet-ipad-predecessor.html"
calculations:
  - id: fitts
    method: "Fitts' law throughput, re-derived from the task conditions"
    kind: "2D pointing channel"
    provenance: author-reported-verified
    resultBitsPerMin: 294
    steps:
      - title: "Information per movement (index of difficulty)"
        math: "ID = log2(A/W + 1);  4 amplitudes (8–64) × 4 widths (1–8) fully crossed → ID = 1.0–6.0 bits (mean 3.26 bits/movement)"
        note: "Each pen-on-tablet movement selects among the distinguishable endpoints set by the distance-to-width ratio; that ratio, in bits, is the Shannon information per movement. Task design: MacKenzie, Sellen & Buxton 1991."
      - title: "Accuracy folded in via effective width"
        math: "W → We for the observed 4.0% error rate (Welford normalization, 4% nominal)"
        note: "Effective width discounts movements whose endpoints scattered past the target, so throughput is net of the user's real precision."
      - title: "Throughput = information ÷ movement time"
        math: "mean MT = 665 ms → IP = 4.9 bits/s (Fitts regression; edged out the mouse for pointing)"
      - title: "Convert to bits per minute"
        math: "ITR = 4.9 bits/s × 60 = 294 bits/min"
referenceCalculationId: fitts
---
