#!/usr/bin/env python3
"""
CLI Runner for Locust tests.
Supports --target, --users, --spawn-rate, --run-time, --headless, --web.
Enforces safety checks before starting Locust.
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path
from guard import validate_target


def load_env_file(path: Path):
    """Load KEY=VALUE lines from a .env file without overriding variables already set."""
    if not path.is_file():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip().removeprefix("export ").strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


load_env_file(Path(__file__).resolve().parent / ".env")


def ensure_file_limits(required_limit: int = 65535):
    """Ensure system open file descriptor limits can handle massive concurrent connections."""
    try:
        import resource

        soft, hard = resource.getrlimit(resource.RLIMIT_NOFILE)
        target = min(hard, required_limit)
        if soft < target:
            resource.setrlimit(resource.RLIMIT_NOFILE, (target, hard))
    except Exception:
        pass


def parse_args():
    parser = argparse.ArgumentParser(description="Run Locust load tests against Gateway/API")
    parser.add_argument(
        "--target",
        default=os.getenv("TEST_GATEWAY_URL", "http://localhost:3002"),
        help="Target host URL (default: http://localhost:3002 or TEST_GATEWAY_URL)",
    )
    parser.add_argument(
        "--users",
        "-u",
        type=int,
        default=int(os.getenv("LOCUST_USERS", "10")),
        help="Number of concurrent Locust users (default: 10)",
    )
    parser.add_argument(
        "--spawn-rate",
        "-r",
        type=int,
        default=int(os.getenv("LOCUST_SPAWN_RATE", "5")),
        help="User spawn rate per second (default: 5)",
    )
    parser.add_argument(
        "--run-time",
        "-t",
        default=os.getenv("LOCUST_RUN_TIME", "30s"),
        help="Test run duration (e.g. 30s, 2m, 1h - default: 30s)",
    )
    parser.add_argument(
        "--web",
        action="store_true",
        help="Run Locust with interactive Web UI instead of headless",
    )
    parser.add_argument(
        "--project-key",
        default=os.getenv("PROJECT_KEY", ""),
        help="Project API key (Bearer prk_...). If omitted, uses $PROJECT_KEY.",
    )
    return parser.parse_args()


def main():
    ensure_file_limits()
    args = parse_args()

    env_copy = dict(os.environ)
    if args.project_key:
        env_copy["PROJECT_KEY"] = args.project_key

    refusal = validate_target(args.target, env_copy)
    if refusal:
        sys.stderr.write(f"[locust-runner] Refused: {refusal}\n")
        sys.exit(2)

    script_dir = Path(__file__).resolve().parent
    locustfile = script_dir / "locustfile.py"
    reports_dir = script_dir.parent.parent / "reports" / "load-locust"
    reports_dir.mkdir(parents=True, exist_ok=True)

    cmd = [
        sys.executable,
        "-m",
        "locust",
        "-f",
        str(locustfile),
        "--host",
        args.target,
    ]

    if not args.web:
        cmd.extend(
            [
                "--headless",
                "-u",
                str(args.users),
                "-r",
                str(args.spawn_rate),
                "--run-time",
                args.run_time,
                "--html",
                str(reports_dir / "report.html"),
                "--csv",
                str(reports_dir / "stats"),
            ]
        )

    print(f"[locust-runner] Target: {args.target}")
    print(f"[locust-runner] Mode: {'Web UI' if args.web else 'Headless'}")
    if not args.web:
        print(f"[locust-runner] Users: {args.users}, Spawn rate: {args.spawn_rate}/s, Duration: {args.run_time}")

    try:
        res = subprocess.run(cmd, env=env_copy)
    except KeyboardInterrupt:
        sys.stderr.write("[locust-runner] Interrupted.\n")
        sys.exit(130)
    sys.exit(res.returncode)


if __name__ == "__main__":
    main()
