import { describe, expect, it } from 'vitest';
import { createDb, resolveSsl } from './client.js';

const TLS = { rejectUnauthorized: false };

describe('resolveSsl', () => {
  it('uses TLS for a remote host and none for a local one', () => {
    expect(resolveSsl('db.internal', null, undefined)).toEqual(TLS);
    for (const host of ['localhost', '127.0.0.1', '::1', '[::1]']) {
      expect(resolveSsl(host, null, undefined)).toBe(false);
    }
  });

  it('follows sslmode in the URL', () => {
    expect(resolveSsl('db.internal', 'disable', undefined)).toBe(false);
    expect(resolveSsl('localhost', 'require', undefined)).toEqual(TLS);
    expect(resolveSsl('localhost', 'verify-full', undefined)).toEqual(TLS);
    expect(resolveSsl('localhost', 'prefer', undefined)).toBe(false);
    expect(resolveSsl('db.internal', 'allow', undefined)).toEqual(TLS);
  });

  it('lets DB_SSL win over the host and the URL', () => {
    expect(resolveSsl('db.internal', 'require', 'false')).toBe(false);
    expect(resolveSsl('db.internal', null, '0')).toBe(false);
    expect(resolveSsl('localhost', 'disable', 'true')).toEqual(TLS);
    expect(resolveSsl('localhost', null, ' 1 ')).toEqual(TLS);
  });
});

describe('createDb', () => {
  it('builds a pool for a URL and for text that is not a URL', async () => {
    for (const url of ['postgres://u:p%40@localhost:5433/app', 'not a url']) {
      const { pool } = createDb({ databaseUrl: url, poolMax: 2 });
      expect(pool.options.max).toBe(2);
      await pool.end();
    }
  });

  it('sends no TLS to a local database', async () => {
    const { pool } = createDb({ connectionString: 'postgres://u:p@127.0.0.1:5432/app' });
    expect(pool.options.ssl).toBe(false);
    await pool.end();
  });
});
