import { describe, expect, it } from 'vitest';
import { createLogger, getContext, runWithContext } from '@boldcreate-integrations/observability';
import type { Db, Tx } from './client.js';
import { setRlsContext, withTenant } from './tenant.js';

const ORG_ID = '3f0c1d52-6f0e-4a57-9b0a-2f1f6a2d9c11';

function fakeDb(): Db {
  const tx = { execute: async () => undefined } as unknown as Tx;
  return { transaction: async (fn: (tx: Tx) => Promise<unknown>) => fn(tx) } as unknown as Db;
}

function capture() {
  const lines: Record<string, unknown>[] = [];
  const destination = {
    write(chunk: string) {
      lines.push(JSON.parse(chunk) as Record<string, unknown>);
    },
  };
  return { lines, logger: createLogger({ service: 'api', level: 'debug', destination }) };
}

describe('withTenant request context', () => {
  it('puts the org id on every log line written inside the transaction', async () => {
    const { lines, logger } = capture();
    await runWithContext({ requestId: 'r1' }, async () => {
      await withTenant(fakeDb(), { orgId: ORG_ID, userId: 'u' }, async () => {
        logger.info('inside');
      });
    });
    expect(lines[0]).toMatchObject({ tenantId: ORG_ID, requestId: 'r1' });
  });

  it('leaves the context without a tenant when the request has no org', async () => {
    await runWithContext({ requestId: 'r2' }, async () => {
      await withTenant(fakeDb(), { userId: 'u' }, async () => undefined);
      expect(getContext()).not.toHaveProperty('tenantId');
    });
  });

  it('works outside a request context', async () => {
    await expect(
      withTenant(fakeDb(), { orgId: ORG_ID, userId: 'u' }, async () => 'ok'),
    ).resolves.toBe('ok');
  });
});

describe('setRlsContext', () => {
  function recordingTx() {
    const queries: unknown[] = [];
    const tx = {
      execute: async (query: unknown) => {
        queries.push(query);
      },
    } as unknown as Tx;
    return { tx, queries };
  }

  it('sets the tenant and the user with one statement', async () => {
    const { tx, queries } = recordingTx();
    await setRlsContext(tx, { orgId: ORG_ID, userId: 'user-1' });
    expect(queries).toHaveLength(1);
    const text = JSON.stringify(queries[0]);
    expect(text).toContain('app.tenant');
    expect(text).toContain(ORG_ID);
    expect(text).toContain('user-1');
  });

  it('sends empty settings for work without an organization or a user', async () => {
    const { tx, queries } = recordingTx();
    await setRlsContext(tx, {});
    const text = JSON.stringify(queries[0]);
    expect(text).toContain('app.user');
    expect(text).not.toContain(ORG_ID);
  });
});
