# GKE monitoring page plan

Status: proposed. Nothing in this plan is built yet. It adds a GCP Cloud Monitoring dependency and a read-only IAM role on the service accounts, which is a one-way-door change. It is recorded in `docs/architecture/decisions.md` before any code is added.

A throwaway visual of the target page is in `docs/plans/gcp-monitoring-demo.html`. It uses generated sample data and is not wired to anything.

## Goal

An admin "Monitoring" page that shows live operational metrics for the GKE clusters that run staging and production, using only free data:

- Staging and production: GKE system metrics (`kubernetes.io/*`) from Cloud Monitoring for the project of that environment.
- Local: the same panels from the local dev stack (process stats and app metrics).

Only GKE system metrics are read from Google Cloud. Nothing else is fetched: no load balancer, Cloud SQL, Cloud Storage, KMS, Secret Manager, logs, billing or cost data, and nothing from the billed metric categories below.

## What is free and what is not

Free, per the Google Cloud documentation excerpt supplied by the team:

| Category                                                                                                          | Ingestion cost | Used by the page         |
| ----------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------ |
| GKE system metrics (`kubernetes.io/*`): node, pod and container CPU, memory, restarts, ephemeral storage, network | Free           | Yes, the only GCP source |

Billed, so never used:

| Category                  | Ingestion cost                      |
| ------------------------- | ----------------------------------- |
| GKE control plane metrics | Paid                                |
| Kube-state metrics        | Paid                                |
| Custom Prometheus metrics | Paid                                |
| Application metrics       | Paid, depending on ingestion method |

Rule that keeps it free: each cluster's monitoring setting stays at system metrics only (`gcloud container clusters update CLUSTER_NAME --location REGION --monitoring=SYSTEM`). The page does not enable anything, does not create metrics and does not read from the billed categories. A per-tab allowlist (`kubernetes.io/` prefix and the exact metric types below) rejects every other metric type.

### API calls

The plan makes no claim about the price or allowance of Monitoring API reads. Instead the design keeps reads small and enforces a limit, so usage can never exceed what is configured:

- A hard monthly call cap (`MONITORING_MONTHLY_CALL_CAP`). When it is reached, the admin API stops calling Google Cloud, the page shows the last cached data as stale, and alert evaluation reports "monitoring data unavailable" instead of calling again. It resets on the first day of the month (UTC). The value is set by the team from their own quota or budget.
- Reads are lazy, grouped and cached (below), so usage is a small fixed number per minute per open tab.
- The cap, the calls used this month and the stop state are shown to admins on the page.

## What runs on GKE

Taken from `docs/guides/deployment.md`, `docs/deployment/production-runbook.md` and `docs/architecture/overview.md`. Staging and production both run on GKE.

| Workload                                   | Shown on the page                                                                             |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `web`, `admin`, `api`, `gateway`, `worker` | Yes                                                                                           |
| PgBouncer pods                             | Yes, pod CPU, memory, restarts and network                                                    |
| Redis pods                                 | Yes, pod level only; Redis internals are not read, because they need billed metric categories |
| Nodes                                      | Yes                                                                                           |

## GKE metrics used

| Level     | Metric (`kubernetes.io/...`)                                                                                                | Panel                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Container | `container/cpu/limit_utilization`, `container/cpu/request_utilization`                                                      | CPU against limit and request, p50, p95                   |
| Container | `container/memory/limit_utilization`, `request_utilization`, `memory/used_bytes`                                            | Memory against limit and request, used                    |
| Container | `container/restart_count`                                                                                                   | Restarts                                                  |
| Container | `container/uptime`                                                                                                          | Uptime of oldest and newest pod, pod count (series count) |
| Container | `container/ephemeral_storage/limit_utilization`                                                                             | Ephemeral storage                                         |
| Pod       | `pod/network/received_bytes_count`, `sent_bytes_count`                                                                      | Network in and out                                        |
| Node      | `node/cpu/allocatable_utilization`, `node/memory/allocatable_utilization`, `node/ephemeral_storage/allocatable_utilization` | Node pressure                                             |
| Node      | `node/network/received_bytes_count`, `sent_bytes_count`                                                                     | Node network                                              |
| Node      | `node/status_condition` (Ready)                                                                                             | Nodes ready                                               |

