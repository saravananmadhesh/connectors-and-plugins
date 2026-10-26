# Wide mechanical changes

A wide change touches many call sites in the same way: a rename, a changed signature, a moved module, a replaced dependency. Done in one step it breaks the build until every site is fixed, and it is too large for one session. Plan it in three phases so the build and tests pass after every slice.

## Phases

1. **Expand.** Add the new form next to the old one. The old name forwards to the new one, or both signatures are accepted. Nothing calls the new form yet except its own tests.
2. **Migrate in batches.** Move call sites to the new form, one batch per slice. Group a batch by module or folder so each slice stays under `thresholds.slice_review_files` changed files where possible. Batches do not block each other, so they can be built in parallel; each is blocked only by the expand slice.
3. **Contract.** Remove the old form once no call site uses it. This slice is blocked by every migrate slice.

## Slice checks

- Expand: build and tests pass; the new form has its own tests.
- Each migrate batch: build and tests pass; a search shows no use of the old form left in that batch's area.
- Contract: build and tests pass; a search shows no use of the old form anywhere.

## When to skip the phases

If the change touches few enough files to fit one slice, make it one slice. If the old form is part of a public interface used outside the repository, keep it through the contract phase and ask the user how long it must stay, then record the answer in a decision record.
