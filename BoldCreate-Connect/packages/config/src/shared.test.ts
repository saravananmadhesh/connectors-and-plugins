import { describe, expect, it } from 'vitest';
import * as z from 'zod/v4';
import {
  ORIGIN_DEFAULTS,
  csv,
  flag,
  httpServerShape,
  originShape,
  portList,
  refineOrigins,
  refineSecretLength,
  withOriginDefaults,
} from './shared.js';

describe('csv', () => {
  it('splits, trims and drops empty entries', () => {
    expect(csv().parse(' a, b ,,c ')).toEqual(['a', 'b', 'c']);
  });

  it('is an empty list when missing and uses the fallback when given', () => {
    expect(csv().parse(undefined)).toEqual([]);
    expect(csv('api,worker').parse(undefined)).toEqual(['api', 'worker']);
    expect(csv('api,worker').parse('web')).toEqual(['web']);
  });
});

describe('portList', () => {
  it('parses ports', () => {
    expect(portList.parse('8443, 9000')).toEqual([8443, 9000]);
    expect(portList.parse(undefined)).toEqual([]);
  });

  it.each(['abc', '0', '70000', '80.5'])('rejects %s', (value) => {
    expect(portList.safeParse(value).success).toBe(false);
  });
});

describe('flag', () => {
  it.each([
    ['true', true],
    ['1', true],
    ['false', false],
    ['0', false],
    ['', false],
  ])('reads %j as %s', (value, expected) => {
    expect(flag.parse(value)).toBe(expected);
  });

  it('rejects other values', () => {
    expect(flag.safeParse('yes').success).toBe(false);
  });
});

describe('httpServerShape', () => {
  const schema = z.object(httpServerShape);

  it('has defaults for every key', () => {
    const config = schema.parse({});
    expect(config).toMatchObject({
      BODY_LIMIT_BYTES: 262_144,
      MAX_HEADER_BYTES: 16_384,
      TRUSTED_PROXY_CIDRS: [],
      ALLOWED_HOSTS: [],
      IP_THROTTLE_LIMIT: 0,
      IP_THROTTLE_WINDOW_SECONDS: 60,
      UV_THREADPOOL_SIZE: 8,
      METRICS_ENABLED: true,
      SHUTDOWN_DRAIN_SECONDS: 20,
      SHUTDOWN_PREDRAIN_SECONDS: 5,
    });
  });

  it('reads values and turns metrics off', () => {
    const config = schema.parse({
      ALLOWED_HOSTS: 'a.example,b.example',
      METRICS_ENABLED: 'false',
      IP_THROTTLE_LIMIT: '100',
    });
    expect(config.ALLOWED_HOSTS).toEqual(['a.example', 'b.example']);
    expect(config.METRICS_ENABLED).toBe(false);
    expect(config.IP_THROTTLE_LIMIT).toBe(100);
  });

  it('rejects out-of-range numbers', () => {
    expect(schema.safeParse({ BODY_LIMIT_BYTES: '10' }).success).toBe(false);
    expect(schema.safeParse({ UV_THREADPOOL_SIZE: '2' }).success).toBe(false);
  });
});

describe('origins', () => {
  const keys = ['APP_BASE_URL', 'OAUTH_REDIRECT_URI'] as const;
  const schema = z
    .object({
      DEPLOY_ENV: z.enum(['local', 'test', 'staging', 'production']),
      ...originShape(...keys),
    })
    .superRefine((value, ctx) => refineOrigins(value, keys, ctx))
    .transform((value) => withOriginDefaults(value, keys));

  it('fills local defaults', () => {
    expect(schema.parse({ DEPLOY_ENV: 'local' })).toMatchObject({
      APP_BASE_URL: ORIGIN_DEFAULTS.APP_BASE_URL,
      OAUTH_REDIRECT_URI: ORIGIN_DEFAULTS.OAUTH_REDIRECT_URI,
    });
  });

  it('keeps a given value and allows a path on the redirect uri only', () => {
    const parsed = schema.parse({
      DEPLOY_ENV: 'local',
      APP_BASE_URL: 'http://localhost:4000',
      OAUTH_REDIRECT_URI: 'http://localhost:4000/cb',
    });
    expect(parsed.APP_BASE_URL).toBe('http://localhost:4000');
    expect(schema.safeParse({ DEPLOY_ENV: 'local', APP_BASE_URL: 'http://h/p' }).success).toBe(
      false,
    );
  });

  it('requires https values with no defaults when deployed', () => {
    expect(schema.safeParse({ DEPLOY_ENV: 'staging' }).success).toBe(false);
    expect(
      schema.safeParse({
        DEPLOY_ENV: 'staging',
        APP_BASE_URL: 'https://a.example.com',
        OAUTH_REDIRECT_URI: 'https://a.example.com/cb',
      }).success,
    ).toBe(true);
  });
});

describe('refineSecretLength', () => {
  const schema = z
    .object({
      NODE_ENV: z.string(),
      DEPLOY_ENV: z.enum(['local', 'test', 'staging', 'production']),
      KEY: z.string().optional(),
    })
    .superRefine((value, ctx) => refineSecretLength(value, ['KEY'], ctx));
  const ok = (value: Record<string, string>) => schema.safeParse(value).success;

  it('applies in production and deployed environments only', () => {
    expect(ok({ NODE_ENV: 'development', DEPLOY_ENV: 'local', KEY: 'x' })).toBe(true);
    expect(ok({ NODE_ENV: 'production', DEPLOY_ENV: 'local', KEY: 'x' })).toBe(false);
    expect(ok({ NODE_ENV: 'test', DEPLOY_ENV: 'staging', KEY: 'x' })).toBe(false);
    expect(ok({ NODE_ENV: 'test', DEPLOY_ENV: 'staging', KEY: 'x'.repeat(32) })).toBe(true);
    expect(ok({ NODE_ENV: 'test', DEPLOY_ENV: 'staging' })).toBe(true);
  });
});
