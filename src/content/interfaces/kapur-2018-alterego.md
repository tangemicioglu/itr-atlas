---
name: AlterEgo continuous silent speech (Kapur et al., 2018)
year: 2019
modalityTags: ["sEMG", "Silent speech"]
sensingModality: sEMG
invasiveness: non-invasive
source:
  authors: "Wadkins"
  venue: "MIT MEng thesis"
  year: 2019
  url: "https://dspace.mit.edu/handle/1721.1/123121"
inputs:
  - symbol: "N"
    value: "20"
    sourceNote: "20-word vocabulary in the 200-sentence continuous silent-speech dataset"
  - symbol: "P"
    value: "0.893"
    sourceNote: "1 - 10.7% word error rate for CNN with CTC plus language model on the same 20-word, 200-sentence dataset"
  - symbol: "rate"
    value: "102.4"
    unit: "word/min"
    sourceNote: "Average speech rate for the same 20-word, 200-sentence dataset; the thesis reports 62% of samples at at least 100 WPM"
  - symbol: "ITR_reported"
    value: "345.8"
    unit: "bits/min"
    sourceNote: "Author's reported Wolpaw bit-rate for the CNN+CTC model on the 20-word, 200-sentence dataset (10.7% WER, 102.4 WPM, N=20): 345.8 bits/min ≈ 5.76 bits/s. The compute below reproduces this figure."
actionSpace:
  kind: fixed-set
  size: 20
  prior: non-uniform
  notes: "The reference task is Wadkins' 20-word, 200-sentence continuous silent-speech dataset, decoded from facial sEMG with CNN+CTC and a simple language model. This avoids mixing the IUI 2018 command-task accuracy with the follow-on thesis rate: N, WER, rate, and the reported bitrate all come from the same task. The action space is a 20-word closed vocabulary, and the sentence set is constrained, so the headline bits/s should not be read as open-vocabulary language throughput. Vocabulary size mainly changes the per-token comparison metric: log2(20) is only about 4.3 bits/word, while natural English content is not proportional to dictionary size."
references:
  - label: "Kapur, Kapur & Maes 2018 - original AlterEgo IUI paper"
    url: "https://doi.org/10.1145/3172944.3172977"
  - label: "Wadkins 2019 - continuous AlterEgo system (MIT MEng thesis)"
    url: "https://dspace.mit.edu/handle/1721.1/123121"
calculations:
  - id: wolpaw
    method: "Wolpaw bitrate over N = 20 words (author's reported ITR)"
    scoreType: wolpaw
    kind: "Per-word continuous silent-speech throughput"
    provenance: author-reported-verified
    compute:
      method: wolpaw
      targets: 20
      accuracy: 0.893
      secondsPerSelection: 0.58594
  - id: achieved
    method: "Achieved bitrate over N = 20 words"
    scoreType: achieved
    kind: "Achieved-bitrate view of the closed-vocabulary channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 5.7
    steps:
      - title: "Achieved-bitrate credit per net-correct word"
        math: "N = 20 → log2(N − 1) = log2(19) = 4.25 bits per net-correct selection (field-standard achieved bitrate, e.g. Webgrid; Nuyujukian 2015, which introduced the metric, used log2(N))."
      - title: "Net-correct word rate"
        math: "net-correct = 2P − 1 = 2(0.893) − 1 = 0.786 of words. At 102.4 word/min (0.586 s/word) → 0.786 × 102.4 / 60 = 1.34 correct/s."
        note: "A word error commits the wrong word rather than timing out, so incorrect = 1 − P. Same N (20), word accuracy (89.3%, i.e. 10.7% WER) and word rate (102.4 wpm) as the entry's Wolpaw calc, which is the ranked figure here because the output is a 20-word closed vocabulary. Netting each wrong word against a correct one (2P − 1) lands just under the 5.76 bits/s Wolpaw ITR. Like it, this should not be read as open-vocabulary language throughput."
      - title: "Achieved bitrate"
        math: "4.25 bits × 1.34 correct/s = 5.70 bits/s."
referenceCalculationId: wolpaw
---
