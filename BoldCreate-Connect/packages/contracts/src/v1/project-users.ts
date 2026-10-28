import * as z from 'zod/v4';
import { IsoDateTimeSchema, PageSchema } from './common.js';
import { IdSchema } from './ids.js';
import { ProjectKeyScopeSchema, ProjectStatusSchema } from './projects.js';

const REFERENCE_MAX = 255;

/** Whether the text has a control character (the C0 range or DEL). */
function hasControlCharacter(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code < 0x20 || code === 0x7f) return true;
  }
  return false;
}

/**
 * The host's own id for one of its users: any text of 1 to 255 characters without control
 * characters. It is kept exactly as sent, so `A` and `a` are two users.
 */
export const ProjectUserRefSchema = z
  .string()
  .min(1)
  .max(REFERENCE_MAX)
  .refine((value) => !hasControlCharacter(value), {
    message: 'must not contain control characters',
  });
export type ProjectUserRef = z.infer<typeof ProjectUserRefSchema>;

export const PutProjectUserBodySchema = z.strictObject({
  userId: ProjectUserRefSchema,
  displayName: z.string().trim().min(1).max(80).optional(),
});
export type PutProjectUserBody = z.infer<typeof PutProjectUserBodySchema>;

export const ProjectUserListQuerySchema = z.strictObject({
  cursor: z.string().max(512).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  /** The host's own id, matched exactly. An unknown id gives an empty page. */
  userId: ProjectUserRefSchema.optional(),
  /** Users whose own id starts with this text. */
  search: z.string().min(1).max(REFERENCE_MAX).optional(),
});
export type ProjectUserListQuery = z.infer<typeof ProjectUserListQuerySchema>;

/** The platform user id appears in a path only on console routes. */
export const ConsoleProjectUserParamsSchema = z.object({
  orgId: IdSchema('org'),
  projectId: IdSchema('prj'),
  projectUserId: IdSchema('usr'),
});
export const ConsoleProjectUsersParamsSchema = z.object({
  orgId: IdSchema('org'),
  projectId: IdSchema('prj'),
});

export const ProjectUserStatusSchema = z.enum(['active', 'suspended']);

export const ProjectUserResponseSchema = z.object({
  /** The platform's id for the user, used in paths. */
  id: IdSchema('usr'),
  /** The host's own id, as the host sent it. */
  userId: z.string(),
  displayName: z.string(),
  status: ProjectUserStatusSchema,
  createdAt: IsoDateTimeSchema,
  lastSeenAt: IsoDateTimeSchema.nullable(),
  sessionCount: z.number().int().nonnegative(),
  connectionCount: z.number().int().nonnegative(),
  /** When the user's agent last reported what it applied, or null if it never has. */
  lastSyncedAt: IsoDateTimeSchema.nullable(),
  /** MCP servers the user has that still need a variable, a sign-in or a config before use. */
  connectionsMissing: z.number().int().nonnegative(),
});
export type ProjectUserResponse = z.infer<typeof ProjectUserResponseSchema>;

export const ProjectUserPageSchema = PageSchema(ProjectUserResponseSchema);

/** What a project key says about itself and its project; nothing about the project's users. */
export const ProjectMeResponseSchema = z.object({
  project: z.object({
    id: IdSchema('prj'),
    name: z.string(),
    status: ProjectStatusSchema,
  }),
  key: z.object({
    prefix: z.string(),
    scopes: z.array(ProjectKeyScopeSchema),
    expiresAt: IsoDateTimeSchema,
  }),
});
export type ProjectMeResponse = z.infer<typeof ProjectMeResponseSchema>;
