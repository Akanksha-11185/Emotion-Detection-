"""
safety_gate.py
Final safety layer before chatbot response.
"""

from .crisis_keywords import detect_crisis_keywords
from .escalation_rules import determine_severity


def safety_check(text, model_prediction=None):
    """
    Returns a dict with:
    {
        "severity": "normal" | "moderate" | "severe",
        "safe": bool,
        "reason": str,
        "keywords": list
    }
    """

    crisis_info = detect_crisis_keywords(text)
    keywords = crisis_info.get("keywords_found", [])

    # 🚨 HARD RULE: crisis keywords ALWAYS escalate
    # Check both crisis_match and if any keywords were found
    if crisis_info.get("crisis_match") or keywords:
        return {
            "severity": "severe",
            "safe": False,
            "reason": "Crisis keywords detected.",
            "keywords": keywords,
        }

    # 🧪 If model output missing (unit tests)
    if model_prediction is None:
        # Check if moderate distress was detected
        if crisis_info.get("distress_match"):
            return {
                "severity": "moderate",
                "safe": True,
                "reason": "Moderate distress detected.",
                "keywords": keywords,
            }
        
        return {
            "severity": "normal",
            "safe": True,
            "reason": "No crisis indicators detected.",
            "keywords": [],
        }

    # 🤖 Model-based severity
    severity = determine_severity(
        emotion_outputs=[e for e, s in model_prediction.get("top_k", []) if s > 0.4],
        crisis_info=crisis_info,
    )

    if severity == "severe":
        return {
            "severity": "severe",
            "safe": False,
            "reason": "High emotional distress detected.",
            "keywords": keywords,
        }

    return {
        "severity": severity,
        "safe": True,
        "reason": "No crisis indicators detected.",
        "keywords": [],
    }