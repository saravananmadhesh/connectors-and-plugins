import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ROUTES } from '../v1/routes.js';
import { generateOpenApi } from './generate.js';
import { writeOpenApiDocuments } from './write.js';

describe('writeOpenApiDocuments', () => {
  it('writes both documents, creating the folder, and they match the registry', async () => {
    const root = await mkdtemp(join(tmpdir(), 'openapi-'));
    try {
      const outDir = join(root, 'nested', 'openapi');
      const written = await writeOpenApiDocuments(outDir);
      expect(written.map((path) => path.slice(outDir.length + 1))).toEqual([
        'v1.json',
        'internal-v1.json',
      ]);
      for (const [file, audience] of [
        ['v1.json', 'public'],
        ['internal-v1.json', 'internal'],
      ] as const) {
        const committed = JSON.parse(await readFile(join(outDir, file), 'utf8')) as unknown;
        expect(committed).toEqual(JSON.parse(JSON.stringify(generateOpenApi(ROUTES, audience))));
      }
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
