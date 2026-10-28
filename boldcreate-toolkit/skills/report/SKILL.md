---
name: report
description: Write a drift report, release notes, or a progress summary for a period.
license: MIT
disable-model-invocation: true
---

# Report

Produce one of three reports from the repository and the Git host. Each report type has its own file in this folder; load only the one you need.

| Report | When | File |
|---|---|---|
| Drift | Docs may no longer match the code: specs, glossary, decision records | `drift.md` |
| Release notes | Before a release, or to summarise what merged since the last tag | `release-notes.md` |
| Progress | A person's work over a period, for a standup, review or status update | `progress.md` |

## Steps

1. **Pick the report.** Match the user's request to a row above. If it fits none or more than one, ask which, with drift as the recommended answer when the request mentions docs or specs. Done when one report type is chosen.
2. **Fix the scope.** Each file states its default scope: drift covers all specs, release notes start at the last tag, progress covers the last seven days for the current git user. Show the scope in one line and let the user change it.
3. **Load the file and follow it.** Done when the file's own check passes.
4. **Show the report** in the chat. Done when the full report is shown.
5. **Offer to save.** For a drift report or release notes, ask once whether to save it under `docs.reports` in `project.yml` (default `docs/reports`), as `<yyyy-mm-dd>-drift.md` or `<yyyy-mm-dd>-release-notes.md`. Write the file only when the user says yes. Save a progress summary only when the user asks, at the path they name. Done when the user has answered and any approved file exists.

## Hand-offs

- A spec the drift report finds stale goes to the `write-spec` skill to update. A stale glossary term or decision record goes to the `domain-docs` skill. Suggest the hand-off; start it only when the user agrees.
- Release notes never create a tag or a release. If the user asks for either, confirm the version and the target commit in this session first.

## Rules

- Every claim in a report points to its source: a file path, a commit hash or a PR number.
- Report what the repository shows. Leave out work that has no commit or PR behind it.
- Redact secrets and personal data other than names and Git handles.
