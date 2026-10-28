"""A deep agent that uses the plugins installed for one BoldCreate API key.

  1. `boldcreate_integrations_sync` places the plugin files in a folder (skills, rules, agents).
  2. The agent loads the synced skills from that folder.
  3. The agent reaches the tools of the installed MCP servers through the gateway's `/mcp`,
     with the same key. Tool names look like `<server>__<tool>`.

Set BOLDCREATE_INTEGRATIONS_URL and BOLDCREATE_INTEGRATIONS_API_KEY, plus the key of your model provider, then run:

    python agent.py "Summarise the open pull requests"

This file needs `pip install -r requirements.txt`. The sync helper itself needs nothing.
"""

from __future__ import annotations

import asyncio
import os
import sys
from pathlib import Path

from boldcreate_integrations_sync import Client, SyncError, sync

MODEL = os.environ.get("MODEL", "anthropic:claude-sonnet-5-5")
FOLDER = Path(os.environ.get("BOLDCREATE_INTEGRATIONS_DIR", "boldcreate-plugins")).resolve()


def settings() -> tuple[str, str]:
    url = os.environ.get("BOLDCREATE_INTEGRATIONS_URL", "")
    key = os.environ.get("BOLDCREATE_INTEGRATIONS_API_KEY", "")
    if not url or not key:
        raise SystemExit("Set BOLDCREATE_INTEGRATIONS_URL and BOLDCREATE_INTEGRATIONS_API_KEY")
    return url.rstrip("/"), key


async def build_agent(url: str, key: str):
    from deepagents import create_deep_agent
    from deepagents.backends import FilesystemBackend
    from langchain_mcp_adapters.client import MultiServerMCPClient

    # Files first: a failed sync must not stop the agent from using what is already on disk.
    skill_sources: list[str] = []
    try:
        result = sync(Client(url, key), FOLDER, target="deepagents", kinds=["skill"])
        for warning in result.warnings:
            print(f"warning: {warning}", file=sys.stderr)
        plugins = result.plugins
    except SyncError as error:
        print(f"warning: sync failed, using the files already on disk ({error})", file=sys.stderr)
        plugins = [
            {"dir": folder.name}
            for folder in FOLDER.iterdir()
            if folder.is_dir() and (folder / ".boldcreate-archive").exists()
        ] if FOLDER.exists() else []
    for plugin in plugins:
        if (FOLDER / plugin["dir"] / "skills").is_dir():
            skill_sources.append(f"/{plugin['dir']}/skills/")

    # Tools: one connection to the gateway carries every installed server.
    mcp = MultiServerMCPClient(
        {
            "boldcreate": {
                "transport": "streamable_http",
                "url": f"{url}/mcp",
                "headers": {"Authorization": f"Bearer {key}"},
            }
        }
    )
    tools = await mcp.get_tools()

    return create_deep_agent(
        model=MODEL,
        tools=tools,
        system_prompt="You are a helpful assistant. Use your skills and tools when they fit.",
        backend=FilesystemBackend(root_dir=str(FOLDER), virtual_mode=True),
        skills=skill_sources,
    )


async def main(task: str) -> None:
    url, key = settings()
    agent = await build_agent(url, key)
    reply = await agent.ainvoke({"messages": [{"role": "user", "content": task}]})
    print(reply["messages"][-1].content)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit('Usage: python agent.py "your task"')
    asyncio.run(main(" ".join(sys.argv[1:])))
