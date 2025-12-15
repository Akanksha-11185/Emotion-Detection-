def generate_response(
    user_text: str,
    emotions: list,
    scores: dict,
    risk_level: str = "low",
):
    """
    Generate an empathetic chatbot response based on detected emotions
    and safety risk level.
    """

    # -----------------------------
    # 1. SAFETY OVERRIDE (CRITICAL)
    # -----------------------------
    if risk_level in {"high", "critical"}:
        return (
            "I'm really sorry you're feeling this way. "
            "You deserve care and support. Please consider reaching out to a "
            "trusted person or a mental health professional right now."
        )

    # --------------------------------
    # 2. FALLBACK (NO EMOTION DETECTED)
    # --------------------------------
    if not emotions:
        return (
            "I'm here with you. "
            "It sounds like something has been weighing on you. "
            "Do you want to talk a little more about what's going on?"
        )

    # -----------------------------
    # 3. PICK TOP EMOTION
    # -----------------------------
    # emotions is expected to be a list like:
    # ["sadness", "loneliness", ...]
    top_emotion = emotions[0]

    # -----------------------------
    # 4. RESPONSE MAP
    # -----------------------------
    RESPONSE_MAP = {
        "sadness": (
            "I'm really sorry you're feeling this way. "
            "That sounds heavy, and you're not alone in this. "
            "Would you like to share a bit more?"
        ),
        "loneliness": (
            "Feeling lonely can be incredibly hard. "
            "I'm here with you, and I'm glad you reached out."
        ),
        "fear": (
            "That sounds really overwhelming. "
            "It's okay to feel scared sometimes. "
            "Take a slow breath — I'm here with you."
        ),
        "anger": (
            "I can sense a lot of frustration. "
            "Your feelings are valid. "
            "Do you want to talk about what triggered this?"
        ),
        "disgust": (
            "That sounds very uncomfortable. "
            "I'm here to listen if you want to talk more about it."
        ),
        "joy": (
            "I'm glad you're feeling some positivity. "
            "Want to share what's been going well?"
        ),
        "surprise": (
            "That sounds unexpected. "
            "How did it make you feel?"
        ),
        "neutral": (
            "I'm here and listening. "
            "Tell me a bit more about what's on your mind."
        ),
    }

    # -----------------------------
    # 5. RETURN RESPONSE
    # -----------------------------
    return RESPONSE_MAP.get(
        top_emotion,
        RESPONSE_MAP["neutral"]
    )
