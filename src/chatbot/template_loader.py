# src/chatbot/template_loader.py
import random

_TEMPLATES = {
    "supportive_responses": {
        "severe": "I'm really sorry you're feeling this way. You're not alone. Please consider reaching out to a trusted person or professional.",
        "moderate": "It sounds like things are a bit heavy right now. I'm here with you."
    },
    "neutral": [
        "I'm here to listen.",
        "Tell me more about how you're feeling."
    ]
}

def load_template(name: str):
    """
    Returns either a dict (supportive responses)
    or a list of responses.
    """
    return _TEMPLATES.get(name, _TEMPLATES["neutral"])
