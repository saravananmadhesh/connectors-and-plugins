import * as z from 'zod/v4';
import { IsoDateTimeSchema, PageSchema } from './common.js';
import { IdInputSchema, IdSchema } from './ids.js';
import { ProjectUserRefSchema } from './project-users.js';
import { CUSTOM_VARIABLE_NAME_PATTERN, VARIABLE_VALUE_MAX_BYTES } from './variables.js';
import { ProjectParamsSchema } from './projects.js';

/** The sign-in a user made to one MCP server; the tokens themselves are never shown. */
export const ConnectionStatusSchema = z.enum(['active', 'needs_reauth']);
export type ConnectionStatus = z.infer<typeof ConnectionStatusSchema>;

export const ConnectionKindSchema = z.enum(['oauth', 'api_key', 'env']);
export type ConnectionKind = z.infer<typeof ConnectionKindSchema>;

export const ConnectionResponseSchema = z.object({
  id: IdSchema('ucn'),
  /** The host's own id for the user the connection belongs to. */
  userId: z.string(),
  componentId: IdSchema('cmp'),
  serverName: z.string(),
  /** The auth config the connection was made with; null when none was in force. */
  authConfigId: IdSchema('acf').nullable(),
  kind: ConnectionKindSchema,
  /** The names of the values a connection of kind `env` holds; never the values. */
  valueNames: z.array(z.string()),
  status: ConnectionStatusSchema,
  expiresAt: IsoDateTimeSchema.nullable(),
  createdAt: IsoDateTimeSchema,
});
export type ConnectionResponse = z.infer<typeof ConnectionResponseSchema>;

export const ConnectionPageSchema = PageSchema(ConnectionResponseSchema);

const CALLBACK_URL_MAX = 2048;

/** A session's user starts a sign-in to one of the servers they can reach. */
export const StartSessionConnectionBodySchema = z.strictObject({
  componentId: IdInputSchema('cmp'),
  /** Where the browser goes back to; one of the project's registered origins. */
  callbackUrl: z.string().min(1).max(CALLBACK_URL_MAX),
});
export type StartSessionConnectionBody = z.infer<typeof StartSessionConnectionBodySchema>;

export const StartSessionConnectionResponseSchema = z.object({ redirectUrl: z.string() });
export type StartSessionConnectionResponse = z.infer<typeof StartSessionConnectionResponseSchema>;

/** The host starts a sign-in for one of its users. */
export const StartProjectConnectionBodySchema = StartSessionConnectionBodySchema.extend({
  userId: ProjectUserRefSchema,
});
export type StartProjectConnectionBody = z.infer<typeof StartProjectConnectionBodySchema>;

export const StartProjectConnectionResponseSchema = z.object({
  /** Where to send the user's browser; it expires at `expiresAt`. */
  connectUrl: z.string(),
  expiresAt: IsoDateTimeSchema,
});
export type StartProjectConnectionResponse = z.infer<typeof StartProjectConnectionResponseSchema>;

/**
 * The host gives one user their own credentials for an MCP server: one API key, or a set of values
 * that fill the server's address and headers. Write only; the connection reads back with its
 * kind and the names of the values.
 */
export const PutProjectConnectionBodySchema = z
  .strictObject({
    userId: ProjectUserRefSchema,
    componentId: IdInputSchema('cmp'),
    /** The config the connection is made under; the one in force for the user when absent. */
    authConfigId: IdInputSchema('acf').optional(),
    apiKey: z.string().min(1).max(8192).optional(),
    values: z
      .record(
        z.string().regex(CUSTOM_VARIABLE_NAME_PATTERN),
        z
          .string()
          .min(1)
          .refine((value) => new TextEncoder().encode(value).length <= VARIABLE_VALUE_MAX_BYTES, {
            message: `at most ${VARIABLE_VALUE_MAX_BYTES} bytes`,
          }),
      )
      .optional(),
  })
  .superRefine((body, ctx) => {
    const given = Number(body.apiKey !== undefined) + Number(body.values !== undefined);
    if (given !== 1) {
      ctx.addIssue({ code: 'custom', path: ['apiKey'], message: 'send either apiKey or values' });
    }
    if (body.values !== undefined) {
      const count = Object.keys(body.values).length;
      if (count < 1 || count > 20) {
        ctx.addIssue({ code: 'custom', path: ['values'], message: 'between 1 and 20 values' });
      }
    }
  });
export type PutProjectConnectionBody = z.infer<typeof PutProjectConnectionBodySchema>;

export const ConnectionListQuerySchema = z.strictObject({
  cursor: z.string().max(512).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  userId: ProjectUserRefSchema.optional(),
  componentId: IdInputSchema('cmp').optional(),
});
export type ConnectionListQuery = z.infer<typeof ConnectionListQuerySchema>;

export const SessionConnectionListQuerySchema = z.strictObject({
  cursor: z.string().max(512).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
});
export type SessionConnectionListQuery = z.infer<typeof SessionConnectionListQuerySchema>;

export const ConnectionParamsSchema = z.object({ connectionId: IdSchema('ucn') });
export const ConsoleConnectionParamsSchema = ProjectParamsSchema.extend({
  connectionId: IdSchema('ucn'),
});
