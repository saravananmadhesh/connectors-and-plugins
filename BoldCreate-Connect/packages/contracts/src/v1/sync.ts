import * as z from 'zod/v4';
import { IdSchema } from './ids.js';
import { ScopeKindSchema } from './scope.js';
import { UserPluginSetupSchema } from './user-plugin-state.js';

export const SYNC_KINDS = ['mcp', 'skill', 'rule', 'hook', 'agent'] as const;
export const SyncKindSchema = z.enum(SYNC_KINDS);
export type SyncKind = z.infer<typeof SyncKindSchema>;

/** Kinds delivered as files. MCP is delivered only as a gateway address, never as a file. */
export const SYNC_FILE_KINDS = ['skill', 'rule', 'hook', 'agent'] as const;
export const SyncFileKindSchema = z.enum(SYNC_FILE_KINDS);
export type SyncFileKind = z.infer<typeof SyncFileKindSchema>;

/** The client names what it can place on disk; the rest comes back as `skipped`. */
export const SyncQuerySchema = z.object({
  target: z
    .string()
    .regex(/^[a-z][a-z0-9-]{0,31}$/)
    .optional(),
  /** Comma separated kinds, for example `skill,rule,agent`. */
  kinds: z
    .string()
    .max(64)
    .regex(/^[a-z,]{1,64}$/)
    .optional(),
  /** Comma separated plugin names, to sync only those. */
  plugins: z
    .string()
    .max(1024)
    .regex(/^[a-z0-9,-]{1,1024}$/)
    .optional(),
});
export type SyncQuery = z.infer<typeof SyncQuerySchema>;

export const SyncComponentSchema = z.object({
  id: IdSchema('cmp'),
  kind: SyncFileKindSchema,
  name: z.string(),
  enabled: z.boolean(),
  /** Hash of this component's own archive; the same for every user of the version. */
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  sizeBytes: z.number().int(),
  /** API path of the brokered download. Never a storage address. */
  href: z.string(),
  /** Generic relative path (`skills/<name>`, ...). The host maps it to its agent's folders. */
  path: z.string(),
});

/** An MCP server, reached through the gateway with the session token. */
export const SyncMcpSchema = z.object({
  componentId: IdSchema('cmp'),
  name: z.string(),
  serverName: z.string(),
  url: z.string(),
  transport: z.literal('streamable-http'),
  description: z.string(),
  ready: z.boolean(),
  setup: UserPluginSetupSchema,
});

export const SyncEntrySchema = z.object({
  installationId: IdSchema('ins'),
  pluginId: IdSchema('plg'),
  pluginName: z.string(),
  versionId: IdSchema('pv'),
  version: z.string(),
  /** Where the installation lives; the most specific scope wins when a plugin is installed twice. */
  scope: ScopeKindSchema,
  /** A yanked version that is still installed keeps working; clients may warn. */
  yanked: z.boolean(),
  /** Hash of the archive bytes. Absent when the version has no archive to place. */
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  sizeBytes: z.number().int(),
  /** API path of the brokered download. Never a storage address. */
  href: z.string(),
  components: z.array(SyncComponentSchema),
  mcp: z.array(SyncMcpSchema),
  /** What is missing for the plugin's servers; `none` when every one is ready. */
  setup: UserPluginSetupSchema,
});
export type SyncEntry = z.infer<typeof SyncEntrySchema>;

export const SyncSkippedSchema = z.object({
  pluginId: IdSchema('plg'),
  versionId: IdSchema('pv'),
  componentId: IdSchema('cmp').nullable(),
  kind: SyncKindSchema.nullable(),
  reason: z.enum(['unsupported_kind', 'no_archive']),
});

export const SyncResponseSchema = z.object({
  /** Same value as the `ETag` header, without quotes. */
  revision: z.string(),
  /** Seconds the client should wait before asking again; jittered per key. */
  pollAfterSeconds: z.number().int(),
  entries: z.array(SyncEntrySchema),
  skipped: z.array(SyncSkippedSchema),
});
export type SyncResponse = z.infer<typeof SyncResponseSchema>;

export const SyncReportBodySchema = z.strictObject({
  target: z
    .string()
    .regex(/^[a-z][a-z0-9-]{0,31}$/)
    .optional(),
  applied: z
    .array(
      z.union([
        z.strictObject({
          componentId: IdSchema('cmp'),
          sha256: z.string().regex(/^[a-f0-9]{64}$/),
        }),
        // The earlier shape, kept so existing clients keep working.
        z.strictObject({ versionId: IdSchema('pv'), sha256: z.string().regex(/^[a-f0-9]{64}$/) }),
      ]),
    )
    .max(500),
  skipped: z
    .array(z.strictObject({ versionId: IdSchema('pv'), kind: SyncKindSchema.optional() }))
    .max(500)
    .default([]),
});
export type SyncReportBody = z.infer<typeof SyncReportBodySchema>;

export const ArchiveParamsSchema = z.object({ pluginVersionId: IdSchema('pv') });

export const ComponentArchiveParamsSchema = z.object({
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
});
