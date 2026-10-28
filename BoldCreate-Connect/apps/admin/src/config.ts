import path from 'node:path';
import * as z from 'zod/v4';
import {
  BaseSchema,
  DeployEnvSchema,
  csv,
  csvList,
  DEFAULT_SOURCE_OWNERS,
  httpServerShape,
  isDeployed,
  loadEnv,
  nonEmpty,
  port,
  refineSecretLength,
  refineWorkloadCaller,
  secret,
  workloadShape,
} from '@boldcreate-integrations/config';

const positive = (fallback: number) => z.coerce.number().int().min(1).default(fallback);

const AdminEnvSchema = BaseSchema.extend({
  DEPLOY_ENV: DeployEnvSchema,
  PORT: port.default(3004),
  /** Database login for role `app_admin`. */
  DATABASE_URL: secret,
  COOKIE_SECRET: secret,
  CSRF_SECRET: secret,
  ...workloadShape,
  ...httpServerShape,
  API_BASE_URL: nonEmpty.default('http://localhost:3001'),
  /** Origin the admin app is served from; links in setup mail point here. */
  APP_BASE_URL: z.string().optional(),
  /** Built single-page app; the default is the sibling `client/dist` folder. */
  CLIENT_DIST_DIR: nonEmpty.default(path.resolve(import.meta.dirname, '../client/dist')),
  /** Emails that may be admins. Empty means nobody can sign in. */
  ADMIN_ALLOWED_EMAILS: csvList,
  /** GitHub owners whose repositories may be added as plugin sources. Empty allows none. */
  PLUGIN_SOURCE_ALLOWED_OWNERS: csv(DEFAULT_SOURCE_OWNERS),
  /** Optional token for inspecting private source repositories; sent to the GitHub API only. */
  GITHUB_TOKEN: secret.optional(),
  /** Source ranges allowed to reach the admin app; empty denies everything but health when deployed. */
  ADMIN_ALLOWED_CIDRS: csvList,
  DB_POOL_MAX: z.coerce.number().int().min(1).default(5),
  SESSION_IDLE_SECONDS: positive(900),
  SESSION_ABSOLUTE_SECONDS: positive(3600),
  SESSION_SLIDE_MIN_INTERVAL_SECONDS: positive(60),
  LOGIN_MAX_FAILED: positive(5),
  LOGIN_LOCK_SECONDS: positive(900),
  PASSWORD_MIN_LENGTH: positive(12),
  /** How long a mailed setup link works. */
  SETUP_LINK_TTL_SECONDS: positive(1800),
})
  .superRefine((value, ctx) => {
    refineWorkloadCaller(value, ctx);
    refineSecretLength(value, ['COOKIE_SECRET', 'CSRF_SECRET'], ctx);
    const issue = (message: string) =>
      ctx.addIssue({ code: 'custom', path: ['APP_BASE_URL'], message });
    if (value.APP_BASE_URL === undefined) {
      if (isDeployed(value.DEPLOY_ENV)) issue('required in a deployed environment');
      return;
    }
    let url: URL;
    try {
      url = new URL(value.APP_BASE_URL);
    } catch {
      issue('must be an absolute URL');
      return;
    }
    if (url.origin !== value.APP_BASE_URL)
      issue('must be an origin without a path or trailing slash');
    else if (isDeployed(value.DEPLOY_ENV) && url.protocol !== 'https:') issue('must be https');
  })
  .transform((value) => ({
    ...value,
    APP_BASE_URL: value.APP_BASE_URL ?? 'http://localhost:3004',
  }));

export type AdminConfig = z.infer<typeof AdminEnvSchema>;

export function loadAdminConfig(source: NodeJS.ProcessEnv = process.env): AdminConfig {
  return loadEnv(AdminEnvSchema, source) as AdminConfig;
}

export const ADMIN_SESSION_COOKIE = '__Host-admin_sid';
export const ADMIN_CSRF_COOKIE = '__Host-admin_csrf';
