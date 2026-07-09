---
name: "ASME-speller: 30-Class Auditory BCI Speller (Kojima & Kanoh, 2026)"
year: 2026
modalityTags: ["EEG", "Auditory", "P300"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Kojima, Kanoh"
  venue: "Frontiers in Human Neuroscience"
  year: 2026
  doi: "10.3389/fnhum.2026.1807535"
  url: "https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2026.1807535/full"
inputs:
  - symbol: "N"
    value: "30"
    sourceNote: "26 alphabet letters + 4 symbols (comma, delete, space, period), each mapped to one of three pitched auditory streams by QWERTY row. Every trial is a full 30-class decision even in the online runs, which only test 15 of the 30 letters (§2.4)."
  - symbol: "rate"
    value: "0.66"
    unit: "selection/min"
    sourceNote: "1 / 90.8 s per trial = 0.661 selections/min. Trial duration T = (N_s − 1) × SOA + T_max = 449 × 0.2 s + 1.0 s = 90.8 s (§2.5), the time to attend all 450 stimuli (15 sequences × 3 streams × 10 letters/stream) needed for one letter decision."
  - symbol: "P"
    value: "0.76"
    sourceNote: "Mean online trial-level letter-selection accuracy across all 10 participants (Table 2), the paper's headline online result. Rises to 0.84 excluding subject 10, whose run failed outright (0.0 accuracy) from excessive movement artifact."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "Shannon per-character entropy of English, the same convention used for every other character-level speller in the atlas (P300 matrix, checkerboard P300, etc.) — this is a per-letter classifier, not a per-word one."
  - symbol: "ITR_reported"
    value: "2.16"
    unit: "bits/min"
    sourceNote: "Authors' own mean Wolpaw ITR (Eq. 1-2 in the paper, N=30, per-participant P and T=90.8s, averaged across participants) for the online experiment (Table 2, Table 6). A best post-hoc configuration (LDA classifier + dynamic early stopping) reached 4.76 bits/min at 0.80 accuracy and 48.5s/selection; the single best participant/pipeline combination (EEGNet4,2 + dynamic stopping, 2-sequence minimum) hit 14.44 bits/min at 1.0 accuracy for one subject. Both are post-hoc-optimized, not the deployed online system, so they are not separately scored here."
actionSpace:
  kind: fixed-set
  size: 30
  prior: context-conditioned
  notes: "Single-step, single-stream-at-a-time auditory ERP speller: three pitched auditory streams (QWERTY top/middle/bottom row), each carrying spoken-letter oddball stimuli; the user attends one stream and one letter within it, and the system runs one 30-way LDA classification per trial from the resulting ERPs (P300/N2/N700). No two-step row/column decomposition, unlike most prior auditory spellers. The realized output is English text, so the reference calculation credits it like any other text-entry classifier (character-entropy Shannon), with the paper's own Wolpaw ITR (assumes a uniform 1-of-30 prior, matching this atlas's Wolpaw formula in src/lib/itr/wolpaw.ts almost exactly — same log2(N-1) error term) kept as a secondary classifier-metric view. Reported online performance (P=0.76, T=90.8s/trial) is used as the reference condition rather than the post-hoc-optimized dynamic-stopping configurations, which trade accuracy for speed and were not run online."
references:
  - label: "Kojima & Kanoh 2026 (Frontiers in Human Neuroscience, open access): 'The ASME-speller: 30-class auditory brain-computer interface speller using stream segregation and the QWERTY layout'"
    url: "https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2026.1807535/full"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry, online experiment)"
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.0084
    steps:
      - title: "Correct characters per second"
        math: "1 trial / 90.8 s × 0.76 accuracy = 0.00837 correct char/s"
        note: "Mean online accuracy and trial duration across all 10 participants (Table 2), including the one failed run (subject 10, 0.0 accuracy)."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "0.00837 char/s × 1.0 bit/char = 0.0084 bits/s"
  - id: wolpaw
    method: "Wolpaw bitrate over N = 30 targets (online experiment)"
    scoreType: wolpaw
    kind: "Uniform 1-of-30 classifier metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 30
      accuracy: 0.76
      secondsPerSelection: 90.8
  - id: achieved
    method: "Nuyujukian achieved bitrate over N = 30 targets"
    scoreType: nuyujukian
    kind: "Achieved-bitrate view of the speller, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 0.0278
    steps:
      - title: "Achieved-bitrate credit per net-correct selection"
        math: "N = 30 → log2(N − 1) = log2(29) = 4.858 bits per net-correct selection (field-standard achieved bitrate)."
      - title: "Net-correct selection rate"
        math: "net-correct = 2P − 1 = 2(0.76) − 1 = 0.52 of selections. At 1 / 90.8 s per trial → 0.52 / 90.8 = 0.00573 correct/s."
        note: "A speller error commits the wrong letter rather than merely timing out, so the achieved bitrate nets each mistake against a correct selection (2P − 1), same N, accuracy, and trial duration as the entry's Wolpaw calc above."
      - title: "Achieved bitrate"
        math: "4.858 bits × 0.00573 correct/s = 0.0278 bits/s"
referenceCalculationId: comm
---
