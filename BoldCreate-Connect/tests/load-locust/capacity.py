"""
Capacity run: the host-product mix from locustfile.py, with users added in steps.

Each step holds a fixed number of users for a while. After each step the run checks the
step's failure rate and p95; once a step is over the line (CAPACITY_MAX_FAIL_PCT or
CAPACITY_MAX_P95_MS), the run stops. The last step under the line is the capacity.
Results per step, and per project, are written to reports/load-locust/capacity/.

Projects: PROJECT_KEYS (comma separated) or PROJECT_KEYS_FILE (one key per line) spreads the
users over several projects; PROJECT_KEY alone is one project. With CAPACITY_BUSY_SHARE_PCT
the first key gets that share of the users (a busy neighbour) and the rest share the remainder.

Settings (environment):
  CAPACITY_START_USERS     users in the first step                         (default 20)
  CAPACITY_STEP_USERS      users added each step                           (default 20)
  CAPACITY_MAX_USERS       never go above this                             (default 600)
  CAPACITY_STEP_SECONDS    how long each step lasts                        (default 120)
  CAPACITY_WARMUP_SECONDS  start of each step left out of its numbers      (default 20)
  CAPACITY_MAX_FAIL_PCT    failures (any 4xx but 429, 5xx, no answer) above this end the run (default 1)
  CAPACITY_MAX_P95_MS      p95 above this ends the run                     (default 1000)
  CAPACITY_READ_ONLY=1     only GET calls, so no users or sessions are created
  CAPACITY_BUSY_SHARE_PCT  share of users on the busy key(s), 0 = even     (default 0)
  CAPACITY_BUSY_TARGET     first-key (one busy project) or first-of-each-org
                           (the first project of every org)                (default first-key)
  CAPACITY_PROJECTS_PER_ORG  projects per org, so first-of-each-org can find them (default 1)
"""

import json
import os
import time
from pathlib import Path

from locust import LoadTestShape, events

# Imported as a module so Locust does not also run GatewayHostUser on its own.
import locustfile


def _num(name: str, default: float) -> float:
    return float(os.getenv(name, str(default)))


def _keys() -> list[str]:
    path = os.getenv("PROJECT_KEYS_FILE", "")
    if path:
        lines = Path(path).read_text(encoding="utf-8").splitlines()
        keys = [line.strip() for line in lines if line.strip() and not line.startswith("#")]
    else:
        keys = [k.strip() for k in os.getenv("PROJECT_KEYS", "").split(",") if k.strip()]
    if not keys and os.getenv("PROJECT_KEY"):
        keys = [os.environ["PROJECT_KEY"]]
    return keys


START_USERS = int(_num("CAPACITY_START_USERS", 20))
STEP_USERS = int(_num("CAPACITY_STEP_USERS", 20))
MAX_USERS = int(_num("CAPACITY_MAX_USERS", 600))
STEP_SECONDS = _num("CAPACITY_STEP_SECONDS", 120)
WARMUP_SECONDS = min(_num("CAPACITY_WARMUP_SECONDS", 20), STEP_SECONDS / 2)
MAX_FAIL_PCT = _num("CAPACITY_MAX_FAIL_PCT", 1)
MAX_P95_MS = _num("CAPACITY_MAX_P95_MS", 1000)
READ_ONLY = os.getenv("CAPACITY_READ_ONLY") == "1"
BUSY_SHARE_PCT = _num("CAPACITY_BUSY_SHARE_PCT", 0)
# first-key          the single first key carries the busy share (one busy project)
# first-of-each-org  the first project of every org shares the busy load (one busy project per org)
BUSY_TARGET = os.getenv("CAPACITY_BUSY_TARGET", "first-key").strip().lower()
PROJECTS_PER_ORG = max(1, int(_num("CAPACITY_PROJECTS_PER_ORG", 1)))
KEYS = _keys()


def _busy_indices() -> list[int]:
    """Which keys carry the busy share."""
    if BUSY_TARGET == "first-of-each-org":
        return list(range(0, len(KEYS), PROJECTS_PER_ORG))
    return [0]


BUSY_SET = set(_busy_indices())

OUT_DIR = Path(
    os.getenv("CAPACITY_OUT_DIR")
    or Path(__file__).resolve().parent.parent.parent / "reports" / "load-locust" / "capacity"
)

