"""Keep a local folder in step with the plugins installed for one BoldCreate API key.

Three calls make up the whole protocol, so any agent runtime, command line tool or editor
extension can do the same:

    GET  /v1/sync                          the list of plugins and their archives (ETag / 304)
    GET  /v1/plugin-versions/{id}/archive  one archive, checked against its sha256
    POST /v1/sync/reports                  optional: tell the service what was placed

Only the Python standard library is used. The key is read from the environment, is sent only to
the host you name, and is never printed or written to disk. Archives are treated as untrusted
data: the hash is checked, paths that leave the plugin folder are refused, links and device files
are skipped, and size limits apply while reading.

Run `python boldcreate_integrations_sync.py --help` for the command line.
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
import re
import shutil
import sys
import tarfile
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable, Iterable

MAX_FILES = 2000
MAX_FILE_BYTES = 5 * 1024 * 1024
MAX_TOTAL_BYTES = 50 * 1024 * 1024
MAX_ARCHIVE_BYTES = 100 * 1024 * 1024
MAX_MANIFEST_BYTES = 8 * 1024 * 1024

STATE_FILE = ".boldcreate-sync.json"
MARKER_FILE = ".boldcreate-archive"
ARCHIVE_PATH = re.compile(r"^/v1/plugin-versions/[A-Za-z0-9_]{3,64}/archive$")
SAFE_NAME = re.compile(r"[^A-Za-z0-9._-]")
RETRY_STATUSES = {429, 502, 503, 504}


class SyncError(Exception):
    """Anything that stops a sync; the message never contains the key."""


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    """The key must never follow a redirect to another host."""

    def redirect_request(self, *args: Any, **kwargs: Any) -> None:  # noqa: D401
        return None


@dataclass
class Response:
    status: int
    headers: dict[str, str]
    body: bytes


@dataclass
class SyncResult:
    """What one `sync` call did."""

    changed: bool
    revision: str | None
    poll_after_seconds: int
    applied: list[dict[str, str]] = field(default_factory=list)
    unchanged: list[str] = field(default_factory=list)
    removed: list[str] = field(default_factory=list)
    skipped_by_server: list[dict[str, Any]] = field(default_factory=list)
    warnings: list[str] = field(default_factory=list)
    plugins: list[dict[str, Any]] = field(default_factory=list)

    def skill_dirs(self, root: Path) -> list[Path]:
        """Folders that hold `<skill>/SKILL.md` files, for runtimes that load skills."""
        found = []
        for plugin in self.plugins:
            folder = root / plugin["dir"] / "skills"
            if folder.is_dir():
                found.append(folder)
        return found


class Client:
    """The three calls, with retries for a busy service and no redirects."""

    def __init__(
        self,
        base_url: str,
        api_key: str,
        *,
        timeout: float = 30.0,
        retries: int = 3,
        sleep: Callable[[float], None] = time.sleep,
    ) -> None:
        parsed = urllib.parse.urlparse(base_url)
        if parsed.scheme not in ("http", "https") or not parsed.netloc:
            raise SyncError("The service address must start with http:// or https://")
        if not api_key or any(c in api_key for c in "\r\n "):
            raise SyncError("The API key is missing or malformed")
        self._base = base_url.rstrip("/")
        self._key = api_key
        self._timeout = timeout
        self._retries = retries
        self._sleep = sleep
        self._opener = urllib.request.build_opener(_NoRedirect)

    def request(
        self,
        method: str,
        path: str,
        *,
        headers: dict[str, str] | None = None,
        body: bytes | None = None,
        max_bytes: int,
    ) -> Response:
        send = {"authorization": f"Bearer {self._key}", **(headers or {})}
        if body is not None:
            send["content-type"] = "application/json"
        for attempt in range(self._retries + 1):
            req = urllib.request.Request(
                self._base + path, data=body, headers=send, method=method
            )
            try:
                with self._opener.open(req, timeout=self._timeout) as res:
                    return Response(res.status, _lower(res.headers), _read(res, max_bytes))
            except urllib.error.HTTPError as err:
                try:
                    reply = Response(err.code, _lower(err.headers), _read(err, 64 * 1024))
                finally:
                    err.close()
                if err.code == 304:
                    return reply
                if err.code in RETRY_STATUSES and attempt < self._retries:
                    self._sleep(_retry_delay(reply.headers.get("retry-after"), attempt))
                    continue
                raise SyncError(_explain(err.code, reply.body)) from None
            except (urllib.error.URLError, TimeoutError, OSError) as err:
                if attempt < self._retries:
                    self._sleep(min(2.0**attempt, 10.0))
                    continue
                raise SyncError(f"The service could not be reached ({type(err).__name__})") from None
        raise SyncError("The service did not answer")  # pragma: no cover

    def manifest(
        self, *, etag: str | None, target: str | None, kinds: Iterable[str] | None
    ) -> tuple[dict[str, Any] | None, str | None]:
        """The manifest, or `(None, etag)` when it has not changed."""
        query = {}
        if target:
            query["target"] = target
        if kinds:
            query["kinds"] = ",".join(kinds)
        path = "/v1/sync" + (("?" + urllib.parse.urlencode(query)) if query else "")
        res = self.request(
            "GET",
            path,
            headers={"if-none-match": etag} if etag else {},
            max_bytes=MAX_MANIFEST_BYTES,
        )
        if res.status == 304:
            return None, etag
        try:
            return json.loads(res.body), res.headers.get("etag")
        except ValueError:
            raise SyncError("The service sent a manifest that is not JSON") from None

    def archive(self, href: str, sha256: str, size: int) -> bytes:
        """One archive; refused unless it is exactly what the manifest promised."""
        if not ARCHIVE_PATH.match(href):
            raise SyncError("The manifest points at an address that is not an archive")
        if size < 0 or size > MAX_ARCHIVE_BYTES:
            raise SyncError("The archive is larger than this client accepts")
        res = self.request("GET", href, max_bytes=size + 1)
        if len(res.body) != size:
            raise SyncError("The archive has the wrong size")
        if hashlib.sha256(res.body).hexdigest() != sha256:
            raise SyncError("The archive does not match its hash")
        return res.body

    def report(
        self,
        applied: list[dict[str, str]],
        skipped: list[dict[str, str]] | None = None,
        target: str | None = None,
    ) -> None:
        payload: dict[str, Any] = {"applied": applied, "skipped": skipped or []}
        if target:
            payload["target"] = target
        self.request(
            "POST", "/v1/sync/reports", body=json.dumps(payload).encode(), max_bytes=64 * 1024
        )


def _lower(headers: Any) -> dict[str, str]:
    return {k.lower(): v for k, v in headers.items()}


def _read(stream: Any, limit: int) -> bytes:
    data = stream.read(limit + 1)
    if len(data) > limit:
        raise SyncError("The service sent more data than expected")
    return data


def _retry_delay(header: str | None, attempt: int) -> float:
    if header and header.isdigit():
        return min(float(header), 30.0)
    return min(2.0**attempt, 10.0)


def _explain(status: int, body: bytes) -> str:
    code = ""
    try:
        code = json.loads(body)["error"]["code"]
    except (ValueError, KeyError, TypeError):
        pass
    hint = {
        401: "the key is wrong, revoked or expired",
        403: "the key lacks the artifact:sync or artifact:download permission",
        404: "not found, or not visible to this key",
        416: "the requested range is not valid",
    }.get(status, "the service refused the request")
    return f"The service answered {status}{' ' + code if code else ''}: {hint}"


# ── Extraction ────────────────────────────────────────────────────────────────


def _clean(name: str) -> str | None:
    """A safe relative path, or `None` when the member must be refused."""
    if not name or "\0" in name or "\\" in name or name.startswith("/"):
        return None
    parts = [p for p in name.split("/") if p not in ("", ".")]
    if not parts or any(p == ".." for p in parts):
        return None
    if re.match(r"^[A-Za-z]:", parts[0]):
        return None
    return "/".join(parts)


def read_archive(data: bytes) -> tuple[dict[str, bytes], list[str]]:
    """Files of a `.tar.gz` archive and the notes about what was left out."""
    files: dict[str, bytes] = {}
    notes: list[str] = []
    total = 0
    try:
        with tarfile.open(fileobj=io.BytesIO(data), mode="r:gz") as tar:
            for member in tar:
                if member.isdir():
                    continue
                clean = _clean(member.name)
                if clean is None:
                    raise SyncError("The archive holds a path that leaves the plugin folder")
                if not member.isfile():
                    notes.append(f"skipped {clean}: not a regular file")
                    continue
                if member.size > MAX_FILE_BYTES:
                    raise SyncError("The archive holds a file that is too large")
                total += member.size
                if total > MAX_TOTAL_BYTES or len(files) >= MAX_FILES:
                    raise SyncError("The archive holds more than this client accepts")
                handle = tar.extractfile(member)
                if handle is None:
                    continue
                files[clean] = handle.read(MAX_FILE_BYTES + 1)
    except (tarfile.TarError, EOFError, OSError):
        raise SyncError("The archive is not a readable .tar.gz file") from None
    return files, notes


def _write_tree(files: dict[str, bytes], folder: Path) -> None:
    for relative, content in files.items():
        target = folder / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(content)


def folder_name(plugin_name: str) -> str:
    """A folder name for a plugin; never empty and never a path."""
    cleaned = SAFE_NAME.sub("_", plugin_name).strip(".") or "plugin"
    return cleaned[:100]


def place(files: dict[str, bytes], root: Path, name: str, versions: dict[str, str]) -> None:
    """Put a plugin's files in `root/name`, replacing any earlier copy in one step."""
    final = root / name
    staging = root / f".{name}.incoming"
    previous = root / f".{name}.previous"
    for leftover in (staging, previous):
        shutil.rmtree(leftover, ignore_errors=True)
    staging.mkdir(parents=True)
    try:
        _write_tree(files, staging)
        (staging / MARKER_FILE).write_text(json.dumps(versions), encoding="utf-8")
        if final.exists():
            os.replace(final, previous)
        os.replace(staging, final)
    except BaseException:
        shutil.rmtree(staging, ignore_errors=True)
        if previous.exists() and not final.exists():
            os.replace(previous, final)
        raise
    shutil.rmtree(previous, ignore_errors=True)


