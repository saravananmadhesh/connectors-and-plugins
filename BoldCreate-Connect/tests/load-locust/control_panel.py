#!/usr/bin/env python3
"""
A local web page to run the staging capacity test and keep its results.

  python3 tests/load-locust/control_panel.py        then open http://127.0.0.1:8090

The page asks for the environment's addresses, the load-test account and the round to run, then
runs the same three steps as run_staging.py (make test data, capacity run, remove test data).
While it runs it shows each step and links to Locust's live charts. Every run is kept in
results/<time>-<round>/ next to this script (settings without the password, the log, summary.json,
steps.csv, projects.csv, report.html), and the page lists past runs.

It listens on 127.0.0.1 only. The password is passed to the steps and never stored.
"""

import json
import os
import re
import subprocess
import sys
import threading
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

from guard import PRODUCTION_HOST_PATTERN

HERE = Path(__file__).resolve().parent
RESULTS = HERE / "results"
PORT = int(os.getenv("CONTROL_PANEL_PORT", "8090"))
LIVE_URL = "http://127.0.0.1:8089"


class Run:
    """The one run that may be going on, and its log."""

    def __init__(self):
        self.lock = threading.Lock()
        self.process: subprocess.Popen | None = None
        self.thread: threading.Thread | None = None
        self.log: list[str] = []
        self.phase = "idle"
        self.folder: Path | None = None
        self.stopping = False

    def busy(self) -> bool:
        return self.thread is not None and self.thread.is_alive()

    def write(self, line: str):
        with self.lock:
            self.log.append(line.rstrip("\n"))
        if self.folder:
            with open(self.folder / "log.txt", "a", encoding="utf-8") as f:
                f.write(line if line.endswith("\n") else line + "\n")

    def step(self, phase: str, args: list[str], env: dict) -> int:
        self.phase = phase
        self.write(f"--- {phase} ---")
        self.process = subprocess.Popen(
            [sys.executable, *args],
            cwd=str(HERE),
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1,
        )
        for line in self.process.stdout:
            # Locust's own per-second lines are noise here; the live charts show them.
            if line.startswith("[capacity]") or line.startswith("[test-data]") or "Error" in line or "Refused" in line:
                self.write(line)
        code = self.process.wait()
        self.process = None
        return code

    def start(self, form: dict) -> str | None:
        if self.busy():
            return "A run is already going on."
        error = check_form(form)
        if error:
            return error
        stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        self.folder = RESULTS / f"{stamp}-{form['round']}"
        self.folder.mkdir(parents=True, exist_ok=True)
        settings = {k: v for k, v in form.items() if k != "password"}
        settings["started"] = datetime.now().isoformat(timespec="seconds")
        (self.folder / "settings.json").write_text(json.dumps(settings, indent=2), encoding="utf-8")
        self.log = []
        self.stopping = False
        self.thread = threading.Thread(target=self._run, args=(form,), daemon=True)
        self.thread.start()
        return None

    def _run(self, form: dict):
        web, gateway = form["web"].rstrip("/"), form["gateway"].rstrip("/")
        hosts = ",".join({urlparse(web).hostname, urlparse(gateway).hostname})
        env = {
            **os.environ,
            "LOCUST_ALLOW_LOAD": "1",
            "LOCUST_ALLOWED_HOSTS": hosts,
            "LOAD_EMAIL": form["email"],
            "LOAD_PASSWORD": form["password"],
            "CAPACITY_OUT_DIR": str(self.folder),
            "CAPACITY_START_USERS": str(form["startUsers"]),
            "CAPACITY_STEP_USERS": str(form["stepUsers"]),
            "CAPACITY_STEP_SECONDS": str(form["stepSeconds"]),
            "CAPACITY_MAX_USERS": str(form["maxUsers"]),
            "PYTHONUNBUFFERED": "1",
        }
        result = "finished"
        try:
            if self.step("Making test data", ["test_data.py", "setup", f"--web={web}", f"--projects={form['projects']}"], env) != 0:
                result = "setup failed"
            elif not self.stopping:
                run = ["run_capacity.py", f"--target={gateway}", "--project-keys-file=keys.txt", "--live"]
                if form["round"] == "busy":
                    run.append(f"--busy-share={form['busyShare']}")
                if self.step("Capacity run", run, env) != 0 and not self.stopping:
                    result = "run failed"
        finally:
            if self.step("Removing test data", ["test_data.py", "cleanup", f"--web={web}"], env) != 0:
                result += "; cleanup did not finish (run test_data.py cleanup --all)"
            if self.stopping:
                result = "stopped; " + result
            self.phase = result
            self.write(f"--- {result} ---")
            (self.folder / "settings.json").write_text(
                json.dumps({**json.loads((self.folder / "settings.json").read_text()), "result": result}, indent=2),
                encoding="utf-8",
            )

    def stop(self):
        self.stopping = True
        process = self.process
        if process and self.phase == "Capacity run":
            process.terminate()


