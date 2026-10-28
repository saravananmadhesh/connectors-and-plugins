/**
 * Security tests: log redaction.
 *
 * Correlation/redaction tests must pass before credentials exist.
 * These tests verify that secret fields are never emitted in log output.
 */
import { describe, it, expect } from 'vitest';
import { redactSecrets } from './redact.js';

describe('redactSecrets — secret fields never appear in log output', () => {
  it('redacts password', () => {
    const result = redactSecrets({ password: 'hunter2' }) as Record<string, unknown>;
    expect(result['password']).toBe('[REDACTED]');
  });

  it('redacts token', () => {
    const result = redactSecrets({ token: 'tok_abc123' }) as Record<string, unknown>;
    expect(result['token']).toBe('[REDACTED]');
  });

  it('redacts secret', () => {
    const result = redactSecrets({ secret: 'my-secret-value' }) as Record<string, unknown>;
    expect(result['secret']).toBe('[REDACTED]');
  });

  it('redacts credential', () => {
    const result = redactSecrets({ credential: 'Bearer sk-live-xxx' }) as Record<string, unknown>;
    expect(result['credential']).toBe('[REDACTED]');
  });

  it('redacts ciphertext', () => {
    const result = redactSecrets({ ciphertext: 'base64encodeddata' }) as Record<string, unknown>;
    expect(result['ciphertext']).toBe('[REDACTED]');
  });

  it('redacts wrappedDek', () => {
    const result = redactSecrets({ wrappedDek: 'base64encodedwrappedkey' }) as Record<
      string,
      unknown
    >;
    expect(result['wrappedDek']).toBe('[REDACTED]');
  });

  it('redacts authorization header (case-insensitive)', () => {
    const result = redactSecrets({ Authorization: 'Bearer sk-live-xxx' }) as Record<
      string,
      unknown
    >;
    expect(result['Authorization']).toBe('[REDACTED]');
  });

  it('redacts cookie header', () => {
    const result = redactSecrets({ cookie: 'sid=abc123' }) as Record<string, unknown>;
    expect(result['cookie']).toBe('[REDACTED]');
  });

  it('redacts x-csrf-token header', () => {
    const result = redactSecrets({ 'x-csrf-token': 'csrf-tok-xyz' }) as Record<string, unknown>;
    expect(result['x-csrf-token']).toBe('[REDACTED]');
  });

  it('preserves non-secret fields', () => {
    const result = redactSecrets({ userId: 'u-123', email: 'user@example.com' }) as Record<
      string,
      unknown
    >;
    expect(result['userId']).toBe('u-123');
    expect(result['email']).toBe('user@example.com');
  });

  it('redacts secrets nested inside a request log object', () => {
    const logEntry = {
      reqId: 'req-abc',
      method: 'POST',
      url: '/v1/auth/signin',
      body: {
        email: 'user@example.com',
        password: 'hunter2',
      },
    };
    const result = redactSecrets(logEntry) as {
      body: Record<string, unknown>;
      reqId: string;
    };
    expect(result.body['password']).toBe('[REDACTED]');
    expect(result.body['email']).toBe('user@example.com');
    expect(result.reqId).toBe('req-abc');
  });

  it('redacts secrets in arrays', () => {
    const result = redactSecrets([{ token: 'tok1' }, { token: 'tok2' }]) as Array<
      Record<string, unknown>
    >;
    expect(result[0]!['token']).toBe('[REDACTED]');
    expect(result[1]!['token']).toBe('[REDACTED]');
  });

  it('does not mutate the original object', () => {
    const original = { password: 'hunter2', userId: 'u-1' };
    redactSecrets(original);
    expect(original.password).toBe('hunter2');
  });

  it('handles null and primitives without throwing', () => {
    expect(redactSecrets(null)).toBeNull();
    expect(redactSecrets('string')).toBe('string');
    expect(redactSecrets(42)).toBe(42);
  });

  it('returns [DEPTH_LIMIT] when nesting exceeds 10 levels', () => {
    // Build a 12-level deep object
    let obj: Record<string, unknown> = { value: 'deep' };
    for (let i = 0; i < 12; i++) {
      obj = { nested: obj };
    }
    const result = redactSecrets(obj);
    // At depth 10 the recursion stops
    expect(JSON.stringify(result)).toContain('[DEPTH_LIMIT]');
  });

  it('fixture credential value is never logged in plaintext', () => {
    // Simulate a gateway log entry that might contain a decrypted credential
    const gatewayLog = {
      reqId: 'gw-req-001',
      connectionId: 'conn-abc',
      credential: 'Bearer fixture-secret-token-do-not-log',
      upstreamUrl: 'https://fixture.example.com/mcp',
    };
    const redacted = redactSecrets(gatewayLog) as Record<string, unknown>;
    expect(redacted['credential']).toBe('[REDACTED]');
    expect(redacted['connectionId']).toBe('conn-abc');
    expect(redacted['upstreamUrl']).toBe('https://fixture.example.com/mcp');
    // Confirm the raw value is not present anywhere in the serialized output
    expect(JSON.stringify(redacted)).not.toContain('fixture-secret-token-do-not-log');
  });
});
