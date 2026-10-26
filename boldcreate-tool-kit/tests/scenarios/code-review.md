---
skill: code-review
---
## Setup
A feature branch with three commits on top of main. The diff adds a login endpoint and a hard-coded token. A spec exists at docs/specs/login/spec.md. The host supports subagents.
## Prompt
Review my changes before I open a PR.
## Expected
- The base point is the merge base with main, and the range is stated.
- standards-reviewer and spec-reviewer are started in parallel with paths and the commit range only, with no pasted diff.
- security-reviewer is also started, because the diff touches authentication and contains a token.
- Reports are shown in three separate sections, each with its own verdict, not merged or re-ranked.
- The hard-coded token appears as a finding.
- No file is edited until the user picks findings to fix.
- Nothing is pushed or merged.