RUN = Run()


def check_form(form: dict) -> str | None:
    for name in ("web", "gateway", "email", "password", "round"):
        if not str(form.get(name, "")).strip():
            return f"Please fill in {name}."
    for name in ("web", "gateway"):
        url = urlparse(form[name])
        if url.scheme not in ("http", "https") or not url.hostname:
            return f"{name} must be a full address such as https://connect-staging.example.com"
        if PRODUCTION_HOST_PATTERN.search(url.hostname):
            return f"{url.hostname} looks like production; load runs never go there."
    if form["round"] not in ("capacity", "busy"):
        return "Pick a round."
    if not form.get("confirm"):
        return "Please confirm this is a test environment and the limit is set."
    try:
        for name, low, high in (
            ("projects", 1, 20),
            ("startUsers", 1, 5000),
            ("stepUsers", 1, 5000),
            ("stepSeconds", 30, 3600),
            ("maxUsers", 1, 20000),
            ("busyShare", 1, 99),
        ):
            value = int(form.get(name, 0))
            if not low <= value <= high:
                return f"{name} must be between {low} and {high}."
            form[name] = value
    except (TypeError, ValueError):
        return "Numbers only, please."
    return None


def past_runs() -> list[dict]:
    runs = []
    if not RESULTS.exists():
        return runs
    for folder in sorted(RESULTS.iterdir(), reverse=True):
        if not folder.is_dir():
            continue
        entry = {"name": folder.name}
        for file in ("settings.json", "summary.json"):
            try:
                entry[file.split(".")[0]] = json.loads((folder / file).read_text(encoding="utf-8"))
            except (OSError, ValueError):
                pass
        entry["hasReport"] = (folder / "report.html").exists()
        runs.append(entry)
    return runs


class Handler(BaseHTTPRequestHandler):
    def log_message(self, *_args):
        pass

    def send(self, status: int, body: bytes, kind: str):
        self.send_response(status)
        self.send_header("Content-Type", kind)
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def json(self, data, status: int = 200):
        self.send(status, json.dumps(data).encode(), "application/json")

    def same_origin(self) -> bool:
        origin = self.headers.get("Origin")
        return origin in (None, f"http://127.0.0.1:{PORT}", f"http://localhost:{PORT}")

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/":
            self.send(200, PAGE.encode(), "text/html; charset=utf-8")
        elif path == "/api/status":
            with RUN.lock:
                log = RUN.log[-400:]
            self.json({"busy": RUN.busy(), "phase": RUN.phase, "log": log, "live": LIVE_URL,
                       "folder": RUN.folder.name if RUN.folder else None})
        elif path == "/api/runs":
            self.json(past_runs())
        elif m := re.fullmatch(r"/results/([\w.-]+)/(report\.html|summary\.json|steps\.csv|projects\.csv|log\.txt)", path):
            file = RESULTS / unquote(m.group(1)) / m.group(2)
            if file.resolve().parent.parent != RESULTS.resolve() or not file.exists():
                self.send(404, b"not found", "text/plain")
                return
            kind = {"html": "text/html", "json": "application/json"}.get(file.suffix[1:], "text/plain")
            self.send(200, file.read_bytes(), f"{kind}; charset=utf-8")
        else:
            self.send(404, b"not found", "text/plain")

    def do_POST(self):
        if not self.same_origin():
            self.json({"error": "Wrong origin."}, 403)
            return
        path = urlparse(self.path).path
        length = int(self.headers.get("Content-Length") or 0)
        body = json.loads(self.rfile.read(length) or b"{}")
        if path == "/api/run":
            error = RUN.start(body)
            self.json({"error": error} if error else {"ok": True}, 400 if error else 200)
        elif path == "/api/stop":
            RUN.stop()
            self.json({"ok": True})
        else:
            self.send(404, b"not found", "text/plain")


