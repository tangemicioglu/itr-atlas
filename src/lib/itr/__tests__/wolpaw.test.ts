import { describe, it, expect } from 'vitest';
import { bitsPerSelection, computeWolpaw } from '../wolpaw';

describe('bitsPerSelection', () => {
  it('matches the worked SSVEP example (N=40, P=0.96)', () => {
    expect(bitsPerSelection(40, 0.96)).toBeCloseTo(4.868, 3);
  });
  it('equals log2(N) at perfect accuracy', () => {
    expect(bitsPerSelection(40, 1)).toBeCloseTo(Math.log2(40), 6);
    expect(bitsPerSelection(2, 1)).toBeCloseTo(1, 6);
  });
  it('is 0 when accuracy is at or below chance', () => {
    expect(bitsPerSelection(4, 0.25)).toBeCloseTo(0, 6);
    expect(bitsPerSelection(4, 0.1)).toBe(0);
  });
});

describe('computeWolpaw', () => {
  it('produces the reference ITR for the SSVEP example', () => {
    const r = computeWolpaw({ targets: 40, accuracy: 0.96, secondsPerSelection: 1.5 });
    expect(r.resultBitsPerSecond).toBeCloseTo(3.245, 3);
  });
  it('emits ordered derivation steps with titles', () => {
    const r = computeWolpaw({ targets: 40, accuracy: 0.96, secondsPerSelection: 1.5 });
    expect(r.steps.map((s) => s.title)).toEqual([
      'Bits per selection (Wolpaw formula)',
      'Selections per second',
      'Information transfer rate',
    ]);
    expect(r.steps[0].math).toContain('log');
  });
});
