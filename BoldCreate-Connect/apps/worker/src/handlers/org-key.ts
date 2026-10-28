/**
 * Creates an organization's first key pair. The private key is wrapped by the key management
 * service and stored; only the wrapped form ever leaves this process. The job is safe to run
 * more than once: an organization that already has an active key is left alone, and two jobs
 * racing for the same version leave exactly one key.
 */
import {
  generateOrgKeyPair,
  buildOrgKeyAad,
  toBase64Url,
} from '@boldcreate-integrations/credentials';
import { randomUUID } from 'node:crypto';
import { desc, eq, and } from 'drizzle-orm';
import { orgKeyTable, organizationTable, withTenant, type Db } from '@boldcreate-integrations/db';
import { writeAudit } from '@boldcreate-integrations/domain';
import type { ClaimedJob, KmsPort } from '@boldcreate-integrations/ports';

export interface OrgKeyHandlerDeps {
  db: Db;
  /** Wrapping only: the worker never unwraps a key. */
  kms: Pick<KmsPort, 'wrapKey'>;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

function parseOrgId(payload: unknown): string {
  const orgId =
    typeof payload === 'object' && payload !== null && !Array.isArray(payload)
      ? (payload as Record<string, unknown>)['orgId']
      : undefined;
  if (typeof orgId !== 'string' || !UUID.test(orgId)) throw new Error('Invalid org key payload');
  return orgId;
}

export async function handleOrgKeyRequested(
  job: ClaimedJob,
  deps: OrgKeyHandlerDeps,
): Promise<void> {
  const orgId = parseOrgId(job.payload);
  // Key material is generated before the transaction so it holds no connection while it works.
  const pair = await generateOrgKeyPair();
  try {
    await withTenant(deps.db, { orgId }, async (tx) => {
      const [org] = await tx
        .select({ id: organizationTable.id, keyState: organizationTable.keyState })
        .from(organizationTable)
        .where(eq(organizationTable.id, orgId))
        .limit(1);
      // The organization was deleted before the job ran.
      if (!org) return;

      const [active] = await tx
        .select({ id: orgKeyTable.id })
        .from(orgKeyTable)
        .where(and(eq(orgKeyTable.organizationId, orgId), eq(orgKeyTable.status, 'active')))
        .limit(1);
      if (active) {
        if (org.keyState !== 'ready') {
          await tx
            .update(organizationTable)
            .set({ keyState: 'ready' })
            .where(eq(organizationTable.id, orgId));
        }
        return;
      }

      const [latest] = await tx
        .select({ version: orgKeyTable.version })
        .from(orgKeyTable)
        .where(eq(orgKeyTable.organizationId, orgId))
        .orderBy(desc(orgKeyTable.version))
        .limit(1);
      const version = (latest?.version ?? 0) + 1;
      const id = randomUUID();
      const wrapped = await deps.kms.wrapKey({
        plaintext: pair.privateKey,
        aad: buildOrgKeyAad(orgId, id),
      });
      const inserted = await tx
        .insert(orgKeyTable)
        .values({
          id,
          organizationId: orgId,
          version,
          publicKey: pair.publicKey,
          wrappedPrivateKey: toBase64Url(wrapped.wrapped),
          kmsKeyId: wrapped.keyId,
          kmsKeyVersion: wrapped.keyVersion,
          status: 'active',
        })
        .onConflictDoNothing()
        .returning({ id: orgKeyTable.id });
      // A concurrent duplicate job created the key first; its transaction marks the org ready.
      if (inserted.length === 0) return;

      await tx
        .update(organizationTable)
        .set({ keyState: 'ready' })
        .where(eq(organizationTable.id, orgId));
      await writeAudit(tx, {
        actor: { kind: 'system', id: 'worker' },
        action: 'org_key.created',
        target: { kind: 'org_key', id },
        orgId,
        context: { version: String(version) },
      });
    });
  } finally {
    pair.privateKey.fill(0);
  }
}
