import * as z from 'zod/v4';
import { ApiKeyPrincipalSchema } from './principal.js';

/** The gateway asks the api to check a bearer key; the key travels in the body, never in a URL. */
export const GatewayAuthenticateBodySchema = z.object({
  key: z.string().min(1).max(512),
  /** Address of the agent, kept as the key's last-used information. */
  ip: z.string().max(64).optional(),
});
export type GatewayAuthenticateBody = z.infer<typeof GatewayAuthenticateBodySchema>;

/** `identity` is null for any key that is not valid, without saying which part is wrong. */
export const GatewayAuthenticateResponseSchema = z.object({
  identity: z.object({ keyRowId: z.string(), principal: ApiKeyPrincipalSchema }).nullable(),
});
export type GatewayAuthenticateResponse = z.infer<typeof GatewayAuthenticateResponseSchema>;

/** The MCP servers one key can reach; the api checks the key again, so a body cannot name a tenant. */
export const GatewayServersBodySchema = z.object({
  key: z.string().min(1).max(512),
  /** Limits the answer to one server by its canonical name. */
  only: z.string().min(1).max(128).optional(),
});
export type GatewayServersBody = z.infer<typeof GatewayServersBodySchema>;

export const GatewayServerSchema = z.object({
  name: z.string(),
  installationId: z.string(),
  componentId: z.string(),
  pluginName: z.string(),
  authType: z.enum(['none', 'api_key', 'oauth_dcr', 'oauth_client']),
  tools: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      inputSchema: z.record(z.string(), z.unknown()),
      destructive: z.boolean().optional(),
    }),
  ),
  discovered: z.boolean(),
});

export const GatewayServersResponseSchema = z.object({
  servers: z.array(GatewayServerSchema),
});
export type GatewayServersResponse = z.infer<typeof GatewayServersResponseSchema>;

/** The credential for one call to one server of a key; the api opens the sealed values. */
export const GatewayAccessBodySchema = z.object({
  key: z.string().min(1).max(512),
  installationId: z.string().min(1).max(128),
  componentId: z.string().min(1).max(128),
});
export type GatewayAccessBody = z.infer<typeof GatewayAccessBodySchema>;

export const GatewayAccessResponseSchema = z.discriminatedUnion('ok', [
  z.object({
    ok: z.literal(true),
    target: z.object({ url: z.string(), headers: z.record(z.string(), z.string()) }),
    authType: z.enum(['none', 'api_key', 'oauth_dcr', 'oauth_client']),
    callTimeoutMs: z.number().nullable(),
    serverName: z.string(),
  }),
  z.object({
    ok: z.literal(false),
    reason: z.enum([
      'not_found',
      'transport_unsupported',
      'not_connected',
      'auth_config_missing',
      'needs_reauth',
      'credential_unavailable',
      'refresh_failed',
    ]),
  }),
]);
export type GatewayAccessResponse = z.infer<typeof GatewayAccessResponseSchema>;

/** The usage record of one tool call. */
export const GatewayUsageBodySchema = z.object({
  key: z.string().min(1).max(512),
  server: z.string().min(1).max(128),
  tool: z.string().min(1).max(256),
  outcome: z.string().min(1).max(64),
  durationMs: z.number().int().min(0).max(3_600_000),
  requestId: z.string().min(1).max(128),
  ip: z.string().max(64).optional(),
});
export type GatewayUsageBody = z.infer<typeof GatewayUsageBodySchema>;

export const GatewayUsageResponseSchema = z.object({ recorded: z.literal(true) });

/**
 * The limits an administrator has set, by key. A key with no stored value is absent, so the
 * gateway keeps its own configuration for it. Numbers only; nothing else is exposed.
 */
export const GatewayLimitsResponseSchema = z.object({
  values: z.record(z.string(), z.number().int()),
});
export type GatewayLimitsResponse = z.infer<typeof GatewayLimitsResponseSchema>;
