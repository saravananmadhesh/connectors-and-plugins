# Security model

## Identity and access

- One principal union: `user_session | api_key | workload | platform_admin`. One `authorize(principal, action, resource)` in `domain` serves every route and the gateway; deny by default; a generated role × action × scope matrix test covers it. No role checks in routes or UI.
- Every request applies (1) scope filter, then (2) RBAC. An org is a ceiling, never a grant. Wrong-org and invisible resources return `404`.
- Login is a provider in `auth_identity` (password now). Sessions use `__Host-` cookies; all sessions are revoked on password change. Platform admin is a separate identity, app and cookie set with password sign-in and an emailed one-time setup link, limited to `ADMIN_ALLOWED_EMAILS`; OIDC sign-in is not built ([plans/security-hardening-migration.md](../plans/security-hardening-migration.md)).
- Tenant id on every row, cache key and log line. Row-level security is a second layer; the tenant is set with `SET LOCAL` per transaction. Cross-tenant access only through `withMaintenance(purpose)` with per-table maintenance policies.
- Quotas, uniqueness and last-owner protection use DB constraints or row locks, never check-then-insert.

## API keys

| Key               | Created by          | Sees                                            | Uses OAuth tokens of |
| ----------------- | ------------------- | ----------------------------------------------- | -------------------- |
| For You (`fyk_`)  | Org admin           | org installs and the For You project            | Nothing personal     |
| Platform (`plk_`) | Org admin or member | manages the organization, with its maker's role | Nothing personal     |
| Project (`prk_`)  | Org admin           | one Platform project                            | Its project users    |
| Session (`stk_`)  | A project key       | one project user                                | That user            |

- An organization key (`fyk_`, `plk_`) is created in the website by an org admin. Format `<keyId>.<secret>` where `keyId` is `fyk_`, `plk_`, `prk_`, `stk_` plus 16 hex characters; the stored row, not the prefix, decides the kind. Lookup by `keyId`, constant-time SHA-256 hash compare; shown once; bound to one org. An `fyk_` key reaches the For You routes only (sync, downloads, tool calls, session creation); any other route answers the same `401` as a wrong prefix. A `plk_` key reaches only the organization management routes listed in `platform-route-access.ts` (organization, policy, members, invitations, projects and project keys); it acts with the organization role of the member who made it, read on every request, so a maker who becomes a Viewer or leaves loses the key at once (`401`). An Admin or Member may make a `plk_` key; a Viewer may not. Personal, team and per-user keys (`pak_`, `tmk_`, `ork_`) no longer exist.
- Presets: `agent` = `mcp:list`, `mcp:call`, `artifact:sync`, `artifact:download`; `read_only` = `mcp:list`, `artifact:sync`. Effective rights = preset ∩ creator's current rights ∩ org policy, computed per call.
- Expiry required. Keys default 90 d, max 365; a project has at most 10 keys. A rotated project key keeps working for 1 h (grace), checked on every request. Revocation is instant. Failed key auth is rate-limited per IP.
- Visibility: for one plugin the most specific scope wins. A session key stops when its user is removed; an organization key survives its creator.

## Sealing (secrets at rest)

- Each org has a versioned X25519 key pair (`org_key`, one active). The public key is stored clear; the private key is wrapped by KMS (one master key per environment; AAD `bc1|org_key|<orgId>|<orgKeyId>`).
- Secrets are sealed with HPKE (RFC 9180: DHKEM X25519, HKDF-SHA256, AES-256-GCM, `info = "boldcreate/seal/v1"`). Envelope `v1:<orgKeyId>:<enc>:<ciphertext>` (base64url). AAD `bc1|<purpose>|<orgId>|<subjectKind>|<subjectId>|<serverId or ->` binds a ciphertext to its row and tenant. JSON blobs are sealed per sensitive field.
- Purposes: `installation_variable`, `user_connection_token`, `oauth_client_secret`, `oauth_registration_token`, `oauth_state_verifier`, `mcp_api_key`. A new sealed value adds a purpose. Admin sign-in PKCE uses a platform seal key.
- Sealing lives in `credentials`, never in the KMS adapter (KMS port: `wrapKey`, `unwrapKey`, key id and version). The local KMS adapter is refused in `staging` and `production`. Staging and production use Cloud KMS.

