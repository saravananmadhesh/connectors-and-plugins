# Slice frontier

The frontier is the set of slices that can start now. Work it, merge what finishes, and compute it again.

## Find the ready slices

A slice in the current milestone is ready when:

- its status is `todo`, and
- every slice in its `Blocked by` column is `done`.

If two ready slices plan to change the same files, run them one after the other. Parallel slices that edit the same lines turn into merge conflicts.

## Branch per slice

- Branch name: `feat/<slug>--<slice-id>`, for example `feat/billing--M1-S3`.
- Base: the current tip of the integration branch `feat/<slug>`, taken when the slice starts, so it includes every slice merged so far.
- Where the host runs agents in parallel, give each slice its own worktree (`git worktree add <path> -b <branch> feat/<slug>`) so agents never share a working folder.

## Merge one commit per slice

1. Switch to the integration branch and squash the slice in: `git merge --squash feat/<slug>--<slice-id>`.
2. On conflicts, resolve them using the spec and both slices' intent, then run the `verify` skill. Done when `VERIFIED`.
3. Set the slice's status to `done` in `docs/product/roadmap.md`, and stage it with the slice's changes.
4. Commit with the subject `<slice-id>: <slice title>`. The body lists what changed in one to three lines.
5. Fill the `Commit` column with the short hash at the next roadmap write: the next slice commit or the milestone review commit. The integration branch log is the record of truth; the subject prefix identifies each slice.
6. Remove the slice's worktree, if one was used. Keep the slice branch.

Done when the integration branch has one new commit for the slice and the roadmap shows it as `done`.

## Recompute

After each merge:

- New slices may now be ready. Start them from the new integration tip.
- Slices still running keep their old base. They pick up the new commit when they merge.
- If nothing is ready and nothing is running, the milestone is either complete or blocked.
