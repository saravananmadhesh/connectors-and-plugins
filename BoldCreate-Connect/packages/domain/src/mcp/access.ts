/**
 * Turns an installed MCP component into something that can be called: the expanded address, the
 * headers the plugin declared, and the credential of the chosen auth type. Used by the api when it
 * tests a server and by the gateway when it forwards a tool call, so both see the same rules.
 */
import { and, eq } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import {
  componentTable,
  installationComponentTable,
  installationTable,
  installationVariableTable,
  mcpOAuthTokenTable,
  mcpServerTable,
  type McpAuthType,
} from '@boldcreate-integrations/db';
import { fieldSubjectId, type Sealer, type Unsealer } from '@boldcreate-integrations/credentials';
import { resolveAuthConfig, serverKey } from '../project/auth-configs.js';
import { writeAudit } from '../audit/write-audit.js';
import { OAuthError, refreshToken } from './oauth.js';
import { expandVariables, type UpstreamFetch, type UpstreamTarget } from './upstream.js';

export interface AccessDeps {
  unsealer: Unsealer;
  sealerFor: (executor: Executor) => Sealer;
  fetcher: UpstreamFetch;
  now?: () => Date;
}

export type AccessFailure =
  | 'not_found'
  | 'transport_unsupported'
  /** The server needs a member sign-in and this member has not made one. */
  | 'not_connected'
  /** The session names a config that is gone or switched off. */
  | 'auth_config_missing'
  /** The provider no longer accepts the member's tokens. */
  | 'needs_reauth'
  | 'credential_unavailable'
  | 'refresh_failed';

export type AccessResult =
  | {
      ok: true;
      target: UpstreamTarget;
      authType: McpAuthType;
      callTimeoutMs: number | null;
      serverName: string;
    }
  | { ok: false; reason: AccessFailure };

/** Subject ids under which this module seals values; one per row, so a value cannot move. */
export const serverSubject = (installationId: string, componentId: string): string =>
  `${installationId}:${componentId}`;
export const tokenSubject = (installationId: string, componentId: string, userId: string): string =>
  `${installationId}:${componentId}:${userId}`;

const REFRESH_MARGIN_MS = 60_000;

/**
 * The provider no longer accepts a user's tokens, so they must sign in again. When the connection
 * belongs to a project's installation, the event is recorded for the project and the user.
 */
async function markNeedsReauth(
  tx: Executor,
  input: AccessInput,
  userId: string,
  now: Date,
): Promise<void> {
  await tx
    .update(mcpOAuthTokenTable)
    .set({ status: 'needs_reauth', updatedAt: now })
    .where(
      and(
        eq(mcpOAuthTokenTable.installationId, input.installationId),
        eq(mcpOAuthTokenTable.componentId, input.componentId),
        eq(mcpOAuthTokenTable.userId, userId),
      ),
    );
  const [installation] = await tx
    .select({ projectId: installationTable.projectId })
    .from(installationTable)
    .where(eq(installationTable.id, input.installationId))
    .limit(1);
  if (!installation?.projectId) return;
  await writeAudit(tx, {
    actor: { kind: 'system', id: 'connection-refresh' },
    action: 'connection.expired',
    target: { kind: 'installation', id: input.installationId },
    orgId: input.organizationId,
    projectId: installation.projectId,
    subjectUserId: userId,
    context: { component: input.componentId },
  });
}

export interface AccessInput {
  organizationId: string;
  installationId: string;
  componentId: string;
  /** The member the call is for; needed by the OAuth auth types. */
  userId: string | null;
  /** The auth configs a session names, by plugin and server (`serverKey`). */
  authConfigs?: Record<string, string> | undefined;
}

/**
 * Reads what a call needs. Runs inside the caller's tenant transaction. An expired access token is
 * refreshed here, under a row lock so two callers do not spend one refresh token twice.
 */
