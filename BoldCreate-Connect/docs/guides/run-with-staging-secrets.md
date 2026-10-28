# Run the apps locally with staging secrets

Runs all apps on your machine against shared staging services with `pnpm dev:staging`. It does not
use the embedded Postgres, Redis, Mailpit or object store of `pnpm dev`, and it generates no secrets.

## Prerequisites

- Node 24 and pnpm 10, with `pnpm install --frozen-lockfile` done.
- Network access to the staging database (Cloud SQL Auth Proxy or VPN), Redis and object storage.
- Google credentials for Cloud KMS and Secret Manager: `gcloud auth application-default login`, or
  `GOOGLE_APPLICATION_CREDENTIALS` pointing at a service account key file.
- Two AWS key pairs if S3 and SES are in different AWS accounts: one for the bucket (`AWS_*`) and one for SES (`SES_*`).
- Permission to read the staging secrets. Ask the maintainer for access; do not copy secrets into chat.

## Steps

1. Copy the template: `Copy-Item .env.staging.example .env.staging.local` (the copy is gitignored).
2. Replace every `REPLACE_*` value using the tables below. The launcher refuses to start while any
   remain.
3. `gcloud auth application-default login`
4. `pnpm dev:staging --yes`

Options: `--env-file=<path>` for another file, `--only=api,web` for a subset of apps (`api`,
`gateway`, `admin`, `worker`, `web`). `--yes` confirms that writes are real. `--reset-db` is refused.

## How the file is read

The file has a `[common]` section and one section per app. Each app gets `[common]` plus its own
section, never another app's. `DEPLOY_ENV` is always `staging` and `NODE_ENV` defaults to
`production`. Do not set them.

## Fetching a secret value

```sh
gcloud secrets versions access latest --secret=<secret-name> --project=<gcp-project>
```

Ask the maintainer for the secret names and the project. Paste the output straight into
`.env.staging.local`, not into chat or logs.

## Variables

Types: **Fixed** means keep the template value, **Local** means choose it for your machine,
**Staging** means it comes from the staging environment.

### `[common]` (every app)

| Variable              | Meaning                                                              | Example                                       | How to get it                                                                                       |
| --------------------- | -------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `LOG_LEVEL`           | How much the apps log: `debug`, `info`, `warn`, `error`.             | `info`                                        | Fixed. Use `debug` only while troubleshooting.                                                      |
| `APP_BASE_URL`        | Address the browser uses for the web app. Used in links and cookies. | `http://localhost:3000`                       | Local. Must match the web port. The admin section overrides it with its own port.                   |
| `PUBLIC_API_BASE_URL` | Address of the API as the browser sees it.                           | `http://localhost:3001`                       | Local. Must match the api `PORT`.                                                                   |
| `PUBLIC_GATEWAY_URL`  | Address of the gateway as clients see it.                            | `http://localhost:3002`                       | Local. Must match the gateway `PORT`.                                                               |
| `OAUTH_REDIRECT_URI`  | Where the OAuth provider sends the user back after sign-in.          | `http://localhost:3000/api/v1/oauth/callback` | Local, but it must be registered on the staging OAuth client or sign-in fails. Ask the OAuth owner. |

### `[api]`

