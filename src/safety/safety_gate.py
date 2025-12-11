# src/safety/safety_gate.py
import re
from typing import Dict, Any

# Configure patterns and thresholds
SUICIDAL_KEYWORDS = [
    "kill myself", "i want to die", "want to die", "i can't go on",
    "i don't want to live", "end my life", "suicide", "i'm going to kill myself",
]
# lowercase patterns for fast check
SK_PATTERNS = [p.lower() for p in SUICIDAL_KEYWORDS]

# If model predicts high probability for 'suicide'-related emotions (sadness, hopelessness),
# and there are keywords, escalate. We map likely emotion labels to risk weight.
RISK_LABEL_WEIGHTS = {
    "sadness": 1.0,
    "grief": 0.8,
    "remorse": 0.6,
    "disappointment": 0.4,
    "neutral": 0.0,
    # add others if useful
}

# thresholds (tune these)
KEYWORD_TRIGGER = True            # any suicide phrase -> escalate immediately
RISK_SCORE_THRESHOLD = 0.6        # if weighted risk score >= this -> escalate
TOP_EMOTION_THRESHOLD = 0.7       # if top emotion prob >= this and label in RISK_LABEL_WEIGHTS -> escalate

def _contains_suicidal_keyword(text: str):
    t = text.lower()
    for p in SK_PATTERNS:
        if p in t:
            return True, p
    return False, None

def _calculate_risk_from_model(model_out: Dict[str, Any]):
    """
    model_out expected to include:
      - 'probs': list of probabilities (in same order as LABEL_LIST used by model)
      - 'top_k': list of (label, prob) sorted descending
    We try to estimate a risk score from top_k or by label lookup.
    """
    risk = 0.0
    # use top_k if available
    top_k = model_out.get("top_k", [])
    if top_k:
        # look at the top few emotions and add weights
        for label, prob in top_k[:5]:
            w = RISK_LABEL_WEIGHTS.get(label, 0.0)
            risk += w * float(prob)
        # normalize by possible max (sum weights) - but keep as-is for thresholding
        return risk

    # fallback: try scan probs and label list (not strict here)
    return risk

def safety_check(text: str, model_out: Dict[str, Any]) -> Dict[str, Any]:
    """
    Returns:
      {
        "safe": bool,
        "severity": "normal" | "moderate" | "severe",
        "keywords": [matched_keyword_or_empty],
        "risk_score": float   # 0..1 estimate
      }
    """
    # 1) keyword detection
    has_kw, kw = _contains_suicidal_keyword(text)

    # 2) model risk estimate
    model_risk = float(_calculate_risk_from_model(model_out))

    # 3) top emotion quick check
    top_k = model_out.get("top_k", [])
    top_label, top_prob = (None, 0.0)
    if top_k:
        top_label, top_prob = top_k[0][0], float(top_k[0][1])

    # Decide escalation
    escalate = False
    severity = "normal"

    # Immediate escalate if a suicide keyword appears
    if KEYWORD_TRIGGER and has_kw:
        escalate = True
        severity = "severe"
    # If model_risk high
    elif model_risk >= RISK_SCORE_THRESHOLD:
        escalate = True
        severity = "severe"
    # If top emotion is one of risk labels and very confident
    elif top_label in RISK_LABEL_WEIGHTS and top_prob >= TOP_EMOTION_THRESHOLD:
        escalate = True
        severity = "moderate"

    # Compose result
    result = {
        "safe": not escalate,
        "severity": severity,
        "keywords": [kw] if kw else [],
        "risk_score": model_risk,
        "top_label": top_label,
        "top_prob": top_prob
    }
    return result
