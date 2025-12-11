# app/backend/utils/auth.py
import os
from fastapi import Header, HTTPException, Depends

# read API key from env var (default for dev)
API_KEY = os.getenv("API_KEY", "integration_auth")

async def verify_api_key(x_api_key: str = Header(None)):
    """
    Dependency to verify x-api-key header is present and matches API_KEY.
    Raises 401 if missing/invalid.
    """
    if not x_api_key or x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")
    return True
