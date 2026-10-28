import { describe, expect, it } from 'vitest';
import type { Executor } from '@boldcreate-integrations/db';
import { KEY_PRESET_PERMISSIONS } from '@boldcreate-integrations/contracts';
import { projectUserPrincipal, userPluginState } from './user-plugin-state.js';
import type { ProjectCaller } from './project-plugins.js';

const caller = {
  actor: { kind: 'project_key', id: 'key-1' },
  organizationId: 'org-1',
  projectId: 'prj-1',
} as unknown as ProjectCaller;

describe('projectUserPrincipal', () => {
  it('serves a project user as the keys of that user are served', () => {
    const principal = projectUserPrincipal(caller, 'user-1');
    expect(principal).toMatchObject({
      kind: 'api_key',
      keyId: 'key-1',
      orgId: 'org-1',
      scope: 'user',
      userId: 'user-1',
      projectId: 'prj-1',
      preset: 'agent',
    });
    expect(principal.permissions).toEqual([...KEY_PRESET_PERMISSIONS.agent]);
    expect(principal.plugins).toBeUndefined();
  });
});

describe('userPluginState', () => {
  it('refuses a cursor that is not a plugin id before reading anything', async () => {
    const never = {} as Executor;
    await expect(
      userPluginState(
        never,
        projectUserPrincipal(caller, 'user-1'),
        { limit: 10, cursor: Buffer.from('nope').toString('base64url') },
        { connections: false },
      ),
    ).rejects.toMatchObject({ code: 'validation_failed' });
  });
});
