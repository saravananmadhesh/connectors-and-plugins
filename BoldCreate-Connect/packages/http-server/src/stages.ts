/**
 * The fixed order of request processing. Every stage records itself through the optional
 * `onStage` observer, which exists so a test can assert the order.
 */
export const STAGES = [
  'requestId',
  'limits',
  'origin',
  'ipThrottle',
  'parse',
  'authenticate',
  'authorize',
  'idempotency',
  'handler',
  'audit',
  'errorMapper',
] as const;

export type Stage = (typeof STAGES)[number];

export type StageObserver = (stage: Stage, requestId: string) => void;
