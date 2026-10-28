import { describe, expect, it } from 'vitest';
import { coverageFailures, minimum, parseCoverage } from './dotnet-sdk.js';

const report = (lines: string, branches: string) =>
  `<?xml version="1.0"?><coverage line-rate="${lines}" branch-rate="${branches}" version="1.9"><packages/></coverage>`;

describe('parseCoverage', () => {
  it('reads the line and branch rates of the report', () => {
    expect(parseCoverage(report('0.9512', '0.8277'))).toEqual({ lines: 0.9512, branches: 0.8277 });
  });

  it('refuses a report without rates', () => {
    expect(() => parseCoverage('<coverage></coverage>')).toThrow(/line-rate/);
    expect(() => parseCoverage('not xml')).toThrow(/line-rate/);
  });
});

describe('coverageFailures', () => {
  it('passes at and above the minimum', () => {
    expect(coverageFailures(minimum)).toEqual([]);
    expect(coverageFailures({ lines: 1, branches: 1 })).toEqual([]);
  });

  it('names each total that is too low', () => {
    expect(coverageFailures({ lines: 0.5, branches: 0.9 })).toEqual([
      '.NET SDK lines coverage 50.0% is below 90%.',
    ]);
    expect(coverageFailures({ lines: 0.5, branches: 0.1 })).toHaveLength(2);
  });
});
