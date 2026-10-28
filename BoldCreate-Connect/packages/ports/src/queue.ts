export interface ClaimedJob {
  id: string;
  type: string;
  payload: unknown;
  attempts: number;
}

export interface QueuePort {
  enqueue(job: {
    type: string;
    payload: unknown;
    runAt?: Date;
    dedupeKey?: string;
  }): Promise<{ id: string }>;
  claim(opts: {
    types: string[];
    limit: number;
    leaseMs: number;
    owner: string;
  }): Promise<ClaimedJob[]>;
  complete(id: string): Promise<void>;
  /** `error` is stored truncated to 500 characters and is never returned over HTTP. */
  fail(id: string, opts: { retryAt: Date | null; error: string }): Promise<void>;
}
