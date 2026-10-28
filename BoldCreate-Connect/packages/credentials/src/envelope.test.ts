import { describe, expect, it } from 'vitest';
import {
  EnvelopeFormatError,
  buildOrgKeyAad,
  buildSealAad,
  formatEnvelope,
  parseEnvelope,
} from './envelope.js';

const keyId = '0b8f6c1a-2d3e-4f50-8a9b-1c2d3e4f5a6b';
const orgId = '11111111-2222-4333-8444-555555555555';
const enc = new Uint8Array(32).map((_, index) => index);
const ciphertext = new Uint8Array(40).map((_, index) => 255 - index);
const text = (aad: Uint8Array) => new TextDecoder().decode(aad);

describe('envelope', () => {
  it('formats and parses', () => {
    const value = formatEnvelope({ orgKeyId: keyId, enc, ciphertext });
    expect(value.startsWith('v1:okey_0b8f6c1a2d3e4f508a9b1c2d3e4f5a6b:')).toBe(true);
    expect(parseEnvelope(value)).toEqual({ orgKeyId: keyId, enc, ciphertext });
  });

  const valid = formatEnvelope({ orgKeyId: keyId, enc, ciphertext });
  const [version, key, encPart, ctPart] = valid.split(':') as [string, string, string, string];

  it.each([
    ['a missing segment', `${version}:${key}:${encPart}`],
    ['an extra segment', `${valid}:x`],
    ['version v2', `v2:${key}:${encPart}:${ctPart}`],
    ['no okey prefix', `${version}:0b8f6c1a2d3e4f508a9b1c2d3e4f5a6b:${encPart}:${ctPart}`],
    ['another prefix', `${version}:org_0b8f6c1a2d3e4f508a9b1c2d3e4f5a6b:${encPart}:${ctPart}`],
    [
      'an uppercase key id',
      `${version}:okey_0B8F6C1A2D3E4F508A9B1C2D3E4F5A6B:${encPart}:${ctPart}`,
    ],
    ['a short key id', `${version}:okey_0b8f:${encPart}:${ctPart}`],
    ['standard base64 characters', `${version}:${key}:${encPart.replaceAll('-', '+')}=:${ctPart}`],
    ['padding', `${version}:${key}:${encPart}=:${ctPart}`],
    ['an empty ciphertext', `${version}:${key}:${encPart}:`],
    ['a short enc', `${version}:${key}:${encPart.slice(0, 20)}:${ctPart}`],
    ['a ciphertext shorter than a tag', `${version}:${key}:${encPart}:AAAA`],
    ['non-canonical base64url', `${version}:${key}:${encPart.slice(0, -1)}B:${ctPart}`],
    ['an empty string', ''],
  ])('rejects %s', (_, value) => {
    expect(() => parseEnvelope(value)).toThrow(EnvelopeFormatError);
  });
});

describe('associated data', () => {
  const subjectId = '99999999-8888-4777-8666-555555555555';
  const serverId = '00000000-1111-4222-8333-444444444444';

  it('is the canonical pipe-separated string', () => {
    expect(
      text(
        buildSealAad({
          purpose: 'connection_secret',
          orgId,
          subject: { kind: 'connection', id: subjectId },
        }),
      ),
    ).toBe(`bc1|connection_secret|${orgId}|connection|${subjectId}|-`);
    expect(
      text(
        buildSealAad({
          purpose: 'oauth_client_secret',
          orgId,
          subject: { kind: 'mcp_server', id: subjectId },
          serverId,
        }),
      ),
    ).toBe(`bc1|oauth_client_secret|${orgId}|mcp_server|${subjectId}|${serverId}`);
  });

  it('rejects a subject kind that does not belong to the purpose and a non-uuid org', () => {
    expect(() =>
      buildSealAad({
        purpose: 'connection_secret',
        orgId,
        subject: { kind: 'installation', id: 'x' },
      }),
    ).toThrow('subject kind mismatch');
    expect(() =>
      buildSealAad({
        purpose: 'connection_secret',
        orgId: 'not-a-uuid',
        subject: { kind: 'connection', id: 'x' },
      }),
    ).toThrow(EnvelopeFormatError);
  });

  it('names the org key wrap context', () => {
    expect(text(buildOrgKeyAad(orgId, keyId))).toBe(
      `bc1|org_key|${orgId}|okey_0b8f6c1a2d3e4f508a9b1c2d3e4f5a6b`,
    );
  });
});
