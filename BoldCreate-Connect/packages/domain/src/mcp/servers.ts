/**
 * What an installer and a member do with an installed MCP server in the details view: read it,
 * choose its auth type, test it, and sign in to it. Network work happens between two short
 * database steps, so no transaction is held open across an upstream call.
 */
import { and, eq } from 'drizzle-orm';
import type { Executor, ScopeContext } from '@boldcreate-integrations/db';
import {
  assertValidScope,
  componentTable,
  installationComponentTable,
  installationTable,
  authConfigTable,
  mcpOAuthStateTable,
  mcpOAuthTokenTable,
  mcpServerTable,
  type McpOAuthMetadata,
  type McpToolRecord,
} from '@boldcreate-integrations/db';
import type {
  McpOAuthStartResponse,
  McpServerResponse,
  Plain,
  PutMcpAuthBody,
  ScopeKind,
  UserSessionPrincipal,
} from '@boldcreate-integrations/contracts';
import { fieldSubjectId, type Sealer, type Unsealer } from '@boldcreate-integrations/credentials';
import { requireAction } from '../permissions/authorize.js';
import { resourceOfScope } from '../permissions/context.js';
import { writeAudit } from '../audit/write-audit.js';
import { AppError, appError, notFound } from '../errors.js';
import type { ProjectReturn } from './project-oauth.js';
import { resolveAccess, serverSubject, tokenSubject, type AccessDeps } from './access.js';
import {
  OAuthError,
  authorizationUrl,
  checkIssuer,
  discoverOAuth,
  exchangeCode,
  hashState,
  newPkce,
  newState,
  registerClient,
  type RegistrationRejection,
} from './oauth.js';
import {
  UpstreamError,
  hashTools,
  openSession,
  type UpstreamFetch,
  type UpstreamTarget,
} from './upstream.js';

const STATE_TTL_MS = 10 * 60 * 1000;

type ServerView = Plain<McpServerResponse>;

interface Loaded {
  installationId: string;
  componentId: string;
  name: string;
  metadata: { transport?: string; url?: string };
  server: typeof mcpServerTable.$inferSelect | undefined;
  tokenStatus: 'active' | 'needs_reauth' | undefined;
}

function scopeConditions(scope: ScopeContext) {
  return [
    eq(installationTable.organizationId, scope.organizationId),
    eq(installationTable.scopeType, scope.scopeType),
    ...(scope.ownerUserId ? [eq(installationTable.ownerUserId, scope.ownerUserId)] : []),
  ];
}

async function load(
  db: Executor,
  scope: ScopeContext,
  userId: string,
  installationId: string,
  componentId?: string,
): Promise<Loaded[]> {
  const rows = await db
    .select({
      installationId: installationComponentTable.installationId,
      componentId: installationComponentTable.componentId,
      name: componentTable.name,
      metadata: componentTable.metadata,
      server: mcpServerTable,
      token: mcpOAuthTokenTable.status,
    })
    .from(installationTable)
    .innerJoin(
      installationComponentTable,
      eq(installationComponentTable.installationId, installationTable.id),
    )
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .leftJoin(
      mcpServerTable,
      and(
        eq(mcpServerTable.installationId, installationComponentTable.installationId),
        eq(mcpServerTable.componentId, installationComponentTable.componentId),
      ),
    )
    .leftJoin(
      mcpOAuthTokenTable,
      and(
        eq(mcpOAuthTokenTable.installationId, installationComponentTable.installationId),
        eq(mcpOAuthTokenTable.componentId, installationComponentTable.componentId),
        eq(mcpOAuthTokenTable.userId, userId),
      ),
    )
    .where(
      and(
        eq(installationTable.id, installationId),
        eq(componentTable.kind, 'mcp'),
        ...(componentId ? [eq(installationComponentTable.componentId, componentId)] : []),
        ...scopeConditions(scope),
      ),
    )
    .orderBy(componentTable.name);
  return rows.map((row) => ({
    installationId: row.installationId,
    componentId: row.componentId,
    name: row.name,
    metadata: row.metadata as Loaded['metadata'],
    server: row.server ?? undefined,
    tokenStatus: row.token ?? undefined,
  }));
}

