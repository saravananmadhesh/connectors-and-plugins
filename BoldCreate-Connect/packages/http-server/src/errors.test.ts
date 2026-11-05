import { describe, expect, it } from 'vitest';
import { AppError } from '@boldcreate-integrations/contracts';
import { isParseError, mapError } from './errors.js';

describe('mapError', () => {
  it('maps an AppError to its registered status and fixed message', () => {
    const mapped = mapError(new AppError('conflict'), 'req-1');
    expect(mapped).toMatchObject({ code: 'conflict', status: 409, unexpected: false });
    expect(mapped.body.error.requestId).toBe('req-1');
  });

  it.each([
    [400, 'validation_failed'],
    [403, 'forbidden'],
    [404, 'not_found'],
    [405, 'method_not_allowed'],
    [413, 'payload_too_large'],
    [415, 'unsupported_media_type'],
  ])('maps a framework %i to %s', (statusCode, code) => {
    expect(mapError({ statusCode }, 'r').code).toBe(code);
  });

  it('answers internal_error for anything else and never carries its text', () => {
    const mapped = mapError(new Error('database password is hunter2'), 'r');
    expect(mapped).toMatchObject({ code: 'internal_error', unexpected: true });
    expect(JSON.stringify(mapped.body)).not.toContain('hunter2');
  });

  it.each([
    [Object.assign(new Error('too many connections for role "app_api"'), { code: '53300' })],
    [new Error('too many connections for role "app_api"')],
    [new Error('timeout exceeded when trying to connect')],
    [Object.assign(new Error('database admission queue is full'), { code: 'admission_refused' })],
  ])('answers 503 and still logs when the database has no connection to give', (error) => {
    const mapped = mapError(error, 'r');
    expect(mapped).toMatchObject({ code: 'service_unavailable', status: 503, unexpected: true });
    expect(mapped.retryAfterSeconds).toBe(1);
    expect(JSON.stringify(mapped.body)).not.toContain('app_api');
  });

  it('adds Retry-After for the codes that need it', () => {
    expect(mapError(new AppError('rate_limited'), 'r').retryAfterSeconds).toBe(1);
    expect(
      mapError(new AppError('rate_limited'), 'r', { rate_limited: 30 }).retryAfterSeconds,
    ).toBe(30);
    expect(mapError(new AppError('forbidden'), 'r').retryAfterSeconds).toBeUndefined();
  });
});

describe('isParseError', () => {
  it('recognises body parser errors only', () => {
    expect(isParseError({ code: 'FST_ERR_CTP_EMPTY_JSON_BODY' })).toBe(true);
    expect(isParseError({ code: 'FST_ERR_NOT_FOUND' })).toBe(false);
    expect(isParseError(null)).toBe(false);
  });
});
