# Conformance suites

Contract suites that every adapter of a port must pass: `kms`, `cache`, `lock`, `limiter`, `blob`,
`queue`, `email`, `secrets` and `clock`. Rule: a new port adapter means a new contract run here.
Suites that need real cloud services are named `*.staging.test.ts` and run only through
`pnpm test:staging`.
