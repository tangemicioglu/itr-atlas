---
name: ReFIT Cursor BCI, pointing (Pandarinath et al., 2017)
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
  notes: "A 2D point-and-click cursor; throughput is measured by how fast and accurately it acquires randomly placed grid targets. This is a continuous control channel, not a discrete speller. The authors' headline uses the field-standard achieved-bitrate metric (log2(N) per cued selection), while the atlas pointing convention uses a Fitts-style movement difficulty on the same grid. The reference number here is therefore a Fitts throughput for comparability with mouse, trackball and stylus entries; the log2(N) achieved-bitrate is kept as a secondary, as-reported figure. This entry is the pointing channel; the same system's real-world copy-typing application is a separate entry (ReFIT Cursor BCI, text entry), which is what the participants actually communicated."
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
        math: "6×6 board: cell width W = S/6; random targets → mean amplitude A ≈ 0.52·S, so A/W ≈ 3.1"
        note: "S = board span; 0.52 is the mean distance between two random points on a square. The target is cued, so the user supplies a pointing movement, not a 1-of-36 choice; the information that movement carries is the Fitts index of difficulty, not log2(N)."
      - title: "Information per movement (Fitts index of difficulty)"
        math: "ID = log2(A/W + 1) = log2(4.1) ≈ 2.05 bits/movement   (vs the log2(35) ≈ 5.13 bits the achieved-bitrate metric credits)"
      - title: "Selection rate"
        math: "≈ 0.72 net correct selections/s   (from the as-reported block below: 3.7 b/s ÷ 5.13 bits)"
      - title: "Fitts throughput"
        math: "ITR = 1.48 bits/s"
        note: "The same correction applied to Neuralink's Webgrid; it puts both intracortical cursor BCIs on the mouse's Fitts basis (mouse 4.5, stylus 4.9, trackball 3.3 bits/s), so the chart compares like for like."
  - id: reported
    method: "Achieved bitrate (log2 N), as reported by the authors"
    scoreType: nuyujukian
    kind: "Achieved-bitrate task metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerSecond: 3.7
    steps:
      - title: "Authors' reported achieved bitrate"
        math: "B = 3.7 ± 0.4 bits/s  (T5, 6×6 grid; T6 2.2, T7 1.4; T5 reached 4.16 on a dense 9×9 grid)"
        note: "Reported directly in Results. The paper's bitrate convention credits log2(N − 1) bits per net-correct selection — its own worked example is an 8-target task at 1 net selection/s = log2(7) ≈ 2.8 bits/s (Nuyujukian et al. 2015)."
      - title: "Implied selection rate"
        math: "N = 36 → log2(N − 1) = log2(35) ≈ 5.13 bits/selection;  3.7 ÷ 5.13 ≈ 0.72 net-correct selections/s"
        note: "The paper does not separately report selections/s or acquisition time, so this rate is inferred from the reported bitrate, not measured independently. The Fitts reference above re-credits this same ≈ 0.72 sel/s with the movement's index of difficulty instead of log2(N − 1)."
      - title: "Use bits per second"
        math: "ITR = 3.7 bits/s"
referenceCalculationId: fitts
---
