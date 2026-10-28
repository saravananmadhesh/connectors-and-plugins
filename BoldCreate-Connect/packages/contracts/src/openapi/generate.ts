import * as z from 'zod/v4';
import { IdempotencyKeyHeaderSchema } from '../v1/common.js';
import { ApiErrorSchema } from '../v1/errors.js';
import { ROUTES, type RouteDef } from '../v1/routes.js';

type Json = Record<string, unknown>;

export interface OpenApiDocument {
  openapi: '3.1.0';
  jsonSchemaDialect: string;
  info: { title: string; version: 'v1'; description: string };
  paths: Record<string, Record<string, Json>>;
  components: {
    securitySchemes: Record<string, Json>;
    headers: Record<string, Json>;
    responses: Record<string, Json>;
    schemas: Record<string, Json>;
  };
}

export type OpenApiAudience = 'public' | 'internal';

const DIALECT = 'https://json-schema.org/draft/2020-12/schema';
const PUBLIC_APPS = new Set(['api', 'web', 'gateway']);
const METHOD_ORDER = ['get', 'put', 'post', 'patch', 'delete'];

const SECURITY_SCHEMES: Record<string, Json> = {
  sessionCookie: { type: 'apiKey', in: 'cookie', name: '__Host-sid' },
  apiKeyBearer: { type: 'http', scheme: 'bearer', bearerFormat: 'bc_live_<public>_<secret>' },
};
const INTERNAL_SECURITY_SCHEMES: Record<string, Json> = {
  ...SECURITY_SCHEMES,
  workloadToken: { type: 'apiKey', in: 'header', name: 'x-workload-token' },
};

const STATUS_TEXT: Record<number, string> = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Content',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

/** Error statuses added by hand to routes whose entry cannot show them (credential checks). */
const EXTRA_ERROR_STATUSES: Record<string, number[]> = {
  'auth.signin': [401, 403, 429],
  'auth.resetPassword': [422],
  'auth.verifyEmail': [400],
  'auth.confirmEmailChange': [400, 409],
};

/**
 * The statuses a route can answer besides the successes of its entry, derived from what the
 * entry declares. Every error body is `ApiErrorSchema`.
 */
export function standardErrorStatuses(route: RouteDef): number[] {
  const statuses = new Set<number>([500, 503]);
  const declaresInput = Boolean(route.params ?? route.query ?? route.body);
  if (declaresInput || route.idempotency !== 'none') statuses.add(400);
  if (route.principals.some((principal) => principal !== 'none')) statuses.add(401);
  if (route.action !== null || route.exposure === 'bff') statuses.add(403);
  if (route.params) statuses.add(404);
  if (route.method !== 'GET') statuses.add(409);
  if (route.body) statuses.add(422);
  if (route.exposure !== 'internal') statuses.add(429);
  if (route.exposure === 'bff') {
    statuses.add(502);
    statuses.add(504);
  }
  for (const status of EXTRA_ERROR_STATUSES[route.id] ?? []) statuses.add(status);
  return [...statuses].sort((a, b) => a - b);
}

function schemaOf(schema: z.ZodType): Json {
  // Request and response ids are plain strings on the wire; transforms only decode them.
  const { $schema: _dialect, ...json } = z.toJSONSchema(schema, {
    target: 'draft-2020-12',
    io: 'input',
    unrepresentable: 'any',
    reused: 'inline',
    // The date-time pattern is a page of regular expression and the format already says it.
    override: ({ jsonSchema }) => {
      if (jsonSchema.format === 'date-time') delete jsonSchema.pattern;
    },
  }) as Json;
  return json;
}

function parametersOf(location: 'path' | 'query', schema: z.ZodType | undefined): Json[] {
  if (!schema) return [];
  const json = schemaOf(schema) as { properties?: Record<string, Json>; required?: string[] };
  const required = new Set(json.required ?? []);
  return Object.entries(json.properties ?? {}).map(([name, property]) => ({
    name,
    in: location,
    required: location === 'path' ? true : required.has(name),
    schema: property,
  }));
}

function securityOf(route: RouteDef): Json[] {
  const requirements: Json[] = [];
  const wire = {
    session: 'sessionCookie',
    key: 'apiKeyBearer',
    wl: 'workloadToken',
    platform: 'apiKeyBearer',
  } as const;
  for (const principal of route.principals) {
    if (principal === 'none') requirements.push({});
    else if (principal in wire) requirements.push({ [wire[principal as keyof typeof wire]]: [] });
  }
  return requirements;
}

const REQUEST_ID_HEADER: Json = { 'X-Request-Id': { $ref: '#/components/headers/XRequestId' } };
const API_ERROR_REF = { $ref: '#/components/schemas/ApiError' };

function jsonContent(schema: z.ZodType): Json {
  return { 'application/json': { schema: schemaOf(schema) } };
}

