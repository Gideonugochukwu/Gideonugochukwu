"""
Thin wrapper around the Gmail MCP tools so the rest of the agent
never has to call raw tool names directly.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass
from typing import Optional

log = logging.getLogger(__name__)


@dataclass
class EmailMessage:
    message_id: str
    thread_id: str
    subject: str
    sender: str
    recipients: list[str]
    snippet: str
    body: str
    date: str
    labels: list[str]
    attachments: list[str] = None   # list of attachment filenames/types

    def __post_init__(self):
        if self.attachments is None:
            self.attachments = []


@dataclass
class EmailThread:
    thread_id: str
    subject: str
    messages: list[EmailMessage]

    @property
    def latest_message(self) -> Optional[EmailMessage]:
        return self.messages[-1] if self.messages else None

    @property
    def original_sender(self) -> str:
        return self.messages[0].sender if self.messages else ""

    def as_conversation_text(self) -> str:
        parts = []
        for i, msg in enumerate(self.messages):
            attachment_note = ""
            if msg.attachments:
                attachment_note = f"\n[Attachments: {', '.join(msg.attachments)}]"
            parts.append(
                f"--- Message {i + 1} ---\n"
                f"From: {msg.sender}\n"
                f"To: {', '.join(msg.recipients)}\n"
                f"Date: {msg.date}\n"
                f"Subject: {msg.subject}{attachment_note}\n\n"
                f"{msg.body.strip()}"
            )
        return "\n\n".join(parts)


class GmailClient:
    """Wraps Gmail MCP tool calls with a friendlier Python interface."""

    def __init__(self, mcp_caller):
        # mcp_caller is a callable(tool_name, **kwargs) -> dict
        self._call = mcp_caller

    # ------------------------------------------------------------------
    # Label management
    # ------------------------------------------------------------------

    def list_labels(self) -> dict[str, str]:
        """Returns {display_name: label_id}."""
        result = self._call("list_labels")
        labels = {}
        for lbl in result.get("labels", []):
            labels[lbl.get("name", "")] = lbl.get("id", "")
        return labels

    def get_or_create_label(self, name: str, bg_color: str = "#4a86e8",
                             text_color: str = "#ffffff") -> str:
        """Returns the label ID, creating the label if it doesn't exist."""
        labels = self.list_labels()
        if name in labels:
            return labels[name]
        result = self._call(
            "create_label",
            displayName=name,
            color={"backgroundColor": bg_color, "textColor": text_color},
        )
        label_id = result.get("id", "")
        log.info("Created Gmail label '%s' (id=%s)", name, label_id)
        return label_id

    def label_thread(self, thread_id: str, label_ids: list[str]) -> None:
        self._call("label_thread", threadId=thread_id, labelIds=label_ids)

    # ------------------------------------------------------------------
    # Thread / message retrieval
    # ------------------------------------------------------------------

    def search_threads(self, query: str, max_results: int = 20) -> list[dict]:
        result = self._call("search_threads", query=query, pageSize=min(max_results, 50))
        return result.get("threads", [])

    def get_thread(self, thread_id: str) -> EmailThread:
        result = self._call("get_thread", threadId=thread_id, messageFormat="FULL_CONTENT")
        raw_messages = result.get("messages", [])
        messages = [self._parse_message(m) for m in raw_messages]
        subject = messages[0].subject if messages else "(no subject)"
        return EmailThread(thread_id=thread_id, subject=subject, messages=messages)

    def _parse_message(self, raw: dict) -> EmailMessage:
        headers = {h["name"].lower(): h["value"] for h in raw.get("headers", [])}
        # MCP tool returns attachment_ids list; use it to flag attachments
        attachment_ids = raw.get("attachmentIds") or raw.get("attachment_ids") or []
        attachments = [a.get("filename") or a.get("mimeType") or "attachment"
                       for a in attachment_ids] if isinstance(attachment_ids, list) and \
                      attachment_ids and isinstance(attachment_ids[0], dict) \
                      else [str(a) for a in attachment_ids if a]
        return EmailMessage(
            message_id=raw.get("id", ""),
            thread_id=raw.get("threadId", ""),
            subject=headers.get("subject", "(no subject)"),
            sender=headers.get("from", ""),
            recipients=self._split_addresses(headers.get("to", "")),
            snippet=raw.get("snippet", ""),
            body=raw.get("plaintextBody") or raw.get("body", raw.get("snippet", "")),
            date=headers.get("date", ""),
            labels=raw.get("labelIds", []),
            attachments=attachments,
        )

    @staticmethod
    def _split_addresses(addr_str: str) -> list[str]:
        return [a.strip() for a in addr_str.split(",") if a.strip()]

    # ------------------------------------------------------------------
    # Draft creation
    # ------------------------------------------------------------------

    def create_draft_reply(
        self,
        to: list[str],
        subject: str,
        body: str,
        reply_to_message_id: Optional[str] = None,
        cc: Optional[list[str]] = None,
    ) -> str:
        """Creates a Gmail draft. Returns the draft ID."""
        kwargs: dict = {
            "to": to,
            "subject": subject if subject.startswith("Re:") else f"Re: {subject}",
            "body": body,
        }
        if reply_to_message_id:
            kwargs["replyToMessageId"] = reply_to_message_id
        if cc:
            kwargs["cc"] = cc

        result = self._call("create_draft", **kwargs)
        draft_id = result.get("id", "")
        log.info("Draft created (id=%s) to=%s", draft_id, to)
        return draft_id
