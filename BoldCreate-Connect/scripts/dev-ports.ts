/**
 * Local development ports. Every port is optional: set the matching `PORT_*` variable
 * (in `.env.development` or the shell) to change it, otherwise the default is used.
 */
export const defaultDevPorts = {
  web: 3000,
  api: 3001,
  gateway: 3002,
  admin: 3004,
  workerHealth: 3005,
  dashboard: 5080,
  mailpitHttp: 8025,
  mailpitSmtp: 1025,
  postgres: 5432,
  redis: 6379,
  objectStore: 9000,
  objectStoreUi: 9001,
  postgresUi: 8081,
} as const;

export type DevPorts = Record<keyof typeof defaultDevPorts, number>;

const envNames: Record<keyof DevPorts, string> = {
  web: 'PORT_WEB',
  api: 'PORT_API',
  gateway: 'PORT_GATEWAY',
  admin: 'PORT_ADMIN',
  workerHealth: 'PORT_WORKER_HEALTH',
  dashboard: 'PORT_DASHBOARD',
  mailpitHttp: 'PORT_MAILPIT_HTTP',
  mailpitSmtp: 'PORT_MAILPIT_SMTP',
  postgres: 'PORT_POSTGRES',
  redis: 'PORT_REDIS',
  objectStore: 'PORT_OBJECT_STORE',
  objectStoreUi: 'PORT_OBJECT_STORE_UI',
  postgresUi: 'PORT_POSTGRES_UI',
};

/** Reads the ports from `env`; a missing, empty or invalid value falls back to the default. */
export function devPorts(env: NodeJS.ProcessEnv = process.env): DevPorts {
  const ports = { ...defaultDevPorts } as DevPorts;
  for (const key of Object.keys(envNames) as Array<keyof DevPorts>) {
    const value = Number(env[envNames[key]]);
    if (Number.isInteger(value) && value > 0 && value < 65536) ports[key] = value;
  }
  return ports;
}

/** Browser URL of a local service. */
export const localUrl = (port: number, path = '/') => `http://localhost:${port}${path}`;
