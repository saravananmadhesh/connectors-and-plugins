import { describe, expect, it } from 'vitest';
import * as z from 'zod/v4';
import { ROUTES, type RouteDef } from '../v1/routes.js';
import { generateOpenApi, routesFor, serializeOpenApi, standardErrorStatuses } from './generate.js';

type Operation = {
  operationId: string;
  parameters?: { name: string; in: string; required: boolean }[];
  requestBody?: unknown;
  security?: Record<string, unknown>[];
  responses: Record<
    string,
    { $ref?: string; headers?: Record<string, unknown>; content?: unknown }
  >;
  deprecated?: boolean;
  'x-secret-response'?: boolean;
};

function operations(audience: 'public' | 'internal'): Map<string, Operation> {
  const document = generateOpenApi(ROUTES, audience);
  const byId = new Map<string, Operation>();
  for (const methods of Object.values(document.paths)) {
    for (const operation of Object.values(methods) as unknown as Operation[]) {
      byId.set(operation.operationId, operation);
    }
  }
  return byId;
}

const publicOps = operations('public');
const internalOps = operations('internal');

describe('generateOpenApi', () => {
  it('produces OpenAPI 3.1 with version v1', () => {
    const document = generateOpenApi(ROUTES, 'public');
    expect(document.openapi).toBe('3.1.0');
    expect(document.info.version).toBe('v1');
    expect(document.jsonSchemaDialect).toBe('https://json-schema.org/draft/2020-12/schema');
  });

  it('documents every browser and key facing entry once, and every internal entry apart', () => {
    const expectedPublic = routesFor(ROUTES, 'public').map((route) => route.id);
    const expectedInternal = ROUTES.filter((route) => route.exposure === 'internal').map(
      (route) => route.id,
    );
    expect([...publicOps.keys()].sort()).toEqual([...expectedPublic].sort());
    expect([...internalOps.keys()].sort()).toEqual([...expectedInternal].sort());
    for (const id of expectedInternal) expect(publicOps.has(id)).toBe(false);
  });

  it('uses the route id as operationId, unique across a document', () => {
    const document = generateOpenApi(ROUTES, 'public');
    const ids = Object.values(document.paths).flatMap((methods) =>
      Object.values(methods).map((operation) => operation['operationId']),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('declares path parameters from the path and the Idempotency-Key header where it applies', () => {
    for (const route of routesFor(ROUTES, 'public')) {
      const operation = publicOps.get(route.id) as Operation;
      const names = (operation.parameters ?? [])
        .filter((parameter) => parameter.in === 'path')
        .map((parameter) => parameter.name)
        .sort();
      expect(names).toEqual(
        [...route.pathTemplate.matchAll(/\{([A-Za-z0-9]+)\}/g)].map((match) => match[1]).sort(),
      );
      const idem = (operation.parameters ?? []).find(
        (parameter) => parameter.name === 'Idempotency-Key',
      );
      expect(idem === undefined ? 'absent' : idem.required).toBe(
        route.idempotency === 'none' ? 'absent' : route.idempotency === 'required',
      );
    }
  });

  it('describes a request body only where the entry has one', () => {
    for (const route of routesFor(ROUTES, 'public')) {
      const operation = publicOps.get(route.id) as Operation;
      expect(operation.requestBody !== undefined).toBe(route.body !== undefined);
    }
  });

  it('lists the entry responses plus the derived errors, all carrying X-Request-Id', () => {
    for (const route of routesFor(ROUTES, 'public')) {
      const operation = publicOps.get(route.id) as Operation;
      const statuses = Object.keys(operation.responses).map(Number);
      for (const status of Object.keys(route.responses).map(Number)) {
        expect(statuses).toContain(status);
      }
      for (const status of standardErrorStatuses(route)) expect(statuses).toContain(status);
      for (const response of Object.values(operation.responses)) {
        if (response.$ref) continue;
        expect(response.headers).toHaveProperty('X-Request-Id');
      }
    }
  });

  it('points derived errors at the shared ApiError response', () => {
    const operation = publicOps.get('orgs.get') as Operation;
    expect(operation.responses['404']).toEqual({ $ref: '#/components/responses/Error404' });
    const document = generateOpenApi(ROUTES, 'public') as unknown as {
      components: {
        responses: Record<string, { content: unknown }>;
        schemas: Record<string, unknown>;
      };
    };
    expect(JSON.stringify(document.components.responses['Error404'])).toContain(
      '#/components/schemas/ApiError',
    );
    expect(document.components.schemas['ApiError']).toBeDefined();
  });

  it('maps principals to security requirements', () => {
    expect((publicOps.get('orgs.list') as Operation).security).toEqual([{ sessionCookie: [] }]);
    expect((publicOps.get('auth.signin') as Operation).security).toEqual([{}]);
    expect((internalOps.get('auth.session') as Operation).security).toEqual([
      { workloadToken: [] },
    ]);
    const document = generateOpenApi(ROUTES, 'public');
    expect(Object.keys(document.components.securitySchemes)).toEqual([
      'sessionCookie',
      'apiKeyBearer',
    ]);
  });

  it('leaves current routes undeprecated and marks secret responses', () => {
    expect((publicOps.get('orgs.list') as Operation).deprecated).toBeUndefined();
    expect((publicOps.get('apiKeys.create.org') as Operation)['x-secret-response']).toBe(true);
  });

  it('keeps no-content responses free of a body and text responses as text', () => {
    const signout = publicOps.get('auth.signout') as Operation;
    expect(signout.responses['204']?.content).toBeUndefined();
    const metrics = internalOps.get('metrics.get') as Operation;
    expect(JSON.stringify(metrics.responses['200'])).toContain('text/plain');
  });

  it('is deterministic and serialised with a trailing newline', () => {
    const first = serializeOpenApi(generateOpenApi(ROUTES, 'public'));
    expect(serializeOpenApi(generateOpenApi(ROUTES, 'public'))).toBe(first);
    expect(first.endsWith('}\n')).toBe(true);
    expect(first).toContain('\n  "openapi"');
  });

  it('generates a document for a single custom entry', () => {
    const route: RouteDef = {
      id: 'things.get',
      method: 'GET',
      pathTemplate: '/v1/things',
      app: 'api',
      principals: ['key'],
      action: null,
      query: z.object({ q: z.string() }),
      responses: { 200: z.object({ ok: z.boolean() }) },
      idempotency: 'none',
      exposure: 'public',
    };
    const document = generateOpenApi([route], 'public');
    const operation = document.paths['/v1/things']?.['get'] as unknown as Operation;
    expect(operation.security).toEqual([{ apiKeyBearer: [] }]);
    expect(operation.parameters).toEqual([
      { name: 'q', in: 'query', required: true, schema: { type: 'string' } },
    ]);
    expect(operation.responses['403']).toBeUndefined();
    expect(operation.responses['401']).toBeDefined();
  });

  it('contains no secrets, internal hostnames or token-looking example values', () => {
    for (const audience of ['public', 'internal'] as const) {
      const text = serializeOpenApi(generateOpenApi(ROUTES, audience));
      expect(text).not.toMatch(/bc_(live|test)_[a-z2-7]{16}_[a-z2-7]{52}/);
      expect(text).not.toMatch(/https?:\/\/[a-z0-9.-]*(\.internal|\.local|localhost)/i);
      expect(text).not.toMatch(/"(example|examples|default)":\s*"[^"]*(secret|token|password)/i);
      expect(text).not.toMatch(/eyJ[A-Za-z0-9_-]{10,}/);
    }
  });
});
