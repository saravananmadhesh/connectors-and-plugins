import { describe, it, expect } from 'vitest';
import {
  AUDIT_ACTIONS,
  AuditActionSchema,
  EVENT_NAME_SHAPE,
  JOB_TYPES,
  JobTypeSchema,
  endsInParticiple,
} from './events.js';

describe('event registry', () => {
  it('gives every entry the <noun>.<verb> shape', () => {
    for (const name of [...AUDIT_ACTIONS, ...JOB_TYPES]) expect(name).toMatch(EVENT_NAME_SHAPE);
  });

  it('ends every audit action in a past participle', () => {
    for (const action of AUDIT_ACTIONS) expect(endsInParticiple(action)).toBe(true);
  });

  it('accepts and rejects the documented examples', () => {
    for (const ok of [
      'user.signed_in',
      'user.sign_in_failed',
      'user.secret_set',
      'member.role_changed',
      'user.signed_out',
    ]) {
      expect(endsInParticiple(ok)).toBe(true);
    }
    for (const bad of ['revision.bump', 'email.api_key_expiring', 'org.restore']) {
      expect(endsInParticiple(bad)).toBe(false);
    }
  });

  it('has no duplicates inside a list', () => {
    expect(new Set(AUDIT_ACTIONS).size).toBe(AUDIT_ACTIONS.length);
    expect(new Set(JOB_TYPES).size).toBe(JOB_TYPES.length);
  });

  it('registers the actions the mutations and the denial path write', () => {
    for (const action of [
      'org.created',
      'member.added',
      'member.removed',
      'member.role_changed',
      'invite.created',
      'invite.revoked',
      'invite.resent',
      'installation.created',
      'installation.updated',
      'installation.deleted',
      'api_key.created',
      'api_key.revoked',
      'permission.denied',
    ]) {
      expect(AUDIT_ACTIONS).toContain(action);
    }
  });

  it('derives the schemas from the lists', () => {
    expect(AuditActionSchema.options).toEqual([...AUDIT_ACTIONS]);
    expect(JobTypeSchema.options).toEqual([...JOB_TYPES]);
  });
});
