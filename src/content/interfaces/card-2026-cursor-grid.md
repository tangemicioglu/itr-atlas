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
    sourceNote: "Mean achieved grid-task bitrate (2.90 +/- 0.16 bits/s; peak 3.16) for the neural cursor on the main 14x14 grid (0.77-inch tiles; Methods). It is the field-standard achieved-bitrate metric (log2(N-1) per cued selection). The authors compare it to arrays in hand motor cortex, while T15's arrays were in ventral precentral (speech) cortex. This is not a Fitts throughput. A separate larger-tile 6x6 condition gave 1.67 bits/s with the neural cursor."
  - symbol: "method"
    value: "log2(N-1)/selection, net of errors"
    sourceNote: "Standard achieved-bitrate for 2D target acquisition (Nuyujukian et al. 2015; the paper's grid-task refs 9,18,34-37), reported directly by the authors and explicitly benchmarked against prior intracortical cursor work."
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
    scoreType: fitts
    kind: "2D pointing channel (apples-to-apples with the mouse)"
    provenance: recomputed-omitted
    resultBitsPerSecond: 1.17
    steps:
      - title: "Grid geometry -> movement difficulty"
        math: "14x14 grid, 0.77-inch tiles: W = S/14; random targets -> mean amplitude A ~= 0.52*S, so A/W ~= 7.28.  ID = log2(A/W + 1) = log2(8.28) ~= 3.05 bits/movement."
        note: "S = board span; 0.52 is the mean distance between two random points on a square. The target is cued, so each correct selection is a pointing movement carrying the Fitts index of difficulty (~3.05 bits), not the log2(195) ~= 7.61 bits the achieved-bitrate metric credits. The discount ratio ID/log2(N-1) is 0.401 here, 0.398 at 6x6 and 0.414 at 30x30, so it is nearly grid-size independent."
      - title: "Re-credit the reported achieved bitrate onto the Fitts basis"
        math: "ITR = B * ID / log2(N-1) = 2.90 * 3.05 / 7.61 = 1.17 bits/s"
        note: "The paper reports only the achieved bitrate B = 2.90 bits/s and no independent grid selection timing, so the Fitts figure is that same measured throughput re-credited per movement at the Fitts ID instead of log2(N-1) -- a unit re-crediting of the reported score, not an independent measurement. Same correction applied to Pandarinath's ReFIT grid and Neuralink's Webgrid, placing all three intracortical cursors on the mouse's Fitts basis (mouse 4.5, stylus 4.9, trackball 3.3 bits/s)."
  - id: reported
    method: "Achieved bitrate (log2 N), as reported by the authors"
    scoreType: nuyujukian
    kind: "Achieved-bitrate grid metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerSecond: 2.9
    steps:
      - title: "Achieved-bitrate metric"
        math: "14x14 grid -> N = 196 targets; the achieved-bitrate convention credits log2(N-1) = log2(195) ~= 7.61 bits per net-correct cued selection (Nuyujukian et al. 2015; the paper's grid-task refs 9,18,34-37)."
      - title: "Authors' reported score (taken as reported, not re-derived)"
        math: "B = 2.90 +/- 0.16 bits/s on the 14x14 grid (0.77 in tiles); peak 3.16."
        note: "Reported in the cursor results (on the same task gaze control reached 0.80 bits/s; a coarser 6x6 grid gave 1.67 bits/s neural and 2.59 bits/s gaze). The paper gives only the bitrate, no separate grid selections/s, so there is no more-primary quantity to derive it from: it is author-reported. Dividing by the 7.61-bit credit implies ~0.381 selections/s, but that rate is a consequence of the score, not an independent measurement."
referenceCalculationId: fitts
---
