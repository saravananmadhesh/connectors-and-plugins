import * as z from 'zod/v4';

/**
 * Typed ids.
 *
 * Every id on the wire is `<prefix>_<32 hex>`: the row uuid without dashes. Domain code and the
 * database only ever see the uuid; the API boundary converts with `formatId` and `parseId`.
 */

declare const idBrand: unique symbol;

/** A wire id. The brand makes ids of different resources incompatible at compile time. */
export type Id<P extends string> = string & { readonly [idBrand]: P };

export const ID_PREFIXES = {
  user: 'usr',
  org: 'org',
  invite: 'inv',
  session: 'ses',
  plugin: 'plg',
  pluginVersion: 'pv',
  component: 'cmp',
  installation: 'ins',
  apiKey: 'key',
  auditEvent: 'evt',
  orgKey: 'okey',
  source: 'src',
  job: 'job',
  category: 'cat',
  mcpServer: 'mcs',
  userConnection: 'ucn',
  killSwitch: 'ksw',
  tool: 'tol',
  toolChange: 'tch',
  project: 'prj',
  projectKey: 'pjk',
  pluginSet: 'pls',
  webhookDelivery: 'whd',
  projectSession: 'pjs',
  authConfig: 'acf',
} as const;

export type IdPrefix = (typeof ID_PREFIXES)[keyof typeof ID_PREFIXES];

export type UserId = Id<'usr'>;
export type OrgId = Id<'org'>;
export type ProjectId = Id<'prj'>;
export type ProjectKeyId = Id<'pjk'>;
export type InviteId = Id<'inv'>;
export type SessionId = Id<'ses'>;
export type PluginId = Id<'plg'>;
export type PluginVersionId = Id<'pv'>;
export type ComponentId = Id<'cmp'>;
export type InstallationId = Id<'ins'>;
export type ApiKeyId = Id<'key'>;
export type AuditEventId = Id<'evt'>;
export type OrgKeyId = Id<'okey'>;
// Declared now so later work does not edit this file.
export type SourceId = Id<'src'>;
export type JobId = Id<'job'>;
export type CategoryId = Id<'cat'>;
export type McpServerId = Id<'mcs'>;
export type UserConnectionId = Id<'ucn'>;
export type KillSwitchId = Id<'ksw'>;
export type ToolId = Id<'tol'>;
export type ToolChangeId = Id<'tch'>;

/** Removes the id brand, so a wire type describes what domain code produces (plain uuids). */
export type Plain<T> = T extends { readonly [idBrand]: unknown }
  ? string
  : T extends readonly (infer U)[]
    ? Plain<U>[]
    : T extends object
      ? { [K in keyof T]: Plain<T[K]> }
      : T;

export class InvalidIdError extends Error {
  constructor(prefix: string, value: string) {
    super(`Invalid ${prefix} id: ${value.slice(0, 80)}`);
    this.name = 'InvalidIdError';
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const PREFIX = /^[a-z]{2,4}$/;
const HEX32 = /^[0-9a-f]{32}$/;

/** The 32 hex characters of `<prefix>_<hex>`, or null when the value has another shape. */
function hexOf(prefix: string, value: string): string | null {
  const head = `${prefix}_`;
  if (!value.startsWith(head)) return null;
  const hex = value.slice(head.length);
  return HEX32.test(hex) ? hex : null;
}

/** `formatId('org', uuid)` is `org_` plus the 32 hex characters of the uuid. */
export function formatId<P extends string>(prefix: P, uuid: string): Id<P> {
  if (!PREFIX.test(prefix) || !UUID.test(uuid)) throw new InvalidIdError(prefix, uuid);
  return `${prefix}_${uuid.replaceAll('-', '')}` as Id<P>;
}

/** Turns a wire id back into the row uuid (with dashes). Throws `InvalidIdError`. */
export function parseId(prefix: string, value: string): string {
  const hex = hexOf(prefix, value);
  if (hex === null) throw new InvalidIdError(prefix, value);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** Wire form of an id, for response schemas. */
export function IdSchema<P extends IdPrefix>(prefix: P) {
  return z
    .string()
    .refine((value) => hexOf(prefix, value) !== null, `must be a ${prefix}_ id`)
    .transform((value) => value as Id<P>);
}

/** Wire form of an id in a request: decoded to the plain uuid. Invalid ids fail validation. */
export function IdInputSchema(prefix: IdPrefix) {
  return z
    .string()
    .refine((value) => hexOf(prefix, value) !== null, `must be a ${prefix}_ id`)
    .transform((value) => parseId(prefix, value));
}

/** `bc_live_<16 chars>_<52 chars>`, base32 lower-case alphabet. */
export const ApiKeyTokenSchema = z.string().regex(/^bc_live_[a-z2-7]{16}_[a-z2-7]{52}$/);
export const TestApiKeyTokenSchema = z.string().regex(/^bc_test_[a-z2-7]{16}_[a-z2-7]{52}$/);
/** The 16 character public part of an API key token. */
export const ApiKeyPublicIdSchema = z.string().regex(/^[a-z2-7]{16}$/);
