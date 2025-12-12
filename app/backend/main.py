# app/backend/main.py
import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.backend.routers import admin


# your routers
from app.backend.routers import emotion, chat, health

# Read allowed origins from env (comma-separated). Default to localhost:3000 for dev.
_allowed = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
# split + strip empty entries
ALLOWED_ORIGINS = [o.strip() for o in _allowed.split(",") if o.strip()]

app = FastAPI(title="Emotion Support API", version="0.1")

# ---- CORS middleware ----
# NOTE: In production, set ALLOWED_ORIGINS to the exact frontend origin(s)
# e.g. ALLOWED_ORIGINS="https://yourdomain.com,https://admin.yourdomain.com"
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS or ["*"],  # avoid "*" in prod; use explicit origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
# ------------------------

app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(emotion.router, prefix="/emotion", tags=["emotion"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(admin.router)


if __name__ == "__main__":
    uvicorn.run("app.backend.main:app", host="0.0.0.0", port=8000, reload=True)
