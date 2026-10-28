import * as z from 'zod/v4';

/** `X-BoldCreate-Client: cli/1.4.0` or `sdk-node/1.4.0`. */
export const ClientVersionHeaderSchema = z.object({
  'x-boldcreate-client': z
    .string()
    .regex(/^[a-z][a-z0-9-]*\/\d+\.\d+\.\d+$/)
    .optional(),
});
export type ClientVersionHeader = z.infer<typeof ClientVersionHeaderSchema>;

export const ConditionalHeadersSchema = z.object({
  'if-none-match': z.string().max(256).optional(),
  'if-match': z.string().max(256).optional(),
});
export type ConditionalHeaders = z.infer<typeof ConditionalHeadersSchema>;

export const RangeHeaderSchema = z.object({
  range: z
    .string()
    .regex(/^bytes=\d*-\d*$/)
    .optional(),
});
export type RangeHeader = z.infer<typeof RangeHeaderSchema>;

export const WORKLOAD_CALLERS = ['web', 'admin', 'api', 'gateway', 'worker'] as const;

/** Headers carried by service-to-service calls. */
export const WorkloadHeadersSchema = z.object({
  'x-caller-id': z.enum(WORKLOAD_CALLERS),
  /** Signed workload token; required when `WORKLOAD_AUTH_MODE=signed`. */
  'x-workload-token': z.string().min(1).max(2048).optional(),
});
export type WorkloadHeaders = z.infer<typeof WorkloadHeadersSchema>;
