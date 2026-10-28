---
skill: review-doc
---
## Setup
A 1200-word spec at docs/specs/invoice-reminders/spec.md with one missing acceptance check and one requirement that contradicts another. .boldcreate/project.yml uses the default large_doc_words of 2500.
## Prompt
/review-doc docs/specs/invoice-reminders/spec.md
## Expected
- Round 1 starts one doc-reviewer with the spec path, the spec lens path, the principles path and the focus "clarity and readiness"; no document text is pasted.
- The report has a verdict line and a table with D-prefixed IDs, severity, location, quote and fix, under 400 words.
- Every finding gets Fix, Keep with a reason, or Ask; Ask findings go to the user as one grilling round.
- When round 1 is BLOCKING, round 2 runs one pass for a document at or under `large_doc_words` and two passes in parallel above it; when round 1 is not BLOCKING, no second round runs.
- No third round runs; any blocker left after round 2 is put to the user.
- The summary returns the final verdict and a resolution table; no report file is written.
- On the feature path, after the user approves, the spec status is Approved and the spec, glossary and decision records are committed as one commit, `Add <feature> spec`.
