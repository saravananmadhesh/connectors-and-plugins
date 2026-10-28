import type { Http } from './http.js';
import type { LogEntry, Page, PageOptions, Usage } from './types.js';

export interface LogListOptions extends PageOptions {
  userId?: string | undefined;
  action?: string | undefined;
  from?: Date | undefined;
  to?: Date | undefined;
}

export interface UsageOptions {
  from?: Date | undefined;
  to?: Date | undefined;
}

const iso = (date: Date | undefined) => date?.toISOString();

export function logsApi(http: Http) {
  return {
    list: (options: LogListOptions = {}) =>
      http.json<Page<LogEntry>>('GET', '/v1/project/logs', {
        query: { ...options, from: iso(options.from), to: iso(options.to) },
      }),
  };
}

export function usageRequest(http: Http, options: UsageOptions = {}): Promise<Usage> {
  return http.json<Usage>('GET', '/v1/project/usage', {
    query: { from: iso(options.from), to: iso(options.to) },
  });
}
