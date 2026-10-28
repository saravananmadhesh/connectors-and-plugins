# Writing good tests at a seam

## What a good test looks like

- It calls the code the way a real caller does, through the seam.
- It checks an outcome a caller can see: a return value, a response, a stored record read back through the public API, an emitted event.
- It survives a rewrite of the internals. If renaming a private function breaks the test, the test is too close to the code.
- It reads as a short example: arrange the inputs, act once, assert the result.
- It runs fast and gives the same result every time.

## Choosing the seam

- Pick the highest seam that still gives a fast, deterministic test. A module API is usually better than each function inside it.
- Go lower only when the higher seam makes the test slow or the failure hard to locate.
- One seam per behaviour. Do not prove the same behaviour again at a lower level.

## Choosing assertions

- Assert on the result, not on how it was produced.
- Assert on the whole value when it is small. For large values, assert on the fields the behaviour is about.
- Cover the edges the spec names: empty input, limits, invalid input, permission denied, not found.
- For errors, assert on the error type or code the caller handles, not on the full message text.

## When a test is hard to write

- Too much setup: the unit has too many collaborators. Note it for review and test through a higher seam for now.
- Cannot observe the result: the behaviour has no public effect. Ask whether it belongs in the spec.
- Depends on time, randomness or order: pass the clock, seed or ordering in through the seam.
- Needs the network or a shared service: see mocking.md.

## Signs a test should be deleted or rewritten

- It asserts that a particular internal method was called.
- It duplicates another test at a lower seam.
- It passes when the behaviour is broken.
- It fails on unrelated changes.
