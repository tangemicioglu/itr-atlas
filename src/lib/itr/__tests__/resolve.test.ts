import { describe, it, expect } from 'vitest';
import { resolveCalculation } from '../resolve';
import type { CalculationInput } from '../resolve';

describe('resolveCalculation', () => {
  it('runs a Wolpaw compute spec', () => {
    const calc: CalculationInput = {
      compute: { method: 'wolpaw', targets: 40, accuracy: 0.96, secondsPerSelection: 1.5 },
    };
    const r = resolveCalculation(calc);
    expect(r.resultBitsPerMin).toBeCloseTo(194.7, 1);
    expect(r.steps.length).toBe(3);
  });

  it('runs a confusion-MI compute spec', () => {
    const calc: CalculationInput = {
      compute: { method: 'confusion-mi', matrix: [[5, 0], [0, 5]], secondsPerSelection: 2 },
    };
    const r = resolveCalculation(calc);
    expect(r.resultBitsPerMin).toBeCloseTo(30, 6);
  });

  it('passes through authored steps and result', () => {
    const calc: CalculationInput = {
      steps: [{ title: 'Word entropy', math: 'H = 9.1 bits/word' }],
      resultBitsPerMin: 912,
    };
    const r = resolveCalculation(calc);
    expect(r.resultBitsPerMin).toBe(912);
    expect(r.steps[0].title).toBe('Word entropy');
  });

  it('throws if neither compute nor authored result is present', () => {
    expect(() => resolveCalculation({} as CalculationInput)).toThrow();
  });
});
