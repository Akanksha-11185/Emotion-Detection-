# app/backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.backend.routers import chat, admin, emotion, health, vision

app = FastAPI(title="Emotion Support API", version="0.1")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Correct routing
app.include_router(chat.router, prefix="/chat")
app.include_router(emotion.router, prefix="/emotion")
app.include_router(health.router, prefix="/health")
app.include_router(admin.router)
app.include_router(
    vision.router,
    prefix="/vision",
    tags=["vision"]
)
