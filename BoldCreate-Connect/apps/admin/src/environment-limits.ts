import type { EnvironmentLimit } from '@boldcreate-integrations/domain';
import type { AdminConfig } from './config.js';

/**
 * Settings that are fixed when a service starts. They are listed on the Limits screen so an
 * administrator can see them, but they have no edit path: changing one is a deployment change.
 * Only numbers appear here; no credential, address or key is ever listed.
 */
export function environmentLimits(config: AdminConfig): EnvironmentLimit[] {
  return [
    {
      key: 'body_limit_bytes',
      label: 'Largest request body (admin service)',
      description: 'Bodies above this size are refused. Each service sets its own in its config.',
      value: config.BODY_LIMIT_BYTES,
      unit: 'bytes',
    },
    {
      key: 'max_header_bytes',
      label: 'Largest request headers (admin service)',
      description: 'Headers above this size are refused before the request is read.',
      value: config.MAX_HEADER_BYTES,
      unit: 'bytes',
    },
    {
      key: 'shutdown_drain_seconds',
      label: 'Time a pod keeps serving while it shuts down (admin service)',
      description: 'Requests still running when this time ends are cut off.',
      value: config.SHUTDOWN_DRAIN_SECONDS,
      unit: 'seconds',
    },
    {
      key: 'uv_threadpool_size',
      label: 'Worker threads for files and DNS (admin service)',
      description: 'Fixed when the process starts.',
      value: config.UV_THREADPOOL_SIZE,
    },
  ];
}
