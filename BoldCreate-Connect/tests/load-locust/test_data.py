#!/usr/bin/env python3
"""
Makes and removes the data a load run needs, through the web app's API as a signed-in user.

  python3 tests/load-locust/test_data.py setup   --web=https://connect-staging.boldcreate.ai --projects=3
  python3 tests/load-locust/test_data.py cleanup --web=https://connect-staging.boldcreate.ai

setup   signs in, makes one organization per project (slug `loadtest-<run>-<n>`), a project
        "Load test" in each, and a project key with sessions:read and sessions:write that ends
        after --key-days days. The keys go to keys.txt (one per line, for run_capacity.py
        --project-keys-file) and the ids to load-test-state.json, both next to this script.
cleanup deletes every organization the state file lists, which removes its projects, keys, project
        users and sessions with it. With --all it also deletes any other organization of the
        signed-in user whose slug starts with `loadtest-`. Nothing else is ever deleted.

Sign-in: LOAD_EMAIL and LOAD_PASSWORD (a verified account made for load tests). The web host must
be in LOCUST_ALLOWED_HOSTS and LOCUST_ALLOW_LOAD=1 must be set, as for the load runs; production
hosts are refused. Keys are never printed.
"""

import argparse
import http.cookiejar as cookielib
import json
import os
import secrets
import sys
import uuid
from datetime import datetime, timedelta, timezone
from pathlib import Path

import requests

from guard import validate_target
from run import load_env_file  # noqa: F401  (run.py loads .env on import)

HERE = Path(__file__).resolve().parent
KEYS_FILE = HERE / "keys.txt"
STATE_FILE = HERE / "load-test-state.json"
SLUG_PREFIX = "loadtest-"
SCOPES = ["sessions:read", "sessions:write"]


class _NoCookies(cookielib.DefaultCookiePolicy):
    def set_ok(self, cookie, request):
        return False


class Web:
    """The web app's API as the browser uses it: session cookie, CSRF header on writes."""

    def __init__(self, origin: str):
        self.origin = origin.rstrip("/")
        self.http = requests.Session()
        self.http.cookies.set_policy(_NoCookies())
        self.csrf: str | None = None
        # Cookies are kept by hand: a `Secure` cookie must still be sent to a local http stack.
        self.jar: dict[str, str] = {}

    def _keep(self, res: requests.Response):
        for header in res.raw.headers.getlist("Set-Cookie"):
            name, _, value = header.split(";", 1)[0].partition("=")
            self.jar[name.strip()] = value

    def _cookie(self) -> str:
        return "; ".join(f"{k}={v}" for k, v in self.jar.items())

    def call(self, method: str, path: str, body=None, params=None):
        headers = {"origin": self.origin}
        if method != "GET":
            if self.csrf is None:
                res = self.http.get(f"{self.origin}/api/csrf", headers={"cookie": self._cookie()}, timeout=30)
                res.raise_for_status()
                self._keep(res)
                self.csrf = res.json()["csrfToken"]
            headers["x-csrf-token"] = self.csrf
            headers["idempotency-key"] = str(uuid.uuid4())
        headers["cookie"] = self._cookie()
        res = self.http.request(
            method, f"{self.origin}/api{path}", json=body, params=params, headers=headers, timeout=60
        )
        self._keep(res)
        if not res.ok:
            raise RuntimeError(f"{method} {path} answered {res.status_code}: {res.text[:300]}")
        return res.json() if res.content else None

    def sign_in(self, email: str, password: str):
        self.call("POST", "/v1/auth/signin", {"email": email, "password": password})
        # The session cookie changes at sign-in, so ask for a CSRF token that matches it.
        self.csrf = None

    def orgs(self) -> list[dict]:
        found, cursor = [], None
        while True:
            page = self.call("GET", "/v1/orgs", params={"cursor": cursor} if cursor else None)
            found += page.get("items") or page.get("data") or []
            cursor = page.get("nextCursor")
            if not cursor:
                return found


def _check_target(web: str):
    refusal = validate_target(web, dict(os.environ))
    if refusal:
        sys.stderr.write(f"[test-data] Refused: {refusal}\n")
        sys.exit(2)


def _signed_in(web: str) -> Web:
    email, password = os.getenv("LOAD_EMAIL"), os.getenv("LOAD_PASSWORD")
    if not email or not password:
        sys.stderr.write("[test-data] Set LOAD_EMAIL and LOAD_PASSWORD (a load-test account).\n")
        sys.exit(2)
    client = Web(web)
    client.sign_in(email, password)
    return client


