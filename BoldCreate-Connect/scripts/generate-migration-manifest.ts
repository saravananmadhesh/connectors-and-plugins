import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..');
const MIGRATIONS_DIR = join(REPO_ROOT, 'packages', 'db', 'migrations');

export interface MigrationManifestOptions {
  env?: 'staging' | 'preproduction' | 'production' | undefined;
  namespace?: string | undefined;
  databaseUrl?: string | undefined;
  databaseUrlSecretName?: string | undefined;
  databaseUrlSecretKey?: string | undefined;
  image?: string | undefined;
  jobName?: string | undefined;
  outputPath?: string | undefined;
}

const DEFAULT_NAMESPACES: Record<string, string> = {
  staging: 'boldcreate-stag',
  preproduction: 'boldcreate-preprod',
  production: 'boldcreate-prod',
};

const DEFAULT_IMAGES: Record<string, string> = {
  staging:
    'us-central1-docker.pkg.dev/codestudio-dev/synccodestudio/boldcreate-staging-integrations-api:latest',
  preproduction:
    'us-central1-docker.pkg.dev/codestudio-dev/synccodestudio/boldcreate-preprod-integrations-api:latest',
  production:
    'us-central1-docker.pkg.dev/codestudio-dev/synccodestudio/boldcreate-prod-integrations-api:latest',
};

export function getMigrationFiles(): Array<{ filename: string; content: string }> {
  const files = readdirSync(MIGRATIONS_DIR)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  return files.map((filename) => ({
    filename,
    content: readFileSync(join(MIGRATIONS_DIR, filename), 'utf8'),
  }));
}

function indent(text: string, spaces: number): string {
  const pad = ' '.repeat(spaces);
  return text
    .split('\n')
    .map((line) => (line.length > 0 ? `${pad}${line}` : ''))
    .join('\n');
}

