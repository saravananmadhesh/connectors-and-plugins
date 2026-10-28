/**
 * Environment of each app process, shared by `pnpm dev` and the test stack. Every app gets only
 * its own keys: no app sees another app's secrets, and the base environment of the launching
 * process is stripped of every generated secret and of the database URL.
 */
import { DEV_SECRET_NAMES } from './dev-secrets.js';

export type AppName = 'web' | 'admin' | 'api' | 'gateway' | 'worker';

export const APP_ENTRIES: Record<AppName, string> = {
  web: 'apps/web/server/src/index.ts',
  admin: 'apps/admin/src/index.ts',
  api: 'apps/api/src/index.ts',
  gateway: 'apps/gateway/src/index.ts',
  worker: 'apps/worker/src/index.ts',
};

export interface AppPorts {
  web: number;
  admin: number;
  api: number;
  gateway: number;
  workerHealth: number;
  mailpitSmtp: number;
  redis: number;
}

export interface AppEnvContext {
  secrets: Record<string, string>;
  /** Database URL of the cluster (host, port and name); each app gets its own role's login on it. */
  databaseUrl: string;
  ports: AppPorts;
  deployEnv: 'local' | 'test';
  /** Local object store the worker keeps plugin archives in. */
  objectStore: { port: number; bucket: string };
  /** Keyring file of the local key management adapter, shared by worker, api and gateway. */
  keyringPath: string;
  /** Directory with one file per generated secret, read by the local secrets adapter. */
  secretsDir: string;
  /**
   * Cloud KMS key (`projects/…/cryptoKeys/<k>`) to use instead of the local keyring. Credentials
   * come from the launching process (GOOGLE_APPLICATION_CREDENTIALS or gcloud application-default
   * login), which the base environment passes through.
   */
  cloudKmsKeyName?: string | undefined;
  /** Non-secret values that replace the defaults, for example fixture hosts in tests. */
  overrides?: Partial<Record<AppName, Record<string, string>>>;
}

const url = (port: number) => `http://localhost:${port}`;

/** The database URL with the login of `app_<role>` and its generated password. */
export function roleDatabaseUrl(
  databaseUrl: string,
  role: string,
  secrets: Record<string, string>,
): string {
  const login = new URL(databaseUrl);
  login.username = `app_${role}`;
  const password = secrets[`DB_ROLE_PASSWORD_${role.toUpperCase()}`];
  if (password === undefined)
    throw new Error(`missing generated secret DB_ROLE_PASSWORD_${role.toUpperCase()}`);
  login.password = password;
  return login.toString();
}

/** The process environment without generated secrets and database URL. */
export function baseProcessEnv(source: NodeJS.ProcessEnv): Record<string, string> {
  const hidden = new Set<string>([...DEV_SECRET_NAMES, 'DATABASE_URL', 'FORCE_COLOR']);
  const base: Record<string, string> = {};
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined && !hidden.has(key)) base[key] = value;
  }
  return base;
}