function view(item: Loaded): ServerView {
  const server = item.server;
  const authType = server?.authType ?? 'none';
  const oauth = authType === 'oauth_dcr' || authType === 'oauth_client';
  return {
    installationId: item.installationId,
    componentId: item.componentId,
    name: item.name,
    transport: item.metadata.transport === 'http' ? 'http' : 'stdio',
    url: item.metadata.url ?? null,
    authType,
    apiKeyLastFour: server?.apiKeyLastFour ?? null,
    oauthClientId: server?.oauthClientId ?? null,
    oauthClientSecretSet: Boolean(server?.oauthClientSecretSealed),
    oauthScopes: oauth ? (server?.oauthScopes ?? null) : null,
    oauthDiscoveredScopes: server?.oauthMetadata?.scopes ?? [],
    oauthDiscovered: Boolean(server?.oauthMetadata),
    callTimeoutMs: server?.callTimeoutMs ?? null,
    health: server?.health ?? 'unknown',
    healthCheckedAt: server?.healthCheckedAt?.toISOString() ?? null,
    lastError: server?.lastError ?? null,
    tools: (server?.tools ?? []).map((tool) => ({
      name: tool.name,
      description: tool.description,
    })),
    toolsRefreshedAt: server?.toolsRefreshedAt?.toISOString() ?? null,
    connection: !oauth
      ? 'not_required'
      : item.tokenStatus === 'active'
        ? 'connected'
        : item.tokenStatus === 'needs_reauth'
          ? 'needs_reauth'
          : 'not_connected',
  };
}

async function loadOne(
  db: Executor,
  scope: ScopeContext,
  userId: string,
  installationId: string,
  componentId: string,
): Promise<Loaded> {
  const [item] = await load(db, scope, userId, installationId, componentId);
  if (!item) throw notFound();
  return item;
}

export async function listMcpServers(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
): Promise<ServerView[]> {
  assertValidScope(scope);
  requireAction(principal, 'mcp-server:list', resourceOfScope(scope));
  return (await load(db, scope, principal.userId, installationId)).map(view);
}

export async function getMcpServer(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  componentId: string,
): Promise<ServerView> {
  assertValidScope(scope);
  requireAction(principal, 'mcp-server:read', resourceOfScope(scope));
  return view(await loadOne(db, scope, principal.userId, installationId, componentId));
}

// ─── Auth settings ────────────────────────────────────────────────────────────

/**
 * Sets how the server is reached. Secrets are write-only: an empty string keeps the stored one. A
 * change of auth type or client drops the members' tokens, since they no longer fit.
 */
