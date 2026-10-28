# Security triggers

Add the security axis when the diff matches any line below. One match is enough. Record which lines matched and pass them to the `security-reviewer` agent.

## Paths and files

- Paths containing `auth`, `login`, `session`, `token`, `oauth`, `permission`, `role`, `acl`, `crypto`, `secret`, `credential`, `password`.
- Environment files, secret stores, key files and certificates.
- CI and deployment configuration.
- Dependency manifests and lock files.
- Database migrations that change access control or store personal data.

## Code changes

- Authentication or authorisation checks added, removed or changed.
- Reading, storing, logging or sending credentials, keys or tokens.
- New or changed handling of input from users, files, URLs, headers, queues or other services.
- Building queries, shell commands, file paths, templates or HTML from input.
- Writing input into files other programs open, such as CSV or spreadsheet exports, where a value starting with `=`, `+`, `-` or `@` can run as a formula.
- Deserialising data from outside the process.
- File upload or download.
- Redirects or URLs built from input.
- Cryptography, hashing or random values used for security.
- CORS, CSRF, cookie or header settings.
- New network endpoints, or changes to which endpoints are public.
- Turning off a validation, certificate check or security setting.

## Always

- Any string in the diff that looks like a key, token, password or connection string.