| Variable                | Meaning                                                                                                                            | Example                                                                 | How to get it                                                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `PORT`                  | Port the API listens on.                                                                                                           | `3001`                                                                  | Local. Keep it unique and in line with the `*_URL` values.                                                                           |
| `DATABASE_URL`          | Postgres connection for the `app_api` login, with SSL.                                                                             | `postgresql://app_api:s3cret@127.0.0.1:5432/boldcreate?sslmode=require` | Staging. Password from Secret Manager. Through the Cloud SQL Auth Proxy use `127.0.0.1` and the proxy's port.                        |
| `WORKLOAD_SECRET`       | Shared secret that signs calls between apps.                                                                                       | `4f9c…` (long random string)                                            | Staging. Must equal the deployed value, or signature checks fail.                                                                    |
| `REDIS_URL`             | Redis connection. Must be TLS (`rediss://`) and remote.                                                                            | `rediss://:pass@redis.staging.example.com:6380`                         | Staging. Host and password from the Redis instance or Secret Manager.                                                                |
| `KMS_ADAPTER`           | Key management backend. `local` is refused.                                                                                        | `cloud-kms`                                                             | Fixed.                                                                                                                               |
| `KMS_CLOUD_KEY_NAME`    | Full resource name of the Cloud KMS key.                                                                                           | `projects/my-proj/locations/europe-west1/keyRings/app/cryptoKeys/main`  | Staging. `gcloud kms keys list --keyring=<ring> --location=<loc> --project=<project>`; your account needs encrypt and decrypt on it. |
| `BLOB_BUCKET`           | Object storage bucket for uploaded files.                                                                                          | `boldcreate-staging-blobs`                                              | Staging. Ask the maintainer or run `gcloud storage buckets list`.                                                                    |
| `BLOB_REGION`           | Region of that bucket.                                                                                                             | `europe-west1`                                                          | Staging. Shown in the bucket details.                                                                                                |
| `BFF_CALLER_ALLOWLIST`  | Apps allowed to call the API as a backend-for-frontend.                                                                            | `web,admin,gateway`                                                     | Fixed.                                                                                                                               |
| `AWS_ACCESS_KEY_ID`     | Access key of the IAM user for the S3 bucket (`s3:GetObject`, `PutObject`, `DeleteObject`, `ListBucket`). Optional if you use SSO. | `AKIAIOSFODNN7EXAMPLE`                                                  | Staging. AWS console, IAM, Users, Security credentials, Create access key. Set together with the secret key.                         |
| `AWS_SECRET_ACCESS_KEY` | Secret key paired with the access key. Shown once at creation.                                                                     | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`                              | Staging. Copy it when the key is created, or ask the maintainer. Never use `BLOB_SECRET_ACCESS_KEY`; staging refuses it.             |
| `AWS_PROFILE`           | Named AWS profile, an alternative to the key pair (`aws sso login`).                                                               | `staging`                                                               | Local. Set up with `aws configure sso`.                                                                                              |

### `[gateway]`

| Variable             | Meaning                                          | Example                                                                     | How to get it                                        |
| -------------------- | ------------------------------------------------ | --------------------------------------------------------------------------- | ---------------------------------------------------- |
| `PORT`               | Port the gateway listens on.                     | `3002`                                                                      | Local.                                               |
| `DATABASE_URL`       | Postgres connection for the `app_gateway` login. | `postgresql://app_gateway:s3cret@127.0.0.1:5432/boldcreate?sslmode=require` | Staging, as for the API but the `app_gateway` login. |
| `API_BASE_URL`       | Address of the API the gateway calls.            | `http://localhost:3001`                                                     | Local. Must match the api `PORT`.                    |
| `WORKLOAD_SECRET`    | Same shared secret as the API.                   | `4f9c…`                                                                     | Staging. Identical to the API's value.               |
| `REDIS_URL`          | Redis connection, TLS and remote.                | `rediss://:pass@redis.staging.example.com:6380`                             | Staging. Same instance as the API.                   |
| `KMS_ADAPTER`        | Key management backend.                          | `cloud-kms`                                                                 | Fixed.                                               |
| `KMS_CLOUD_KEY_NAME` | Cloud KMS key resource name.                     | `projects/my-proj/locations/europe-west1/keyRings/app/cryptoKeys/main`      | Staging. Same key as the API.                        |

### `[admin]`

| Variable               | Meaning                                                     | Example                                                                   | How to get it                        |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------ |
| `PORT`                 | Port the admin server listens on.                           | `3004`                                                                    | Local.                               |
| `DATABASE_URL`         | Postgres connection for the `app_admin` login.              | `postgresql://app_admin:s3cret@127.0.0.1:5432/boldcreate?sslmode=require` | Staging, with the `app_admin` login. |
| `API_BASE_URL`         | Address of the API.                                         | `http://localhost:3001`                                                   | Local.                               |
| `APP_BASE_URL`         | Address of the admin app in the browser (overrides common). | `http://localhost:3004`                                                   | Local. Must match the admin `PORT`.  |
| `WORKLOAD_SECRET`      | Shared secret between apps.                                 | `4f9c…`                                                                   | Staging.                             |
| `COOKIE_SECRET`        | Key that signs session cookies.                             | `a81d…` (long random string)                                              | Staging.                             |
| `CSRF_SECRET`          | Key for CSRF tokens.                                        | `7be2…` (long random string)                                              | Staging.                             |
| `ADMIN_ALLOWED_EMAILS` | Comma-separated emails allowed to sign in to the admin app. | `you@yourdomain.com,colleague@yourdomain.com`                             | Local. Use your own work email.      |

### `[web]`

| Variable          | Meaning                         | Example                 | How to get it                                                    |
| ----------------- | ------------------------------- | ----------------------- | ---------------------------------------------------------------- |
| `PORT`            | Port the web server listens on. | `3000`                  | Local. Must match `APP_BASE_URL`.                                |
| `API_BASE_URL`    | Address of the API.             | `http://localhost:3001` | Local.                                                           |
| `WORKLOAD_SECRET` | Shared secret between apps.     | `4f9c…`                 | Staging.                                                         |
| `COOKIE_SECRET`   | Key that signs session cookies. | `a81d…`                 | Staging. Admin and web may use different values if staging does. |
| `CSRF_SECRET`     | Key for CSRF tokens.            | `7be2…`                 | Staging.                                                         |

### `[worker]`

