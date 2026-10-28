import { describe, expect, it } from 'vitest';
import {
  ActionSchema,
  KEY_PRESET_PERMISSIONS,
  type Action,
  type ApiKeyPrincipal,
  type OrgRole,
  type Principal,
  type ScopeKind,
  type UserSessionPrincipal,
} from '@boldcreate-integrations/contracts';
import {
  PermissionDeniedError,
  allowedActions,
  assertAllowed,
  authorize,
  authorizeWith,
  requireAction,
  type Decision,
  type Resource,
} from './authorize.js';
import { ACTIONS, isSessionOnly, type Matrix } from './matrix.js';
import {
  ANY_SCOPE_READ,
  ANY_SCOPE_WRITE,
  EXPECTED_ACTIONS,
  KEY_PERMISSION,
  ORG_ADMIN_ONLY,
  ORG_READ,
  ORG_WRITE,
  SESSION_ONLY,
  VIEWER_HIDDEN,
  VIEWER_HIDDEN_FOR_YOU,
  expectedForSession,
  type Expected,
  type SessionCase,
} from './matrix.expected.js';

const ORG = 'org-a';
const OTHER_ORG = 'org-b';
const ME = 'user-me';
const SOMEONE = 'user-other';

const ALL_ACTIONS = ActionSchema.options as readonly Action[];

function session(orgRole: SessionCase['orgRole']) {
  const principal: UserSessionPrincipal = { kind: 'user_session', userId: ME, sessionId: 's1' };
  if (orgRole === 'none') return { ...principal, orgId: ORG };
  return {
    ...principal,
    orgId: ORG,
    orgRole: orgRole === 'suspended' ? ('MEMBER' as OrgRole) : orgRole,
    orgStatus: orgRole === 'suspended' ? ('suspended' as const) : ('active' as const),
  };
}

function resource(c: SessionCase): Resource {
  const orgId = c.sameOrg ? ORG : OTHER_ORG;
  if (c.scope === 'user') {
    return { orgId, scope: 'user', ownerUserId: c.self ? ME : SOMEONE };
  }
  if (c.scope === 'project') return { orgId, scope: 'project' };
  return { orgId, scope: 'org' };
}

function label(decision: Decision): Expected {
  return decision.allowed ? 'allowed' : (decision.reason as Expected);
}

const ORG_ROLES: SessionCase['orgRole'][] = ['ADMIN', 'MEMBER', 'VIEWER', 'none', 'suspended'];
const SCOPES: ScopeKind[] = ['org', 'user', 'project'];

describe('authorize against the expected table', () => {
  it('knows every action exactly once', () => {
    expect([...EXPECTED_ACTIONS].sort()).toEqual([...ALL_ACTIONS].sort());
    expect(new Set(EXPECTED_ACTIONS).size).toBe(EXPECTED_ACTIONS.length);
    expect(Object.keys(ACTIONS).sort()).toEqual([...ALL_ACTIONS].sort());
  });

  it('answers every action for every role, scope and relation as the table says', () => {
    let checked = 0;
    for (const action of ALL_ACTIONS) {
      for (const orgRole of ORG_ROLES) {
        for (const scope of SCOPES) {
          for (const sameOrg of [true, false]) {
            for (const self of scope === 'user' ? [true, false] : [true]) {
              const c: SessionCase = { orgRole, sameOrg, scope, self };
              const actual = label(authorize(session(orgRole), action, resource(c)));
              const expected = expectedForSession(action, c);
              if (actual !== expected) {
                throw new Error(`${action} ${JSON.stringify(c)}: ${actual}, expected ${expected}`);
              }
              checked += 1;
            }
          }
        }
      }
    }
    expect(checked).toBeGreaterThan(3000);
  });
});

