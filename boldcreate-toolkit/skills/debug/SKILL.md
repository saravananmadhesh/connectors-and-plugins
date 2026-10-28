---
name: debug
description: Diagnose a bug by first building a fast pass/fail check that fails on it, then narrowing the cause. Use when something is broken, a test fails unexpectedly, or behaviour differs from what was expected.
license: MIT
---

# Debug

Get a red signal on the bug before forming any theory about it.

## Safety

Redact keys, tokens, passwords, connection strings and personal data from every log, trace or output you show or save. Replace each value with `[REDACTED]`. Never commit them.

## Steps

1. **State the bug.** Pick a slug: two to four kebab-case words naming the bug. Write `.boldcreate/bugs/<slug>.md` with the ID `BUG-<slug>` on the first line, then expected behaviour, actual behaviour, and how it was observed, one line each. This file is the bug report that `code-review` checks the fix against; it stays out of Git. If the report lacks any of the three and you cannot find it, ask the user. Done when the file holds all three lines.

2. **Set up the branch.** Read `git.default_branch` and `git.protected_branches` from `.boldcreate/project.yml`. If the current branch is a work branch not in `protected_branches`, stay on it. Otherwise create `fix/<slug>` from `git.default_branch`. If setup left its files uncommitted, commit them on the new branch first as `Set up BoldCreate Toolkit`. Done when the current branch is not protected, before any file changes.

3. **Build the loop.** Create the fastest repeatable check that passes when the bug is absent and fails while it is present. Prefer, in order: a failing test at a public seam, a script that calls the code and checks the result, a command against the running app. When the report names more than one place where the bug shows, such as two endpoints, commands or screens, the check covers each of them. Run it. Done when the check fails, and fails for the reason in step 1. Read [loops.md](loops.md) if no quick check comes to mind or the bug is intermittent.

   Do not read code looking for the cause, and do not change code, until this step is done.

4. **Minimise.** Remove inputs, steps, data and configuration from the loop until removing anything more makes it pass. Done when the loop is as small and fast as you can make it and still fails.

5. **Hypothesise.** Write up to three causes that would explain the failure, each with a prediction you can test ("if the cache is stale, clearing it makes the loop pass"). Done when each hypothesis has a test that can rule it in or out.

   When the failing check and one read of the code it points to show a single cause, write that one hypothesis with its prediction and test it once in step 6. Say in one line why minimising and further hypotheses were not needed; never drop those steps without that line.

6. **Instrument.** Test the hypotheses one at a time, most likely first: add temporary logging, assertions or a debugger stop, or change one input. Run the loop after each change. Done when one hypothesis is confirmed by evidence and the others are ruled out. If all are ruled out, return to step 5 with what you learned.

7. **Clean up.** Remove every temporary log, assertion and debug change from step 6. Keep the loop; if it is not yet a test, turn it into one at the nearest public seam. Done when the only change left is the failing regression test.

8. **Fix.** Read the `tdd` skill before writing any fix. The regression test is its first Red step, so continue from its Green step; it keeps the branch from step 2, runs `verify`, and commits the fix once on `VERIFIED`. Done when the fix commit exists and contains only the fix and the regression test.

9. **Hand off.** Run the `code-review` skill on the range from the merge base with `git.default_branch` to `HEAD`, and pass `.boldcreate/bugs/<slug>.md` as the bug report for the spec axis.

## Report

Give the user, in a few lines: the cause, the evidence that confirmed it, the fix, and the regression test that now guards it.

## Stop and ask

- The loop cannot be made to fail after a reasonable effort: report what you tried and ask the user for more detail.
- The fix needs a change to a public interface, the data model or the spec: describe it and wait for the user to decide.
