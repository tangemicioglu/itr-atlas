import { describe, it, expect } from 'vitest';
import { strictest, strictestCalc, valueForType, pickForType, availableTypes } from '../scoring';
import type { ScorableCalc } from '../scoring';

const c = (
  scoreType: ScorableCalc['scoreType'],
  resultBitsPerSecond: number,
  notUsedForRanking = false,
): ScorableCalc => ({ scoreType, resultBitsPerSecond, notUsedForRanking });

describe('strictest', () => {
  it('picks the smallest eligible upper bound', () => {
    const r = strictest([c('fitts', 3.2), c('wolpaw', 5.1), c('shannon', 2.4)]);
    expect(r).toEqual({ bitsPerSecond: 2.4, scoreType: 'shannon' });
  });

  it('ignores calcs flagged notUsedForRanking even if they are smaller', () => {
    const r = strictest([c('wolpaw', 5.1), c('shannon', 1.0, true)]);
    expect(r).toEqual({ bitsPerSecond: 5.1, scoreType: 'wolpaw' });
  });

  it('ignores calcs with no scoreType', () => {
    const r = strictest([{ resultBitsPerSecond: 0.1 }, c('fitts', 3.0)]);
    expect(r).toEqual({ bitsPerSecond: 3.0, scoreType: 'fitts' });
  });

  it('returns null when no eligible scored calc exists', () => {
    expect(strictest([c('wolpaw', 5.1, true)])).toBeNull();
    expect(strictest([{ resultBitsPerSecond: 1 }])).toBeNull();
  });

  it('treats Shannon like any other type (no carve-out)', () => {
    // Shannon being smaller means Shannon wins. Exactly the intended behavior.
    const r = strictest([c('shannon', 1.8), c('wolpaw', 4.0), c('fitts', 3.1)]);
    expect(r?.scoreType).toBe('shannon');
  });
});

describe('strictestCalc / pickForType return the winning calc', () => {
  it('strictestCalc returns the calc object (so callers can read its other fields)', () => {
    const calcs = [
      { ...c('wolpaw', 5.1), provenance: 'author-reported-verified' },
      { ...c('shannon', 2.4), provenance: 'recomputed-omitted' },
    ];
    const winner = strictestCalc(calcs);
    expect(winner?.provenance).toBe('recomputed-omitted');
    expect(winner?.resultBitsPerSecond).toBe(2.4);
  });

  it('pickForType returns the representative calc of a type', () => {
    const calcs = [
      { ...c('wolpaw', 5.1), id: 'a' },
      { ...c('wolpaw', 4.0), id: 'b' },
    ];
    expect(pickForType(calcs, 'wolpaw')?.id).toBe('b');
    expect(pickForType(calcs, 'fitts')).toBeNull();
  });
});

describe('valueForType', () => {
  it('returns the eligible value for a present type', () => {
    expect(valueForType([c('fitts', 3.2), c('wolpaw', 5.1)], 'wolpaw')).toBe(5.1);
  });

  it('returns null when the type is absent', () => {
    expect(valueForType([c('fitts', 3.2)], 'wolpaw')).toBeNull();
  });

  it('prefers eligible calcs, taking the min among them', () => {
    expect(
      valueForType([c('wolpaw', 5.1), c('wolpaw', 4.0), c('wolpaw', 1.0, true)], 'wolpaw'),
    ).toBe(4.0);
  });

  it('falls back to a notUsedForRanking calc when the type has no eligible one', () => {
    // A loose author-reported Wolpaw ceiling still surfaces when explicitly selected.
    expect(valueForType([c('wolpaw', 9.9, true)], 'wolpaw')).toBe(9.9);
  });
});

describe('availableTypes', () => {
  it('lists present types in canonical order, deduped', () => {
    const types = availableTypes([c('wolpaw', 5), c('fitts', 3), c('wolpaw', 4)]);
    expect(types).toEqual(['wolpaw', 'fitts']);
  });

  it('ignores calcs without a scoreType', () => {
    expect(availableTypes([{ resultBitsPerSecond: 1 }])).toEqual([]);
  });
});
