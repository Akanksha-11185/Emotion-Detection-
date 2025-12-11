"""
crisis_keywords.py
Safe keyword lists used to detect high‑risk messages.
These are ONLY for detection, never for giving instructions.
"""

CRISIS_KEYWORDS = [
    "help me",
    "i feel hopeless",
    "can't go on",
    "i'm overwhelmed",
    "i feel trapped",
    "nothing is okay",
    "i'm scared",
    "i need someone",
]

SEVERE_DISTRESS = [
    "empty inside",
    "no purpose",
    "hurting emotionally",
    "breakdown",
    "panic",
]

def detect_crisis_keywords(text: str) -> dict:
    text_l = text.lower()

    crisis_hits = [k for k in CRISIS_KEYWORDS if k in text_l]
    distress_hits = [k for k in SEVERE_DISTRESS if k in text_l]

    return {
        "crisis_match": len(crisis_hits) > 0,
        "distress_match": len(distress_hits) > 0,
        "keywords_found": crisis_hits + distress_hits
    }
