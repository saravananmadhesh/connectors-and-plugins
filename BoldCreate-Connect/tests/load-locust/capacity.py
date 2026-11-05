"""
Capacity run: the host-product mix from locustfile.py, with users added in steps.

Each step holds a fixed number of users for a while. After each step the run checks the
step's failure rate and p95; once a step is over the line (CAPACITY_MAX_FAIL_PCT or
CAPACITY_MAX_P95_MS), the run stops. The last step under the line is the capacity.
Results per step are written to reports/load-locust/capacity/steps.csv and summary.json.

Settings (environment):
  CAPACITY_START_USERS   users in the first step            (default 20)
  CAPACITY_STEP_USERS    users added each step               (default 20)
  CAPACITY_MAX_USERS     never go above this                 (default 600)
  CAPACITY_STEP_SECONDS  how long each step lasts            (default 120)
  CAPACITY_WARMUP_SECONDS  start of each step left out of its numbers (default 20)
  CAPACITY_MAX_FAIL_PCT  failures (503, 5xx, no answer) above this end the run (default 1)
  CAPACITY_MAX_P95_MS    p95 above this ends the run          (default 1000)
  CAPACITY_READ_ONLY=1   only GET calls, so no users or sessions are created
"""

import json
import os
import time
from pathlib import Path

from locust import LoadTestShape, events

from locustfile import GatewayHostUser


def _num(name: str, default: float) -> float:
    return float(os.getenv(name, str(default)))


START_USERS = int(_num("CAPACITY_START_USERS", 20))
STEP_USERS = int(_num("CAPACITY_STEP_USERS", 20))
MAX_USERS = int(_num("CAPACITY_MAX_USERS", 600))
STEP_SECONDS = _num("CAPACITY_STEP_SECONDS", 120)
WARMUP_SECONDS = min(_num("CAPACITY_WARMUP_SECONDS", 20), STEP_SECONDS / 2)
MAX_FAIL_PCT = _num("CAPACITY_MAX_FAIL_PCT", 1)
MAX_P95_MS = _num("CAPACITY_MAX_P95_MS", 1000)
READ_ONLY = os.getenv("CAPACITY_READ_ONLY") == "1"

OUT_DIR = Path(__file__).resolve().parent.parent.parent / "reports" / "load-locust" / "capacity"


class CapacityUser(GatewayHostUser):
    """The same calls as GatewayHostUser; with CAPACITY_READ_ONLY=1 only the reads."""

    if READ_ONLY:
        tasks = {GatewayHostUser.list_sessions: 1, GatewayHostUser.read_project_me: 1}


# One record per step: when it started, its users, and every call made after its warm-up.
_steps: list[dict] = []
_run_start: float | None = None


def _step_index(now: float) -> int:
    return int((now - (_run_start or now)) // STEP_SECONDS)


@events.test_start.add_listener
def _on_start(**_kwargs):
    global _run_start
    _run_start = time.time()


@events.request.add_listener
def _on_request(response=None, response_time=None, exception=None, **_kwargs):
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
    step["calls"] += 1
    step["latencies"].append(response_time or 0)
    if status == 429:
        step["throttled"] += 1
    elif status == 0 or status >= 500:
        step["failed"] += 1
        step["by_status"][str(status)] = step["by_status"].get(str(status), 0) + 1


def _percentile(values: list[float], pct: float) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    return ordered[min(len(ordered) - 1, int(len(ordered) * pct / 100))]


def _summarize(step: dict) -> dict:
    measured = max(1.0, STEP_SECONDS - WARMUP_SECONDS)
    calls = step["calls"]
    ok = calls - step["failed"] - step["throttled"]
    fail_pct = 100 * step["failed"] / calls if calls else 0.0
    p95 = _percentile(step["latencies"], 95)
    return {
        "step": step["index"] + 1,
        "users": step["users"],
        "calls": calls,
        "ok_per_second": round(ok / measured, 1),
        "failed_pct": round(fail_pct, 2),
        "throttled_429": step["throttled"],
        "p50_ms": round(_percentile(step["latencies"], 50)),
        "p95_ms": round(p95),
        "p99_ms": round(_percentile(step["latencies"], 99)),
        "failures_by_status": step["by_status"],
        "healthy": calls > 0 and fail_pct <= MAX_FAIL_PCT and p95 <= MAX_P95_MS,
    }


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
                {
                    "index": index,
                    "users": users,
                    "started": time.time(),
                    "calls": 0,
                    "failed": 0,
                    "throttled": 0,
                    "latencies": [],
                    "by_status": {},
                }
            )
        return users, max(1, STEP_USERS)


@events.quitting.add_listener
def _on_quit(**_kwargs):
    rows = [s.get("summary") or _summarize(s) for s in _steps if s["calls"] > 0]
    if not rows:
        return
    healthy = [r for r in rows if r["healthy"]]
    best = max(healthy, key=lambda r: r["ok_per_second"]) if healthy else None
    summary = {
        "settings": {
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
    print("\n[capacity] step  users   ok/s  failed%  429s   p50   p95   p99  healthy")
    for r in rows:
        print(
            f"[capacity] {r['step']:>4} {r['users']:>6} {r['ok_per_second']:>6} {r['failed_pct']:>8} "
            f"{r['throttled_429']:>5} {r['p50_ms']:>5} {r['p95_ms']:>5} {r['p99_ms']:>5}  {'yes' if r['healthy'] else 'NO'}"
        )
    if best:
        print(
            f"[capacity] capacity: about {best['ok_per_second']} calls/s with {best['users']} users; "
            f"70% of that is {summary['safe_per_second_70pct']} calls/s ({summary['safe_per_minute_70pct']} a minute)"
        )
    else:
        print("[capacity] no step was healthy; start lower (CAPACITY_START_USERS)")
    print(f"[capacity] results: {OUT_DIR}")
