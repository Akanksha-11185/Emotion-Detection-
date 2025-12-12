# app/backend/utils/auth.py
import os
from fastapi import Header, HTTPException, Depends, APIRouter

# default: change for production or set the environment variable API_KEY
API_KEY = os.getenv("API_KEY", "my-dev-key")

async def verify_api_key(x_api_key: str = Header(None)):
    if not x_api_key or x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")
    return True

# Router that applies the dependency to all routes attached to it (optional)
router = APIRouter(dependencies=[Depends(verify_api_key)])

def verify_admin_api_key(x_api_key: str = Header(None)):
    expected = os.getenv("ADMIN_API_KEY")
    if not expected or x_api_key != expected:
        raise HTTPException(status_code=401, detail="Invalid or missing admin API key")
    return x_api_key
