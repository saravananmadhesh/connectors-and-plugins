import { describe, expect, it } from 'vitest';
import { parseStagingEnv, stagingAppEnv, stagingProblems } from './staging-env.js';

const text = `
# comment
[common]
LOG_LEVEL=info
WORKLOAD_SECRET=shared

[api]
PORT=3001
DATABASE_URL=postgresql://app_api:pw@db.example.com:5432/app?sslmode=require
LOG_LEVEL=debug

[worker]
HEALTH_PORT=3005
`;

describe('parseStagingEnv', () => {
  it('splits the file into sections', () => {
    const sections = parseStagingEnv(text);
    expect(sections.common).toEqual({ LOG_LEVEL: 'info', WORKLOAD_SECRET: 'shared' });
    expect(sections.api['PORT']).toBe('3001');
    expect(sections.worker).toEqual({ HEALTH_PORT: '3005' });
    expect(sections.web).toEqual({});
  });

  it('keeps an equals sign inside a value', () => {
    expect(parseStagingEnv('[api]\nDATABASE_URL=a://b?x=y').api['DATABASE_URL']).toBe('a://b?x=y');
  });

  it('accepts Windows line endings', () => {
    expect(parseStagingEnv('[api]\r\nPORT=1\r\n').api['PORT']).toBe('1');
  });

  it('rejects an unknown section, a value before a section and a line without a value', () => {
    expect(() => parseStagingEnv('[nope]')).toThrow(/unknown section/);
    expect(() => parseStagingEnv('A=1')).toThrow(/before any/);
    expect(() => parseStagingEnv('[api]\nA')).toThrow(/NAME=value/);
  });
});

describe('stagingAppEnv', () => {
  const sections = parseStagingEnv(text);

  it('gives each app only common and its own values, with staging forced', () => {
    const api = stagingAppEnv('api', sections);
    expect(api).toMatchObject({
      LOG_LEVEL: 'debug',
      WORKLOAD_SECRET: 'shared',
      DEPLOY_ENV: 'staging',
    });
    expect(api['HEALTH_PORT']).toBeUndefined();
    expect(stagingAppEnv('worker', sections)['DATABASE_URL']).toBeUndefined();
  });

  it('does not let a file turn staging off', () => {
    const forced = stagingAppEnv('api', parseStagingEnv('[common]\nDEPLOY_ENV=local'));
    expect(forced['DEPLOY_ENV']).toBe('staging');
  });
});

describe('stagingProblems', () => {
  const ok = stagingAppEnv('api', parseStagingEnv(text));

  it('accepts a remote database and one reached through a local proxy', () => {
    expect(stagingProblems('api', ok)).toEqual([]);
    const proxied = { ...ok, DATABASE_URL: 'postgresql://u:p@127.0.0.1:5432/x' };
    expect(stagingProblems('api', proxied)).toEqual([]);
  });

  it('flags placeholders, local services, local KMS and an empty section', () => {
    expect(stagingProblems('api', { ...ok, WORKLOAD_SECRET: 'REPLACE_ME' })).toHaveLength(1);
    expect(stagingProblems('api', { ...ok, REDIS_URL: 'redis://127.0.0.1:6379' })).toEqual([
      expect.stringContaining('points at this machine'),
    ]);
    expect(stagingProblems('api', { ...ok, DATABASE_URL: 'not a url' })).toHaveLength(1);
    expect(stagingProblems('api', { ...ok, KMS_ADAPTER: 'local' })).toHaveLength(1);
    expect(stagingProblems('web', stagingAppEnv('web', parseStagingEnv('')))).toHaveLength(1);
  });

  it('accepts AWS keys as a pair and flags a lone key or the refused blob keys', () => {
    const keys = { AWS_ACCESS_KEY_ID: 'AKIAEXAMPLE', AWS_SECRET_ACCESS_KEY: 'secret' };
    expect(stagingProblems('api', { ...ok, ...keys })).toEqual([]);
    expect(stagingProblems('api', { ...ok, AWS_ACCESS_KEY_ID: 'AKIAEXAMPLE' })).toEqual([
      expect.stringContaining('must be set together'),
    ]);
    expect(stagingProblems('api', { ...ok, BLOB_ACCESS_KEY_ID: 'AKIAEXAMPLE' })).toEqual([
      expect.stringContaining('BLOB_ACCESS_KEY_ID is refused'),
    ]);
  });
});
