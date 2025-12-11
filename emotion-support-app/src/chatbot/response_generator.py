"""
response_generator.py
Generates supportive, non-clinical responses.
No therapy or medical instructions. Only emotional support.
"""

import json
import os

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), "templates")

def load_template(name):
    path = os.path.join(TEMPLATE_DIR, f"{name}.json")
    if not os.path.exists(path):
        return []
    return json.load(open(path, "r"))

def generate_response(emotions, severity):
    """
    emotions = list of (label, score)
    severity = "normal" | "moderate" | "severe"
    """

    # Choose top emotion
    primary = emotions[0][0] if emotions else "neutral"

    # Load corresponding file
    responses = load_template(primary)

    # Safety escalation
    if severity == "severe":
        supportive = load_template("supportive_responses")
        return supportive["severe"]

    if severity == "moderate":
        supportive = load_template("supportive_responses")
        return supportive["moderate"]

    # Normal emotion-based reply
    if responses:
        return responses[0]

    return "I'm here with you. Tell me more about what's on your mind."
