import { describe, expect, it } from 'vitest';
import {
  DeployEnvSchema,
  LOCAL_ONLY_ADAPTERS,
  QUEUE_ADAPTER,
  assertAdapterAllowed,
  assertDeployEnvSet,
  checkDeployEnv,
  isDeployed,
  redisAdapterChoice,
  type AdapterChoice,
  type DeployEnv,
} from './deploy-env.js';

const deployed: DeployEnv[] = ['staging', 'production'];
const notDeployed: DeployEnv[] = ['local', 'test'];

const refusal = (adapter: AdapterChoice, env: DeployEnv) =>
  `${adapter.port} adapter "${adapter.name}" is not allowed when DEPLOY_ENV=${env}`;

describe('deploy env', () => {
  it('defaults to local and rejects unknown values', () => {
    expect(DeployEnvSchema.parse(undefined)).toBe('local');
    expect(DeployEnvSchema.safeParse('prod').success).toBe(false);
    expect(DeployEnvSchema.safeParse('').success).toBe(false);
  });

  it('treats only staging and production as deployed', () => {
    expect([...notDeployed, ...deployed].map(isDeployed)).toEqual([false, false, true, true]);
  });

  describe.each(Object.entries(LOCAL_ONLY_ADAPTERS))('%s', (_, adapter) => {
    it.each(deployed)('is refused when %s', (env) => {
      expect(() => assertAdapterAllowed(adapter, env)).toThrow(refusal(adapter, env));
    });
    it.each(notDeployed)('is allowed when %s', (env) => {
      expect(() => assertAdapterAllowed(adapter, env)).not.toThrow();
    });
  });

  it.each([...notDeployed, ...deployed])('allows the queue adapter when %s', (env) => {
    expect(() => assertAdapterAllowed(QUEUE_ADAPTER, env)).not.toThrow();
  });

  it.each([...notDeployed, ...deployed])('allows redis over TLS when %s', (env) => {
    expect(() =>
      assertAdapterAllowed(redisAdapterChoice('rediss://cache:6380'), env),
    ).not.toThrow();
  });

  it.each(deployed)('refuses plain redis when %s', (env) => {
    expect(() => assertAdapterAllowed(redisAdapterChoice('redis://cache:6379'), env)).toThrow(
      'redis adapter "redis" is not allowed',
    );
  });

  it.each(notDeployed)('allows plain redis when %s', (env) => {
    expect(() => assertAdapterAllowed(redisAdapterChoice('redis://cache:6379'), env)).not.toThrow();
  });
});

describe('checkDeployEnv', () => {
  it('accepts a laptop and a container that names its environment', () => {
    expect(checkDeployEnv({})).toBe('ok');
    expect(checkDeployEnv({ KUBERNETES_SERVICE_HOST: '10.0.0.1', DEPLOY_ENV: 'staging' })).toBe(
      'ok',
    );
  });

  it('warns for a container without DEPLOY_ENV so running deployments keep starting', () => {
    expect(checkDeployEnv({ KUBERNETES_SERVICE_HOST: '10.0.0.1' })).toBe('warn');
  });

  it('refuses to start when REQUIRE_DEPLOY_ENV=true', () => {
    const env = { KUBERNETES_SERVICE_HOST: '10.0.0.1', REQUIRE_DEPLOY_ENV: 'true' };
    expect(checkDeployEnv(env)).toBe('fail');
    expect(() => assertDeployEnvSet(env)).toThrow(/DEPLOY_ENV is not set/);
  });
});
