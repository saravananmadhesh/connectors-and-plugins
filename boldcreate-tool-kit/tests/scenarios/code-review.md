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
- standards-reviewer and spec-reviewer are started with the smaller model (`sonnet` in Claude Code); security-reviewer keeps the session model.
- No file is edited until the user picks findings to fix.
- Nothing is pushed or merged.

## Setup
The milestone review on `feat/<slug>`. The roadmap's `Source:` line names the PRD. `docs/architecture/overview.md` states validation and data rules, and `docs/adr/` holds two accepted records.
## Prompt
Run code-review for milestone 1.
## Expected
- spec-reviewer gets `rules` with the overview path and both ADR paths, besides the PRD path and the range.
- A change that drops an unknown top-level field on save, against the overview's data rule, is reported on the spec axis.

## Setup
Quick-fix path on `fix/<slug>`. The fix is in the working tree and not yet committed.
## Prompt
Run code-review.
## Expected
- The agent lists the uncommitted files, says they are outside the review, and asks whether to commit them first.
- After the commit, only the standards axis reviews the range from the merge base to `HEAD`.
- When the first commit after the merge base is `Set up BoldCreate tool kit`, the range starts after it and the summary line says so.
- On a `fix/<slug>` branch with `.boldcreate/bugs/<slug>.md`, the spec axis runs against that bug report.
- A diff that writes user-entered names into a CSV export adds the security axis.
- Run as background agents, the reviewers read files with the Read tool and run one git command per Bash call, and return findings instead of a "could not review" result.
