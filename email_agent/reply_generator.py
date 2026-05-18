"""
Uses the Claude API to classify emails and generate replies.
"""

from __future__ import annotations

import json
import logging
from dataclasses import dataclass
from typing import Optional

import anthropic

from .config import AgentConfig
from .gmail_client import EmailThread

log = logging.getLogger(__name__)

CLASSIFY_SYSTEM = """\
You are an email classification assistant. Given an email thread, classify it and decide whether it warrants a reply.

Respond ONLY with valid JSON in this exact shape:
{
  "category": "<one of: personal, work, newsletter, promotional, automated notification, spam, out-of-office, support-request, meeting-request, question, other>",
  "needs_reply": <true|false>,
  "reason": "<one sentence explanation>",
  "urgency": "<low|medium|high>"
}
"""

REPLY_SYSTEM_TEMPLATE = """\
You are acting as {name}, {role}. Your writing tone is {tone}.

Rules:
- Write a complete, ready-to-send email reply — no placeholders.
- Do NOT include a subject line.
- Do NOT include "Subject:" anywhere.
- Sign off with the provided signature.
- {extra_instructions}

Signature to use:
{signature}
"""


@dataclass
class Classification:
    category: str
    needs_reply: bool
    reason: str
    urgency: str


@dataclass
class GeneratedReply:
    body: str
    classification: Classification


class ReplyGenerator:
    def __init__(self, config: AgentConfig):
        self._config = config
        self._client = anthropic.Anthropic()  # uses ANTHROPIC_API_KEY env var

    # ------------------------------------------------------------------

    def classify(self, thread: EmailThread) -> Classification:
        conversation = thread.as_conversation_text()
        message = self._client.messages.create(
            model=self._config.model,
            max_tokens=256,
            system=CLASSIFY_SYSTEM,
            messages=[
                {
                    "role": "user",
                    "content": (
                        f"Classify this email thread:\n\n{conversation}"
                    ),
                }
            ],
        )
        raw = message.content[0].text.strip()
        try:
            data = json.loads(raw)
        except json.JSONDecodeError:
            # Fallback: treat as personal needing a reply
            log.warning("Classification JSON parse failed; raw=%r", raw)
            data = {"category": "other", "needs_reply": True,
                    "reason": "parse error", "urgency": "medium"}

        return Classification(
            category=data.get("category", "other"),
            needs_reply=data.get("needs_reply", True),
            reason=data.get("reason", ""),
            urgency=data.get("urgency", "medium"),
        )

    # ------------------------------------------------------------------

    def generate_reply(self, thread: EmailThread) -> str:
        persona = self._config.persona
        system_prompt = REPLY_SYSTEM_TEMPLATE.format(
            name=persona.name,
            role=persona.role,
            tone=persona.tone,
            extra_instructions=persona.extra_instructions,
            signature=persona.signature,
        )

        conversation = thread.as_conversation_text()
        message = self._client.messages.create(
            model=self._config.model,
            max_tokens=1024,
            system=system_prompt,
            messages=[
                {
                    "role": "user",
                    "content": (
                        "Here is the email thread. Write a reply to the latest message:\n\n"
                        f"{conversation}"
                    ),
                }
            ],
        )
        return message.content[0].text.strip()

    # ------------------------------------------------------------------

    def process_thread(self, thread: EmailThread) -> Optional[GeneratedReply]:
        """Classify then optionally generate a reply. Returns None if no reply needed."""
        log.info("Classifying thread '%s' (id=%s)", thread.subject, thread.thread_id)
        classification = self.classify(thread)
        log.info(
            "  → category=%s needs_reply=%s urgency=%s reason=%s",
            classification.category,
            classification.needs_reply,
            classification.urgency,
            classification.reason,
        )

        skip_cats = [c.lower() for c in self._config.skip_categories]
        if classification.category.lower() in skip_cats:
            log.info("  → Skipping (category in skip list)")
            return None

        if not classification.needs_reply:
            log.info("  → Skipping (classifier says no reply needed)")
            return None

        log.info("  → Generating reply…")
        body = self.generate_reply(thread)
        return GeneratedReply(body=body, classification=classification)
