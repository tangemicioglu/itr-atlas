---
name: BrainGate Radial Keyboard (Bacher et al., 2015)
year: 2015
modalityTags: ["Intracortical", "Keyboard"]
sensingModality: Intracortical
invasiveness: invasive
source:
  authors: "Bacher, Jarosiewicz, Masse, Stavisky, Simeral, Hochberg et al."
  venue: "Neurorehabil. Neural Repair 29(5)"
  year: 2015
  doi: "10.1177/1545968314554624"
  url: "https://doi.org/10.1177/1545968314554624"
inputs:
  - symbol: "rate"
    value: "10.4"
    unit: "correct char/min"
    sourceNote: "Best reported Radial Keyboard copy-spelling condition: 10.4 +/- 2.4 correct characters/min in the 'quick fox' task."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon); the task was error-free copy spelling via a virtual keyboard."
  - symbol: "accuracy"
    value: "91.4"
    unit: "%"
    sourceNote: "Radial Keyboard accuracy in the 'quick fox' task was 91.4 +/- 5.8% correct; errors had to be corrected to complete the task."
  - symbol: "N"
    value: "28"
    sourceNote: "Keys on the Radial Keyboard layout, for the raw-key Wolpaw bound (uniform prior over the alphabet). The headline Shannon figure uses English entropy instead."
  - symbol: "T_key"
    value: "5.27"
    unit: "s/key"
    sourceNote: "Gross key-selection interval for the Wolpaw bound: 60 / (10.4 correct cpm / 0.914 accuracy) = 5.27 s. Gross (errors included) because Wolpaw's accuracy term P handles them separately."
actionSpace:
  kind: fixed-set
  size: 28
  prior: context-conditioned
  notes: "An intracortical point-and-click cursor used with the BrainGate Radial Keyboard. The radial layout reduced cursor travel compared with QWERTY and enabled face-to-face text-to-speech and remote chat. Since the realized output is English text, the reference calculation follows the same character-entropy convention as the Kennedy, Synchron and ReFIT text-entry entries."
references:
  - label: "SAGE full text"
    url: "https://journals.sagepub.com/doi/10.1177/1545968314554624"
  - label: "BrainGate publication videos"
    url: "https://www.braingate.org/publication-videos/"
calculations:
  - id: comm
    method: "Character-entropy throughput (realized text entry)"
    scoreType: shannon
    kind: "Net of English redundancy"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.173
    steps:
      - title: "Correct characters per minute"
        math: "10.4 correct char/min"
        note: "Bacher et al. report 10.4 +/- 2.4 ccpm for the Radial Keyboard in the 'quick fox' copy-spelling task. The participant had to correct errors to complete the prompted text."
      - title: "Bits per character"
        math: "H(English) ~= 1.0 bit/char"
      - title: "Information transfer rate"
        math: "10.4 char/min × 1.0 bit/char ÷ 60 s/min = 0.173 bits/s"
  - id: chat
    method: "QWERTY internet chat demonstration"
    scoreType: shannon
    kind: "Real-time native-app communication"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 0.135
    steps:
      - title: "Reported chat typing rate"
        math: "8.1 correct char/min at 100% accuracy"
        note: "The participant used BrainGate2 Desktop with Google Chat from her residence. This is a native-application demonstration, not the fastest copy-spelling condition."
      - title: "Information transfer rate"
        math: "8.1 char/min × 1.0 bit/char ÷ 60 s/min = 0.135 bits/s"
  - id: wolpaw-raw
    method: "Wolpaw bitrate over the raw key set"
    scoreType: wolpaw
    kind: "Uniform-prior ceiling on the key channel, before English redundancy"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 28
      accuracy: 0.914
      secondsPerSelection: 5.27
referenceCalculationId: comm
---