# How many users each project has, so new users go where the plan says.
_users_per_project = [0] * max(1, len(KEYS))


def _pick_project() -> int:
    """The project the next user belongs to: the busy share on the busy keys, the rest even."""
    if len(KEYS) <= 1:
        return 0
    if BUSY_SHARE_PCT > 0 and BUSY_SET and len(BUSY_SET) < len(KEYS):
        total = sum(_users_per_project)
        on_busy = sum(_users_per_project[i] for i in BUSY_SET)
        if on_busy < (total + 1) * BUSY_SHARE_PCT / 100:
            return min(BUSY_SET, key=lambda i: _users_per_project[i])
        others = [i for i in range(len(KEYS)) if i not in BUSY_SET]
        return min(others, key=lambda i: _users_per_project[i])
    return min(range(len(KEYS)), key=lambda i: _users_per_project[i])


class CapacityUser(locustfile.GatewayHostUser):
    """The same calls as GatewayHostUser, each user on one project; reads only with CAPACITY_READ_ONLY=1."""

    if READ_ONLY:
        tasks = {locustfile.GatewayHostUser.list_sessions: 1, locustfile.GatewayHostUser.read_project_me: 1}

    def on_start(self):
        super().on_start()
        self.project = _pick_project()
        _users_per_project[self.project] += 1
        if KEYS:
            self.headers["Authorization"] = f"Bearer {KEYS[self.project]}"

    def on_stop(self):
        _users_per_project[self.project] -= 1

    def context(self):
        return {"project": getattr(self, "project", 0)}


# One record per step: when it started, its users, and every call made after its warm-up.
_steps: list[dict] = []
_run_start: float | None = None


def _new_counts() -> dict:
    return {"calls": 0, "failed": 0, "throttled": 0, "latencies": [], "by_status": {}}


