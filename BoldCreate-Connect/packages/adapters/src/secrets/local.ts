/**
 * Local secrets adapter: one file per secret in a directory, or a `SECRET_<NAME>` variable.
 *
 * Local and test use only; the deployed-environment guard rejects it. The version of a file
 * secret is a hash of its modification time and size, the version of a variable is a hash of
 * its value. Only the current value exists, so an explicit version that is not current is
 * reported as not found.
 */
import { createHash } from 'node:crypto';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import {
  SecretNotFoundError,
  SecretsUnavailableError,
  type SecretsPort,
  type SecretValue,
} from '@boldcreate-integrations/ports';
import { pollSecret } from './watch.js';

export interface LocalSecretsOptions {
  /** Directory with one file per secret. */
  dir?: string | undefined;
  /** Variables consulted when there is no file; defaults to the process environment. */
  env?: NodeJS.ProcessEnv | undefined;
}

export type LocalSecrets = SecretsPort & { readonly localOnly: true };

const NAME = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,127}$/;

const hash = (text: string) => createHash('sha256').update(text).digest('hex').slice(0, 16);

export function envNameOf(name: string): string {
  return `SECRET_${name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}`;
}

export function createLocalSecrets(options: LocalSecretsOptions = {}): LocalSecrets {
  const env = options.env ?? process.env;

  async function read(name: string): Promise<SecretValue> {
    if (!NAME.test(name)) throw new SecretNotFoundError();
    if (options.dir !== undefined) {
      const file = join(options.dir, name);
      try {
        const info = await stat(file);
        if (info.isFile()) {
          const value = (await readFile(file, 'utf8')).replace(/\r?\n$/, '');
          return { value, version: hash(`${info.mtimeMs}:${info.size}`) };
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
          throw new SecretsUnavailableError();
        }
      }
    }
    const fromEnv = env[envNameOf(name)];
    if (fromEnv !== undefined && fromEnv !== '') return { value: fromEnv, version: hash(fromEnv) };
    throw new SecretNotFoundError();
  }

  return {
    localOnly: true,
    async get(name, version) {
      const secret = await read(name);
      if (version !== undefined && version !== 'latest' && version !== secret.version) {
        throw new SecretNotFoundError();
      }
      return secret;
    },
    watch(name, handler, opts) {
      return pollSecret(() => read(name), handler, opts?.intervalSeconds);
    },
  };
}
