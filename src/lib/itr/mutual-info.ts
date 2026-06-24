import type { CalcResult, DerivationStep } from './types';
import { log2, round } from './math';

/** Mutual information I(X;Y) in bits/selection from a confusion matrix of counts. */
export function mutualInformationBits(matrix: number[][]): number {
  const total = matrix.flat().reduce((a, b) => a + b, 0);
  if (total === 0) return 0;

  const rowSums = matrix.map((row) => row.reduce((a, b) => a + b, 0));
  const colSums = matrix[0].map((_, j) => matrix.reduce((a, row) => a + row[j], 0));

  let mi = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const nij = matrix[i][j];
      if (nij === 0) continue;
      const pij = nij / total;
      const px = rowSums[i] / total;
      const py = colSums[j] / total;
      mi += pij * log2(pij / (px * py));
    }
  }
  // Clamp tiny negative values from floating-point error.
  return mi < 0 && mi > -1e-12 ? 0 : mi;
}

export function computeConfusionMI(matrix: number[][], secondsPerSelection: number): CalcResult {
  const mi = mutualInformationBits(matrix);
  const selectionsPerMin = 60 / secondsPerSelection;
  const resultBitsPerMin = mi * selectionsPerMin;

  const steps: DerivationStep[] = [
    {
      title: 'Mutual information from the confusion matrix',
      math:
        `I(X;Y) = sum P(x,y) * log2( P(x,y) / (P(x)*P(y)) )\n` +
        `       = ${round(mi, 3)} bits / selection`,
      note: 'Uses the full N×N matrix of measured confusions, so it makes no symmetric-error assumption.',
    },
    {
      title: 'Information transfer rate',
      math: `ITR = I(X;Y) * 60 / ${secondsPerSelection} = ${round(mi, 3)} * ${round(selectionsPerMin, 2)} = ${round(resultBitsPerMin, 1)} bits/min`,
    },
  ];

  return { resultBitsPerMin, steps };
}
