---
name: Long-Term Intracortical Cursor BCI (Card et al., 2026)
year: 2026
modalityTags: ["Intracortical", "Cursor"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Card, Singer-Clark, Peracha, Stavisky, Brandman et al."
  venue: "Nature Medicine"
  year: 2026
  doi: "10.1038/s41591-026-04414-6"
  url: "https://doi.org/10.1038/s41591-026-04414-6"
inputs:
  - symbol: "B"
    value: "2.90"
    unit: "bits/s"
    sourceNote: "Mean achieved grid-task bitrate (2.90 +/- 0.16 bits/s; peak 3.16). The authors note this is comparable to previous intracortical cursor studies, i.e. the field-standard achieved-bitrate metric (log2(N-1) per cued selection), not a Fitts throughput."
  - symbol: "method"
    value: "log2(N-1)/selection, net of errors"
    sourceNote: "Standard achieved-bitrate for 2D target acquisition (Nuyujukian et al. 2015), reported directly by the authors and explicitly benchmarked against prior intracortical cursor work."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "The same implanted arrays used for long-term speech decoding also drove a 2D neural cursor in a structured grid-task benchmark. This entry is the cursor-control channel only; the speech/text-output application is split into the companion Card 2026 speech entry. The authors' headline uses the field-standard achieved-bitrate (log2(N) per cued selection), while the atlas pointing convention uses a Fitts-style movement difficulty on the same grid, so the reference number here is a Fitts throughput for comparability with the mouse and the other intracortical cursors (Pandarinath grid, Neuralink Webgrid); the as-reported achieved bitrate is kept as a secondary figure."
references:
  - label: "Nature Medicine full text"
    url: "https://www.nature.com/articles/s41591-026-04414-6"
  - label: "Open-access preprint (bioRxiv)"
    url: "https://www.biorxiv.org/content/10.1101/2025.06.26.661591v1"
calculations:
  - id: fitts
    method: "Fitts' law throughput on the grid task"
    kind: "2D pointing channel (apples-to-apples with the mouse)"
    provenance: recomputed-omitted
    resultBitsPerMin: 69
    steps:
      - title: "Grid geometry -> movement difficulty"
        math: "Square grid, cell width W = S/n; random targets -> mean amplitude A ~= 0.52*S, so A/W ~= 0.52*n"
        note: "S = board span; 0.52 is the mean distance between two random points on a unit square. The exact grid size is not published, but the discount below is nearly size-independent. Using the predecessor ReFIT 6x6 board (n = 6) gives A/W ~= 3.12."
      - title: "Information per movement (Fitts index of difficulty)"
        math: "ID = log2(A/W + 1) = log2(4.12) ~= 2.04 bits/movement   (vs log2(35) ~= 5.13 bits the achieved-bitrate credits)"
        note: "The target is cued before the movement, so the user supplies a pointing movement, not a 1-of-N choice. The discount ratio ID/log2(N-1) is 0.398 at 6x6, 0.401 at 14x14 and 0.414 at 30x30, so the result barely depends on the unpublished grid size."
      - title: "Selection rate"
        math: "B / log2(N-1) = 2.90 / 5.13 ~= 0.565 net correct selections/s"
      - title: "Fitts throughput"
        math: "TP = 2.04 bits x 0.565/s ~= 1.15 bits/s -> x60 ~= 69 bits/min"
        note: "Same correction applied to Pandarinath's ReFIT grid and Neuralink's Webgrid, placing all three intracortical cursors on the mouse's Fitts basis (mouse 4.5, stylus 4.9, trackball 3.3 bits/s)."
  - id: reported
    method: "Achieved bitrate (log2 N), as reported by the authors"
    kind: "Achieved-bitrate task metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerMin: 174
    steps:
      - title: "Use the reported grid-task bitrate"
        math: "B = 2.90 bits/s (mean; peak 3.16)"
        note: "Field-standard BCI achieved-bitrate (Nuyujukian et al. 2015): log2(N-1) grid choice entropy per cued selection, net of errors."
      - title: "Convert to bits per minute"
        math: "ITR = 2.90 bits/s x 60 = 174 bits/min"
referenceCalculationId: fitts
---
