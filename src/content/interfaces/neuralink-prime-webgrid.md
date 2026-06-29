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
    scoreType: fitts
    kind: "2D pointing channel (apples-to-apples with the mouse)"
    provenance: recomputed-omitted
    resultBitsPerSecond: 3.32
    steps:
      - title: "Webgrid geometry → movement difficulty"
        math: "30×30 board: cell width W = S/30; random targets → mean amplitude A ≈ 0.52·S, so A/W ≈ 15.6.  ID = log2(A/W + 1) = log2(16.6) ≈ 4.06 bits/movement."
        note: "S = board span; 0.52 is the mean distance between two random points on a square. The target is cued, so each correct selection is a pointing movement carrying the Fitts index of difficulty (≈4.06 bits), not the log2(899) ≈ 9.81 bits the Webgrid metric credits as a 1-of-900 choice."
      - title: "Re-credit the reported achieved bitrate onto the Fitts basis"
        math: "ITR = B × ID / log2(N − 1) = 8.01 × 4.06 / 9.81 = 3.32 bits/s"
        note: "Neuralink publishes only the achieved bitrate B = 8.01 bits/s and no independent selection timing, so the Fitts figure is that same measured throughput re-credited per movement at the Fitts ID instead of the full grid entropy — a unit re-crediting of the reported score, not an independent measurement. Validation: the able-bodied ~10 BPS on this board re-credits to ~4.1 bits/s, matching MacKenzie's measured mouse throughput (4.5 bits/s), so the cursor lands just below an able-bodied mouse."
  - id: reported
    method: "Wolpaw bitrate over the 899-cell grid (Neuralink's Webgrid BPS)"
    scoreType: nuyujukian
    kind: "Webgrid full-grid score, a secondary task metric, not atlas-ranked pointing throughput"
    provenance: author-reported-unverified
    notUsedForRanking: true
    resultBitsPerSecond: 8.01
    steps:
      - title: "Webgrid achieved-bitrate metric"
        math: "30×30 board → N = 900 cells. The Webgrid score credits log2(N − 1) = log2(899) ≈ 9.81 bits per net-correct cued selection (Nuyujukian-style achieved bitrate)."
      - title: "Authors' reported score (taken as reported, not re-derived)"
        math: "B = 8.01 bits/s — Noland Arbaugh's Webgrid record, reported directly by Neuralink (first session 4.6 BPS; the often-quoted ~10 BPS is the able-bodied-mouse reference on this board, not a participant result)."
        note: "Neuralink publishes only the BPS score — no net-correct selection rate or per-trial timing — so there is no more-primary quantity to derive this from: it is an author-reported figure. Dividing out the per-selection credit implies ~8.01/9.81 ≈ 0.82 selections/s (~49/min), but that rate is a consequence of the score, not an independent measurement, so this is not a forward calculation."
referenceCalculationId: fitts
---
