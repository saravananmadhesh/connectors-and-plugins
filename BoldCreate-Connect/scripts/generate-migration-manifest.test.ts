import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  generateMigrationManifest,
  getMigrationFiles,
  parseCliArgs,
} from './generate-migration-manifest.js';

afterEach(() => vi.unstubAllEnvs());

describe('generate-migration-manifest', () => {
  it.each(['staging', 'preproduction', 'production'] as const)(
    'defaults to a database Secret reference for %s without credentials',
    (env) => {
      vi.stubEnv('DATABASE_URL', undefined);
      const manifest = generateMigrationManifest({ env });
      expect(manifest).toContain(`name: boldcreate-integrations-api-secrets-${env}`);
      expect(manifest).toContain('key: DATABASE_URL');
      expect(manifest).not.toContain('postgresql://');
    },
  );
  it('reads all sql migration files from packages/db/migrations', () => {
    const files = getMigrationFiles();
    expect(files.length).toBeGreaterThanOrEqual(3);
    const filenames = files.map((f) => f.filename);
    expect(filenames).toContain('0000_baseline.sql');
    expect(filenames).toContain('0001_remove_partner_apps.sql');
    expect(filenames).toContain('0002_remove_teams.sql');
  });

  it('generates staging manifest with default namespace boldcreate-stag', () => {
    const manifest = generateMigrationManifest({ env: 'staging' });
    expect(manifest).toContain('namespace: boldcreate-stag');
    expect(manifest).toContain('name: boldcreate-migration-sql');
    expect(manifest).toContain('name: boldcreate-migration-job');
    expect(manifest).toContain('0000_baseline.sql: |-');
    expect(manifest).toContain('0001_remove_partner_apps.sql: |-');
    expect(manifest).toContain('0002_remove_teams.sql: |-');
    expect(manifest).toContain('boldcreate-staging-integrations-api:latest');
  });

  it('generates preproduction manifest with namespace boldcreate-preprod', () => {
    const manifest = generateMigrationManifest({ env: 'preproduction' });
    expect(manifest).toContain('namespace: boldcreate-preprod');
    expect(manifest).toContain('boldcreate-preprod-integrations-api:latest');
  });

  it('generates production manifest with namespace boldcreate-prod', () => {
    const manifest = generateMigrationManifest({ env: 'production' });
    expect(manifest).toContain('namespace: boldcreate-prod');
    expect(manifest).toContain(
      'image: us-east4-docker.pkg.dev/syncfusioncody/synccodestudio/boldcreate-production-integrations-api:latest',
    );
  });

  it('embeds direct DATABASE_URL when supplied', () => {
    const manifest = generateMigrationManifest({
      env: 'staging',
      databaseUrl: 'postgresql://app_migrator:FIXTURE_password@10.0.0.5:5432/appdb',
    });
    expect(manifest).toContain('name: DATABASE_URL');
    expect(manifest).toContain(
      'value: "postgresql://app_migrator:FIXTURE_password@10.0.0.5:5432/appdb"',
    );
  });

  it('supports custom secretKeyRef for DATABASE_URL', () => {
    const manifest = generateMigrationManifest({
      env: 'production',
      databaseUrlSecretName: 'custom-db-secret',
      databaseUrlSecretKey: 'CONN_STR',
    });
    expect(manifest).toContain('name: custom-db-secret');
    expect(manifest).toContain('key: CONN_STR');
  });

  it('parses CLI arguments correctly', () => {
    const args = [
      '--env',
      'production',
      '--namespace',
      'custom-prod',
      '--database-url',
      'postgres://localhost/test',
      '--image',
      'my-custom-image:1.0',
      '--job-name',
      'custom-migration-job',
      '--out',
      '/tmp/migration.yaml',
    ];
    const options = parseCliArgs(args);
    expect(options.env).toBe('production');
    expect(options.namespace).toBe('custom-prod');
    expect(options.databaseUrl).toBe('postgres://localhost/test');
    expect(options.image).toBe('my-custom-image:1.0');
    expect(options.jobName).toBe('custom-migration-job');
    expect(options.outputPath).toBe('/tmp/migration.yaml');
  });
});
