---
name: "Brain2Qwerty: MEG decoding of QWERTY typing (Lévy et al., 2025)"
year: 2025
modalityTags: ["MEG", "Keyboard"]
sensingModality: MEG
invasiveness: non-invasive
source:
  authors: "Lévy, Zhang, Pinet, Rapin, Banville, d'Ascoli, King et al."
  venue: "arXiv:2502.17480"
  year: 2025
  doi: "10.48550/arXiv.2502.17480"
  url: "https://arxiv.org/abs/2502.17480"
inputs:
  - symbol: "rate"
    value: "152"
    unit: "char/min"
    sourceNote: "Mean typing speed of the able-bodied participants on a standard QWERTY keyboard: 152.0 ± 3.2 char/min (mean sentence-production time 5.7 ± 0.2 s). This is the keyboard's rate, set by the participants' own hands; the brain decoder reconstructs the already-typed text offline rather than producing it."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "Text entropy (Shannon); the same ~1 bit/char convention applied to QWERTY, eye-typing and the other text-entry entries. Stimuli are declarative Spanish sentences in upper case without accents."
  - symbol: "P"
    value: "0.68"
    sourceNote: "Per-character accuracy = 1 − CER. With MEG, Brain2Qwerty's character error rate is 32 ± 0.6% across 35 subjects (best participant 19%). EEG is far worse at CER 67% (per-character accuracy ≈ 0.33), reflecting its lower signal-to-noise ratio."
  - symbol: "N"
    value: "29"
    sourceNote: "Decoder output classes: 26 Latin letters + space + a numbers class + an other-special class = 29. Bounds the raw key channel under a uniform prior (log2(29) ≈ 4.86 bits/key)."
  - symbol: "T_key"
    value: "0.395"
    unit: "s/key"
    sourceNote: "Key-selection interval for the Wolpaw bound: 60 / 152 char/min = 0.395 s/key."
actionSpace:
  kind: fixed-set
  size: 29
  prior: context-conditioned
  notes: "The effector is a regular QWERTY keyboard: able-bodied participants physically typed briefly-memorized sentences with their hands, and Brain2Qwerty reconstructs that text from non-invasive MEG. It is an offline decoding result, not a closed-loop interface: the typed keystrokes are the ground-truth labels (used for both training and scoring), the model is non-causal and operates at the sentence level (no real time), and a sentence-level language model corrects the character predictions. Because the keystrokes come from intact hand motor function, the 152 char/min rate is the keyboard's, not a volitional neural channel a non-communicating patient could drive — the authors flag exactly this as the open problem. The sentence set is also small and closed (128 unique Spanish sentences, 5–8 words, split 80/10/10). The headline figure is the strict character-entropy throughput net of the 32% CER; the Wolpaw key-channel figure is the uniform-prior upper bound on the same channel and runs higher. Listed as a non-invasive frontier datapoint, with the keyboard effector made explicit so it is not read as a speller."
references:
  - label: "Lévy et al. 2025 (arXiv): 'Brain-to-Text Decoding: A Non-invasive Approach via Typing'"
    url: "https://arxiv.org/abs/2502.17480"
  - label: "Meta AI publication page"
    url: "https://ai.meta.com/research/publications/brain-to-text-decoding-a-non-invasive-approach-via-typing/"
calculations:
  - id: comm
    method: "Character-entropy throughput (decoded text, net of errors)"
    scoreType: shannon
    kind: "Net of text redundancy and decoding error"
    provenance: recomputed-omitted
    resultBitsPerSecond: 1.72
    steps:
      - title: "Correct characters per minute"
        math: "152 char/min × (1 − 0.32 CER) = 103.4 correct char/min"
        note: "The keyboard rate (152 char/min) discounted by the MEG average character error rate (32%): the rate at which correctly-decoded text is delivered."
      - title: "Bits per character"
        math: "H ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "103.4 char/min × 1.0 bit/char ÷ 60 s/min = 1.72 bits/s"
  - id: wolpaw-key
    method: "Wolpaw bitrate over the raw key set"
    scoreType: wolpaw
    kind: "Uniform-prior bound on the 29-key channel"
    provenance: recomputed-omitted
    compute:
      method: wolpaw
      targets: 29
      accuracy: 0.68
      secondsPerSelection: 0.395
referenceCalculationId: comm
---