def _read_state() -> dict:
    try:
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    except FileNotFoundError:
        return {"orgs": []}


def _write_state(state: dict):
    STATE_FILE.write_text(json.dumps(state, indent=2), encoding="utf-8")


def setup(args):
    client = _signed_in(args.web)
    state = _read_state()
    if state["orgs"]:
        sys.stderr.write(
            f"[test-data] {STATE_FILE.name} already lists {len(state['orgs'])} organizations; "
            "run cleanup first.\n"
        )
        sys.exit(1)
    run = datetime.now(timezone.utc).strftime("%m%d%H%M") + secrets.token_hex(2)
    expires = (datetime.now(timezone.utc) + timedelta(days=args.key_days)).strftime("%Y-%m-%dT%H:%M:%S.000Z")
    state = {"web": args.web, "run": run, "orgs": []}
    keys = []
    try:
        for n in range(1, args.orgs + 1):
            slug = f"{SLUG_PREFIX}{run}-{n}"
            org = client.call("POST", "/v1/orgs", {"name": f"Load test {run} {n}", "slug": slug})
            entry = {"id": org["id"], "slug": slug, "projects": []}
            state["orgs"].append(entry)
            _write_state(state)
            for p in range(1, args.projects_per_org + 1):
                project = client.call(
                    "POST", f"/v1/orgs/{org['id']}/projects", {"name": f"Load test {p}"}
                )
                key = client.call(
                    "POST",
                    f"/v1/orgs/{org['id']}/projects/{project['id']}/keys",
                    {"scopes": SCOPES, "expiresAt": expires},
                )
                entry["projects"].append({"projectId": project["id"], "keyId": key["id"]})
                keys.append(key["rawKey"])
                _write_state(state)
            print(
                f"[test-data] {n}/{args.orgs}: organization {slug} "
                f"with {args.projects_per_org} project(s) and key(s) made"
            )
    finally:
        if keys:
            KEYS_FILE.write_text("\n".join(keys) + "\n", encoding="utf-8")
    print(f"[test-data] {len(keys)} keys written to {KEYS_FILE}")
    print(f"[test-data] ids written to {STATE_FILE}")
    print("[test-data] next: python run_capacity.py --target=<gateway> --project-keys-file=keys.txt")


def cleanup(args):
    client = _signed_in(args.web)
    state = _read_state()
    targets = {o["slug"]: o["id"] for o in state["orgs"]}
    if args.all:
        for org in client.orgs():
            if org["slug"].startswith(SLUG_PREFIX):
                targets.setdefault(org["slug"], org["id"])
    if not targets:
        print("[test-data] nothing to delete")
    failed = []
    for slug, org_id in targets.items():
        if not slug.startswith(SLUG_PREFIX):
            print(f"[test-data] skipped {slug}: not a load-test organization")
            continue
        try:
            client.call("DELETE", f"/v1/orgs/{org_id}", params={"confirmSlug": slug})
            print(f"[test-data] deleted {slug}")
        except RuntimeError as error:
            if " 404" in str(error):
                print(f"[test-data] {slug} was already gone")
            else:
                failed.append(slug)
                print(f"[test-data] could not delete {slug}: {error}")
    if failed:
        state["orgs"] = [o for o in state["orgs"] if o["slug"] in failed]
        _write_state(state)
        sys.exit(1)
    STATE_FILE.unlink(missing_ok=True)
    KEYS_FILE.unlink(missing_ok=True)
    print("[test-data] done; keys.txt and the state file are removed")


def main():
    parser = argparse.ArgumentParser(description="Make or remove load-test organizations, projects and keys")
    parser.add_argument("command", choices=["setup", "cleanup"])
    parser.add_argument("--web", default=os.getenv("TEST_WEB_URL", "http://localhost:3000"), help="The web app")
    parser.add_argument("--orgs", type=int, default=3, help="Organizations to make")
    parser.add_argument("--projects-per-org", type=int, default=1, help="Projects to make in each organization")
    parser.add_argument("--key-days", type=int, default=7, help="Days until the keys end")
    parser.add_argument("--all", action="store_true", help="cleanup: also any other loadtest-* organization")
    args = parser.parse_args()
    _check_target(args.web)
    if args.command == "setup":
        if not 1 <= args.orgs <= 20:
            parser.error("--orgs must be 1 to 20")
        if not 1 <= args.projects_per_org <= 20:
            parser.error("--projects-per-org must be 1 to 20")
        setup(args)
    else:
        cleanup(args)


if __name__ == "__main__":
    main()
