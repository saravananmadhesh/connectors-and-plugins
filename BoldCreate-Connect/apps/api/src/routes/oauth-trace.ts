/**
 * Step-by-step log of a member's MCP sign-in, for finding where a sign-in stops. Every line names
 * the step and the ids involved. Codes, state values, verifiers, tokens and client secrets are never
 * logged: only whether they were present, and the host of an address.
 */
import type { FastifyRequest } from 'fastify';

type Fields = Record<string, unknown>;

/** What a failure says about itself: its class, the classified code and the credential reason. */
export function describeFailure(error: unknown): Fields {
  if (!(error instanceof Error)) return { name: typeof error };
  const { code, reason, cause, detail } = error as {
    code?: unknown;
    reason?: unknown;
    cause?: unknown;
    detail?: unknown;
  };
  return {
    name: error.name,
    ...(typeof detail === 'object' && detail !== null ? { detail } : {}),
    ...(typeof code === 'string' ? { code } : {}),
    ...(typeof reason === 'string' ? { reason } : {}),
    ...(cause === undefined ? {} : { cause: describeCause(cause) }),
  };
}

/** The error beneath a classified one, such as the key management service's answer; cut short. */
function describeCause(cause: unknown): Fields {
  if (!(cause instanceof Error)) return { name: typeof cause };
  const { code } = cause as { code?: unknown };
  return {
    name: cause.name,
    ...(typeof code === 'string' || typeof code === 'number' ? { code } : {}),
    message: cause.message.slice(0, 300),
  };
}

/** The host of an address, or `invalid` when it is not one; the path and query can hold secrets. */
export function hostOf(address: string | undefined): string | undefined {
  if (address === undefined) return undefined;
  try {
    return new URL(address).host;
  } catch {
    return 'invalid';
  }
}

export function traceNote(
  req: FastifyRequest,
  flow: string,
  step: string,
  fields: Fields = {},
): void {
  req.log.debug({ oauth: { flow, step, ...fields } }, 'oauth step');
}

/** Runs one step and logs how it ended and how long it took; a failure is rethrown unchanged. */
export async function traced<T>(
  req: FastifyRequest,
  flow: string,
  step: string,
  fields: Fields,
  run: () => Promise<T>,
): Promise<T> {
  const started = performance.now();
  try {
    const result = await run();
    req.log.debug(
      {
        oauth: { flow, step, ...fields },
        durationMs: Math.round(performance.now() - started),
      },
      'oauth step ok',
    );
    return result;
  } catch (error) {
    req.log.warn(
      {
        oauth: { flow, step, ...fields },
        failure: describeFailure(error),
        durationMs: Math.round(performance.now() - started),
      },
      'oauth step failed',
    );
    throw error;
  }
}
