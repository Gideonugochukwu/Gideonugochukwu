"""Email Agent — monitors inbox and drafts/sends replies via Claude."""

from .config import AgentConfig, AgentPersona, CONFIG
from .agent import EmailAgent
from .monitor import EmailMonitor

__all__ = ["AgentConfig", "AgentPersona", "CONFIG", "EmailAgent", "EmailMonitor"]
