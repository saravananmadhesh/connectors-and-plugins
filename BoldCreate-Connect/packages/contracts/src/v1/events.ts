import * as z from 'zod/v4';

/**
 * Audit actions and job types, as two explicit lists.
 *
 * Names are `<noun>.<verb>` in snake_case. For audit actions the part after the dot names
 * something that happened (a past participle: `signed_in`, `role_changed`, `secret_set`).
 * Job types are checked for shape only; queue job names may be present tense.
 *
 * A task that first writes an action or enqueues a type registers it here in that same task.
 */
export const AUDIT_ACTIONS = [
  'org.created',
  'org.deleted',
  'member.added',
  'member.removed',
  'member.role_changed',
  'invite.created',
  'invite.revoked',
  'invite.resent',
  'installation.created',
  'installation.updated',
  'installation.upgraded',
  'installation.deleted',
  'variable.updated',
  'mcp_server.auth_updated',
  'mcp_server.tested',
  'mcp_server.connected',
  'mcp_server.disconnected',
  'mcp_tool.called',
  'artifact.downloaded',
  'sync.reported',
  'api_key.created',
  'api_key.revoked',
  'permission.denied',
  'user.password_changed',
  'user.sessions_revoked',
  'user.email_changed',
  'user.signed_in',
  'user.sign_in_failed',
  'user.signed_out',
  'org_key.created',
  'org.updated',
  'member.suspended',
  'member.reinstated',
  'user.deleted',
  'feature_flag.changed',
  'limit.changed',
  'limit.reset',
  'kill_switch.created',
  'kill_switch.lifted',
  'admin.signed_in',
  'admin.sign_in_failed',
  'admin.signed_out',
  'admin.password_set',
  'admin.email_allowed',
  'admin.email_removed',
  'admin.error_status_changed',
  'admin.error_group_deleted',
  'admin.observability_purged',
  'plugin_source.created',
  'plugin_source.updated',
  'plugin_source.deleted',
  'plugin_ingestion.requested',
  'plugin_version.ingested',
  'plugin_version.approved',
  'plugin_version.rejected',
  'plugin_version.reopened',
  'plugin_version.published',
  'plugin_version.yanked',
  'plugin.reactivated',
  'plugin.deprecated',
  'plugin.suspended',
  'plugin.deleted',
  'plugin.categories_changed',
  'plugin.flags_changed',
  'plugin.updated',
  'category.created',
  'category.renamed',
  'category.deleted',
  'project.created',
  'project.updated',
  'project.deleted',
  'project_key.created',
  'project_key.rotated',
  'project_key.revoked',
  'project_webhook.updated',
  'project_webhook.deleted',
  'project_webhook.secret_rotated',
  'project_user.created',
  'project_user.deleted',
  'project_plugin.allowed',
  'project_plugin.disallowed',
  'plugin_set.created',
  'plugin_set.updated',
  'plugin_set.deleted',
  'user_plugin.installed',
  'user_plugin.updated',
  'user_plugin.removed',
  'user_plugin.variables_updated',
  'user_plugin.component_updated',
  'session.created',
  'session.revoked',
  'connection.activated',
  'connection.expired',
  'auth_config.created',
  'auth_config.updated',
  'auth_config.deleted',
] as const;

export const JOB_TYPES = [
  'email_verification.requested',
  'password_reset.requested',
  'email_change.requested',
  'invite.created',
  'deletion.requested',
  'org_key.requested',
  'idempotency_key.purge_due',
  'observability.purge_due',
  'observability.alert_due',
  'revision.bumped',
  'project_webhook.dispatch_due',
  'admin_setup.requested',
  'plugin_ingestion.requested',
  'plugin_archive.purge_requested',
] as const;

export const AuditActionSchema = z.enum(AUDIT_ACTIONS);
export type AuditAction = z.infer<typeof AuditActionSchema>;

export const JobTypeSchema = z.enum(JOB_TYPES);
export type EventType = z.infer<typeof JobTypeSchema>;

/** Past participles that do not end in `ed`. */
export const IRREGULAR_PARTICIPLES: readonly string[] = [
  'set',
  'reset',
  'held',
  'sent',
  'resent',
  'withdrawn',
  'written',
];

export const EVENT_NAME_SHAPE = /^[a-z][a-z_]*\.[a-z][a-z_]*$/;

/** True when the verb part of an audit action ends in a past participle. */
export function endsInParticiple(action: string): boolean {
  const verb = action.split('.')[1] ?? '';
  const parts = verb.split('_');
  const last = parts[parts.length - 1] ?? '';
  const word = last === 'in' || last === 'out' ? (parts[parts.length - 2] ?? '') : last;
  return word.endsWith('ed') || IRREGULAR_PARTICIPLES.includes(word);
}
