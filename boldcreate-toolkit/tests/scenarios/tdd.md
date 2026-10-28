---
skill: tdd
---
## Setup
A repository with .boldcreate/project.yml listing a test command and a spec at docs/specs/password-reset/spec.md with three acceptance points.
## Prompt
Implement the password reset spec test-first.
## Expected
- Seams are proposed and confirmed before any test is written.
- A behaviour list covers all three acceptance points.
- Each behaviour gets one test that is run and seen failing for the expected reason before production code changes.
- Each green step adds only the code that test needs, and the full test run passes after it.
- Tests use the agreed seams and do not assert on private functions.
- No refactoring happens inside the loop.
- The skill runs verify and reports the tests added.

## Setup
`bc-start` chose the quick-fix path. The session is on `main`, which is listed in `git.protected_branches`. The change stays inside a module API that existing tests cover.
## Prompt
go
## Expected
- Before any file changes, `fix/<slug>` is created from `main`.
- The seam is named with its test file in one line, without asking the user to confirm it.
- After verify returns VERIFIED, the change is committed once on `fix/<slug>`, with no extra prompt.
- When the same skill runs inside build for a slice, no `fix/` branch is created and no commit is made by this skill.
- Setup files left uncommitted on main are committed first on the new branch as `Set up BoldCreate Toolkit`, without asking.
- When `dotnet sln add` or a package tool rewrites a solution, project or lock file, the commit keeps only the lines the change needs; no byte order mark or unrelated platform entries are added.
- On the quick-fix and bug paths, code-review starts right after the commit, in the same turn.
