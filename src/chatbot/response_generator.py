# src/chatbot/response_generator.py
from typing import List, Dict
from src.chatbot.lm_client import generate_llm_response


# -----------------------------
# CONFIG
# -----------------------------
MIN_EMOTION_CONFIDENCE = 0.25   # ignore weak / misleading emotions
LLM_ACTIVATION_TURN = 2  # ✅ CHANGED from 4 to 2


# -----------------------------
# CANONICAL EMOTION MAPPING
# -----------------------------
EMOTION_CANONICAL_MAP = {
    "nervousness": "anxiety",
    "fear": "anxiety",
    "annoyance": "anger",
    "disappointment": "sadness",
    "remorse": "sadness",
}


def _select_primary_emotion(
    emotions: List[str],
    scores: Dict[str, float],
) -> str:
    """
    Select primary emotion using confidence threshold.
    Treat low-confidence signals as neutral/mixed.
    """
    if not emotions or not scores:
        return "neutral"

    sorted_emotions = sorted(
        emotions,
        key=lambda e: scores.get(e, 0.0),
        reverse=True,
    )

    for e in sorted_emotions:
        if e != "neutral" and scores.get(e, 0.0) >= MIN_EMOTION_CONFIDENCE:
            return e

    return "neutral"


def generate_response(
    user_text: str,
    emotions: List[str],
    scores: Dict[str, float],
    risk_level: str = "low",
    turn_count: int = 1,
) -> str:
    """
    Research-grade hybrid response generator
    with:
    - safety override
    - emotion persistence
    - turn-based conversation awareness
    - ✅ UPDATED: LLM activation at turn 2 (was 4)
    """

    # -------------------------------------------------
    # 1. SAFETY OVERRIDE (NEVER USE LLM HERE)
    # -------------------------------------------------
    if risk_level in {"high", "critical"}:
        return (
            "I'm really sorry you're feeling this much distress. "
            "You deserve care and support. "
            "If possible, please consider reaching out to a trusted person "
            "or a mental health professional."
        )

    # -------------------------------------------------
    # 2. NO EMOTION DETECTED
    # -------------------------------------------------
    if not emotions:
        return (
            "I'm here with you. "
            "You don't have to explain everything perfectly. "
            "What's been weighing on you?"
        )

    # -------------------------------------------------
    # 3. SELECT & NORMALIZE EMOTION
    # -------------------------------------------------
    raw_emotion = _select_primary_emotion(emotions, scores)
    primary_emotion = EMOTION_CANONICAL_MAP.get(raw_emotion, raw_emotion)

    # -------------------------------------------------
    # 4. EMOTION ACCUMULATION (PERSISTENCE)
    # -------------------------------------------------
    sadness_load = sum(
        scores.get(e, 0.0)
        for e in ["sadness", "disappointment", "grief", "remorse"]
    )

    # ✅ ENHANCED: More responsive to emotional persistence
    anxiety_load = sum(
        scores.get(e, 0.0)
        for e in ["anxiety", "fear", "nervousness"]
    )

    # -------------------------------------------------
    # 5. CONVERSATION STAGE LOGIC (REFLECTION)
    # -------------------------------------------------
    # ✅ UPDATED: Check at turn 2 (was turn 3)
    if turn_count >= 2 and sadness_load > 0.6:
        return (
            "From what you've shared, it sounds like this has been building up. "
            "Feeling tired, unmotivated, and disconnected can be really heavy to carry. "
            "Have these feelings been around for a while, or did something change recently?"
        )
    
    # ✅ NEW: Handle persistent anxiety early
    if turn_count >= 2 and anxiety_load > 0.6:
        return (
            "It sounds like worry or tension has been weighing on you. "
            "That can be exhausting when it doesn't let up. "
            "Is there something specific that's been on your mind?"
        )

    # -------------------------------------------------
    # 6. ✅ UPDATED: LLM ENHANCEMENT (HYBRID MODE)
    # Now activates at turn 2 instead of 4
    # -------------------------------------------------
    use_llm = (
        turn_count >= LLM_ACTIVATION_TURN  # ✅ Now 2 instead of 4
        and risk_level == "low"
        and primary_emotion != "neutral"
    )
    
    # ✅ ENHANCED: Additional triggers for early LLM activation
    high_emotion_score = any(score > 0.7 for score in scores.values())
    help_keywords = ["help", "understand", "alone", "nobody"]
    needs_empathy = any(keyword in user_text.lower() for keyword in help_keywords)
    
    # Override: Activate LLM early if strong emotion or explicit need
    if turn_count >= 1 and (high_emotion_score or needs_empathy) and risk_level == "low":
        use_llm = True

    if use_llm:
        # ✅ ENHANCED: More context for LLM
        if turn_count == 2:
            emotion_context = (
                f"The user is expressing {primary_emotion} in their second message. "
                f"They're starting to open up more. Show warm empathy and gentle curiosity."
            )
        elif turn_count >= 3:
            emotion_context = (
                f"The user has been expressing {primary_emotion} "
                f"across {turn_count} conversation turns. "
                f"This suggests persistent distress. Show deeper understanding."
            )
        else:
            emotion_context = (
                f"The user is expressing {primary_emotion}. "
                f"This appears to be a significant concern for them."
            )
        
        return generate_llm_response(
            user_text=user_text,
            emotion_context=emotion_context,
        )

    # -------------------------------------------------
    # 7. RULE-BASED RESPONSE MAP (DEFAULT)
    # Used only for turn 1 now
    # -------------------------------------------------
    # ✅ ENHANCED: More varied templates to avoid repetition
    RESPONSE_MAP = {
        "sadness": [
            "I'm really sorry you're feeling this way. That heaviness can be hard to live with. Do you want to talk about what's been affecting you?",
            "It sounds like you're carrying a lot right now. I'm here to listen if you want to share more.",
            "That must feel really difficult. What's been weighing on your mind?"
        ],
        "depression": [
            "That sounds deeply exhausting and overwhelming. I'm really glad you reached out. How long have you been feeling like this?",
            "Feeling this low can be incredibly hard. Thank you for sharing with me. What's been happening?",
            "I hear that things feel really heavy. You don't have to face this alone. Want to tell me more?"
        ],
        "loneliness": [
            "Feeling lonely can hurt even when you're around people. I'm here with you. What's been making you feel this way?",
            "That sense of isolation can be really painful. I'm listening. What's going on?",
            "Being lonely is hard, and your feelings are valid. Want to talk about it?"
        ],
        "anxiety": [
            "It sounds like your thoughts might be racing or feeling tense. That can be exhausting. Is there something specific that's been worrying you?",
            "Anxiety can make everything feel overwhelming. I'm here to listen. What's on your mind?",
            "That worry and tension must be difficult to deal with. Want to share what's triggering it?"
        ],
        "anger": [
            "I can sense a lot of frustration or hurt. Your feelings are valid. What happened that triggered this reaction?",
            "That anger sounds intense. Something really bothered you. Want to talk about it?",
            "I hear that you're really upset. Your feelings matter. What's going on?"
        ],
        "embarrassment": [
            "That sounds really uncomfortable and painful. Being humiliated can stay with you longer than people realize. Do you want to talk about what happened?",
            "Feeling embarrassed can be so difficult. I'm here without judgment. What happened?",
            "That must have felt awful. I'm listening if you want to share more."
        ],
        "joy": [
            "I'm glad there's some positivity there. What's been going well for you?",
            "It's good to hear something positive. What's bringing you happiness?",
            "That's wonderful to hear. Tell me more about what's making you feel good."
        ],
        "neutral": [
            "I'm here with you and listening. What feels most important to talk about right now?",
            "I'm here for you. What's been on your mind?",
            "Thank you for reaching out. What would you like to share?"
        ],
    }

    # ✅ Get multiple templates for this emotion
    templates = RESPONSE_MAP.get(primary_emotion, RESPONSE_MAP["neutral"])
    
    # If single string, wrap in list
    if isinstance(templates, str):
        templates = [templates]
    
    # ✅ Vary response based on turn count to avoid exact repetition
    response_index = (turn_count - 1) % len(templates)
    
    return templates[response_index]