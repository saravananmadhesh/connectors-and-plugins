import { describe, expect, it } from 'vitest';
import { manifestVariables } from '../ingestion/manifest.js';
import { scanOf } from './admin-plugins.js';

const SCAN = {
  fileCount: 1,
  totalBytes: 10,
  components: [],
  hookCommands: [],
  mcpServers: [],
  skipped: [],
  findings: [],
  variables: [
    { name: 'type', description: '', required: false, secret: false },
    { name: 'properties', description: '', required: false, secret: false },
    { name: 'required', description: '', required: false, secret: false },
  ],
};

const row = (manifest: unknown, scan: unknown = SCAN) => ({ manifest, scan }) as never;

describe('scanOf variables', () => {
  it('lists the real variables of a manifest written as a JSON Schema, not the schema keywords', () => {
    const scan = scanOf(
      row({
        variables: {
          type: 'object',
          properties: { GITHUB_TOKEN: { type: 'string', description: 'Token' } },
          required: ['GITHUB_TOKEN'],
        },
      }),
    );
    expect(scan?.variables).toEqual([
      { name: 'GITHUB_TOKEN', description: 'Token', required: true, secret: true },
    ]);
  });

  it('leaves a plain map of names as the scan recorded it', () => {
    const recorded = [{ name: 'API_URL', description: 'Base', required: true, secret: false }];
    const scan = scanOf(
      row({ variables: { API_URL: { required: true } } }, { ...SCAN, variables: recorded }),
    );
    expect(scan?.variables).toEqual(recorded);
  });

  it('leaves the scan alone for a manifest without variables', () => {
    expect(scanOf(row({ name: 'x' }))?.variables).toEqual(SCAN.variables);
  });

  it('lists none for a schema without properties', () => {
    expect(scanOf(row({ variables: { type: 'object', properties: {} } }))?.variables).toEqual([]);
  });

  it('keeps what the scan recorded when the manifest cannot be read for variables', () => {
    expect(scanOf(row({ variables: ['not', 'an', 'object'] }))?.variables).toEqual(SCAN.variables);
    expect(scanOf(row({ variables: { 'bad name': {} } }))?.variables).toEqual(SCAN.variables);
    expect(scanOf(row('not an object'))?.variables).toEqual(SCAN.variables);
    expect(scanOf(row(null))?.variables).toEqual(SCAN.variables);
  });

  it('gives no scan for a version that was never scanned', () => {
    expect(scanOf(row({ variables: { A: {} } }, null))).toBeNull();
  });
});

describe('manifestVariables', () => {
  it('is undefined for anything that is not a manifest object', () => {
    expect(manifestVariables(undefined)).toBeUndefined();
    expect(manifestVariables([])).toBeUndefined();
  });

  it('is undefined unless the variables are written as a JSON Schema', () => {
    expect(manifestVariables({})).toBeUndefined();
    expect(manifestVariables({ variables: { API_URL: {} } })).toBeUndefined();
    expect(manifestVariables({ variables: { type: 'object' } })).toBeUndefined();
  });

  it('lists the properties of a schema', () => {
    expect(
      manifestVariables({ variables: { type: 'object', properties: { A_B: { title: 'A' } } } }),
    ).toEqual([{ name: 'A_B', description: 'A', required: false, secret: false }]);
  });
});
