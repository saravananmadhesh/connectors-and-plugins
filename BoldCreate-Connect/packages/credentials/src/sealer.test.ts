import { randomUUID } from 'node:crypto';
import { afterEach, describe, expect, it } from 'vitest';
import { AppError } from '@boldcreate-integrations/contracts';
import { createSealingFixture, type SealingFixture } from './org-key-fixture.js';
import { SensitiveFieldError, SENSITIVE_FIELDS } from './sensitive-fields.js';
import type { SealContext } from './envelope.js';

const orgId = randomUUID();

describe('sealer', () => {
  let fixture: SealingFixture;
  afterEach(() => fixture.cleanup());

  const context = (): SealContext => ({
    purpose: 'connection_secret',
    orgId,
    subject: { kind: 'connection', id: randomUUID() },
  });

  it('refuses to seal while the org has no active key', async () => {
    fixture = createSealingFixture();
    await expect(fixture.sealer.seal({ ...context(), plaintext: 'x' })).rejects.toMatchObject({
      code: 'org_key_pending',
    });
    await expect(fixture.sealer.seal({ ...context(), plaintext: 'x' })).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('never puts the plaintext in the envelope', async () => {
    fixture = createSealingFixture();
    await fixture.addKey(orgId);
    const envelope = await fixture.sealer.seal({ ...context(), plaintext: 'super-secret-value' });
    expect(envelope).toMatch(/^v1:okey_[0-9a-f]{32}:/);
    expect(envelope).not.toContain('super-secret-value');
    expect(envelope).not.toContain(Buffer.from('super-secret-value').toString('base64url'));
  });

  describe('sealFields', () => {
    const ctx = (): SealContext => ({
      purpose: 'oauth_client_secret',
      orgId,
      subject: { kind: 'mcp_server', id: randomUUID() },
    });

    it('seals only the declared paths, including arrays and nested objects', async () => {
      fixture = createSealingFixture();
      await fixture.addKey(orgId);
      const value = {
        clientId: 'public-id',
        clientSecret: 'shh',
        nested: { token: 'inner', note: 'plain' },
        list: [{ token: 'one' }, { token: 'two' }],
      };
      const paths = ['clientSecret', 'nested.token', 'list.*.token'];
      const context = ctx();
      const sealed = await fixture.sealer.sealFields(value, paths, context);
      expect(sealed.clientId).toBe('public-id');
      expect(sealed.nested.note).toBe('plain');
      for (const sealedValue of [
        sealed.clientSecret,
        sealed.nested.token,
        sealed.list[0]!.token,
        sealed.list[1]!.token,
      ]) {
        expect(sealedValue).toMatch(/^v1:okey_/);
      }
      expect(value.clientSecret).toBe('shh');
      expect(await fixture.unsealer.unsealFields(sealed, paths, context)).toEqual(value);
    });

    it('binds each field to its own path', async () => {
      fixture = createSealingFixture();
      await fixture.addKey(orgId);
      const context = ctx();
      const sealed = await fixture.sealer.sealFields({ a: 'one', b: 'two' }, ['a', 'b'], context);
      const swapped = { a: sealed.b, b: sealed.a };
      await expect(
        fixture.unsealer.unsealFields(swapped, ['a', 'b'], context),
      ).rejects.toMatchObject({
        code: 'credential_unavailable',
      });
    });

    it('seals every value of a wildcard field set', async () => {
      fixture = createSealingFixture();
      await fixture.addKey(orgId);
      const headers = { Authorization: 'Bearer abc', 'X-Key': 'k' };
      const sealed = await fixture.sealer.sealFields(
        headers,
        SENSITIVE_FIELDS.upstream_headers,
        ctx(),
      );
      expect(Object.values(sealed).every((v) => v.startsWith('v1:okey_'))).toBe(true);
    });

    it('ignores a missing declared path and rejects a non-string value', async () => {
      fixture = createSealingFixture();
      await fixture.addKey(orgId);
      const sealed = await fixture.sealer.sealFields({ other: 'x' }, ['clientSecret'], ctx());
      expect(sealed).toEqual({ other: 'x' });
      await expect(
        fixture.sealer.sealFields({ clientSecret: 42 }, ['clientSecret'], ctx()),
      ).rejects.toBeInstanceOf(SensitiveFieldError);
      await expect(
        fixture.sealer.sealFields({ clientSecret: null }, ['clientSecret'], ctx()),
      ).rejects.toBeInstanceOf(SensitiveFieldError);
    });
  });
});
