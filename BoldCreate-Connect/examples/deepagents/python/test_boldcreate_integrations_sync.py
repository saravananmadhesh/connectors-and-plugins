"""Tests for boldcreate_integrations_sync against a small local server. Run: python -m unittest -v"""

from __future__ import annotations

import gzip
import hashlib
import io
import json
import tarfile
import tempfile
import threading
import unittest
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import boldcreate_integrations_sync as bc

KEY = "fyk_0123456789abcdef.secret-part"


def tar_gz(files: dict[str, bytes], extra=None) -> bytes:
    raw = io.BytesIO()
    with tarfile.open(fileobj=raw, mode="w") as tar:
        for name, content in files.items():
            info = tarfile.TarInfo(name)
            info.size = len(content)
            tar.addfile(info, io.BytesIO(content))
        for info in extra or []:
            tar.addfile(info)
    return gzip.compress(raw.getvalue(), mtime=0)


def entry(name: str, archive: bytes, version="1.0.0", **extra) -> dict:
    sha = hashlib.sha256(archive).hexdigest()
    return {
        "installationId": "ins_1",
        "pluginId": "plg_" + name,
        "pluginName": name,
        "versionId": "pv_" + sha[:12],
        "version": version,
        "scope": "user",
        "yanked": False,
        "sha256": sha,
        "sizeBytes": len(archive),
        "href": f"/v1/plugin-versions/pv_{sha[:12]}/archive",
        "components": [{"id": "cmp_1", "kind": "skill", "name": "s", "enabled": True}],
        **extra,
    }


class Service:
    """A stand-in for the gateway: a manifest, archives and a request log."""

    def __init__(self) -> None:
        self.entries: list[dict] = []
        self.archives: dict[str, bytes] = {}
        self.revision = "r1"
        self.log: list[tuple[str, str, dict]] = []
        self.fail_next: list[tuple[int, dict]] = []
        self.redirect_to: str | None = None
        self.reports: list[dict] = []
        outer = self

        class Handler(BaseHTTPRequestHandler):
            def log_message(self, *args):  # noqa: D401
                pass

            def _send(self, status, body=b"", headers=None):
                self.send_response(status)
                for k, v in (headers or {}).items():
                    self.send_header(k, v)
                self.send_header("content-length", str(len(body)))
                self.end_headers()
                self.wfile.write(body)

            def _handle(self):
                outer.log.append((self.command, self.path, dict(self.headers)))
                if self.headers.get("authorization") != f"Bearer {KEY}":
                    return self._send(401, b'{"error":{"code":"unauthenticated"}}')
                if outer.fail_next:
                    status, headers = outer.fail_next.pop(0)
                    return self._send(status, b'{"error":{"code":"busy"}}', headers)
                if outer.redirect_to:
                    return self._send(302, b"", {"location": outer.redirect_to})
                path = self.path.split("?")[0]
                if self.command == "GET" and path == "/v1/sync":
                    tag = f'"{outer.revision}"'
                    if self.headers.get("if-none-match") == tag:
                        return self._send(304, b"", {"etag": tag})
                    body = json.dumps(
                        {
                            "revision": outer.revision,
                            "pollAfterSeconds": 60,
                            "entries": outer.entries,
                            "skipped": [],
                        }
                    ).encode()
                    return self._send(200, body, {"etag": tag, "content-type": "application/json"})
                if self.command == "POST" and path == "/v1/sync/reports":
                    size = int(self.headers.get("content-length", "0"))
                    outer.reports.append(json.loads(self.rfile.read(size)))
                    return self._send(204)
                if self.command == "GET" and path in outer.archives:
                    return self._send(200, outer.archives[path])
                return self._send(404, b'{"error":{"code":"not_found"}}')

            do_GET = _handle
            do_POST = _handle

        self.server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        self.url = f"http://127.0.0.1:{self.server.server_address[1]}"
        threading.Thread(target=lambda: self.server.serve_forever(poll_interval=0.01), daemon=True).start()

    def add(self, name: str, files: dict[str, bytes], **extra) -> dict:
        archive = tar_gz(files)
        item = entry(name, archive, **extra)
        self.archives[item["href"]] = archive
        self.entries.append(item)
        return item

    def downloads(self) -> int:
        return sum(1 for _, path, _ in self.log if path.endswith("/archive"))

    def close(self) -> None:
        self.server.shutdown()
        self.server.server_close()