def _step_index(now: float) -> int:
    return int((now - (_run_start or now)) // STEP_SECONDS)


@events.test_start.add_listener
def _on_start(**_kwargs):
    global _run_start
    _run_start = time.time()


@events.request.add_listener
def _on_request(response=None, response_time=None, context=None, **_kwargs):
    if _run_start is None:
        return
    now = time.time()
    index = _step_index(now)
    if index >= len(_steps):
        return
    step = _steps[index]
    if now - step["started"] < WARMUP_SECONDS:
        return
    status = getattr(response, "status_code", 0) or 0
    project = (context or {}).get("project", 0)
    for counts in (step["all"], step["projects"].setdefault(project, _new_counts())):
        counts["calls"] += 1
        counts["latencies"].append(response_time or 0)
        if status == 429:
            counts["throttled"] += 1
        elif status == 0 or status >= 400:
            counts["failed"] += 1
            counts["by_status"][str(status)] = counts["by_status"].get(str(status), 0) + 1


def _percentile(values: list[float], pct: float) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    return ordered[min(len(ordered) - 1, int(len(ordered) * pct / 100))]


def _figures(counts: dict) -> dict:
    measured = max(1.0, STEP_SECONDS - WARMUP_SECONDS)
    calls = counts["calls"]
    ok = calls - counts["failed"] - counts["throttled"]
    return {
        "calls": calls,
        "ok_per_second": round(ok / measured, 1),
        "ok_per_minute": round(ok / measured * 60),
        "failed_pct": round(100 * counts["failed"] / calls, 2) if calls else 0.0,
        "throttled_429": counts["throttled"],
        "p50_ms": round(_percentile(counts["latencies"], 50)),
        "p95_ms": round(_percentile(counts["latencies"], 95)),
        "p99_ms": round(_percentile(counts["latencies"], 99)),
        "failures_by_status": counts["by_status"],
    }


def _summarize(step: dict) -> dict:
    total = _figures(step["all"])
    projects = [
        {"project": i + 1, **_figures(step["projects"][i])} for i in sorted(step["projects"])
    ]
    healthy = total["calls"] > 0 and total["failed_pct"] <= MAX_FAIL_PCT and total["p95_ms"] <= MAX_P95_MS
    return {"step": step["index"] + 1, "users": step["users"], **total, "projects": projects, "healthy": healthy}


class StepShape(LoadTestShape):
    """Adds STEP_USERS every STEP_SECONDS and stops after the first unhealthy step."""

    def tick(self):
        run_time = self.get_run_time()
        index = int(run_time // STEP_SECONDS)
        if index > 0 and index - 1 < len(_steps) and "summary" not in _steps[index - 1]:
            summary = _summarize(_steps[index - 1])
            _steps[index - 1]["summary"] = summary
            mark = "ok" if summary["healthy"] else "OVER THE LINE"
            print(
                f"[capacity] step {summary['step']}: {summary['users']} users, "
                f"{summary['ok_per_second']} ok/s, {summary['failed_pct']}% failed, "
                f"p95 {summary['p95_ms']} ms, 429s {summary['throttled_429']} -> {mark}",
                flush=True,
            )
            if not summary["healthy"]:
                return None
        users = START_USERS + index * STEP_USERS
        if users > MAX_USERS:
            return None
        if index >= len(_steps):
            _steps.append(
                {"index": index, "users": users, "started": time.time(), "all": _new_counts(), "projects": {}}
            )
        return users, max(1, STEP_USERS)


@events.quitting.add_listener
def _on_quit(**_kwargs):
    rows = [s.get("summary") or _summarize(s) for s in _steps if s["all"]["calls"] > 0]
    if not rows:
        return
    healthy = [r for r in rows if r["healthy"]]
    best = max(healthy, key=lambda r: r["ok_per_second"]) if healthy else None
    summary = {
        "settings": {
            "projects": len(KEYS),
            "busy_share_pct": BUSY_SHARE_PCT,
            "start_users": START_USERS,
            "step_users": STEP_USERS,
            "step_seconds": STEP_SECONDS,
            "warmup_seconds": WARMUP_SECONDS,
            "max_fail_pct": MAX_FAIL_PCT,
            "max_p95_ms": MAX_P95_MS,
            "read_only": READ_ONLY,
        },
        "steps": rows,
        "capacity_ok_per_second": best["ok_per_second"] if best else 0,
        "capacity_users": best["users"] if best else 0,
        "safe_per_second_70pct": round(best["ok_per_second"] * 0.7, 1) if best else 0,
        "safe_per_minute_70pct": round(best["ok_per_second"] * 0.7 * 60) if best else 0,
    }
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUT_DIR / "summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    columns = ["step", "users", "calls", "ok_per_second", "failed_pct", "throttled_429", "p50_ms", "p95_ms", "p99_ms", "healthy"]
    lines = [",".join(columns)] + [",".join(str(r[c]) for c in columns) for r in rows]
    (OUT_DIR / "steps.csv").write_text("\n".join(lines) + "\n", encoding="utf-8")
    project_columns = ["step", "users", "project", "calls", "ok_per_second", "ok_per_minute", "failed_pct", "throttled_429", "p95_ms"]
    project_lines = [",".join(project_columns)] + [
        ",".join(str({**p, "step": r["step"], "users": r["users"]}[c]) for c in project_columns)
        for r in rows
        for p in r["projects"]
    ]
    (OUT_DIR / "projects.csv").write_text("\n".join(project_lines) + "\n", encoding="utf-8")

    print("\n[capacity] step  users   ok/s  failed%  429s   p50   p95   p99  healthy")
    for r in rows:
        print(
            f"[capacity] {r['step']:>4} {r['users']:>6} {r['ok_per_second']:>6} {r['failed_pct']:>8} "
            f"{r['throttled_429']:>5} {r['p50_ms']:>5} {r['p95_ms']:>5} {r['p99_ms']:>5}  {'yes' if r['healthy'] else 'NO'}"
        )
    shown = best or rows[-1]
    if len(shown["projects"]) > 1:
        print(f"\n[capacity] per project at step {shown['step']} ({shown['users']} users)")
        print("[capacity] project   ok/min  failed%  429s   p95")
        for p in shown["projects"]:
            print(
                f"[capacity] {p['project']:>7} {p['ok_per_minute']:>8} {p['failed_pct']:>8} "
                f"{p['throttled_429']:>5} {p['p95_ms']:>5}"
            )
    if best:
        print(
            f"\n[capacity] capacity: about {best['ok_per_second']} calls/s with {best['users']} users; "
            f"70% of that is {summary['safe_per_second_70pct']} calls/s ({summary['safe_per_minute_70pct']} a minute)"
        )
    else:
        print("[capacity] no step was healthy; start lower (CAPACITY_START_USERS)")
    print(f"[capacity] results: {OUT_DIR}")
