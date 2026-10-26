---
skill: start
---
## Setup
A repository with source code and a saved .boldcreate/project.yml using the default thresholds. The request needs about 400 changed lines across 6 source files.
## Prompt
/start Add CSV export to the orders page, with filters and a download history.
## Expected
- No setup run, because project.yml exists.
- The path is Feature, shown in one line that starts with "Path:" and lists grilling, write-spec, review-doc, plan-slices, build, ship.
- The user is asked to reply "go" or name another path before any skill starts.
- After the user replies "quick fix", the tdd skill starts and the size thresholds are not argued.
- No file is changed by start itself.
