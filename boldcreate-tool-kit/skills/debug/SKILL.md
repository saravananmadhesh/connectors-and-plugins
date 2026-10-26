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

1. **State the bug.** Write expected behaviour, actual behaviour, and how it was observed, one line each. If the report lacks any of these and you cannot find it, ask the user. Done when all three lines are written.

2. **Build the loop.** Create the fastest repeatable check that passes when the bug is absent and fails while it is present. Prefer, in order: a failing test at a public seam, a script that calls the code and checks the result, a command against the running app. Run it. Done when the check fails, and fails for the reason in step 1. Read [loops.md](loops.md) if no quick check comes to mind or the bug is intermittent.

   Do not read code looking for the cause, and do not change code, until this step is done.

3. **Minimise.** Remove inputs, steps, data and configuration from the loop until removing anything more makes it pass. Done when the loop is as small and fast as you can make it and still fails.

4. **Hypothesise.** Write up to three causes that would explain the failure, each with a prediction you can test ("if the cache is stale, clearing it makes the loop pass"). Done when each hypothesis has a test that can rule it in or out.

5. **Instrument.** Test the hypotheses one at a time, most likely first: add temporary logging, assertions or a debugger stop, or change one input. Run the loop after each change. Done when one hypothesis is confirmed by evidence and the others are ruled out. If all are ruled out, return to step 4 with what you learned.

6. **Fix.** Hand off to the `tdd` skill with the loop as the first failing test. If the loop is not yet a test, turn it into one at the nearest public seam first. Done when the fix makes the loop pass.

7. **Clean up.** Remove every temporary log, assertion and debug change from step 5. Keep the loop as a regression test. Done when the diff contains only the fix and the regression test.

8. **Hand off.** Run the `code-review` skill, using the `verify` verdict from tdd.

## Report

Give the user, in a few lines: the cause, the evidence that confirmed it, the fix, and the regression test that now guards it.

## Stop and ask

- The loop cannot be made to fail after a reasonable effort: report what you tried and ask the user for more detail.
- The fix needs a change to a public interface, the data model or the spec: describe it and wait for the user to decide.
