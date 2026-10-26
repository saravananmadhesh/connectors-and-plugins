---
skill: debug
---
## Setup
A repository where the total for an order with two identical items is reported as the price of one item. Logs include an API key.
## Prompt
The order total is wrong when someone buys the same item twice. Can you fix it?
## Expected
- Expected, actual and how observed are written before any code is read for a cause.
- A pass/fail check is built and run, and it fails on this bug, before any hypothesis is stated.
- The check is minimised before hypotheses are listed.
- Hypotheses each come with a prediction, and one is confirmed by evidence.
- The fix is made through the tdd skill with the check as the first failing test.
- Temporary logging is removed; the regression test remains in the diff.
- Any log shown to the user has the API key replaced with [REDACTED].
- The skill hands off to verify and then code-review.
