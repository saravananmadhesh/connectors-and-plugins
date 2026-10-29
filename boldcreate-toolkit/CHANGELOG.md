# Changelog

All notable changes to this plugin will be documented here.

## 0.7.0 - 2026-10-29

- Updated plugin version for marketplace release.

## 0.6.0 - 2026-10-28

- Every skill now works when BoldCreate Connect delivers it on its own. The templates moved into the skills that use them (`prd-template.md` in `define-product`, `roadmap-template.md` in `plan-slices`, `spec-template.md` in `write-spec`, `project-template.yml` and `principles-template.md` in `setup`), and the review checklists moved into `review-doc` as `lens-<name>.md`. The kit-level `templates/` and `lenses/` folders are gone.
- `review-doc` gives the doc reviewer the full path of the lens file, so the agent no longer looks for a kit folder.
- The Claude Code session-start hook prints the always-on rules itself instead of reading `instructions.md`, which is removed. It prints the kit's skills folder only when Claude Code provides it.
- `bc-start` and the always-on rules find a skill the host will not start in the folder next to the current skill's folder (`../<name>/SKILL.md`).
- `npm run validate` now fails when a kit has plugin-level files, hook script files, or a skill that points outside its own folder.

## 0.5.0 - 2026-10-28

- The plugin is now `boldcreate-toolkit` (shown as BoldCreate Toolkit). Reinstall it under the new name: in Claude Code, `/plugin install boldcreate-toolkit@boldcreate-plugins`.
- The `start` skill is now `bc-start`, so it no longer clashes with other plugins that ship a `start` skill. In Cursor, type `/bc-start`. In Claude Code, type `/boldcreate-toolkit:bc-start`.
- `setup` now commits its files as `Set up BoldCreate Toolkit`, and `code-review` leaves out a first commit with that subject.

## 0.4.0 - 2026-10-28

- A confirmed path keeps going. After `go`, the quick-fix and bug paths run fix, verify, review and ship in one turn, and stop only for a question, an approval, a failed or inconclusive check, or review findings you must decide.
- `build` starts the next ready slices as soon as one merges, instead of asking after each slice whether to go on.
- The README and `build` show the allow rules in both forms, `Bash(...)` and `PowerShell(...)`, because Claude Code on Windows runs most commands in PowerShell.
- On Windows, `build` recognises a test run that Smart App Control or Application Control refused (error `0x800711C7`), or a path that is too long, stops without trying to get around it, and suggests a repository outside `%TEMP%` on a short path. The README says the same.
- `tdd` and the implementer keep only the lines a change needs when a tool rewrites a solution, project or lock file, and keep its encoding, byte order mark and line endings.
- `debug`'s failing check covers every place the bug report says the bug shows, such as both endpoints.
- `review-doc` sizes round 2 like round 1, so a short document gets one reviewer in round 2 instead of two.
- The repository keeps LF line endings on every OS with `.gitattributes`, so `npm run validate` no longer reports false drift on Windows checkouts that convert line endings.

## 0.3.0 - 2026-10-27

- `setup` keeps the kit's one-session files (pull request text, review reports, bug reports, handoff) out of Git with `.boldcreate/.gitignore`, ignores agent worktree folders, and commits its own files as one commit that reviews leave out.
- Feature work starts on a `feat/<slug>` branch before the spec is written, and the approved spec and the roadmap are each committed there, so nothing is left on the default branch.
- `debug` saves the bug report to `.boldcreate/bugs/<slug>.md`, and `code-review` checks the fix against it on every bug.
- `debug` records why it skips narrowing steps when one read of the code shows the cause, and reads `tdd` before writing the fix.
- `start` sends a defect report that already names what to change to the quick-fix path, and never names a suspected cause before `debug` runs.
- Every agent reads and edits files with file tools and runs one plain command per call, so background runs are not refused, and retries once before giving up. When an implementer is still refused, `build` names the command to allow and builds that slice in the main session.
- `build` removes the extra branch Claude Code makes for each implementer worktree, and the implementer switches to its slice branch before reading anything.
- `start` runs `setup` itself when the host will not start it, instead of asking you to run it.
- Exports to CSV or spreadsheets now trigger the security review.
- `ship` reuses a `VERIFIED` result for the same commit instead of running every command again.

## 0.2.0 - 2026-10-27

- New applications with a few must-have features and one user group take a small lane: a short PRD, a short architecture with fewer decision records, and one combined review.
- Standards and spec reviews run on a smaller model where the host lets the caller pick one. Implementers and the other reviewers keep the session's model.
- `build` costs less: each implementer reads only the spec sections and files its slice needs, and milestone review findings are fixed directly or in one small run per blocking finding instead of one large run.
- `build` removes each implementer worktree after its slice is merged, and verifies each slice in a fresh temporary worktree that it removes afterwards.
- Quick fixes and bug fixes now work on a `fix/<slug>` branch and end in one commit, which `code-review` then reviews.
- `ship` works on Git hosts other than GitHub and GitLab: it pushes one branch, gives you pull request text ready to paste, and asks before pushing more than one branch.
- Reviewer and implementer reports are shorter: paths are relative to the repository, and long file lists are cut to five lines.
- Spec reviews of a milestone also check the validation and data rules in the architecture and decision records.
- A clearer bar for which choices earn a decision record, so fewer, more useful records are written.
- `grilling` looks up facts itself and skips confirmations that would not change an answer.
- Approved product and architecture docs are committed early, on an integration branch, and `plan-slices` records which files each slice changes so slices that share files run in order.
- `report` saves its output to `docs/reports`.
- `verify` keeps each command's real exit code in its evidence.
- In Claude Code, the session-start hook also prints the kit's folder, so skills that Claude Code will not start by itself can be read and followed from there.

## 0.1.0 - 2026-10-26

- First release: 18 skills (6 the agent can start on its own, 12 started by name), 5 agents and 4 rules for one software delivery lifecycle on any stack.
- Four paths sized to the request: quick fix, bug, feature and new application.
- Context budgets checked in CI: always-loaded text, `SKILL.md` size and agent file size.
- Listed in the BoldCreate Connect, Cursor and Claude Code marketplaces. In Claude Code, a session-start hook loads the always-on rules from `instructions.md`.
