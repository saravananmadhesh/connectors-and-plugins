export interface ClockPort {
  now(): Date;
  nowMs(): number;
  sleep(ms: number, signal?: AbortSignal): Promise<void>;
}