export function appEnv(app: AppName, ctx: AppEnvContext): Record<string, string> {
  const { secrets, ports } = ctx;
  const secret = (name: string): string => {
    const value = secrets[name];
    if (value === undefined) throw new Error(`missing generated secret ${name}`);
    return value;
  };
  const databaseUrl = (role: string) => roleDatabaseUrl(ctx.databaseUrl, role, secrets);
  const common = { NODE_ENV: 'development', DEPLOY_ENV: ctx.deployEnv };
  const kms: Record<string, string> = ctx.cloudKmsKeyName
    ? { KMS_ADAPTER: 'cloud-kms', KMS_CLOUD_KEY_NAME: ctx.cloudKmsKeyName }
    : { KMS_ADAPTER: 'local', KMS_LOCAL_KEYRING_PATH: ctx.keyringPath };
  const origins = {
    APP_BASE_URL: url(ports.web),
    PUBLIC_API_BASE_URL: url(ports.api),
    PUBLIC_GATEWAY_URL: url(ports.gateway),
  };
  let env: Record<string, string>;
  switch (app) {
    case 'web':
      env = {
        PORT: String(ports.web),
        API_BASE_URL: url(ports.api),
        WORKLOAD_SECRET: secret('WORKLOAD_SECRET'),
        COOKIE_SECRET: secret('COOKIE_SECRET'),
        CSRF_SECRET: secret('CSRF_SECRET'),
        ...origins,
        OAUTH_REDIRECT_URI: `${url(ports.web)}/api/v1/oauth/callback`,
      };
      break;
    case 'admin':
      env = {
        PORT: String(ports.admin),
        DATABASE_URL: databaseUrl('admin'),
        API_BASE_URL: url(ports.api),
        WORKLOAD_SECRET: secret('WORKLOAD_SECRET'),
        COOKIE_SECRET: secret('COOKIE_SECRET'),
        CSRF_SECRET: secret('CSRF_SECRET'),
        APP_BASE_URL: url(ports.admin),
        ADMIN_ALLOWED_EMAILS: 'admin@example.test',
      };
      break;
    case 'api':
      env = {
        PORT: String(ports.api),
        DATABASE_URL: databaseUrl('api'),
        WORKLOAD_SECRET: secret('WORKLOAD_SECRET'),
        REDIS_URL: `redis://:${secret('REDIS_PASSWORD')}@127.0.0.1:${ports.redis}`,
        ...kms,
        UPSTREAM_ALLOW_HTTP_HOSTS: 'localhost,127.0.0.1',
        BLOB_ENDPOINT: `http://127.0.0.1:${ctx.objectStore.port}`,
        BLOB_BUCKET: ctx.objectStore.bucket,
        BLOB_FORCE_PATH_STYLE: 'true',
        BLOB_ACCESS_KEY_ID: secret('OBJECT_STORE_ROOT_USER'),
        BLOB_SECRET_ACCESS_KEY: secret('OBJECT_STORE_ROOT_PASSWORD'),
        BFF_CALLER_ALLOWLIST: 'web,admin,gateway',
        // The web backend runs on this machine and reports the browser's address in X-Forwarded-For.
        TRUSTED_PROXY_CIDRS: '127.0.0.1/32,::1/128',
        ...origins,
        OAUTH_REDIRECT_URI: `${url(ports.web)}/api/v1/oauth/callback`,
      };
      break;
    case 'gateway':
      env = {
        PORT: String(ports.gateway),
        DATABASE_URL: databaseUrl('gateway'),
        API_BASE_URL: url(ports.api),
        WORKLOAD_SECRET: secret('WORKLOAD_SECRET'),
        UPSTREAM_ALLOW_HTTP_HOSTS: 'localhost,127.0.0.1',
        ...kms,
        REDIS_URL: `redis://:${secret('REDIS_PASSWORD')}@127.0.0.1:${ports.redis}`,
        PUBLIC_GATEWAY_URL: url(ports.gateway),
      };
      break;
    case 'worker':
      env = {
        DATABASE_URL: databaseUrl('worker'),
        HEALTH_PORT: String(ports.workerHealth),
        REDIS_URL: `redis://:${secret('REDIS_PASSWORD')}@127.0.0.1:${ports.redis}`,
        ...kms,
        SECRETS_ADAPTER: 'local',
        SECRETS_LOCAL_DIR: ctx.secretsDir,
        EMAIL_ADAPTER: 'mailpit',
        MAILPIT_SMTP_URL: `smtp://localhost:${ports.mailpitSmtp}`,
        EMAIL_FROM: 'noreply@localhost',
        APP_BASE_URL: url(ports.web),
        OUTBOX_POLL_INTERVAL_MS: '1000',
        BLOB_ENDPOINT: `http://127.0.0.1:${ctx.objectStore.port}`,
        BLOB_BUCKET: ctx.objectStore.bucket,
        BLOB_FORCE_PATH_STYLE: 'true',
        BLOB_ACCESS_KEY_ID: secret('OBJECT_STORE_ROOT_USER'),
        BLOB_SECRET_ACCESS_KEY: secret('OBJECT_STORE_ROOT_PASSWORD'),
      };
      break;
  }
  return { ...common, ...env, ...ctx.overrides?.[app] };
}
