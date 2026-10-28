/**
 * Refusal rules of the load runner. A load run only ever targets a host the operator named in
 * the allow list, never a production host, and only when the operator opted in explicitly.
 */
export type LoadMode = 'smoke' | 'full';

export interface LoadPlan {
  target: URL;
  mode: LoadMode;
}

export interface LoadRefusal {
  refusal: string;
}

const DEFAULT_ALLOWED_HOSTS = 'localhost,127.0.0.1';

/** Host names that mark a production endpoint, whatever the allow list says. */
const PRODUCTION_HOST = /(^|[.-])(prod|production|live)([.-]|$)/i;

function optionValue(args: string[], name: string): string | undefined {
  const prefix = `--${name}=`;
  return args.find((arg) => arg.startsWith(prefix))?.slice(prefix.length);
}

/** Validates arguments and environment; returns the plan to run or the reason to refuse. */
export function planLoadRun(
  args: string[],
  env: Record<string, string | undefined>,
): LoadPlan | LoadRefusal {
  for (const arg of args) {
    if (arg === '--') continue;
    if (arg !== '--smoke' && arg !== '--full' && !arg.startsWith('--target=')) {
      return { refusal: `Unknown option "${arg}". Options: --target=<url>, --smoke, --full` };
    }
  }
  if (args.includes('--smoke') && args.includes('--full')) {
    return { refusal: 'Choose either --smoke or --full, not both' };
  }
  const rawTarget = optionValue(args, 'target');
  if (!rawTarget) return { refusal: '--target=<url> is required' };

  let target: URL;
  try {
    target = new URL(rawTarget);
  } catch {
    return { refusal: `--target is not a valid URL: ${rawTarget}` };
  }
  if (target.protocol !== 'http:' && target.protocol !== 'https:') {
    return { refusal: `--target must be an http or https URL: ${rawTarget}` };
  }
  if (env['K6_ALLOW_LOAD'] !== '1') {
    return { refusal: 'Load runs are disabled: set K6_ALLOW_LOAD=1 to opt in' };
  }

  const allowed = (env['K6_ALLOWED_HOSTS'] ?? DEFAULT_ALLOWED_HOSTS)
    .split(',')
    .map((host) => host.trim().toLowerCase())
    .filter(Boolean);
  const host = target.hostname.toLowerCase();
  if (PRODUCTION_HOST.test(host)) {
    return { refusal: `Refusing to load a production host: ${host}` };
  }
  if (!allowed.includes(host)) {
    return { refusal: `Host ${host} is not in K6_ALLOWED_HOSTS (${allowed.join(', ')})` };
  }
  return { target, mode: args.includes('--full') ? 'full' : 'smoke' };
}

export function isRefusal(plan: LoadPlan | LoadRefusal): plan is LoadRefusal {
  return 'refusal' in plan;
}
