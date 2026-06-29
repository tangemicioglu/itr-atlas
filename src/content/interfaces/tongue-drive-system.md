---
name: Tongue Drive System (Huo & Ghovanloo, 2008)
year: 2008
modalityTags: ["Tongue", "Pointing"]
sensingModality: Tongue
invasiveness: non-invasive
source:
  authors: "Yousefi, Huo & Ghovanloo"
  venue: "IEEE EMBC"
  year: 2010
  url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3152824/"
inputs:
  - symbol: "TP"
    value: "1.67"
    unit: "bits/s"
    sourceNote: "Fitts' law throughput averaged over 6 able-bodied subjects, tracking a magnetic tracer on the tongue. Reported in the 2010 follow-up, which also measured 3.99 bits/s for a mouse and 2.17 bits/s for a keypad under identical conditions. The system date comes from the 2008 Tongue Drive first-demonstration paper."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "A tongue-operated pointing channel: a small magnet on the tongue is tracked by external sensors and mapped to cursor motion. Fitts' throughput already folds in speed and spatial accuracy (effective target width), so it is directly comparable to the mouse, trackball, stylus and cursor-BCI entries, which report the same kind of bits/s; the tongue lands at ~42% of mouse throughput."
references:
  - label: "System date: Huo & Ghovanloo 2008 Tongue Drive first demonstration"
    url: "https://www.rehab.research.va.gov/jour/08/45/6/huo.html"
calculations:
  - id: fitts
    method: "Fitts' law throughput, re-derived from the task conditions"
    scoreType: fitts
    kind: "2D pointing channel"
    provenance: author-reported-verified
    resultBitsPerSecond: 1.67
    steps:
      - title: "Information per movement (effective index of difficulty)"
        math: "IDe = log2(De/We + 1);  3 distances (80–320 px) × 3 widths (40–160 px) × 8 directions → IDe = 1.58–3.17 bits/movement"
        note: "Shannon-formulation Fitts task (Yousefi, Huo & Ghovanloo 2010): each tongue-steered cursor movement selects among the endpoints set by the distance-to-effective-width ratio; that ratio, in bits, is the information per movement."
      - title: "Accuracy folded in via effective width"
        math: "We = 4.133 × SDx  (SDx = scatter of endpoints along the task axis)"
        note: "Effective width is computed from where the cursor actually landed, so throughput is net of the user's spatial error, with no separate error term needed."
      - title: "Throughput = information ÷ movement time"
        math: "TP = IDe/MT = 1.67 ± 0.37 bits/s for the tongue  (same task, same subjects: mouse 3.99, keypad 2.17 bits/s)"
referenceCalculationId: fitts
---
