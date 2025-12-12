# app/backend/routers/admin.py
from fastapi import APIRouter, HTTPException, Depends, Header
from typing import Optional
import os

from app.backend.utils.auth import verify_admin_api_key

router = APIRouter(prefix="/admin", tags=["admin"])

LOG_PATH = os.getenv("SAFETY_LOG", "logs/safety_events.log")

@router.get("/health")
def admin_health():
    return {"status": "ok", "admin": True}

@router.get("/escalations")
def get_escalations(
    limit: int = 50,
    x_api_key: str = Depends(verify_admin_api_key)
):
    """Return the most recent escalation events from the safety log."""
    if not os.path.exists(LOG_PATH):
        return {"events": [], "msg": "No log file found"}

    lines = []
    with open(LOG_PATH, "r", encoding="utf-8") as f:
        for line in f:
            if '"type":"escalation"' in line:
                lines.append(line.strip())

    # Return newest first
    lines = lines[-limit:][::-1]

    return {
        "count": len(lines),
        "events": [l for l in lines]
    }

@router.get("/logs/recent")
def get_recent_logs(
    limit: int = 50,
    file: Optional[str] = None,
    x_api_key: str = Depends(verify_admin_api_key)
):
    """Return last N lines from a log file (default = safety log)."""

    path = file or LOG_PATH

    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Log file not found")

    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    return {
        "file": path,
        "count": len(lines[-limit:]),
        "lines": [l.strip() for l in lines[-limit:]]
    }
