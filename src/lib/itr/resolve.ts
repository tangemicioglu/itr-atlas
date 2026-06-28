import type { CalcResult, DerivationStep } from './types';
import { computeWolpaw } from './wolpaw';
import { computeConfusionMI } from './mutual-info';

export type ComputeSpec =
  | { method: 'wolpaw'; targets: number; accuracy: number; secondsPerSelection: number }
  | { method: 'confusion-mi'; matrix: number[][]; secondsPerSelection: number };

export interface CalculationInput {
  compute?: ComputeSpec;
  steps?: DerivationStep[];
  resultBitsPerSecond?: number;
}

/** Normalize a calculation to { resultBitsPerSecond, steps } regardless of source. */
export function resolveCalculation(calc: CalculationInput): CalcResult {
  if (calc.compute) {
    switch (calc.compute.method) {
      case 'wolpaw':
        return computeWolpaw(calc.compute);
      case 'confusion-mi':
        return computeConfusionMI(calc.compute.matrix, calc.compute.secondsPerSelection);
    }
  }
  if (calc.steps && typeof calc.resultBitsPerSecond === 'number') {
    return { resultBitsPerSecond: calc.resultBitsPerSecond, steps: calc.steps };
  }
  throw new Error('Calculation must have either a compute spec or authored steps + resultBitsPerSecond.');
}
