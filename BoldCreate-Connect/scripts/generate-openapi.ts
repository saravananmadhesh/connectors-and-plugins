/**
 * Writes the OpenAPI documents of the route registry to docs/openapi.
 * `pnpm build` does this for the contracts package; run `pnpm openapi` to regenerate on demand.
 */
import { resolve } from 'node:path';
import { writeOpenApiDocuments } from '../packages/contracts/src/openapi/write.js';

const outDir = resolve(import.meta.dirname, '..', 'docs', 'openapi');

for (const file of await writeOpenApiDocuments(outDir)) {
  process.stdout.write(`openapi: wrote ${file}\n`);
}