export async function putMcpAuth(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  componentId: string,
  body: PutMcpAuthBody,
  sealer: Sealer,
): Promise<ServerView> {
  assertValidScope(scope);
  requireAction(principal, 'mcp-server:update', resourceOfScope(scope));
  const item = await loadOne(db, scope, principal.userId, installationId, componentId);
  if (item.metadata.transport !== 'http') throw appError('mcp_transport_unsupported');
  const current = item.server;
  const subject = { kind: 'mcp_server' as const, id: serverSubject(installationId, componentId) };
  const orgId = scope.organizationId;

  let apiKeySealed: string | null = null;
  let apiKeyLastFour: string | null = null;
  let clientId: string | null = null;
  let clientSecretSealed: string | null = null;
  let oauthMetadata: McpOAuthMetadata | null = null;

  if (body.authType === 'api_key') {
    if (body.apiKey) {
      apiKeySealed = await sealer.seal({
        purpose: 'mcp_api_key',
        orgId,
        subject,
        plaintext: body.apiKey,
      });
      apiKeyLastFour = body.apiKey.slice(-4);
    } else if (current?.apiKeySealed) {
      apiKeySealed = current.apiKeySealed;
      apiKeyLastFour = current.apiKeyLastFour;
    } else {
      throw appError('validation_failed');
    }
  } else if (body.authType === 'oauth_client') {
    clientId = body.clientId || current?.oauthClientId || null;
    if (!clientId) throw appError('oauth_client_not_configured');
    if (body.clientSecret) {
      clientSecretSealed = await sealer.seal({
        purpose: 'oauth_client_secret',
        orgId,
        subject,
        plaintext: body.clientSecret,
      });
    } else if (current?.authType === 'oauth_client') {
      clientSecretSealed = current.oauthClientSecretSealed;
    }
    if (current?.authType === 'oauth_client' && current.oauthClientId === clientId) {
      oauthMetadata = current.oauthMetadata;
    }
  } else if (body.authType === 'oauth_dcr' && current?.authType === 'oauth_dcr') {
    // The registration the server made for us stays until the type changes.
    clientId = current.oauthClientId;
    clientSecretSealed = current.oauthClientSecretSealed;
    oauthMetadata = current.oauthMetadata;
  }

  const oauthType = body.authType === 'oauth_dcr' || body.authType === 'oauth_client';
  const currentOAuth = current?.authType === 'oauth_dcr' || current?.authType === 'oauth_client';
  const scopes = !oauthType
    ? null
    : body.scopes === undefined
      ? currentOAuth
        ? (current?.oauthScopes ?? null)
        : null
      : body.scopes.trim() || null;

  const dropTokens =
    current !== undefined &&
    (current.authType !== body.authType ||
      (current.oauthClientId ?? null) !== clientId ||
      (currentOAuth && (current.oauthScopes ?? null) !== scopes));
  const now = new Date();
  const timeout =
    body.callTimeoutMs === undefined ? (current?.callTimeoutMs ?? null) : body.callTimeoutMs;
  const values = {
    authType: body.authType,
    apiKeySealed,
    apiKeyLastFour,
    oauthClientId: clientId,
    oauthClientSecretSealed: clientSecretSealed,
    oauthScopes: scopes,
    oauthMetadata,
    callTimeoutMs: timeout,
    updatedAt: now,
  };

  await db.transaction(async (tx) => {
    if (current) {
      await tx
        .update(mcpServerTable)
        .set({ ...values, revision: current.revision + 1 })
        .where(
          and(
            eq(mcpServerTable.installationId, installationId),
            eq(mcpServerTable.componentId, componentId),
          ),
        );
      if (dropTokens) {
        await tx
          .delete(mcpOAuthTokenTable)
          .where(
            and(
              eq(mcpOAuthTokenTable.installationId, installationId),
              eq(mcpOAuthTokenTable.componentId, componentId),
            ),
          );
      }
    } else {
      await tx
        .insert(mcpServerTable)
        .values({ installationId, componentId, organizationId: orgId, ...values });
    }
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: principal.userId },
      action: 'mcp_server.auth_updated',
      target: { kind: 'installation', id: installationId },
      orgId,
      context: { component: item.name, authType: body.authType, scope: scope.scopeType },
    });
  });
  return view(await loadOne(db, scope, principal.userId, installationId, componentId));
}

// ─── Test ─────────────────────────────────────────────────────────────────────

export type ProbePlan =
  | { ok: true; target: UpstreamTarget }
  | { ok: false; error: string; health: 'unknown' | 'unreachable' };

/** First step of a test: authorize and work out what to call. */
export async function planProbe(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  componentId: string,
  deps: AccessDeps,
): Promise<ProbePlan> {
  assertValidScope(scope);
  requireAction(principal, 'mcp-server:test', resourceOfScope(scope));
  await loadOne(db, scope, principal.userId, installationId, componentId);
  const access = await resolveAccess(db, deps, {
    organizationId: scope.organizationId,
    installationId,
    componentId,
    userId: principal.userId,
  });
  if (access.ok) return { ok: true, target: access.target };
  const error =
    access.reason === 'transport_unsupported'
      ? 'mcp_transport_unsupported'
      : access.reason === 'not_found'
        ? 'not_found'
        : access.reason;
  return { ok: false, error, health: 'unknown' };
}

export interface ProbeOutcome {
  health: 'healthy' | 'degraded' | 'unreachable' | 'unknown';
  error: string | null;
  tools: McpToolRecord[] | null;
}

/** Second step: the upstream conversation, with no database held. */
export async function runProbe(fetcher: UpstreamFetch, plan: ProbePlan): Promise<ProbeOutcome> {
  if (!plan.ok) return { health: plan.health, error: plan.error, tools: null };
  try {
    const session = await openSession(fetcher, plan.target);
    const tools = await session.listTools();
    return { health: 'healthy', error: null, tools };
  } catch (error) {
    if (error instanceof UpstreamError) {
      // A rejected credential means the server answered: it is reachable but not usable as is.
      return {
        health: error.code === 'upstream_unauthorized' ? 'degraded' : 'unreachable',
        error: error.code,
        tools: null,
      };
    }
    return { health: 'unreachable', error: 'upstream_unavailable', tools: null };
  }
}

