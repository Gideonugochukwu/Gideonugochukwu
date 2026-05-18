"""
Core agent: ties together Gmail client + reply generator + label management.
"""

from __future__ import annotations

import logging
from typing import Callable

from .config import AgentConfig
from .gmail_client import GmailClient, EmailThread
from .notifier import Notifier, NotificationEvent
from .reply_generator import ReplyGenerator

log = logging.getLogger(__name__)


class EmailAgent:
    def __init__(self, config: AgentConfig, gmail_or_caller, notifier: Notifier = None):
        self._config = config
        if callable(gmail_or_caller) and not hasattr(gmail_or_caller, "search_threads"):
            self._gmail = GmailClient(gmail_or_caller)
        else:
            self._gmail = gmail_or_caller
        self._generator = ReplyGenerator(config)
        self._notifier = notifier or Notifier()

        # Resolve / create labels once at startup
        self._processed_label_id = self._gmail.get_or_create_label(
            config.processed_label_name,
            bg_color="#16a765",  # green
            text_color="#ffffff",
        )
        self._skipped_label_id = self._gmail.get_or_create_label(
            config.skipped_label_name,
            bg_color="#fb4c2f",  # red
            text_color="#ffffff",
        )
        log.info(
            "EmailAgent ready | mode=%s | processed_label=%s | skipped_label=%s",
            config.reply_mode,
            self._processed_label_id,
            self._skipped_label_id,
        )

    # ------------------------------------------------------------------

    def run_once(self) -> dict:
        """Execute one monitoring + reply cycle. Returns a summary dict."""
        summary = {"checked": 0, "replied": 0, "skipped": 0, "errors": 0}

        raw_threads = self._gmail.search_threads(
            self._config.inbox_query,
            max_results=self._config.max_per_cycle,
        )
        log.info("Found %d threads matching query", len(raw_threads))
        summary["checked"] = len(raw_threads)

        for raw in raw_threads:
            thread_id = raw.get("id") or raw.get("threadId", "")
            if not thread_id:
                continue
            try:
                self._process_thread(thread_id, summary)
            except Exception as exc:
                log.exception("Error processing thread %s: %s", thread_id, exc)
                summary["errors"] += 1

        return summary

    # ------------------------------------------------------------------

    def _process_thread(self, thread_id: str, summary: dict) -> None:
        thread = self._gmail.get_thread(thread_id)

        # Sender checks
        if not self._should_process(thread):
            log.info("Thread '%s' skipped by sender filter", thread.subject)
            self._gmail.label_thread(thread_id, [self._skipped_label_id])
            summary["skipped"] += 1
            return

        result = self._generator.process_thread(thread)

        if result is None:
            self._gmail.label_thread(thread_id, [self._skipped_label_id])
            summary["skipped"] += 1
            return

        # Build reply target
        latest = thread.latest_message
        reply_to = [latest.sender] if latest else []
        subject = thread.subject

        if self._config.reply_mode == "auto" and hasattr(self._gmail, "send_reply"):
            msg_id = self._gmail.send_reply(
                to=reply_to,
                subject=subject,
                body=result.body,
                thread_id=thread_id,
                reply_to_message_id=latest.message_id if latest else None,
            )
            log.info("Reply sent (id=%s) for thread '%s'", msg_id, subject)
            action = "sent"
        else:
            if self._config.reply_mode == "auto":
                log.warning("auto mode requires GmailAPIClient; falling back to draft")
            draft_id = self._gmail.create_draft_reply(
                to=reply_to,
                subject=subject,
                body=result.body,
                reply_to_message_id=latest.message_id if latest else None,
            )
            log.info("Draft %s created for thread '%s'", draft_id, subject)
            action = "drafted"

        self._notifier.notify(NotificationEvent(
            subject=subject,
            sender=latest.sender if latest else "",
            action=action,
            category=result.classification.category,
            urgency=result.classification.urgency,
            reply_preview=result.body[:120],
        ))

        self._gmail.label_thread(thread_id, [self._processed_label_id])
        summary["replied"] += 1

    # ------------------------------------------------------------------

    def _should_process(self, thread: EmailThread) -> bool:
        sender = thread.original_sender.lower()

        # Blocklist check
        for blocked in self._config.blocklist_senders:
            if blocked.lower() in sender:
                log.debug("Sender '%s' is blocklisted", sender)
                return False

        # Allowlist check (if configured)
        if self._config.allowlist_senders:
            allowed = any(
                a.lower() in sender for a in self._config.allowlist_senders
            )
            if not allowed:
                log.debug("Sender '%s' not in allowlist", sender)
                return False

        return True
