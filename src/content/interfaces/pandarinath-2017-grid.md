---
name: BrainGate2 Cursor BCI (ReFIT-KF), pointing (Pandarinath et al., 2017)
year: 2017
modalityTags: ["Intracortical", "Cursor"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Pandarinath, Nuyujukian, Henderson, Shenoy et al."
  venue: "eLife 6:e18554"
  year: 2017
  doi: "10.7554/eLife.18554"
  url: "https://doi.org/10.7554/eLife.18554"
inputs:
  - symbol: "B"
    value: "3.7"
    unit: "bits/s"
    sourceNote: "Mean achieved bitrate, best participant (T5), grid target task (Results). T6: 2.2 bits/s; T7: 1.4 bits/s."
  - symbol: "method"
    value: "log2(targets)/selection, net of errors"
    sourceNote: "Standard achieved-bitrate for 2D target acquisition (Nuyujukian et al. 2015), reported directly by the authors."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "A 2D point-and-click cursor from the BrainGate2 pilot clinical trial (BrainGate Neural Interface System), driven by a ReFIT Kalman-filter decoder; throughput is measured by how fast and accurately it acquires randomly placed grid targets. ReFIT is the decoder, not the system. This is a continuous control channel, not a discrete speller. The authors' headline uses the field-standard achieved-bitrate metric (log2(N-1) per net-correct cued selection, Nuyujukian et al. 2015), while the atlas pointing convention uses a Fitts-style movement difficulty on the same grid. The reference number here is therefore a Fitts throughput for comparability with mouse, trackball and stylus entries; the log2(N-1) achieved-bitrate is kept as a secondary, as-reported figure. This entry is the pointing channel; the same system's real-world copy-typing application is a separate entry (BrainGate2 Cursor BCI (ReFIT-KF), text entry), which is what the participants actually communicated."
references:
  - label: "Open-access full text (eLife)"
    url: "https://elifesciences.org/articles/18554"
calculations:
  - id: fitts
    method: "Fitts' law throughput on the grid task"
    scoreType: fitts
    kind: "2D pointing channel (apples-to-apples with the mouse)"
    provenance: recomputed-omitted
    resultBitsPerSecond: 1.48
    steps:
      - title: "Grid geometry → movement difficulty"
        math: "6×6 board: cell width W = S/6; random targets → mean amplitude A ≈ 0.52·S, so A/W ≈ 3.1.  ID = log2(A/W + 1) = log2(4.1) ≈ 2.05 bits/movement."
        note: "S = board span; 0.52 is the mean distance between two random points on a square. The target is cued, so each correct selection is a pointing movement carrying the Fitts index of difficulty (≈2.05 bits), not the log2(35) ≈ 5.13 bits the achieved-bitrate metric credits."
      - title: "Re-credit the reported achieved bitrate onto the Fitts basis"
        math: "ITR = B × ID / log2(N − 1) = 3.7 × 2.05 / 5.13 = 1.48 bits/s"
        note: "The paper reports only the achieved bitrate B = 3.7 bits/s (T5) and no independent selection timing, so the Fitts figure is that same measured throughput re-credited per movement at the Fitts ID instead of log2(N−1). This is a unit re-crediting of the reported score, not an independent measurement. Same correction applied to Neuralink Webgrid and the Card 2026 grid, putting all three intracortical cursors on the mouse's Fitts basis (mouse 4.5, stylus 4.9, trackball 3.3 bits/s)."
  - id: reported
    method: "Achieved bitrate (log2 N), as reported by the authors"
    scoreType: nuyujukian
    kind: "Achieved-bitrate task metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerSecond: 3.7
    steps:
      - title: "Achieved-bitrate metric"
        math: "6×6 grid → N = 36 targets; the achieved-bitrate convention credits log2(N − 1) = log2(35) ≈ 5.13 bits per net-correct cued selection (Nuyujukian et al. 2015; its worked example is an 8-target task at 1 net selection/s = log2(7) ≈ 2.8 bits/s)."
      - title: "Authors' reported score (taken as reported, not re-derived)"
        math: "B = 3.7 ± 0.4 bits/s  (T5, 6×6 grid; T6 2.2, T7 1.4; T5 reached 4.16 on a dense 9×9 grid)."
        note: "Reported directly in Results. The paper gives only the bitrate, with no separate selections/s or acquisition time. There is no more-primary quantity to derive it from: it is author-reported. Dividing by the 5.13-bit credit implies ~0.72 selections/s, but that rate is a consequence of the score, not an independent measurement."
referenceCalculationId: fitts
---
