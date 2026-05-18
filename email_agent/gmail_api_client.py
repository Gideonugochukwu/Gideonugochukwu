"""
Standalone Gmail client using the Gmail REST API directly.
Used when running outside a Claude Code session (e.g. GitHub Actions, cron).
Implements the same interface as GmailClient so EmailAgent works unchanged.
"""

from __future__ import annotations

import base64
import logging
import os
from email.mime.text import MIMEText
from typing import Optional

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

from .gmail_client import EmailMessage, EmailThread

log = logging.getLogger(__name__)

SCOPES = [
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/gmail.readonly",
]


class GmailAPIClient:
    """
    Drop-in replacement for GmailClient that uses the Gmail REST API.
    Also adds send_reply() for true auto-send mode.
    """

    def __init__(
        self,
        credentials_file: str = "credentials.json",
        token_file: str = "token.json",
    ):
        self._token_file = token_file
        self._service = self._authenticate(credentials_file, token_file)

    # ------------------------------------------------------------------
    # Auth
    # ------------------------------------------------------------------

    def _authenticate(self, credentials_file: str, token_file: str):
        creds = None

        if os.path.exists(token_file):
            creds = Credentials.from_authorized_user_file(token_file, SCOPES)

        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                log.info("Refreshing expired Gmail token…")
                creds.refresh(Request())
                self._save_token(creds, token_file)
            else:
                # Only reached during first-time local setup
                flow = InstalledAppFlow.from_client_secrets_file(
                    credentials_file, SCOPES
                )
                creds = flow.run_local_server(port=0)
                self._save_token(creds, token_file)

        return build("gmail", "v1", credentials=creds, cache_discovery=False)

    @staticmethod
    def _save_token(creds: Credentials, token_file: str) -> None:
        with open(token_file, "w") as f:
            f.write(creds.to_json())
        log.info("Token saved to %s", token_file)

    # ------------------------------------------------------------------
    # Label management
    # ------------------------------------------------------------------

    def list_labels(self) -> dict[str, str]:
        result = self._service.users().labels().list(userId="me").execute()
        return {lbl["name"]: lbl["id"] for lbl in result.get("labels", [])}

    def get_or_create_label(
        self,
        name: str,
        bg_color: str = "#4a86e8",
        text_color: str = "#ffffff",
    ) -> str:
        labels = self.list_labels()
        if name in labels:
            return labels[name]

        body = {
            "name": name,
            "color": {"backgroundColor": bg_color, "textColor": text_color},
        }
        result = (
            self._service.users().labels().create(userId="me", body=body).execute()
        )
        label_id = result["id"]
        log.info("Created Gmail label '%s' (id=%s)", name, label_id)
        return label_id

    def label_thread(self, thread_id: str, label_ids: list[str]) -> None:
        self._service.users().threads().modify(
            userId="me",
            id=thread_id,
            body={"addLabelIds": label_ids},
        ).execute()

    # ------------------------------------------------------------------
    # Thread / message retrieval
    # ------------------------------------------------------------------

    def search_threads(self, query: str, max_results: int = 20) -> list[dict]:
        result = (
            self._service.users()
            .threads()
            .list(userId="me", q=query, maxResults=min(max_results, 50))
            .execute()
        )
        return result.get("threads", [])

    def get_thread(self, thread_id: str) -> EmailThread:
        result = (
            self._service.users()
            .threads()
            .get(userId="me", id=thread_id, format="full")
            .execute()
        )
        messages = [self._parse_message(m) for m in result.get("messages", [])]
        subject = messages[0].subject if messages else "(no subject)"
        return EmailThread(thread_id=thread_id, subject=subject, messages=messages)

    def _parse_message(self, raw: dict) -> EmailMessage:
        payload = raw.get("payload", {})
        headers = {
            h["name"].lower(): h["value"]
            for h in payload.get("headers", [])
        }
        body = self._extract_plain_text(payload) or raw.get("snippet", "")
        return EmailMessage(
            message_id=raw.get("id", ""),
            thread_id=raw.get("threadId", ""),
            subject=headers.get("subject", "(no subject)"),
            sender=headers.get("from", ""),
            recipients=self._split_addresses(headers.get("to", "")),
            snippet=raw.get("snippet", ""),
            body=body,
            date=headers.get("date", ""),
            labels=raw.get("labelIds", []),
        )

    def _extract_plain_text(self, payload: dict) -> str:
        """Recursively walk MIME parts to find the text/plain body."""
        if payload.get("mimeType") == "text/plain":
            data = payload.get("body", {}).get("data", "")
            if data:
                return base64.urlsafe_b64decode(data).decode("utf-8", errors="replace")

        for part in payload.get("parts", []):
            result = self._extract_plain_text(part)
            if result:
                return result

        # Last resort: decode whatever body data is present
        data = payload.get("body", {}).get("data", "")
        if data:
            return base64.urlsafe_b64decode(data).decode("utf-8", errors="replace")

        return ""

    @staticmethod
    def _split_addresses(addr_str: str) -> list[str]:
        return [a.strip() for a in addr_str.split(",") if a.strip()]

    # ------------------------------------------------------------------
    # Sending / drafting
    # ------------------------------------------------------------------

    def create_draft_reply(
        self,
        to: list[str],
        subject: str,
        body: str,
        reply_to_message_id: Optional[str] = None,
        cc: Optional[list[str]] = None,
    ) -> str:
        raw_msg = self._build_raw_message(
            to, subject, body, cc, reply_to_message_id, thread_id=None
        )
        result = (
            self._service.users()
            .drafts()
            .create(userId="me", body={"message": raw_msg})
            .execute()
        )
        draft_id = result.get("id", "")
        log.info("Draft created (id=%s) to=%s", draft_id, to)
        return draft_id

    def send_reply(
        self,
        to: list[str],
        subject: str,
        body: str,
        thread_id: str,
        reply_to_message_id: Optional[str] = None,
        cc: Optional[list[str]] = None,
    ) -> str:
        raw_msg = self._build_raw_message(
            to, subject, body, cc, reply_to_message_id, thread_id
        )
        result = (
            self._service.users()
            .messages()
            .send(userId="me", body=raw_msg)
            .execute()
        )
        msg_id = result.get("id", "")
        log.info("Email sent (id=%s) to=%s", msg_id, to)
        return msg_id

    def _build_raw_message(
        self,
        to: list[str],
        subject: str,
        body: str,
        cc: Optional[list[str]],
        reply_to_message_id: Optional[str],
        thread_id: Optional[str],
    ) -> dict:
        msg = MIMEText(body, "plain", "utf-8")
        msg["To"] = ", ".join(to)
        msg["Subject"] = subject if subject.startswith("Re:") else f"Re: {subject}"
        if cc:
            msg["Cc"] = ", ".join(cc)
        if reply_to_message_id:
            msg["In-Reply-To"] = reply_to_message_id
            msg["References"] = reply_to_message_id

        raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
        result: dict = {"raw": raw}
        if thread_id:
            result["threadId"] = thread_id
        return result
