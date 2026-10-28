import { describe, it, expect } from 'vitest';
import { resolve } from 'node:path';
import * as z from 'zod/v4';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import {
  checkDbNaming,
  checkFileName,
  checkJsonFields,
  checkRouteFile,
  checkUrlTemplate,
  contractFields,
  loadAllow,
  run,
  type NamingAllow,
} from './naming.js';
import { schemaNames } from './vocabulary.js';

const root = resolve(import.meta.dirname, '../..');
const allow: NamingAllow = { files: [], singularSegments: ['me', 'api-key'], jsonFields: ['iss'] };

describe('naming: files', () => {
  it('requires kebab-case', () => {
    expect(checkFileName('packages/domain/src/my_file.ts', allow)).toHaveLength(1);
    expect(checkFileName('packages/domain/src/MyFile.ts', allow)).toHaveLength(1);
    expect(checkFileName('packages/domain/src/my-file.test.ts', allow)).toEqual([]);
  });

  it('allows PascalCase components under pages, components and layouts', () => {
    expect(checkFileName('apps/web/client/src/pages/app/ProjectPage.tsx', allow)).toEqual([]);
    expect(checkFileName('apps/web/client/src/lib/MyHelper.ts', allow)).toHaveLength(1);
  });

  it('allows the fixed documentation names and dot files', () => {
    expect(checkFileName('apps/api/Dockerfile', allow)).toEqual([]);
    expect(checkFileName('packages/x/README.md', allow)).toEqual([]);
    expect(checkFileName('apps/api/.env.example', allow)).toEqual([]);
  });
});

describe('naming: database', () => {
  it('rejects plural and camel-case names', () => {
    const plural = pgTable('projects', { id: uuid('id').primaryKey() });
    expect(checkDbNaming(schemaNames({ plural })).map((f) => f.text)).toContain(
      'table name must be singular',
    );
    const camel = pgTable('thing', { id: uuid('id').primaryKey(), userName: text('userName') });
    expect(checkDbNaming(schemaNames({ camel })).map((f) => f.text)).toContain(
      'userName is not snake_case',
    );
  });

  it('accepts singular snake_case tables', () => {
    const ok = pgTable('project_member', {
      id: uuid('id').primaryKey(),
      project_id: uuid('project_id'),
    });
    expect(checkDbNaming(schemaNames({ ok }))).toEqual([]);
  });
});

describe('naming: JSON fields', () => {
  it('rejects a snake_case property', () => {
    const bad = z.object({ display_name: z.string(), ok: z.string() });
    const fields = contractFields({ bad });
    expect(checkJsonFields(fields, allow).map((f) => f.text)).toEqual([
      'JSON field "display_name" is not camelCase',
    ]);
  });

  it('accepts listed exceptions and camelCase', () => {
    const good = z.object({ iss: z.string(), confirmSlug: z.string() });
    expect(checkJsonFields(contractFields({ good }), allow)).toEqual([]);
  });
});

describe('naming: URLs', () => {
  it('rejects capitals and singular collections', () => {
    expect(checkUrlTemplate('/v1/orgs/{orgId}/Projects', allow)).toHaveLength(1);
    expect(checkUrlTemplate('/v1/orgs/:orgId/project', allow)).toHaveLength(1);
  });

  it('accepts plural kebab-case, params and listed singular segments', () => {
    expect(checkUrlTemplate('/v1/orgs/{orgId}/api-keys', allow)).toEqual([]);
    expect(checkUrlTemplate('/v1/orgs/:orgId/me', allow)).toEqual([]);
  });

  it('reads route registrations from source', () => {
    const text = "app.get('/installations/:id');\napp.post('/Widget');";
    expect(checkRouteFile('apps/api/src/routes/x.ts', text, allow)).toHaveLength(1);
  });
});

describe('naming: repository', () => {
  it('passes on the repository', () => {
    expect(run(root)).toEqual([]);
    expect(loadAllow(root).singularSegments).toContain('me');
  });
});
