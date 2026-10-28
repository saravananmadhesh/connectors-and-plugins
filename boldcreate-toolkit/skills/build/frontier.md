# Slice frontier

The frontier is the set of slices that can start now. Work it, merge what finishes, and compute it again.

## Find the ready slices

A slice in the current milestone is ready when:

- its status is `todo`, and
- every slice in its `Blocked by` column is `done`.

If two ready slices list the same main files in their slice details, run them one after the other. Parallel slices that edit the same lines turn into merge conflicts.

## Branch per slice

- Branch name: `feat/<slug>--<slice-id>`, for example `feat/billing--M1-S3`.
- Base: the current tip of the integration branch `feat/<slug>`, taken when the slice starts, so it includes every slice merged so far.
- Where the host runs agents in parallel and does not give each agent its own worktree, create one per slice under `.worktrees/` without the branch (`git worktree add --detach .worktrees/<slice-id> feat/<slug>`) and pass its path as `worktree`. The implementer creates the branch inside it, so agents never share a working folder.

## Verify in a temporary worktree

1. Create a fresh detached worktree at a path no earlier run used, under `.worktrees/` or outside the repository folder: `git worktree add --detach .worktrees/verify-<slice-id>-<short sha> <slice-branch>`. This works even while the slice branch is checked out elsewhere.
2. Run the `verify` skill inside it.
3. Remove it: `git worktree remove <path>`. Never reuse a verify worktree.

Done when `verify` has returned and `git worktree list` no longer shows the path.

## Merge one commit per slice

1. Switch to the integration branch and squash the slice in: `git merge --squash feat/<slug>--<slice-id>`.
2. On conflicts, resolve them using the spec and both slices' intent, then run the `verify` skill. Done when `VERIFIED`.
3. Set the slice's status to `done` in `docs/product/roadmap.md`, and stage it with the slice's changes.
4. Commit with the subject `<slice-id>: <slice title>`. The body lists what changed in one to three lines.
5. Write the new short hash into the slice's `Commit` column. A commit cannot hold its own hash, so this edit is committed with the next slice or a milestone fix commit. On resume, the integration branch log is the record of truth: the subject prefix identifies each slice.
6. Remove the implementer's worktree: the one this skill created, or the one the host made for the agent (in Claude Code, under `.claude/worktrees/`; `git worktree list` shows which one holds the slice branch). Run `git worktree remove <path>`, then `git worktree prune`. If the worktree has uncommitted changes, show them and ask the user before removing it. Keep the slice branch. The host may also have made a branch of its own for the worktree (in Claude Code, `worktree-agent-<id>`); it holds no slice work, so remove it with `git branch -d`, which refuses if it has unmerged commits.

Done when the integration branch has one new commit for the slice, the roadmap shows it as `done`, and `git worktree list` shows no worktree for the slice.

## Recompute

After each merge:

- New slices may now be ready. Start them from the new integration tip.
- Slices still running keep their old base. They pick up the new commit when they merge.
- If nothing is ready and nothing is running, the milestone is either complete or blocked.