def _marker(folder: Path) -> dict[str, str] | None:
    try:
        value = json.loads((folder / MARKER_FILE).read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else None
    except (OSError, ValueError):
        return None


# ── Sync ──────────────────────────────────────────────────────────────────────


def _load_state(root: Path) -> dict[str, Any]:
    try:
        value = json.loads((root / STATE_FILE).read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else {}
    except (OSError, ValueError):
        return {}


def _save_state(root: Path, state: dict[str, Any]) -> None:
    temporary = root / (STATE_FILE + ".tmp")
    temporary.write_text(json.dumps(state), encoding="utf-8")
    os.replace(temporary, root / STATE_FILE)


def _intact(root: Path, plugins: list[dict[str, Any]]) -> bool:
    """True while every plugin of the last sync is still on disk as it was placed."""
    for plugin in plugins:
        mark = _marker(root / plugin["dir"])
        if not mark or mark.get("sha256") != plugin["sha256"]:
            return False
    return True


def sync(
    client: Client,
    root: Path,
    *,
    target: str | None = None,
    kinds: Iterable[str] | None = None,
    report: bool = False,
) -> SyncResult:
    """Bring `root` in line with the key's installed plugins.

    Unchanged revisions cost one request that answers 304. Archives are only downloaded when their
    hash differs from what is on disk, and only folders this tool made are ever removed.
    """
    root.mkdir(parents=True, exist_ok=True)
    kinds = list(kinds) if kinds else None
    query = json.dumps([target, kinds])
    state = _load_state(root)
    known = state.get("plugins", []) if state.get("query") == query else []
    etag = state.get("etag") if state.get("query") == query else None
    if etag and not _intact(root, known):
        etag = None  # something was deleted by hand; fetch the full list again

    manifest, new_etag = client.manifest(etag=etag, target=target, kinds=kinds)
    if manifest is None:
        return SyncResult(
            changed=False,
            revision=state.get("revision"),
            poll_after_seconds=int(state.get("pollAfterSeconds", 300)),
            plugins=known,
        )

    result = SyncResult(
        changed=True,
        revision=manifest.get("revision"),
        poll_after_seconds=int(manifest.get("pollAfterSeconds", 300)),
        skipped_by_server=list(manifest.get("skipped", [])),
    )
    seen: dict[str, str] = {}
    plugins: list[dict[str, Any]] = []
    for entry in manifest.get("entries", []):
        name = folder_name(entry["pluginName"])
        if name in seen and seen[name] != entry["versionId"]:
            result.warnings.append(f"{entry['pluginName']}: two entries share a folder; kept the first")
            continue
        seen[name] = entry["versionId"]
        if entry.get("yanked"):
            result.warnings.append(
                f"{entry['pluginName']} {entry['version']} was withdrawn by its publisher"
            )
        plugin = {
            "dir": name,
            "name": entry["pluginName"],
            "version": entry["version"],
            "versionId": entry["versionId"],
            "sha256": entry["sha256"],
            "components": entry.get("components", []),
        }
        plugins.append(plugin)
        mark = _marker(root / name)
        if mark and mark.get("sha256") == entry["sha256"]:
            result.unchanged.append(entry["pluginName"])
            continue
        data = client.archive(entry["href"], entry["sha256"], int(entry["sizeBytes"]))
        files, notes = read_archive(data)
        result.warnings.extend(f"{entry['pluginName']}: {note}" for note in notes)
        place(files, root, name, {"sha256": entry["sha256"], "versionId": entry["versionId"]})
        result.applied.append({"versionId": entry["versionId"], "sha256": entry["sha256"]})

    for child in root.iterdir():
        if child.is_dir() and child.name not in seen and _marker(child) is not None:
            shutil.rmtree(child)
            result.removed.append(child.name)

    result.plugins = plugins
    _save_state(
        root,
        {
            "query": query,
            "etag": new_etag,
            "revision": result.revision,
            "pollAfterSeconds": result.poll_after_seconds,
            "plugins": plugins,
        },
    )
    if report and result.applied:
        client.report(result.applied, target=target)
    return result


# ── Command line ──────────────────────────────────────────────────────────────


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Sync BoldCreate plugins into a folder.")
    parser.add_argument("--url", default=os.environ.get("BOLDCREATE_INTEGRATIONS_URL"), help="gateway address")
    parser.add_argument("--dir", default="boldcreate-plugins", help="folder to keep in sync")
    parser.add_argument("--target", help="client name, for example deepagents")
    parser.add_argument("--kinds", help="comma separated kinds to receive, for example skill,rule")
    parser.add_argument("--report", action="store_true", help="tell the service what was placed")
    parser.add_argument("--watch", action="store_true", help="repeat at the pace the service asks")
    args = parser.parse_args(argv)

    key = os.environ.get("BOLDCREATE_INTEGRATIONS_API_KEY", "")
    if not args.url:
        print("Set BOLDCREATE_INTEGRATIONS_URL or pass --url", file=sys.stderr)
        return 2
    try:
        client = Client(args.url, key)
        kinds = [k for k in (args.kinds or "").split(",") if k] or None
        while True:
            result = sync(
                client, Path(args.dir), target=args.target, kinds=kinds, report=args.report
            )
            print(
                f"revision {result.revision}: "
                + ("unchanged" if not result.changed else f"{len(result.applied)} updated, "
                   f"{len(result.unchanged)} current, {len(result.removed)} removed")
            )
            for warning in result.warnings:
                print(f"warning: {warning}", file=sys.stderr)
            if not args.watch:
                return 0
            time.sleep(max(30, result.poll_after_seconds))
    except SyncError as err:
        print(f"error: {err}", file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        return 130


if __name__ == "__main__":
    sys.exit(main())
