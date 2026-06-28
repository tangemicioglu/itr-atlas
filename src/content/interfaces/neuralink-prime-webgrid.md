---
name: Neuralink PRIME, Webgrid (Neuralink, 2024)
year: 2024
modalityTags: ["Intracortical", "Cursor"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Neuralink (PRIME Study, participant Noland Arbaugh)"
  venue: "Neuralink PRIME Study progress update"
  year: 2024
  url: "https://neuralink.com/updates/prime-study-progress-update-user-experience/"
inputs:
  - symbol: "t"
    value: "30"
    sourceNote: "Webgrid grid dimension: the standard board is 30×30 = 900 cells (Neuralink's Webgrid source: BPS = log2(t²−1)·f/60, f = net correct clicks/min)."
  - symbol: "B"
    value: "8.01"
    unit: "bits/s"
    sourceNote: "Participant Noland Arbaugh's Webgrid record (BPS), reported by Neuralink. First-ever session: 4.6 BPS. The often-quoted ~10 BPS is the able-bodied-mouse reference on the same board, not a participant result."
  - symbol: "f"
    value: "49"
    unit: "selections/min"
    sourceNote: "Net correct selections/min, back-derived from 8.01 BPS on the 30×30 board: f = 8.01·60 / log2(899) ≈ 49 (one target ~every 1.2 s)."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "A 2D cursor controlled by an N1 intracortical array, measured on Webgrid (a cued target-acquisition task). The headline BPS is a Webgrid task metric, not an ISO-style Fitts throughput: it assigns log2(t²−1) ≈ 9.81 bits for each correct selection on the 30×30 board, while the atlas pointing convention uses the movement difficulty, log2(A/W+1) ≈ 4.1 bits, because the target is cued before the movement. The reference number here is therefore a Fitts-style throughput on Neuralink's own grid; the Webgrid BPS is kept as a secondary, as-reported figure. Since Webgrid's BPS = log2(t²−1)·f at the net-correct rate, it is labeled as a Wolpaw-style grid score for comparison with the other secondary task metrics."
calculations:
  - id: fitts
    method: "Fitts' law throughput on Neuralink's own Webgrid grid"
    kind: "2D pointing channel (apples-to-apples with the mouse)"
    provenance: recomputed-omitted
    resultBitsPerMin: 199
    steps:
      - title: "Webgrid geometry → movement difficulty"
        math: "30×30 board: cell width W = S/30; random targets → mean amplitude A ≈ 0.52·S, so A/W ≈ 15.6"
        note: "S = board span; 0.52 is the mean distance between two random points on a square. The target is cued (shown), so the user supplies a pointing movement, not a 1-of-900 choice; the information that movement carries is the Fitts index of difficulty."
      - title: "Information per movement (Fitts index of difficulty)"
        math: "ID = log2(A/W + 1) = log2(16.6) ≈ 4.06 bits/movement   (vs the log2(899) ≈ 9.81 bits the Webgrid metric credits)"
      - title: "Selection rate"
        math: "f ≈ 49 net correct selections/min = 0.82/s   (back-derived from the 8.01 BPS record)"
      - title: "Fitts throughput"
        math: "TP = 4.06 bits × 0.82/s ≈ 3.3 bits/s → ×60 ≈ 199 bits/min"
        note: "Validation: the able-bodied ~10 BPS on this same 30×30 board reduces by the identical method to ~4.1 bits/s Fitts, matching MacKenzie's independently-measured mouse throughput (4.5 bits/s). The correction is self-consistent, and it places the BCI cursor just below an able-bodied mouse, not above it."
  - id: reported
    method: "Wolpaw bitrate over the 899-cell grid (Neuralink's Webgrid BPS)"
    kind: "Webgrid full-grid score, a secondary task metric, not atlas-ranked pointing throughput"
    provenance: author-reported-unverified
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 899
      accuracy: 1.0
      secondsPerSelection: 1.2245
referenceCalculationId: fitts
---
