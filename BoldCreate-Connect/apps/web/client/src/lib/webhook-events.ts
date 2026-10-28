import type { WebhookEvent } from '@boldcreate-integrations/contracts';

/** What each webhook event tells the host, in words for the console. Typed so a new event cannot be missed. */
export const WEBHOOK_EVENT_INFO: Record<WebhookEvent, string> = {
  'user.created': 'A user was seen for the first time',
  'user_plugin.installed': 'A user installed a plugin',
  'user_plugin.updated': 'A user changed the version or values of a plugin',
  'user_plugin.removed': 'A user removed a plugin',
  'connection.activated': 'A user connected an MCP server',
  'connection.expired': 'A user’s connection needs signing in again',
  'sync.reported': 'A user’s agent reported what it applied',
  'plugin.suspended': 'A plugin of the project was suspended',
};

export const WEBHOOK_EVENTS = Object.keys(WEBHOOK_EVENT_INFO) as WebhookEvent[];
