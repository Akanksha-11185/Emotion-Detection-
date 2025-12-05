"""
safety_gate.py
Final layer before chatbot response.
Ensures NON-HARMFUL, safe handling of distressing messages.
"""

from .crisis_keywords import detect_crisis_keywords
from .escalation_rules import determine_severity

def safety_check(text, model_prediction):
    """
    Returns:
        {
          "severity": "normal/moderate/severe",
          "safe": bool,
          "reason": explanation,
          "keywords": [...]
        }
    """

    crisis_info = detect_crisis_keywords(text)

    severity = determine_severity(
        emotion_outputs=[e for e,score in model_prediction["top_k"] if score > 0.4],
        crisis_info=crisis_info
    )

    # Severe → YES safe, but escalate to supportive flow
    if severity == "severe":
        return {
            "severity": "severe",
            "safe": False,
            "reason": "High emotional distress detected.",
            "keywords": crisis_info["keywords_found"]
        }

    return {
        "severity": severity,
        "safe": True,
        "reason": "No crisis indicators detected.",
        "keywords": crisis_info["keywords_found"]
    }
