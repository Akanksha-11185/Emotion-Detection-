# app/backend/routers/chat.py
from fastapi import APIRouter, Header, HTTPException
import time, os, json, hashlib
from src.data_preprocessing.preprocessing_pipeline import preprocess_text
from src.model.inference import predict
from src.safety.safety_gate import safety_check  # ensure file above is present

from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    text: str
    threshold: Optional[float] = 0.5


router = APIRouter(prefix="/chat")

DEV_API_KEY = os.environ.get("DEV_API_KEY", "my-dev-key")
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)
REQUEST_LOG = os.path.join(LOG_DIR, "requests.log")
SAFETY_LOG = os.path.join(LOG_DIR, "safety_events.log")

def anon_hash(text: str):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()

def append_log(path, obj):
    with open(path, "a", encoding="utf-8") as f:
        f.write(json.dumps(obj) + "\n")

@router.post("/reply")
def chat_reply(req: ChatRequest, x_api_key: str = Header(None)):
    # Auth
    if x_api_key != DEV_API_KEY:
        raise HTTPException(status_code=401, detail="Missing/invalid API key")

    # Use attribute access on Pydantic model
    text = req.text or ""
    if not text:
        raise HTTPException(status_code=400, detail="text required")

    # robust threshold fallback
    threshold = req.threshold if req.threshold is not None else 0.5

    start = time.time()
    try:
        cleaned = preprocess_text(text)
        model_out = predict(cleaned, threshold=threshold)
        safety = safety_check(cleaned, model_out)
    except Exception as e:
        # preserve original exception text for debugging (but be careful in prod)
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")

    # Decide reply or escalate
    if not safety.get("safe", True) and safety.get("severity") in ("severe", "moderate"):
        action = "escalate"
        reply_text = (
            "I'm really sorry you're feeling this way. "
            "This sounds serious — please consider contacting local emergency services or a trusted person. "
            "If you're in immediate danger, call your local emergency number."
        )
        # log anonymized escalation
        append_log(SAFETY_LOG, {
            "ts": int(time.time()),
            "hash": anon_hash(text),
            "severity": safety.get("severity"),
            "keywords": safety.get("keywords"),
            "risk_score": safety.get("risk_score")
        })
    else:
        action = "reply"
        top = model_out.get("top_k", [])
        top_label = top[0][0] if top else "support"
        reply_text = f"I'm really sorry you're feeling {top_label}. I'm here if you want to express more."

    latency = time.time() - start
    append_log(REQUEST_LOG, {
        "ts": int(time.time()),
        "hash": anon_hash(text),
        "action": action,
        "latency": latency
    })

    return {
        "action": action,
        "reply": reply_text,
        "model": model_out,
        "safety": safety
    }
