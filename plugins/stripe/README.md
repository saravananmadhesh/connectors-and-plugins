# Stripe

Work with Stripe customers, payments, subscriptions, and search Stripe docs.

| | |
| --- | --- |
| Transport | Streamable HTTP |
| Endpoint | `https://mcp.stripe.com` |
| Auth | API key or token, sent as a Bearer header |
| Test wave | A |
| Vendor docs | https://docs.stripe.com/mcp |

## Install-time variables

| Variable | Name | Required | Secret | Description |
| --- | --- | --- | --- | --- |
| `STRIPE_AGENT_KEY` | Stripe agent API key | Yes | Yes | An API key with the Agent badge from the Stripe Dashboard. From December 2026 the server rejects other secret and restricted keys. |
