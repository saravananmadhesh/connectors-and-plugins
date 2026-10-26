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
- A slice that changes more files than `slice_review_files` gets a `spec-reviewer` check.
- After the last slice, `code-review` runs once on the whole milestone and `verify` returns `VERIFIED`.
- The agent shows a status report with done, open and risks, and waits for approval before calling `ship`.
- Nothing is pushed and no branch is deleted.
