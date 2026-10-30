/**
 * MCP server routes: the details view of an installed MCP component (auth type, test, tools) and
 * the member sign-in. Upstream calls run between two short database steps, never inside one.
 */
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { withTenant, type Db } from '@boldcreate-integrations/db';
import {
  AppError,
  EXTERNAL_RETURN_HEADER,
  McpOAuthCallbackQuerySchema,
  McpOAuthStartBodySchema,
  PutMcpAuthBodySchema,
  formatId,
  type McpOAuthCallbackQuery,
} from '@boldcreate-integrations/contracts';
import {
  beginOAuth,
  consumeExternalOAuthState,
  consumeOAuthState,
  disconnectMcpServer,
  discoverOAuthScopes,
  exchangeOAuthCode,
  OAuthExchangeError,
  getMcpServer,
  isExternalState,
  listMcpServers,
  planOAuthDiscovery,
  planOAuthStart,
  planProbe,
  prepareOAuth,
  putMcpAuth,
  recordProbe,
  runProbe,
  stateOrganization,
  storeOAuthTokens,
  type AccessDeps,
} from '@boldcreate-integrations/domain';
import { authenticate, inTenant } from '../auth/principal.js';
import { serializeList, serializeMcpServer } from '../serializers/serializers.js';
import { hostOf, traceNote, traced } from './oauth-trace.js';
import { scopeRunner } from './scoped.js';

export interface McpRuntime {
  deps: AccessDeps;
  /** Where the provider sends the browser back to; the web app proxies it to the api. */
  redirectUri: string;
  /** Where the browser lands after the sign-in finishes. */
  appBaseUrl: string;
}

type Run = ReturnType<typeof scopeRunner>;

