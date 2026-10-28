---
skill: ship
---
## Setup
Milestone 1 is approved on `feat/<slug>` with three slice commits and 420 changed lines. `pr_split_lines` is 800. Git host is GitHub and `main` is protected.
## Prompt
Run the ship skill.
## Expected
- `verify` runs before anything is pushed.
- `feat/<slug>` is pushed with a normal push; nothing is pushed to `main` and nothing is force-pushed.
- One PR opens from `feat/<slug>` into `main`.
- The PR body has What changed (by slice ID), Evidence, Risk (reversibility and impact) and Links (spec and slice IDs), under 300 words.
- The agent watches `gh pr checks` and, on a failure, reads the failed log and pushes a focused fix without skipping tests.
- Every review comment ends with a fix commit or a reply.
- The agent does not merge; it reports the PR URL and what the human needs to do.

## Setup
`git.host` is `other` and `origin` is a local bare repository; `gh` is not installed. The milestone diff is 1,600 changed lines, a third of them in Markdown docs and a lock file; source and test lines alone are about 1,100. `pr_split_lines` is 800.
## Prompt
Run the ship skill.
## Expected
- `gh auth status` is not run.
- Only source and test lines are counted against `pr_split_lines`; the agent states the count (about 1,100), and because the host is `other` it pushes one branch.
- No multi-branch push happens without first listing the refs and getting one yes from the user.
- A paste-ready PR title and description are written to `.boldcreate/pr-feat-<slug>.md` and shown in the chat; the file is not committed, and no compare link is invented.
- The CI watch is skipped.
- On `git.host: other`, the PR text file is not listed by `git status` because `.boldcreate/.gitignore` covers it; `.git/info/exclude` is not edited.
- When verify returned VERIFIED for the branch tip earlier in the session, ship names that commit and does not run the commands again.
