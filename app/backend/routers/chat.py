# app/backend/routers/chat.py
from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel

from src.data_preprocessing.preprocessing_pipeline import preprocess_text
from src.model.inference import predict
from src.safety.safety_gate import safety_check
from src.chatbot.response_generator import generate_response

from app.backend.utils.auth import verify_api_key
from app.backend.utils.rate_limiter import rate_limit

# ❌ NO prefix here (important!)
router = APIRouter(tags=["chat"])

class ChatRequest(BaseModel):
    text: str
    threshold: float = 0.5

@router.post("/reply")
async def chat_reply(
    req: ChatRequest,
    request: Request,
    rate_limit_ok: bool = Depends(rate_limit("chat")),
    api_key_ok: bool = Depends(verify_api_key),
):
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Empty text")

    pre = preprocess_text(text, remove_sw=False)
    model_out = predict(pre, threshold=req.threshold)
    safety = safety_check(text, model_out)

    # 🚨 ESCALATION (guaranteed)
    if safety.get("safe") is False or safety.get("severity") == "severe":
        return {
            "status": "ok",
            "action": "escalate",
            "severity": safety.get("severity"),  # ✅ Add severity at top level
            "safety": safety,
        }

    reply = generate_response(
        model_out.get("top_k", []),
        severity=safety.get("severity"),
    )

    return {
        "status": "ok",
        "action": "reply",
        "reply": reply,
        "model": model_out,
        "safety": safety,
    }