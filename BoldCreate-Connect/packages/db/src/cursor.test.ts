import { describe, it, expect } from 'vitest';
import { encodeCursor, decodeCursor } from './cursor.js';

describe('encodeCursor / decodeCursor', () => {
  it('round-trips a cursor', () => {
    const date = new Date('2026-06-15T12:00:00.000Z');
    const id = 'abc-123';
    const encoded = encodeCursor(date, id);
    const decoded = decodeCursor(encoded);
    expect(decoded.createdAt).toBe(date.toISOString());
    expect(decoded.id).toBe(id);
  });

  it('produces a base64url string (no +, /, =)', () => {
    const encoded = encodeCursor(new Date(), 'some-id');
    expect(encoded).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it('throws on invalid base64', () => {
    expect(() => decodeCursor('!!!not-base64!!!')).toThrow('invalid_cursor');
  });

  it('throws when decoded JSON is missing createdAt', () => {
    const bad = Buffer.from(JSON.stringify({ id: 'x' })).toString('base64url');
    expect(() => decodeCursor(bad)).toThrow('invalid_cursor');
  });

  it('throws when decoded JSON is missing id', () => {
    const bad = Buffer.from(JSON.stringify({ createdAt: '2026-01-01T00:00:00.000Z' })).toString(
      'base64url',
    );
    expect(() => decodeCursor(bad)).toThrow('invalid_cursor');
  });

  it('throws when decoded value is not an object', () => {
    const bad = Buffer.from(JSON.stringify(42)).toString('base64url');
    expect(() => decodeCursor(bad)).toThrow('invalid_cursor');
  });

  it('throws when decoded value is null', () => {
    const bad = Buffer.from(JSON.stringify(null)).toString('base64url');
    expect(() => decodeCursor(bad)).toThrow('invalid_cursor');
  });

  it('throws when createdAt is not a string', () => {
    const bad = Buffer.from(JSON.stringify({ createdAt: 123, id: 'x' })).toString('base64url');
    expect(() => decodeCursor(bad)).toThrow('invalid_cursor');
  });

  it('throws when id is not a string', () => {
    const bad = Buffer.from(
      JSON.stringify({ createdAt: '2026-01-01T00:00:00.000Z', id: 99 }),
    ).toString('base64url');
    expect(() => decodeCursor(bad)).toThrow('invalid_cursor');
  });
});
