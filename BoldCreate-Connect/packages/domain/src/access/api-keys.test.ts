import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Executor, ScopeContext } from '@boldcreate-integrations/db';
import type { CreateApiKeyBody, UserSessionPrincipal } from '@boldcreate-integrations/contracts';
import { createApiKey } from './api-keys.js';

vi.mock('../permissions/authorize.js', () => ({ requireAction: vi.fn<() => void>() }));

const DAY_MS = 24 * 3_600_000;
const NOW = new Date('2030-01-01T00:00:00.000Z');
const REACHED_STORE = 'reached the store';

const principal = { userId: 'user-1' } as UserSessionPrincipal;
const orgScope: ScopeContext = { scopeType: 'org', organizationId: 'org-1' };
const userScope: ScopeContext = {
  scopeType: 'user',
  organizationId: 'org-1',
  ownerUserId: 'user-1',
};

/** A store that fails the first time it is used, so a call that gets that far has passed every check. */
const db = {
  transaction: vi.fn<() => Promise<never>>(async () => {
    throw new Error(REACHED_STORE);
  }),
} as unknown as Executor;

const body = (expiresAt?: string): CreateApiKeyBody => ({
  kind: 'foryou',
  name: 'agent',
  permissions: ['mcp:list'],
  ...(expiresAt === undefined ? {} : { expiresAt }),
});

const after = (ms: number): string => new Date(NOW.getTime() + ms).toISOString();

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
});

afterEach(() => {
  vi.useRealTimers();
  vi.mocked(db.transaction).mockClear();
});

describe('the expiry of a key', () => {
  it('stays optional and has no upper bound', async () => {
    await expect(createApiKey(db, principal, orgScope, body())).rejects.toThrow(REACHED_STORE);
    await expect(createApiKey(db, principal, orgScope, body(after(400 * DAY_MS)))).rejects.toThrow(
      REACHED_STORE,
    );
  });
});

describe('the scope of a key', () => {
  it.each([userScope])('is the organization: a $scopeType scope is not found', async (scope) => {
    await expect(createApiKey(db, principal, scope, body())).rejects.toMatchObject({
      code: 'not_found',
    });
    expect(db.transaction).not.toHaveBeenCalled();
  });
});

describe('the kind of a key', () => {
  it('gives a Platform key only the organization permission', async () => {
    await expect(
      createApiKey(db, principal, orgScope, { ...body(), kind: 'platform' }),
    ).rejects.toMatchObject({ code: 'validation_failed' });
    expect(db.transaction).not.toHaveBeenCalled();
  });

  it('keeps the organization permission off a For You key', async () => {
    await expect(
      createApiKey(db, principal, orgScope, { ...body(), permissions: ['org:manage'] }),
    ).rejects.toMatchObject({ code: 'validation_failed' });
  });

  it('reaches the store for a Platform key with its own permission', async () => {
    await expect(
      createApiKey(db, principal, orgScope, {
        ...body(),
        kind: 'platform',
        permissions: ['org:manage'],
      }),
    ).rejects.toThrow(REACHED_STORE);
  });
});
