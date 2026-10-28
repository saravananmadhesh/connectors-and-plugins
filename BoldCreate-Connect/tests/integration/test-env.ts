/**
 * Connection settings for the live stack the integration tests run against.
 * URLs default to the local development stack; the all-in-one test runner
 * overrides them to point at its isolated Postgres, Mailpit and app processes.
 * Secrets have no defaults: the stack supplies them through the environment.
 */
const env = process.env;

/** Returns a required environment variable, or throws. */
export function requireEnv(name: string): string {
  const value = env[name];
  if (!value) throw new Error(`Missing required test environment variable ${name}`);
  return value;
}

export const webUrl = env['TEST_WEB_URL'] ?? 'http://localhost:3000';
export const apiUrl = env['TEST_API_URL'] ?? 'http://localhost:3001';
export const gatewayUrl = env['TEST_GATEWAY_URL'] ?? 'http://localhost:3002';
export const adminUrl = env['TEST_ADMIN_URL'] ?? 'http://localhost:3004';
export const workerUrl = env['TEST_WORKER_URL'] ?? 'http://localhost:3005';
export const mailpitUrl = env['TEST_MAILPIT_URL'] ?? 'http://localhost:8025';
export const databaseUrl = requireEnv('DATABASE_URL');

/** The login roles of the apps, plus the migrator. */
export type LoginRole = 'api' | 'worker' | 'admin' | 'gateway' | 'migrator';

/** Connection string for the same database as the real login of an app role. */
export function roleConnectionString(role: LoginRole): string {
  const url = new URL(databaseUrl);
  url.username = `app_${role}`;
  url.password = requireEnv(`DB_ROLE_PASSWORD_${role.toUpperCase()}`);
  return url.toString();
}
