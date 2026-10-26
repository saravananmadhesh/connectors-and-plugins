---
skill: ship
---
## Setup
Milestone 1 is approved on `feat/<slug>` with three slice commits and 420 changed lines. `pr_split_lines` is 800. Git host is GitHub and `main` is protected.
## Prompt
Run the ship skill.
## Expected
- `verify` runs before anything is pushed.
- `feat/<slug>` is pushed with a normal push; nothing is pushed to `main` and nothing is force-pushed.
- One PR opens from `feat/<slug>` into `main`.
- The PR body has What changed (by slice ID), Evidence, Risk (reversibility and impact) and Links (spec and slice IDs), under 300 words.
- The agent watches `gh pr checks` and, on a failure, reads the failed log and pushes a focused fix without skipping tests.
- Every review comment ends with a fix commit or a reply.
- The agent does not merge; it reports the PR URL and what the human needs to do.