describe('authorize invariants', () => {
  it('denies an action it does not know', () => {
    const decision = authorize(session('ADMIN'), 'org:explode' as Action, { orgId: ORG });
    expect(decision).toEqual({ allowed: false, reason: 'forbidden' });
  });

  it('never lets a viewer write, own or administer', () => {
    const everything = [...ANY_SCOPE_WRITE, ...ORG_WRITE, ...ORG_ADMIN_ONLY];
    for (const scope of SCOPES) {
      for (const action of everything as Action[]) {
        const decision = authorize(session('VIEWER'), action, {
          orgId: ORG,
          scope,
          ownerUserId: ME,
        });
        expect(decision.allowed).toBe(false);
      }
    }
  });

  it('hides every For You action and every secret from a viewer at organization scope', () => {
    for (const action of [...VIEWER_HIDDEN_FOR_YOU, ...VIEWER_HIDDEN] as Action[]) {
      expect(authorize(session('VIEWER'), action, { orgId: ORG, scope: 'org' })).toEqual({
        allowed: false,
        reason: 'not_found',
      });
    }
  });

  it('lets a member and an admin write at project scope and a viewer only read', () => {
    const project = { orgId: ORG, scope: 'project' as const };
    for (const action of ANY_SCOPE_WRITE as readonly Action[]) {
      expect(authorize(session('VIEWER'), action, project).allowed).toBe(false);
      expect(authorize(session('MEMBER'), action, project).allowed).toBe(true);
      expect(authorize(session('ADMIN'), action, project).allowed).toBe(true);
    }
  });

  it('gives a viewer read only access to Platform and none to the secrets in it', () => {
    const viewer = session('VIEWER');
    const project = { orgId: ORG, scope: 'project' as const };
    for (const action of ['installation:list', 'mcp-server:list', 'sync-status:read'] as Action[]) {
      expect(authorize(viewer, action, project).allowed).toBe(true);
    }
    for (const action of [
      'project:read',
      'project-plugin:read',
      'project-session:read',
      'project-connection:read',
      'org:read',
    ] as Action[]) {
      expect(authorize(viewer, action, { orgId: ORG }).allowed).toBe(true);
    }
    for (const action of ['variable:read', 'oauth-client:read'] as Action[]) {
      expect(authorize(viewer, action, project)).toEqual({ allowed: false, reason: 'not_found' });
    }
    expect(authorize(viewer, 'project-key:read', { orgId: ORG })).toEqual({
      allowed: false,
      reason: 'not_found',
    });
  });

  it('lets a member manage For You at user and org scope and read the same data', () => {
    const member = session('MEMBER');
    const mine: Resource = { orgId: ORG, scope: 'user', ownerUserId: ME };
    for (const action of ['installation:create', 'mcp-server:update', 'api-key:create']) {
      expect(authorize(member, action as Action, mine).allowed).toBe(true);
      expect(authorize(member, action as Action, { orgId: ORG, scope: 'org' }).allowed).toBe(true);
    }
    for (const action of [...ORG_READ, ...ANY_SCOPE_READ] as Action[]) {
      expect(authorize(member, action, { orgId: ORG, scope: 'org' }).allowed).toBe(true);
    }
  });

  it('keeps invites, member changes and deleting the organization to an admin', () => {
    for (const action of ORG_ADMIN_ONLY as readonly Action[]) {
      expect(authorize(session('ADMIN'), action, { orgId: ORG }).allowed).toBe(true);
      for (const role of ['MEMBER', 'VIEWER'] as const) {
        expect(authorize(session(role), action, { orgId: ORG })).toEqual({
          allowed: false,
          reason: 'forbidden',
        });
      }
    }
  });

  it('lets a member edit the organization and its policy but not invite', () => {
    const member = session('MEMBER');
    for (const action of ['org:update', 'org-policy:update', 'org-policy:read'] as Action[]) {
      expect(authorize(member, action, { orgId: ORG }).allowed).toBe(true);
    }
    expect(authorize(member, 'invite:create', { orgId: ORG }).allowed).toBe(false);
    expect(authorize(member, 'member:update', { orgId: ORG }).allowed).toBe(false);
    expect(authorize(member, 'org:delete', { orgId: ORG }).allowed).toBe(false);
  });

  it('checks visibility before rights: another org is not_found even for an owner-only action', () => {
    const decision = authorize(session('MEMBER'), 'org:delete', { orgId: OTHER_ORG });
    expect(decision).toEqual({ allowed: false, reason: 'not_found' });
    const own = authorize(session('MEMBER'), 'org:delete', { orgId: ORG });
    expect(own).toEqual({ allowed: false, reason: 'forbidden' });
  });

  it('answers a missing organization as not_found', () => {
    expect(authorize(session('ADMIN'), 'org:read', {})).toEqual({
      allowed: false,
      reason: 'not_found',
    });
  });

  it('uses the first scope of the action when the resource names none', () => {
    expect(authorize(session('ADMIN'), 'org:update', { orgId: ORG }).allowed).toBe(true);
  });

  it('lets any signed-in user take the actions that need no organization', () => {
    for (const action of SESSION_ONLY) {
      expect(
        authorize({ kind: 'user_session', userId: ME, sessionId: 's' }, action, {}).allowed,
      ).toBe(true);
    }
  });
});

