---
name: "480-Target Hybrid SSVEP + sEMG BCI (Pang et al., 2026)"
year: 2026
modalityTags: ["EEG", "SSVEP", "sEMG", "Hybrid"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Pang, Li, Xie, Shao, Cui & Chen"
  venue: "Cognitive Neurodynamics 20, 167"
  year: 2026
  doi: "10.1007/s11571-026-10538-9"
  url: "https://doi.org/10.1007/s11571-026-10538-9"
inputs:
  - symbol: "N"
    value: "480"
    sourceNote: "120 SSVEP flicker frequencies (12.0–23.9 Hz, JFPM-coded, 6 × 20 grid) × 4 hand gestures (wrist flexion, wrist extension, natural relaxation, hand opening) read from 2 bipolar forearm sEMG channels (Methods, Stimulus design). A trial counts as correct only if both the SSVEP frequency and the gesture are classified correctly."
  - symbol: "T"
    value: "1.6"
    unit: "s/selection"
    sourceNote: "Online trial = 1.0 s cue + 0.6 s flicker/gesture window, no rest phase (Methods, Evaluation criteria: 'T = 1.6 s in the online experiment'). The 0.6 s window was chosen offline as the ITR peak (Fig. 8)."
  - symbol: "P"
    value: "0.8455"
    sourceNote: "Mean online hybrid accuracy across 10 healthy subjects, 84.55 ± 7.23% (Table 1). Pre-cued synchronous task: each test block cycles through all 480 targets, 2 training + 2 test blocks per subject."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon), the ~1 bit/char standard applied to every character speller in the atlas. The authors' own practical-rate conversion also maps one command to one character (Eq. 8, Discussion)."
  - symbol: "ITR_reported"
    value: "260.07"
    unit: "bits/min"
    sourceNote: "Authors' mean online Wolpaw ITR (N = 480, T = 1.6 s), 260.07 ± 30.41 bits/min, averaged over per-subject ITRs (Table 1); best subject 304.02 bits/min. Recomputing at the mean accuracy gives 259.1 bits/min (4.32 bits/s); the ~1 bit/min gap comes from averaging per-subject ITRs instead of computing at mean P. The authors label all ITRs 'theoretical ITRs under the pre-cued synchronous paradigm, rather than practical ITRs when applied as a speller'."
actionSpace:
  kind: fixed-set
  size: 480
  prior: uniform
  notes: "A cue-guided 480-command classifier, not a demonstrated speller: no text was composed, and the authors assign no meaning to the commands. It extends Chen-lineage JFPM SSVEP (Chen 2015, Nakanishi 2018) by crossing 120 flicker targets with 4 sEMG gestures, so the gesture channel is a second, non-neural input read in parallel with gaze. The task's uniform prior over 480 targets does satisfy Wolpaw's assumption, but that bound grows with log2(N) and is not comparable to 40-target spellers on text. For consistency with the other SSVEP spellers, the ranked figure credits each command as one English character, the same conversion the authors use for their 7.5 WPM (6.34 correct WPM) estimate. That estimate excludes visual search across 480 cells, error correction, and fatigue (comfort 3.70/6), so it is itself optimistic."
references:
  - label: "Pang et al. 2026 (Cognitive Neurodynamics): 'A high-rate 480-target hybrid BCI system based on SSVEP and sEMG'"
    url: "https://doi.org/10.1007/s11571-026-10538-9"
  - label: "Dataset (figshare)"
    url: "https://doi.org/10.6084/m9.figshare.32797554"
  - label: "Code (GitHub)"
    url: "https://github.com/ZexinPang/A-High-Rate-480-Target-Hybrid-BCI-System-Based-on-SSVEP-and-sEMG"
calculations:
  - id: comm
    method: "Character-entropy throughput (one command = one character, online cue-guided task)"
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.53
    steps:
      - title: "Correct characters per minute"
        math: "60 / 1.6 s = 37.5 selections/min × 0.8455 accuracy = 31.7 correct char/min"
        note: "Matches the authors' own conversion: 31.71 correct commands/min ≈ 6.34 correct WPM at 5 char/word (Discussion). Each selection is scored as one character even though 480 targets could hold far more than an alphabet; no text entry was actually run."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "31.7 char/min × 1.0 bit/char ÷ 60 s/min = 0.53 bits/s"
  - id: reported
    method: "Wolpaw bitrate over N = 480 targets (authors' reported ITR)"
    scoreType: wolpaw
    kind: "Uniform 1-of-480 classifier metric, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 480
      accuracy: 0.8455
      secondsPerSelection: 1.6
  - id: achieved
    method: "Nuyujukian achieved bitrate over N = 480 targets"
    scoreType: nuyujukian
    kind: "Achieved-bitrate view of the command set, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 3.85
    steps:
      - title: "Achieved-bitrate credit per net-correct selection"
        math: "N = 480 → log2(N − 1) = log2(479) = 8.904 bits per net-correct selection (field-standard achieved bitrate)."
      - title: "Net-correct selection rate"
        math: "net-correct = 2P − 1 = 2(0.8455) − 1 = 0.691 of selections. At 1 / 1.6 s → 0.691 / 1.6 = 0.432 correct/s."
        note: "A misclassification commits the wrong command rather than timing out, so incorrect = 1 − P. Same N, mean accuracy and trial time as the Wolpaw calc."
      - title: "Achieved bitrate"
        math: "8.904 bits × 0.432 correct/s = 3.85 bits/s"
referenceCalculationId: comm
---
