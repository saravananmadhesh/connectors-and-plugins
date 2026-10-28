import * as z from 'zod/v4';

export const HealthSchema = z.object({ status: z.literal('ok') });
export type Health = z.infer<typeof HealthSchema>;

export const ReadySchema = z.object({
  status: z.enum(['ok', 'unavailable']),
  checks: z.record(z.string(), z.enum(['ok', 'error'])),
});
export type Ready = z.infer<typeof ReadySchema>;