function registerServerRoutes(app: FastifyInstance, runtime: McpRuntime, run: Run): void {
  const { deps } = runtime;
  type Params = { installationId: string; componentId: string };

  app.get('/installations/:installationId/mcp-servers', async (req, reply) => {
    const { installationId } = req.params as Params;
    const result = await run(req, 'mcp-server:list', (tx, principal, scope) =>
      listMcpServers(tx, principal, scope, installationId),
    );
    return reply.status(200).send(serializeList(result, serializeMcpServer));
  });

  app.get('/installations/:installationId/mcp-servers/:componentId', async (req, reply) => {
    const { installationId, componentId } = req.params as Params;
    const result = await run(req, 'mcp-server:read', (tx, principal, scope) =>
      getMcpServer(tx, principal, scope, installationId, componentId),
    );
    return reply.status(200).send(serializeMcpServer(result));
  });

  app.put('/installations/:installationId/mcp-servers/:componentId/auth', async (req, reply) => {
    const { installationId, componentId } = req.params as Params;
    const parsed = PutMcpAuthBodySchema.safeParse(req.body);
    const result = await run(req, 'mcp-server:update', async (tx, principal, scope) => {
      if (!parsed.success) throw new AppError('validation_failed', []);
      return putMcpAuth(
        tx,
        principal,
        scope,
        installationId,
        componentId,
        parsed.data,
        deps.sealerFor(tx),
      );
    });
    return reply.status(200).send(serializeMcpServer(result));
  });

  app.post('/installations/:installationId/mcp-servers/:componentId/test', async (req, reply) => {
    const { installationId, componentId } = req.params as Params;
    const plan = await run(req, 'mcp-server:test', (tx, principal, scope) =>
      planProbe(tx, principal, scope, installationId, componentId, deps),
    );
    const outcome = await runProbe(deps.fetcher, plan);
    const server = await run(req, 'mcp-server:test', (tx, principal, scope) =>
      recordProbe(tx, principal, scope, installationId, componentId, outcome),
    );
    return reply.status(200).send({
      health: server.health,
      lastError: server.lastError,
      toolCount: server.tools.length,
      server: serializeMcpServer(server),
    });
  });

  app.post(
    '/installations/:installationId/mcp-servers/:componentId/oauth/discover',
    async (req, reply) => {
      const { installationId, componentId } = req.params as Params;
      const url = await run(req, 'mcp-server:test', (tx, principal, scope) =>
        planOAuthDiscovery(tx, principal, scope, installationId, componentId),
      );
      const found = await discoverOAuthScopes(deps.fetcher, url);
      return reply.status(200).send({ ...found, callbackUrl: runtime.redirectUri });
    },
  );

  app.post(
    '/installations/:installationId/mcp-servers/:componentId/oauth/start',
    async (req, reply) => {
      const { installationId, componentId } = req.params as Params;
      const parsed = McpOAuthStartBodySchema.safeParse(req.body ?? {});
      const ids = { installationId, componentId };
      const plan = await traced(req, 'member', 'start.plan', ids, () =>
        run(req, 'user-connection:authorize', (tx, principal, scope) => {
          if (!parsed.success) {
            throw new AppError(
              'validation_failed',
              parsed.error.issues.map((issue) => ({
                field: issue.path.join('.'),
                message: issue.message,
              })),
            );
          }
          return planOAuthStart(tx, principal, scope, installationId, componentId, deps.unsealer);
        }),
      );
      const planned = {
        ...ids,
        authType: plan.authType,
        hasStoredClient: plan.client !== null,
        hasStoredMetadata: plan.metadata !== null,
        usesAuthConfig: plan.authConfig !== null,
        serverHost: hostOf(plan.url),
      };
      const prepared = await traced(req, 'member', 'start.prepare', planned, () =>
        prepareOAuth(
          deps.fetcher,
          plan,
          runtime.redirectUri,
          // The provider's reason stays in the log; the member sees only the classified failure.
          (rejection) => req.log.warn({ registration: rejection }, 'client registration refused'),
        ),
      );
      const result = await traced(
        req,
        'member',
        'start.begin',
        {
          ...ids,
          registered: prepared.registered,
          redirectUri: runtime.redirectUri,
          issuer: prepared.metadata.issuer,
          authorizeHost: hostOf(prepared.metadata.authorizationEndpoint),
          tokenHost: hostOf(prepared.metadata.tokenEndpoint),
        },
        () =>
          run(req, 'user-connection:authorize', (tx, principal, scope) =>
            beginOAuth(
              tx,
              principal,
              scope,
              installationId,
              componentId,
              prepared,
              runtime.redirectUri,
              deps.sealerFor(tx),
            ),
          ),
      );
      await sealSelfCheck(req, ids, run);
      return reply.status(200).send(result);
    },
  );

  /**
   * Seals a throwaway value to the organization's key and opens it again, then logs the outcome.
   * A failure here means the stored key pair is broken; a pass with a later failure at the
   * callback means the context the value was sealed under differs. It never fails the sign-in.
   */
  async function sealSelfCheck(
    req: FastifyRequest,
    ids: { installationId: string; componentId: string },
    runScoped: Run,
  ): Promise<void> {
    try {
      await traced(req, 'member', 'start.seal-selfcheck', ids, () =>
        runScoped(req, 'user-connection:authorize', async (tx, principal, scope) => {
          const context = {
            purpose: 'oauth_state_verifier' as const,
            orgId: scope.organizationId,
            subject: { kind: 'user_connection' as const, id: `selfcheck:${principal.userId}` },
          };
          const envelope = await deps.sealerFor(tx).seal({ ...context, plaintext: 'selfcheck' });
          await deps.unsealer.unseal({ ...context, envelope });
        }),
      );
    } catch {
      // Already logged by the step.
    }
  }

  app.delete(
    '/installations/:installationId/mcp-servers/:componentId/oauth',
    async (req, reply) => {
      const { installationId, componentId } = req.params as Params;
      await run(req, 'user-connection:delete', (tx, principal, scope) =>
        disconnectMcpServer(tx, principal, scope, installationId, componentId),
      );
      return reply.status(204).send();
    },
  );
}

