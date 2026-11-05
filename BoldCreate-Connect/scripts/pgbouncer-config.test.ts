import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PGBOUNCER_VERSION, pgbouncerAssets } from './infra-tools.js';
import {
  LOCAL_POOL_SIZES,
  pgbouncerIni,
  pooledDatabaseUrl,
  userlist,
  userlistLine,
} from './pgbouncer-config.js';
import { localPoolSizes } from './pgbouncer-native.js';

const base = {
  dbHost: '127.0.0.1',
  dbPort: 5432,
  poolSizes: LOCAL_POOL_SIZES,
  authFile: 'C:/data/userlist.txt',
};
const ini = pgbouncerIni(base);
const deployed = readFileSync(
  join(import.meta.dirname, '..', 'k8s', 'pgbouncer', 'staging', 'config-map.yaml'),
  'utf8',
);
const value = (text: string, name: string) =>
  new RegExp(`^\\s*${name}\\s*=\\s*(.*)$`, 'm').exec(text)?.[1]?.trim();

describe('pgbouncerIni', () => {
  it('points every database at the given server and sizes each role', () => {
    expect(ini).toContain('* = host=127.0.0.1 port=5432');
    for (const [role, size] of Object.entries(LOCAL_POOL_SIZES)) {
      expect(ini).toContain(`app_${role} = pool_size=${size}`);
    }
  });

  it('listens on the loopback address only', () => {
    expect(value(ini, 'listen_addr')).toBe('127.0.0.1');
    expect(value(pgbouncerIni({ ...base, listenPort: 6500 }), 'listen_port')).toBe('6500');
  });

  it.each([
    'pool_mode',
    'query_wait_timeout',
    'idle_transaction_timeout',
    'ignore_startup_parameters',
    'track_extra_parameters',
    'auth_type',
    'reserve_pool_size',
    'max_client_conn',
  ])('keeps %s the same as the deployed configuration', (name) => {
    expect(value(ini, name)).toBe(value(deployed, name));
  });

  it('turns TLS off only for the local database', () => {
    expect(value(ini, 'client_tls_sslmode')).toBe('disable');
    expect(value(deployed, 'client_tls_sslmode')).toBe('require');
  });

  it('rejects a host that could inject settings', () => {
    expect(() => pgbouncerIni({ ...base, dbHost: 'db\nauth_type = trust' })).toThrow('not allowed');
  });

  it('rejects a path that could inject settings', () => {
    expect(() => pgbouncerIni({ ...base, authFile: 'a\nauth_type = trust' })).toThrow(
      'not allowed',
    );
    expect(() => pgbouncerIni({ ...base, logFile: 'a;b' })).toThrow('not allowed');
  });

  it.each([0, -1, 1.5, 65536])('rejects the port %s', (dbPort) => {
    expect(() => pgbouncerIni({ ...base, dbPort })).toThrow('port number');
    expect(() => pgbouncerIni({ ...base, listenPort: dbPort })).toThrow('port number');
  });

  it('rejects a pool size below 1', () => {
    expect(() => pgbouncerIni({ ...base, poolSizes: { ...LOCAL_POOL_SIZES, api: 0 } })).toThrow(
      'pool size of api must be 1 or more',
    );
  });
});

describe('userlist', () => {
  it('escapes a quote in a password', () => {
    expect(userlistLine('app_api', 'pa"ss')).toBe('"app_api" "pa""ss"');
  });

  it('rejects a user name with other characters', () => {
    expect(() => userlistLine('app api', 'x')).toThrow('not allowed');
  });

  it('lists every role and refuses an empty password', () => {
    const passwords = { api: 'a', gateway: 'g', worker: 'w', admin: 'm' };
    expect(userlist(passwords).trim().split('\n')).toHaveLength(4);
    expect(() => userlist({ ...passwords, worker: '' })).toThrow('worker is empty');
  });
});

describe('pooledDatabaseUrl', () => {
  it('keeps the login and database and swaps only the address', () => {
    expect(
      pooledDatabaseUrl('postgres://app_api:pw@localhost:5433/appdb?sslmode=disable', 6432),
    ).toBe('postgres://app_api:pw@127.0.0.1:6432/appdb?sslmode=disable');
  });
});

describe('the pinned Windows release', () => {
  const asset = pgbouncerAssets['win32-x64'];

  it('is at least 1.26.1, which has the security fixes', () => {
    const [major, minor, patch] = PGBOUNCER_VERSION.split('.').map(Number) as [
      number,
      number,
      number,
    ];
    expect(major * 1_000_000 + minor * 1_000 + patch).toBeGreaterThanOrEqual(1_026_001);
  });

  it('comes from the PgBouncer project and carries a full sha256', () => {
    expect(asset?.url.startsWith('https://github.com/pgbouncer/pgbouncer/releases/download/')).toBe(
      true,
    );
    expect(asset?.url).toContain(`pgbouncer-${PGBOUNCER_VERSION}-windows-x86_64.zip`);
    expect(asset?.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(asset?.binary.endsWith('pgbouncer.exe')).toBe(true);
  });
});

describe('localPoolSizes', () => {
  it('keeps the default pools without DB_VCPU and follows the database size with it', () => {
    expect(localPoolSizes({})).toEqual(LOCAL_POOL_SIZES);
    expect(localPoolSizes({ DB_VCPU: '1' })).toEqual({ api: 6, gateway: 1, worker: 2, admin: 1 });
    expect(localPoolSizes({ DB_VCPU: '2' })).toEqual({ api: 8, gateway: 1, worker: 3, admin: 1 });
  });
});
