import { describe, expect, it } from 'vitest';
import { ROLE_GRANTS, ROLE_NAMES } from './role-grants.js';
import {
  applyRoleGrants,
  createRoles,
  dbRoleName,
  grantStatements,
  type LoginRole,
  type SqlClient,
} from './role-setup.js';

const passwords: Record<LoginRole, string> = {
  api: 'pw-api',
  worker: 'pw-worker',
  admin: 'pw-admin',
  gateway: 'pw-gateway',
  migrator: "pw-mig'rator",
};

function recorder(failOn?: (sql: string) => boolean) {
  const statements: string[] = [];
  const client: SqlClient = {
    async query(text) {
      statements.push(text);
      if (failOn?.(text)) throw new Error('boom');
    },
  };
  return { client, statements };
}

describe('createRoles', () => {
  it('creates a login role per app and the migrator, with the generated passwords', async () => {
    const { client, statements } = recorder();
    await createRoles(client, { passwords });
    const alters = statements.filter((s) => s.startsWith('ALTER ROLE'));
    expect(alters).toHaveLength(ROLE_NAMES.length + 1);
    for (const role of [...ROLE_NAMES, 'migrator'] as const) {
      expect(alters.some((s) => s.includes(`"${dbRoleName(role)}"`))).toBe(true);
    }
    expect(alters.every((s) => s.includes('LOGIN NOINHERIT NOSUPERUSER'))).toBe(true);
  });

  it('lets only the gateway and the migrator bypass row-level security', async () => {
    const { client, statements } = recorder();
    await createRoles(client, { passwords });
    const bypass = statements
      .filter((s) => s.startsWith('ALTER ROLE') && / BYPASSRLS /.test(s))
      .map((s) => /ALTER ROLE "([a-z_]+)"/.exec(s)?.[1]);
    expect(bypass.sort()).toEqual(['app_gateway', 'app_migrator']);
  });

  it('escapes quotes in a password and applies connection limits', async () => {
    const { client, statements } = recorder();
    await createRoles(client, { passwords, connectionLimits: { api: 7 } });
    const migrator = statements.find((s) => s.includes('"app_migrator"') && s.includes('PASSWORD'));
    expect(migrator).toContain("PASSWORD 'pw-mig''rator'");
    const api = statements.find((s) => s.startsWith('ALTER ROLE "app_api"'));
    expect(api).toContain('CONNECTION LIMIT 7');
  });
});

describe('grantStatements', () => {
  const statements = grantStatements();

  it('takes everything from PUBLIC first and never grants to PUBLIC', () => {
    expect(statements[0]).toBe('REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC');
    expect(statements.filter((s) => s.startsWith('GRANT') && /TO PUBLIC/i.test(s))).toEqual([]);
  });

  it('grants exactly the listed privileges, with column lists where restricted', () => {
    expect(statements).toContain('GRANT SELECT ON public."user" TO "app_api"');
    expect(statements).toContain('GRANT SELECT ON public."org_key" TO "app_api"');
    expect(statements).toContain(
      'GRANT UPDATE ("key_state") ON public."organization" TO "app_worker"',
    );
    expect(statements).not.toContain('GRANT SELECT ON public."org_key" TO "app_worker"');
  });

  it('emits one grant per listed privilege and nothing for an empty entry', () => {
    let expected = 0;
    for (const role of ROLE_NAMES) {
      for (const grant of Object.values(ROLE_GRANTS[role])) expected += grant.privileges.length;
    }
    const grants = statements.filter((s) => /^GRANT (SELECT|INSERT|UPDATE|DELETE)/.test(s));
    expect(grants).toHaveLength(expected);
    expect(statements.some((s) => s.includes('"session" TO "app_worker"'))).toBe(false);
  });

  it('makes the migrator the owner and keeps later tables without privileges', () => {
    expect(statements.some((s) => s.includes('OWNER TO app_migrator'))).toBe(true);
    expect(
      statements.some((s) => s.startsWith('ALTER DEFAULT PRIVILEGES FOR ROLE "app_migrator"')),
    ).toBe(true);
  });
});

describe('applyRoleGrants', () => {
  it('creates the roles, then applies every grant in one transaction', async () => {
    const { client, statements } = recorder();
    await applyRoleGrants(client, { passwords });
    const begin = statements.indexOf('BEGIN');
    expect(begin).toBeGreaterThan(0);
    expect(statements.at(-1)).toBe('COMMIT');
    expect(statements.slice(begin + 1, -1)).toEqual(grantStatements());
  });

  it('rolls back and rethrows when a grant fails', async () => {
    const { client, statements } = recorder((sql) => sql.startsWith('GRANT USAGE'));
    await expect(applyRoleGrants(client, { passwords })).rejects.toThrow('boom');
    expect(statements.at(-1)).toBe('ROLLBACK');
    expect(statements).not.toContain('COMMIT');
  });
});
