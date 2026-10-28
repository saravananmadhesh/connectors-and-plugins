import path from 'node:path';
import * as z from 'zod/v4';
import {
  BaseSchema,
  DeployEnvSchema,
  httpServerShape,
  loadEnv,
  nonEmpty,
  originShape,
  port,
  refineOrigins,
  refineSecretLength,
  refineWorkloadCaller,
  secret,
  withOriginDefaults,
  workloadShape,
} from '@boldcreate-integrations/config';

const ORIGIN_KEYS = [
  'APP_BASE_URL',
  'PUBLIC_API_BASE_URL',
  'PUBLIC_GATEWAY_URL',
  'OAUTH_REDIRECT_URI',
] as const;

const WebEnvSchema = BaseSchema.extend({
  DEPLOY_ENV: DeployEnvSchema,
  PORT: port.default(3000),
  API_BASE_URL: nonEmpty.default('http://localhost:3001'),
  /** Time allowed for a call to the api. */
  API_TIMEOUT_MS: z.coerce.number().int().min(100).default(30_000),
  ...workloadShape,
  ...httpServerShape,
  COOKIE_SECRET: secret,
  CSRF_SECRET: secret,
  /** Built single-page app; the default is the sibling `client/dist` folder. */
  CLIENT_DIST_DIR: nonEmpty.default(path.resolve(import.meta.dirname, '../../client/dist')),
  ...originShape(...ORIGIN_KEYS),
})
  .superRefine((value, ctx) => {
    refineWorkloadCaller(value, ctx);
    refineOrigins(value, ORIGIN_KEYS, ctx);
    refineSecretLength(value, ['COOKIE_SECRET', 'CSRF_SECRET', 'WORKLOAD_SECRET'], ctx);
  })
  .transform((value) => withOriginDefaults(value, ORIGIN_KEYS));

export type WebConfig = z.infer<typeof WebEnvSchema>;

export function loadWebConfig(source: NodeJS.ProcessEnv = process.env): WebConfig {
  return loadEnv(WebEnvSchema, source) as WebConfig;
}
