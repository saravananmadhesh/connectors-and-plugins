import { describe, it, expect } from 'vitest';
import * as z from 'zod/v4';
import { ActionSchema } from './principal.js';
import { ROUTES } from './routes.js';

const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function pathParamNames(template: string): string[] {
  return [...template.matchAll(/\{([A-Za-z0-9]+)\}/g)].map((m) => m[1]!);
}

function paramKeys(schema: z.ZodType | undefined): string[] {
  if (!schema) return [];
  const json = z.toJSONSchema(schema, { unrepresentable: 'any', io: 'input' }) as {
    properties?: Record<string, unknown>;
  };
  return Object.keys(json.properties ?? {});
}

describe('route registry', () => {
  it('names only actions of the permission catalog', () => {
    for (const route of ROUTES) {
      if (route.action === null) continue;
      expect(ActionSchema.safeParse(route.action).success, `${route.id}: ${route.action}`).toBe(
        true,
      );
    }
  });

  it('has unique ids and unique (app, method, path) triples', () => {
    expect(new Set(ROUTES.map((r) => r.id)).size).toBe(ROUTES.length);
    const triples = ROUTES.map((r) => `${r.app} ${r.method} ${r.pathTemplate}`);
    expect(new Set(triples).size).toBe(triples.length);
  });

  it('declares every path placeholder in params', () => {
    for (const route of ROUTES) {
      expect(paramKeys(route.params).sort()).toEqual(pathParamNames(route.pathTemplate).sort());
    }
  });

  it('only requires idempotency on writing methods', () => {
    for (const route of ROUTES.filter((r) => r.idempotency === 'required')) {
      expect(WRITE_METHODS.has(route.method)).toBe(true);
    }
  });

  it('allows secret responses only on routes that accept an idempotency key', () => {
    for (const route of ROUTES.filter((r) => r.secretResponse)) {
      expect(route.idempotency).not.toBe('none');
    }
  });

  it('points transitional routes at a registry id or null', () => {
    const ids = new Set(ROUTES.map((r) => r.id));
    for (const route of ROUTES.filter((r) => r.transitional)) {
      expect(route.replacedBy === null || ids.has(route.replacedBy ?? '')).toBe(true);
    }
  });

  it('names routes <resource>.<action> and never with an inventory id', () => {
    for (const route of ROUTES) {
      expect(route.id).toMatch(/^[a-z][A-Za-z]*(\.[a-z][A-Za-z]*)+$/);
      expect(route.id).not.toMatch(/^[A-Z]{1,2}[0-9]+$/);
    }
  });

  it('gives every route at least one response', () => {
    for (const route of ROUTES) expect(Object.keys(route.responses).length).toBeGreaterThan(0);
  });

  it('expands scoped routes for org and user', () => {
    for (const scope of ['org', 'user']) {
      expect(ROUTES.some((r) => r.id === `installations.list.${scope}`)).toBe(true);
    }
    expect(ROUTES.some((r) => r.id === 'installations.list.team')).toBe(false);
    expect(ROUTES.find((r) => r.id === 'installations.list.user')?.pathTemplate).toBe(
      '/v1/orgs/{orgId}/me/installations',
    );
  });
});
