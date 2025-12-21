# app/backend/routers/chat.py
from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel

from src.data_preprocessing.preprocessing_pipeline import preprocess_text
from src.model.inference import predict
from src.safety.safety_gate import safety_check
from src.chatbot.response_generator import generate_response

from app.backend.utils.auth import verify_api_key
from app.backend.utils.rate_limiter import rate_limit

router = APIRouter(tags=["chat"])


class ChatRequest(BaseModel):
    text: str
    threshold: float = 0.1
    turn_count: int = 1   # ✅ NEW (frontend increments this)


@router.post("/reply")
async def chat_reply(
    req: ChatRequest,
    request: Request,
    rate_limit_ok: bool = Depends(rate_limit("chat")),
    api_key_ok: bool = Depends(verify_api_key),
):
    # -----------------------------
    # 1. INPUT VALIDATION
    # -----------------------------
    text = req.text.strip()
    if not text:
        raise HTTPException(status_code=400, detail="Empty text")

    # -----------------------------
    # 2. PREPROCESSING + INFERENCE
    # -----------------------------
    pre = preprocess_text(text, remove_sw=False)
    model_out = predict(pre, threshold=req.threshold)

    # -----------------------------
    # 3. SAFETY CHECK
    # -----------------------------
    safety = safety_check(text, model_out)

    if safety.get("safe") is False or safety.get("severity") == "severe":
        return {
            "status": "ok",
            "action": "escalate",
            "severity": safety.get("severity"),
            "safety": safety,
        }

    # -----------------------------
    # 4. NORMALIZE MODEL OUTPUT
    # -----------------------------
    top_k = model_out.get("top_k", [])

    emotions = [label for label, _ in top_k]
    scores = {label: score for label, score in top_k}

    # -----------------------------
    # 5. GENERATE RESPONSE (HYBRID)
    # -----------------------------
    reply = generate_response(
        user_text=text,
        emotions=emotions,
        scores=scores,
        risk_level=safety.get("risk_level", "low"),
        turn_count=req.turn_count,   # ✅ PASS STATE
    )

    # -----------------------------
    # 6. RESPONSE
    # -----------------------------
    return {
        "status": "ok",
        "action": "reply",
        "reply": reply,
        "model": model_out,
        "safety": safety,
    }
