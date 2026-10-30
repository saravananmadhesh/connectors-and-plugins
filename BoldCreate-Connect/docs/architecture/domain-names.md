# Domain names

Public and internal hostnames for this product under `boldcreate.ai`. Status: stem `connect` confirmed. Hostnames are a one-way door (host products store gateway URLs, OAuth redirect URIs and cookie scopes), so the final choice is recorded in `decisions.md`.

## Principles

1. **Product-specific names.** `boldcreate.ai` already hosts other applications that use common labels (`admin`, `api`, `app`, `mcp`, `console`, `portal`). Every host of this product carries the product stem, so it cannot clash.
2. **Stem first, role second, one flat label.** `connect-admin`, not `admin.connect`. Flat labels are shorter to type and are covered by the existing `*.boldcreate.ai` wildcard certificate (a wildcard covers one level only).
3. **Only what must be public is public.** The API and worker are internal.
4. **Role is readable from the name.** Nobody has to look up what a host is.

## Applications and exposure

| App       | Exposure | Who uses it                                                                                     |
| --------- | -------- | ----------------------------------------------------------------------------------------------- |
| `web`     | Public   | Users and org admins, in a browser                                                              |
| `admin`   | Public   | BoldCreate operators                                                                            |
| `gateway` | Public   | Agents and host apps (MCP, sync, plugin archives, project API); forwards to the API             |
| `api`     | Internal | `web`, `admin` and `gateway` through `API_BASE_URL`; the gateway already proxies project routes |
| `worker`  | Internal | Background jobs; outbound connections only (database, Redis), no hostname needed                |

The gateway forwards to the API (`apps/gateway/src/app.ts`, `createArtifactProxy` with `config.API_BASE_URL`), so host and agent traffic never needs a public API host.

## Confirmed names

Stem: `connect`. Status: confirmed. Fix these before registering OAuth redirect URIs or giving customers gateway URLs.

### Production

| App       | Address                                            |
| --------- | -------------------------------------------------- |
| `web`     | `connect.boldcreate.ai`                            |
| `admin`   | `connect-admin.boldcreate.ai`                      |
| `gateway` | `connect-gateway.boldcreate.ai`                    |
| `api`     | `api.connect.internal` (private zone)              |
| `worker`  | `worker.connect.internal` (private zone, optional) |

### Preproduction

| App       | Address                                 |
| --------- | --------------------------------------- |
| `web`     | `connect-preprod.boldcreate.ai`         |
| `admin`   | `connect-admin-preprod.boldcreate.ai`   |
| `gateway` | `connect-gateway-preprod.boldcreate.ai` |

### Staging

| App       | Address                                 |
| --------- | --------------------------------------- |
| `web`     | `connect-staging.boldcreate.ai`         |
| `admin`   | `connect-admin-staging.boldcreate.ai`   |
| `gateway` | `connect-gateway-staging.boldcreate.ai` |

The environment suffix goes last, so every host is one flat label under `boldcreate.ai` and the existing wildcard certificate covers all of them. Internal API and worker names are per environment in their own private zone (for example `api.connect-staging.internal`).

## Rejected

| Option                                            | Why not                                                                       |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `admin.`, `api.`, `app.`, `mcp.`, `gateway.` bare | Generic; likely taken or wanted by other BoldCreate apps                      |
| `gateway.integrations.boldcreate.ai` (nested)     | Long, and needs its own wildcard certificate (`*.integrations.boldcreate.ai`) |
| Public `api.` host                                | The API is internal; the gateway fronts it for outside callers                |

## Proposal: standalone `boldconnect.ai` (not decided)

Open option, not adopted. The confirmed names above stay in force until this is accepted and recorded in `decisions.md`.

The `connect-` prefixes exist only because `boldcreate.ai` already hosts other apps that use `admin`, `api` and `app`. On a separate `boldconnect.ai` domain that clash disappears, so plain role names work:

| App       | Staging                          | Production               |
| --------- | -------------------------------- | ------------------------ |
| `web`     | `app-staging.boldconnect.ai`     | `app.boldconnect.ai`     |
| `admin`   | `admin-staging.boldconnect.ai`   | `admin.boldconnect.ai`   |
| `gateway` | `gateway-staging.boldconnect.ai` | `gateway.boldconnect.ai` |

- The apex `boldconnect.ai` stays free for a landing page or a redirect to `app.`.
- The environment suffix still goes last, so every host is one flat label and a single `*.boldconnect.ai` wildcard certificate covers all of them.
- Cost: register the domain, issue a new wildcard certificate, add DNS, and change gateway URLs and OAuth redirect URIs before any are given to customers.
- Keep session cookies host-only (no `Domain=.boldconnect.ai`) so `web` and `admin` never share them.

### Gateway or `api` as the public name

Keep `gateway`. Do not name the public host `api`.

- `apps/api` is an internal service that seals and unwraps keys, probes upstreams and runs OAuth exchange. A public host called `api` that points at `apps/gateway` invites confusion in logs and runbooks, and a mistaken DNS or ingress change could expose the privileged service.
- The public host serves MCP, sync, plugin archives and project routes, and forwards to the internal API. The name `gateway` matches `apps/gateway` and this document.
- An `api` alias for the gateway would give two public URLs to keep consistent in redirect URIs and cookie scopes, so it is not recommended.
- If `api` is wanted publicly, rename the internal `api` app first (for example `core`) as its own recorded decision; do not alias it.

## Security notes

- `connect-admin` is the most sensitive host: restrict it (SSO, VPN or IP allowlist) and scope its cookies to that host only.
- Scope browser session cookies to `connect.boldcreate.ai` only. The gateway host must never accept them; key-authenticated routes answer `403 session_required` for session-only routes already.
- The API must refuse traffic that does not come from `web`, `admin` or `gateway` (network policy or an internal credential).
- `web` and `admin` should reach the API through the internal `API_BASE_URL` (server side or a same-origin proxy), not by the browser calling the API directly. This is not yet verified in the code.

## Before adopting

1. Verify how `apps/web` and `apps/admin` reach the API (see the last security note).
2. Record the decision in `docs/architecture/decisions.md`.
