import * as z from 'zod/v4';
import { IsoDateTimeSchema, PageSchema } from './common.js';
import { IdSchema } from './ids.js';

/** The events a project webhook may ask for. Each is read from an event the audit trail holds. */
export const WEBHOOK_EVENTS = [
  'user.created',
  'user_plugin.installed',
  'user_plugin.updated',
  'user_plugin.removed',
  'connection.activated',
  'connection.expired',
  'sync.reported',
  'plugin.suspended',
] as const;
export const WebhookEventSchema = z.enum(WEBHOOK_EVENTS);
export type WebhookEvent = z.infer<typeof WebhookEventSchema>;

/** The shape of the payload a host receives. A later shape gets a new number. */
export const WEBHOOK_PAYLOAD_VERSION = 1;

export const WEBHOOK_DELIVERY_STATUSES = ['pending', 'delivered', 'failed'] as const;

export const PutProjectWebhookBodySchema = z.strictObject({
  /** An `https` address. The server refuses a private or local host. */
  url: z.url().max(2048),
  events: z.array(WebhookEventSchema).min(1).max(WEBHOOK_EVENTS.length),
  enabled: z.boolean().default(true),
});
export type PutProjectWebhookBody = z.infer<typeof PutProjectWebhookBodySchema>;

export const ProjectWebhookResponseSchema = z.object({
  url: z.string(),
  events: z.array(WebhookEventSchema),
  enabled: z.boolean(),
  createdAt: IsoDateTimeSchema,
  updatedAt: IsoDateTimeSchema,
});
export type ProjectWebhookResponse = z.infer<typeof ProjectWebhookResponseSchema>;

/** Returned once, when the webhook is set for the first time or its secret is rotated. */
export const ProjectWebhookSecretResponseSchema = ProjectWebhookResponseSchema.extend({
  secret: z.string(),
});
export type ProjectWebhookSecretResponse = z.infer<typeof ProjectWebhookSecretResponseSchema>;

export const WebhookDeliveryQuerySchema = z.strictObject({
  cursor: z.string().max(512).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  status: z.enum(WEBHOOK_DELIVERY_STATUSES).optional(),
});
export type WebhookDeliveryQuery = z.infer<typeof WebhookDeliveryQuerySchema>;

export const WebhookDeliveryResponseSchema = z.object({
  id: IdSchema('whd'),
  eventId: z.string(),
  type: WebhookEventSchema,
  status: z.enum(WEBHOOK_DELIVERY_STATUSES),
  attempts: z.number().int().nonnegative(),
  nextAttemptAt: IsoDateTimeSchema.nullable(),
  lastStatusCode: z.number().int().nullable(),
  createdAt: IsoDateTimeSchema,
});
export type WebhookDeliveryResponse = z.infer<typeof WebhookDeliveryResponseSchema>;

export const WebhookDeliveryPageSchema = PageSchema(WebhookDeliveryResponseSchema);
