/** One row of a small table shown inside a derivation step. */
export interface StepTable {
  columns: string[];
  rows: string[][];
}

/** One step of a worked derivation, rendered in order. */
export interface DerivationStep {
  title: string;
  /** Monospace math block. Use "\n" for line breaks. */
  math?: string;
  /** Plain-language explanation shown under the math. */
  note?: string;
  table?: StepTable;
}

/** Output of any compute helper: the number plus how it was reached. */
export interface CalcResult {
  resultBitsPerMin: number;
  steps: DerivationStep[];
}