class SyncTests(unittest.TestCase):
    def setUp(self) -> None:
        self.service = Service()
        self.addCleanup(self.service.close)
        tmp = tempfile.TemporaryDirectory()
        self.addCleanup(tmp.cleanup)
        self.root = Path(tmp.name) / "plugins"
        self.client = bc.Client(self.service.url, KEY, sleep=lambda _: None)

    def run_sync(self, **kwargs) -> bc.SyncResult:
        return bc.sync(self.client, self.root, **kwargs)

    def test_places_files_and_reports_the_skills_folder(self):
        self.service.add("review-tools", {"skills/review/SKILL.md": b"# review", "README.md": b"hi"})
        result = self.run_sync()
        self.assertTrue(result.changed)
        self.assertEqual(
            (self.root / "review-tools" / "skills" / "review" / "SKILL.md").read_bytes(), b"# review"
        )
        self.assertEqual(result.skill_dirs(self.root), [self.root / "review-tools" / "skills"])
        self.assertEqual(len(result.applied), 1)

    def test_a_second_run_costs_one_request_and_downloads_nothing(self):
        self.service.add("p", {"a.txt": b"1"})
        self.run_sync()
        before = self.service.downloads()
        again = self.run_sync()
        self.assertFalse(again.changed)
        self.assertEqual(self.service.downloads(), before)
        self.assertEqual(self.service.log[-1][2].get("If-None-Match"), '"r1"')
        self.assertEqual(again.poll_after_seconds, 60)
        self.assertEqual([p["name"] for p in again.plugins], ["p"])

    def test_refetches_when_a_folder_was_deleted_by_hand(self):
        self.service.add("p", {"a.txt": b"1"})
        self.run_sync()
        import shutil

        shutil.rmtree(self.root / "p")
        result = self.run_sync()
        self.assertTrue(result.changed)
        self.assertTrue((self.root / "p" / "a.txt").exists())

    def test_a_new_revision_downloads_only_the_changed_archive(self):
        self.service.add("keep", {"a": b"1"})
        self.service.add("move", {"b": b"1"})
        self.run_sync()
        downloads = self.service.downloads()
        self.service.entries.pop()
        self.service.add("move", {"b": b"2"}, version="1.1.0")
        self.service.revision = "r2"
        result = self.run_sync()
        self.assertEqual(self.service.downloads(), downloads + 1)
        self.assertEqual(result.unchanged, ["keep"])
        self.assertEqual((self.root / "move" / "b").read_bytes(), b"2")

    def test_removes_only_folders_this_tool_made(self):
        self.service.add("gone", {"a": b"1"})
        self.run_sync()
        mine = self.root / "my-own-notes"
        mine.mkdir()
        (mine / "keep.txt").write_text("mine")
        self.service.entries.clear()
        self.service.revision = "r2"
        result = self.run_sync()
        self.assertEqual(result.removed, ["gone"])
        self.assertFalse((self.root / "gone").exists())
        self.assertTrue((mine / "keep.txt").exists())

    def test_a_withdrawn_version_stays_in_place_with_a_warning(self):
        self.service.add("old", {"a": b"1"}, yanked=True)
        result = self.run_sync()
        self.assertTrue((self.root / "old" / "a").exists())
        self.assertTrue(any("withdrawn" in w for w in result.warnings))

    def test_a_changed_query_ignores_the_stored_revision(self):
        self.service.add("p", {"a": b"1"})
        self.run_sync()
        self.run_sync(kinds=["skill"])
        path = self.service.log[-1][1]
        self.assertIn("kinds=skill", path)
        self.assertNotIn("If-None-Match", self.service.log[-1][2])

    def test_rejects_an_archive_whose_hash_is_wrong(self):
        item = self.service.add("p", {"a": b"1"})
        self.service.archives[item["href"]] = tar_gz({"a": b"tampered"})
        item["sizeBytes"] = len(self.service.archives[item["href"]])
        with self.assertRaisesRegex(bc.SyncError, "hash"):
            self.run_sync()
        self.assertFalse((self.root / "p").exists())

    def test_rejects_an_archive_with_the_wrong_size(self):
        item = self.service.add("p", {"a": b"1"})
        item["sizeBytes"] += 5
        with self.assertRaisesRegex(bc.SyncError, "size|more data|hash"):
            self.run_sync()

    def test_refuses_paths_that_leave_the_plugin_folder(self):
        for name in ("../escape.txt", "/abs.txt", "a/../../b.txt", "c:/win.txt", "x\\y.txt"):
            with self.assertRaises(bc.SyncError, msg=name):
                bc.read_archive(tar_gz({name: b"x"}))

    def test_skips_links_and_devices_and_says_so(self):
        link = tarfile.TarInfo("evil")
        link.type = tarfile.SYMTYPE
        link.linkname = "/etc/passwd"
        files, notes = bc.read_archive(tar_gz({"ok.txt": b"1"}, extra=[link]))
        self.assertEqual(list(files), ["ok.txt"])
        self.assertTrue(any("evil" in n for n in notes))

    def test_enforces_size_and_count_limits(self):
        original = (bc.MAX_FILE_BYTES, bc.MAX_FILES, bc.MAX_TOTAL_BYTES)
        self.addCleanup(lambda: setattr_all(original))
        bc.MAX_FILE_BYTES = 10
        with self.assertRaisesRegex(bc.SyncError, "too large"):
            bc.read_archive(tar_gz({"a": b"x" * 11}))
        bc.MAX_FILE_BYTES, bc.MAX_FILES = original[0], 2
        with self.assertRaisesRegex(bc.SyncError, "more than"):
            bc.read_archive(tar_gz({"a": b"1", "b": b"1", "c": b"1"}))
        bc.MAX_FILES, bc.MAX_TOTAL_BYTES = original[1], 5
        with self.assertRaisesRegex(bc.SyncError, "more than"):
            bc.read_archive(tar_gz({"a": b"123", "b": b"456"}))

    def test_rejects_something_that_is_not_a_gzip_tar(self):
        with self.assertRaisesRegex(bc.SyncError, "readable"):
            bc.read_archive(b"this is not an archive")

    def test_only_follows_archive_paths_on_the_same_host(self):
        item = self.service.add("p", {"a": b"1"})
        for href in ("http://evil.example/v1/plugin-versions/pv_1/archive", "/v1/other", "//evil/x"):
            item["href"] = href
            with self.assertRaisesRegex(bc.SyncError, "not an archive"):
                self.run_sync()

    def test_never_follows_a_redirect_with_the_key(self):
        self.service.redirect_to = "http://127.0.0.1:1/steal"
        with self.assertRaises(bc.SyncError):
            self.run_sync()
        self.assertEqual(len(self.service.log), 1)

    def test_retries_a_busy_service_and_honours_retry_after(self):
        waits: list[float] = []
        self.client = bc.Client(self.service.url, KEY, sleep=waits.append)
        self.service.fail_next = [(503, {"retry-after": "7"}), (429, {})]
        self.service.add("p", {"a": b"1"})
        self.run_sync()
        self.assertEqual(waits, [7.0, 2.0])

    def test_gives_up_after_the_retries_with_a_plain_message(self):
        self.client = bc.Client(self.service.url, KEY, retries=1, sleep=lambda _: None)
        self.service.fail_next = [(503, {}), (503, {})]
        with self.assertRaisesRegex(bc.SyncError, "503"):
            self.run_sync()

    def test_explains_a_refused_key_without_echoing_it(self):
        client = bc.Client(self.service.url, "fyk_wrong.key", sleep=lambda _: None)
        with self.assertRaises(bc.SyncError) as ctx:
            bc.sync(client, self.root)
        self.assertIn("401", str(ctx.exception))
        self.assertNotIn("fyk_wrong", str(ctx.exception))

    def test_reports_what_was_placed_only_when_asked(self):
        self.service.add("p", {"a": b"1"})
        self.run_sync()
        self.assertEqual(self.service.reports, [])
        self.service.revision = "r2"
        self.service.add("q", {"b": b"1"})
        self.run_sync(report=True, target="deepagents")
        self.assertEqual(len(self.service.reports), 1)
        self.assertEqual(self.service.reports[0]["target"], "deepagents")
        self.assertEqual(len(self.service.reports[0]["applied"]), 1)

    def test_plugin_names_cannot_become_paths(self):
        for hostile in ("../../etc", "a/b", "a\\b", "..", "."):
            name = bc.folder_name(hostile)
            self.assertNotIn("/", name)
            self.assertNotIn("\\", name)
            self.assertNotIn(name, ("", ".", ".."))
        self.assertEqual(bc.folder_name("..."), "plugin")

    def test_rejects_bad_settings_before_any_request(self):
        for url, key in (("ftp://x", KEY), ("http://", KEY), ("http://x", ""), ("http://x", "a b")):
            with self.assertRaises(bc.SyncError):
                bc.Client(url, key)

    def test_a_failed_replacement_keeps_the_earlier_copy(self):
        self.service.add("p", {"a": b"1"})
        self.run_sync()
        original = bc.os.replace

        def broken(src, dst):
            if str(dst).endswith("p") and ".incoming" in str(src):
                raise OSError("disk full")
            return original(src, dst)

        bc.os.replace = broken
        self.addCleanup(lambda: setattr(bc.os, "replace", original))
        with self.assertRaises(OSError):
            bc.place({"a": b"2"}, self.root, "p", {"sha256": "x"})
        bc.os.replace = original
        self.assertEqual((self.root / "p" / "a").read_bytes(), b"1")

    def test_command_line_prints_a_summary(self):
        import contextlib
        import os

        self.service.add("p", {"a": b"1"})
        os.environ["BOLDCREATE_INTEGRATIONS_API_KEY"] = KEY
        self.addCleanup(os.environ.pop, "BOLDCREATE_INTEGRATIONS_API_KEY", None)
        out = io.StringIO()
        with contextlib.redirect_stdout(out):
            code = bc.main(["--url", self.service.url, "--dir", str(self.root), "--kinds", "skill"])
        self.assertEqual(code, 0)
        self.assertIn("1 updated", out.getvalue())
        self.assertNotIn(KEY, out.getvalue())

    def test_command_line_needs_an_address_and_a_key(self):
        import contextlib
        import os

        os.environ.pop("BOLDCREATE_INTEGRATIONS_URL", None)
        err = io.StringIO()
        with contextlib.redirect_stderr(err):
            self.assertEqual(bc.main([]), 2)
            os.environ.pop("BOLDCREATE_INTEGRATIONS_API_KEY", None)
            self.assertEqual(bc.main(["--url", self.service.url]), 1)


def setattr_all(values):
    bc.MAX_FILE_BYTES, bc.MAX_FILES, bc.MAX_TOTAL_BYTES = values


if __name__ == "__main__":
    unittest.main()
