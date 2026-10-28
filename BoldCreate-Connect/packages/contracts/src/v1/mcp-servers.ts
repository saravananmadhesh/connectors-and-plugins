import * as z from 'zod/v4';
import { IdSchema } from './ids.js';

export const McpAuthTypeSchema = z.enum(['none', 'api_key', 'oauth_dcr', 'oauth_client']);
export type McpAuthTypeValue = z.infer<typeof McpAuthTypeSchema>;

export const McpHealthSchema = z.enum(['unknown', 'healthy', 'degraded', 'unreachable']);

/** Where the caller stands with a server that needs a member sign-in. */
export const McpConnectionStateSchema = z.enum([
  /** The server takes no per-member sign-in. */
  'not_required',
  'not_connected',
  'connected',
  /** The provider no longer accepts the member's tokens. */
  'needs_reauth',
]);

export const McpToolSchema = z.object({ name: z.string(), description: z.string() });

export const McpServerResponseSchema = z.object({
  installationId: IdSchema('ins'),
  componentId: IdSchema('cmp'),
  name: z.string(),
  transport: z.enum(['http', 'stdio']),
  /** The address with variables unexpanded, as the plugin declared it. */
  url: z.string().nullable(),
  authType: McpAuthTypeSchema,
  /** Last four characters of a stored API key, for display. */
  apiKeyLastFour: z.string().nullable(),
  oauthClientId: z.string().nullable(),
  oauthClientSecretSet: z.boolean(),
  /** Space-separated scopes set for sign-in, or null when the discovered ones are used. */
  oauthScopes: z.string().nullable(),
  /** The scopes the authorization server or the resource advertised. */
  oauthDiscoveredScopes: z.array(z.string()),
  /** Whether discovery has already found the authorization server. */
  oauthDiscovered: z.boolean(),
  callTimeoutMs: z.number().int().nullable(),
  health: McpHealthSchema,
  healthCheckedAt: z.iso.datetime().nullable(),
  /** A classified code, never upstream text. */
  lastError: z.string().nullable(),
  tools: z.array(McpToolSchema),
  toolsRefreshedAt: z.iso.datetime().nullable(),
  connection: McpConnectionStateSchema,
});
export type McpServerResponse = z.infer<typeof McpServerResponseSchema>;

/** Auth settings of one server. Secrets are write-only: `""` keeps what is stored. */
export const PutMcpAuthBodySchema = z
  .strictObject({
    authType: McpAuthTypeSchema,
    apiKey: z.string().max(4096).optional(),
    clientId: z.string().max(512).optional(),
    clientSecret: z.string().max(4096).optional(),
    /** Space-separated; `""` goes back to the discovered scopes. Omitted keeps what is stored. */
    scopes: z
      .string()
      .max(1024)
      .refine(
        (value) => value === '' || value.split(' ').every((scope) => /^[\x21-\x7E]+$/.test(scope)),
        'separate scopes with single spaces',
      )
      .optional(),
    callTimeoutMs: z.number().int().min(1000).max(120_000).nullable().optional(),
  })
  .refine((body) => body.authType !== 'oauth_client' || body.clientId !== '', {
    message: 'a client id is required',
    path: ['clientId'],
  });
export type PutMcpAuthBody = z.infer<typeof PutMcpAuthBodySchema>;

export const McpProbeResponseSchema = z.object({
  health: McpHealthSchema,
  lastError: z.string().nullable(),
  toolCount: z.number().int(),
  server: McpServerResponseSchema,
});
export type McpProbeResponse = z.infer<typeof McpProbeResponseSchema>;

/** What the server's published sign-in details say, for filling in the form. */
export const McpOAuthDiscoverResponseSchema = z.object({
  /** False when the server publishes no sign-in details. */
  discovered: z.boolean(),
  /** Whether the server lets this application register itself as a client. */
  dynamicRegistration: z.boolean(),
  scopes: z.array(z.string()),
  /** Where the provider sends the browser back; the address to give a self-made OAuth app. */
  callbackUrl: z.string(),
});
export type McpOAuthDiscoverResponse = z.infer<typeof McpOAuthDiscoverResponseSchema>;

/** A website sign-in start carries nothing; a host's return address belongs to its project. */
export const McpOAuthStartBodySchema = z.strictObject({});
export type McpOAuthStartBody = z.infer<typeof McpOAuthStartBodySchema>;

export const McpOAuthStartResponseSchema = z.object({ authorizeUrl: z.url() });
export type McpOAuthStartResponse = z.infer<typeof McpOAuthStartResponseSchema>;

/** What the provider sends the browser back with. */
export const McpOAuthCallbackQuerySchema = z.object({
  code: z.string().min(1).max(4096).optional(),
  state: z.string().min(1).max(512),
  error: z.string().max(200).optional(),
  iss: z.string().max(2048).optional(),
});
export type McpOAuthCallbackQuery = z.infer<typeof McpOAuthCallbackQuerySchema>;

/**
 * Set by the api on the callback's redirect when it sends the browser to a project's own page.
 * The web server then passes the address on as it is; without the header it keeps only the path.
 */
export const EXTERNAL_RETURN_HEADER = 'x-external-return';