/** Third step: store what the test found. A sign-in gap leaves the stored health alone. */
export async function recordProbe(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  componentId: string,
  outcome: ProbeOutcome,
): Promise<ServerView> {
  assertValidScope(scope);
  const item = await loadOne(db, scope, principal.userId, installationId, componentId);
  const now = new Date();
  if (outcome.health !== 'unknown') {
    const tools = outcome.tools ?? item.server?.tools ?? [];
    const patch = {
      health: outcome.health,
      healthCheckedAt: now,
      lastError: outcome.error,
      ...(outcome.tools
        ? { tools: outcome.tools, toolsHash: hashTools(outcome.tools), toolsRefreshedAt: now }
        : {}),
      updatedAt: now,
    };
    await db.transaction(async (tx) => {
      if (item.server) {
        await tx
          .update(mcpServerTable)
          .set(patch)
          .where(
            and(
              eq(mcpServerTable.installationId, installationId),
              eq(mcpServerTable.componentId, componentId),
            ),
          );
      } else {
        await tx.insert(mcpServerTable).values({
          installationId,
          componentId,
          organizationId: scope.organizationId,
          ...patch,
          tools,
        });
      }
      await writeAudit(tx, {
        actor: { kind: 'user_session', id: principal.userId },
        action: 'mcp_server.tested',
        target: { kind: 'installation', id: installationId },
        orgId: scope.organizationId,
        context: {
          component: item.name,
          health: outcome.health,
          ...(outcome.error ? { error: outcome.error } : {}),
        },
      });
    });
  }
  return view(await loadOne(db, scope, principal.userId, installationId, componentId));
}

// ─── Member sign-in (OAuth) ───────────────────────────────────────────────────

export interface OAuthStartPlan {
  url: string;
  /** Set when a project call began the sign-in; its state row then needs no session either. */
  project: ProjectReturn | null;
  authType: 'oauth_dcr' | 'oauth_client';
  metadata: McpOAuthMetadata | null;
  client: { clientId: string; clientSecret?: string } | null;
  /** The auth config in force; what discovery and registration learn is kept on it, not on the server. */
  authConfig: { id: string; scopes: string | null } | null;
}

/** First step of connecting: authorize and say what discovery or registration is still needed. */
export async function planOAuthStart(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  componentId: string,
  unsealer: Unsealer,
): Promise<OAuthStartPlan> {
  assertValidScope(scope);
  requireAction(principal, 'user-connection:authorize', resourceOfScope(scope));
  const item = await loadOne(db, scope, principal.userId, installationId, componentId);
  return oauthPlanOf(
    item,
    { organizationId: scope.organizationId, installationId, componentId },
    unsealer,
    { project: null },
  );
}

/**
 * What the sign-in to one server needs, read from the server's row. The website and
 * project flows share it, so each of them discovers, registers and signs in the same way. A server
 * that has no sign-in type set, or a type that is not OAuth, is not ready for a sign-in.
 */
