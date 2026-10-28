# Failing CI

Find the first real error, reproduce it locally, fix only that, and check again.

## Steps

1. **List the failures.** `gh pr checks <number>`. Note each failing check and its run link.
2. **Read the log.** `gh run view <run-id> --log-failed`. Find the first error, not the last line; later errors often follow from the first one. Redact any secret before quoting the log.
3. **Classify it.**
   | Cause | Action |
   |---|---|
   | This PR's code or tests | Fix it (step 4). |
   | Environment or setup that differs from local, such as a tool version | Fix the CI file or the project config so both match `project.yml`. |
   | Flaky: passes on re-run with no change | Re-run once: `gh run rerun <run-id> --failed`. If it passes, report the test as flaky with its name. |
   | Also fails on the default branch | Not caused by this PR. Report it to the user and stop. |
4. **Reproduce and fix.** Run the matching command from `project.yml` locally until it fails the same way. Make the smallest change that fixes the cause. Run the `verify` skill. Done when `VERIFIED`.
5. **Push and re-check.** Commit as `Fix CI: <what failed>`, push normally, then `gh pr checks <number> --watch`.

After three fix rounds without green, show the user what you tried and the current error, and ask whether to continue.

## Never

- Skip, disable or delete a test to make CI pass.
- Weaken a lint rule, coverage threshold or scan setting to make CI pass, unless the user asks for that change.
- Push an empty commit or close and reopen the PR to start CI.
