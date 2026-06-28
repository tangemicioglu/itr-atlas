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
    sourceNote: "On-screen MouthPad^ Benchmark value labeled BPS (Fitts). Unlike Neuralink's public Webgrid score, Augmental's benchmark exposes this Fitts throughput directly alongside the headline BPS score."
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
    kind: "2D pointing channel"
    provenance: author-reported-unverified
    resultBitsPerMin: 212
    steps:
      - title: "Use the benchmark's Fitts throughput"
        math: "TP = 3.53 bits/s"
        note: "The YouTube run displays a separate BPS (Fitts) value. This is the apples-to-apples pointing-channel measure; it is not back-derived from the headline 8.51 BPS score."
      - title: "Convert to bits per minute"
        math: "ITR = 3.53 bits/s x 60 = 211.8 ~= 212 bits/min"
      - title: "Why this differs from Neuralink's Webgrid correction"
        note: "For Neuralink, the public headline BPS had to be reduced to an estimated Fitts throughput. Here Augmental's benchmark itself reports the Fitts measure, so the reference entry follows Augmental's own metric rather than applying a separate correction."
  - id: reported
    method: "Full-grid benchmark BPS reported by Augmental"
    kind: "30x30 grid choice-entropy score, shown for transparency, not used for ranking"
    provenance: author-reported-unverified
    notUsedForRanking: true
    resultBitsPerMin: 511
    steps:
      - title: "Use the headline benchmark score"
        math: "BPS = 8.51 bits/s"
        note: "The video title, description and on-screen result report 8.51 BPS for this 60-second run. The description also notes a 9.98 BPS personal best, but that is not the run shown."
      - title: "Convert to bits per minute"
        math: "ITR = 8.51 bits/s x 60 = 510.6 ~= 511 bits/min"
referenceCalculationId: fitts
---
