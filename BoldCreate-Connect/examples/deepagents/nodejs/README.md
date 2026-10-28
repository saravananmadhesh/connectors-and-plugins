# deepagents example (Node.js)

The same flow as the [Python example](../python/README.md), with Node.js 20 or newer. Read that
file for the key permissions, the three calls and what a client should do with the answers.

```sh
export BOLDCREATE_INTEGRATIONS_URL=https://gateway.example.com   # the gateway host
export BOLDCREATE_INTEGRATIONS_API_KEY=fyk_...                   # a For You organization key
```

| File                                    | What it is                                                        |
| --------------------------------------- | ----------------------------------------------------------------- |
| `boldcreate-integrations-sync.mjs`      | Sync helper and command line. Node.js built-ins only, no install. |
| `agent.mjs`                             | A deep agent with the synced skills and the gateway's tools.      |
| `boldcreate-integrations-sync.test.mjs` | Tests for the helper against a local fake service (`node:test`).  |

## Run it

```sh
node boldcreate-integrations-sync.mjs --dir ./boldcreate-plugins --target deepagents --kinds skill,rule
node boldcreate-integrations-sync.mjs --dir ./boldcreate-plugins --watch    # repeat at the service's pace
node boldcreate-integrations-sync.mjs --dir ./boldcreate-plugins --report   # tell the service what was placed

npm install
export ANTHROPIC_API_KEY=...        # or the key of the provider named in MODEL
node agent.mjs "Review the latest changes"
```

From code:

```js
import { Client, sync } from './boldcreate-integrations-sync.mjs';

const result = await sync(new Client(url, key), './boldcreate-plugins', { target: 'deepagents' });
```

## Tests

```sh
node --test examples/deepagents/nodejs     # helper against a fake service
pnpm test -- --only=integration            # helper against the live gateway
```

`agent.mjs` is not run by the tests because it needs a model provider key.