describe('authorize for the other principals', () => {
  const key = (permissions: ApiKeyPrincipal['permissions'], orgId = ORG): ApiKeyPrincipal => ({
    kind: 'api_key',
    keyId: 'key-1',
    orgId,
    scope: 'org',
    preset: 'agent',
    permissions,
  });
  const admin: Principal = { kind: 'platform_admin', subject: 'admin-1' };
  const workload: Principal = { kind: 'workload', callerId: 'gateway' };

  it('gives presets the permissions the plan names', () => {
    expect(KEY_PRESET_PERMISSIONS.agent).toEqual([
      'mcp:list',
      'mcp:call',
      'artifact:sync',
      'artifact:download',
    ]);
    expect(KEY_PRESET_PERMISSIONS.read_only).toEqual(['mcp:list', 'artifact:sync']);
  });

  it('denies an api key every website-only action with session_required', () => {
    const full = key([...KEY_PRESET_PERMISSIONS.agent]);
    for (const action of ALL_ACTIONS.filter((a) => isSessionOnly(ACTIONS, a))) {
      expect(authorize(full, action, { orgId: ORG, scope: 'org' })).toEqual({
        allowed: false,
        reason: 'session_required',
      });
    }
  });

  it('lets an api key take the actions its permissions list', () => {
    const readOnly = key([...KEY_PRESET_PERMISSIONS.read_only]);
    expect(authorize(readOnly, 'mcp:list', { orgId: ORG }).allowed).toBe(true);
    expect(authorize(readOnly, 'artifact:sync', { orgId: ORG }).allowed).toBe(true);
    expect(authorize(readOnly, 'mcp:call', { orgId: ORG })).toEqual({
      allowed: false,
      reason: 'forbidden',
    });
    expect(authorize(readOnly, 'artifact:download', { orgId: ORG }).allowed).toBe(false);
  });

  it('answers a key of another org as not_found', () => {
    expect(authorize(key(['mcp:call'], OTHER_ORG), 'mcp:call', { orgId: ORG })).toEqual({
      allowed: false,
      reason: 'not_found',
    });
  });

  it('denies key actions to sessions, admins and workloads', () => {
    for (const action of KEY_PERMISSION) {
      for (const principal of [session('ADMIN'), admin, workload]) {
        expect(authorize(principal, action, { orgId: ORG }).allowed).toBe(false);
      }
    }
  });

  it('allows admin actions to platform admins only', () => {
    const adminActions = ALL_ACTIONS.filter((a) => a.startsWith('admin:'));
    expect(adminActions.length).toBeGreaterThan(0);
    for (const action of adminActions) {
      expect(authorize(admin, action, {}).allowed).toBe(true);
      expect(authorize(session('ADMIN'), action, { orgId: ORG }).allowed).toBe(false);
      expect(authorize(workload, action, {}).allowed).toBe(false);
      expect(authorize(key(['mcp:list']), action, { orgId: ORG }).allowed).toBe(false);
    }
  });

  it('denies a platform admin every customer action', () => {
    for (const action of ALL_ACTIONS.filter((a) => isSessionOnly(ACTIONS, a))) {
      expect(authorize(admin, action, { orgId: ORG, scope: 'org' }).allowed).toBe(false);
    }
  });

  it('allows workload actions to workloads only', () => {
    for (const action of ALL_ACTIONS.filter((a) => a.startsWith('workload:'))) {
      expect(authorize(workload, action, {}).allowed).toBe(true);
      expect(authorize(admin, action, {}).allowed).toBe(false);
      expect(authorize(session('ADMIN'), action, { orgId: ORG }).allowed).toBe(false);
    }
  });
});

describe('organization policy at user scope', () => {
  const mine: Resource = { orgId: ORG, scope: 'user', ownerUserId: ME };
  const closed = { allowPersonalInstalls: false, allowPersonalApiKeys: false };
  const open = { allowPersonalInstalls: true, allowPersonalApiKeys: true };

  it('denies personal installs and keys when the policy is off', () => {
    const owner = session('ADMIN');
    expect(authorize(owner, 'installation:create', { ...mine, policy: closed })).toEqual({
      allowed: false,
      reason: 'policy',
      policy: 'personal_installs',
    });
    expect(authorize(owner, 'api-key:create', { ...mine, policy: closed })).toEqual({
      allowed: false,
      reason: 'policy',
      policy: 'personal_api_keys',
    });
  });

  it('allows them when the policy is on or not given', () => {
    const member = session('MEMBER');
    expect(authorize(member, 'installation:create', { ...mine, policy: open }).allowed).toBe(true);
    expect(authorize(member, 'installation:create', mine).allowed).toBe(true);
  });

  it('leaves reads and other writes alone when the policy is off', () => {
    const member = session('MEMBER');
    expect(authorize(member, 'installation:list', { ...mine, policy: closed }).allowed).toBe(true);
    expect(authorize(member, 'installation:delete', { ...mine, policy: closed }).allowed).toBe(
      true,
    );
  });

  it('does not apply the policy at org scope', () => {
    expect(
      authorize(session('ADMIN'), 'installation:create', {
        orgId: ORG,
        scope: 'org',
        policy: closed,
      }).allowed,
    ).toBe(true);
  });
});

