import uvicorn
from fastapi import FastAPI
from app.backend.routers import emotion, chat, health, Meta

app = FastAPI(title="Emotion Support API", version="0.1")

app.include_router(health.router, prefix="/health", tags=["health"])
app.include_router(emotion.router, prefix="/emotion", tags=["emotion"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(Meta.router, tags=["meta"])   # <-- ADD THIS LINE

if __name__ == "__main__":
    uvicorn.run("app.backend.main:app", host="0.0.0.0", port=8000, reload=True)