/** The browser's return from the provider: finish the sign-in, then go back to the installed view. */
function registerCallback(app: FastifyInstance, db: Db, runtime: McpRuntime): void {
  const { deps } = runtime;
  const back = (query: Record<string, string>) => {
    const url = new URL('/installed', runtime.appBaseUrl);
    url.searchParams.set('tab', 'mcp');
    for (const [key, value] of Object.entries(query)) url.searchParams.set(key, value);
    return url.toString();
  };

  /**
   * A sign-in a host's call started for a project: no website session, the
   * state is the proof. The browser goes back to the host's page with the outcome and the host's
   * own `clientState`.
   */
  async function finishExternalFlow(
    req: FastifyRequest,
    reply: FastifyReply,
    query: McpOAuthCallbackQuery,
    orgId: string,
  ) {
    const { landing, consumed } = await traced(req, 'project', 'state.consume', { orgId }, () =>
      consumeExternalOAuthState(db, orgId, query.state, deps.unsealer),
    );
    const land = (outcome: string) => {
      const url = new URL(landing.returnUrl);
      url.searchParams.set('connection', outcome);
      url.searchParams.set('server', formatId('cmp', landing.componentId));
      if (landing.clientState !== null) url.searchParams.set('clientState', landing.clientState);
      return reply
        .header(EXTERNAL_RETURN_HEADER, '1')
        .header('cache-control', 'no-store')
        .header('referrer-policy', 'no-referrer')
        .redirect(url.toString(), 302);
    };
    const flow = {
      orgId,
      projectId: landing.projectId,
      componentId: landing.componentId,
    };
    if (!consumed) {
      traceNote(req, 'project', 'state.unknown', flow);
      return land('oauth_state_invalid');
    }
    if (query.error || !query.code) {
      traceNote(req, 'project', 'denied', { ...flow, upstreamError: query.error });
      return land('denied');
    }
    const code = query.code;
    try {
      const tokens = await traced(
        req,
        'project',
        'token.exchange',
        {
          ...flow,
          issuer: consumed.metadata.issuer,
          tokenHost: hostOf(consumed.metadata.tokenEndpoint),
          redirectUri: consumed.redirectUri,
          hasClientSecret: consumed.client.clientSecret !== undefined,
          issuerChecked: query.iss !== undefined,
        },
        () => exchangeOAuthCode(deps.fetcher, consumed, code, query.iss),
      );
      if (landing.projectId !== null) {
        // A project user is no member of the organization; the project and the user are the subject.
        const projectId = landing.projectId;
        await traced(req, 'project', 'token.store', flow, () =>
          withTenant(db, { orgId, userId: landing.userId }, (tx) =>
            storeOAuthTokens(
              tx,
              { userId: landing.userId },
              orgId,
              consumed,
              tokens,
              deps.sealerFor(tx),
              new Date(),
              { projectId },
            ),
          ),
        );
      }
    } catch (error) {
      if (error instanceof AppError) return land(error.code);
      req.log.error({ err: error }, 'connection callback failed');
      return land('oauth_exchange_failed');
    }
    return land('connected');
  }

  /** What the callback sent back: the status and the outcome in the address; no query values beyond it. */
  const logReturn = async (req: FastifyRequest, reply: FastifyReply, payload: unknown) => {
    const location = reply.getHeader('location');
    let returned: Record<string, unknown> = {};
    if (typeof location === 'string') {
      try {
        const url = new URL(location, runtime.appBaseUrl);
        returned = {
          host: url.host,
          path: url.pathname,
          oauth: url.searchParams.get('oauth') ?? undefined,
          connection: url.searchParams.get('connection') ?? undefined,
        };
      } catch {
        returned = { host: 'invalid' };
      }
    }
    req.log.debug(
      { oauth: { flow: 'callback', step: 'respond', status: reply.statusCode, returned } },
      'oauth step',
    );
    return payload;
  };

  app.get('/oauth/callback', { onSend: logReturn }, async (req, reply) => {
    const parsed = McpOAuthCallbackQuerySchema.safeParse(req.query);
    if (!parsed.success) throw new AppError('validation_failed', []);
    const query = parsed.data;
    const orgId = stateOrganization(query.state);
    traceNote(req, 'callback', 'received', {
      orgId,
      hasCode: query.code !== undefined,
      hasIss: query.iss !== undefined,
      // The upstream's own error name, such as `access_denied`; it holds no secret.
      upstreamError: query.error,
    });
    if (!orgId) throw new AppError('oauth_state_invalid');
    const external = await traced(req, 'callback', 'state.kind', { orgId }, () =>
      isExternalState(db, orgId, query.state),
    );
    if (external) {
      traceNote(req, 'callback', 'project-flow', { orgId });
      return finishExternalFlow(req, reply, query, orgId);
    }
    const principal = await traced(req, 'callback', 'session', { orgId }, () =>
      authenticate(db, req, orgId),
    );
    const consumed = await traced(req, 'callback', 'state.consume', { orgId }, () =>
      inTenant(db, principal, (tx) => consumeOAuthState(tx, principal, query.state, deps.unsealer)),
    );
    const scope = consumed.scope.type === 'user' ? 'me' : 'org';
    const landing = { scope };
    const flow = {
      orgId,
      installationId: consumed.installationId,
      componentId: consumed.componentId,
      scope,
    };
    if (query.error || !query.code) {
      traceNote(req, 'callback', 'denied', flow);
      return reply.redirect(back({ ...landing, oauth: 'denied' }), 302);
    }
    try {
      const tokens = await traced(
        req,
        'callback',
        'token.exchange',
        {
          ...flow,
          issuer: consumed.metadata.issuer,
          tokenHost: hostOf(consumed.metadata.tokenEndpoint),
          redirectUri: consumed.redirectUri,
          hasClientSecret: consumed.client.clientSecret !== undefined,
          issuerChecked: query.iss !== undefined,
        },
        () => exchangeOAuthCode(deps.fetcher, consumed, query.code as string, query.iss),
      );
      await traced(
        req,
        'callback',
        'token.store',
        {
          ...flow,
          hasRefreshToken: tokens.refreshToken !== undefined,
          expiresIn: tokens.expiresIn,
          scopeGranted: tokens.scope,
        },
        () =>
          inTenant(db, principal, (tx) =>
            storeOAuthTokens(tx, principal, orgId, consumed, tokens, deps.sealerFor(tx)),
          ),
      );
    } catch (error) {
      if (error instanceof AppError) {
        // What the authorization server said, so the member (and support) can see why.
        const detail = error instanceof OAuthExchangeError ? error.detail : undefined;
        req.log.warn({ code: error.code, detail }, 'mcp sign-in did not complete');
        return reply.redirect(
          back({ ...landing, oauth: error.code, ...(detail ? { detail } : {}) }),
          302,
        );
      }
      throw error;
    }
    traceNote(req, 'callback', 'connected', flow);
    return reply.redirect(
      back({ ...landing, oauth: 'connected', server: formatId('cmp', consumed.componentId) }),
      302,
    );
  });
}

export async function mcpRoutes(
  app: FastifyInstance,
  opts: { db: Db; runtime: McpRuntime },
): Promise<void> {
  const { db, runtime } = opts;
  const mount = async (prefix: string, kind: 'org' | 'user'): Promise<void> => {
    await app.register(
      async (sub) => {
        registerServerRoutes(sub, runtime, scopeRunner(db, kind));
      },
      { prefix },
    );
  };
  await mount('/orgs/:orgId', 'org');
  await mount('/orgs/:orgId/me', 'user');
  registerCallback(app, db, runtime);
}
