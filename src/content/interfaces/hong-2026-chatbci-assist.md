---
name: "ChatBCI-Assist: LLM-Assisted P300 Speller (Hong et al., 2026)"
year: 2026
modalityTags: ["EEG", "P300", "LLM-assisted"]
sensingModality: EEG
invasiveness: non-invasive
source:
  authors: "Hong, Rao, Wang & Najafizadeh"
  venue: "IEEE Trans. Biomed. Eng. 73(8)"
  year: 2026
  doi: "10.1109/TBME.2026.3693965"
  url: "https://doi.org/10.1109/TBME.2026.3693965"
inputs:
  - symbol: "chars"
    value: "995"
    sourceNote: "Correct characters delivered across all 30 Copy-LLM tasks (10 subjects × 3 sentences, 1,020 target characters). Scored from the public experiment logs as target length minus Levenshtein distance to the final text. 29 of 30 tasks finished exactly; one (S04, self-generated) timed out at 10 min with 54.5% character accuracy, matching Table II footnote e."
  - symbol: "time"
    value: "97.5"
    unit: "min"
    sourceNote: "Total wall-clock time for the same 30 tasks, first to last log timestamp (mean 3.25 min per task, matching Table II's 3.3 min T2C). The paper defines T2C as including LLM generation, system latency and user pauses (§II-D)."
  - symbol: "CPM_reported"
    value: "19.7"
    unit: "char/min"
    sourceNote: "Authors' mean copy-spelling CPM (Table II). Not wall-clock: Eq. 7-8 compute it as characters per selection × 60 / T, with a nominal T = 3 s review + mean flashes × 0.14 s. That excludes the local LLM's 3.57 ± 1.94 s inference latency (§V) and other overhead. The logs show 14.6 s per selection in real time. Table II's own averages give 34 char / 3.3 min ≈ 10.3 char/min."
  - symbol: "P_sel"
    value: "0.8846"
    sourceNote: "Mean online selection accuracy over the 10 subjects (Table I: 88.9, 92.5, 90.1, 85.2, 84.6, 86.7, 92.0, 85.5, 91.2, 87.9%). Averaged over all nine online tasks per subject, i.e. all three sessions, not Copy-LLM alone."
  - symbol: "H"
    value: "1.0"
    unit: "bits/char"
    sourceNote: "English-text entropy (Shannon), the same ~1 bit/char standard applied to every character speller in the atlas. LLM word and phrase completion raises characters per selection, but it cannot raise the information content of English text above its entropy, so crediting delivered text at 1 bit/char already absorbs the language-model gain."
  - symbol: "ITR_reported"
    value: "105.2"
    unit: "bits/min"
    sourceNote: "Authors' mean copy-spelling ITR (Table II), Eq. 9: Wolpaw bits over k = 42 keys, with P = character accuracy, multiplied by CPM rather than selections/min. It therefore credits every character, including each character of an LLM-inserted phrase, with ~5.3 bits (105.2 / 19.7 = 5.34 ≈ log2 42). The authors acknowledge that the uniform-prior assumption does not fit an LLM speller (§V). The character-level MIR (52.9 bits/min) and semantic ITR (147.1 bits/min, semantic-spelling session) share the same nominal CPM and are not scored."
actionSpace:
  kind: context-dependent
  size: 42
  prior: context-conditioned
  notes: "Row-column P300 speller on a 6 × 7 grid (§II-B): 26 letters, 4 function keys (delete word, delete character, space, enter), and 6 word ('+') plus 6 phrase ('*') keys that are filled each step by a LoRA-tuned Llama 3.1-8B running locally, trained on an ALS message bank. Bayesian adaptive stopping ends flashing once one key reaches 0.90 posterior (max 104 flashes); mean 51 flashes per selection. The 12 suggestion keys change content every selection, so the action space is context-dependent and Wolpaw's uniform prior does not hold. Ten healthy participants (12 recruited, 2 failed calibration); the ALS framing is the target population, not the tested one. The ranked figure is the copy-spelling session (verbatim target), with wall-clock time. The semantic-spelling session (30.7 CPM, users paraphrase the target) is not scored, because its output is not checked character-for-character. The authors' 19.7 CPM uses a nominal per-selection time that omits LLM latency, so it is kept only as a supplementary figure. Wall time also caps this entry against older spellers whose rates were back-derived from nominal timing (e.g. Townsend 2010)."
references:
  - label: "Hong et al. 2026 (IEEE TBME): 'ChatBCI-Assist: An Intent-Based P300 Speller With A Locally Deployed LLM and Adaptive Stopping Strategy Enabling Record Online Spelling Performance'"
    url: "https://ieeexplore.ieee.org/document/11520887"
  - label: "ChatBCI-Assist experiment logs (per-selection timestamps and text for all 90 online tasks)"
    url: "https://github.com/ChatBCI/ChatBCI-Assist-ExpLogs"
