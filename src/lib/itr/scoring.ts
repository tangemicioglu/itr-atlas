// Scoring-type model for the atlas.
//
// Every scoring method here is an upper bound on the information a channel
// delivers, so no single method is "the" rate. The atlas reports the STRICTEST
// (smallest) available bound per entry as the headline number, and lets the reader
// switch the displayed value to any one scoreType. Shannon character/word entropy
// is treated the same as the rest — it often comes out strictest for text entries,
// but not always (a small-vocabulary Wolpaw bound can be tighter, e.g. moses).

export type ScoreType =
  | 'fitts'
  | 'wolpaw'
  | 'nuyujukian'
  | 'shannon';

export interface ScoreTypeDef {
  key: ScoreType;
  label: string;
  /** Short gloss for tooltips / methodology. */
  blurb: string;
}

// Display order for the selector, ordered by how often entries use each type.
// "Strictest" is handled separately as the default.
export const SCORE_TYPES: ScoreTypeDef[] = [
  { key: 'shannon', label: 'Shannon (text)', blurb: 'Information delivered as English text, under one ~1 bit/char predictor.' },
  { key: 'wolpaw', label: 'Wolpaw', blurb: 'Mutual-information bitrate over N targets, discounted by accuracy.' },
  { key: 'fitts', label: "Fitts' law", blurb: 'Index of difficulty per movement (continuous pointing).' },
  { key: 'nuyujukian', label: 'Nuyujukian', blurb: 'Sustained achieved bitrate on a grid task: log2(N-1) bits per correct selection × net rate (e.g. Webgrid BPS).' },
];

export const scoreTypeLabel = (k: ScoreType): string =>
  SCORE_TYPES.find((s) => s.key === k)?.label ?? k;

/** A calculation reduced to what scoring needs: its family, value, and eligibility. */
export interface ScorableCalc {
  scoreType?: ScoreType;
  resultBitsPerSecond: number;
  /** Excluded from the strictest-min (context / ceiling / hypothetical derivations). */
  notUsedForRanking?: boolean;
}

export interface StrictestResult {
  bitsPerSecond: number;
  scoreType: ScoreType;
}

/**
 * The calc that defines the headline: the smallest upper bound among calcs that
 * (a) carry a scoreType and (b) are eligible (not flagged notUsedForRanking).
 * Returns null when no eligible scored calc exists — the entry has no ranked rate.
 * Generic so callers can read the winning calc's other fields (provenance, etc.).
 */
export function strictestCalc<T extends ScorableCalc>(calcs: T[]): T | null {
  let best: T | null = null;
  for (const c of calcs) {
    if (!c.scoreType || c.notUsedForRanking) continue;
    if (!best || c.resultBitsPerSecond < best.resultBitsPerSecond) best = c;
  }
  return best;
}

/** Convenience wrapper: just the strictest value and which type won it. */
export function strictest(calcs: ScorableCalc[]): StrictestResult | null {
  const c = strictestCalc(calcs);
  return c && c.scoreType ? { bitsPerSecond: c.resultBitsPerSecond, scoreType: c.scoreType } : null;
}

/**
 * The calc to show when a single scoreType is selected. Prefers eligible calcs of
 * that type (min among them); falls back to the min over all calcs of the type so
 * an author-reported-only family (e.g. a loose Wolpaw ceiling) still surfaces when
 * explicitly requested. Returns null when the entry has no calc of that type.
 */
export function pickForType<T extends ScorableCalc>(calcs: T[], type: ScoreType): T | null {
  const ofType = calcs.filter((c) => c.scoreType === type);
  if (ofType.length === 0) return null;
  const eligible = ofType.filter((c) => !c.notUsedForRanking);
  const pool = eligible.length > 0 ? eligible : ofType;
  return pool.reduce((m, c) => (c.resultBitsPerSecond < m.resultBitsPerSecond ? c : m));
}

/** Convenience wrapper: just the value for a selected type. */
export function valueForType(calcs: ScorableCalc[], type: ScoreType): number | null {
  const c = pickForType(calcs, type);
  return c ? c.resultBitsPerSecond : null;
}

/** Which scoreTypes this entry can be displayed under (has at least one calc). */
export function availableTypes(calcs: ScorableCalc[]): ScoreType[] {
  const present = new Set<ScoreType>();
  for (const c of calcs) if (c.scoreType) present.add(c.scoreType);
  return SCORE_TYPES.map((s) => s.key).filter((k) => present.has(k));
}
