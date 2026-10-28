/**
 * `tools/list` and `tools/call` for one authenticated key. Reads what the key may reach, asks the
 * shared access code for the credential of the chosen auth type, and talks to the upstream with
 * the guarded fetch. No database transaction is open while the upstream call runs.
 */
import type { Logger } from 'pino';
import type { ApiKeyPrincipal } from '@boldcreate-integrations/contracts';
import { withTenant, type Db } from '@boldcreate-integrations/db';
import {
  DEFAULT_CALL_TIMEOUT_MS,
  MAX_CALL_TIMEOUT_MS,
  UpstreamError,
  openSession,
  resolveAccess,
  toolPermitted,
  writeAudit,
  type AccessDeps,
  type AccessFailure,
  type AccessResult,
} from '@boldcreate-integrations/domain';
import type { GatewayRemote } from '../remote.js';
import type { ServerGuard } from './guard.js';
import {
  exposedToolName,
  loadVisibleServers,
  splitToolName,
  type ToolSkip,
  type VisibleServer,
} from './servers.js';

export interface DispatchDeps {
  db: Db;
  access: AccessDeps;
  guard: ServerGuard;
  logger: Logger;
  /** Where a member signs in to a server; named in the "needs connect" answer. */
  appBaseUrl: string;
  resultMaxBytes: number;
  /** When set, servers, credentials and usage come from the api instead of the database. */
  remote?: GatewayRemote | undefined;
}

export interface ListedTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  destructive?: boolean;
}

export interface ToolListing {
  tools: ListedTool[];
  /** Servers the key reaches but cannot list yet, with the reason; never silent. */
  unavailable: { server: string; reason: 'needs_connect' | 'unreachable' }[];
  skipped: ToolSkip[];
}

export interface ToolResult {
  content: unknown[];
  isError: boolean;
}

const LIVE_LIST_TIMEOUT_MS = 10_000;

const textResult = (text: string): ToolResult => ({
  content: [{ type: 'text', text }],
  isError: true,
});

/** Keeps secrets and addresses out of text that goes back to an agent. */
export function redact(text: string): string {
  return text
    .replace(/Bearer\s+[A-Za-z0-9._~+/=-]+/gi, 'Bearer [redacted]')
    .replace(/https?:\/\/[^\s"')]+/gi, '[address]')
    .replace(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, '[address]')
    .slice(0, 500);
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new UpstreamError('upstream_timeout')), ms);
    }),
  ]).finally(() => clearTimeout(timer));
}

function accessMessage(reason: AccessFailure, personal: boolean, appBaseUrl: string): string {
  const where = `${appBaseUrl.replace(/\/+$/, '')}/installed?tab=mcp`;
  switch (reason) {
    case 'not_connected':
      return personal
        ? `This server needs you to sign in. Connect it at ${where} and try again.`
        : 'This server needs a personal sign-in; use a personal key.';
    case 'needs_reauth':
      return `Your sign-in to this server expired. Connect it again at ${where}.`;
    case 'not_found':
    case 'transport_unsupported':
      return 'This server is not available.';
    case 'auth_config_missing':
      return 'The sign-in method chosen for this session is not available.';
    case 'credential_unavailable':
    case 'refresh_failed':
      return 'The credentials of this server cannot be used right now.';
  }
}

function upstreamMessage(error: unknown, appBaseUrl: string): string {
  if (error instanceof UpstreamError) {
    switch (error.code) {
      case 'upstream_unauthorized':
        return `The server rejected the credentials. Connect it again at ${appBaseUrl.replace(/\/+$/, '')}/installed?tab=mcp.`;
      case 'upstream_timeout':
        return 'The server did not answer in time.';
      case 'url_not_allowed':
        return 'The address of this server is not allowed.';
      case 'upstream_protocol':
        return 'The server answered in a way that could not be understood.';
      case 'upstream_unavailable':
        return 'The server is unreachable.';
    }
  }
  return 'The call failed.';
}

