import { describe, expect, it } from 'vitest';
import { formatId, parseId } from './ids.js';
import {
  ConnectionListQuerySchema,
  ConnectionResponseSchema,
  SessionConnectionListQuerySchema,
  StartProjectConnectionBodySchema,
  StartSessionConnectionBodySchema,
} from './project-connections.js';
import { projectScopeOf } from './project-route-scopes.js';
import { ROUTES } from './routes.js';

const UUID = '3f2b8c1e-6d4a-4b7e-9a10-5c8e2d7f4a61';
const COMPONENT = formatId('cmp', UUID);
const CALLBACK = 'https://app.example.test/settings';

describe('starting a connection', () => {
  it('decodes the component id and keeps the address as sent', () => {
    const parsed = StartSessionConnectionBodySchema.parse({
      componentId: COMPONENT,
      callbackUrl: CALLBACK,
    });
    expect(parsed).toEqual({ componentId: UUID, callbackUrl: CALLBACK });
    expect(parseId('cmp', COMPONENT)).toBe(UUID);
  });

  it.each([
    ['no component', { callbackUrl: CALLBACK }],
    ['no address', { componentId: COMPONENT }],
    ['an empty address', { componentId: COMPONENT, callbackUrl: '' }],
    [
      'a very long address',
      { componentId: COMPONENT, callbackUrl: `https://a.test/${'a'.repeat(2048)}` },
    ],
    ['a component of another kind', { componentId: formatId('plg', UUID), callbackUrl: CALLBACK }],
    ['a bare uuid', { componentId: UUID, callbackUrl: CALLBACK }],
    ['an unknown field', { componentId: COMPONENT, callbackUrl: CALLBACK, userId: 'u' }],
  ])('refuses %s for a session', (_name, body) => {
    expect(StartSessionConnectionBodySchema.safeParse(body).success).toBe(false);
  });

  it('asks the host for the user and applies the rules of a host user id', () => {
    const ok = { userId: 'a/b@c', componentId: COMPONENT, callbackUrl: CALLBACK };
    expect(StartProjectConnectionBodySchema.safeParse(ok).success).toBe(true);
    expect(StartProjectConnectionBodySchema.safeParse({ ...ok, userId: '' }).success).toBe(false);
    expect(StartProjectConnectionBodySchema.safeParse({ ...ok, userId: 'a\nb' }).success).toBe(
      false,
    );
    expect(
      StartProjectConnectionBodySchema.safeParse({ ...ok, userId: 'x'.repeat(256) }).success,
    ).toBe(false);
    const { userId: _userId, ...without } = ok;
    expect(StartProjectConnectionBodySchema.safeParse(without).success).toBe(false);
  });
});

describe('listing connections', () => {
  it('defaults the page size and bounds it', () => {
    expect(ConnectionListQuerySchema.parse({}).limit).toBe(25);
    expect(ConnectionListQuerySchema.safeParse({ limit: '0' }).success).toBe(false);
    expect(ConnectionListQuerySchema.safeParse({ limit: '101' }).success).toBe(false);
    expect(ConnectionListQuerySchema.parse({ limit: '100' }).limit).toBe(100);
  });

  it('matches the user by the host id and decodes the component filter', () => {
    const parsed = ConnectionListQuerySchema.parse({ userId: 'u-1', componentId: COMPONENT });
    expect(parsed).toMatchObject({ userId: 'u-1', componentId: UUID });
    expect(ConnectionListQuerySchema.safeParse({ userId: '' }).success).toBe(false);
    expect(ConnectionListQuerySchema.safeParse({ userId: 'a\u0000b' }).success).toBe(false);
    expect(ConnectionListQuerySchema.safeParse({ unknown: '1' }).success).toBe(false);
  });

  it('lets a session list only by page, never by user', () => {
    expect(SessionConnectionListQuerySchema.safeParse({ limit: '5' }).success).toBe(true);
    expect(SessionConnectionListQuerySchema.safeParse({ userId: 'u' }).success).toBe(false);
  });
});

describe('a connection on the wire', () => {
  it('never carries tokens and accepts only the two states', () => {
    const base = {
      id: formatId('ucn', UUID),
      userId: 'u-1',
      componentId: COMPONENT,
      serverName: 'files',
      authConfigId: null,
      kind: 'oauth',
      valueNames: [],
      status: 'active',
      expiresAt: null,
      createdAt: new Date().toISOString(),
    };
    expect(ConnectionResponseSchema.safeParse(base).success).toBe(true);
    expect(ConnectionResponseSchema.safeParse({ ...base, status: 'revoked' }).success).toBe(false);
    const parsed = ConnectionResponseSchema.parse({ ...base, accessSealed: 'secret' });
    expect(parsed).not.toHaveProperty('accessSealed');
  });
});

describe('the connection routes', () => {
  const byId = (id: string) => ROUTES.find((route) => route.id === id);

  it('give the host three routes that only a project key reaches, each with a scope', () => {
    for (const [id, scope] of [
      ['projectConnections.start', 'connections:write'],
      ['projectConnections.list', 'connections:read'],
      ['projectConnections.delete', 'connections:write'],
    ] as const) {
      expect(byId(id)?.principals).toEqual(['project']);
      expect(projectScopeOf(id)).toBe(scope);
    }
  });

  it('give a session two routes that need the call permission and no project key', () => {
    for (const id of ['sessionConnections.start', 'sessionConnections.list']) {
      const route = byId(id);
      expect(route?.principals).toEqual(['key']);
      expect(route?.action).toBe('mcp:call');
      expect(projectScopeOf(id)).toBeNull();
    }
  });

  it('give the console a read and a delete, each with its own action', () => {
    expect(byId('projectConnectionsConsole.list')?.action).toBe('project-connection:read');
    expect(byId('projectConnectionsConsole.delete')?.action).toBe('project-connection:write');
    expect(projectScopeOf('projectConnectionsConsole.list')).toBeNull();
  });

  it('keep the user id out of every connection path', () => {
    for (const route of ROUTES.filter((entry) => entry.id.includes('onnections'))) {
      expect(route.pathTemplate).not.toMatch(/\{[^}]*[uU]ser[^}]*\}/);
    }
  });
});
