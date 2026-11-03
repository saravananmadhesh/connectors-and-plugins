import re
import sys
from urllib.parse import urlparse

DEFAULT_ALLOWED_HOSTS = "localhost,127.0.0.1"
PRODUCTION_HOST_PATTERN = re.compile(r"(^|[.-])(prod|production|live)([.-]|$)", re.IGNORECASE)


def validate_target(target_url: str, env: dict[str, str | None]) -> str | None:
    """
    Validates safety rules for load testing.
    Returns an error message string if refused, or None if valid.
    """
    if env.get("K6_ALLOW_LOAD") != "1" and env.get("LOCUST_ALLOW_LOAD") != "1":
        return "Load runs are disabled: set LOCUST_ALLOW_LOAD=1 (or K6_ALLOW_LOAD=1) to opt in."

    try:
        parsed = urlparse(target_url)
    except Exception as exc:
        return f"Target URL is invalid: {target_url} ({exc})"

    if parsed.scheme not in ("http", "https"):
        return f"Target must use http or https: {target_url}"

    host = (parsed.hostname or "").lower()
    if not host:
        return f"Target host could not be determined from: {target_url}"

    if PRODUCTION_HOST_PATTERN.search(host):
        return f"Refusing to load a production host: {host}"

    def clean_host(entry: str) -> str:
        s = entry.strip().lower()
        if "://" in s:
            try:
                p = urlparse(s)
                return (p.hostname or s).lower()
            except Exception:
                pass
        return s.rstrip("/").split(":")[0]

    allowed = [
        clean_host(h)
        for h in (env.get("LOCUST_ALLOWED_HOSTS") or env.get("K6_ALLOWED_HOSTS") or DEFAULT_ALLOWED_HOSTS).split(",")
        if h.strip()
    ]

    if host not in allowed:
        return f"Host {host} is not in allowed hosts: {', '.join(allowed)}"

    return None