function tenant(principal: ApiKeyPrincipal) {
  return {
    orgId: principal.orgId,
    userId: principal.userId,
    ...(principal.projectId
      ? { projectId: principal.projectId, subjectUserId: principal.userId }
      : {}),
  };
}

function visibleServers(
  deps: DispatchDeps,
  principal: ApiKeyPrincipal,
  only?: string,
): Promise<VisibleServer[]> {
  return deps.remote
    ? deps.remote.servers(principal, only)
    : withTenant(deps.db, tenant(principal), (tx) => loadVisibleServers(tx, principal, only));
}

function accessFor(
  deps: DispatchDeps,
  principal: ApiKeyPrincipal,
  server: VisibleServer,
): Promise<AccessResult> {
  if (deps.remote) return deps.remote.access(principal, server);
  return withTenant(deps.db, tenant(principal), (tx) =>
    resolveAccess(tx, deps.access, {
      organizationId: principal.orgId,
      installationId: server.installationId,
      componentId: server.componentId,
      userId: principal.userId ?? null,
      authConfigs: principal.authConfigs,
    }),
  );
}

export async function listAllTools(
  deps: DispatchDeps,
  principal: ApiKeyPrincipal,
  only?: string,
  direct = false,
): Promise<ToolListing> {
  const servers = await visibleServers(deps, principal, only);
  const listing: ToolListing = { tools: [], unavailable: [], skipped: [] };

  const live = servers.filter((server) => !server.discovered);
  const discovered = new Map<string, ListedTool[] | 'needs_connect' | 'unreachable'>();
  await Promise.all(
    live.map(async (server) => {
      discovered.set(server.name, await discover(deps, principal, server));
    }),
  );

  for (const server of servers) {
    const fresh = discovered.get(server.name);
    if (fresh === 'needs_connect' || fresh === 'unreachable') {
      listing.unavailable.push({ server: server.name, reason: fresh });
      continue;
    }
    const records = fresh ?? server.tools;
    for (const tool of records) {
      const exposed = exposedToolName(server.name, tool.name, direct);
      if ('skip' in exposed) {
        listing.skipped.push({ server: server.name, tool: tool.name, reason: exposed.skip });
        continue;
      }
      if (!toolPermitted(principal.toolPolicy, server.name, tool.name, tool.destructive)) continue;
      listing.tools.push({
        name: exposed.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
      });
    }
  }
  return listing;
}

/** Lists the tools of a server nobody has tested yet, so a new install works straight away. */
async function discover(
  deps: DispatchDeps,
  principal: ApiKeyPrincipal,
  server: VisibleServer,
): Promise<ListedTool[] | 'needs_connect' | 'unreachable'> {
  try {
    const access = await accessFor(deps, principal, server);
    if (!access.ok) {
      return access.reason === 'not_connected' || access.reason === 'needs_reauth'
        ? 'needs_connect'
        : 'unreachable';
    }
    const session = await withTimeout(
      openSession(deps.access.fetcher, access.target),
      LIVE_LIST_TIMEOUT_MS,
    );
    const tools = await withTimeout(session.listTools(), LIVE_LIST_TIMEOUT_MS);
    return tools.map((tool) => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
      ...(tool.destructive !== undefined ? { destructive: tool.destructive } : {}),
    }));
  } catch (error) {
    deps.logger.warn(
      { server: server.name, err: error instanceof Error ? error.name : 'error' },
      'Tool discovery failed',
    );
    return 'unreachable';
  }
}

export type CallOutcome =
  | { kind: 'unknown_tool' }
  | { kind: 'tool_disabled' }
  | { kind: 'result'; result: ToolResult; server: string; tool: string; outcome: string };

