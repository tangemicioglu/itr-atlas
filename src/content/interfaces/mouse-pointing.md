---
name: Mouse Pointing (Engelbart, 1968)
year: 1968
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
    value: "4.5"
    unit: "bits/s"
    sourceNote: "Fitts' law throughput (index of performance) for the mouse in the 1991 pointing task. Independent reviews (Soukoreff & MacKenzie 2004) place mouse throughput in the 3.7–4.9 bits/s range. The system date is the 1968 Engelbart/SRI public interactive-computing demonstration."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "A 2D pointing channel; Fitts' throughput already folds in speed and spatial accuracy (it uses the effective target width). A continuous control device, so not directly comparable to discrete spellers, but directly comparable to the cursor BCIs, which report the same kind of bits/s."
references:
  - label: "System date: SRI history of the 1968 public mouse demonstration"
    url: "https://www.sri.com/hoi/computer-mouse-and-interactive-computing/"
  - label: "Soukoreff & MacKenzie 2004: throughput review (3.7–4.9 bits/s for the mouse)"
    url: "https://www.yorku.ca/mack/ijhcs2004.pdf"
calculations:
  - id: fitts
    method: "Fitts' law throughput, re-derived from the task conditions"
    kind: "2D pointing channel"
    provenance: author-reported-verified
    resultBitsPerMin: 270
    steps:
      - title: "Information per movement (index of difficulty)"
        math: "ID = log2(A/W + 1);  4 amplitudes (8–64) × 4 widths (1–8) fully crossed → ID = 1.0–6.0 bits (mean 3.26 bits/movement)"
        note: "Each pointing movement selects among the distinguishable endpoints set by the distance-to-width ratio; that ratio, in bits, is the Shannon information the movement carries. This is the real information calculation; the ×60 below is only a unit change. Task design: MacKenzie, Sellen & Buxton 1991."
      - title: "Accuracy folded in via effective width"
        math: "W → We for the observed 3.5% error rate (Welford normalization, 4% nominal)"
        note: "The effective-width correction discounts movements whose endpoints scattered wider than the target, the pointing analogue of subtracting wrong selections, so the bits are net of the user's real hit precision."
      - title: "Throughput = information ÷ movement time"
        math: "mean MT = 674 ms → IP = 4.5 bits/s (Fitts regression over the ID conditions)"
      - title: "Convert to bits per minute"
        math: "ITR = 4.5 bits/s × 60 = 270 bits/min"
referenceCalculationId: fitts
---
