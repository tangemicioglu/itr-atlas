import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stepSchema = z.object({
  title: z.string(),
  math: z.string().optional(),
  note: z.string().optional(),
  table: z
    .object({ columns: z.array(z.string()), rows: z.array(z.array(z.string())) })
    .optional(),
});

const computeSchema = z.discriminatedUnion('method', [
  z.object({
    method: z.literal('wolpaw'),
    targets: z.number(),
    accuracy: z.number(),
    secondsPerSelection: z.number(),
  }),
  z.object({
    method: z.literal('confusion-mi'),
    matrix: z.array(z.array(z.number())),
    secondsPerSelection: z.number(),
  }),
]);

const provenance = z.enum([
  'author-reported-verified',
  'author-reported-unverified',
  'recomputed-omitted',
  'recomputed-flawed',
]);

const calculationSchema = z
  .object({
    id: z.string(),
    method: z.string(),
    kind: z.string(),
    provenance,
    compute: computeSchema.optional(),
    steps: z.array(stepSchema).optional(),
    resultBitsPerMin: z.number().optional(),
    notUsedForRanking: z.boolean().default(false),
    flawReason: z.string().optional(),
  })
  .refine((c) => c.compute || (c.steps && typeof c.resultBitsPerMin === 'number'), {
    message: 'A calculation needs either a compute spec or authored steps + resultBitsPerMin.',
  });

const interfaces = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/interfaces' }),
  schema: z.object({
    name: z.string(),
    image: z.string().optional(),
    year: z.number().optional(),
    modalityTags: z.array(z.string()),
    sensingModality: z.string(),
    invasiveness: z.enum(['non-invasive', 'partially-invasive', 'invasive']),
    source: z.object({
      authors: z.string(),
      venue: z.string(),
      year: z.number(),
      doi: z.string().optional(),
      url: z.string().url().optional(),
    }),
    inputs: z.array(
      z.object({
        symbol: z.string(),
        value: z.string(),
        unit: z.string().optional(),
        sourceNote: z.string(),
      }),
    ),
    calculations: z.array(calculationSchema).min(1),
    referenceCalculationId: z.string(),
  }),
});

export const collections = { interfaces };