| Service   | Seal | Wrap                   | Unwrap |
| --------- | ---- | ---------------------- | ------ |
| `api`     | yes  | no                     | yes    |
| `worker`  | no   | yes (org key creation) | no     |
| `gateway` | no   | no                     | yes    |

A lint check fails if `unwrapKey` is called directly under `apps/worker` or `apps/api`. Unwrapped keys sit in a bounded cache, zeroed on eviction, purged on org deletion; KMS is called on miss, never per request. KMS down: serve cached keys until TTL, then fail closed. A seal or unseal failure is an error, never a silent reset.

- New org: `key_state = key_pending`, worker creates the pair; secret writes answer `503 org_key_pending` until ready. Org deletion destroys the private key (crypto-shredding).
- Variables: values per installation, sealed, write-only (merge-patch: empty keeps, `null` deletes), `${VAR}` expanded at call time; unset required variable keeps an `mcp` component inactive.

## MCP OAuth

- Per-member and generic for any MCP server. Server auth type: none, API key, OAuth with dynamic client registration (RFC 9728, 8414, 7591) or OAuth with a client id; code flow with PKCE S256 and RFC 8707 `resource`; RFC 9207 `iss` checked when advertised.
- `state` is server-stored, random, single-use, 10 min, bound to member, server and verifier; the callback needs the same member's live session; the return path is an allowlisted relative path.
- Tokens sealed per member and server; refresh under a Redis single-flight lock; `invalid_grant` clears the token and flags re-authorization; removing a member or disabling a server evicts tokens. A changed scope, client or resource flags existing grants.
- Tool discovery stores the catalog with a content hash. Holding a changed or removed tool for admin acceptance is **not implemented yet**: every probe overwrites the stored tools ([plans/security-hardening-migration.md](../plans/security-hardening-migration.md), S10.1).

## SSRF guard

One guard in `packages/security` for every outbound URL (OAuth endpoints, metadata, registration, test and health calls, source downloads): `https` only when deployed; reject userinfo and non-default ports unless allowlisted; resolve all DNS answers and block loopback, private, link-local, CGNAT, `0.0.0.0/8`, ULA, NAT64, IPv4-mapped IPv6 and metadata addresses; normalise decimal/octal/hex IPv4; fail closed on DNS errors; connect to the validated IP keeping SNI and `Host`; never follow redirects for MCP and OAuth calls. Clients only see `url_not_allowed`. Egress NetworkPolicy is a second layer. stdio servers are never proxied.

## Gateway rules

- MCP stateless streamable HTTP; batches rejected; `GET`/`DELETE` on `/mcp` `405`. Order: authenticate key → resolve server → scope filter → RBAC → tool allowlist → call upstream → audit.
- Tool names `{server}__{tool}`. Never forward the caller's key, cookies or `Authorization`; forward only header allowlists; never relay `Set-Cookie`. Upstream `401` becomes "needs connect" or "needs re-authorization" with the authorize URL.
- Limits (config): body 1 MB, tool result 4 MB; oversize is an error, never truncated. Timeouts: connect 5 s, call 30 s default (max 120 s), stream idle 60 s. `tools/call` is never retried. Upstream errors are redacted.

## Delivery and ingestion

- Sync is per key (ETag, never shared-cached); the manifest carries `sha256`, `sizeBytes` and an API `href`, never a storage URL. Every unauthorized or unknown version returns the same `404`. Revoked keys stop immediately.
- Archive limits (config): 50 MB archive, 100 MB expanded, 5 MB file, 1,000 files; oversize is rejected, never skipped. Blob keys match `^[a-f0-9]{64}$`; the `blob` port has no download-URL method.
- Ingestion is admin-only and queued: fetch by commit SHA, safe extraction in worker threads (traversal and symlink guards), secret and script scan, content hash, audit trail. Nothing is user-visible before approval.

## Baseline

Argon2id, CSRF, helmet, strict cookies, login throttle, log redaction (credentials, URL query secrets, upstream bodies), signed workload identity between services, least-privilege DB roles per service, Secret Manager and workload identity in deployed environments, dependency audit in CI.