PAGE = r"""<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Load Test Control Panel</title>
<style>
:root{--bg:#f5f6f8;--panel:#fff;--fg:#1c2330;--muted:#5d6676;--line:#dde1e8;--accent:#2f6f8f;--good:#2e7d4f;--bad:#b23a3a}
@media (prefers-color-scheme:dark){:root{--bg:#12161d;--panel:#1a2029;--fg:#e4e8ef;--muted:#9aa4b5;--line:#2c3440;--accent:#6fb3d6;--good:#6cc28f;--bad:#e57b7b}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:15px/1.5 system-ui,Segoe UI,sans-serif;padding:24px 16px}
main{max-width:980px;margin:0 auto;display:grid;gap:18px}h1{margin:0;font-size:1.5rem}h2{margin:0 0 10px;font-size:1.05rem}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:16px}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
label{display:grid;gap:4px;font-size:.85rem;color:var(--muted)}input,select{font:inherit;padding:7px 9px;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--fg)}
.rounds{display:flex;gap:12px;flex-wrap:wrap}.rounds label{display:flex;gap:8px;align-items:flex-start;border:1px solid var(--line);border-radius:6px;padding:10px;flex:1;min-width:240px;color:var(--fg)}
button{font:inherit;padding:8px 16px;border-radius:6px;border:1px solid var(--accent);background:var(--accent);color:#fff;cursor:pointer}button.ghost{background:transparent;color:var(--accent)}button:disabled{opacity:.5;cursor:default}
.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.muted{color:var(--muted);font-size:.85rem}.err{color:var(--bad)}
pre{background:var(--bg);border:1px solid var(--line);border-radius:6px;padding:10px;max-height:320px;overflow:auto;font-size:.8rem;margin:0}
table{border-collapse:collapse;width:100%;font-size:.85rem;font-variant-numeric:tabular-nums}th,td{text-align:right;padding:5px 8px;border-bottom:1px solid var(--line)}th:first-child,td:first-child{text-align:left}
.tbl{overflow-x:auto}.ok{color:var(--good)}.no{color:var(--bad)}a{color:var(--accent)}
</style></head><body><main>
<h1>Load Test Control Panel</h1>
<div class="panel"><h2>1. Environment and account</h2><div class="grid">
<label>Web app address<input id="web" value="https://connect-staging.boldcreate.ai"></label>
<label>Gateway address<input id="gateway" value="https://connect-gateway-staging.boldcreate.ai"></label>
<label>Load-test account email<input id="email" autocomplete="username"></label>
<label>Password (not stored)<input id="password" type="password" autocomplete="current-password"></label>
</div></div>
<div class="panel"><h2>2. Round</h2><div class="rounds">
<label><input type="radio" name="round" value="capacity" checked><span><b>Total capacity</b><br><span class="muted">Users spread evenly over the projects. Before you run: set "Project requests per window" to 100000 on the admin Limits page.</span></span></label>
<label><input type="radio" name="round" value="busy"><span><b>One busy project</b><br><span class="muted">One project gets most of the users. Before you run: set "Project requests per window" to the limit you plan.</span></span></label>
</div>
<div class="grid" style="margin-top:12px">
<label>Projects (each in its own organization)<input id="projects" type="number" value="3" min="1" max="20"></label>
<label>Busy project share, % (busy round only)<input id="busyShare" type="number" value="60" min="1" max="99"></label>
<label>Limit you set (for the record)<input id="limitNote" placeholder="e.g. 4300 a minute"></label>
</div>
<details style="margin-top:10px"><summary class="muted">Step settings</summary><div class="grid" style="margin-top:8px">
<label>Users in the first step<input id="startUsers" type="number" value="20"></label>
<label>Users added each step<input id="stepUsers" type="number" value="20"></label>
<label>Seconds per step<input id="stepSeconds" type="number" value="120"></label>
<label>Most users<input id="maxUsers" type="number" value="600"></label>
</div></details></div>
<div class="panel"><h2>3. Run</h2>
<label class="row" style="color:var(--fg)"><input type="checkbox" id="confirm"> This is a test environment and I set the limit for this round.</label>
<div class="row" style="margin-top:10px"><button id="run">Run</button><button id="stop" class="ghost" disabled>Stop</button>
<span id="phase" class="muted">Idle</span><a id="live" href="http://127.0.0.1:8089" target="_blank" hidden>Open live charts</a></div>
<p id="error" class="err"></p>
<div class="tbl"><table id="steps"><thead><tr><th>Step</th><th>Users</th><th>OK calls/s</th><th>Failed %</th><th>p95 ms</th><th>429s</th><th>Result</th></tr></thead><tbody></tbody></table></div>
<details style="margin-top:10px"><summary class="muted">Log</summary><pre id="log"></pre></details></div>
<div class="panel"><h2>Past runs</h2><p class="muted">Saved in tests/load-locust/results/.</p><div class="tbl"><table id="runs"><thead><tr><th>When</th><th>Round</th><th>Projects</th><th>Capacity (calls/s)</th><th>70% a minute</th><th>Limit set</th><th>Result</th><th>Files</th></tr></thead><tbody></tbody></table></div>
<div id="detail"></div></div>
</main><script>
const $=id=>document.getElementById(id);
try{$('email').value=localStorage.getItem('lt-email')||'';}catch(e){}
const num=id=>Number($(id).value);
$('run').onclick=async()=>{$('error').textContent='';
 const round=document.querySelector('input[name=round]:checked').value;
 const body={web:$('web').value,gateway:$('gateway').value,email:$('email').value,password:$('password').value,round,
  projects:num('projects'),busyShare:num('busyShare'),startUsers:num('startUsers'),stepUsers:num('stepUsers'),stepSeconds:num('stepSeconds'),maxUsers:num('maxUsers'),limitNote:$('limitNote').value,confirm:$('confirm').checked};
 try{localStorage.setItem('lt-email',body.email);}catch(e){}
 const r=await fetch('/api/run',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
 const d=await r.json(); if(d.error)$('error').textContent=d.error; poll();};
$('stop').onclick=()=>fetch('/api/stop',{method:'POST'});
const stepRe=/\[capacity\] step (\d+): (\d+) users, ([\d.]+) ok\/s, ([\d.]+)% failed, p95 (\d+) ms, 429s (\d+) -> (.*)/;
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
async function poll(){const s=await (await fetch('/api/status')).json();
 $('phase').textContent=s.phase; $('run').disabled=s.busy; $('stop').disabled=!s.busy; $('live').hidden=!(s.busy&&s.phase==='Capacity run');
 $('log').textContent=s.log.join('\n');
 const rows=s.log.map(l=>l.match(stepRe)).filter(Boolean).map(m=>`<tr><td>${m[1]}</td><td>${m[2]}</td><td>${m[3]}</td><td>${m[4]}</td><td>${m[5]}</td><td>${m[6]}</td><td class="${m[7]==='ok'?'ok':'no'}">${m[7]==='ok'?'healthy':'over the line'}</td></tr>`);
 document.querySelector('#steps tbody').innerHTML=rows.join('');
 if(s.busy)setTimeout(poll,2000);else loadRuns();}
async function loadRuns(){const runs=await (await fetch('/api/runs')).json();
 document.querySelector('#runs tbody').innerHTML=runs.map(r=>{const st=r.settings||{},su=r.summary||{};
  const files=['summary.json','projects.csv','log.txt'].map(f=>`<a href="/results/${r.name}/${f}" target="_blank">${f.split('.')[0]}</a>`).join(' ')+(r.hasReport?` <a href="/results/${r.name}/report.html" target="_blank">charts</a>`:'');
  return `<tr><td><a href="#" data-run="${esc(r.name)}">${esc(st.started||r.name)}</a></td><td>${st.round==='busy'?'One busy project':'Total capacity'}</td><td>${esc(st.projects??'')}</td><td>${su.capacity_ok_per_second??'–'}</td><td>${su.safe_per_minute_70pct??'–'}</td><td>${esc(st.limitNote||'')}</td><td>${esc(st.result||'')}</td><td>${files}</td></tr>`;}).join('');
 document.querySelectorAll('[data-run]').forEach(a=>a.onclick=e=>{e.preventDefault();show(runs.find(r=>r.name===a.dataset.run));});}
function show(r){const su=r.summary; if(!su){$('detail').innerHTML='<p class="muted">This run has no results.</p>';return;}
 const steps=su.steps.map(s=>`<tr><td>${s.step}</td><td>${s.users}</td><td>${s.ok_per_second}</td><td>${s.failed_pct}</td><td>${s.p95_ms}</td><td>${s.throttled_429}</td><td class="${s.healthy?'ok':'no'}">${s.healthy?'healthy':'over the line'}</td></tr>`).join('');
 const last=su.steps.filter(s=>s.healthy).pop()||su.steps[su.steps.length-1];
 const projects=(last.projects||[]).map(p=>`<tr><td>${p.project}</td><td>${p.ok_per_minute}</td><td>${p.failed_pct}</td><td>${p.throttled_429}</td><td>${p.p95_ms}</td></tr>`).join('');
 $('detail').innerHTML=`<h2 style="margin-top:16px">${esc(r.name)}</h2><p>Capacity about <b>${su.capacity_ok_per_second}</b> calls/s with ${su.capacity_users} users; 70% is <b>${su.safe_per_minute_70pct}</b> a minute.</p>
 <div class="tbl"><table><thead><tr><th>Step</th><th>Users</th><th>OK calls/s</th><th>Failed %</th><th>p95 ms</th><th>429s</th><th>Result</th></tr></thead><tbody>${steps}</tbody></table></div>
 <h2 style="margin-top:12px">Per project at step ${last.step}</h2><div class="tbl"><table><thead><tr><th>Project</th><th>OK a minute</th><th>Failed %</th><th>429s</th><th>p95 ms</th></tr></thead><tbody>${projects}</tbody></table></div>`;}
poll();
</script></body></html>"""


def main():
    RESULTS.mkdir(exist_ok=True)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"[control-panel] open http://127.0.0.1:{PORT}  (Ctrl+C to quit)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        RUN.stop()
        print("\n[control-panel] stopping")


if __name__ == "__main__":
    main()
