"""
Standalone runner — used by GitHub Actions (and cron/any server).
Reads Gmail credentials from files (written from GitHub secrets by the workflow).
No Claude Code session required.
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

sys.path.insert(0, os.path.dirname(__file__))

from email_agent import CONFIG, EmailAgent
from email_agent.gmail_api_client import GmailAPIClient


def main() -> None:
    parser = argparse.ArgumentParser(description="Standalone Email Agent")
    parser.add_argument("--loop", action="store_true",
                        help="Run continuously (for server deployments).")
    parser.add_argument("--interval", type=int, default=None,
                        help="Poll interval override in seconds.")
    parser.add_argument("--mode", choices=["draft", "auto"], default=None,
                        help="Reply mode override.")
    parser.add_argument("--credentials", default="credentials.json",
                        help="Path to Google OAuth credentials file.")
    parser.add_argument("--token", default="token.json",
                        help="Path to Gmail OAuth token file.")
    args = parser.parse_args()

    # Validate required env vars
    if not os.environ.get("ANTHROPIC_API_KEY"):
        log.error("ANTHROPIC_API_KEY is not set.")
        sys.exit(1)

    if not os.path.exists(args.credentials):
        log.error("Gmail credentials file not found: %s", args.credentials)
        log.error("Run setup_gmail_auth.py first to generate it.")
        sys.exit(1)

    if not os.path.exists(args.token):
        log.error("Gmail token file not found: %s", args.token)
        log.error("Run setup_gmail_auth.py first to generate it.")
        sys.exit(1)

    if args.mode:
        CONFIG.reply_mode = args.mode
    if args.interval:
        CONFIG.poll_interval_seconds = args.interval

    log.info("Initialising Gmail API client…")
    gmail_client = GmailAPIClient(
        credentials_file=args.credentials,
        token_file=args.token,
    )

    agent = EmailAgent(CONFIG, gmail_client)

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
