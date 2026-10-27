---
name: code-review
description: Review a diff on two separate axes, standards and spec, using fresh reviewer agents, plus a security pass when risky areas change. Use before shipping, at the end of a milestone, or when asked to review code.
license: MIT
---

# Code review

Get independent findings on what changed, on axes that are reported separately so one cannot hide the other.

## Steps

1. **Fix the base point.** Choose the commit the review starts from:
   - the commit or range the caller or user named, else
   - the merge base with the default branch: `git merge-base HEAD <git.default_branch>`, reading the branch from `.boldcreate/project.yml` (default `main`).

   When the first commit after the base is `Set up BoldCreate tool kit`, move the base to that commit and say so; setup files are not part of the change. Record the range as `<base>..HEAD`. Only committed changes are reviewed. Run `git status`; if it shows uncommitted changes, list them, say they are outside the review, and ask the user whether to commit them first. Never skip them silently. Done when the range is fixed, the user has answered about any uncommitted changes, and `git diff --stat <base>..HEAD` is not empty.

2. **Check the host.** The reviewers must run as separate agents with no chat history. If the host cannot start subagents, stop here and tell the user that this review needs a host with subagent support. Do not review in the main session instead.

3. **Choose the axes.**
   - **Standards** always runs.
   - **Spec** runs when a spec or bug report exists for the change, unless this is the quick-fix path. Find it from the caller, the branch name, or `docs/specs/`. For a `fix/<slug>` branch, the bug report is `.boldcreate/bugs/<slug>.md`. If none exists, say so and skip the axis. For a milestone review (the whole integration branch), the spec is the one on the roadmap's `Source:` line, and the axis also checks the project rules: `overview.md` under `docs.architecture` (its validation and data rules) and every accepted decision record under `docs.adr`.
   - **Security** runs when the diff matches any trigger in [security.md](security.md). Check the changed paths and the diff text against the list.

   Done when each axis is marked run or skipped, with a reason for each skip.

4. **Start the reviewers in parallel.** Give each agent only paths, IDs and the commit range; never paste the diff or file contents. Where the host lets the caller pick an agent's model, start `standards-reviewer` and `spec-reviewer` with a smaller model (in Claude Code, `sonnet`). `security-reviewer` keeps the session's model.
   - `standards-reviewer`: the range, `.boldcreate/principles.md`, and the full path of this skill's [smells.md](smells.md).
   - `spec-reviewer`: the range, the spec or bug report path, the slice or story IDs in scope, and `.boldcreate/principles.md`. For a milestone review, also `rules`: the list of project rule paths from step 3.
   - `security-reviewer`: the range, the trigger lines that matched, and `.boldcreate/principles.md`.

   Done when every started reviewer has returned its report.

5. **Show the reports side by side.** Present one section per axis, in the order standards, spec, security, each with its own verdict line and finding table exactly as the reviewer returned it. Do not merge, re-rank, rewrite or drop findings. Above the sections, write one line naming the range and the axes run or skipped. Done when every report is shown.

6. **Resolve findings.** When a caller started this skill, return the reports to it and stop. When the user started it, ask which findings to fix, by ID. For each chosen finding, apply the fix, then run the `verify` skill once at the end. A finding you disagree with stays open with your reason beside it. Done when each chosen finding is fixed or answered and `verify` has returned.

## Quick-fix path

Run the standards axis only, on the range from the merge base to `HEAD`. The fix commit comes from the `tdd` skill. If step 1 finds the fix still uncommitted, offer to commit it as the fix commit before the review starts. Skip spec and security unless a security trigger matches; a match always adds the security axis.

## Rules

- Reviewers never edit files. All fixes happen in the main session or through the caller.
- A second review round runs only when the user asks or a blocking finding was fixed. Stop after two rounds and hand any open blocking findings to the user.
- Do not push, merge or open a pull request from this skill. Hand off to `ship`.
