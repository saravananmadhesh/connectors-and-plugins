import { describe, expect, it } from 'vitest';
import {
  PROJECT_KEY_SCOPES,
  PROJECT_KEY_SCOPE_INFO,
  PROJECT_KEY_SCOPE_PRESET,
  PROJECT_SCOPE_AREAS,
  ProjectKeyScopeSchema,
} from './projects.js';
import { PROJECT_ROUTE_SCOPES, projectScopeOf } from './project-route-scopes.js';
import { ProjectUserListQuerySchema, PutProjectUserBodySchema } from './project-users.js';
import { ROUTES } from './routes.js';

const projectRoutes = ROUTES.filter((route) => route.principals.includes('project'));

/**
 * Scopes whose routes are not open yet. A scope may sit here only while it has no route; the
 * test below fails the moment one gains a route, so the entry has to be removed with it.
 */
const SCOPES_WITHOUT_ROUTES: readonly string[] = ['tools:read'];

describe('project route scopes', () => {
  it('give every project route a scope', () => {
    const missing = projectRoutes.filter((route) => projectScopeOf(route.id) === null);
    expect(missing.map((route) => route.id)).toEqual([]);
  });

  it('list only routes that exist, are served by the api and are marked for project keys', () => {
    const byId = new Map(ROUTES.map((route) => [route.id, route]));
    for (const id of Object.keys(PROJECT_ROUTE_SCOPES)) {
      const route = byId.get(id);
      expect(route).toBeDefined();
      expect(route?.app).toBe('api');
      expect(route?.principals).toEqual(['project']);
    }
  });

  it('give every scope a route, except the ones listed as not open yet', () => {
    const used = new Set(Object.values(PROJECT_ROUTE_SCOPES));
    const unused = PROJECT_KEY_SCOPES.filter((scope) => !used.has(scope));
    expect([...unused].sort()).toEqual([...SCOPES_WITHOUT_ROUTES].sort());
  });

  it('keep reading and changing apart', () => {
    const crossed = projectRoutes.filter((route) => {
      const scope = projectScopeOf(route.id)!;
      const writes = scope.endsWith(':write');
      return route.method === 'GET' ? writes : !writes;
    });
    expect(crossed.map((route) => route.id)).toEqual([]);
  });

  it('give every route that changes something a read of the same resource', () => {
    const rootOf = (route: { pathTemplate: string }) =>
      route.pathTemplate.replace('/v1/project', '').split('/')[1] ?? '';
    const readable = new Set(
      projectRoutes.filter((route) => route.method === 'GET').map((route) => rootOf(route)),
    );
    const blind = projectRoutes.filter(
      (route) => route.method !== 'GET' && !readable.has(rootOf(route)),
    );
    expect(blind.map((route) => route.id)).toEqual([]);
  });

  it('keep the console and website routes closed to project keys', () => {
    for (const route of ROUTES.filter((entry) => entry.principals.includes('session'))) {
      expect(route.principals).not.toContain('project');
      expect(projectScopeOf(route.id)).toBeNull();
    }
  });

  it('answer null for an id that is not a table entry, including inherited object names', () => {
    expect(projectScopeOf('nope')).toBeNull();
    expect(projectScopeOf('toString')).toBeNull();
    expect(projectScopeOf('__proto__')).toBeNull();
  });
});

describe('project key scopes', () => {
  it('name an area and a level, and never repeat the path', () => {
    for (const scope of PROJECT_KEY_SCOPES) {
      const [area, level] = scope.split(':');
      expect(PROJECT_SCOPE_AREAS).toContain(area);
      expect(['read', 'write']).toContain(level);
    }
  });

  it('keep execute for session tokens and have no users or logs area', () => {
    expect(PROJECT_KEY_SCOPES.some((scope) => scope.startsWith('execute:'))).toBe(false);
    expect(PROJECT_KEY_SCOPES.some((scope) => /^(users|logs):/.test(scope))).toBe(false);
    expect(ProjectKeyScopeSchema.safeParse('execute:write').success).toBe(false);
    expect(ProjectKeyScopeSchema.safeParse('users:read').success).toBe(false);
  });

  it('describe every scope once and build the preset from the table', () => {
    expect(Object.keys(PROJECT_KEY_SCOPE_INFO).sort()).toEqual([...PROJECT_KEY_SCOPES].sort());
    expect([...PROJECT_KEY_SCOPE_PRESET].sort()).toEqual([
      'connections:read',
      'connections:write',
      'observability:read',
      'plugins:read',
      'sessions:read',
      'sessions:write',
      'tools:read',
    ]);
  });
});

describe('project user routes', () => {
  it('put no user id in a project route path and give the host no user delete', () => {
    for (const route of projectRoutes) {
      expect(route.pathTemplate).not.toMatch(/\{[^}]*[uU]ser[^}]*\}/);
    }
    expect(ROUTES.some((route) => route.id === 'projectUsers.delete')).toBe(false);
    expect(ROUTES.some((route) => route.id === 'projectUsers.get')).toBe(false);
  });

  it('let the console, not the host, delete a user', () => {
    const route = ROUTES.find((entry) => entry.id === 'projectUsersConsole.delete');
    expect(route?.method).toBe('DELETE');
    expect(route?.principals).not.toContain('project');
  });

  it('match a user by the host id exactly, as a query field', () => {
    expect(ProjectUserListQuerySchema.safeParse({ userId: 'a' }).success).toBe(true);
    expect(ProjectUserListQuerySchema.safeParse({ userId: '' }).success).toBe(false);
    expect(ProjectUserListQuerySchema.safeParse({ userId: 'a\nb' }).success).toBe(false);
  });
});

describe('project user body', () => {
  const parse = (body: unknown) => PutProjectUserBodySchema.safeParse(body).success;

  it('accepts an id of 1 to 255 characters in any script and keeps it as sent', () => {
    expect(parse({ userId: 'a' })).toBe(true);
    expect(parse({ userId: 'A'.repeat(255) })).toBe(true);
    expect(parse({ userId: 'user@example.com' })).toBe(true);
    expect(parse({ userId: 'ユーザー 1' })).toBe(true);
    expect(PutProjectUserBodySchema.parse({ userId: ' Spaced ' }).userId).toBe(' Spaced ');
  });

  it('refuses an empty id, one of 256 characters, control characters and unknown fields', () => {
    expect(parse({ userId: '' })).toBe(false);
    expect(parse({ userId: 'A'.repeat(256) })).toBe(false);
    expect(parse({ userId: 'a\nb' })).toBe(false);
    expect(parse({ userId: 'a\u0000b' })).toBe(false);
    expect(parse({ userId: 'a\u007fb' })).toBe(false);
    expect(parse({ userId: 'a', role: 'admin' })).toBe(false);
    expect(parse({})).toBe(false);
  });

  it('limits the display name to 80 characters and trims it', () => {
    expect(
      PutProjectUserBodySchema.parse({ userId: 'a', displayName: '  Ada  ' }).displayName,
    ).toBe('Ada');
    expect(parse({ userId: 'a', displayName: 'x'.repeat(81) })).toBe(false);
    expect(parse({ userId: 'a', displayName: '   ' })).toBe(false);
  });
});
