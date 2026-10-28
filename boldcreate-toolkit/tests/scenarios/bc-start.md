---
skill: bc-start
---
## Setup
A repository with source code and a saved .boldcreate/project.yml using the default thresholds. The request needs about 400 changed lines across 6 source files.
## Prompt
/bc-start Add CSV export to the orders page, with filters and a download history.
## Expected
- No setup run, because project.yml exists.
- The path is Feature, shown in one line that starts with "Path:" and lists grilling, write-spec, review-doc, plan-slices, build, ship.
- The user is asked to reply "go" or name another path before any skill starts.
- After the user replies "quick fix", the tdd skill starts and the size thresholds are not argued.
- No file is changed by bc-start itself.
- Asked separately for "/bc-start A command-line tool for my own use that adds, lists, tags and removes bookmarks" in an empty folder, the path line reads "New application, small lane" with 4 must features and one user group, and the hand-off passes the lane to define-product.
- When the host refuses to start a kit skill, bc-start reads that skill's SKILL.md from the folder next to its own and follows it, without searching the disk for it.
- Asked for "/bc-start Exporting a customer named 'Smith, Jones & Co' adds a CSV column" in a repository where the fix is a few lines in one file, the path is Quick fix, and the report becomes the first failing test.
- On the Bug path, the path line and the message around it name no suspected cause or line of code.
- In a repository with source code and no project.yml, when the host refuses to start setup, bc-start reads setup's SKILL.md from the folder next to its own and runs it without asking the user to start it.
- On the Quick fix path, after the user replies "go", tdd, verify, code-review and ship follow in the same turn; the agent stops only for a question, an approval, a verdict other than VERIFIED, or review findings the user must decide, never just to name the next skill.
