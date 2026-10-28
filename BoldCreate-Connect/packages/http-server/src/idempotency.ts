import { createHash } from 'node:crypto';
import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  AppError,
  IdempotencyKeyHeaderSchema,
  type ErrorDetail,
  type RouteDef,
} from '@boldcreate-integrations/contracts';

export interface IdempotencyScope {
  principalKey: string;
  method: string;
  routeTemplate: string;
  idemKey: string;
}

export interface IdempotencyRecord {
  requestHash: string;
  state: 'in_progress' | 'completed';
  responseStatus: number | null;
  responseBody: unknown;
  responseHeaders: Record<string, string> | null;
  secretResponse: boolean;
}

export type IdempotencyClaim = { claimed: true } | { claimed: false; record: IdempotencyRecord };

/** Where claims and stored responses live; apps inject the Postgres store. */
export interface IdempotencyStore {
  begin(
    scope: IdempotencyScope,
    requestHash: string,
    ttlSeconds: number,
  ): Promise<IdempotencyClaim>;
  get(scope: IdempotencyScope): Promise<IdempotencyRecord | null>;
  complete(
    scope: IdempotencyScope,
    status: number,
    body: unknown,
    headers: Record<string, string> | null,
    secretResponse: boolean,
  ): Promise<void>;
  abandon(scope: IdempotencyScope): Promise<void>;
  purgeExpired(limit: number): Promise<number>;
}

export interface IdempotencyOptions {
  store: IdempotencyStore;
  ttlSeconds: number;
  /** `usr:<uuid>`, `key:<uuid>`, `workload:<callerId>` or `anon:<clientIp>`. */
  principalKey: (request: FastifyRequest, route: RouteDef, principal: unknown) => Promise<string>;
}

export interface Idempotency {
  /** Claims the key, or answers a replay or conflict. Call after authentication and authorization. */
  begin(
    request: FastifyRequest,
    reply: FastifyReply,
    route: RouteDef,
    principal: unknown,
  ): Promise<void>;
  /** Stores or abandons the claim once the response is known. Call from `onSend`. */
  finish(request: FastifyRequest, reply: FastifyReply, payload: unknown): Promise<void>;
}

const HEADER = 'idempotency-key';
const REPLAYED_HEADERS = ['location', 'retry-after'] as const;

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
        .map(([key, entry]) => [key, sortKeys(entry)]),
    );
  }
  return value;
}

/** JSON with object keys in sorted order, so equal requests hash equally. */
export function canonicalJson(value: unknown): string {
  return JSON.stringify(sortKeys(value)) ?? 'null';
}

export function requestHash(
  method: string,
  routeTemplate: string,
  parts: { params: unknown; query: unknown; body: unknown },
): string {
  return createHash('sha256')
    .update(
      method +
        routeTemplate +
        canonicalJson(parts.params) +
        canonicalJson(parts.query) +
        canonicalJson(parts.body),
    )
    .digest('hex');
}

interface Claim {
  scope: IdempotencyScope;
  secretResponse: boolean;
}

export function createIdempotency(options: IdempotencyOptions): Idempotency {
  const { store, ttlSeconds } = options;
  const claims = new WeakMap<FastifyRequest, Claim>();

  return {
    async begin(request, reply, route, principal) {
      const raw = request.headers[HEADER];
      if (raw === undefined) {
        if (route.idempotency === 'required') throw new AppError('idempotency_key_required');
        return;
      }
      const parsed = IdempotencyKeyHeaderSchema.safeParse(raw);
      if (!parsed.success) {
        const details: ErrorDetail[] = [{ field: `headers.${HEADER}`, message: 'invalid value' }];
        throw new AppError('validation_failed', details);
      }
      const scope: IdempotencyScope = {
        principalKey: await options.principalKey(request, route, principal),
        method: route.method,
        routeTemplate: route.pathTemplate,
        idemKey: parsed.data,
      };
      const hash = requestHash(route.method, route.pathTemplate, {
        params: request.params,
        query: request.query,
        body: request.body,
      });
      const claim = await store.begin(scope, hash, ttlSeconds);
      if (claim.claimed) {
        claims.set(request, { scope, secretResponse: route.secretResponse === true });
        return;
      }
      const { record } = claim;
      if (record.requestHash !== hash) throw new AppError('idempotency_key_reused');
      if (record.state === 'in_progress') {
        void reply.header('retry-after', '1');
        throw new AppError('conflict');
      }
      if (record.secretResponse) throw new AppError('idempotent_replay_secret_unavailable');
      void reply.status(record.responseStatus ?? 200);
      for (const [name, value] of Object.entries(record.responseHeaders ?? {})) {
        void reply.header(name, value);
      }
      void reply.header('idempotent-replay', 'true');
      await reply.send(record.responseBody ?? undefined);
    },

    async finish(request, reply, payload) {
      const claim = claims.get(request);
      if (!claim) return;
      claims.delete(request);
      try {
        if (reply.statusCode >= 500) {
          await store.abandon(claim.scope);
          return;
        }
        let body: unknown = null;
        if (!claim.secretResponse && typeof payload === 'string' && payload.length > 0) {
          try {
            body = JSON.parse(payload);
          } catch {
            body = null;
          }
        }
        const headers: Record<string, string> = {};
        for (const name of REPLAYED_HEADERS) {
          const value = reply.getHeader(name);
          if (typeof value === 'string') headers[name] = value;
        }
        await store.complete(
          claim.scope,
          reply.statusCode,
          body,
          Object.keys(headers).length > 0 ? headers : null,
          claim.secretResponse,
        );
      } catch (err) {
        request.log.error({ err }, 'idempotency record not stored');
        // A claim that stays in progress would block the client's retry until it expires.
        await store.abandon(claim.scope).catch(() => undefined);
      }
    },
  };
}
