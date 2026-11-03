import { describe, expect, it } from 'vitest';
import { CreateApiKeyBodySchema } from './api-keys.js';

const base = { name: 'host', permissions: ['mcp:list'] };

describe('the rate limit of a new key', () => {
  it.each([1, 60, 3000])('accepts %i calls a minute', (rateLimitPerMinute) => {
    expect(CreateApiKeyBodySchema.safeParse({ ...base, rateLimitPerMinute }).success).toBe(true);
  });

  it.each([0, 3001, 1.5])('refuses %s', (rateLimitPerMinute) => {
    expect(CreateApiKeyBodySchema.safeParse({ ...base, rateLimitPerMinute }).success).toBe(false);
  });
});