function responseOf(status: number, schema: z.ZodType | undefined, route: RouteDef): Json {
  const description = STATUS_TEXT[status] ?? `Status ${status}`;
  const headers: Json = { ...REQUEST_ID_HEADER };
  if (route.idempotency !== 'none' && status < 400) {
    headers['Idempotent-Replay'] = {
      description: 'Present with `true` when the stored response of an earlier call is returned.',
      schema: { type: 'string', enum: ['true'] },
    };
  }
  if (status === 429) {
    headers['Retry-After'] = {
      description: 'Seconds to wait before retrying.',
      schema: { type: 'integer' },
    };
  }
  if (schema === undefined || schema instanceof z.ZodUndefined) return { description, headers };
  const content =
    schema === ApiErrorSchema
      ? { 'application/json': { schema: API_ERROR_REF } }
      : schema instanceof z.ZodString
        ? { 'text/plain': { schema: schemaOf(schema) } }
        : jsonContent(schema);
  return { description, headers, content };
}

/** One shared response per error status that some route in the document can answer. */
function errorResponses(routes: readonly RouteDef[]): Record<string, Json> {
  const statuses = new Set<number>();
  for (const route of routes) {
    for (const status of standardErrorStatuses(route)) {
      if (!(status in route.responses)) statuses.add(status);
    }
  }
  return Object.fromEntries(
    [...statuses]
      .sort((a, b) => a - b)
      .map((status) => [
        `Error${status}`,
        responseOf(status, ApiErrorSchema, { idempotency: 'none' } as RouteDef),
      ]),
  );
}

function operationOf(route: RouteDef): Json {
  const parameters: Json[] = [
    ...parametersOf('path', route.params),
    ...parametersOf('query', route.query),
  ];
  if (route.idempotency !== 'none') {
    parameters.push({
      name: 'Idempotency-Key',
      in: 'header',
      required: route.idempotency === 'required',
      description:
        'Printable ASCII, 1 to 255 characters. A repeated call with the same key and body returns the stored response.',
      schema: schemaOf(IdempotencyKeyHeaderSchema),
    });
  }

  const responses: Record<string, Json> = {};
  for (const [status, schema] of Object.entries(route.responses)) {
    responses[status] = responseOf(Number(status), schema, route);
  }
  for (const status of standardErrorStatuses(route)) {
    if (String(status) in responses) continue;
    responses[String(status)] = { $ref: `#/components/responses/Error${status}` };
  }

  const secure = securityOf(route);
  return {
    operationId: route.id,
    ...(route.transitional ? { deprecated: true } : {}),
    ...(parameters.length > 0 ? { parameters } : {}),
    ...(route.body ? { requestBody: { required: true, content: jsonContent(route.body) } } : {}),
    ...(secure.length > 0 ? { security: secure } : {}),
    ...(route.action ? { 'x-permission': route.action } : {}),
    ...(route.secretResponse ? { 'x-secret-response': true } : {}),
    responses: Object.fromEntries(
      Object.entries(responses).sort(([a], [b]) => Number(a) - Number(b)),
    ),
  };
}

/** The entries documented for an audience: `public` is the browser and key facing surface. */
export function routesFor(routes: readonly RouteDef[], audience: OpenApiAudience): RouteDef[] {
  return routes.filter((route) =>
    audience === 'internal'
      ? route.exposure === 'internal'
      : route.exposure !== 'internal' && PUBLIC_APPS.has(route.app),
  );
}

/** OpenAPI 3.1 for the entries of one audience. Paths and operations are in a stable order. */
export function generateOpenApi(
  routes: readonly RouteDef[] = ROUTES,
  audience: OpenApiAudience = 'public',
): OpenApiDocument {
  const selected = routesFor(routes, audience).sort(
    (a, b) =>
      a.pathTemplate.localeCompare(b.pathTemplate) ||
      METHOD_ORDER.indexOf(a.method.toLowerCase()) - METHOD_ORDER.indexOf(b.method.toLowerCase()),
  );
  const paths: OpenApiDocument['paths'] = {};
  for (const route of selected) {
    const entry = (paths[route.pathTemplate] ??= {});
    entry[route.method.toLowerCase()] = operationOf(route);
  }
  return {
    openapi: '3.1.0',
    jsonSchemaDialect: DIALECT,
    info: {
      title: audience === 'public' ? 'BoldCreate Integrations API' : 'BoldCreate internal API',
      version: 'v1',
      description:
        audience === 'public'
          ? 'Routes reached through the web backend or directly with an API key.'
          : 'Service-to-service routes, authenticated with workload identity.',
    },
    paths,
    components: {
      securitySchemes: audience === 'public' ? SECURITY_SCHEMES : INTERNAL_SECURITY_SCHEMES,
      headers: {
        XRequestId: {
          description: 'Identifier of this request, also in `error.requestId` of an error body.',
          schema: { type: 'string' },
        },
      },
      responses: errorResponses(selected),
      schemas: { ApiError: schemaOf(ApiErrorSchema) },
    },
  };
}

/** The committed file form: 2-space indent and a trailing newline. */
export function serializeOpenApi(document: OpenApiDocument): string {
  return `${JSON.stringify(document, null, 2)}\n`;
}
