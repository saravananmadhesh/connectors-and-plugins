---
name: setup
description: Set up the kit in this repository. Finds your build, test, lint and run commands and writes .boldcreate/.
license: MIT
disable-model-invocation: true
---

# Setup

Write `.boldcreate/project.yml` and `.boldcreate/principles.md` from the repository's own files, and make sure the glossary and decision record folder exist. Detection runs once per repository; later runs read the saved file.

The templates live in this kit's `templates/` folder, two levels above this file.

## Steps

1. **Check for an existing setup.** If `.boldcreate/project.yml` exists and the user did not ask to detect again, show its `commands` block and stop here.

   Done when you either stopped with the saved commands shown, or there is no saved file, or the user asked to detect again.

2. **Detect commands.** Follow `detect.md` in this folder to find `build`, `typecheck`, `lint`, `test` and `run`. Take each command from a file in the repository. Leave out any command you cannot find there. Never invent one.

   Done when each of the five keys has a command with the file it came from, or is marked not found.

3. **Ask for missing commands.** If any key is not found, ask the user once, in one numbered list, with a short note on what each command is for. Keys the user skips stay out of the file.

   Done when every key has a command or the user chose to leave it out.

4. **Read the git settings.**
   - `git.host`: `github` when the `origin` remote URL contains `github`, `gitlab` when it contains `gitlab`, and `other` for anything else, including a local path or no remote. Do not ask.
   - `git.default_branch`: the branch `origin/HEAD` points to. If it is not set, ask the user.
   - `git.protected_branches`: the default branch, plus any branch the user names.

   Done when all three keys have values.

5. **Write `.boldcreate/project.yml`** from `templates/project.yml`. Fill in the commands from steps 2 and 3 and remove the lines for commands that were left out. Keep the default thresholds and doc paths unless the repository already keeps those docs elsewhere, for example decision records in another folder. In that case record the existing path.

   Done when the file exists, parses as YAML and holds only commands that came from the repository or the user.

6. **Write `.boldcreate/principles.md`.**
   - If the user or their organization provides a principles file, copy it.
   - Otherwise copy `templates/principles.md`, then add up to five project principles you can read from the repository's contributing guide, editor and lint settings, or the patterns most of the code follows. Each added line names its source.

   Show the file and ask the user to confirm or edit it, unless the calling skill already has the user's answer on principles.

   Done when the user has confirmed the principles, now or through the caller.

7. **Create the domain docs.** Run the `domain-docs` skill to create `GLOSSARY.md` and the decision record folder if they are missing.

   Done when both exist at the paths in `project.yml`.

8. **Keep local files out of Git.** Write `.boldcreate/.gitignore` with these lines, for files the kit writes for one session only:

   ```
   bugs/
   handoff.md
   pr-*.md
   review-*.md
   ```

   Then add `.claude/worktrees/` and `.worktrees/` to the repository's root `.gitignore` if they are not there, creating the file if needed. Never edit `.git/info/exclude`.

   Done when `git status` would not list any of these paths.

9. **Commit or leave for the first branch.** If the current branch is not protected, commit the setup files as one commit, `Set up BoldCreate tool kit`. On a protected branch, leave them uncommitted: the skill that next creates a work branch commits them there first, under the same subject.

   Done when the setup files are committed, or you are on a protected branch.

10. **Report and return.** List the files created or changed and the commands saved. Then hand back to the `start` skill, or stop if the user ran setup on its own.

   Done when the summary is shown.

## Rules

- Never run a detected command during setup. The `verify` skill runs them and reports failures.
- When a saved command later fails or is missing, ask the user for the right one and update `project.yml`. Do not guess a replacement.
- Never copy secrets, tokens or credentials from repository files into `.boldcreate/`.
