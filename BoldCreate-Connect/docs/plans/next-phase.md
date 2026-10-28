# Next phase: release readiness

Status: pending. The project model (organizations, projects, project keys, user sessions, connections, webhooks, host SDKs) is implemented; this phase takes it to a staging release. Reference: [overview](../architecture/overview.md), [security](../architecture/security.md), [decisions](../architecture/decisions.md).

Rules for every work package are in `CLAUDE.md` and `AGENTS.md`. Never edit, rename or delete a committed migration. Record one-way-door decisions in `docs/architecture/decisions.md`. Status values: `todo`, `doing`, `done`, `blocked`, `dropped`.

## P1 Release gate

| Id   | Work                                                                                                                  | Status |
| ---- | --------------------------------------------------------------------------------------------------------------------- | ------ |
| P1.1 | Run the full `pnpm test`; confirm `overall: PASSED` with zero errors and warnings; rerun known flakes and report them | todo   |
| P1.2 | Run `pnpm test:staging` against real services (database, Redis, object store, Cloud KMS, Secret Manager, SES)         | todo   |
| P1.3 | Run the migration job on a staging copy; confirm the previous release still runs on the new schema                    | todo   |
| P1.4 | Review and merge the branch; tag the release and publish both host SDKs per `docs/guides/sdk-release.md`              | todo   |

## P2 Deployment

| Id   | Work                                                                                                                                                           | Status |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| P2.1 | Confirm `k8s/`, `docker/` and `.azure/ci.yml` and `docs/guides/deployment.md` match the root `Dockerfile` targets (`admin`, `api`, `gateway`, `worker`, `web`) | todo   |
| P2.2 | Verify probes, termination grace period and rollback as described in `docs/guides/operations.md`                                                               | todo   |
| P2.3 | Set up the SLO alerts listed in `docs/guides/operations.md` and run one restore drill                                                                          | todo   |

## P3 Not built yet

Each item needs a decision entry before work starts. All are out of scope today (see `docs/product.md`).

| Id   | Candidate                                     | Status |
| ---- | --------------------------------------------- | ------ |
| P3.1 | One shared OAuth connection used by all users | todo   |
| P3.2 | SSO, SCIM and MFA                             | todo   |
| P3.3 | Private plugin publishing                     | todo   |
| P3.4 | Triggers from external apps                   | todo   |
| P3.5 | Analytics dashboards and billing              | todo   |
