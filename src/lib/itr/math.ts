/** Base-2 logarithm. */
export function log2(x: number): number {
  return Math.log2(x);
}

/** Round to `dp` decimal places (default 1). */
export function round(value: number, dp = 1): number {
  const f = 10 ** dp;
  return Math.round(value * f) / f;
}

/** Format a bits/s value for display. */
export function formatBitsPerSecond(value: number): string {
  if (value >= 10) return String(Math.round(value));
  if (value >= 1) return value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  return value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
}
