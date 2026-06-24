import { describe, it, expect } from 'vitest';
import { log2, round, formatBitsPerMin } from '../math';

describe('log2', () => {
  it('computes base-2 logarithm', () => {
    expect(log2(8)).toBeCloseTo(3, 10);
    expect(log2(40)).toBeCloseTo(5.321928, 5);
  });
});

describe('round', () => {
  it('rounds to given decimal places', () => {
    expect(round(194.7321, 1)).toBe(194.7);
    expect(round(4.8678, 3)).toBe(4.868);
  });
  it('defaults to 1 decimal place', () => {
    expect(round(2.345)).toBe(2.3);
  });
});

describe('formatBitsPerMin', () => {
  it('rounds to a whole number string', () => {
    expect(formatBitsPerMin(194.7)).toBe('195');
    expect(formatBitsPerMin(22.6)).toBe('23');
  });
});