export async function oauthPlanOf(
  item: {
    metadata: { transport?: string; url?: string };
    server: typeof mcpServerTable.$inferSelect | undefined;
  },
  target: { organizationId: string; installationId: string; componentId: string },
  unsealer: Unsealer,
  returns: { project: ProjectReturn | null },
  config: typeof authConfigTable.$inferSelect | null = null,
): Promise<OAuthStartPlan> {
  const server = item.server;
  if (item.metadata.transport !== 'http' || !item.metadata.url) {
    throw appError('mcp_transport_unsupported');
  }
  if (config) {
    if (config.authMode !== 'dcr' && config.authMode !== 'oauth_client') {
      throw appError('oauth_client_not_configured');
    }
    const clientSecret = config.oauthClientSecretSealed
      ? await unsealer.unseal({
          purpose: 'auth_config_client_secret',
          orgId: target.organizationId,
          subject: { kind: 'auth_config', id: config.id },
          envelope: config.oauthClientSecretSealed,
        })
      : undefined;
    return {
      url: item.metadata.url,
      project: returns.project,
      authType: config.authMode === 'dcr' ? 'oauth_dcr' : 'oauth_client',
      metadata: config.oauthMetadata ?? null,
      client: config.oauthClientId
        ? { clientId: config.oauthClientId, ...(clientSecret ? { clientSecret } : {}) }
        : null,
      authConfig: { id: config.id, scopes: config.oauthScopes },
    };
  }
  if (!server || (server.authType !== 'oauth_dcr' && server.authType !== 'oauth_client')) {
    throw appError('oauth_client_not_configured');
  }
  let client: OAuthStartPlan['client'] = null;
  if (server.oauthClientId) {
    const clientSecret = server.oauthClientSecretSealed
      ? await unsealer.unseal({
          purpose: 'oauth_client_secret',
          orgId: target.organizationId,
          subject: {
            kind: 'mcp_server',
            id: serverSubject(target.installationId, target.componentId),
          },
          envelope: server.oauthClientSecretSealed,
        })
      : undefined;
    client = { clientId: server.oauthClientId, ...(clientSecret ? { clientSecret } : {}) };
  }
  return {
    url: item.metadata.url,
    project: returns.project,
    authType: server.authType,
    metadata: server.oauthMetadata ?? null,
    client,
    authConfig: null,
  };
}

/** First step of looking up what the server's sign-in supports: authorize and name the address. */
export async function planOAuthDiscovery(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  componentId: string,
): Promise<string> {
  assertValidScope(scope);
  requireAction(principal, 'mcp-server:test', resourceOfScope(scope));
  const item = await loadOne(db, scope, principal.userId, installationId, componentId);
  if (item.metadata.transport !== 'http' || !item.metadata.url) {
    throw appError('mcp_transport_unsupported');
  }
  return item.metadata.url;
}

/** Second step: read the published sign-in details. A server without any is not an error. */
export async function discoverOAuthScopes(
  fetcher: UpstreamFetch,
  url: string,
): Promise<{ discovered: boolean; dynamicRegistration: boolean; scopes: string[] }> {
  try {
    const metadata = await discoverOAuth(fetcher, url);
    return {
      discovered: true,
      dynamicRegistration: Boolean(metadata.registrationEndpoint),
      scopes: metadata.scopes ?? [],
    };
  } catch (error) {
    if (error instanceof OAuthError || error instanceof UpstreamError) {
      return { discovered: false, dynamicRegistration: false, scopes: [] };
    }
    throw error;
  }
}

export interface OAuthPrepared {
  metadata: McpOAuthMetadata;
  client: { clientId: string; clientSecret?: string };
  /** True when the client was just registered and must be stored. */
  registered: boolean;
  project: ProjectReturn | null;
  authConfig: { id: string; scopes: string | null } | null;
}

/** Second step: discovery and, for the registering type, registration. No database held. */
export async function prepareOAuth(
  fetcher: UpstreamFetch,
  plan: OAuthStartPlan,
  redirectUri: string,
  onRejected?: (rejection: RegistrationRejection) => void,
): Promise<OAuthPrepared> {
  try {
    const metadata = plan.metadata ?? (await discoverOAuth(fetcher, plan.url));
    if (plan.client) {
      return {
        metadata,
        client: plan.client,
        registered: false,
        project: plan.project,
        authConfig: plan.authConfig,
      };
    }
    if (plan.authType !== 'oauth_dcr') throw appError('oauth_client_not_configured');
    const client = await registerClient(
      fetcher,
      metadata,
      redirectUri,
      'BoldCreate Integrations',
      onRejected,
    );
    return {
      metadata,
      client,
      registered: true,
      project: plan.project,
      authConfig: plan.authConfig,
    };
  } catch (error) {
    if (error instanceof OAuthError) {
      throw appError(
        error.code === 'oauth_registration_failed'
          ? 'oauth_registration_failed'
          : 'oauth_discovery_failed',
      );
    }
    throw error;
  }
}

