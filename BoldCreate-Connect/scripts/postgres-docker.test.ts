import { describe, expect, it } from 'vitest';
import {
  DEFAULT_POSTGRES_CONTAINER,
  DEFAULT_POSTGRES_IMAGE,
  DOCKER_POSTGRES_FLAGS,
  dockerRunArgs,
  resolvePostgresSettings,
} from './postgres-docker.js';

describe('resolvePostgresSettings', () => {
  it('uses the embedded server when nothing is set', () => {
    expect(resolvePostgresSettings({}, [])).toEqual({
      mode: 'embedded',
      image: DEFAULT_POSTGRES_IMAGE,
      container: DEFAULT_POSTGRES_CONTAINER,
      reset: false,
    });
  });

  it('reads the mode, image and container from the environment', () => {
    const settings = resolvePostgresSettings(
      {
        POSTGRES_MODE: ' Docker ',
        POSTGRES_DOCKER_IMAGE: 'postgres:16',
        POSTGRES_DOCKER_CONTAINER: 'my-pg',
      },
      [],
    );
    expect(settings).toMatchObject({ mode: 'docker', image: 'postgres:16', container: 'my-pg' });
  });

  it('lets the flag win over the environment', () => {
    const settings = resolvePostgresSettings({ POSTGRES_MODE: 'embedded' }, [
      '--reset-db',
      '--postgres=external',
    ]);
    expect(settings.mode).toBe('external');
  });

  it('falls back to the defaults for blank values', () => {
    const settings = resolvePostgresSettings(
      { POSTGRES_DOCKER_IMAGE: '  ', POSTGRES_DOCKER_CONTAINER: '' },
      [],
    );
    expect(settings.image).toBe(DEFAULT_POSTGRES_IMAGE);
    expect(settings.container).toBe(DEFAULT_POSTGRES_CONTAINER);
  });

  it('takes the container name and reset from the overrides', () => {
    const settings = resolvePostgresSettings({ POSTGRES_DOCKER_CONTAINER: 'env-name' }, [], {
      container: 'test-pg',
      reset: true,
    });
    expect(settings).toMatchObject({ container: 'test-pg', reset: true });
  });

  it('rejects an unknown mode and names the valid ones', () => {
    expect(() => resolvePostgresSettings({ POSTGRES_MODE: 'rds' }, [])).toThrow(
      /embedded, docker, external/,
    );
    expect(() => resolvePostgresSettings({}, ['--postgres='])).toThrow(/not valid/);
  });
});

describe('dockerRunArgs', () => {
  const settings = { image: 'postgres:17', container: 'pg-test' };

  it('publishes the port on loopback only and never puts the password in the arguments', () => {
    const args = dockerRunArgs(settings, { port: 54329, user: 'app', volume: undefined });
    expect(args).toContain('127.0.0.1:54329:5432');
    expect(args).toContain('POSTGRES_PASSWORD');
    expect(args.join(' ')).not.toMatch(/POSTGRES_PASSWORD=/);
    expect(args).not.toContain('--volume');
  });

  it('mounts the named volume when data is kept', () => {
    const args = dockerRunArgs(settings, { port: 5432, user: 'app', volume: 'pg-test-data' });
    const index = args.indexOf('--volume');
    expect(args[index + 1]).toBe('pg-test-data:/var/lib/postgresql/data');
  });

  it('ends with the image and the same throwaway-data flags as the embedded server', () => {
    const args = dockerRunArgs(settings, { port: 5432, user: 'app', volume: undefined });
    const imageAt = args.indexOf('postgres:17');
    expect(args.slice(imageAt + 1)).toEqual([...DOCKER_POSTGRES_FLAGS]);
    expect(args).toContain('POSTGRES_USER=app');
  });
});