Data is sampled by GCP about once a minute and published with a delay, so "live" means 1 to 3 minutes behind. Pod phase and autoscaler state are not part of system metrics; the pod count is the number of `container/uptime` series per workload.

## Fetch on demand, one tab per data group

The page does not load everything. A tab fetches nothing until it is opened, polls only while it is the visible tab in a visible browser window, and shares one server-side cache with every other admin.

| Tab             | Content                                                                                                                                                           | Local source                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| **Overview**    | Per service (web, admin, api, gateway, worker): CPU and memory against limit, memory used, pods running, restarts, uptime                                         | Dev runner process stats         |
| **Workloads**   | Per workload including `pgbouncer` and `redis`: usage against request and limit, ephemeral storage, network, restarts                                             | Process CPU and memory           |
| **Nodes**       | Per node: CPU, memory and ephemeral storage of allocatable, network, pods on node; summary of nodes ready                                                         | Host CPU and memory              |
| **App signals** | Not Google Cloud. Our own metrics emitted by the pods: in-flight, event-loop lag, load shedding, DB admission gate, PgBouncer pool use. Zero Monitoring API calls | Same source in every environment |
| **Alerts**      | Edit rules, see state and recent mails. Reads the same series as the other tabs                                                                                   | Same rules, mail to Mailpit      |

App signals is the only tab that is not GKE system data. It is kept because it separates "GKE is under pressure" from "our own limits tripped", and it makes no Google Cloud calls. It can be removed without touching the rest.

### API call design

- Each tab sends a fixed number of `timeSeries.list` calls, one per metric type, grouped with `group_by_fields` (by workload or node), never one per pod.
- Overview about 5 calls, Workloads about 8, Nodes about 7, App signals 0.
- The cache is keyed by the metric query, not by tab, so Overview and Workloads share the limit utilization and restart series. Switching tabs costs only the metrics that are not already fresh.
- The cache TTL is 30 to 60 seconds and is shared, so two admins on the same tab cost the same as one.
- Hidden tabs, hidden windows and idle sessions (no input for 10 minutes) stop polling.
- Metric and workload discovery is cached for 1 hour.
- Every call is counted. Calls are logged as a metric and checked against `MONITORING_MONTHLY_CALL_CAP` before they are sent.

## Alerts

Email when a metric crosses a threshold. Alerts are evaluated and sent by our own code. No Google Cloud alerting policy, notification channel or uptime check is created.

- **Mail:** sent through the existing `ses` email adapter (AWS SES), with `EMAIL_ADAPTER=ses` in staging and production. Locally the same code sends to Mailpit. The sender identity and recipients come from configuration.
- **Evaluator:** the worker evaluates enabled rules every 2 to 5 minutes from the same cached series. It reuses fresh cache entries and only calls Google Cloud for series that are stale, within the monthly call cap.
- **Rules:** each has an id, metric, scope, warning threshold, critical threshold, "for N minutes" duration, and an enabled flag. Defaults ship in code: container CPU and memory against limit, restarts, container ephemeral storage, node CPU, memory and ephemeral storage, and the app signals (load shedding, DB gate waiting, event-loop lag). Warning must not exceed critical.
- **Configurable:** thresholds, duration and enable or disable are edited on the Alerts tab by admins. Values are stored in the database (one row per rule per environment) and audited. Defaults can be reset.
- **No noise:** a threshold must hold for its duration before it fires, one mail per incident, a recovery mail, a cooldown (default 30 minutes) before repeating, and a single "monitoring data unavailable" mail when GKE data is stale, failing or the call cap is reached.
- **Mail content:** environment, workload or node, value, threshold, severity, link to the tab, and "data may be up to 3 minutes behind". Warning goes to the general list, critical to the on-call list.
- **Limit:** the evaluator runs on the cluster it watches, so it cannot report its own outage. This plan does not add an external check.

## Architecture

```
admin web  --->  admin API  --->  MetricsProvider (interface)
                    |               |- GkeMonitoringProvider   (staging, production)
                    |               |- LocalProvider           (local)
worker (alert evaluator) --> same cache --> email adapter (ses | mailpit)
```

