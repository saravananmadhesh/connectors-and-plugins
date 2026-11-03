# Handling limits and overload

How a client should behave when the service says "not now". Following this keeps a busy period short and stops a retry storm from making it longer.

## What you can receive

| Response                                   | Meaning                                                                                   | What to do                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `429` with `Retry-After`                   | Your key or project used its allowance for the window.                                    | Wait for `Retry-After` (or `x-ratelimit-reset`), then retry. |
| `503` with `Retry-After`                   | The service is at its limit or its database is busy. The `x-shed-reason` header says why. | Wait for `Retry-After`, add jitter, then retry. Slow down.   |
| `503` without `Retry-After`                | A dependency is down.                                                                     | Back off with jitter, starting at 1 second.                  |
| Other `5xx`, timeouts, dropped connections | Unknown outcome for a write.                                                              | Retry only if the request is safe to repeat (see below).     |
| `4xx` other than `429`                     | The request is wrong.                                                                     | Do not retry. Fix the request.                               |

`x-shed-reason` is one of `inflight` (too many requests at once on that instance), `event_loop` or `heap` (the instance is overloaded). All three mean the same to a client: wait and try again.

## Backoff

1. If `Retry-After` is present, wait at least that many seconds.
2. Otherwise wait `min(30, 2^attempt)` seconds, starting at 1.
3. Add jitter: multiply the wait by a random number between 0.5 and 1.5. Without it, clients that failed together retry together.
4. Stop after a fixed number of attempts or a total time (for example 5 attempts or 60 seconds) and report the failure.
5. Keep one retry budget per client, not per call, so many failing calls do not multiply the load.

## Writes and idempotency keys

A timeout or `5xx` on a write does not tell you whether it happened. Send an `Idempotency-Key` header with every `POST` you might repeat, and reuse the same key for every retry of the same action. The service then returns the first result instead of doing the work twice. Never reuse a key for a different action. `PUT` and `DELETE` are safe to repeat; a `POST` without a key is not.

## Tool calls

- A tool call that comes back as an error result saying the server is busy or paused is a refusal, not a failure of your request. Wait and call again, with the backoff above.
- Do not retry a tool call that may have changed something upstream unless the tool is documented as safe to repeat. A timeout on a call such as "create ticket" does not mean it did not run.
- Calls may take up to 120 seconds. Set your own client timeout above that, or you will abandon calls the service still completes.
- Keep calls short where you can. Long calls count against a separate, smaller allowance so that they cannot block short requests.

## Polling

- Use the `pollAfterSeconds` value the service returns; do not poll on a fixed timer.
- Add jitter (up to 20% of the interval) so many clients do not poll at the same second.
- Prefer a webhook to polling when the event is available.
- Never poll faster after an error. Treat a `429` or `503` as a request to slow down.

## When you hit limits often

A steady stream of `429` means the project is above its allowance; an administrator can raise it on the Limits page, and every change is kept in the audit log. A steady stream of `503` means the service is short of capacity; retrying harder makes it worse, so reduce concurrency first.