/** Third step: keep what was learned, store the pending authorization, return where to send the member. */
export async function beginOAuth(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  componentId: string,
  prepared: OAuthPrepared,
  redirectUri: string,
  sealer: Sealer,
  now: Date = new Date(),
): Promise<Plain<McpOAuthStartResponse>> {
  assertValidScope(scope);
  requireAction(principal, 'user-connection:authorize', resourceOfScope(scope));
  const item = await loadOne(db, scope, principal.userId, installationId, componentId);
  if (!item.server) throw appError('oauth_client_not_configured');
  const { authorizeUrl } = await startAuthorization(
    db,
    {
      organizationId: scope.organizationId,
      userId: principal.userId,
      installationId,
      componentId,
    },
    item.server,
    prepared,
    redirectUri,
    sealer,
    now,
  );
  return { authorizeUrl };
}

/**
 * Keeps what discovery and registration learned, stores the pending authorization (single use,
 * ten minutes) and says where to send the browser. The caller has already authorized the user and
 * found the server; the website and project flows share the rest.
 */
export async function startAuthorization(
  db: Executor,
  target: { organizationId: string; userId: string; installationId: string; componentId: string },
  server: typeof mcpServerTable.$inferSelect | undefined,
  prepared: OAuthPrepared,
  redirectUri: string,
  sealer: Sealer,
  now: Date = new Date(),
): Promise<{ authorizeUrl: string; expiresAt: Date }> {
  const { installationId, componentId } = target;
  const orgId = target.organizationId;
  const pkce = newPkce();
  // The organization leads the value so the callback can open the right tenant before it reads the row.
  const state = `${orgId}.${newState()}`;
  const subject = {
    kind: 'user_connection' as const,
    id: tokenSubject(installationId, componentId, target.userId),
  };
  const expiresAt = new Date(now.getTime() + STATE_TTL_MS);

  const config = prepared.authConfig;
  const scopesSet = config ? config.scopes : (server?.oauthScopes ?? null);
  await db.transaction(async (tx) => {
    if (config) {
      await tx
        .update(authConfigTable)
        .set({
          oauthMetadata: prepared.metadata,
          ...(prepared.registered
            ? {
                oauthClientId: prepared.client.clientId,
                oauthClientSecretSealed: prepared.client.clientSecret
                  ? await sealer.seal({
                      purpose: 'auth_config_client_secret',
                      orgId,
                      subject: { kind: 'auth_config', id: config.id },
                      plaintext: prepared.client.clientSecret,
                    })
                  : null,
              }
            : {}),
          updatedAt: now,
        })
        .where(eq(authConfigTable.id, config.id));
    } else {
      await tx
        .update(mcpServerTable)
        .set({
          oauthMetadata: prepared.metadata,
          ...(prepared.registered
            ? {
                oauthClientId: prepared.client.clientId,
                oauthClientSecretSealed: prepared.client.clientSecret
                  ? await sealer.seal({
                      purpose: 'oauth_client_secret',
                      orgId,
                      subject: {
                        kind: 'mcp_server',
                        id: serverSubject(installationId, componentId),
                      },
                      plaintext: prepared.client.clientSecret,
                    })
                  : null,
              }
            : {}),
          updatedAt: now,
        })
        .where(
          and(
            eq(mcpServerTable.installationId, installationId),
            eq(mcpServerTable.componentId, componentId),
          ),
        );
    }
    await tx.insert(mcpOAuthStateTable).values({
      authConfigId: config?.id ?? null,
      stateHash: hashState(state),
      installationId,
      componentId,
      organizationId: orgId,
      userId: target.userId,
      codeVerifierSealed: await sealer.seal({
        purpose: 'oauth_state_verifier',
        orgId,
        subject: { ...subject, id: fieldSubjectId(subject.id, 'verifier') },
        plaintext: pkce.verifier,
      }),
      redirectUri,
      ...(prepared.project
        ? {
            projectId: prepared.project.projectId,
            returnUrl: prepared.project.returnUrl,
            clientState: prepared.project.clientState,
          }
        : {}),
      expiresAt,
    });
  });
  return {
    authorizeUrl: authorizationUrl({
      // Scopes set on the config or the server win over the discovered ones.
      metadata: scopesSet
        ? { ...prepared.metadata, scopes: scopesSet.split(' ') }
        : prepared.metadata,
      clientId: prepared.client.clientId,
      redirectUri,
      state,
      challenge: pkce.challenge,
    }),
    expiresAt,
  };
}

