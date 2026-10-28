import { Writable } from 'node:stream';
import { createLogger, createMetrics } from '@boldcreate-integrations/observability';
import { createServer, type HttpServer } from './server.js';
import type { CreateServerOptions, HttpServerConfig } from './types.js';

export function testConfig(overrides: Partial<HttpServerConfig> = {}): HttpServerConfig {
  return {
    DEPLOY_ENV: 'test',
    BODY_LIMIT_BYTES: 262_144,
    MAX_HEADER_BYTES: 16_384,
    TRUSTED_PROXY_CIDRS: [],
    ALLOWED_HOSTS: [],
    IP_THROTTLE_LIMIT: 0,
    IP_THROTTLE_WINDOW_SECONDS: 60,
    METRICS_ENABLED: true,
    SHUTDOWN_DRAIN_SECONDS: 20,
    SHUTDOWN_PREDRAIN_SECONDS: 5,
    ...overrides,
  };
}

export interface TestServer extends HttpServer {
  /** Parsed log lines written so far. */
  logs(): Record<string, unknown>[];
}

type TestServerOptions = Partial<Omit<CreateServerOptions, 'config'>> & {
  config?: Partial<HttpServerConfig>;
};

/** A server writing JSON logs to memory. */
export function buildTestServer(options: TestServerOptions = {}): TestServer {
  const lines: string[] = [];
  const destination = new Writable({
    write(chunk: Buffer, _encoding, callback) {
      lines.push(chunk.toString('utf8'));
      callback();
    },
  });
  const logger = createLogger({ service: 'api', level: 'debug', destination });
  const metrics = createMetrics({ service: 'api' });
  const { config, ...rest } = options;
  const server = createServer({
    service: 'api',
    logger,
    metrics,
    ...rest,
    config: testConfig(config),
  });
  return {
    ...server,
    logs: () =>
      lines
        .join('')
        .split('\n')
        .filter((line) => line.length > 0)
        .map((line) => JSON.parse(line) as Record<string, unknown>),
  };
}
