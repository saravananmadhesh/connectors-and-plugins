import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { generateOpenApi, serializeOpenApi } from './generate.js';

/** Writes `v1.json` (public) and `internal-v1.json` (internal) of the route registry to `outDir`. */
export async function writeOpenApiDocuments(outDir: string): Promise<string[]> {
  await mkdir(outDir, { recursive: true });
  const files = [
    ['v1.json', 'public'],
    ['internal-v1.json', 'internal'],
  ] as const;
  const written: string[] = [];
  for (const [file, audience] of files) {
    const target = resolve(outDir, file);
    await writeFile(target, serializeOpenApi(generateOpenApi(undefined, audience)));
    written.push(target);
  }
  return written;
}
