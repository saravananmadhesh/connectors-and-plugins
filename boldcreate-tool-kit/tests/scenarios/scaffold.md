---
skill: scaffold
---
## Setup
An empty repository with an approved `docs/product/prd.md`, `docs/architecture/overview.md`, an ADR naming the stack, and `docs/product/roadmap.md` with milestone 1. Git host is GitHub.
## Prompt
Run the scaffold skill.
## Expected
- The agent confirms the stack, project root and Git host in one line before creating files.
- The skeleton has build, test and lint commands and one sample test that calls a public function.
- `.boldcreate/project.yml` lists `build` and `test` commands that run successfully.
- `.github/workflows/ci.yml` runs build, test, lint, a dependency scan and a secret scan, uses only commands from `project.yml`, and contains no secret values.
- `verify` returns `VERIFIED` before the gate.
- The scaffold is one commit on `feat/<slug>`; nothing is pushed.
- No deployment happens unless the user says yes to the preview question and confirms the target.
- The agent stops at the gate and waits for approval before handing off to `build`.
