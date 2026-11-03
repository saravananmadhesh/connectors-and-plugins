import type { AdminAuditEntry } from './api';

type Tone = 'success' | 'warning' | 'info' | 'destructive' | 'secondary';

/** What happened, in words an operator reads without knowing the event names. */
const ACTION_TEXT: Record<string, string> = {
  'plugin_source.created': 'Added a source',
  'plugin_source.updated': 'Changed where a plugin comes from',
  'plugin_source.deleted': 'Removed a source',
  'plugin_ingestion.requested': 'Started a sync',
  'plugin_version.ingested': 'Found a new version',
  'plugin_version.approved': 'Approved a version',
  'plugin_version.rejected': 'Rejected a version',
  'plugin_version.reopened': 'Reopened a rejected version',
  'plugin_version.published': 'Published a version',
  'plugin_version.yanked': 'Yanked a version',
  'plugin.reactivated': 'Reactivated a plugin',
  'plugin.deprecated': 'Deprecated a plugin',
  'plugin.suspended': 'Suspended a plugin',
  'plugin.deleted': 'Deleted a plugin',
  'plugin.categories_changed': 'Changed the categories of a plugin',
  'plugin.flags_changed': 'Changed visibility or marks of a plugin',
  'plugin.updated': 'Edited the details of a plugin',
  'category.created': 'Created a category',
  'category.renamed': 'Changed a category',
  'category.deleted': 'Deleted a category',
  'limit.changed': 'Changed a limit',
  'limit.reset': 'Reset a limit to its default',
  'admin.signed_in': 'Admin signed in',
  'admin.sign_in_failed': 'Admin sign-in failed',
  'admin.signed_out': 'Admin signed out',
  'admin.password_set': 'Admin set a password',
};

const humanize = (action: string): string => {
  const text = action.replace(/[._]/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const actionText = (action: string): string => ACTION_TEXT[action] ?? humanize(action);

/** Colour of the action: removals and failures red, new things green, caution amber. */
export function actionTone(entry: Pick<AdminAuditEntry, 'action' | 'result'>): Tone {
  if (entry.result !== 'success') return 'destructive';
  const verb = entry.action.slice(entry.action.lastIndexOf('.') + 1);
  if (['deleted', 'suspended', 'yanked', 'rejected', 'sign_in_failed'].includes(verb)) {
    return 'destructive';
  }
  if (['deprecated'].includes(verb)) return 'warning';
  if (['created', 'published', 'approved', 'reactivated', 'ingested'].includes(verb)) {
    return 'success';
  }
  if (['requested'].includes(verb)) return 'info';
  return 'secondary';
}

const text = (value: unknown): string | null =>
  typeof value === 'string' && value !== '' ? value : null;

/** What the event was about: a name from the recorded context, else the target kind. */
export function targetText(entry: AdminAuditEntry): string | null {
  const context = entry.context ?? {};
  const name = text(context['name']);
  if (entry.targetKind === 'plugin_version') {
    const version = text(context['version']);
    return version ? `version ${version}` : 'a version';
  }
  if (entry.targetKind === 'plugin_source') {
    const owner = text(context['owner']);
    const repository = text(context['repository']);
    return owner && repository ? `${owner}/${repository}` : 'a source';
  }
  if (name) return name;
  return entry.targetKind ? entry.targetKind.replace(/_/g, ' ') : null;
}

/** The admin page that shows the target, when there is one. */
export function targetPath(entry: AdminAuditEntry):
  | { to: '/plugins/$pluginId'; params: { pluginId: string } }
  | {
      to: '/plugins/$pluginId/versions/$versionId';
      params: { pluginId: string; versionId: string };
    }
  | null {
  if (!entry.targetId) return null;
  if (entry.targetKind === 'plugin' && entry.action !== 'plugin.deleted') {
    return { to: '/plugins/$pluginId', params: { pluginId: entry.targetId } };
  }
  const pluginId = text(entry.context?.['pluginId']);
  if (entry.targetKind === 'plugin_version' && pluginId) {
    return {
      to: '/plugins/$pluginId/versions/$versionId',
      params: { pluginId, versionId: entry.targetId },
    };
  }
  return null;
}

/** The recorded context as label and text pairs, as it was stored. */
export function contextRows(context: AdminAuditEntry['context']): [string, string][] {
  return Object.entries(context ?? {}).map(([key, value]) => [
    key,
    typeof value === 'string' ? value : JSON.stringify(value),
  ]);
}
