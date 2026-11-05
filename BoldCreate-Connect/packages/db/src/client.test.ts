import { EventEmitter } from 'node:events';
import pg from 'pg';
import { describe, expect, it, vi } from 'vitest';
import { createAdmissionGate } from './admission-gate.js';
import { createDb, isRoleSaturated, resolveSsl } from './client.js';

const TLS = { rejectUnauthorized: false };

/** A stand-in for a pooled connection: an event emitter with the pool's `release`. */
const fakeClient = (release: () => void = vi.fn<() => void>()) =>
  Object.assign(new EventEmitter(), { release });

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

describe('isRoleSaturated', () => {
  it('recognises the role connection limit by code or message', () => {
    expect(isRoleSaturated(Object.assign(new Error('x'), { code: '53300' }))).toBe(true);
    expect(isRoleSaturated(new Error('too many connections for role "app_api"'))).toBe(true);
    expect(isRoleSaturated(new Error('syntax error'))).toBe(false);
    expect(isRoleSaturated(null)).toBe(false);
  });
});

describe('createDb pool errors', () => {
  it('reports an error on a spare connection instead of ending the process', async () => {
    const onPoolError = vi.fn<(error: Error) => void>();
    const { pool } = createDb({ databaseUrl: 'postgres://u:p@127.0.0.1:1/app', onPoolError });
    const failure = new Error('terminating connection due to administrator command');
    pool.emit('error', failure);
    expect(onPoolError).toHaveBeenCalledWith(failure);
    await pool.end();
  });

  it('survives an error when no handler is given', async () => {
    const { pool } = createDb({ databaseUrl: 'postgres://u:p@127.0.0.1:1/app' });
    expect(() => pool.emit('error', new Error('reset'))).not.toThrow();
    await pool.end();
  });

  it('survives a connection that drops while a caller holds it', async () => {
    const { pool } = createDb({ databaseUrl: 'postgres://u:p@127.0.0.1:1/app' });
    const held = new EventEmitter();
    pool.emit('connect', held);
    expect(() => held.emit('error', new Error('Connection terminated unexpectedly'))).not.toThrow();
    await pool.end();
  });
});

describe('createDb admission', () => {
  it('holds a slot until the connection is released and refuses when the queue is full', async () => {
    const admission = createAdmissionGate({ maxConcurrency: 1, maxDepth: 0, maxWaitMs: 100 });
    const { pool } = createDb({ databaseUrl: 'postgres://u:p@127.0.0.1:1/app', admission });
    const release = vi.fn<() => void>();
    const client = fakeClient(release);
    const base = vi.spyOn(pg.Pool.prototype, 'connect').mockResolvedValue(client as never);
    const held = await pool.connect();
    expect(admission.stats().active).toBe(1);
    await expect(pool.connect()).rejects.toThrow('database admission queue');
    held.release();
    expect(admission.stats().active).toBe(0);
    expect(release).toHaveBeenCalledTimes(1);
    base.mockRestore();
    await pool.end();
  });

  it('hands back a held connection that drops, even when the caller never releases it', async () => {
    const admission = createAdmissionGate({ maxConcurrency: 1, maxDepth: 0, maxWaitMs: 100 });
    const { pool } = createDb({ databaseUrl: 'postgres://u:p@127.0.0.1:1/app', admission });
    const release = vi.fn<(error?: unknown) => void>();
    const client = fakeClient(release);
    const base = vi.spyOn(pg.Pool.prototype, 'connect').mockResolvedValue(client as never);
    const held = await pool.connect();
    expect(admission.stats().active).toBe(1);
    const drop = new Error('Connection terminated unexpectedly');
    client.emit('error', drop);
    expect(admission.stats().active).toBe(0);
    expect(release).toHaveBeenCalledWith(drop);
    held.release();
    expect(release).toHaveBeenCalledTimes(1);
    base.mockRestore();
    await pool.end();
  });

  it('gives the slot back when the connection cannot be made', async () => {
    const admission = createAdmissionGate({ maxConcurrency: 1, maxDepth: 0, maxWaitMs: 100 });
    const { pool } = createDb({ databaseUrl: 'postgres://u:p@127.0.0.1:1/app', admission });
    const base = vi.spyOn(pg.Pool.prototype, 'connect').mockRejectedValue(new Error('refused'));
    await expect(pool.connect()).rejects.toThrow('refused');
    expect(admission.stats().active).toBe(0);
    base.mockRestore();
    await pool.end();
  });
});