export function generateMigrationManifest(options: MigrationManifestOptions = {}): string {
  const env = options.env ?? 'staging';
  const namespace = options.namespace ?? DEFAULT_NAMESPACES[env] ?? `boldcreate-${env}`;
  const image = options.image ?? DEFAULT_IMAGES[env] ?? DEFAULT_IMAGES.staging;
  const jobName = options.jobName ?? 'boldcreate-migration-job';
  let databaseUrl = options.databaseUrl ?? process.env.DATABASE_URL;

  // If no database URL or secretKeyRef is configured, default to the staging app_migrator URL
  if (!databaseUrl && !options.databaseUrlSecretName) {
    databaseUrl =
      process.env.STAGING_MIGRATOR_DATABASE_URL ??
      'postgresql://app_migrator:BoldCreateMigrator_8d2a6c4f1e7b@10.210.160.14:5432/postgres?sslmode=no-verify';
  }

  const migrationFiles = getMigrationFiles();

  let configMapData = '';
  for (const { filename, content } of migrationFiles) {
    configMapData += `  ${filename}: |-\n${indent(content.trimEnd(), 4)}\n`;
  }

  let envSection = `            - name: NODE_TLS_REJECT_UNAUTHORIZED
              value: "0"`;
  if (databaseUrl) {
    envSection += `\n            - name: DATABASE_URL
              value: "${databaseUrl.replace(/"/g, '\\"')}"`;
  } else if (options.databaseUrlSecretName && options.databaseUrlSecretKey) {
    envSection += `\n            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: ${options.databaseUrlSecretName}
                  key: ${options.databaseUrlSecretKey}`;
  } else {
    envSection += `\n            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: boldcreate-integrations-api-secrets-${env}
                  key: DATABASE_URL`;
  }

  const manifest = `apiVersion: v1
kind: ConfigMap
metadata:
  name: boldcreate-migration-sql
  namespace: ${namespace}
data:
${configMapData.trimEnd()}
---
apiVersion: batch/v1
kind: Job
metadata:
  name: ${jobName}
  namespace: ${namespace}
  labels:
    app.kubernetes.io/name: boldcreate-migration
    app.kubernetes.io/part-of: boldcreate-integrations
    app.kubernetes.io/environment: ${env}
spec:
  ttlSecondsAfterFinished: 1800
  backoffLimit: 2
  template:
    metadata:
      labels:
        app.kubernetes.io/name: boldcreate-migration
        app.kubernetes.io/environment: ${env}
    spec:
      restartPolicy: OnFailure
      containers:
        - name: migrator
          image: ${image}
          imagePullPolicy: Always
          env:
${envSection}
          volumeMounts:
            - name: sql-files
              mountPath: /sql
              readOnly: true
          command:
            - node
            - --input-type=module
            - -e
            - |
              import fs from 'node:fs';
              import path from 'node:path';
              import pg from 'pg';

              async function runMigrations() {
                const dbUrl = process.env.DATABASE_URL;
                if (!dbUrl) {
                  throw new Error('DATABASE_URL environment variable is required');
                }

                console.log('Connecting to database...');
                const client = new pg.Client({
                  connectionString: dbUrl,
                  ssl: { rejectUnauthorized: false }
                });

                await client.connect();
                console.log('Connected successfully!');

                console.log('Ensuring __applied_migrations table exists...');
                await client.query(\`
                  CREATE TABLE IF NOT EXISTS __applied_migrations (
                    id SERIAL PRIMARY KEY,
                    name TEXT UNIQUE NOT NULL,
                    applied_at TIMESTAMPTZ DEFAULT NOW()
                  );
                \`);

                const { rows } = await client.query('SELECT name FROM __applied_migrations');
                const applied = new Set(rows.map(r => r.name));

                const { rows: tableCheck } = await client.query(\`
                  SELECT 1 FROM information_schema.tables 
                  WHERE table_schema = 'public' AND table_name = 'user'
                \`);

                if (tableCheck.length > 0 && !applied.has('0000_baseline.sql')) {
                  console.log('[RECORD] Baseline tables already exist; recording 0000_baseline.sql as applied.');
                  await client.query(
                    'INSERT INTO __applied_migrations (name) VALUES ($1) ON CONFLICT DO NOTHING',
                    ['0000_baseline.sql']
                  );
                  applied.add('0000_baseline.sql');
                }

                // Auto-record 0001_remove_partner_apps.sql if partner_app table does not exist
                const { rows: partnerCheck } = await client.query(\`
                  SELECT 1 FROM information_schema.tables 
                  WHERE table_schema = 'public' AND table_name = 'partner_app'
                \`);
                if (partnerCheck.length === 0 && !applied.has('0001_remove_partner_apps.sql')) {
                  console.log('[RECORD] partner_app table already absent; recording 0001_remove_partner_apps.sql as applied.');
                  await client.query(
                    'INSERT INTO __applied_migrations (name) VALUES ($1) ON CONFLICT DO NOTHING',
                    ['0001_remove_partner_apps.sql']
                  );
                  applied.add('0001_remove_partner_apps.sql');
                }

                // Auto-record 0002_remove_teams.sql if team table does not exist
                const { rows: teamCheck } = await client.query(\`
                  SELECT 1 FROM information_schema.tables 
                  WHERE table_schema = 'public' AND table_name = 'team'
                \`);
                if (teamCheck.length === 0 && !applied.has('0002_remove_teams.sql')) {
                  console.log('[RECORD] team table already absent; recording 0002_remove_teams.sql as applied.');
                  await client.query(
                    'INSERT INTO __applied_migrations (name) VALUES ($1) ON CONFLICT DO NOTHING',
                    ['0002_remove_teams.sql']
                  );
                  applied.add('0002_remove_teams.sql');
                }

                const files = fs.readdirSync('/sql')
                  .filter(f => f.endsWith('.sql'))
                  .sort();

                console.log('Found migration files:', files);

                for (const file of files) {
                  if (applied.has(file)) {
                    console.log(\`[SKIP] Already applied: \${file}\`);
                    continue;
                  }

                  console.log(\`[APPLYING] \${file}...\`);
                  const sql = fs.readFileSync(path.join('/sql', file), 'utf8');

                  await client.query('BEGIN');
                  try {
                    await client.query(sql);
                    await client.query(
                      'INSERT INTO __applied_migrations (name) VALUES ($1)',
                      [file]
                    );
                    await client.query('COMMIT');
                    console.log(\`[SUCCESS] Applied \${file}\`);
                  } catch (err) {
                    await client.query('ROLLBACK');
                    console.error(\`[FAIL] Error in \${file}:\`, err.message);
                    throw err;
                  }
                }

                console.log('Ensuring database role grants...');
                await client.query(\`
                  DO \\$\\$
                  BEGIN
                    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_migrator') THEN
                      GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_migrator;
                      GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_migrator;
                    END IF;

                    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_api') THEN
                      GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_api;
                      GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_api;
                      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_api;
                      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_api;
                    END IF;

                    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_gateway') THEN
                      GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_gateway;
                      GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_gateway;
                      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_gateway;
                      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_gateway;
                    END IF;

                    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_admin') THEN
                      GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_admin;
                      GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_admin;
                      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_admin;
                      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_admin;
                    END IF;

                    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'app_worker') THEN
                      GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_worker;
                      GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_worker;
                      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO app_worker;
                      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO app_worker;
                    END IF;
                  END
                  \\$\\$;
                \`);

                console.log('All migrations and permissions verified successfully!');
                await client.end();
              }

              runMigrations().catch(err => {
                console.error('Fatal migration failure:', err);
                process.exit(1);
              });
      volumes:
        - name: sql-files
          configMap:
            name: boldcreate-migration-sql
`;

  return manifest;
}

export function parseCliArgs(args: string[]): MigrationManifestOptions {
  const options: MigrationManifestOptions = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--env' || arg === '-e') {
      const val = args[++i] as 'staging' | 'preproduction' | 'production';
      options.env = val;
    } else if (arg === '--namespace' || arg === '-n') {
      options.namespace = args[++i];
    } else if (arg === '--database-url') {
      options.databaseUrl = args[++i];
    } else if (arg === '--database-url-secret') {
      options.databaseUrlSecretName = args[++i];
    } else if (arg === '--database-url-key') {
      options.databaseUrlSecretKey = args[++i];
    } else if (arg === '--image') {
      options.image = args[++i];
    } else if (arg === '--job-name') {
      options.jobName = args[++i];
    } else if (arg === '--out' || arg === '-o') {
      options.outputPath = args[++i];
    }
  }

  return options;
}

if (process.argv[1] === __filename) {
  const options = parseCliArgs(process.argv.slice(2));
  const manifest = generateMigrationManifest(options);

  if (options.outputPath) {
    writeFileSync(options.outputPath, manifest, 'utf8');
    process.stdout.write(`Generated migration manifest to ${options.outputPath}\n`);
  } else {
    process.stdout.write(manifest);
  }
}
