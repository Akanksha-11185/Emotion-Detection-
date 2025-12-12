from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def health_root():
    return {"status": "ok", "msg": "service healthy"}

@router.get("/ping")
def health_ping():
    return {"status": "ok", "msg": "service healthy"}
