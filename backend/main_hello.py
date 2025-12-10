# app/backend/main_hello.py
from fastapi import FastAPI
from pydantic import BaseModel
from src.model.simple_emotion_model import predict_emotions
from typing import List, Dict
from src.safety.safety_gate import assess_risk



# 1️⃣ Create the FastAPI app object
app = FastAPI()

# 2️⃣ Define the shape of the request body for /chat
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str
    emotions: List[str]
    scores: Dict[str, float]
    risk: str


# 3️⃣ Simple health-check endpoint
@app.get("/health")
def health_check():
    """
    This endpoint is used to check if the server is running.
    When you open /health in your browser, it will return {"status": "ok"}.
    """
    return {"status": "ok"}

# 4️⃣ Simple chat endpoint
@app.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    user_message = request.message

    # 1️⃣ Emotion detection
    emo_result = predict_emotions(user_message)
    top_emotions = emo_result["top_emotions"]
    scores = emo_result["scores"]
    main_emotion = top_emotions[0] if top_emotions else "neutral"

    # 2️⃣ Risk assessment
    risk_level = assess_risk(user_message)

    # 3️⃣ Generate safer reply
    if risk_level == "critical":
        reply_text = (
            "I'm really sorry that you're feeling this way. "
            "You deserve help and care. "
            "Please reach out to a trusted person or local emergency services immediately."
        )
    elif risk_level == "sensitive":
        reply_text = (
            f"It sounds like you're feeling {main_emotion.lower()} and struggling a lot. "
            "Thank you for sharing this with me. You're not alone."
        )
    else:
        reply_text = (
            f"It sounds like you're feeling {main_emotion.lower()}. "
            "Thank you for sharing your feelings."
        )

    # 4️⃣ Include risk level in response
    return {
        "reply": reply_text,
        "emotions": top_emotions,
        "scores": scores,
        "risk": risk_level
    }
