"""
escalation_rules.py
Maps severity levels to safe actions:
- supportive message
- encourage reaching out to trusted people
- OR escalate for human review
"""

def determine_severity(emotion_outputs, crisis_info):
    """
    emotion_outputs: model results
    crisis_info: crisis keyword matches
    """

    # crisis keywords → highest priority
    if crisis_info["crisis_match"]:
        return "severe"

    # multiple negative emotions at high probability
    negative_emotions = ["sadness", "fear", "grief", "remorse"]
    neg_count = sum(e in emotion_outputs for e in negative_emotions)

    if neg_count >= 2:
        return "moderate"

    return "normal"