calculations:
  - id: comm
    method: "Character-entropy throughput (copy-spelling, wall-clock time)"
    scoreType: shannon
    kind: "Net of English redundancy and decoding error"
    provenance: recomputed-omitted
    resultBitsPerSecond: 0.17
    steps:
      - title: "Correct characters per minute"
        math: "995 correct char / 97.5 min = 10.2 correct char/min"
        note: "Pooled over all 30 Copy-LLM tasks from the public logs, including the one timed-out task. It cross-checks against Table II's averages: 34 char × 98.5% character accuracy / 3.3 min T2C ≈ 10.1 char/min. The mean of per-task rates is higher (13.2 char/min) because short, fast sentences weigh equally with long ones. The pooled ratio is the sustained rate."
      - title: "Bits per character"
        math: "H(English) ≈ 1.0 bit/char (Shannon)"
      - title: "Information transfer rate"
        math: "10.2 char/min × 1.0 bit/char ÷ 60 s/min = 0.17 bits/s"
        note: "About 2.5× the checkerboard P300 speller (Townsend 2010, 0.067 bits/s). The dictionary baseline in the same study, same GUI and adaptive stopping, delivers 6.1 correct char/min (0.10 bits/s) on the same logs, so the fine-tuned LLM accounts for ~1.7×."
  - id: comm-nominal
    method: "Character-entropy throughput at the authors' nominal CPM"
    scoreType: shannon
    kind: "Authors' timing model, excludes LLM latency; shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerSecond: 0.33
    steps:
      - title: "Characters per minute (authors' definition)"
        math: "CPM = (# characters / # selections) × 60 / T, with T = 3 s + f̄ × 0.14 s (Eq. 7-8) → mean 19.7 char/min (Table II)"
        note: "T counts only the 3 s suggestion-review window and the flashes. Wall-clock time per selection in the logs is 14.6 s; the gap is mostly the ~3.6 s local LLM inference plus system and user pauses."
      - title: "Information transfer rate"
        math: "19.7 char/min × 1.0 bit/char ÷ 60 s/min = 0.33 bits/s"
  - id: reported
    method: "Authors' ITR: Wolpaw over k = 42 keys, scaled by characters/min"
    scoreType: wolpaw
    kind: "Per-selection classifier bits credited per character, shown for comparison"
    provenance: author-reported-verified
    notUsedForRanking: true
    resultBitsPerSecond: 1.71
    steps:
      - title: "Bits per character (authors' Eq. 9)"
        math: "B = log2(42) + P·log2(P) + (1 − P)·log2((1 − P)/41), P = character accuracy. At P = 0.985: B ≈ 5.20 bits"
        note: "Eq. 9 feeds final character accuracy (98.5% mean) into a formula meant for per-selection accuracy, then multiplies by characters rather than selections per minute."
      - title: "Information transfer rate"
        math: "ITR = 5.20 bits/char × 19.7 char/min = 102.4 bits/min ÷ 60 = 1.71 bits/s"
        note: "Cross-check: the authors report 105.2 bits/min (1.75 bits/s, Table II), the mean of per-task B × CPM. The ratio 105.2 / 19.7 = 5.34 bits/char sits between B at the mean accuracy and log2 42 = 5.39 because most tasks finished at 100% accuracy. Either way it credits each LLM-inserted character with ~5.3 bits and uses the nominal CPM, overstating both the per-character information and the rate."
  - id: wolpaw
    method: "Wolpaw bitrate over N = 42 keys per selection (wall-clock)"
    scoreType: wolpaw
    kind: "Uniform 1-of-42 key-selection channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    compute:
      method: wolpaw
      targets: 42
      accuracy: 0.8846
      secondsPerSelection: 14.55
  - id: achieved
    method: "Nuyujukian achieved bitrate over N = 42 keys"
    scoreType: nuyujukian
    kind: "Achieved-bitrate view of the key-selection channel, shown for comparison"
    provenance: recomputed-omitted
    notUsedForRanking: true
    resultBitsPerSecond: 0.28
    steps:
      - title: "Achieved-bitrate credit per net-correct selection"
        math: "N = 42 → log2(N − 1) = log2(41) = 5.358 bits per net-correct selection (field-standard achieved bitrate)."
      - title: "Net-correct selection rate"
        math: "net-correct = 2P − 1 = 2(0.8846) − 1 = 0.769 of selections. At 1 / 14.55 s (402 Copy-LLM selections in 97.5 min) → 0.769 / 14.55 = 0.0529 correct/s."
        note: "Selection accuracy is Table I's all-session mean; Copy-LLM alone is not broken out. A wrong key commits an error that must be deleted, so incorrect = 1 − P."
      - title: "Achieved bitrate"
        math: "5.358 bits × 0.0529 correct/s = 0.28 bits/s"
referenceCalculationId: comm
---
