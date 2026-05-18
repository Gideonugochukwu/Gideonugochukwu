"""
Notification module — sends alerts when the agent replies or drafts.
Supports two channels (configure via env vars or config):
  - Email summary  : uses the existing Gmail API client
  - WhatsApp       : uses Callmebot (free, no credit card required)

WhatsApp setup (one-time, 2 minutes):
  1. Add +34 644 65 76 82 to your WhatsApp contacts (name it Callmebot)
  2. Send it the message: "I allow callmebot to send me messages"
  3. You'll receive your API key by WhatsApp
  4. Add CALLMEBOT_PHONE and CALLMEBOT_APIKEY as GitHub secrets
"""

from __future__ import annotations

import logging
import urllib.parse
import urllib.request
from dataclasses import dataclass, field

log = logging.getLogger(__name__)


@dataclass
class NotificationEvent:
    subject: str
    sender: str
    action: str          # "sent" or "drafted"
    category: str
    urgency: str
    reply_preview: str   # first 120 chars of the reply body


class Notifier:
    def __init__(
        self,
        gmail_client=None,
        notify_email: str = "",
        whatsapp_phone: str = "",
        whatsapp_apikey: str = "",
    ):
        self._gmail = gmail_client
        self._notify_email = notify_email
        self._whatsapp_phone = whatsapp_phone.replace("+", "").replace(" ", "")
        self._whatsapp_apikey = whatsapp_apikey
        self._enabled = bool(notify_email or (whatsapp_phone and whatsapp_apikey))

    @property
    def enabled(self) -> bool:
        return self._enabled

    # ------------------------------------------------------------------

    def notify(self, event: NotificationEvent) -> None:
        if not self._enabled:
            return
        message = self._format_message(event)
        if self._notify_email and self._gmail:
            self._send_email(event, message)
        if self._whatsapp_phone and self._whatsapp_apikey:
            self._send_whatsapp(message)

    def send_cycle_summary(self, summary: dict) -> None:
        """Send a single summary at the end of a cycle if anything happened."""
        if not self._enabled:
            return
        replied = summary.get("replied", 0)
        skipped = summary.get("skipped", 0)
        errors = summary.get("errors", 0)
        if replied == 0 and errors == 0:
            return  # nothing interesting happened
        message = (
            f"Email Agent Cycle Summary\n"
            f"Replied: {replied} | Skipped: {skipped} | Errors: {errors}"
        )
        if self._notify_email and self._gmail:
            self._send_email_raw(
                subject="Email Agent — Cycle Summary",
                body=message,
            )
        if self._whatsapp_phone and self._whatsapp_apikey:
            self._send_whatsapp(message)

    # ------------------------------------------------------------------

    def _format_message(self, event: NotificationEvent) -> str:
        action_label = "AUTO-SENT" if event.action == "sent" else "DRAFTED"
        preview = event.reply_preview[:120].replace("\n", " ")
        return (
            f"[Email Agent] Reply {action_label}\n"
            f"From: {event.sender}\n"
            f"Subject: {event.subject}\n"
            f"Category: {event.category} | Urgency: {event.urgency}\n"
            f"Preview: {preview}..."
        )

    def _send_email(self, event: NotificationEvent, body: str) -> None:
        subject = f"[Email Agent] Reply {event.action.upper()}: {event.subject}"
        self._send_email_raw(subject=subject, body=body)

    def _send_email_raw(self, subject: str, body: str) -> None:
        try:
            self._gmail.send_reply(
                to=[self._notify_email],
                subject=subject,
                body=body,
                thread_id="",
            )
            log.info("Email notification sent to %s", self._notify_email)
        except Exception as exc:
            log.warning("Failed to send email notification: %s", exc)

    def _send_whatsapp(self, message: str) -> None:
        try:
            encoded = urllib.parse.quote(message)
            url = (
                f"https://api.callmebot.com/whatsapp.php"
                f"?phone={self._whatsapp_phone}"
                f"&text={encoded}"
                f"&apikey={self._whatsapp_apikey}"
            )
            with urllib.request.urlopen(url, timeout=10) as resp:
                status = resp.status
            if status == 200:
                log.info("WhatsApp notification sent to %s", self._whatsapp_phone)
            else:
                log.warning("WhatsApp notification returned status %s", status)
        except Exception as exc:
            log.warning("Failed to send WhatsApp notification: %s", exc)