describe('createDb admission with the callback form', () => {
  it('passes the connection to the callback and returns the slot on release', async () => {
    const admission = createAdmissionGate({ maxConcurrency: 1, maxDepth: 0, maxWaitMs: 100 });
    const { pool } = createDb({ databaseUrl: 'postgres://u:p@127.0.0.1:1/app', admission });
    const release = vi.fn<() => void>();
    const base = vi
      .spyOn(pg.Pool.prototype, 'connect')
      .mockResolvedValue(fakeClient(release) as never);
    const seen = await new Promise<{ error: Error | undefined; done: (r?: unknown) => void }>(
      (resolve) => {
        (pool.connect as (cb: unknown) => void)(
          (error: Error | undefined, _client: unknown, done: (r?: unknown) => void) =>
            resolve({ error, done }),
        );
      },
    );
    expect(seen.error).toBeUndefined();
    expect(admission.stats().active).toBe(1);
    seen.done();
    expect(admission.stats().active).toBe(0);
    base.mockRestore();
    await pool.end();
  });

  it('hands a refusal to the callback', async () => {
    const admission = createAdmissionGate({ maxConcurrency: 1, maxDepth: 0, maxWaitMs: 100 });
    const { pool } = createDb({ databaseUrl: 'postgres://u:p@127.0.0.1:1/app', admission });
    await admission.acquire();
    const error = await new Promise<Error | undefined>((resolve) => {
      (pool.connect as (cb: unknown) => void)((err: Error | undefined) => resolve(err));
    });
    expect(error?.message).toContain('database admission queue');
    await pool.end();
  });

  it('keeps the owner of a call for the fair share', async () => {
    const seen: (string | undefined)[] = [];
    const admission = createAdmissionGate({ maxConcurrency: 5, maxDepth: 5, maxWaitMs: 100 });
    const real = admission.acquire.bind(admission);
    admission.acquire = (owner) => (seen.push(owner), real(owner));
    const { pool } = createDb({
      databaseUrl: 'postgres://u:p@127.0.0.1:1/app',
      admission,
      admissionOwner: () => 'org-1',
    });
    const base = vi.spyOn(pg.Pool.prototype, 'connect').mockResolvedValue(fakeClient() as never);
    (await pool.connect()).release();
    expect(seen).toEqual(['org-1']);
    base.mockRestore();
    await pool.end();
  });
});

describe('createDb queueing', () => {
  const saturated = () => Object.assign(new Error('too many connections'), { code: '53300' });

  it('retries a role-limit refusal until a connection is free', async () => {
    const { pool } = createDb({
      databaseUrl: 'postgres://u:p@127.0.0.1:1/app',
      connectionTimeoutMs: 2000,
    });
    const client = fakeClient();
    const base = vi
      .spyOn(pg.Pool.prototype, 'connect')
      .mockRejectedValueOnce(saturated())
      .mockRejectedValueOnce(saturated())
      .mockResolvedValueOnce(client as never);
    await expect(pool.connect()).resolves.toBe(client);
    expect(base).toHaveBeenCalledTimes(3);
    base.mockRestore();
    await pool.end();
  });

  it('gives up with the original error after the wait', async () => {
    const { pool } = createDb({
      databaseUrl: 'postgres://u:p@127.0.0.1:1/app',
      connectionTimeoutMs: 100,
    });
    const base = vi.spyOn(pg.Pool.prototype, 'connect').mockRejectedValue(saturated());
    await expect(pool.connect()).rejects.toMatchObject({ code: '53300' });
    base.mockRestore();
    await pool.end();
  });

  it('does not retry other failures', async () => {
    const { pool } = createDb({
      databaseUrl: 'postgres://u:p@127.0.0.1:1/app',
      connectionTimeoutMs: 2000,
    });
    const base = vi.spyOn(pg.Pool.prototype, 'connect').mockRejectedValue(new Error('boom'));
    await expect(pool.connect()).rejects.toThrow('boom');
    expect(base).toHaveBeenCalledTimes(1);
    base.mockRestore();
    await pool.end();
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
