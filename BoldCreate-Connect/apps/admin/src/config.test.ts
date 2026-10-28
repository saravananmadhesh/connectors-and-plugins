import { describe, expect, it } from 'vitest';
import { ADMIN_SESSION_COOKIE, loadAdminConfig } from './config.js';

const valid = {
  NODE_ENV: 'test',
  DATABASE_URL: 'postgresql://app_admin:pw@localhost:5432/boldcreate',
  COOKIE_SECRET: 'cookie-secret-value-for-tests',
  CSRF_SECRET: 'csrf-secret-value-for-tests',
  WORKLOAD_SECRET: 'workload-secret-value-for-tests',
};

function failure(env: Record<string, string | undefined>): string {
  try {
    loadAdminConfig(env);
  } catch (error) {
    return (error as Error).message;
  }
  throw new Error('expected the configuration to be rejected');
}

describe('loadAdminConfig', () => {
  it('accepts a minimal local environment and applies defaults', () => {
    const config = loadAdminConfig(valid);
    expect(config.PORT).toBe(3004);
    expect(config.API_BASE_URL).toBe('http://localhost:3001');
    expect(config.ADMIN_ALLOWED_CIDRS).toEqual([]);
  });

  it('defines session, lockout and setup-link settings but no OIDC keys', () => {
    const config = loadAdminConfig(valid);
    expect(config).toMatchObject({
      SESSION_IDLE_SECONDS: 900,
      SESSION_ABSOLUTE_SECONDS: 3600,
      LOGIN_MAX_FAILED: 5,
      SETUP_LINK_TTL_SECONDS: 1800,
      APP_BASE_URL: 'http://localhost:3004',
      ADMIN_ALLOWED_EMAILS: [],
    });
    expect(Object.keys(config).filter((key) => key.startsWith('OIDC_'))).toEqual([]);
  });

  it('allows boldcreate, syncfusion and cursor as source owners unless told otherwise', () => {
    expect(loadAdminConfig(valid).PLUGIN_SOURCE_ALLOWED_OWNERS).toEqual([
      'boldcreate',
      'syncfusion',
      'cursor',
    ]);
    expect(
      loadAdminConfig({ ...valid, PLUGIN_SOURCE_ALLOWED_OWNERS: 'acme' })
        .PLUGIN_SOURCE_ALLOWED_OWNERS,
    ).toEqual(['acme']);
    expect(
      loadAdminConfig({ ...valid, PLUGIN_SOURCE_ALLOWED_OWNERS: '' }).PLUGIN_SOURCE_ALLOWED_OWNERS,
    ).toEqual([]);
  });

  it('reads the allowed emails as a list', () => {
    const config = loadAdminConfig({ ...valid, ADMIN_ALLOWED_EMAILS: 'a@x.test, b@x.test' });
    expect(config.ADMIN_ALLOWED_EMAILS).toEqual(['a@x.test', 'b@x.test']);
  });

  it.each(['not a url', 'http://localhost:3004/', 'http://localhost:3004/path'])(
    'rejects APP_BASE_URL %s',
    (value) => {
      expect(failure({ ...valid, APP_BASE_URL: value })).toContain('APP_BASE_URL');
    },
  );

  it('reads the allowed ranges as a list', () => {
    const config = loadAdminConfig({ ...valid, ADMIN_ALLOWED_CIDRS: '10.0.0.0/8, 192.168.1.0/24' });
    expect(config.ADMIN_ALLOWED_CIDRS).toEqual(['10.0.0.0/8', '192.168.1.0/24']);
  });

  it.each(['COOKIE_SECRET', 'CSRF_SECRET', 'DATABASE_URL'])('fails without %s', (name) => {
    const env: Record<string, string | undefined> = { ...valid };
    delete env[name];
    expect(failure(env)).toContain(name);
  });

  it.each(['COOKIE_SECRET', 'CSRF_SECRET'])('rejects the placeholder `changeme` for %s', (name) => {
    expect(failure({ ...valid, [name]: 'changeme' })).toContain(name);
  });

  it('rejects secrets shorter than 32 characters in production only', () => {
    const short = { ...valid, COOKIE_SECRET: 'short', CSRF_SECRET: 'short-too' };
    expect(() => loadAdminConfig(short)).not.toThrow();
    const message = failure({
      ...short,
      DEPLOY_ENV: 'production',
      WORKLOAD_AUTH_MODE: 'signed',
      WORKLOAD_SIGNING_KEY: 'k'.repeat(40),
      ALLOWED_HOSTS: 'admin.example.com',
    });
    expect(message).toContain('COOKIE_SECRET');
    expect(message).toContain('CSRF_SECRET');
    expect(message).not.toContain('short-too');
    expect(failure({ ...short, NODE_ENV: 'production' })).toContain('COOKIE_SECRET');
  });

  it('rejects the shared workload secret when deployed and needs a signing key when signed', () => {
    expect(failure({ ...valid, DEPLOY_ENV: 'staging' })).toContain('WORKLOAD_AUTH_MODE');
    expect(failure({ ...valid, WORKLOAD_AUTH_MODE: 'signed' })).toContain('WORKLOAD_SIGNING_KEY');
    const env: Record<string, string | undefined> = { ...valid };
    delete env['WORKLOAD_SECRET'];
    expect(failure(env)).toContain('WORKLOAD_SECRET');
  });

  it('reserves a host-bound cookie name for the admin session', () => {
    expect(ADMIN_SESSION_COOKIE).toBe('__Host-admin_sid');
  });
});
