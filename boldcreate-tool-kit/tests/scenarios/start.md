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
- Asked separately for "/start A command-line tool for my own use that adds, lists, tags and removes bookmarks" in an empty folder, the path line reads "New application, small lane" with 4 must features and one user group, and the hand-off passes the lane to define-product.
- When the host refuses to start a kit skill, start reads that skill's SKILL.md from the kit root it was given and follows it, without searching the disk for it.
