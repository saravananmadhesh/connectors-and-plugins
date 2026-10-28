import { describe, it, expect, afterAll, beforeAll, vi } from 'vitest';
import { randomUUID } from 'node:crypto';
import {
  SecretNotFoundError,
  type SecretsPort,
  type SecretValue,
} from '@boldcreate-integrations/ports';
import type { ContractHarness } from './harness.js';

export interface SecretsHarness extends ContractHarness<SecretsPort> {
  /** Creates the secret, or writes a new version of it with the value. */
  write(name: string, value: string): Promise<void>;
  /** A secret name the service accepts; each call returns a name no earlier call returned. */
  name(): string;
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Behaviour every `SecretsPort` adapter must have. */
export function runSecretsContract(label: string, make: () => Promise<SecretsHarness>): void {
  describe(`secrets contract: ${label}`, () => {
    let harness: SecretsHarness;
    let secrets: SecretsPort;
    beforeAll(async () => {
      harness = await make();
      secrets = harness.port;
    });
    afterAll(async () => {
      await harness.cleanup();
    });

    it('gets an existing secret with a version', async () => {
      const name = harness.name();
      await harness.write(name, 'first-value');
      const secret = await secrets.get(name);
      expect(secret.value).toBe('first-value');
      expect(secret.version).not.toBe('');
    });

    it('rejects a missing secret with SecretNotFoundError', async () => {
      await expect(secrets.get(harness.name())).rejects.toBeInstanceOf(SecretNotFoundError);
    });

    it('rejects a name that is not a secret name', async () => {
      await expect(secrets.get('../etc/passwd')).rejects.toBeInstanceOf(SecretNotFoundError);
      await expect(secrets.get('')).rejects.toBeInstanceOf(SecretNotFoundError);
    });

    it('changes the version after a rewrite and returns the new value', async () => {
      const name = harness.name();
      await harness.write(name, 'one');
      const before = await secrets.get(name);
      await harness.write(name, 'two');
      const after = await secrets.get(name);
      expect(after.value).toBe('two');
      expect(after.version).not.toBe(before.version);
    });

    it('rejects a version that does not exist', async () => {
      const name = harness.name();
      await harness.write(name, 'value');
      await expect(secrets.get(name, '999999')).rejects.toBeInstanceOf(SecretNotFoundError);
    });

    it('serves concurrent reads the same secret', async () => {
      const name = harness.name();
      await harness.write(name, 'shared');
      const results = await Promise.all(Array.from({ length: 20 }, () => secrets.get(name)));
      expect(new Set(results.map((result) => result.value))).toEqual(new Set(['shared']));
      expect(new Set(results.map((result) => result.version)).size).toBe(1);
    });

    it('calls the watcher on change, not for the baseline, and stops when told to', async () => {
      const name = harness.name();
      await harness.write(name, 'v-one');
      const seen: SecretValue[] = [];
      const stop = secrets.watch(name, (secret) => seen.push(secret), { intervalSeconds: 0.05 });
      try {
        await sleep(200);
        expect(seen).toEqual([]);
        await harness.write(name, 'v-two');
        await vi.waitFor(() => expect(seen.map((secret) => secret.value)).toEqual(['v-two']), {
          timeout: 5000,
        });
      } finally {
        stop();
      }
      await harness.write(name, 'v-three');
      await sleep(300);
      expect(seen.map((secret) => secret.value)).toEqual(['v-two']);
    });

    it('keeps watching through a missing secret and reports it once it exists', async () => {
      const name = `${harness.name()}-${randomUUID().slice(0, 4)}`.slice(0, 60);
      const seen: SecretValue[] = [];
      const stop = secrets.watch(name, (secret) => seen.push(secret), { intervalSeconds: 0.05 });
      try {
        await sleep(150);
        await harness.write(name, 'appeared');
        await sleep(300);
        // The first successful read is the baseline.
        expect(seen).toEqual([]);
        await harness.write(name, 'changed');
        await vi.waitFor(() => expect(seen.map((secret) => secret.value)).toEqual(['changed']), {
          timeout: 5000,
        });
      } finally {
        stop();
      }
    });
  });
}