export async function resolveAccess(
  tx: Executor,
  deps: AccessDeps,
  input: AccessInput,
): Promise<AccessResult> {
  const now = (deps.now ?? (() => new Date()))();
  const rows = await tx
    .select({
      name: componentTable.name,
      metadata: componentTable.metadata,
      server: mcpServerTable,
      projectId: installationTable.projectId,
      pluginId: installationTable.pluginId,
    })
    .from(installationComponentTable)
    .innerJoin(
      installationTable,
      eq(installationTable.id, installationComponentTable.installationId),
    )
    .innerJoin(componentTable, eq(componentTable.id, installationComponentTable.componentId))
    .leftJoin(
      mcpServerTable,
      and(
        eq(mcpServerTable.installationId, installationComponentTable.installationId),
        eq(mcpServerTable.componentId, installationComponentTable.componentId),
      ),
    )
    .where(
      and(
        eq(installationComponentTable.installationId, input.installationId),
        eq(installationComponentTable.componentId, input.componentId),
        eq(installationComponentTable.organizationId, input.organizationId),
        eq(componentTable.kind, 'mcp'),
      ),
    )
    .limit(1);
  const row = rows[0];
  if (!row) return { ok: false, reason: 'not_found' };
  const metadata = row.metadata as {
    transport?: string;
    url?: string;
    headers?: Record<string, string>;
  };
  if (metadata.transport !== 'http' || !metadata.url) {
    return { ok: false, reason: 'transport_unsupported' };
  }
  const server = row.server;

  // The config in force for a project's server decides how it is reached; a server of another
  // install keeps the auth type set on the server itself.
  const named = input.authConfigs?.[serverKey(row.pluginId, row.name)];
  const config = row.projectId
    ? await resolveAuthConfig(tx, {
        projectId: row.projectId,
        pluginId: row.pluginId,
        serverName: row.name,
        sessionConfigs: input.authConfigs,
      })
    : null;
  if (named !== undefined && !config) return { ok: false, reason: 'auth_config_missing' };
  const authType: McpAuthType = config
    ? config.authMode === 'dcr'
      ? 'oauth_dcr'
      : config.authMode === 'oauth_client'
        ? 'oauth_client'
        : config.authMode === 'shared_secret'
          ? 'api_key'
          : 'none'
    : (server?.authType ?? 'none');
  const userSubject = input.userId
    ? {
        kind: 'user_connection' as const,
        id: tokenSubject(input.installationId, input.componentId, input.userId),
      }
    : null;

  // Variables expand into the address and headers.
  const values = new Map<string, string>();
  try {
    const stored = await tx
      .select({
        name: installationVariableTable.name,
        sealed: installationVariableTable.valueSealed,
      })
      .from(installationVariableTable)
      .where(eq(installationVariableTable.installationId, input.installationId));
    for (const variable of stored) {
      values.set(
        variable.name,
        await deps.unsealer.unseal({
          purpose: 'installation_variable',
          orgId: input.organizationId,
          subject: {
            kind: 'installation',
            id: fieldSubjectId(input.installationId, variable.name),
          },
          envelope: variable.sealed,
        }),
      );
    }
  } catch {
    return { ok: false, reason: 'credential_unavailable' };
  }

  // A connection the user holds under the config in force: a key of their own, or values that
  // add to the variables.
  let own: typeof mcpOAuthTokenTable.$inferSelect | undefined;
  if (input.userId) {
    const userId = input.userId;
    [own] = await tx
      .select()
      .from(mcpOAuthTokenTable)
      .where(
        and(
          eq(mcpOAuthTokenTable.installationId, input.installationId),
          eq(mcpOAuthTokenTable.componentId, input.componentId),
          eq(mcpOAuthTokenTable.userId, userId),
        ),
      )
      .limit(1);
    if (own && config && own.authConfigId !== config.id) own = undefined;
  }
  let ownKey: string | null = null;
  if (own && own.kind !== 'oauth') {
    try {
      if (!own.credentialsSealed || !userSubject) throw new Error('no credentials');
      const opened = await deps.unsealer.unseal({
        purpose: 'connection_credentials',
        orgId: input.organizationId,
        subject: { ...userSubject, id: fieldSubjectId(userSubject.id, 'credentials') },
        envelope: own.credentialsSealed,
      });
      if (own.kind === 'api_key') ownKey = opened;
      else {
        for (const [name, value] of Object.entries(JSON.parse(opened) as Record<string, string>)) {
          values.set(name, value);
        }
      }
    } catch {
      return { ok: false, reason: 'credential_unavailable' };
    }
  }

  const headers: Record<string, string> = {};
  for (const [name, value] of Object.entries(metadata.headers ?? {})) {
    headers[name.toLowerCase()] = expandVariables(value, values);
  }
  const target: UpstreamTarget = { url: expandVariables(metadata.url, values), headers };
  const done = (): AccessResult => ({
    ok: true,
    target,
    authType,
    callTimeoutMs: server?.callTimeoutMs ?? null,
    serverName: row.name,
  });

  if (own && own.kind === 'env') return done();
  if (ownKey !== null) {
    headers['authorization'] = `Bearer ${ownKey}`;
    return done();
  }
  if (authType === 'none' && !config) return done();
  if (config?.authMode === 'user_form') return { ok: false, reason: 'not_connected' };

  try {
    if (config?.authMode === 'shared_secret') {
      if (!config.secretSealed) return { ok: false, reason: 'not_connected' };
      const key = await deps.unsealer.unseal({
        purpose: 'auth_config_secret',
        orgId: input.organizationId,
        subject: { kind: 'auth_config', id: config.id },
        envelope: config.secretSealed,
      });
      headers['authorization'] = `Bearer ${key}`;
      return done();
    }
    if (authType === 'none') return done();
    if (authType === 'api_key') {
      if (!server?.apiKeySealed) return { ok: false, reason: 'not_connected' };
      const key = await deps.unsealer.unseal({
        purpose: 'mcp_api_key',
        orgId: input.organizationId,
        subject: {
          kind: 'mcp_server',
          id: serverSubject(input.installationId, input.componentId),
        },
        envelope: server.apiKeySealed,
      });
      headers['authorization'] = `Bearer ${key}`;
      return done();
    }

    if (!input.userId || (!server && !config)) return { ok: false, reason: 'not_connected' };
    const userId = input.userId;
    return await tx.transaction(async (inner) => {
      const [token] = await inner
        .select()
        .from(mcpOAuthTokenTable)
        .where(
          and(
            eq(mcpOAuthTokenTable.installationId, input.installationId),
            eq(mcpOAuthTokenTable.componentId, input.componentId),
            eq(mcpOAuthTokenTable.userId, userId),
          ),
        )
        .limit(1)
        .for('update');
      if (!token || token.kind !== 'oauth' || (config && token.authConfigId !== config.id)) {
        return { ok: false, reason: 'not_connected' } as const;
      }
      if (token.status === 'needs_reauth') return { ok: false, reason: 'needs_reauth' } as const;
      const subject = {
        kind: 'user_connection' as const,
        id: tokenSubject(input.installationId, input.componentId, userId),
      };
      const open = (field: string, envelope: string) =>
        deps.unsealer.unseal({
          purpose: 'user_connection_token',
          orgId: input.organizationId,
          subject: { ...subject, id: fieldSubjectId(subject.id, field) },
          envelope,
        });

      const expired =
        token.expiresAt !== null && token.expiresAt.getTime() - REFRESH_MARGIN_MS <= now.getTime();
      if (!expired) {
        if (!token.accessSealed) return { ok: false, reason: 'not_connected' } as const;
        headers['authorization'] = `Bearer ${await open('access', token.accessSealed)}`;
        return done();
      }

      const registered = config ?? server;
      const metadata = registered?.oauthMetadata;
      if (!token.refreshSealed || !metadata || !registered?.oauthClientId) {
        await markNeedsReauth(inner, input, userId, now);
        return { ok: false, reason: 'needs_reauth' } as const;
      }
      const clientSecret = registered.oauthClientSecretSealed
        ? await deps.unsealer.unseal(
            config
              ? {
                  purpose: 'auth_config_client_secret',
                  orgId: input.organizationId,
                  subject: { kind: 'auth_config', id: config.id },
                  envelope: registered.oauthClientSecretSealed,
                }
              : {
                  purpose: 'oauth_client_secret',
                  orgId: input.organizationId,
                  subject: {
                    kind: 'mcp_server',
                    id: serverSubject(input.installationId, input.componentId),
                  },
                  envelope: registered.oauthClientSecretSealed,
                },
          )
        : undefined;
      let fresh;
      try {
        fresh = await refreshToken(
          deps.fetcher,
          metadata,
          { clientId: registered.oauthClientId, clientSecret },
          await open('refresh', token.refreshSealed),
        );
      } catch (error) {
        if (error instanceof OAuthError && error.code === 'oauth_invalid_grant') {
          await markNeedsReauth(inner, input, userId, now);
          return { ok: false, reason: 'needs_reauth' } as const;
        }
        return { ok: false, reason: 'refresh_failed' } as const;
      }
      const sealer = deps.sealerFor(inner);
      const seal = (field: string, plaintext: string) =>
        sealer.seal({
          purpose: 'user_connection_token',
          orgId: input.organizationId,
          subject: { ...subject, id: fieldSubjectId(subject.id, field) },
          plaintext,
        });
      await inner
        .update(mcpOAuthTokenTable)
        .set({
          accessSealed: await seal('access', fresh.accessToken),
          ...(fresh.refreshToken
            ? { refreshSealed: await seal('refresh', fresh.refreshToken) }
            : {}),
          expiresAt: fresh.expiresIn ? new Date(now.getTime() + fresh.expiresIn * 1000) : null,
          status: 'active',
          updatedAt: now,
        })
        .where(
          and(
            eq(mcpOAuthTokenTable.installationId, input.installationId),
            eq(mcpOAuthTokenTable.componentId, input.componentId),
            eq(mcpOAuthTokenTable.userId, userId),
          ),
        );
      headers['authorization'] = `Bearer ${fresh.accessToken}`;
      return done();
    });
  } catch {
    return { ok: false, reason: 'credential_unavailable' };
  }
}

/** Whether the installation row exists in the organization; used by callers that begin elsewhere. */
export async function installationExists(
  tx: Executor,
  organizationId: string,
  installationId: string,
): Promise<boolean> {
  const rows = await tx
    .select({ id: installationTable.id })
    .from(installationTable)
    .where(
      and(
        eq(installationTable.id, installationId),
        eq(installationTable.organizationId, organizationId),
      ),
    )
    .limit(1);
  return rows.length > 0;
}
