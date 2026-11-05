/**
 * Creates the database roles and applies `ROLE_GRANTS` to them.
 *
 * Every app connects as its own login role with exactly the privileges listed for it. The
 * migrator role owns every object and bypasses row-level security; only the migration script
 * uses it. Passwords are passed in, never stored in code or migrations.
 */
import { ROLE_GRANTS, ROLE_NAMES, type RoleName, type TableGrant } from './role-grants.js';

export type LoginRole = RoleName | 'migrator';

export const MIGRATOR_ROLE = 'app_migrator';

/** The PostgreSQL role name of an app role: `app_<name>`. */
export function dbRoleName(role: LoginRole): string {
  return `app_${role}`;
}

/** Roles that read across organizations by design: the gateway; the migrator owns everything. */
const BYPASS_RLS: ReadonlySet<LoginRole> = new Set<LoginRole>(['gateway', 'migrator']);

export const DEFAULT_CONNECTION_LIMITS: Record<LoginRole, number> = {
  api: 40,
  gateway: 40,
  worker: 20,
  admin: 10,
  migrator: 5,
};

/** Something that runs one SQL statement; `pg.Client` and `pg.Pool` both qualify. */
export interface SqlClient {
  query(text: string): Promise<unknown>;
}

/** Session settings a role starts with; a client may still set its own when it connects. */
export interface RoleSessionDefaults {
  /** Milliseconds before a running statement is cancelled. */
  statementTimeoutMs?: number;
  /** Milliseconds a transaction may sit idle before its connection is closed. */
  idleInTransactionTimeoutMs?: number;
}

export interface RoleSetupOptions {
  passwords: Record<LoginRole, string>;
  connectionLimits?: Partial<Record<LoginRole, number>>;
  /**
   * Settings stored on the role, a second guard next to the time limits a service sends at
   * startup (PgBouncer passes those on), so a runaway statement or a stuck transaction cannot
   * hold a shared connection.
   */
  sessionDefaults?: Partial<Record<LoginRole, RoleSessionDefaults>>;
}

/**
 * Session defaults for roles that connect through a transaction pooler. Only the api had a
 * statement timeout before pooling (15 s), so only the api gets one; every serving role gets the
 * idle-in-transaction limit, which a pooler needs so a stuck client cannot hold a connection.
 */
export const POOLED_SESSION_DEFAULTS: Partial<Record<LoginRole, RoleSessionDefaults>> = {
  api: { statementTimeoutMs: 15_000, idleInTransactionTimeoutMs: 15_000 },
  gateway: { idleInTransactionTimeoutMs: 15_000 },
  worker: { idleInTransactionTimeoutMs: 15_000 },
  admin: { idleInTransactionTimeoutMs: 15_000 },
};

const quoteIdent = (name: string) => `"${name.replaceAll('"', '""')}"`;
const quoteLiteral = (value: string) => `'${value.replaceAll("'", "''")}'`;

const LOGIN_ROLES: readonly LoginRole[] = [...ROLE_NAMES, 'migrator'];

function createRoleStatements(options: RoleSetupOptions): string[] {
  const statements: string[] = [];
  for (const role of LOGIN_ROLES) {
    const name = dbRoleName(role);
    const limit = options.connectionLimits?.[role] ?? DEFAULT_CONNECTION_LIMITS[role];
    statements.push(
      `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = ${quoteLiteral(name)}) THEN CREATE ROLE ${quoteIdent(name)}; END IF; END $$`,
      `ALTER ROLE ${quoteIdent(name)} WITH LOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE ` +
        `${BYPASS_RLS.has(role) ? 'BYPASSRLS' : 'NOBYPASSRLS'} CONNECTION LIMIT ${limit} ` +
        `PASSWORD ${quoteLiteral(options.passwords[role])}`,
    );
    const defaults = options.sessionDefaults?.[role];
    for (const [setting, value] of [
      ['statement_timeout', defaults?.statementTimeoutMs],
      ['idle_in_transaction_session_timeout', defaults?.idleInTransactionTimeoutMs],
    ] as const) {
      if (value === undefined) continue;
      if (!Number.isInteger(value) || value < 0) {
        throw new Error(`${setting} for ${name} must be a whole number of milliseconds, 0 or more`);
      }
      statements.push(`ALTER ROLE ${quoteIdent(name)} SET ${setting} = ${value}`);
    }
  }
  return statements;
}

