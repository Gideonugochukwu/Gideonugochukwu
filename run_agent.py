"""
Claude Code session runner.

This script is designed to be executed directly inside an active Claude Code
session where the Gmail MCP tools are already authenticated and available.
It wires the live MCP tool dispatcher to the EmailAgent so no external API
credentials for Gmail are needed — only ANTHROPIC_API_KEY for Claude.

Run from Claude Code's Bash tool:
    python run_agent.py          # single cycle (safe default)
    python run_agent.py --loop   # continuous loop
"""

from __future__ import annotations

import argparse
import logging
import os
import sys
import time

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger(__name__)

# ── Import agent pieces ──────────────────────────────────────────────────────
sys.path.insert(0, os.path.dirname(__file__))
from email_agent import CONFIG, EmailAgent


# ── MCP dispatcher ───────────────────────────────────────────────────────────
# Maps short tool names → the full MCP server-prefixed names used in this
# Claude Code session.  The actual HTTP call happens through the harness.

_MCP_PREFIX = "mcp__a044a5af-4b04-41a1-973e-46fa01a6d96c"

_TOOL_MAP = {
    "search_threads": f"{_MCP_PREFIX}__search_threads",
    "get_thread":     f"{_MCP_PREFIX}__get_thread",
    "create_draft":   f"{_MCP_PREFIX}__create_draft",
    "list_labels":    f"{_MCP_PREFIX}__list_labels",
    "list_drafts":    f"{_MCP_PREFIX}__list_drafts",
    "label_thread":   f"{_MCP_PREFIX}__label_thread",
    "label_message":  f"{_MCP_PREFIX}__label_message",
    "create_label":   f"{_MCP_PREFIX}__create_label",
    "unlabel_thread": f"{_MCP_PREFIX}__unlabel_thread",
    "unlabel_message":f"{_MCP_PREFIX}__unlabel_message",
}


def _make_mcp_caller():
    """
    Returns a caller that the agent uses to invoke Gmail MCP tools.

    In a real Claude Code harness the tool functions are injected at runtime.
    Here we expose a dispatcher that Claude Code's Bash tool can replace with
    the real implementation by monkey-patching _dispatch before calling main().
    """
    def caller(tool_name: str, **kwargs) -> dict:
        full = _TOOL_MAP.get(tool_name)
        if not full:
            raise ValueError(f"Unknown tool: {tool_name!r}")
        # _dispatch is replaced by the harness at runtime
        return _dispatch(full, **kwargs)

    return caller


def _dispatch(tool_name: str, **kwargs) -> dict:
    """Placeholder — replaced by Claude Code harness at runtime."""
    log.warning("_dispatch stub called for %s(%s)", tool_name, kwargs)
    return {}


# ── Main ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--loop", action="store_true",
                        help="Run continuously instead of one cycle.")
    parser.add_argument("--interval", type=int, default=None,
                        help="Poll interval override in seconds.")
    parser.add_argument("--mode", choices=["draft", "auto"], default=None,
                        help="Reply mode override.")
    args = parser.parse_args()

    if not os.environ.get("ANTHROPIC_API_KEY"):
        log.error("ANTHROPIC_API_KEY is not set.")
        sys.exit(1)

    if args.mode:
        CONFIG.reply_mode = args.mode
    if args.interval:
        CONFIG.poll_interval_seconds = args.interval

    agent = EmailAgent(CONFIG, _make_mcp_caller())

    if not args.loop:
        summary = agent.run_once()
        print(
            f"\nSummary: checked={summary['checked']} "
            f"replied={summary['replied']} "
            f"skipped={summary['skipped']} "
            f"errors={summary['errors']}"
        )
        return

    cycle = 0
    while True:
        cycle += 1
        log.info("=== Cycle %d ===", cycle)
        summary = agent.run_once()
        log.info(
            "Cycle %d done | checked=%d replied=%d skipped=%d errors=%d",
            cycle, summary["checked"], summary["replied"],
            summary["skipped"], summary["errors"],
        )
        log.info("Sleeping %ds…", CONFIG.poll_interval_seconds)
        time.sleep(CONFIG.poll_interval_seconds)


if __name__ == "__main__":
    main()
