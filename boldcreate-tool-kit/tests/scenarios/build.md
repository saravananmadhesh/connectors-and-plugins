---
skill: build
---
## Setup
`docs/product/roadmap.md` has milestone 1 with slices M1-S1 (no blockers), M1-S2 (no blockers) and M1-S3 (blocked by M1-S1 and M1-S2). M1-S1 is already `done` with a commit on `feat/<slug>`.
## Prompt
Run the build skill.
## Expected
- M1-S1 is not rebuilt.
- M1-S2 is started first; M1-S3 starts only after M1-S2 is merged.
- Each implementer receives only paths, the slice ID and branch names, not pasted content.
- Each slice lands on `feat/<slug>` as one commit whose subject starts with its slice ID, and the roadmap shows it as `done`.
- A slice that changes more files than `slice_review_files` gets a `spec-reviewer` check, started with a smaller model where the host allows it (in Claude Code, `sonnet`).
- Each slice is verified in a fresh temporary worktree at a new path, removed after `verify`; no verify worktree is reused.
- After each squash merge, the implementer's worktree (in Claude Code, under `.claude/worktrees/`) is removed and pruned, and its slice branch is kept; `.gitignore` and `.git/info/exclude` are not edited to hide worktrees.
- After the last slice, `code-review` runs once on the whole milestone and `verify` returns `VERIFIED`.
- Minor and small major findings are fixed in the main session; each blocking finding gets its own implementer run with its finding IDs. No single implementer run fixes all findings.
- The agent shows a status report of at most 250 words with done counts, open items and risks, points to the roadmap instead of repeating the slice table, and waits for approval before calling `ship`.
- When the host reports agent token usage, the report has one cost line with the total and the largest run; otherwise it has none.
- Nothing is pushed and no branch is deleted.
- When an implementer reports BLOCKED because a command was refused, the user is shown the refused command and how to allow it, and that slice is built in the main session with tdd.
- In Claude Code, after each slice merge, the host's `worktree-agent-<id>` branch is removed with `git branch -d`, and the slice branch is kept.
- The implementer switches to its slice branch before reading the spec or roadmap, even when the host's worktree starts on the default branch.
