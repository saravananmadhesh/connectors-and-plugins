/**
 * The sealed-value envelope and the additional authenticated data bound to it.
 *
 * Envelope: `v1:<orgKeyId>:<base64url(enc)>:<base64url(ciphertext)>` with `orgKeyId` the wire id
 * of the org key (`okey_<32 hex>`).
 * AAD: `bc1|<purpose>|<orgId>|<subjectKind>|<subjectId>|<serverId or ->`, so a ciphertext cannot
 * move between rows, purposes or organizations.
 */
import { formatId, parseId } from '@boldcreate-integrations/contracts';
import { HPKE_ENC_BYTES, HPKE_TAG_BYTES } from './hpke.js';

/** Every kind of value that is sealed, with the kind of row it belongs to. */
export const SEAL_PURPOSES = {
  connection_secret: 'connection',
  installation_variable: 'installation',
  user_connection_token: 'user_connection',
  oauth_client_secret: 'mcp_server',
  oauth_registration_token: 'mcp_server',
  oauth_state_verifier: 'user_connection',
  mcp_api_key: 'mcp_server',
  idempotent_response: 'project',
  webhook_secret: 'project',
  auth_config_secret: 'auth_config',
  auth_config_client_secret: 'auth_config',
  connection_credentials: 'user_connection',
} as const;

export type SealPurpose = keyof typeof SEAL_PURPOSES;
export type SubjectKind = (typeof SEAL_PURPOSES)[SealPurpose];

export interface SealSubject {
  kind: SubjectKind;
  id: string;
}

export interface SealContext {
  purpose: SealPurpose;
  orgId: string;
  subject: SealSubject;
  /** The `mcp_server` the value belongs to, when there is one. */
  serverId?: string | undefined;
}

export class EnvelopeFormatError extends Error {
  constructor() {
    super('malformed envelope');
    this.name = 'EnvelopeFormatError';
  }
}

export interface ParsedEnvelope {
  /** Row id (uuid) of the org key. */
  orgKeyId: string;
  enc: Uint8Array;
  ciphertext: Uint8Array;
}

const B64URL = /^[A-Za-z0-9_-]+$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function toBase64Url(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString('base64url');
}

/** Decodes canonical unpadded base64url only; anything else throws `EnvelopeFormatError`. */
export function fromBase64Url(text: string): Uint8Array {
  if (!B64URL.test(text)) throw new EnvelopeFormatError();
  const bytes = Buffer.from(text, 'base64url');
  if (bytes.toString('base64url') !== text) throw new EnvelopeFormatError();
  return new Uint8Array(bytes);
}

export function formatEnvelope(parts: ParsedEnvelope): string {
  return `v1:${formatId('okey', parts.orgKeyId)}:${toBase64Url(parts.enc)}:${toBase64Url(parts.ciphertext)}`;
}

export function parseEnvelope(value: string): ParsedEnvelope {
  const segments = value.split(':');
  if (segments.length !== 4 || segments[0] !== 'v1') throw new EnvelopeFormatError();
  const [, keySegment, encSegment, ciphertextSegment] = segments as [
    string,
    string,
    string,
    string,
  ];
  let orgKeyId: string;
  try {
    orgKeyId = parseId('okey', keySegment);
  } catch {
    throw new EnvelopeFormatError();
  }
  const enc = fromBase64Url(encSegment);
  const ciphertext = fromBase64Url(ciphertextSegment);
  if (enc.length !== HPKE_ENC_BYTES || ciphertext.length < HPKE_TAG_BYTES) {
    throw new EnvelopeFormatError();
  }
  return { orgKeyId, enc, ciphertext };
}

function requireUuid(value: string): string {
  if (!UUID.test(value)) throw new EnvelopeFormatError();
  return value;
}

/** The AAD of a sealed value. The subject kind must be the one the purpose belongs to. */
export function buildSealAad(ctx: SealContext): Uint8Array {
  if (SEAL_PURPOSES[ctx.purpose] !== ctx.subject.kind) throw new Error('subject kind mismatch');
  const parts = [
    'bc1',
    ctx.purpose,
    requireUuid(ctx.orgId),
    ctx.subject.kind,
    ctx.subject.id,
    ctx.serverId === undefined ? '-' : requireUuid(ctx.serverId),
  ];
  return new TextEncoder().encode(parts.join('|'));
}

/** The AAD under which an org private key is wrapped by the key management service. */
export function buildOrgKeyAad(orgId: string, orgKeyId: string): Uint8Array {
  return new TextEncoder().encode(
    `bc1|org_key|${requireUuid(orgId)}|${formatId('okey', orgKeyId)}`,
  );
}
