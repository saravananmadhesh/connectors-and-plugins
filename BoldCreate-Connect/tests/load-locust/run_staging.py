#!/usr/bin/env python3
"""
One command for a staging capacity run: make the test data, run the capacity test, remove the data.

  LOCUST_ALLOW_LOAD=1 \
  LOCUST_ALLOWED_HOSTS="connect-staging.boldcreate.ai,connect-gateway-staging.boldcreate.ai" \
  LOAD_EMAIL=... LOAD_PASSWORD=... \
  python3 tests/load-locust/run_staging.py --projects=3 [--busy-share=60] [--keep]

The data is removed even when the run fails or is stopped with Ctrl+C; --keep leaves it for
another run (remove it later with `test_data.py cleanup`). Capacity settings come from the
CAPACITY_* variables described in capacity.py.
"""

import argparse
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent


def step(*args: str) -> int:
    return subprocess.call([sys.executable, *args], cwd=str(HERE))


def main():
    parser = argparse.ArgumentParser(description="Set up, run and clean up a staging capacity run")
    parser.add_argument("--web", default="https://connect-staging.boldcreate.ai")
    parser.add_argument("--gateway", default="https://connect-gateway-staging.boldcreate.ai")
    parser.add_argument("--projects", type=int, default=3)
    parser.add_argument("--busy-share", type=float, default=None, help="Percent of users on the first project")
    parser.add_argument("--keep", action="store_true", help="Keep the test data after the run")
    args = parser.parse_args()

    if step("test_data.py", "setup", f"--web={args.web}", f"--projects={args.projects}") != 0:
        print("[staging] setup failed; removing whatever it made")
        step("test_data.py", "cleanup", f"--web={args.web}")
        sys.exit(1)
    run = ["run_capacity.py", f"--target={args.gateway}", "--project-keys-file=keys.txt"]
    if args.busy_share is not None:
        run.append(f"--busy-share={args.busy_share}")
    code = 1
    try:
        code = step(*run)
    finally:
        if args.keep:
            print("[staging] test data kept; remove it with: python test_data.py cleanup")
        elif step("test_data.py", "cleanup", f"--web={args.web}") != 0:
            print("[staging] cleanup did not finish; run: python test_data.py cleanup --all")
            code = code or 1
    sys.exit(code)


if __name__ == "__main__":
    main()
