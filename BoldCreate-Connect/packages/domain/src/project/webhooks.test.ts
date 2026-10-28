import { describe, expect, it, vi } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import type { UserSessionPrincipal } from '@boldcreate-integrations/contracts';
import type { Sealer } from '@boldcreate-integrations/credentials';
import { createSsrfGuard } from '@boldcreate-integrations/security';
import { newWebhookSecret, putProjectWebhook, rotateProjectWebhookSecret } from './webhooks.js';

const orgId = '00000000-0000-4000-8000-0000000000a0';
const projectId = '00000000-0000-4000-8000-0000000000b0';
const never = {} as Executor;
const principal = (orgRole: 'ADMIN' | 'MEMBER' | 'VIEWER'): UserSessionPrincipal => ({
  kind: 'user_session',
  userId: 'user-1',
  sessionId: 'session-1',
  orgId,
  orgRole,
  orgStatus: 'active',
});
const sealer: Sealer = {
  seal: vi.fn<Sealer['seal']>(),
  sealFields: async (value) => value,
};

function deps(address: string) {
  return {
    sealer,
    guard: createSsrfGuard({ deployed: true, resolver: async () => [address] }),
  };
}

describe('the address of a webhook', () => {
  it.each([
    ['a loopback address', 'https://hooks.example.test/in', '127.0.0.1'],
    ['a private address', 'https://hooks.example.test/in', '10.0.0.7'],
    ['a link-local address', 'https://hooks.example.test/in', '169.254.169.254'],
    ['a plain http address', 'http://hooks.example.test/in', '93.184.216.34'],
    ['an address with credentials', 'https://user:pass@hooks.example.test/in', '93.184.216.34'],
  ])('refuses %s', async (_name, url, address) => {
    await expect(
      putProjectWebhook(
        never,
        principal('ADMIN'),
        orgId,
        projectId,
        { url, events: ['user.created'], enabled: true },
        deps(address),
      ),
    ).rejects.toMatchObject({ code: 'validation_failed' });
  });
});

describe('who may change a webhook', () => {
  it('refuses a viewer, before anything is read', async () => {
    await expect(
      putProjectWebhook(
        never,
        principal('VIEWER'),
        orgId,
        projectId,
        { url: 'https://hooks.example.test/in', events: ['user.created'], enabled: true },
        deps('93.184.216.34'),
      ),
    ).rejects.toMatchObject({ code: 'forbidden' });
    await expect(
      rotateProjectWebhookSecret(never, principal('VIEWER'), orgId, projectId, deps('1.1.1.1')),
    ).rejects.toMatchObject({ code: 'forbidden' });
  });
});

describe('newWebhookSecret', () => {
  it('is long, prefixed and different every time', () => {
    const first = newWebhookSecret();
    expect(first).toMatch(/^whsec_[A-Za-z0-9_-]{43}$/);
    expect(newWebhookSecret()).not.toBe(first);
  });
});
