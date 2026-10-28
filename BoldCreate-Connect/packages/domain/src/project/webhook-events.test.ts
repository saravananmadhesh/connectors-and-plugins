import { describe, expect, it } from 'vitest';
import { WEBHOOK_EVENTS, formatId } from '@boldcreate-integrations/contracts';
import {
  WEBHOOK_AUDIT_ACTIONS,
  auditActionsOf,
  buildWebhookPayload,
  webhookBackoffSeconds,
  webhookEventOf,
} from './webhook-events.js';

const project = '00000000-0000-4000-8000-000000000001';
const event = '00000000-0000-4000-8000-0000000000e1';
const plugin = '00000000-0000-4000-8000-0000000000a1';
const installation = '00000000-0000-4000-8000-0000000000b1';
const createdAt = new Date('2026-10-17T10:00:00.000Z');

describe('event mapping', () => {
  it('maps every event to one audit action and back', () => {
    for (const type of WEBHOOK_EVENTS) {
      expect(webhookEventOf(WEBHOOK_AUDIT_ACTIONS[type])).toBe(type);
    }
    expect(webhookEventOf('project_user.created')).toBe('user.created');
    expect(webhookEventOf('session.created')).toBeUndefined();
    expect(auditActionsOf(['user.created', 'sync.reported'])).toEqual([
      'project_user.created',
      'sync.reported',
    ]);
  });
});

describe('buildWebhookPayload', () => {
  const row = (extra: Partial<Parameters<typeof buildWebhookPayload>[0]['row']>) => ({
    eventId: event,
    action: 'user_plugin.installed',
    createdAt,
    targetKind: 'installation',
    targetId: installation,
    context: JSON.stringify({ scope: 'user', pluginId: plugin, ip: '1.2.3.4' }),
    ...extra,
  });

  it('builds the body of an install with wire ids and only safe keys', () => {
    expect(buildWebhookPayload({ row: row({}), projectId: project, userId: 'host-user' })).toEqual({
      id: formatId('evt', event),
      type: 'user_plugin.installed',
      version: 1,
      createdAt: '2026-10-17T10:00:00.000Z',
      projectId: formatId('prj', project),
      userId: 'host-user',
      data: { installationId: formatId('ins', installation), pluginId: formatId('plg', plugin) },
    });
  });

  it('leaves out the user when the event has none, and carries sync counts', () => {
    const payload = buildWebhookPayload({
      row: row({
        action: 'sync.reported',
        targetKind: null,
        targetId: null,
        context: JSON.stringify({ target: 'cursor', appliedCount: 2, skipped: 1, applied: [] }),
      }),
      projectId: project,
      userId: null,
    });
    expect(payload).toMatchObject({
      type: 'sync.reported',
      data: { target: 'cursor', appliedCount: 2, skipped: 1 },
    });
    expect(payload).not.toHaveProperty('userId');
  });

  it('names the plugin of a suspension', () => {
    const payload = buildWebhookPayload({
      row: row({
        action: 'plugin.suspended',
        targetKind: 'plugin',
        targetId: plugin,
        context: null,
      }),
      projectId: project,
      userId: null,
    });
    expect(payload?.data).toEqual({ pluginId: formatId('plg', plugin) });
  });

  it('gives nothing for an action that is not an event', () => {
    expect(
      buildWebhookPayload({
        row: row({ action: 'session.created' }),
        projectId: project,
        userId: null,
      }),
    ).toBeNull();
  });
});

describe('webhookBackoffSeconds', () => {
  it('doubles from the base and stops at six hours', () => {
    expect([1, 2, 3, 4].map((n) => webhookBackoffSeconds(n, 30))).toEqual([30, 60, 120, 240]);
    expect(webhookBackoffSeconds(30, 30)).toBe(21_600);
  });
});