/** The organization a callback's state value names, or null when it is not one of ours. */
export function stateOrganization(state: string): string | null {
  const [org, rest] = state.split('.');
  return org && rest && /^[0-9a-f-]{36}$/.test(org) ? org : null;
}

export interface ConsumedState {
  installationId: string;
  componentId: string;
  scope: { type: ScopeKind };
  metadata: McpOAuthMetadata;
  client: { clientId: string; clientSecret?: string };
  verifier: string;
  redirectUri: string;
  /** The auth config the sign-in was made under; the tokens are kept with it. */
  authConfigId: string | null;
}

/** First step of the callback: the state is single use, so it is removed as it is read. */
export async function consumeOAuthState(
  db: Executor,
  principal: UserSessionPrincipal,
  state: string,
  unsealer: Unsealer,
  now: Date = new Date(),
): Promise<ConsumedState> {
  const deleted = await db
    .delete(mcpOAuthStateTable)
    .where(eq(mcpOAuthStateTable.stateHash, hashState(state)))
    .returning();
  const row = deleted[0];
  if (!row || row.expiresAt.getTime() < now.getTime()) throw appError('oauth_state_invalid');
  // The member who finishes must be the member who began.
  if (row.userId !== principal.userId) throw appError('oauth_session_mismatch');
  return consumedFromRow(db, row, unsealer);
}

/** What a callback needs from a state row that was just removed: the server, client and verifier. */
export async function consumedFromRow(
  db: Executor,
  row: typeof mcpOAuthStateTable.$inferSelect,
  unsealer: Unsealer,
): Promise<ConsumedState> {
  const [server] = await db
    .select()
    .from(mcpServerTable)
    .where(
      and(
        eq(mcpServerTable.installationId, row.installationId),
        eq(mcpServerTable.componentId, row.componentId),
      ),
    )
    .limit(1);
  const [installation] = await db
    .select({ scopeType: installationTable.scopeType })
    .from(installationTable)
    .where(eq(installationTable.id, row.installationId))
    .limit(1);
  const config = row.authConfigId
    ? (
        await db
          .select()
          .from(authConfigTable)
          .where(eq(authConfigTable.id, row.authConfigId))
          .limit(1)
      )[0]
    : undefined;
  const registered = row.authConfigId ? config : server;
  if (!registered?.oauthMetadata || !registered.oauthClientId || !installation) {
    throw appError('oauth_state_invalid');
  }
  const orgId = row.organizationId;
  const subject = {
    kind: 'user_connection' as const,
    id: tokenSubject(row.installationId, row.componentId, row.userId),
  };
  const verifier = await unsealer.unseal({
    purpose: 'oauth_state_verifier',
    orgId,
    subject: { ...subject, id: fieldSubjectId(subject.id, 'verifier') },
    envelope: row.codeVerifierSealed,
  });
  const clientSecret = registered.oauthClientSecretSealed
    ? await unsealer.unseal(
        config
          ? {
              purpose: 'auth_config_client_secret',
              orgId,
              subject: { kind: 'auth_config', id: config.id },
              envelope: registered.oauthClientSecretSealed,
            }
          : {
              purpose: 'oauth_client_secret',
              orgId,
              subject: {
                kind: 'mcp_server',
                id: serverSubject(row.installationId, row.componentId),
              },
              envelope: registered.oauthClientSecretSealed,
            },
      )
    : undefined;
  return {
    installationId: row.installationId,
    componentId: row.componentId,
    scope: { type: installation.scopeType },
    metadata: registered.oauthMetadata,
    client: { clientId: registered.oauthClientId, ...(clientSecret ? { clientSecret } : {}) },
    verifier,
    redirectUri: row.redirectUri,
    authConfigId: row.authConfigId,
  };
}

/** Second step of the callback: swap the code for tokens, checking the issuer first. */
export async function exchangeOAuthCode(
  fetcher: UpstreamFetch,
  consumed: ConsumedState,
  code: string,
  iss: string | undefined,
) {
  try {
    checkIssuer(consumed.metadata, iss);
    return await exchangeCode(fetcher, consumed.metadata, consumed.client, {
      code,
      verifier: consumed.verifier,
      redirectUri: consumed.redirectUri,
    });
  } catch (error) {
    if (error instanceof OAuthError) {
      throw new OAuthExchangeError(
        error.code === 'oauth_issuer_mismatch' ? 'oauth_issuer_mismatch' : 'oauth_exchange_failed',
        error.detail,
      );
    }
    throw error;
  }
}

