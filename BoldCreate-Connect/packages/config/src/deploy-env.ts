import * as z from 'zod/v4';

export const DeployEnvSchema = z.enum(['local', 'test', 'staging', 'production']).default('local');
export type DeployEnv = z.infer<typeof DeployEnvSchema>;

export function isDeployed(env: DeployEnv): boolean {
  return env === 'staging' || env === 'production';
}

export interface AdapterChoice {
  port: string;
  name: string;
  /** True for adapters that must never run in a deployed environment. */
  localOnly: boolean;
}

/** Adapters that exist only for local development and tests. */
export const LOCAL_ONLY_ADAPTERS = {
  kmsLocal: { port: 'kms', name: 'local', localOnly: true },
  secretsLocal: { port: 'secrets', name: 'local', localOnly: true },
  blobStaticCredentials: { port: 'blob', name: 'static-credentials', localOnly: true },
  emailMailpit: { port: 'email', name: 'mailpit', localOnly: true },
} as const satisfies Record<string, AdapterChoice>;

/** Redis without TLS (`redis://`) is local only; `rediss://` or Sentinel (`mymaster,...`) is allowed everywhere. */
export function redisAdapterChoice(url: string): AdapterChoice {
  const isAllowedDeployed =
    url.startsWith('rediss://') ||
    url.includes(',') ||
    url.startsWith('sentinel://') ||
    url.startsWith('redis-sentinel://');
  return { port: 'redis', name: 'redis', localOnly: !isAllowedDeployed };
}

/** The queue adapter runs everywhere. */
export const QUEUE_ADAPTER: AdapterChoice = {
  port: 'queue',
  name: 'postgres',
  localOnly: false,
};

export function assertAdapterAllowed(adapter: AdapterChoice, env: DeployEnv): void {
  if (adapter.localOnly && isDeployed(env)) {
    throw new Error(
      `${adapter.port} adapter "${adapter.name}" is not allowed when DEPLOY_ENV=${env}`,
    );
  }
}

export type DeployEnvCheck = 'ok' | 'warn' | 'fail';

/**
 * A container (Kubernetes sets `KUBERNETES_SERVICE_HOST`) that does not name its environment
 * would run with the `local` defaults. It warns by default so a running deployment keeps
 * starting; `REQUIRE_DEPLOY_ENV=true` turns the warning into a refusal to start.
 */
export function checkDeployEnv(env: Record<string, string | undefined>): DeployEnvCheck {
  const inContainer = (env['KUBERNETES_SERVICE_HOST'] ?? '') !== '';
  if (!inContainer || (env['DEPLOY_ENV'] ?? '') !== '') return 'ok';
  return env['REQUIRE_DEPLOY_ENV'] === 'true' ? 'fail' : 'warn';
}

/** Startup guard for every service entrypoint; reads the process environment once. */
export function assertDeployEnvSet(env: Record<string, string | undefined> = process.env): void {
  const result = checkDeployEnv(env);
  const message =
    'DEPLOY_ENV is not set in a container; the local defaults would apply. Set DEPLOY_ENV.';
  if (result === 'fail') throw new Error(message);
  if (result === 'warn') process.stderr.write(`warning: ${message}\n`);
}
