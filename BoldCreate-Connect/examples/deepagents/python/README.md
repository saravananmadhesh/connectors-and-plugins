# Connect an external agent: deepagents example

Any runtime that can make HTTPS calls can use the plugins installed for a person, a team or an
organization: a cloud agent, a command line tool or an editor extension. This folder shows the
whole flow with [deepagents](https://github.com/langchain-ai/deepagents) as the example agent.

One **user-scoped API key** does everything. Create it under **Me → API keys** with these
permissions:

| Permission          | Used for                                   |
| ------------------- | ------------------------------------------ |
| `mcp:list`          | `tools/list` on `/mcp`                     |
| `mcp:call`          | `tools/call` on `/mcp`                     |
| `artifact:sync`     | `GET /v1/sync` and `POST /v1/sync/reports` |
| `artifact:download` | `GET /v1/plugin-versions/{id}/archive`     |

The key is shown once. Keep it in an environment variable or a secrets store, never in a file the
agent can read, a log or a checkpoint.

```sh
export BOLDCREATE_INTEGRATIONS_URL=https://gateway.example.com   # the gateway host; the only host you need
export BOLDCREATE_INTEGRATIONS_API_KEY=fyk_...
```

## The three calls

Every client does the same three things; the helper in this folder is one implementation.

```sh
# 1. What is installed for this key? Send the ETag back to get a cheap 304.
curl -sD - -H "Authorization: Bearer $BOLDCREATE_INTEGRATIONS_API_KEY" \
  "$BOLDCREATE_INTEGRATIONS_URL/v1/sync?target=deepagents&kinds=skill,rule"

# 2. Download one archive from the `href` of an entry; check its `sha256` and `sizeBytes`.
curl -s -H "Authorization: Bearer $BOLDCREATE_INTEGRATIONS_API_KEY" \
  "$BOLDCREATE_INTEGRATIONS_URL/v1/plugin-versions/pv_.../archive" -o plugin.tar.gz

# 3. Tools: JSON-RPC over HTTP. Names are <server>__<tool>.
curl -s -H "Authorization: Bearer $BOLDCREATE_INTEGRATIONS_API_KEY" -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' "$BOLDCREATE_INTEGRATIONS_URL/mcp"
```

What a client should do with the answers:

- Send `If-None-Match` with the last `ETag`; a `304` means nothing changed. Wait at least
  `pollAfterSeconds` between asks.
- Download only entries whose `sha256` differs from what is on disk, and verify the hash and size.
- Place each plugin in its own folder so synced files never mix with your own.
- A `yanked: true` entry was withdrawn by its publisher but is still installed; keep it working and
  tell the user.
- `kinds` names what your client can place (`skill`, `rule`, `agent`, `hook`). Anything else comes
  back under `skipped`, so nothing is lost silently. Do not ask for `hook` unless your runtime has a
  hook engine, and never run hooks from an archive otherwise.
- Archives are untrusted: refuse paths that leave the folder, skip links and device files, cap file
  count and size.

## Files

| File                                   | What it is                                                              |
| -------------------------------------- | ----------------------------------------------------------------------- |
| `boldcreate_integrations_sync.py`      | The sync helper and a small command line. Python standard library only. |
| `agent.py`                             | A deep agent that loads the synced skills and the gateway's tools.      |
| `test_boldcreate_integrations_sync.py` | Tests for the helper against a local fake service.                      |

## Run it

Sync only (nothing to install):

```sh
python boldcreate_integrations_sync.py --dir ./boldcreate-plugins --target deepagents --kinds skill,rule
python boldcreate_integrations_sync.py --dir ./boldcreate-plugins --watch      # repeat at the service's pace
python boldcreate_integrations_sync.py --dir ./boldcreate-plugins --report     # tell the service what was placed
```

The agent:

```sh
pip install -r requirements.txt
export ANTHROPIC_API_KEY=...          # or the key of the provider named in MODEL
python agent.py "Review the latest changes"
```

`agent.py` syncs first. If the sync fails it carries on with the files already on disk, so a
network problem does not stop the agent. Its tools come from `/mcp`, so they follow what is
installed and enabled for the key's owner without any change on your side.

## Other clients

- **Command line tool or CI job:** run `boldcreate_integrations_sync.py` before your tool starts, point the tool
  at the folder, and give it `/mcp` with the same key.
- **Editor or IDE:** register `$BOLDCREATE_INTEGRATIONS_URL/mcp` as an HTTP MCP server with an
  `Authorization: Bearer` header, and run the sync helper on a timer for skills and rules.
- **A service that runs agents for many people:** keep one key per person (user scope) so each run
  sees only what that person may use. A team or organization key sees the team's or the
  organization's installs.

## Tests

```sh
python -m unittest discover -s examples/deepagents/python      # helper against a fake service
pnpm test -- --only=integration                         # helper against the live gateway
```

`agent.py` is not run by the tests because it needs a model provider key.
