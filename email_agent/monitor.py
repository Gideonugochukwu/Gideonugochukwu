"""
Continuous monitoring loop with structured logging and graceful shutdown.
"""

from __future__ import annotations

import logging
import signal
import time
from typing import Callable

from .agent import EmailAgent
from .config import AgentConfig

log = logging.getLogger(__name__)


class EmailMonitor:
    def __init__(self, config: AgentConfig, mcp_caller: Callable):
        self._config = config
        self._agent = EmailAgent(config, mcp_caller)
        self._running = False

    def start(self) -> None:
        """Block and run the monitoring loop until interrupted."""
        self._running = True
        signal.signal(signal.SIGINT, self._handle_shutdown)
        signal.signal(signal.SIGTERM, self._handle_shutdown)

        log.info(
            "Email monitor started | poll_interval=%ds",
            self._config.poll_interval_seconds,
        )

        cycle = 0
        while self._running:
            cycle += 1
            log.info("=== Cycle %d ===", cycle)
            try:
                summary = self._agent.run_once()
                log.info(
                    "Cycle %d complete | checked=%d replied=%d skipped=%d errors=%d",
                    cycle,
                    summary["checked"],
                    summary["replied"],
                    summary["skipped"],
                    summary["errors"],
                )
            except Exception as exc:
                log.exception("Unexpected error in cycle %d: %s", cycle, exc)

            if self._running:
                log.info(
                    "Sleeping %ds until next cycle…",
                    self._config.poll_interval_seconds,
                )
                time.sleep(self._config.poll_interval_seconds)

        log.info("Email monitor stopped.")

    def run_once(self) -> dict:
        """Run a single cycle — useful for testing or on-demand invocation."""
        return self._agent.run_once()

    def _handle_shutdown(self, signum, frame) -> None:
        log.info("Shutdown signal received — stopping after current cycle.")
        self._running = False