describe('assertAllowed and requireAction', () => {
  const member = session('MEMBER');
  const viewer = session('VIEWER');

  it('returns for an allowed decision', () => {
    expect(() => requireAction(member, 'org:read', { orgId: ORG })).not.toThrow();
  });

  it.each([
    ['org:read', { orgId: OTHER_ORG }, 'not_found'],
    ['org:update', { orgId: ORG }, 'forbidden'],
  ] as const)('throws the code of %s for %j', (action, res, code) => {
    const attempt = () => requireAction(viewer, action, res);
    expect(attempt).toThrow(PermissionDeniedError);
    expect(attempt).toThrow(
      expect.objectContaining({ code, action, reason: code, orgId: res.orgId }),
    );
  });

  it('maps the policy reasons to their own codes', () => {
    const closed = { allowPersonalInstalls: false, allowPersonalApiKeys: false };
    const mine: Resource = { orgId: ORG, scope: 'user', ownerUserId: ME, policy: closed };
    expect(() => requireAction(member, 'installation:create', mine)).toThrow(
      expect.objectContaining({ code: 'personal_installs_disabled', reason: 'policy' }),
    );
    expect(() => requireAction(member, 'api-key:create', mine)).toThrow(
      expect.objectContaining({ code: 'personal_api_keys_disabled', reason: 'policy' }),
    );
  });

  it('maps session_required for an api key', () => {
    const key: Principal = {
      kind: 'api_key',
      keyId: 'k',
      orgId: ORG,
      scope: 'org',
      preset: 'agent',
      permissions: ['mcp:list'],
    };
    expect(() => requireAction(key, 'org:read', { orgId: ORG })).toThrow(
      expect.objectContaining({ code: 'session_required' }),
    );
  });

  it('turns a plain decision into the same error', () => {
    expect(() =>
      assertAllowed({ allowed: false, reason: 'forbidden' }, 'org:update', { orgId: ORG }),
    ).toThrow(expect.objectContaining({ code: 'forbidden' }));
    expect(() => assertAllowed({ allowed: true }, 'org:update', { orgId: ORG })).not.toThrow();
  });
});

describe('allowedActions', () => {
  it('lists what an admin may do at org scope and nothing a platform admin may do', () => {
    const list = allowedActions(session('ADMIN'), { orgId: ORG, scope: 'org' });
    expect(list).toContain('org:delete');
    expect(list).toContain('invite:create');
    expect(list).not.toContain('invite:accept');
    expect(list).not.toContain('mcp:call');
    expect(list.some((action) => action.startsWith('admin:'))).toBe(false);
  });

  it('gives a member the organization settings but not invites or deleting the organization', () => {
    const list = allowedActions(session('MEMBER'), { orgId: ORG, scope: 'org' });
    expect(list).toContain('org:read');
    expect(list).toContain('org:update');
    expect(list).not.toContain('org:delete');
    expect(list).not.toContain('invite:create');
    expect(list).not.toContain('member:update');
  });

  it('lists a viewer only the Platform reads', () => {
    const list = allowedActions(session('VIEWER'), { orgId: ORG, scope: 'org' });
    expect(list).toEqual(
      expect.arrayContaining(['org:read', 'project:read', 'project-plugin:read', 'member:leave']),
    );
    for (const action of [...VIEWER_HIDDEN, ...VIEWER_HIDDEN_FOR_YOU, ...ORG_WRITE]) {
      expect(list).not.toContain(action);
    }
    const project = allowedActions(session('VIEWER'), { orgId: ORG, scope: 'project' });
    expect(project).toContain('installation:list');
    expect(project).not.toContain('installation:create');
    expect(project).not.toContain('variable:read');
  });

  it('lists nothing for a stranger', () => {
    expect(allowedActions(session('none'), { orgId: ORG, scope: 'org' })).toEqual([]);
  });
});

describe('adding a role is one matrix entry', () => {
  it('lets a matrix with another class for an action decide differently', () => {
    const stricter: Matrix = {
      ...ACTIONS,
      'member:list': { scopes: ['org'], class: 'org_admin', viewer: 'default' },
    };
    const strict = authorizeWith(stricter);
    const member = session('MEMBER');
    expect(authorize(member, 'member:list', { orgId: ORG }).allowed).toBe(true);
    expect(strict(member, 'member:list', { orgId: ORG })).toEqual({
      allowed: false,
      reason: 'forbidden',
    });
    expect(strict(session('ADMIN'), 'member:list', { orgId: ORG }).allowed).toBe(true);
  });

  it('denies an action a custom matrix does not describe', () => {
    const partial = { ...ACTIONS } as Partial<Matrix>;
    delete partial['org:read'];
    expect(authorizeWith(partial as Matrix)(session('ADMIN'), 'org:read', { orgId: ORG })).toEqual({
      allowed: false,
      reason: 'forbidden',
    });
  });
});
