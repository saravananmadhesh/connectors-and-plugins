/**
 * The manifest a client syncs from: the plugins its key can see. File components (skill, rule,
 * hook, agent) each carry the hash of their own archive; MCP servers are listed as gateway
 * addresses with what is still missing before they work. The revision is a hash of what matters
 * to a client, so an unchanged answer is a `304`.
 */
import { createHash } from 'node:crypto';
import { and, eq, inArray } from 'drizzle-orm';
import {
  componentTable,
  installationComponentTable,
  type Executor,
} from '@boldcreate-integrations/db';
import {
  SYNC_FILE_KINDS,
  type ApiKeyPrincipal,
  type ScopeKind,
  type SyncFileKind,
  type UserPluginSetup,
} from '@boldcreate-integrations/contracts';
import { assignServerNames } from '../mcp/server-name.js';
import { allStates } from '../project/user-plugin-state.js';
import { resolveDelivery, type ResolvedDelivery } from './resolve-delivery.js';

export interface SyncOptions {
  /** File kinds the client can place; absent means all of them. */
  kinds?: readonly string[] | undefined;
  /** Plugin names to sync; absent means every plugin the key can see. */
  plugins?: readonly string[] | undefined;
  /** Public address of the gateway, where each MCP server is reached. */
  gatewayUrl: string;
}

export interface SyncComponent {
  id: string;
  kind: SyncFileKind;
  name: string;
  enabled: boolean;
  sha256: string;
  sizeBytes: number;
  href: string;
  path: string;
}

export interface SyncMcp {
  componentId: string;
  name: string;
  serverName: string;
  url: string;
  transport: 'streamable-http';
  description: string;
  ready: boolean;
  setup: UserPluginSetup;
}

export interface SyncEntryRow {
  installationId: string;
  pluginId: string;
  pluginName: string;
  versionId: string;
  version: string;
  scope: ScopeKind;
  yanked: boolean;
  sha256: string;
  sizeBytes: number;
  components: SyncComponent[];
  mcp: SyncMcp[];
  setup: UserPluginSetup;
}

export interface SyncSkippedRow {
  pluginId: string;
  versionId: string;
  componentId: string | null;
  kind: SyncFileKind | null;
  reason: 'unsupported_kind' | 'no_archive';
}

export interface SyncManifest {
  revision: string;
  pollAfterSeconds: number;
  entries: SyncEntryRow[];
  skipped: SyncSkippedRow[];
}

const BASE_POLL_SECONDS = 60;
const POLL_JITTER_SECONDS = 15;

const isFileKind = (value: string): value is SyncFileKind =>
  (SYNC_FILE_KINDS as readonly string[]).includes(value);

/** Kinds named by the client, limited to the file kinds; an unknown name is ignored. */
export function parseKinds(raw: string | undefined): SyncFileKind[] | undefined {
  if (!raw) return undefined;
  return [...new Set(raw.split(',').filter(isFileKind))].sort();
}

/** Plugin names named by the client, listed once. */
export function parsePlugins(raw: string | undefined): string[] | undefined {
  if (!raw) return undefined;
  return [...new Set(raw.split(',').filter((name) => name !== ''))].sort();
}

/** The generic folder of a component in a host's own layout: `skills/<name>`, `rules/<name>`. */
export const componentPath = (kind: SyncFileKind, name: string): string => `${kind}s/${name}`;

export const componentHref = (sha256: string): string => `/v1/sync/components/${sha256}`;

/** A stable offset so that the keys of one organization do not all poll in the same second. */
function pollAfter(keyId: string): number {
  const digest = createHash('sha256').update(keyId).digest();
  return BASE_POLL_SECONDS + (digest.readUInt16BE(0) % (POLL_JITTER_SECONDS + 1));
}

const gatewayAddress = (gatewayUrl: string, serverName: string): string =>
  `${gatewayUrl.replace(/\/+$/, '')}/${serverName}/mcp`;

/** The first thing a plugin still needs, so a client can show one line per plugin. */
function pluginSetup(mcp: readonly SyncMcp[]): UserPluginSetup {
  return mcp.find((server) => server.setup.kind !== 'none')?.setup ?? { kind: 'none' };
}

type Installs = ResolvedDelivery['installations'];

/** Every component of the given installs, with what the manifest needs to describe it. */
async function componentsOf(tx: Executor, principal: ApiKeyPrincipal, installs: Installs) {
  if (installs.length === 0) return [];
  return tx
    .select({
      installationId: installationComponentTable.installationId,
      componentId: componentTable.id,
      kind: componentTable.kind,
      name: componentTable.name,
      description: componentTable.description,
      metadata: componentTable.metadata,
      archiveSha256: componentTable.archiveSha256,
      archiveSizeBytes: componentTable.archiveSizeBytes,
      enabled: installationComponentTable.enabled,
      alias: installationComponentTable.alias,
    })
    .from(installationComponentTable)
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .where(
      and(
        eq(installationComponentTable.organizationId, principal.orgId),
        inArray(
          installationComponentTable.installationId,
          installs.map((i) => i.installationId),
        ),
      ),
    );
}

