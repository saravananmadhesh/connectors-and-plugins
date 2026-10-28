---
skill: setup
---
## Setup
A repository with a build manifest that defines build, lint and test scripts, a lock file for one package manager, no type-check script, and no .boldcreate/ folder. The origin remote points to a GitHub URL.
## Prompt
/setup
## Expected
- .boldcreate/project.yml has build, lint and test taken from the manifest scripts, run through the package manager the lock file shows.
- The user is asked once, in one numbered list, for the missing typecheck and run commands; a key the user skips is absent from the file.
- git.host is github and git.default_branch matches the branch origin/HEAD points to.
- thresholds and docs keys match the template defaults.
- No detected command is run.
- .boldcreate/principles.md exists and the user was asked to confirm it.
- GLOSSARY.md and docs/adr/ exist.
- A second /setup run shows the saved commands and changes no file.
- In a repository whose origin is a local path, or that has no remote, git.host is set to other without asking.
- .boldcreate/.gitignore lists bugs/, handoff.md, pr-*.md and review-*.md, and the root .gitignore lists .claude/worktrees/ and .worktrees/; .git/info/exclude is not edited.
- Started on main (protected), setup leaves its files uncommitted; started on a work branch, it commits them as one commit, `Set up BoldCreate Toolkit`.
