/**
 * Unsealing: opens an envelope with the org private key, which is fetched from the key
 * management service only on a cache miss. Any failure is an error; nothing is ever reset or
 * replaced silently.
 */
import {
  KmsInvalidCiphertextError,
  KmsKeyDisabledError,
  KmsKeyNotFoundError,
  type KmsPort,
} from '@boldcreate-integrations/ports';
import { CredentialUnavailableError } from './errors.js';
import {
  EnvelopeFormatError,
  buildOrgKeyAad,
  buildSealAad,
  fromBase64Url,
  parseEnvelope,
  type ParsedEnvelope,
  type SealContext,
} from './envelope.js';
import { hpkeOpen } from './hpke.js';
import type { OrgKeyCache } from './org-key-cache.js';
import { fieldSubjectId, transformFields } from './sensitive-fields.js';

export interface OrgKeyRecord {
  id: string;
  organizationId: string;
  /** The private key wrapped by the key management service, base64url. */
  wrappedPrivateKey: string;
  kmsKeyId: string;
  kmsKeyVersion: string;
  status: 'active' | 'retired' | 'destroyed';
}

export interface OrgKeyStore {
  /** `orgId` is the organization the key must belong to; a store that scopes rows by tenant needs it. */
  getKey(orgKeyId: string, orgId: string): Promise<OrgKeyRecord | null>;
}

export interface Unsealer {
  unseal(input: SealContext & { envelope: string }): Promise<string>;
  /** Returns a copy of `value` with each sealed string at `paths` opened. */
  unsealFields<T extends object>(value: T, paths: readonly string[], ctx: SealContext): Promise<T>;
}

export function createUnsealer(deps: {
  kms: Pick<KmsPort, 'unwrapKey'>;
  orgKeyStore: OrgKeyStore;
  keyCache: OrgKeyCache;
}): Unsealer {
  // Concurrent misses for one key share a single key management call.
  const loading = new Map<string, Promise<void>>();

  async function load(orgKeyId: string, orgId: string): Promise<void> {
    const record = await deps.orgKeyStore.getKey(orgKeyId, orgId);
    if (!record || record.organizationId !== orgId) {
      throw new CredentialUnavailableError('key_not_found');
    }
    if (record.status === 'destroyed') throw new CredentialUnavailableError('key_unusable');
    try {
      const key = await deps.kms.unwrapKey({
        keyId: record.kmsKeyId,
        keyVersion: record.kmsKeyVersion,
        wrapped: fromBase64Url(record.wrappedPrivateKey),
        aad: buildOrgKeyAad(orgId, orgKeyId),
      });
      deps.keyCache.set(orgKeyId, orgId, key);
    } catch (error) {
      if (
        error instanceof KmsKeyDisabledError ||
        error instanceof KmsKeyNotFoundError ||
        error instanceof KmsInvalidCiphertextError ||
        error instanceof EnvelopeFormatError
      ) {
        throw new CredentialUnavailableError('key_unusable', error);
      }
      throw new CredentialUnavailableError('kms_unavailable', error);
    }
  }

  /** A private copy of the key; the caller zeroes it after use. */
  async function privateKey(orgKeyId: string, orgId: string): Promise<Uint8Array> {
    const cached = deps.keyCache.get(orgKeyId, orgId);
    if (cached) return cached.slice();
    let pending = loading.get(orgKeyId);
    if (!pending) {
      pending = load(orgKeyId, orgId).finally(() => loading.delete(orgKeyId));
      loading.set(orgKeyId, pending);
    }
    await pending;
    const loaded = deps.keyCache.get(orgKeyId, orgId);
    if (!loaded) throw new CredentialUnavailableError('kms_unavailable');
    return loaded.slice();
  }

  async function unseal(input: SealContext & { envelope: string }): Promise<string> {
    let parsed: ParsedEnvelope;
    let aad: Uint8Array;
    try {
      parsed = parseEnvelope(input.envelope);
      aad = buildSealAad(input);
    } catch (error) {
      if (error instanceof EnvelopeFormatError) {
        throw new CredentialUnavailableError('malformed', error);
      }
      throw error;
    }
    const key = await privateKey(parsed.orgKeyId, input.orgId);
    try {
      const plain = await hpkeOpen({
        privateKey: key,
        enc: parsed.enc,
        ciphertext: parsed.ciphertext,
        aad,
      });
      return new TextDecoder().decode(plain);
    } catch (error) {
      throw new CredentialUnavailableError('open_failed', error, {
        purpose: input.purpose,
        subjectKind: input.subject.kind,
        orgKeyId: parsed.orgKeyId,
      });
    } finally {
      key.fill(0);
    }
  }

  return {
    unseal,
    unsealFields: (value, paths, ctx) =>
      transformFields(value, paths, (text, path) =>
        unseal({
          ...ctx,
          subject: { kind: ctx.subject.kind, id: fieldSubjectId(ctx.subject.id, path) },
          envelope: text,
        }),
      ),
  };
}
