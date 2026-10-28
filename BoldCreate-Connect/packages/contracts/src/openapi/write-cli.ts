import { resolve } from 'node:path';
import { writeOpenApiDocuments } from './write.js';

const outDir = resolve(import.meta.dirname, '..', '..', '..', '..', 'docs', 'openapi');

for (const file of await writeOpenApiDocuments(outDir)) {
  process.stdout.write(`openapi: wrote ${file}\n`);
}
