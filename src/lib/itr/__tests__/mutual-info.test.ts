import { describe, it, expect } from 'vitest';
import { mutualInformationBits, computeConfusionMI } from '../mutual-info';

describe('mutualInformationBits', () => {
  it('is log2(N) for a perfect uniform diagonal', () => {
    expect(mutualInformationBits([[5, 0], [0, 5]])).toBeCloseTo(1, 6);
    expect(mutualInformationBits([[3, 0, 0], [0, 3, 0], [0, 0, 3]])).toBeCloseTo(Math.log2(3), 6);
  });
  it('is ~0 for an independent (uniform) matrix', () => {
    expect(mutualInformationBits([[2, 2], [2, 2]])).toBeCloseTo(0, 6);
  });
  it('is between 0 and log2(N) for a noisy matrix', () => {
    const mi = mutualInformationBits([[8, 2], [3, 7]]);
    expect(mi).toBeGreaterThan(0);
    expect(mi).toBeLessThan(1);
  });
});

describe('computeConfusionMI', () => {
  it('scales MI by selections per minute and emits steps', () => {
    const r = computeConfusionMI([[5, 0], [0, 5]], 2);
    expect(r.resultBitsPerMin).toBeCloseTo(30, 6);
    expect(r.steps[0].title).toBe('Mutual information from the confusion matrix');
  });
});
