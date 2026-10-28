/**
 * Contract suites.
 *
 * A suite for a port lives in `<port>.contract.ts` in this folder and exports
 * `run<Port>Contract(label, make)`, where `make` builds the adapter under test:
 *
 *   make: () => Promise<{ port: XPort; cleanup(): Promise<void>; faults?: ... }>
 *
 * Each adapter has a runner file `src/<adapter>/<adapter>.contract.test.ts` that calls the suite.
 * This folder is test support: it is not exported from the package.
 */
export interface ContractHarness<P> {
  port: P;
  cleanup(): Promise<void>;
}

export type ContractFactory<P> = () => Promise<ContractHarness<P>>;
