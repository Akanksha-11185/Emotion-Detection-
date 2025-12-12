# app/backend/routers/chat.py
from fastapi import APIRouter, HTTPException, Depends, Request, Header
from pydantic import BaseModel
from typing import Any, Dict, Optional
import time
import uuid
from src.data_preprocessing.preprocessing_pipeline import preprocess_text
from src.model.inference import predict
from src.safety.safety_gate import safety_check
from src.chatbot.response_generator import generate_response
from app.backend.utils.auth import verify_api_key
from app.backend.utils.logger import append_safety_event, sha256_hex
from app.backend.utils.rate_limiter import rate_limit
from fastapi.responses import JSONResponse
from app.backend.utils.logger import append_safety_event, sha256_hex


router = APIRouter()

class ChatRequest(BaseModel):
    text: str
    threshold: float = 0.5

class MetaInfo(BaseModel):
    request_id: str
    ts: int
    duration_ms: Optional[int] = None

class ReplyPayload(BaseModel):
    reply: Optional[str] = None
    model: Optional[Dict[str, Any]] = None
    safety: Optional[Dict[str, Any]] = None

class AdapterResponse(BaseModel):
    status: str  # "ok" or "error"
    action: str  # "reply", "escalate", "none"
    payload: Optional[Any] = None
    meta: MetaInfo

def now_ts() -> int:
    return int(time.time())

def normalize_severity(sev) -> float:
    """Return a numeric severity between 0.0 and 1.0.
    Accepts:
      - numeric (int/float): clamp to [0.0, 1.0]
      - string labels: maps common labels to numeric values
      - None: returns 0.0
    """
    if sev is None:
        return 0.0
    # numeric -> clamp
    try:
        val = float(sev)
        # if original scale is 0-100, normalize if needed (detect >1)
        if val > 1.0:
            # assume 0-100 scale
            val = max(0.0, min(1.0, val / 100.0))
        return max(0.0, min(1.0, val))
    except Exception:
        pass

    # string -> map
    s = str(sev).strip().lower()
    mapping = {
        "critical": 0.98,
        "severe": 0.95,
        "high": 0.9,
        "moderate": 0.6,
        "medium": 0.6,
        "low": 0.25,
        "none": 0.0,
        "safe": 0.0,
    }
    return mapping.get(s, 0.5)  # default to 0.5 if unknown

@router.post("/reply", response_model=AdapterResponse)
async def chat_reply(
    req: ChatRequest,
    request: Request,
    _ = Depends(rate_limit("chat_reply", limit=10, window_seconds=30)),
    x_api_key: str = Depends(verify_api_key),
    x_request_id: Optional[str] = Header(None)
):
    start = time.time()
    request_id = x_request_id or str(uuid.uuid4())
    ts = now_ts()

    try:
        text = (req.text or "").strip()
        if not text:
            raise HTTPException(status_code=400, detail="Empty text")

        # PREPROCESS + MODEL
        pre = preprocess_text(text, remove_sw=False)
        model_out = predict(pre, threshold=req.threshold)

        # SAFETY CHECK
        safety = safety_check(text, model_out) or {}

        # Normalize severity
        raw_sev = safety.get("severity")
        severity_score = normalize_severity(raw_sev)
        safety["severity_score"] = severity_score

        # Determine safe boolean
        is_safe = safety.get("safe", True)
        if isinstance(is_safe, str):
            is_safe = str(is_safe).lower() in ("1", "true", "yes", "safe")

        # ============================
        # 🚨 ESCALATION CASE
        # ============================
        if (not is_safe) or (severity_score >= 0.85):

            try:
                append_safety_event({
                    "type": "escalation",
                    "request_id": request_id,
                    "text_hash": sha256_hex(text),
                    "severity_score": severity_score,
                    "raw_severity": raw_sev,
                    "keywords": safety.get("keywords", []),
                })
            except Exception:
                pass

            duration_ms = int((time.time() - start) * 1000)
            meta = MetaInfo(request_id=request_id, ts=ts, duration_ms=duration_ms)

            data = AdapterResponse(
                status="ok",
                action="escalate",
                payload={
                    "message": "High distress detected. Human review recommended.",
                    "keywords": safety.get("keywords", []),
                    "severity_score": severity_score
                },
                meta=meta
            )

            response = JSONResponse(content=data.dict())
            response.headers.update(request.state.rate_limit_headers)
            return response

        # ============================
        # 💬 NORMAL REPLY CASE
        # ============================
        resp_text = generate_response(
            model_out.get("top_k", []),
            severity=safety.get("severity")
        )

        duration_ms = int((time.time() - start) * 1000)
        meta = MetaInfo(request_id=request_id, ts=ts, duration_ms=duration_ms)

        data = AdapterResponse(
            status="ok",
            action="reply",
            payload=ReplyPayload(
                reply=resp_text,
                model=model_out,
                safety=safety
            ),
            meta=meta
        )

        response = JSONResponse(content=data.dict())
        response.headers.update(request.state.rate_limit_headers)
        return response

    # ============================
    # ❌ CUSTOM ERROR HANDLING
    # ============================
    except HTTPException as he:
        duration_ms = int((time.time() - start) * 1000)
        meta = MetaInfo(request_id=request_id, ts=ts, duration_ms=duration_ms)
        raise HTTPException(
            status_code=he.status_code,
            detail={
                "status": "error",
                "message": he.detail,
                "meta": meta.dict()
            }
        )

    except Exception as e:
        duration_ms = int((time.time() - start) * 1000)
        meta = MetaInfo(request_id=request_id, ts=ts, duration_ms=duration_ms)

        try:
            append_safety_event({
                "type": "server_error",
                "request_id": request_id,
                "error": str(e)[:200]
            })
        except Exception:
            pass

        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": "Internal server error",
                "meta": meta.dict()
            }
        )
