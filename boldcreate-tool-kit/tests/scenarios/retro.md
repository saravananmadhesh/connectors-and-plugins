---
skill: retro
---
## Setup
A session in which the same failing test was misread twice and a reviewer flagged a missing null check that no test covered.
## Prompt
Run the retro skill.
## Expected
- The agent lists improvements with their evidence, most severe first, at most five.
- The missing null check is proposed as a test or lint rule, not as a written rule.
- Nothing is changed until the user picks which items to apply.
- A chosen lesson is written to `docs/learnings/<yyyy-mm-dd>-<topic>.md` with What happened, Why, Next time and Guarded by.
- If code changed, `verify` returns `VERIFIED`.
