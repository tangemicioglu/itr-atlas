import { describe, expect, it } from 'vitest';
import content from '../../../content/interfaces/willett-2021-handwriting.md?raw';

describe('Willett handwriting word-level supplementary calculation', () => {
  it('keeps the stricter raw WER word-entropy calculation as supplementary context', () => {
    expect(content).toContain('method: "Word-entropy throughput from raw WER"');
    expect(content).toContain('resultBitsPerSecond: 1.12');
    expect(content).toContain('notUsedForRanking: true');
    expect(content).toContain('25.1% raw word error rate');
  });
});
