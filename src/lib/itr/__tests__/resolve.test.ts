import { describe, it, expect } from 'vitest';
import { resolveCalculation } from '../resolve';
import type { CalculationInput } from '../resolve';

describe('resolveCalculation', () => {
  it('runs a Wolpaw compute spec', () => {
    const calc: CalculationInput = {
      compute: { method: 'wolpaw', targets: 40, accuracy: 0.96, secondsPerSelection: 1.5 },
    };
    const r = resolveCalculation(calc);
    expect(r.resultBitsPerSecond).toBeCloseTo(3.245, 3);
    expect(r.steps.length).toBe(3);
  });

  it('runs a confusion-MI compute spec', () => {
    const calc: CalculationInput = {
      compute: { method: 'confusion-mi', matrix: [[5, 0], [0, 5]], secondsPerSelection: 2 },
    };
    const r = resolveCalculation(calc);
    expect(r.resultBitsPerSecond).toBeCloseTo(0.5, 6);
  });

  it('passes through authored steps and result', () => {
    const calc: CalculationInput = {
      steps: [{ title: 'Word entropy', math: 'H = 9.1 bits/word' }],
      resultBitsPerSecond: 15.2,
    };
    const r = resolveCalculation(calc);
    expect(r.resultBitsPerSecond).toBe(15.2);
    expect(r.steps[0].title).toBe('Word entropy');
  });

  it('throws if neither compute nor authored result is present', () => {
    expect(() => resolveCalculation({} as CalculationInput)).toThrow();
  });
});
