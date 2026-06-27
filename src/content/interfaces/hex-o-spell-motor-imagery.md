---
name: Hex-o-Spell Motor-Imagery Speller (Blankertz et al., 2006)
year: 2006
modalityTags: ["EEG", "Motor imagery"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Blankertz, Dornhege, Krauledat, Schröder, Williamson, Murray-Smith & Müller"
  venue: "3rd Int. BCI Workshop, Graz"
  year: 2006
  url: "https://mural.maynoothuniversity.ie/1786"
inputs:
  - symbol: "rate"
    value: "7.6"
    unit: "char/min"
    sourceNote: "Best demonstrated spelling speed (two subjects, CeBIT 2006); across subjects the range was 2.3–7.6 char/min."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); the same ~1 bit/char standard applied to QWERTY and every other text entry."
  - symbol: "commands"
    value: "2"
    sourceNote: "The Berlin BCI controlled Hex-o-Spell with just two motor-imagery commands (e.g. right-hand vs foot imagery): one rotates a pointer among six hexagons, the other extends it to select. Two two-step selections spell one letter."
actionSpace:
  kind: fixed-set
  size: 30
  prior: context-conditioned
  notes: "Motor imagery used for TEXT, not cursor pointing: two mental commands drive a hexagonal menu (rotate / select) in which each letter is reached by a two-step selection. Because the output is English text, the reference uses character-entropy (~1 bit/char) like every other text entry — the right comparison is to the other spellers and keyboards, not to a Fitts pointing channel. This is the canonical motor-imagery speller; its low rate reflects the narrow 2-command channel, the same reason its bits/min sit far below the visual-evoked spellers."
references:
  - label: "Williamson et al. 2009 (J. Neural Eng.) — Hex-o-Spell interaction design and uncertainty handling"
    url: "https://doi.org/10.1088/1741-2560/6/5/056012"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerMin: 8
    steps:
      - title: "Correct characters per minute"
        math: "≈ 7.6 char/min (best demonstrated; across-subject range 2.3–7.6)"
        note: "Each letter is two motor-imagery selections in the hexagon menu; the rate is gated by the 2-command channel, not by spatial pointing."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "ITR = 7.6 × 1.0 ≈ 8 bits/min  (typical sessions ~2.3–7.6, i.e. ~2–8 bits/min)"
  - id: wolpaw
    method: "Uniform-prior comparison over the ~30-letter alphabet"
    kind: "Uniform 1-of-30 selection metric, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerMin: 37
    steps:
      - title: "Bits per letter at perfect accuracy"
        math: "log2(30) ≈ 4.91 bits/letter (each letter reached by a two-step hexagon selection)"
        note: "The paper gives the net letter rate but not a per-command accuracy, so this is shown at perfect accuracy as a uniform-prior comparison rather than a Wolpaw recomputation."
      - title: "Information transfer rate"
        math: "ITR = 4.91 × 7.6 letters/min ≈ 37 bits/min"
        note: "Uses log2(N) per letter, while the atlas-ranked text figure uses 1 bit/char for consistency with the other English text entries."
referenceCalculationId: comm
---