/** A failed code exchange, carrying what the authorization server said so the member can see it. */
export class OAuthExchangeError extends AppError {
  constructor(
    code: 'oauth_issuer_mismatch' | 'oauth_exchange_failed',
    readonly detail: string | undefined,
  ) {
    super(code);
  }
}

/** What started a sign-in that no website session vouches for. */
export type ConnectionOrigin = { projectId: string };

/** Third step: keep the member's tokens, sealed. */
export async function storeOAuthTokens(
  db: Executor,
  subjectUser: { userId: string },
  organizationId: string,
  consumed: ConsumedState,
  tokens: Awaited<ReturnType<typeof exchangeCode>>,
  sealer: Sealer,
  now: Date = new Date(),
  origin: ConnectionOrigin | null = null,
): Promise<void> {
  const subject = {
    kind: 'user_connection' as const,
    id: tokenSubject(consumed.installationId, consumed.componentId, subjectUser.userId),
  };
  const seal = (field: string, plaintext: string) =>
    sealer.seal({
      purpose: 'user_connection_token',
      orgId: organizationId,
      subject: { ...subject, id: fieldSubjectId(subject.id, field) },
      plaintext,
    });
  const values = {
    kind: 'oauth' as const,
    authConfigId: consumed.authConfigId,
    credentialsSealed: null,
    valueNames: null,
    accessSealed: await seal('access', tokens.accessToken),
    refreshSealed: tokens.refreshToken ? await seal('refresh', tokens.refreshToken) : null,
    expiresAt: tokens.expiresIn ? new Date(now.getTime() + tokens.expiresIn * 1000) : null,
    scope: tokens.scope ?? null,
    status: 'active' as const,
    updatedAt: now,
  };
  await db.transaction(async (tx) => {
    await tx
      .insert(mcpOAuthTokenTable)
      .values({
        installationId: consumed.installationId,
        componentId: consumed.componentId,
        userId: subjectUser.userId,
        organizationId,
        ...values,
      })
      .onConflictDoUpdate({
        target: [
          mcpOAuthTokenTable.installationId,
          mcpOAuthTokenTable.componentId,
          mcpOAuthTokenTable.userId,
        ],
        set: values,
      });
    // A project user holds no membership: the event names the project and the user instead.
    await writeAudit(
      tx,
      origin !== null
        ? {
            actor: { kind: 'user_session', id: subjectUser.userId },
            action: 'connection.activated',
            target: { kind: 'installation', id: consumed.installationId },
            orgId: organizationId,
            projectId: origin.projectId,
            subjectUserId: subjectUser.userId,
            context: { component: consumed.componentId, origin: 'project_api' },
          }
        : {
            actor: { kind: 'user_session', id: subjectUser.userId },
            action: 'mcp_server.connected',
            target: { kind: 'installation', id: consumed.installationId },
            orgId: organizationId,
          },
    );
  });
}

/** Removes the member's own tokens; the server and everyone else's sign-ins are untouched. */
export async function disconnectMcpServer(
  db: Executor,
  principal: UserSessionPrincipal,
  scope: ScopeContext,
  installationId: string,
  componentId: string,
): Promise<void> {
  assertValidScope(scope);
  requireAction(principal, 'user-connection:delete', resourceOfScope(scope));
  await loadOne(db, scope, principal.userId, installationId, componentId);
  await db.transaction(async (tx) => {
    await tx
      .delete(mcpOAuthTokenTable)
      .where(
        and(
          eq(mcpOAuthTokenTable.installationId, installationId),
          eq(mcpOAuthTokenTable.componentId, componentId),
          eq(mcpOAuthTokenTable.userId, principal.userId),
        ),
      );
    await writeAudit(tx, {
      actor: { kind: 'user_session', id: principal.userId },
      action: 'mcp_server.disconnected',
      target: { kind: 'installation', id: installationId },
      orgId: scope.organizationId,
    });
  });
}
