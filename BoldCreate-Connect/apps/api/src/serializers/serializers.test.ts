import { describe, it, expect } from 'vitest';
import { randomUUID } from 'node:crypto';
import { formatId } from '@boldcreate-integrations/contracts';
import {
  serializeApiKey,
  serializeApiKeyCreated,
  serializeInstallation,
  serializeInstallationComponent,
  serializeInvite,
  serializeList,
  serializeMe,
  serializeMember,
  serializeOrg,
  serializeOrgMe,
  serializePage,
  serializePlugin,
  serializePluginListItem,
  serializePluginPage,
  serializePluginDetail,
  serializePluginVersion,
  serializePluginVersionDetail,
  serializePluginVersionReview,
  serializeUpgradeResult,
  serializeUser,
  serializeVariable,
} from './serializers.js';

const now = '2026-10-10T00:00:00.000Z';
const uuid = () => randomUUID();

/** Every string that looks like a uuid (with dashes) anywhere in the value. */
function rawUuids(value: unknown): string[] {
  const found: string[] = [];
  const walk = (v: unknown) => {
    if (typeof v === 'string') {
      if (/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(v)) found.push(v);
    } else if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(value);
  return found;
}

/** Every value stored under a key named `id` or ending in `Id`. */
function idValues(value: unknown): string[] {
  const found: string[] = [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') {
      for (const [key, child] of Object.entries(v)) {
        if ((key === 'id' || key.endsWith('Id')) && typeof child === 'string') found.push(child);
        walk(child);
      }
    }
  };
  walk(value);
  return found;
}

const PREFIXED = /^(?:usr|org|inv|ses|plg|pv|cmp|ins|con|key)_[0-9a-f]{32}$/;

function expectPrefixed(output: unknown) {
  expect(rawUuids(output)).toEqual([]);
  const ids = idValues(output);
  expect(ids.length).toBeGreaterThan(0);
  for (const id of ids) expect(id).toMatch(PREFIXED);
}

