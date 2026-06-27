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
  - symbol: "TP"
    value: "2.90"
    unit: "bits/s"
    sourceNote: "Structured cursor grid-task throughput, reported as 2.90 +/- 0.16 bits/s in the Cursor decoding section."
actionSpace:
  kind: continuous
  size: continuous
  prior: uniform
  notes: "The same implanted arrays used for long-term speech decoding also drove a 2D neural cursor in a structured grid-task benchmark. This entry is the cursor-control channel benchmark only; the speech/text-output application is split into the companion Card 2026 speech entry."
references:
  - label: "Nature Medicine full text"
    url: "https://www.nature.com/articles/s41591-026-04414-6"
calculations:
  - id: fitts
    method: "Reported cursor grid throughput"
    kind: "2D cursor-control channel benchmark"
    provenance: author-reported-verified
    resultBitsPerMin: 174
    steps:
      - title: "Use the reported cursor throughput"
        math: "TP = 2.90 bits/s"
        note: "This is the paper's structured cursor-control benchmark, separate from the speech word-entropy calculation."
      - title: "Convert to bits per minute"
        math: "ITR = 2.90 bits/s x 60 = 174 bits/min"
referenceCalculationId: fitts
---
