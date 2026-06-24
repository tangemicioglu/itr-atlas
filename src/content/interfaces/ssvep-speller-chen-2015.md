---
name: High-Speed SSVEP Speller
image: "/images/ssvep-speller.jpg"
year: 2015
modalityTags: ["EEG", "SSVEP"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Chen, Wang, Gao, Jung & Gao"
  venue: "PNAS 112(44)"
  year: 2015
  doi: "10.1073/pnas.1508080112"
  url: "https://doi.org/10.1073/pnas.1508080112"
inputs:
  - symbol: "N"
    value: "40"
    sourceNote: "40-character stimulus grid (Methods §2.1)"
  - symbol: "P"
    value: "0.96"
    sourceNote: "Mean online classification accuracy (Table 1)"
  - symbol: "t_stim"
    value: "1.0"
    unit: "s"
    sourceNote: "Flicker stimulation window (Methods §2.3)"
  - symbol: "t_shift"
    value: "0.5"
    unit: "s"
    sourceNote: "Gaze-shift / cue interval (Methods §2.3)"
actionSpace:
  kind: fixed-set
  size: 40
  prior: uniform
  notes: "40 flicker-coded characters, assumed equiprobable. Real text is far from uniform, so the per-selection bits are an upper bound on what a user actually transmits."
calculations:
  - id: wolpaw
    method: "Wolpaw bitrate over N = 40 targets"
    kind: "Theoretical upper bound"
    provenance: author-reported-verified
    compute:
      method: wolpaw
      targets: 40
      accuracy: 0.96
      secondsPerSelection: 1.5
referenceCalculationId: wolpaw
---

This is the canonical high-speed SSVEP result. The headline figure assumes a uniform target
prior and ignores error-correction time; treat it as an optimistic ceiling.
