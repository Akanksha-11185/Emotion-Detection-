from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any, Dict
from src.data_preprocessing.preprocessing_pipeline import preprocess_text
from src.model.inference import predict
from src.safety.safety_gate import safety_check
from src.chatbot.response_generator import generate_response

router = APIRouter()

class ChatRequest(BaseModel):
    text: str
    threshold: float = 0.5

@router.post("/reply")
def chat_reply(req: ChatRequest):
    text = req.text or ""
    if not text.strip():
        raise HTTPException(status_code=400, detail="Empty text")

    pre = preprocess_text(text, remove_sw=False)
    model_out = predict(pre, threshold=req.threshold)

    # model_out["top_k"] is [(label,score), ...]
    safety = safety_check(text, model_out)

    # If severe, do not generate a normal reply — return escalation hint
    if not safety["safe"]:
        return {
            "action": "escalate",
            "message": "High distress detected. Human review recommended.",
            "keywords": safety.get("keywords", []),
            "severity": safety["severity"]
        }

    # Otherwise generate empathetic reply
    resp_text = generate_response(model_out.get("top_k", []), severity=safety["severity"])
    return {
        "action": "reply",
        "reply": resp_text,
        "model": model_out,
        "safety": safety
    }
