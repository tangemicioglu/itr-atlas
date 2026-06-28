import type { CalcResult, DerivationStep } from './types';
import { log2, round } from './math';

export interface WolpawInputs {
  /** Number of selectable targets, N. */
  targets: number;
  /** Accuracy P, in [0, 1]. */
  accuracy: number;
  /** Total seconds per selection (stimulus + shift). */
  secondsPerSelection: number;
}

/** Wolpaw bits per selection. Returns 0 when accuracy is at or below chance. */
export function bitsPerSelection(N: number, P: number): number {
  if (P >= 1) return log2(N);
  if (P <= 1 / N) return 0;
  const term1 = log2(N);
  const term2 = P * log2(P);
  const term3 = (1 - P) * log2((1 - P) / (N - 1));
  return term1 + term2 + term3;
}

export function computeWolpaw(inputs: WolpawInputs): CalcResult {
  const { targets: N, accuracy: P, secondsPerSelection: T } = inputs;
  const B = bitsPerSelection(N, P);
  const selectionsPerSecond = 1 / T;
  const resultBitsPerSecond = B * selectionsPerSecond;

  const steps: DerivationStep[] = [
    {
      title: 'Bits per selection (Wolpaw formula)',
      math:
        `B = log2(N) + P*log2(P) + (1-P)*log2((1-P)/(N-1))\n` +
        `  = log2(${N}) + ${P}*log2(${P}) + ${round(1 - P, 4)}*log2(${round(1 - P, 4)}/${N - 1})\n` +
        `  = ${round(B, 3)} bits / selection`,
      note: 'Term 1 is the information if every choice were correct; terms 2-3 subtract the bits lost to the error rate, assumed spread evenly over the other N-1 targets.',
    },
    {
      title: 'Selections per second',
      math: `T = ${T} s/selection  ->  1 / ${T} = ${round(selectionsPerSecond, 3)} selections/s`,
    },
    {
      title: 'Information transfer rate',
      math: `ITR = B * selections/s = ${round(B, 3)} * ${round(selectionsPerSecond, 3)} = ${round(resultBitsPerSecond, 3)} bits/s`,
    },
  ];

  return { resultBitsPerSecond, steps };
}