- The browser never talks to Google Cloud. The admin API does, using Workload Identity (no stored keys).
- Role: `roles/monitoring.viewer` on the project. Nothing writable.
- Endpoints: `GET /admin/monitoring/tabs/:tab?range=1h` returns the normalized series for that tab only. Response: `{ source, generatedAt, stale, series: [{ metric, workload, node, unit, points: [[t, v]] }], calls: { used, cap } }`. Contracts go in `packages/contracts`, so `docs/openapi` is regenerated by `pnpm build`.
- Configuration: `MONITORING_PROVIDER=gke|local`, `GCP_MONITORING_PROJECT_ID`, `GKE_CLUSTER_NAME`, `GKE_NAMESPACE` to filter series, and `MONITORING_MONTHLY_CALL_CAP`. Staging and production each use their own values.
- GCP errors (permission denied, API disabled) show as a state on that tab and never break the rest of admin.

## Admin UI

Follows `.agents/skills/admin-ui-design/`: monochrome, light and dark.

- Header: environment badge with project and cluster, time range (15m, 1h, 6h, 24h, 7d), last refreshed, auto-refresh toggle, and the calls used this month against the cap.
- Tab bar. A tab that has not been opened shows nothing until selected.
- Each tab: a summary strip, then one card per workload or node.
- Hovering a chart shows a vertical guide line and a tooltip with the timestamp and the exact value of every series at that point (p50 and p95, or in and out, where a panel has two). The tooltip is keyboard reachable on detail views.
- Empty, loading, stale (older than 5 minutes), cap-reached and error states, and a "data delayed by up to 3 minutes" note.

## Delivery steps

1. Record the decision in `docs/architecture/decisions.md` and the IAM role in the deployment docs.
2. Add the contract, the `MetricsProvider` interface, the tab definitions (metric allowlist) and the local provider.
3. Add the GKE provider (`@google-cloud/monitoring`, exact version via `pnpm add --save-catalog`), the shared query cache, the call counter with the monthly cap, and unit tests from recorded fixtures.
4. Add the alert rules store, the evaluator in the worker and the SES mail templates.
5. Add the admin page, tab bar, charts and the Alerts tab (client tests, console-clean).
6. Confirm both clusters are on system metrics only, grant the role in staging, then production. Verify real data with an opt-in staging suite, never part of `pnpm test`.
7. Update `docs/README.md` and `docs/plans/observability.md`.

## Tests

- Unit: query building, grouping, response normalization, pod count from series, percentile math, cache sharing and TTL, call counting, cap enforcement (no call is sent at the cap), allowlist rejection, error mapping, provider selection.
- Client: tab lazy loading (no request before a tab opens), polling pause when hidden or idle, range switch, states including cap reached, tooltip content.
- Alerts: threshold crossing, duration, cooldown, recovery mail, disabled rules never fire, warning above critical rejected, "data unavailable" mail, SES adapter used when configured.
- Security: the endpoint requires an admin session, returns no credentials or project secrets, rejects metrics outside the allowlist.
- Opt-in staging suite: reads one real series per metric type from the staging cluster.

## Risks

| Risk                                       | Mitigation                                                                                                      |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Billed metric categories get enabled later | Allowlist reads only `kubernetes.io/` system metric types; the cluster setting is checked in the delivery steps |
| API reads use more than intended           | Lazy tabs, grouped queries, shared cache, idle stop, and the hard monthly cap                                   |
| Metric labels differ per cluster           | Filter by configured cluster and namespace; per-metric "no data" state                                          |
| Wrong environment looked at                | Badge with project and cluster on the page                                                                      |
| Data delay mistaken for an outage          | Delay note and stale indicator                                                                                  |
| No pod phase or autoscaler state           | Pod count from `container/uptime` series; restarts and uptime show crash loops                                  |
| Redis internals not read                   | Pod metrics only, plus app signals                                                                              |
| Evaluator down with the cluster            | Stated limit; no external check in this plan                                                                    |

## Open questions

1. Do staging and production live in separate GCP projects (assumed), or one project with different clusters and namespaces? If one project, queries filter on `cluster_name` and `namespace_name` instead of a separate project ID.
2. Are the namespaces and workload names the same in both (`web`, `admin`, `api`, `gateway`, `worker`, `pgbouncer`, `redis`)?
3. Are both clusters set to system metrics only (`--monitoring=SYSTEM`)?
4. What monthly call cap should be set for each environment?
5. Staging and production only, or also a project switcher?
