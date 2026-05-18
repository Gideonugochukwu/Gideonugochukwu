"""
Agent configuration — edit this file to define how the agent behaves.
"""

from dataclasses import dataclass, field
from typing import Optional


@dataclass
class AgentPersona:
    name: str = "Gideon"
    role: str = "Professional assistant"
    tone: str = "professional yet friendly"
    signature: str = "Best regards,\nGideon"
    extra_instructions: str = (
        "Keep replies concise and to the point. "
        "If an email requires information you don't have, politely acknowledge receipt "
        "and say you'll follow up shortly. "
        "Never fabricate facts, prices, dates, or commitments."
    )


@dataclass
class AgentConfig:
    # Identity
    persona: AgentPersona = field(default_factory=AgentPersona)

    # Behaviour
    # 'draft'  → save reply as Gmail draft (safe default)
    # 'auto'   → send reply immediately (use with caution)
    reply_mode: str = "draft"

    # How often to check for new mail (seconds)
    poll_interval_seconds: int = 120

    # Gmail query used to find emails that need a reply.
    # Default: unread inbox messages NOT sent by yourself.
    inbox_query: str = "is:unread in:inbox -from:me"

    # Maximum emails to process per poll cycle
    max_per_cycle: int = 10

    # Label applied to threads after the agent processes them
    processed_label_name: str = "AI-Processed"

    # Label applied when agent decides NOT to reply (newsletters, promos, etc.)
    skipped_label_name: str = "AI-Skipped"

    # Claude model used for reply generation
    model: str = "claude-opus-4-7"

    # Skip these categories automatically (no reply generated)
    skip_categories: list = field(default_factory=lambda: [
        "newsletter",
        "promotional",
        "automated notification",
        "spam",
        "out-of-office",
    ])

    # Optional: only reply to senders in this list. Empty = reply to anyone.
    allowlist_senders: list = field(default_factory=list)

    # Optional: never reply to these senders.
    blocklist_senders: list = field(default_factory=lambda: [
        "noreply@",
        "no-reply@",
        "donotreply@",
        "mailer-daemon@",
        "postmaster@",
    ])


# Singleton config used throughout the app
CONFIG = AgentConfig()
