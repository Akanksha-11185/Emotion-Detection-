# src/chatbot/response_generator.py
from .template_loader import load_template
import random

def generate_response(emotions, severity):
    """
    emotions = list of (label, score)
    severity = "normal" | "moderate" | "severe"
    """

    # 🚨 Escalation responses
    if severity in ("severe", "moderate"):
        supportive = load_template("supportive_responses")
        return supportive.get(severity, supportive["moderate"])

    # 💬 Normal reply
    primary = emotions[0][0] if emotions else "neutral"
    responses = load_template(primary)

    if isinstance(responses, list):
        return random.choice(responses)

    return "I'm here with you."
