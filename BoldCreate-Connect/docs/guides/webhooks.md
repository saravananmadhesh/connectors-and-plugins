# Project webhooks

A project has one webhook: an `https` address, the events it wants and a signing secret. People set it in the console (the secret is shown once, and can be rotated there). A host reads its deliveries with a project key that has `observability:read`; it cannot change where events go, so a leaked host key cannot redirect a customer's events.

## Events

| Type                    | When                                        |
| ----------------------- | ------------------------------------------- |
| `user.created`          | the first session creates a project user    |
| `user_plugin.installed` | a user installs a plugin                    |
| `user_plugin.updated`   | a user's install is updated                 |
| `user_plugin.removed`   | a user removes a plugin                     |
| `connection.activated`  | a user finishes a sign-in to an MCP server  |
| `connection.expired`    | a user's sign-in needs to be done again     |
| `sync.reported`         | a user's client reports the files it placed |
| `plugin.suspended`      | a plugin in the project is suspended        |

Events are read from the audit trail by a worker, so each state change produces one event, and logs, usage and webhooks cannot disagree.

## The request

A `POST` with a JSON body and three headers:

| Header              | Value                                           |
| ------------------- | ----------------------------------------------- |
| `webhook-id`        | the event id; the same id on every retry        |
| `webhook-timestamp` | seconds since 1970 when this attempt was signed |
| `webhook-signature` | `v1,` plus the base64 HMAC-SHA256 signature     |

```json
{
  "id": "<event id>",
  "type": "connection.activated",
  "createdAt": "2026-10-17T12:00:00.000Z",
  "projectId": "<project id>",
  "userId": "user-42",
  "data": {},
  "version": 1
}
```

`userId` is the host's own id. `version` is the shape of the payload; a later shape gets a new number.

## Check the signature

The signature is HMAC-SHA256 over `<webhook-id>.<webhook-timestamp>.<raw body>` with the secret, in base64. Use the client package; it compares in constant time, refuses a timestamp more than 300 seconds off (pass `toleranceSeconds` to change it) and accepts a header that carries several signatures when any one matches.

```ts
import { ConnectClient } from '@syncfusion/boldcreate-connect';

const connect = new ConnectClient({ apiKey: process.env.CONNECT_PROJECT_KEY! });

app.post('/hooks/connect', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    const event = connect.webhooks.verify({
      rawBody: req.body, // the bytes exactly as they arrived, not a parsed object
      headers: req.headers,
      secret: process.env.CONNECT_WEBHOOK_SECRET!,
    });
    if (alreadySeen(event.id)) return res.sendStatus(200);
    queue(event); // do the work after you answer
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
});
```

`verify` throws a `ConnectError` with the code `webhook_invalid` and never returns a body it has not checked.

## Retries and what to do about them

- Any `2xx` ends the delivery. Anything else, a timeout or a dropped connection is a failed attempt.
- A failed attempt is tried again after a wait that doubles each time, up to 8 attempts in all. A delivery that still fails is marked `failed`.
- Redirects are not followed, and the address is checked again on every send: a private or local address is refused.
- Sending is at least once. **Dedupe by event id**: keep the ids you have handled for a day or more and answer `200` for one you have seen.
- Answer quickly and do the work afterwards; a slow answer is a failed attempt.
- Do not depend on order across event types. Read the current state when it matters.

## See what was sent

```ts
const page = await connect.webhooks.deliveries({ status: 'failed', limit: 25 });
```

Each delivery shows its event id, type, status, number of attempts and the time of the next attempt. Rows are purged after a retention period.

## Refresh on an event, not on a timer

A marketplace page that shows what a user has installed reads `GET /v1/project/user-plugins?userId=` instead of keeping a copy. Polling it counts against the project budget (3,000 a minute), so refresh when `user_plugin.*`, `connection.*` or `sync.reported` arrives for that user.