describe('serializers', () => {
  it('serializes users and the caller profile without internal columns', () => {
    const user = {
      id: uuid(),
      email: 'a@example.com',
      displayName: 'A',
      emailVerifiedAt: now,
      status: 'active' as const,
      createdAt: now,
      passwordHash: 'secret',
    };
    const out = serializeUser(user);
    expectPrefixed(out);
    expect(out).not.toHaveProperty('passwordHash');
    const me = serializeMe({
      user,
      memberships: [
        {
          organizationId: uuid(),
          organizationName: 'O',
          organizationSlug: 'o',
          role: 'ADMIN',
          status: 'active',
        },
      ],
    });
    expectPrefixed(me);
  });

  it('serializes organizations, members and invites', () => {
    expectPrefixed(
      serializeOrg({ id: uuid(), name: 'Org', slug: 'org', createdAt: now, updatedAt: now }),
    );
    expectPrefixed(
      serializeOrgMe({
        userId: uuid(),
        role: 'ADMIN',
        abilities: [],
        policy: {
          allowPersonalInstalls: true,
          allowPersonalApiKeys: true,
          allowedKeyPresets: ['agent', 'read_only'],
          maxPersonalKeyExpiryDays: null,
          updatedAt: null,
        },
      }),
    );
    expectPrefixed(
      serializeMember({
        userId: uuid(),
        displayName: 'A',
        email: 'a@e.com',
        role: 'MEMBER',
        status: 'active',
        createdAt: now,
      }),
    );
    expectPrefixed(
      serializeInvite({
        id: uuid(),
        organizationId: uuid(),
        email: 'a@e.com',
        role: 'MEMBER',
        expiresAt: now,
        createdAt: now,
      }),
    );
  });

  it('serializes plugins, versions and components', () => {
    const plugin = {
      id: uuid(),
      name: 'p',
      displayName: 'P',
      summary: 's',
      keywords: [],
      status: 'active' as const,
      visibility: 'public' as const,
      publisherOrganizationId: uuid(),
      featured: true,
      verified: false,
      categories: [{ slug: 'tools', name: 'Tools' }],
      logoUrl: 'https://raw.githubusercontent.com/o/r/abc/logo.png',
      updatedAt: now,
    };
    expectPrefixed(serializePlugin(plugin));
    expect(serializePlugin(plugin)).toMatchObject({
      featured: true,
      verified: false,
      categories: [{ slug: 'tools', name: 'Tools' }],
      logoUrl: 'https://raw.githubusercontent.com/o/r/abc/logo.png',
    });
    expect(serializePlugin({ ...plugin, logoUrl: null }).logoUrl).toBeNull();
    expect(
      serializePlugin({ ...plugin, publisherOrganizationId: null }).publisherOrganizationId,
    ).toBeNull();
    const counts = { agent: 1, skill: 2, mcp: 0, hook: 0, rule: 3 };
    const versionId = uuid();
    const item = serializePluginListItem({
      ...plugin,
      latestVersion: { id: versionId, version: '1.2.0' },
      componentCounts: counts,
    });
    expect(item.latestVersion).toEqual({ id: formatId('pv', versionId), version: '1.2.0' });
    expect(item.componentCounts).toEqual(counts);
    expect(
      serializePluginListItem({ ...plugin, latestVersion: null, componentCounts: counts })
        .latestVersion,
    ).toBeNull();
    expect(serializePluginPage({ items: [], total: 7, page: 2, pageSize: 3 })).toEqual({
      items: [],
      total: 7,
      page: 2,
      pageSize: 3,
    });
    const version = {
      id: uuid(),
      pluginId: uuid(),
      version: '1.0.0',
      publishedAt: now,
      status: 'published' as const,
    };
    const pluginDetail = {
      ...plugin,
      description: 'd',
      repositoryUrl: null,
      createdAt: now,
      latestVersion: version,
      components: [
        {
          id: uuid(),
          kind: 'skill' as const,
          name: 'review',
          description: 'd',
          transport: null,
          url: null,
          sourceUrl: null,
        },
      ],
    };
    expectPrefixed(serializePluginDetail(pluginDetail));
    expect(
      serializePluginDetail({ ...pluginDetail, latestVersion: null, components: [] }),
    ).toMatchObject({
      latestVersion: null,
      components: [],
    });
    expectPrefixed(serializePluginVersion(version));
    const detail = serializePluginVersionDetail({
      ...version,
      manifestSchemaVersion: '1',
      changelog: null,
      executionBlockedAt: null,
      components: [
        {
          id: uuid(),
          kind: 'mcp',
          name: 'echo',
          description: 'd',
          transport: 'http',
          url: 'https://e.example/mcp',
          sourceUrl: null,
        },
      ],
    });
    expectPrefixed(detail);
    const review = serializePluginVersionReview({
      id: uuid(),
      pluginId: uuid(),
      pluginName: 'p',
      version: '1.0.0',
      scanned: true,
      fileCount: 3,
      totalBytes: 120,
      components: [{ kind: 'hook', name: 'PreToolUse', description: 'Hook' }],
      hookCommands: [{ event: 'PreToolUse', command: 'echo hi' }],
      mcpServers: [{ name: 'echo', transport: 'http', url: 'https://example.com/mcp' }],
      variables: [{ name: 'TOKEN', description: 'd', required: true, secret: true }],
      skipped: [{ path: 'big.bin', reason: 'too large' }],
      findingCount: 0,
    });
    expectPrefixed(review);
    expect(review.hookCommands).toEqual([{ event: 'PreToolUse', command: 'echo hi' }]);
  });

  it('serializes installations, components, upgrades and runtime configuration', () => {
    const installation = {
      id: uuid(),
      scope: 'org' as const,
      pluginName: 'p',
      pluginLogoUrl: null,
      pluginVersion: '1.0.0',
      pluginVersionId: uuid(),
      active: true,
      updatePolicy: 'pinned' as const,
      required: false,
      replacedBy: null,
      createdAt: now,
      updatedAt: now,
    };
    expectPrefixed(serializeInstallation(installation));
    expectPrefixed(
      serializeInstallationComponent({
        componentId: uuid(),
        kind: 'mcp',
        name: 'echo',
        enabled: true,
        active: false,
        inactiveReason: 'variables_missing',
      }),
    );
    expectPrefixed(
      serializeUpgradeResult({
        installationId: uuid(),
        newVersion: '2.0.0',
        droppedComponents: [],
        newDisabledComponents: [],
      }),
    );
  });

  it('serializes a variable as its declaration and whether it is set, never a value', () => {
    const out = serializeVariable({
      name: 'TOKEN',
      description: 'd',
      required: true,
      secret: true,
      isSet: false,
      custom: false,
      value: 'leak',
    } as Parameters<typeof serializeVariable>[0]);
    expect(out).toEqual({
      name: 'TOKEN',
      description: 'd',
      required: true,
      secret: true,
      isSet: false,
      custom: false,
    });
  });

  it('serializes API keys without secrets', () => {
    const key = {
      id: uuid(),
      prefix: 'abcdefghijklmnop',
      name: 'Key',
      scope: 'user' as const,
      permissions: ['mcp:list' as const],
      lastFour: '1234',
      expiresAt: null,
      revokedAt: null,
      createdAt: now,
      secretHash: 'hash',
    };
    const out = serializeApiKey(key);
    expectPrefixed(out);
    expect(out).not.toHaveProperty('secretHash');
    const created = serializeApiKeyCreated({ ...key, rawKey: 'bc_live_x' });
    expect(created.rawKey).toBe('bc_live_x');
    expect(created).not.toHaveProperty('secretHash');
  });

  it('wraps pages and lists', () => {
    expect(serializePage({ items: [1, 2], nextCursor: 'c' }, (n) => n * 2)).toEqual({
      items: [2, 4],
      nextCursor: 'c',
    });
    expect(serializeList([1], (n) => n)).toEqual({ items: [1], nextCursor: null });
  });
});
