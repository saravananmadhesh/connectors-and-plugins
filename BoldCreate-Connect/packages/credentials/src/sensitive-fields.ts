/**
 * Which fields of a stored object hold secrets, and the walk that applies a transformation to
 * exactly those fields. A path is dot-separated; `*` stands for every key of an object or every
 * element of an array at that level.
 */
export const SENSITIVE_FIELDS = {
  oauth_config: ['clientSecret', 'registrationAccessToken'],
  upstream_headers: ['*'],
  upstream_query: ['*'],
  connection: ['credential'],
} as const;

export type SensitiveFieldSet = keyof typeof SENSITIVE_FIELDS;

export class SensitiveFieldError extends Error {
  constructor(path: string) {
    super(`sensitive field ${path} must be a string`);
    this.name = 'SensitiveFieldError';
  }
}

type Transform = (text: string, path: string) => Promise<string>;

async function walk(node: unknown, rest: string[], trail: string[], fn: Transform): Promise<void> {
  const [head, ...tail] = rest;
  if (head === undefined || typeof node !== 'object' || node === null) return;
  const container = node as Record<string, unknown>;
  const keys = head === '*' ? Object.keys(container) : Object.hasOwn(container, head) ? [head] : [];
  for (const key of keys) {
    const path = [...trail, key];
    const child = container[key];
    if (tail.length > 0) {
      await walk(child, tail, path, fn);
    } else if (child !== undefined) {
      if (typeof child !== 'string') throw new SensitiveFieldError(path.join('.'));
      container[key] = await fn(child, path.join('.'));
    }
  }
}

/**
 * Returns a copy of `value` in which every string at one of `paths` is replaced by `fn`'s
 * result. A path that is absent is ignored; a non-string value at a path throws.
 */
export async function transformFields<T extends object>(
  value: T,
  paths: readonly string[],
  fn: Transform,
): Promise<T> {
  const copy = structuredClone(value);
  for (const path of paths) await walk(copy, path.split('.'), [], fn);
  return copy;
}

/** The subject id of one field of a sealed object. */
export function fieldSubjectId(subjectId: string, path: string): string {
  return `${subjectId}:field:${path}`;
}
