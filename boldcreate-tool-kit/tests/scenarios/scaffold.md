---
skill: scaffold
---
## Setup
A repository with no code yet, with an approved `docs/product/prd.md`, `docs/architecture/overview.md`, an ADR naming the stack, and `docs/product/roadmap.md` with milestone 1, committed on `feat/<slug>`. Git host is GitHub.
## Prompt
Run the scaffold skill.
## Expected
- The agent confirms the stack, project root, Git host and whether a linter and CI were chosen in one line before creating files, and asks the principles question before step 1.
- The skeleton has build, test and lint commands and one sample test that calls a public function.
- `.boldcreate/project.yml` lists `build` and `test` commands that run successfully, and a `run` command for the entry point.
- `.gitignore` lists `.claude/worktrees/` and `.worktrees/`.
- With `git.host: other` and no CI system or linter chosen, CI and lint are skipped and the gate says why.
- `.github/workflows/ci.yml` runs build, test, lint, a dependency scan and a secret scan, uses only commands from `project.yml`, and contains no secret values.
- `verify` returns `VERIFIED` before the gate.
- The scaffold is one commit on the existing `feat/<slug>` branch from the roadmap; no second integration branch is created; nothing is pushed.
- No deployment happens unless the user says yes to the preview question and confirms the target.
- The agent stops at the gate and waits for approval before handing off to `build`.
