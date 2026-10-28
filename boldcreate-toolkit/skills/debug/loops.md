# Ways to build a failing loop

Pick the first technique that gives a pass/fail result in seconds.

## Direct

- **Test at a seam.** Call the public function, endpoint or command with the input from the report and assert on the expected result.
- **Script.** A short script that sets up the state, calls the code, and exits non-zero when the result is wrong.
- **Request replay.** Capture the failing request and replay it against a local instance. Strip credentials and personal data from the capture first.

## Narrowing

- **Bisect history.** If the bug is new, use `git bisect run` with your check script to find the commit that introduced it.
- **Bisect input.** Halve a large failing input repeatedly, keeping the half that still fails.
- **Bisect config.** Switch settings, flags or dependency versions back to known-good values one at a time.
- **Compare environments.** When it fails in one place only, list the differences (versions, environment variables, data, locale, time zone) and test each.

## Intermittent failures

- Run the check in a loop many times and count failures. The loop passes only when it reaches the count with zero failures.
- Fix the seed, clock and ordering where the code allows it, to turn a rare failure into a constant one.
- Add timing or concurrency pressure: run in parallel, add delays around shared state.
- Log the sequence of events with timestamps on each run and compare a passing run with a failing one.

## When nothing reproduces locally

- Read the error, stack trace and logs from where it fails. Redact secrets before showing them.
- Write a test for the exact state the logs describe.
- If the state cannot be rebuilt, ask the user for a sample input or a safe copy of the data.
