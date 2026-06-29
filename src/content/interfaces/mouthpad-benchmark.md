---
name: MouthPad^ Benchmark (Augmental, 2026)
year: 2026
modalityTags: ["Tongue", "Head", "Pointing"]
sensingModality: Tongue
invasiveness: non-invasive
source:
  authors: "Augmental (Tomás Baptista)"
  venue: "MouthPad^ Benchmark Run"
  year: 2026
  url: "https://www.youtube.com/watch?v=saPAOkIaSQI"
inputs:
  - symbol: "TP"
    value: "3.53"
    unit: "bits/s"
    sourceNote: "On-screen MouthPad^ Benchmark value labeled BPS (Fitts) — the benchmark's own Fitts throughput for the run. The reference calculation re-derives this from the grid geometry and the headline BPS and reproduces it (~3.5 bits/s), so Augmental's displayed Fitts value serves as a cross-check rather than a face-value input."
  - symbol: "B"
    value: "8.51"
    unit: "bits/s"
    sourceNote: "Headline MouthPad^ Benchmark score in a 60-second run by Tomás Baptista using head-tracking and tongue clicks (YouTube title/description and on-screen result)."
  - symbol: "grid"
    value: "30x30"
    sourceNote: "On-screen benchmark grid size; the final scoreboard also shows 32 hits and 100% success."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "A hands-free cursor-control channel using head tracking for pointer motion and tongue/sip gestures for commands. The benchmark presents a cued 30x30 target grid. Augmental reports both the full-grid BPS headline and a separate Fitts BPS value; the Fitts value is used as the reference because it measures the continuous pointing channel in the same terms as mouse, trackball, stylus, tongue-drive and cursor-BCI entries."
references:
  - label: "Augmental MouthPad^ product page"
    url: "https://www.augmental.tech/"
  - label: "MIT News profile of MouthPad mechanics"
    url: "https://news.mit.edu/2024/mouth-based-touchpad-augmental-0605"
  - label: "Augmental user page with Tomás 8.51 BPS benchmark mention"
    url: "https://www.augmental.tech/our-users"
calculations:
  - id: fitts
    method: "Fitts' law throughput from Augmental's benchmark"
    scoreType: fitts
    kind: "2D pointing channel"
    provenance: author-reported-unverified
    resultBitsPerSecond: 3.53
    steps:
      - title: "Grid geometry -> movement difficulty"
        math: "30x30 grid: cell width W = S/30; random targets -> mean amplitude A ~= 0.52*S, so A/W ~= 15.6;  ID = log2(A/W + 1) = log2(16.6) ~= 4.05 bits/movement"
        note: "Same grid correction used for Neuralink Webgrid and the ReFIT/Card grids: a cued target is a pointing movement, so the information is the Fitts index of difficulty, not log2(900)."
      - title: "Selection rate (inferred from the headline BPS)"
        math: "headline 8.51 BPS / log2(899) = 8.51 / 9.81 ~= 0.87 net-correct selections/s"
        note: "The 60 s run reports only the BPS scores at 100% success, so the selection rate is inferred from the headline BPS."
      - title: "Fitts throughput"
        math: "4.05 bits x 0.87 /s ~= 3.5 bits/s"
        note: "This re-credit reproduces the benchmark's own on-screen 'BPS (Fitts)' = 3.53, confirming the Fitts correction matches Augmental's separately displayed Fitts value (the same method Neuralink's Webgrid needs but lacks a displayed Fitts to check against). ITR = 3.53 bits/s."
  - id: reported
    method: "Full-grid benchmark BPS reported by Augmental"
    scoreType: nuyujukian
    kind: "30x30 grid choice-entropy score, shown for transparency, not used for ranking"
    provenance: author-reported-unverified
    notUsedForRanking: true
    resultBitsPerSecond: 8.51
    steps:
      - title: "Authors' reported full-grid benchmark score"
        math: "BPS = 8.51 bits/s on the 30x30 grid (the description also notes a 9.98 BPS personal best, not the run shown)"
        note: "Webgrid-style achieved bitrate: log2(t^2 - 1) = log2(899) ~= 9.81 bits per net-correct cued selection."
      - title: "Implied selection rate (inferred from BPS)"
        math: "8.51 / 9.81 ~= 0.87 net-correct selections/s"
        note: "Inferred from the headline BPS; the Fitts reference above re-credits this same rate with the movement's index of difficulty (~4.05 bits) instead of log2(899)."
      - title: "Use bits per second"
        math: "ITR = 8.51 bits/s"
referenceCalculationId: fitts
---
