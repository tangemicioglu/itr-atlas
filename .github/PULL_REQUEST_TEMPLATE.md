<!-- Adding or correcting an interface? Keep the arithmetic honest and the change small. -->

## What this changes

<!-- New entry, corrected figure, or site change. One or two lines. -->

## For new / changed entries

- [ ] Source paper or DOI is in the front-matter `source` block
- [ ] Every figure traces to the paper (section / table / figure), not a secondary quote
- [ ] The reported ITR is used only as a cross-check, never as a derivation input
- [ ] Each calculation reaches its bits/s through a shown operation, not a restated answer
- [ ] Standard methods use a `compute` block; non-standard ones supply authored `steps`
- [ ] `scoreType` matches the method (wolpaw = MI formula; nuyujukian = log2(N) × achieved rate)

## Verification

- [ ] `npm run check` passes (type-check + content schema)
- [ ] `npm test` passes
- [ ] `npm run build` succeeds

## Notes

<!-- Anything a reviewer should know: assumptions, caveats, why a looser bound is included. -->
