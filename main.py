#!/usr/bin/env python3
"""
Entry point for the Email Agent system.

Usage:
    python main.py              # continuous monitoring loop
    python main.py --once       # single cycle then exit
    python main.py --configure  # open interactive config

Environment variables required:
    ANTHROPIC_API_KEY   — your Anthropic API key
"""

from __future__ import annotations

import argparse
import logging
import os
import sys

# ── Logging setup ───────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
    handlers=[
        logging.StreamHandler(sys.stdout),
        logging.FileHandler("email_agent.log", encoding="utf-8"),
    ],
)
log = logging.getLogger(__name__)

# ── MCP bridge ──────────────────────────────────────────────────────────────
# When running inside Claude Code (the interactive session), the MCP Gmail
# tools are available via tool calls.  Outside of that context (e.g. a
# standalone cron job) you would swap this out for a real Gmail API client.
# The bridge below imports the live MCP tool functions when available and
# falls back to a stub so the code can still be imported / unit-tested.

def _build_mcp_caller():
    """
    Returns a callable(tool_name, **kwargs) -> dict that routes to the
    correct Gmail MCP tool.
    """
    try:
        # Try importing the MCP tool functions injected by Claude Code.
        # These names match the MCP server ID prefix.
        from mcp_tools import gmail as _gmail_tools  # type: ignore
        log.info("Using live Gmail MCP tools via mcp_tools.gmail")
        return _gmail_tools.call
    except ImportError:
        pass

    # Fallback: call through the subprocess-based MCP client if installed.
    try:
        from mcp_client import MCPClient  # type: ignore
        client = MCPClient()
        log.info("Using MCPClient for Gmail tool calls")
        return client.call
    except ImportError:
        pass

    # Last resort stub — prints what would have been called.
    log.warning(
        "No live MCP client found. Using stub caller. "
        "Tool calls will be printed but not executed."
    )

    def stub_caller(tool_name: str, **kwargs):
        log.info("STUB CALL: %s(%s)", tool_name, kwargs)
        return {}

    return stub_caller


# ── Inline MCP caller for Claude Code session ───────────────────────────────
# When this script is executed inside a Claude Code session the Gmail MCP
# tools are accessible as Python-callable objects injected into the runtime.
# We expose a thin dispatcher here so EmailAgent / GmailClient can call them
# without knowing the MCP server's long UUID-based prefix.

_TOOL_MAP = {
    "search_threads":   "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c__search_threads",
    "get_thread":       "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c__get_thread",
    "create_draft":     "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c__create_draft",
    "list_labels":      "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c__list_labels",
    "list_drafts":      "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c__list_drafts",
    "label_thread":     "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c__label_thread",
    "label_message":    "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c__label_message",
    "create_label":     "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c__create_label",
    "unlabel_thread":   "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c__unlabel_thread",
    "unlabel_message":  "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c__unlabel_message",
}


def make_session_mcp_caller(tool_runner):
    """
    Wraps the Claude Code tool_runner so the agent can call Gmail tools
    by short name (e.g. 'search_threads') rather than the full MCP ID.

    tool_runner is a callable(full_tool_name, **kwargs) supplied by the
    Claude Code harness when this module is invoked in-session.
    """
    def caller(tool_name: str, **kwargs) -> dict:
        full_name = _TOOL_MAP.get(tool_name)
        if not full_name:
            raise ValueError(f"Unknown Gmail tool: {tool_name!r}")
        return tool_runner(full_name, **kwargs)
    return caller


# ── CLI ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Email Agent")
    parser.add_argument(
        "--once",
        action="store_true",
        help="Run a single monitoring cycle then exit.",
    )
    parser.add_argument(
        "--mode",
        choices=["draft", "auto"],
        default=None,
        help="Override reply mode from config.",
    )
    parser.add_argument(
        "--interval",
        type=int,
        default=None,
        help="Override poll interval in seconds.",
    )
    args = parser.parse_args()

    # Validate environment
    if not os.environ.get("ANTHROPIC_API_KEY"):
        log.error("ANTHROPIC_API_KEY environment variable is not set.")
        sys.exit(1)

    from email_agent import CONFIG, EmailMonitor

    if args.mode:
        CONFIG.reply_mode = args.mode
    if args.interval:
        CONFIG.poll_interval_seconds = args.interval

    mcp_caller = _build_mcp_caller()
    monitor = EmailMonitor(CONFIG, mcp_caller)

    if args.once:
        summary = monitor.run_once()
        print(
            f"\nDone — checked={summary['checked']} "
            f"replied={summary['replied']} "
            f"skipped={summary['skipped']} "
            f"errors={summary['errors']}"
        )
    else:
        monitor.start()


if __name__ == "__main__":
    main()
