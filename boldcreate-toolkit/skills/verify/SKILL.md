---
name: verify
description: Run the project's saved build, typecheck, lint and test commands and return VERIFIED, NOT VERIFIED or INCONCLUSIVE with evidence. Use before calling any change done, and whenever another skill asks for verification.
license: MIT
---

# Verify

Prove the current state of the code with the project's own commands, and report exactly what happened.

## Steps

1. **Read the commands.** Open `.boldcreate/project.yml` and read `commands.build`, `commands.typecheck`, `commands.lint` and `commands.test`. Do not detect or guess commands; use only what is saved. Done when you have the list of saved commands.

2. **Fill gaps.** If the file is missing, or `commands.test` is missing, ask the user for the command. If the user gives one, offer to save it to `project.yml`. If the user says the project has none, continue without it. A missing build, typecheck or lint command is skipped without asking. Done when every command you will run is known.

3. **Run in order.** Run build, typecheck, lint, test, skipping any that are not saved. Run each from the repository root, unfiltered: never pipe it through a filter such as `grep`, `head` or `tail`, because the pipe reports the filter's exit code instead of the command's. Record each exit code as soon as the command ends, then trim the output for the report. Stop after the first failing command except lint, which never blocks the test run. Done when each command has run or been skipped.

4. **Re-run failures once.** If tests failed, run the test command one more time. Compare the failing test names. A test that fails on one run and passes on the other is flaky. Done when each failing test is marked as consistent or flaky.

5. **Summarise.** For each failure, give the test name or the first error with its `path:line`, and one line on what it says. Group repeated errors from the same cause. Redact keys, tokens, passwords and connection strings as `[REDACTED]`. Do not paste full logs. Done when the summary is written.

6. **Give the verdict.** Pick exactly one:

   | Verdict | When |
   |---|---|
   | `VERIFIED` | Every command that ran exited with 0, and a test command ran. |
   | `NOT VERIFIED` | Build, typecheck or lint failed, or a test failed on both runs. |
   | `INCONCLUSIVE` | No test command exists, a command could not start (tool missing, timeout, environment error), or the only test failures are flaky. |

   Done when the verdict line is written.

## Report format

```
NOT VERIFIED

| Command | Exit | Result |
|---|---|---|
| build | 0 | passed |
| typecheck | 0 | passed |
| lint | 1 | 2 warnings treated as errors |
| test | 1 | 1 consistent failure, 1 flaky |

Failures
- test: "rejects an expired token" (src/auth/session.test:41) expected 401, got 200
- test (flaky): "lists orders newest first" passed on re-run
- lint: unused import (src/orders/list:3)
```

The verdict is always the first line. Put the exact commands you ran under the table when they are not obvious from `project.yml`.

## Rules

- Never report `VERIFIED` without running the commands in this session.
- Never change code, tests or configuration inside this skill. Fixing is the caller's job.
- Never mark a test as skipped or disabled to reach `VERIFIED`.
- Return the report to the caller. When called directly, show it to the user.
