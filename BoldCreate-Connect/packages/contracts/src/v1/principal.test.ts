import { describe, expect, it } from 'vitest';
import {
  ADMIN_ACTIONS,
  ActionSchema,
  CUSTOMER_ACTIONS,
  KEY_PRESET_PERMISSIONS,
  KeyPresetSchema,
  PrincipalSchema,
  WORKLOAD_ACTIONS,
} from './principal.js';
import { KeyPermissionSchema } from './scope.js';

describe('principal', () => {
  it('parses each kind', () => {
    const cases = [
      { kind: 'user_session', userId: 'u', sessionId: 's' },
      {
        kind: 'user_session',
        userId: 'u',
        sessionId: 's',
        orgId: 'o',
        orgRole: 'ADMIN',
        orgStatus: 'active',
      },
      {
        kind: 'api_key',
        keyId: 'k',
        orgId: 'o',
        scope: 'user',
        userId: 'u',
        projectId: 'p',
        preset: 'agent',
        permissions: ['mcp:list'],
      },
      { kind: 'workload', callerId: 'gateway' },
      { kind: 'platform_admin', subject: 'admin' },
    ];
    for (const value of cases) expect(PrincipalSchema.safeParse(value).success).toBe(true);
  });

  it('rejects an unknown kind, a bad role and an unknown permission', () => {
    expect(PrincipalSchema.safeParse({ kind: 'anonymous' }).success).toBe(false);
    expect(
      PrincipalSchema.safeParse({
        kind: 'user_session',
        userId: 'u',
        sessionId: 's',
        orgRole: 'ROOT',
      }).success,
    ).toBe(false);
    expect(
      PrincipalSchema.safeParse({
        kind: 'api_key',
        keyId: 'k',
        orgId: 'o',
        scope: 'org',
        preset: 'agent',
        permissions: ['mcp:destroy'],
      }).success,
    ).toBe(false);
  });

  it('has presets made of known key permissions', () => {
    expect(KeyPresetSchema.options).toEqual(['agent', 'read_only']);
    for (const preset of KeyPresetSchema.options) {
      for (const permission of KEY_PRESET_PERMISSIONS[preset]) {
        expect(KeyPermissionSchema.safeParse(permission).success).toBe(true);
      }
    }
  });

  it('lists every action once, in the noun:verb form', () => {
    const all = [...CUSTOMER_ACTIONS, ...ADMIN_ACTIONS, ...WORKLOAD_ACTIONS];
    expect(new Set(all).size).toBe(all.length);
    expect(ActionSchema.options).toHaveLength(all.length);
    for (const action of all) expect(action).toMatch(/^[a-z][a-z-]*(:[a-z][a-z-]*)+$/);
  });
});