| Variable                  | Meaning                                                                                                                                       | Example                                                                    | How to get it                                                                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `HEALTH_PORT`             | Port of the worker's health endpoint.                                                                                                         | `3005`                                                                     | Local.                                                                                                                                                                        |
| `DATABASE_URL`            | Postgres connection for the `app_worker` login.                                                                                               | `postgresql://app_worker:s3cret@127.0.0.1:5432/boldcreate?sslmode=require` | Staging, with the `app_worker` login.                                                                                                                                         |
| `REDIS_URL`               | Redis connection, TLS and remote.                                                                                                             | `rediss://:pass@redis.staging.example.com:6380`                            | Staging.                                                                                                                                                                      |
| `KMS_ADAPTER`             | Key management backend.                                                                                                                       | `cloud-kms`                                                                | Fixed.                                                                                                                                                                        |
| `KMS_CLOUD_KEY_NAME`      | Cloud KMS key resource name.                                                                                                                  | `projects/my-proj/locations/europe-west1/keyRings/app/cryptoKeys/main`     | Staging. Same key as the API.                                                                                                                                                 |
| `SECRETS_ADAPTER`         | Where the worker reads stored secrets from.                                                                                                   | `gcp-secret-manager`                                                       | Fixed.                                                                                                                                                                        |
| `GCP_PROJECT_ID`          | Google Cloud project that holds those secrets.                                                                                                | `my-proj`                                                                  | Staging. `gcloud config get-value project` or ask the maintainer.                                                                                                             |
| `EMAIL_ADAPTER`           | Email backend. `mailpit` is refused.                                                                                                          | `ses`                                                                      | Fixed.                                                                                                                                                                        |
| `SES_REGION`              | AWS region of the SES account.                                                                                                                | `us-east-1`                                                                | Staging. Ask the maintainer. Needs AWS credentials in the default chain.                                                                                                      |
| `EMAIL_FROM`              | Sender address; must be a verified SES identity.                                                                                              | `noreply@sfcodestudio.com`                                                 | Staging. Check verified identities in the SES console.                                                                                                                        |
| `SES_ACCESS_KEY_ID`       | Access key of the IAM user in the AWS account that owns SES (not the bucket's account). Optional if the default credential chain reaches SES. | `AKIAJ3EXAMPLESES`                                                         | Staging. AWS console of the SES account, IAM, Users, Security credentials, Create access key. Needs `ses:SendEmail` and `ses:SendRawEmail`. Set together with the secret key. |
| `SES_SECRET_ACCESS_KEY`   | Secret key paired with `SES_ACCESS_KEY_ID`. Shown once at creation.                                                                           | `kT9xEXAMPLEsesSECRETkey`                                                  | Staging. Copy it when the key is created, or ask the maintainer.                                                                                                              |
| `BLOB_BUCKET`             | Object storage bucket.                                                                                                                        | `boldcreate-staging-blobs`                                                 | Staging. Same bucket as the API.                                                                                                                                              |
| `BLOB_REGION`             | Bucket region.                                                                                                                                | `europe-west1`                                                             | Staging.                                                                                                                                                                      |
| `OUTBOX_POLL_INTERVAL_MS` | How often the worker polls the outbox, in milliseconds.                                                                                       | `5000`                                                                     | Fixed. Raise it to reduce load.                                                                                                                                               |
| `AWS_ACCESS_KEY_ID`       | Access key of the IAM user for the S3 bucket (`s3:GetObject`, `PutObject`, `DeleteObject`, `ListBucket`). Optional if you use SSO.            | `AKIAIOSFODNN7EXAMPLE`                                                     | Staging. AWS console, IAM, Users, Security credentials, Create access key. Set together with the secret key.                                                                  |
| `AWS_SECRET_ACCESS_KEY`   | Secret key paired with the access key. Shown once at creation.                                                                                | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`                                 | Staging. Copy it when the key is created, or ask the maintainer. Never use `BLOB_SECRET_ACCESS_KEY`; staging refuses it.                                                      |
| `AWS_PROFILE`             | Named AWS profile, an alternative to the key pair (`aws sso login`).                                                                          | `staging`                                                                  | Local. Set up with `aws configure sso`.                                                                                                                                       |

## Rules the launcher enforces

- No value may still start with `REPLACE_` or `{{`.
- Each app must have values of its own.
- `DATABASE_URL` and `REDIS_URL` must be valid URLs. `REDIS_URL` must not point at this machine; the
  database may, through a local proxy.
- `KMS_ADAPTER=local` is refused.
- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` (S3) must be set together, and so must `SES_ACCESS_KEY_ID` and `SES_SECRET_ACCESS_KEY` (SES).
- Staging also refuses `EMAIL_ADAPTER=mailpit`, non-TLS Redis and static `BLOB_ACCESS_KEY_ID` /
  `BLOB_SECRET_ACCESS_KEY`.

## Verify

- Each app logs that it started, with no config validation errors. A refusal names the variable.
- `curl http://localhost:3001/health` (api), likewise for ports 3002 and 3004. Worker: `http://localhost:3005`.
- Open `http://localhost:3000` and sign in.

## Safety

- This talks to the shared staging database and queues. Writes are real, and the worker processes
  staging outbox rows and sends staging email. Use `--only` to leave the worker out unless you need it.
- Never run migrations or reset the database against staging from here.
- Do not paste secrets into logs, chat or commits. Delete `.env.staging.local` when you are done.
- Stop the apps (Ctrl+C) when finished, so a local worker does not compete with the deployed one.
