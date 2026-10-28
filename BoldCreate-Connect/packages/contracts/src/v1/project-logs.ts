import * as z from 'zod/v4';
import { IsoDateTimeSchema, PageSchema } from './common.js';
import { IdSchema } from './ids.js';
import { ProjectUserRefSchema } from './project-users.js';

export const PROJECT_LOG_RESULTS = ['success', 'denied', 'failure'] as const;

export const ProjectLogQuerySchema = z.strictObject({
  cursor: z.string().max(512).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  /** The host's own id of the user, matched exactly. An unknown id gives an empty page. */
  userId: ProjectUserRefSchema.optional(),
  /** One action, such as `mcp_tool.called`. */
  action: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z_.]+$/)
    .optional(),
  from: IsoDateTimeSchema.optional(),
  to: IsoDateTimeSchema.optional(),
});
export type ProjectLogQuery = z.infer<typeof ProjectLogQuerySchema>;

export const ConsoleProjectLogsParamsSchema = z.object({
  orgId: IdSchema('org'),
  projectId: IdSchema('prj'),
});

/** One event of a project. Only a few keys of the event's context are ever shown. */
export const ProjectLogResponseSchema = z.object({
  id: z.string(),
  action: z.string(),
  result: z.enum(PROJECT_LOG_RESULTS),
  createdAt: IsoDateTimeSchema,
  user: z.object({ id: IdSchema('usr'), userId: z.string().nullable() }).nullable(),
  target: z.object({ kind: z.string(), id: z.string() }).nullable(),
  tool: z.string().optional(),
  outcome: z.string().optional(),
  durationMs: z.number().int().nonnegative().optional(),
  appliedCount: z.number().int().nonnegative().optional(),
});
export type ProjectLogResponse = z.infer<typeof ProjectLogResponseSchema>;

export const ProjectLogPageSchema = PageSchema(ProjectLogResponseSchema);

export const ProjectUsageQuerySchema = z.strictObject({
  from: IsoDateTimeSchema.optional(),
  to: IsoDateTimeSchema.optional(),
});
export type ProjectUsageQuery = z.infer<typeof ProjectUsageQuerySchema>;

export const ProjectUsageResponseSchema = z.object({
  from: IsoDateTimeSchema,
  to: IsoDateTimeSchema,
  days: z.array(
    z.object({
      date: z.string(),
      activeUsers: z.number().int().nonnegative(),
      toolCalls: z.number().int().nonnegative(),
      errors: z.number().int().nonnegative(),
    }),
  ),
  topUsers: z.array(
    z.object({
      id: IdSchema('usr'),
      userId: z.string().nullable(),
      toolCalls: z.number().int().nonnegative(),
    }),
  ),
});
export type ProjectUsageResponse = z.infer<typeof ProjectUsageResponseSchema>;
