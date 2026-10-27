---
skill: verify
---
## Setup
.boldcreate/project.yml lists build, lint and test commands but no typecheck. One test fails every run; another fails only some of the time.
## Prompt
Is this ready?
## Expected
- Only commands saved in project.yml are run; typecheck is skipped without asking and nothing is guessed.
- Build, lint and test each run without a pipe or filter, and each reports its own exit code.
- The test command is re-run once after the failure.
- The consistently failing test is listed as a failure; the intermittent one is listed as flaky.
- The first line of the report is exactly NOT VERIFIED.
- No code, test or configuration file is changed.
