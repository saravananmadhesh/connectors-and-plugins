import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { loadWebConfig } from './config.js';

const valid = {
  NODE_ENV: 'test',
  COOKIE_SECRET: 'cookie-secret-value-for-tests-0001',
  CSRF_SECRET: 'csrf-secret-value-for-tests-00001',
  WORKLOAD_SECRET: 'workload-secret-value-for-tests-1',
};

const deployed = {
  ...valid,
  DEPLOY_ENV: 'production',
  WORKLOAD_AUTH_MODE: 'signed',
  WORKLOAD_SIGNING_KEY: 'k'.repeat(40),
  APP_BASE_URL: 'https://app.example.com',
  PUBLIC_API_BASE_URL: 'https://api.example.com',
  PUBLIC_GATEWAY_URL: 'https://mcp.example.com',
  OAUTH_REDIRECT_URI: 'https://app.example.com/api/v1/oauth/callback',
  ALLOWED_HOSTS: 'app.example.com',
};

function failure(env: Record<string, string | undefined>): string {
  try {
    loadWebConfig(env);
  } catch (error) {
    return (error as Error).message;
  }
  throw new Error('expected the configuration to be rejected');
}

describe('loadWebConfig', () => {
  it('accepts a minimal local environment and applies defaults', () => {
    const config = loadWebConfig(valid);
    expect(config).toMatchObject({
      PORT: 3000,
      API_BASE_URL: 'http://localhost:3001',
      APP_BASE_URL: 'http://localhost:3000',
      PUBLIC_GATEWAY_URL: 'http://localhost:3002',
      PUBLIC_API_BASE_URL: 'http://localhost:3001',
      OAUTH_REDIRECT_URI: 'http://localhost:3000/api/v1/oauth/callback',
    });
    expect(config.CLIENT_DIST_DIR).toBe(path.resolve(import.meta.dirname, '../../client/dist'));
  });

  it.each(['COOKIE_SECRET', 'CSRF_SECRET', 'WORKLOAD_SECRET'])('fails without %s', (name) => {
    const env: Record<string, string | undefined> = { ...valid };
    delete env[name];
    expect(failure(env)).toContain(name);
  });

  it('rejects placeholders and weak secrets in production only', () => {
    expect(failure({ ...valid, COOKIE_SECRET: 'changeme' })).toContain('COOKIE_SECRET');
    const weak = { COOKIE_SECRET: 'short', CSRF_SECRET: 'short' };
    expect(() => loadWebConfig({ ...valid, ...weak })).not.toThrow();
    expect(failure({ ...deployed, ...weak })).toContain('COOKIE_SECRET');
    expect(failure({ ...valid, ...weak, NODE_ENV: 'production' })).toContain('CSRF_SECRET');
  });

  it('accepts a complete deployed environment', () => {
    expect(() => loadWebConfig(deployed)).not.toThrow();
  });

  it('rejects the shared secret when deployed and a missing signing key in signed mode', () => {
    expect(failure({ ...deployed, WORKLOAD_AUTH_MODE: 'shared_secret' })).toContain(
      'WORKLOAD_AUTH_MODE',
    );
    const env: Record<string, string | undefined> = { ...deployed };
    delete env['WORKLOAD_SIGNING_KEY'];
    expect(failure(env)).toContain('WORKLOAD_SIGNING_KEY');
  });

  it.each(['APP_BASE_URL', 'PUBLIC_API_BASE_URL', 'PUBLIC_GATEWAY_URL', 'OAUTH_REDIRECT_URI'])(
    '%s rejects a trailing slash, plain http when deployed, and a missing value when deployed',
    (key) => {
      const value = deployed[key as keyof typeof deployed] as string;
      expect(failure({ ...valid, [key]: `${value}/` })).toContain(key);
      expect(failure({ ...deployed, [key]: value.replace('https', 'http') })).toContain(key);
      const env: Record<string, string | undefined> = { ...deployed };
      delete env[key];
      expect(failure(env)).toContain(key);
    },
  );

  it('ignores unknown keys', () => {
    expect(() => loadWebConfig({ ...valid, SOMETHING_ELSE: 'x' })).not.toThrow();
  });
});
