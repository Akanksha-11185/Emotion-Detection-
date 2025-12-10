# src/safety/safety_gate.py

import re

# Keywords grouped by severity
CRITICAL_KEYWORDS = [
    r"\bsuicide\b", r"\bkill myself\b", r"\bi want to die\b",
    r"\bend my life\b", r"\bself harm\b", r"\bhurt myself\b",
    r"\bno reason to live\b", r"\bi can’t live\b"
]

SENSITIVE_KEYWORDS = [
    r"\bdepressed\b", r"\bi hate myself\b", r"\bi feel worthless\b",
    r"\bi feel hopeless\b", r"\bcut\b", r"\balone\b"
]


def assess_risk(text: str) -> str:
    """
    Check message for crisis keywords.
    Returns: "critical", "sensitive", or "normal"
    """
    lowered = text.lower()

    for pattern in CRITICAL_KEYWORDS:
        if re.search(pattern, lowered):
            return "critical"

    for pattern in SENSITIVE_KEYWORDS:
        if re.search(pattern, lowered):
            return "sensitive"

    return "normal"
