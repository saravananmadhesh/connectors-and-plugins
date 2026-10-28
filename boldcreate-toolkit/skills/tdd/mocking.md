# Test doubles

Use a real collaborator unless one of these is true:

- It crosses the system boundary: network calls, third-party APIs, email, payment, the operating system clock.
- It is slow enough to make the suite painful to run on every change.
- It is non-deterministic: time, random values, concurrency order.

## Rules

- Replace collaborators only at the system boundary or at an interface the project owns. Do not mock a library's internals.
- Prefer a fake (a small working in-memory version) over a mock that records calls. A fake lets the test assert on outcomes.
- When a mock is needed, assert on what the system sent across the boundary (the request, the message), not on how many times a method ran.
- Keep each double next to the seam it replaces and reuse it across tests.
- Never put real credentials in a double or a fixture. Use obvious placeholder values.

## Databases and storage

- Use the same engine the project runs on when the test command can start it quickly, for example an in-memory or containerised instance.
- If only a fake is practical, keep a small set of tests against the real engine so the fake cannot drift.

## When the code is hard to double

If a collaborator is created inside the code under test and cannot be replaced, pass it in through the seam instead. This is a design change: keep it to the minimum needed for the test and mention it in the hand-off report.