function privilegeStatements(role: RoleName, table: string, grant: TableGrant): string[] {
  const target = `public.${quoteIdent(table)}`;
  const to = quoteIdent(dbRoleName(role));
  const statements: string[] = [];
  for (const privilege of grant.privileges) {
    const columns =
      privilege === 'select' || privilege === 'update' ? grant.columns?.[privilege] : undefined;
    const keyword = privilege.toUpperCase();
    statements.push(
      columns
        ? `GRANT ${keyword} (${columns.map(quoteIdent).join(', ')}) ON ${target} TO ${to}`
        : `GRANT ${keyword} ON ${target} TO ${to}`,
    );
  }
  return statements;
}

/** Every statement that makes the database match `ROLE_GRANTS`, in the order they must run. */
export function grantStatements(): string[] {
  const apps = ROLE_NAMES.map((role) => quoteIdent(dbRoleName(role)));
  const statements: string[] = [
    `REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC`,
    `REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM PUBLIC`,
    `REVOKE CREATE ON SCHEMA public FROM PUBLIC`,
    `GRANT ALL ON SCHEMA public TO ${quoteIdent(MIGRATOR_ROLE)}`,
    // The migrator owns every table and sequence, including those created by an earlier login.
    `DO $$ DECLARE r record; BEGIN
       FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tableowner <> ${quoteLiteral(MIGRATOR_ROLE)} LOOP
         EXECUTE format('ALTER TABLE public.%I OWNER TO ${MIGRATOR_ROLE}', r.tablename);
       END LOOP;
       FOR r IN SELECT sequencename FROM pg_sequences WHERE schemaname = 'public' AND sequenceowner <> ${quoteLiteral(MIGRATOR_ROLE)} LOOP
         EXECUTE format('ALTER SEQUENCE public.%I OWNER TO ${MIGRATOR_ROLE}', r.sequencename);
       END LOOP;
     END $$`,
    // Tables added later start without any privilege until `ROLE_GRANTS` lists them.
    `ALTER DEFAULT PRIVILEGES FOR ROLE ${quoteIdent(MIGRATOR_ROLE)} IN SCHEMA public REVOKE ALL ON TABLES FROM PUBLIC, ${apps.join(', ')}`,
    `ALTER DEFAULT PRIVILEGES FOR ROLE ${quoteIdent(MIGRATOR_ROLE)} IN SCHEMA public REVOKE ALL ON SEQUENCES FROM PUBLIC, ${apps.join(', ')}`,
  ];
  for (const role of ROLE_NAMES) {
    const to = quoteIdent(dbRoleName(role));
    statements.push(
      `GRANT USAGE ON SCHEMA public TO ${to}`,
      `REVOKE ALL ON ALL TABLES IN SCHEMA public FROM ${to}`,
      `REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM ${to}`,
    );
    for (const [table, grant] of Object.entries(ROLE_GRANTS[role])) {
      statements.push(...privilegeStatements(role, table, grant));
    }
  }
  return statements;
}

/** Creates the login roles (or updates their password and limits). Safe to run repeatedly. */
export async function createRoles(client: SqlClient, options: RoleSetupOptions): Promise<void> {
  for (const statement of createRoleStatements(options)) await client.query(statement);
}

/**
 * Creates the roles and applies the grants in one transaction. Run it after the migrations, with a
 * login that may create roles and change ownership, on a single connection (a `pg.Client` or a
 * pool of one); it is safe to run repeatedly.
 */
export async function applyRoleGrants(client: SqlClient, options: RoleSetupOptions): Promise<void> {
  await createRoles(client, options);
  // One transaction, so a running app never sees the revoked state between the two halves.
  await client.query('BEGIN');
  try {
    for (const statement of grantStatements()) await client.query(statement);
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}
