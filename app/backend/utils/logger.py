import os
import logging
from logging.handlers import TimedRotatingFileHandler
from datetime import datetime
import hashlib
import json

# Ensure logs directory exists
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

# Main application log
APP_LOG_FILE = os.path.join(LOG_DIR, "app.log")

# Safety / escalation log
SAFETY_LOG_FILE = os.path.join(LOG_DIR, "safety.log")

# ------------------------------------------------------------------------------
# 🚀 Configure rotating logs for main app.log
# ------------------------------------------------------------------------------
app_logger = logging.getLogger("app_logger")
app_logger.setLevel(logging.INFO)

app_handler = TimedRotatingFileHandler(
    APP_LOG_FILE,
    when="midnight",  # Rotate daily
    interval=1,
    backupCount=7,     # Keep 7 days of logs
    encoding="utf-8"
)
app_handler.setFormatter(logging.Formatter("%(asctime)s - %(levelname)s - %(message)s"))
app_logger.addHandler(app_handler)

# ------------------------------------------------------------------------------
# 🚨 Configure rotating logs for safety.log
# ------------------------------------------------------------------------------
safety_logger = logging.getLogger("safety_logger")
safety_logger.setLevel(logging.INFO)

safety_handler = TimedRotatingFileHandler(
    SAFETY_LOG_FILE,
    when="midnight",
    interval=1,
    backupCount=14,     # Keep 14 days of safety logs
    encoding="utf-8"
)
safety_handler.setFormatter(logging.Formatter("%(asctime)s - %(message)s"))
safety_logger.addHandler(safety_handler)


# ------------------------------------------------------------------------------
# Utility: hash text for anonymized logging
# ------------------------------------------------------------------------------
def sha256_hex(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


# ------------------------------------------------------------------------------
# Append any safety event into the log file
# ------------------------------------------------------------------------------
def append_safety_event(event: dict):
    """
    Event example:
    {
        "type": "escalation",
        "request_id": "...",
        "text_hash": "...",
        "severity_score": 0.95,
        "raw_severity": "high",
        "keywords": ["self-harm", "harm"],
    }
    """
    try:
        safety_logger.info(json.dumps(event))
    except Exception as e:
        app_logger.error(f"Failed to log safety event: {e}")
