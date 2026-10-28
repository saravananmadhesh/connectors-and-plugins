import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mkdtempSync, rmSync, symlinkSync, utimesSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { SecretNotFoundError, SecretsUnavailableError } from '@boldcreate-integrations/ports';
import { createLocalSecrets, envNameOf } from './index.js';
import { runSecretsContract } from '../contract/secrets.contract.js';

runSecretsContract('local files', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'secrets-contract-'));
  let clock = Date.now() / 1000;
  return {
    port: createLocalSecrets({ dir, env: {} }),
    cleanup: async () => rmSync(dir, { recursive: true, force: true }),
    name: () => `contract-${randomUUID()}`,
    async write(name, value) {
      const file = join(dir, name);
      writeFileSync(file, value);
      // Each write gets a modification time later than any before it, whatever the clock grain.
      clock += 2;
      utimesSync(file, clock, clock);
    },
  };
});

describe('local secrets', () => {
  let dir: string;
  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'secrets-local-'));
  });
  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('is marked local only', () => {
    expect(createLocalSecrets({ dir, env: {} }).localOnly).toBe(true);
  });

  it('strips one trailing newline and nothing else', async () => {
    writeFileSync(join(dir, 'token'), 'abc \n');
    writeFileSync(join(dir, 'windows'), 'abc\r\n');
    const secrets = createLocalSecrets({ dir, env: {} });
    expect((await secrets.get('token')).value).toBe('abc ');
    expect((await secrets.get('windows')).value).toBe('abc');
  });

  it('falls back to SECRET_<NAME> and prefers the file', async () => {
    const env = { SECRET_API_TOKEN: 'from-env', SECRET_OTHER: 'env-other' };
    writeFileSync(join(dir, 'other'), 'from-file');
    const secrets = createLocalSecrets({ dir, env });
    expect(await secrets.get('api-token')).toMatchObject({ value: 'from-env' });
    expect((await secrets.get('other')).value).toBe('from-file');
  });

  it('works with variables only and gives a variable a stable version of its value', async () => {
    const env: NodeJS.ProcessEnv = { SECRET_A: 'x' };
    const secrets = createLocalSecrets({ env });
    const first = await secrets.get('a');
    env['SECRET_A'] = 'y';
    const second = await secrets.get('a');
    expect(first.version).not.toBe(second.version);
    env['SECRET_A'] = 'y';
    expect((await secrets.get('a')).version).toBe(second.version);
    await expect(secrets.get('missing')).rejects.toBeInstanceOf(SecretNotFoundError);
  });

  it('treats an empty variable as missing and names variables in upper case', async () => {
    expect(envNameOf('manifest.signing-key')).toBe('SECRET_MANIFEST_SIGNING_KEY');
    const secrets = createLocalSecrets({ env: { SECRET_EMPTY: '' } });
    await expect(secrets.get('empty')).rejects.toBeInstanceOf(SecretNotFoundError);
  });

  it('accepts latest and the current version only', async () => {
    writeFileSync(join(dir, 's'), 'value');
    const secrets = createLocalSecrets({ dir, env: {} });
    const current = await secrets.get('s');
    expect(await secrets.get('s', 'latest')).toEqual(current);
    expect(await secrets.get('s', current.version)).toEqual(current);
    await expect(secrets.get('s', 'other')).rejects.toBeInstanceOf(SecretNotFoundError);
  });

  it('reports an unreadable secret as unavailable, not missing', async () => {
    mkdirSync(join(dir, 'real'));
    writeFileSync(join(dir, 'real', 'file'), 'x');
    const secrets = createLocalSecrets({ dir, env: {} });
    // A directory is not a secret file.
    await expect(secrets.get('real')).rejects.toBeInstanceOf(SecretNotFoundError);
    try {
      symlinkSync(join(dir, 'loop'), join(dir, 'loop'));
    } catch {
      return;
    }
    await expect(secrets.get('loop')).rejects.toBeInstanceOf(SecretsUnavailableError);
  });
});
