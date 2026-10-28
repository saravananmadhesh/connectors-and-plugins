import { and, eq } from 'drizzle-orm';
import type { Executor } from '@boldcreate-integrations/db';
import { orgKeyTable, organizationTable, setRlsContext } from '@boldcreate-integrations/db';
import type {
  ActiveOrgKey,
  OrgKeyDirectory,
  OrgKeyRecord,
  OrgKeyStore,
} from '@boldcreate-integrations/credentials';

/**
 * The single accessor of the key new values are sealed to: the org's active key, and only
 * once the organization is `ready`. Selects public columns only, so it also works for a role
 * that cannot read the wrapped private key. Pass the caller's transaction: the read runs with the
 * request's tenant, which must be the organization asked for.
 */
export function createOrgKeyDirectory(db: Executor): OrgKeyDirectory {
  return {
    async getActivePublicKey(orgId): Promise<ActiveOrgKey | null> {
      const [row] = await db
        .select({ id: orgKeyTable.id, publicKey: orgKeyTable.publicKey })
        .from(orgKeyTable)
        .innerJoin(organizationTable, eq(organizationTable.id, orgKeyTable.organizationId))
        .where(
          and(
            eq(orgKeyTable.organizationId, orgId),
            eq(orgKeyTable.status, 'active'),
            eq(organizationTable.keyState, 'ready'),
          ),
        )
        .limit(1);
      return row ? { orgKeyId: row.id, publicKey: row.publicKey } : null;
    },
  };
}

/** Loads key rows, wrapped private key included, for the processes that unseal. */
export function createOrgKeyStore(db: Executor): OrgKeyStore {
  return {
    async getKey(orgKeyId, orgId): Promise<OrgKeyRecord | null> {
      // Key rows are tenant rows: the read runs with the key's organization as the tenant.
      return db.transaction(async (tx) => {
        await setRlsContext(tx, { orgId });
        const [row] = await tx
          .select({
            id: orgKeyTable.id,
            organizationId: orgKeyTable.organizationId,
            wrappedPrivateKey: orgKeyTable.wrappedPrivateKey,
            kmsKeyId: orgKeyTable.kmsKeyId,
            kmsKeyVersion: orgKeyTable.kmsKeyVersion,
            status: orgKeyTable.status,
          })
          .from(orgKeyTable)
          .where(eq(orgKeyTable.id, orgKeyId))
          .limit(1);
        return row ?? null;
      });
    },
  };
}
