#!/usr/bin/env python3
"""
Capacity run: adds users step by step until the target starts to struggle (see capacity.py).

  LOCUST_ALLOW_LOAD=1 LOCUST_ALLOWED_HOSTS=connect-gateway-staging.boldcreate.ai \
  python3 tests/load-locust/run_capacity.py \
    --target=https://connect-gateway-staging.boldcreate.ai --project-key=prk_...

The same safety checks as run.py apply. Results: reports/load-locust/capacity/.
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path

from guard import validate_target
from run import ensure_file_limits, load_env_file  # noqa: F401  (run.py loads .env on import)


def main():
    parser = argparse.ArgumentParser(description="Step-up capacity run against the gateway")
    parser.add_argument("--target", default=os.getenv("TEST_GATEWAY_URL", "http://localhost:3002"))
    parser.add_argument("--project-key", default=os.getenv("PROJECT_KEY", ""), help="One project")
    parser.add_argument("--project-keys", default="", help="Several projects, comma separated")
    parser.add_argument("--project-keys-file", default="", help="A file with one project key per line")
    parser.add_argument("--busy-share", type=float, default=None, help="Percent of users on the first key")
    args = parser.parse_args()

    ensure_file_limits()
    env = dict(os.environ)
    if args.project_key:
        env["PROJECT_KEY"] = args.project_key
    if args.project_keys:
        env["PROJECT_KEYS"] = args.project_keys
    if args.project_keys_file:
        env["PROJECT_KEYS_FILE"] = str(Path(args.project_keys_file).resolve())
    if args.busy_share is not None:
        env["CAPACITY_BUSY_SHARE_PCT"] = str(args.busy_share)
    if not (env.get("PROJECT_KEY") or env.get("PROJECT_KEYS") or env.get("PROJECT_KEYS_FILE")):
        sys.stderr.write(
            "[capacity] A project key is required: --project-key, --project-keys or --project-keys-file\n"
        )
        sys.exit(2)
    refusal = validate_target(args.target, env)
    if refusal:
        sys.stderr.write(f"[capacity] Refused: {refusal}\n")
        sys.exit(2)

    here = Path(__file__).resolve().parent
    out = here.parent.parent / "reports" / "load-locust" / "capacity"
    out.mkdir(parents=True, exist_ok=True)
    cmd = [
        sys.executable, "-m", "locust",
        "-f", str(here / "capacity.py"),
        "--host", args.target,
        "--headless",
        "--only-summary",
        "--html", str(out / "report.html"),
    ]
    print(f"[capacity] Target: {args.target}")
    sys.exit(subprocess.call(cmd, env=env, cwd=str(here)))


if __name__ == "__main__":
    main()
