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
- The skill ends by running verify and reporting the tests added.
