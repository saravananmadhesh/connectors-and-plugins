/**
 * Sealing: encrypts a value to an organization's current public key. Needs no key management
 * access, so the api can hold it; only processes with an unsealer can read the value back.
 */
import { AppError } from '@boldcreate-integrations/contracts';
import { buildSealAad, formatEnvelope, fromBase64Url, type SealContext } from './envelope.js';
import { hpkeSeal } from './hpke.js';
import { fieldSubjectId, transformFields } from './sensitive-fields.js';

export interface ActiveOrgKey {
  /** Row id (uuid) of the org key. */
  orgKeyId: string;
  /** Raw 32-byte X25519 public key, base64url. */
  publicKey: string;
}

/**
 * The one accessor of the key that new values are sealed to. Returns null when the
 * organization has no usable key yet.
 */
export interface OrgKeyDirectory {
  getActivePublicKey(orgId: string): Promise<ActiveOrgKey | null>;
}

export interface Sealer {
  seal(input: SealContext & { plaintext: string }): Promise<string>;
  /** Returns a copy of `value` with each string at `paths` sealed under its own subject id. */
  sealFields<T extends object>(value: T, paths: readonly string[], ctx: SealContext): Promise<T>;
}

export function createSealer(deps: { orgKeys: OrgKeyDirectory }): Sealer {
  async function seal(input: SealContext & { plaintext: string }): Promise<string> {
    const key = await deps.orgKeys.getActivePublicKey(input.orgId);
    if (!key) throw new AppError('org_key_pending');
    const sealed = await hpkeSeal({
      publicKey: fromBase64Url(key.publicKey),
      plaintext: new TextEncoder().encode(input.plaintext),
      aad: buildSealAad(input),
    });
    return formatEnvelope({ orgKeyId: key.orgKeyId, ...sealed });
  }

  return {
    seal,
    sealFields: (value, paths, ctx) =>
      transformFields(value, paths, (text, path) =>
        seal({
          ...ctx,
          subject: { kind: ctx.subject.kind, id: fieldSubjectId(ctx.subject.id, path) },
          plaintext: text,
        }),
      ),
  };
}
