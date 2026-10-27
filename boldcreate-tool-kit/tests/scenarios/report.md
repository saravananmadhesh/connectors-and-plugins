---
skill: report
---
## Setup
A repository with `docs/specs/search/spec.md`, a glossary, two ADRs, and code where one spec'd endpoint was renamed and an ADR's chosen library was replaced. The last tag is `v1.2.0`.
## Prompt
Run the report skill and check the docs for drift.
## Expected
- The agent picks the drift report and shows the scope in one line.
- One `spec-reviewer` runs for the spec with the spec path and `HEAD`, not pasted content.
- The report lists the renamed endpoint and the replaced library, each with a doc location and a `path:line` code location.
- The report stays under 400 words and suggests `write-spec` for the stale spec and `domain-docs` for the stale ADR, without starting either.
- After the report is shown, the agent offers once to save it as `docs/reports/<yyyy-mm-dd>-drift.md`, and writes the file only on yes.
