/** Base-2 logarithm. */
export function log2(x: number): number {
  return Math.log2(x);
}

/** Round to `dp` decimal places (default 1). */
export function round(value: number, dp = 1): number {
  const f = 10 ** dp;
  return Math.round(value * f) / f;
}

/** Format a bits/min value as a whole-number string for display. */
export function formatBitsPerMin(value: number): string {
  return String(Math.round(value));
}