export async function callTool(
  deps: DispatchDeps,
  principal: ApiKeyPrincipal,
  fullName: string,
  args: Record<string, unknown>,
  only?: string,
  direct = false,
): Promise<CallOutcome> {
  const parts =
    direct && only !== undefined
      ? fullName === ''
        ? null
        : { server: only, tool: fullName }
      : splitToolName(fullName);
  if (!parts) return { kind: 'unknown_tool' };
  const servers = await visibleServers(deps, principal, only ?? parts.server);
  const server = servers.find((candidate) => candidate.name === parts.server);
  if (!server) return { kind: 'unknown_tool' };
  // Once tools are known, only those are callable; before that the upstream decides.
  if (server.discovered && !server.tools.some((tool) => tool.name === parts.tool)) {
    return { kind: 'unknown_tool' };
  }

  const known = server.tools.find((tool) => tool.name === parts.tool);
  if (!toolPermitted(principal.toolPolicy, server.name, parts.tool, known?.destructive)) {
    return { kind: 'tool_disabled' };
  }

  const done = (result: ToolResult, outcome: string): CallOutcome => ({
    kind: 'result',
    result,
    server: server.name,
    tool: parts.tool,
    outcome,
  });

  const gate = deps.guard.acquire(`${server.installationId}:${server.componentId}`);
  if (gate === 'busy') return done(textResult('This server is busy. Try again shortly.'), 'busy');
  if (gate === 'open') {
    return done(textResult('This server is failing and is paused. Try again later.'), 'paused');
  }

  let outcome: 'ok' | 'failure' | 'ignore' = 'ignore';
  try {
    const access = await accessFor(deps, principal, server);
    if (!access.ok) {
      return done(
        textResult(accessMessage(access.reason, principal.userId !== undefined, deps.appBaseUrl)),
        access.reason,
      );
    }
    const timeout = Math.min(access.callTimeoutMs ?? DEFAULT_CALL_TIMEOUT_MS, MAX_CALL_TIMEOUT_MS);
    try {
      const session = await openSession(deps.access.fetcher, access.target);
      const result = await session.callTool(parts.tool, args, timeout);
      outcome = 'ok';
      const size = Buffer.byteLength(JSON.stringify(result.content), 'utf8');
      if (size > deps.resultMaxBytes) {
        return done(textResult('The result is larger than this gateway relays.'), 'too_large');
      }
      const content = result.isError
        ? result.content.map((part) => {
            const item = part as { type?: unknown; text?: unknown };
            return item.type === 'text' && typeof item.text === 'string'
              ? { ...item, text: redact(item.text) }
              : part;
          })
        : result.content;
      return done({ content, isError: result.isError }, result.isError ? 'tool_error' : 'ok');
    } catch (error) {
      outcome = 'failure';
      if (error instanceof UpstreamError && error.code === 'upstream_unauthorized')
        outcome = 'ignore';
      return done(
        textResult(upstreamMessage(error, deps.appBaseUrl)),
        error instanceof UpstreamError ? error.code : 'error',
      );
    }
  } finally {
    if (typeof gate === 'object') gate.release(outcome);
  }
}

/** Writes the usage record of a call; a failure here never fails the call. */
export async function auditToolCall(
  deps: DispatchDeps,
  principal: ApiKeyPrincipal,
  call: { server: string; tool: string; outcome: string; durationMs: number },
  requestId: string,
  ip: string | undefined,
): Promise<void> {
  try {
    if (deps.remote) {
      await deps.remote.usage(principal, { ...call, requestId, ip });
      return;
    }
    await withTenant(deps.db, tenant(principal), (tx) =>
      writeAudit(tx, {
        actor: { kind: 'api_key', id: principal.keyId },
        action: 'mcp_tool.called',
        target: { kind: 'mcp_server', id: call.server },
        orgId: principal.orgId,
        projectId: principal.projectId,
        subjectUserId: principal.userId || undefined,
        result: call.outcome === 'ok' || call.outcome === 'tool_error' ? 'success' : 'failure',
        requestId,
        ip,
        context: { tool: call.tool, outcome: call.outcome, durationMs: call.durationMs },
      }),
    );
  } catch (error) {
    deps.logger.warn(
      { err: error instanceof Error ? error.name : 'error' },
      'Tool call audit failed',
    );
  }
}
