import { describe, expect, it } from 'vitest';
import { compareRoutes } from './route-parity.js';

const entries = [
  { method: 'GET', pathTemplate: '/v1/things/{thingId}' },
  { method: 'POST', pathTemplate: '/v1/things' },
] as const;

describe('compareRoutes', () => {
  it('matches placeholders and ignores HEAD', () => {
    const served = [
      { method: 'GET', url: '/v1/things/:thingId' },
      { method: 'HEAD', url: '/v1/things/:thingId' },
      { method: 'POST', url: '/v1/things' },
    ];
    expect(compareRoutes(served, entries)).toEqual({ missing: [], unexpected: [] });
  });

  it('reports a registry entry that is not served', () => {
    const result = compareRoutes([{ method: 'POST', url: '/v1/things' }], entries);
    expect(result.missing).toEqual(['GET /v1/things/:thingId']);
    expect(result.unexpected).toEqual([]);
  });

  it('reports a served route without an entry unless it is allowed', () => {
    const served = [
      { method: 'GET', url: '/v1/things/:thingId' },
      { method: 'POST', url: '/v1/things' },
      { method: 'POST', url: '/mcp' },
    ];
    expect(compareRoutes(served, entries).unexpected).toEqual(['POST /mcp']);
    expect(compareRoutes(served, entries, ['POST /mcp']).unexpected).toEqual([]);
  });

  it('treats a different method on the same path as different routes', () => {
    const served = [
      { method: 'PUT', url: '/v1/things' },
      { method: 'GET', url: '/v1/things/:thingId' },
    ];
    const result = compareRoutes(served, entries);
    expect(result.missing).toEqual(['POST /v1/things']);
    expect(result.unexpected).toEqual(['PUT /v1/things']);
  });
});
