# Connect an external agent: deepagents examples

One flow, two languages. Both sync the plugins installed for a user-scoped API key into a folder
and give a [deepagents](https://github.com/langchain-ai/deepagents) agent the gateway's tools.

- [`python/`](python/README.md): Python 3 standard library helper plus `agent.py`.
- [`nodejs/`](nodejs/README.md): Node.js built-ins helper plus `agent.mjs`.

Both read `BOLDCREATE_INTEGRATIONS_URL` and `BOLDCREATE_INTEGRATIONS_API_KEY`. The Python README
describes the protocol, the key permissions and the rules a client must follow.
