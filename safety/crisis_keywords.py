"""
crisis_keywords.py
Safe keyword lists used to detect high‑risk messages.
These are ONLY for detection, never for giving instructions.
"""

# 🚨 CRITICAL KEYWORDS - Immediate escalation required
CRITICAL_KEYWORDS = [
    "kill myself",
    "end my life",
    "want to die",
    "suicide",
    "suicidal",
    "self harm",
    "cut myself",
    "hurt myself",
    "no reason to live",
    "better off dead",
    "end it all",
    "take my life",
]

# ⚠️ HIGH-RISK KEYWORDS - Severe distress
CRISIS_KEYWORDS = [
    "help me",
    "i feel hopeless",
    "can't go on",
    "i'm overwhelmed",
    "i feel trapped",
    "nothing is okay",
    "i'm scared",
    "i need someone",
    "no hope",
    "give up",
    "can't take it",
]

# 😰 MODERATE DISTRESS KEYWORDS
SEVERE_DISTRESS = [
    "empty inside",
    "no purpose",
    "hurting emotionally",
    "breakdown",
    "panic",
    "worthless",
    "alone",
    "nobody cares",
]

def detect_crisis_keywords(text: str) -> dict:
    """
    Detects crisis-level keywords in user text.
    
    Returns:
        dict with:
        - crisis_match: bool (critical keywords found)
        - distress_match: bool (high-risk keywords found)
        - keywords_found: list of matched keywords
        - severity: "severe" | "moderate" | "normal"
    """
    text_l = text.lower()

    # Check for CRITICAL keywords first (highest priority)
    critical_hits = [k for k in CRITICAL_KEYWORDS if k in text_l]
    
    # Check for high-risk crisis keywords
    crisis_hits = [k for k in CRISIS_KEYWORDS if k in text_l]
    
    # Check for moderate distress keywords
    distress_hits = [k for k in SEVERE_DISTRESS if k in text_l]

    all_keywords = critical_hits + crisis_hits + distress_hits
    
    # Determine severity based on what was found
    if critical_hits:
        severity = "severe"
    elif crisis_hits:
        severity = "severe"  # Crisis keywords also trigger severe
    elif distress_hits:
        severity = "moderate"
    else:
        severity = "normal"

    return {
        "crisis_match": len(critical_hits) > 0 or len(crisis_hits) > 0,
        "distress_match": len(distress_hits) > 0,
        "keywords_found": all_keywords,
        "severity": severity,
    }


# Test function to verify keyword detection
if __name__ == "__main__":
    test_cases = [
        "I want to kill myself",
        "I feel hopeless and can't go on",
        "I'm feeling empty inside",
        "Just having a bad day",
    ]
    
    print("Testing crisis keyword detection:\n")
    for test_text in test_cases:
        result = detect_crisis_keywords(test_text)
        print(f"Text: '{test_text}'")
        print(f"  Crisis: {result['crisis_match']}")
        print(f"  Severity: {result['severity']}")
        print(f"  Keywords: {result['keywords_found']}\n")