export async function buildSync(
  tx: Executor,
  principal: ApiKeyPrincipal,
  options: SyncOptions,
): Promise<SyncManifest> {
  const wanted = options.kinds ? new Set(options.kinds) : new Set<string>(SYNC_FILE_KINDS);
  const only = options.plugins ? new Set(options.plugins) : null;
  const { installations: all } = await resolveDelivery(tx, principal);
  const installs = only ? all.filter((install) => only.has(install.pluginName)) : all;

  // The gateway names a server by plugin, then component, over everything the key sees, so the
  // address listed here is the one it serves. A plugin filter does not change a name.
  const everything = await componentsOf(tx, principal, all);
  const pluginOf = new Map(all.map((install) => [install.installationId, install.pluginName]));
  const named = new Map(
    assignServerNames(
      everything
        .filter(
          (row) =>
            row.kind === 'mcp' &&
            row.enabled &&
            (row.metadata as { transport?: string }).transport === 'http',
        )
        .map((row) => ({ ...row, pluginName: pluginOf.get(row.installationId) ?? '' })),
    ).map(({ name, server }) => [`${server.installationId}/${server.componentId}`, name]),
  );

  const chosen = new Set(installs.map((install) => install.installationId));
  const byInstall = new Map<string, typeof everything>();
  for (const row of everything) {
    if (!chosen.has(row.installationId)) continue;
    const list = byInstall.get(row.installationId) ?? [];
    list.push(row);
    byInstall.set(row.installationId, list);
  }

  // The setup of each server is decided once, by the state read, so the manifest cannot disagree.
  const hasMcp = [...byInstall.values()].some((rows) => rows.some((row) => row.kind === 'mcp'));
  const states = hasMcp ? await allStates(tx, principal, { connections: false }) : [];
  const stateOf = new Map(states.map((state) => [state.pluginId, state]));

  const entries: SyncEntryRow[] = [];
  const skipped: SyncSkippedRow[] = [];
  for (const install of installs) {
    const rows = (byInstall.get(install.installationId) ?? []).sort((a, b) =>
      a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind.localeCompare(b.kind),
    );
    if (!install.archiveSha256 || install.archiveSizeBytes === null) {
      skipped.push({
        pluginId: install.pluginId,
        versionId: install.versionId,
        componentId: null,
        kind: null,
        reason: 'no_archive',
      });
      continue;
    }
    const files: SyncComponent[] = [];
    const mcp: SyncMcp[] = [];
    for (const row of rows) {
      if (row.kind === 'mcp') {
        const serverName = named.get(`${install.installationId}/${row.componentId}`);
        if (serverName === undefined) continue;
        const setup: UserPluginSetup = stateOf
          .get(install.pluginId)
          ?.mcp.find((server) => server.componentId === row.componentId)?.setup ?? {
          kind: 'none',
        };
        mcp.push({
          componentId: row.componentId,
          name: row.name,
          serverName,
          url: gatewayAddress(options.gatewayUrl, serverName),
          transport: 'streamable-http',
          description: row.description,
          ready: setup.kind === 'none',
          setup,
        });
        continue;
      }
      if (!isFileKind(row.kind)) continue;
      const skip = (reason: SyncSkippedRow['reason']) =>
        skipped.push({
          pluginId: install.pluginId,
          versionId: install.versionId,
          componentId: row.componentId,
          kind: row.kind as SyncFileKind,
          reason,
        });
      if (!wanted.has(row.kind)) {
        skip('unsupported_kind');
        continue;
      }
      if (!row.archiveSha256 || row.archiveSizeBytes === null) {
        skip('no_archive');
        continue;
      }
      files.push({
        id: row.componentId,
        kind: row.kind,
        name: row.name,
        enabled: row.enabled,
        sha256: row.archiveSha256,
        sizeBytes: row.archiveSizeBytes,
        href: componentHref(row.archiveSha256),
        path: componentPath(row.kind, row.name),
      });
    }
    if (files.length === 0 && mcp.length === 0) continue;
    entries.push({
      installationId: install.installationId,
      pluginId: install.pluginId,
      pluginName: install.pluginName,
      versionId: install.versionId,
      version: install.version,
      scope: install.scope,
      yanked: install.versionStatus === 'yanked',
      sha256: install.archiveSha256,
      sizeBytes: install.archiveSizeBytes,
      components: files,
      mcp,
      setup: pluginSetup(mcp),
    });
  }

  // Only what a client acts on goes into the hash: no timestamps, no token.
  const revision = createHash('sha256')
    .update(
      JSON.stringify({
        kinds: [...wanted].sort(),
        plugins: only ? [...only].sort() : null,
        entries: entries.map((e) => [
          e.pluginId,
          e.versionId,
          e.sha256,
          e.sizeBytes,
          e.scope,
          e.yanked,
          e.components.map((c) => [c.id, c.sha256, c.enabled]),
          e.mcp.map((m) => [m.componentId, m.serverName, m.url, m.ready]),
        ]),
        skipped: skipped.map((s) => [s.versionId, s.componentId, s.reason]),
      }),
    )
    .digest('hex')
    .slice(0, 32);

  return { revision, pollAfterSeconds: pollAfter(principal.keyId), entries, skipped };
}
