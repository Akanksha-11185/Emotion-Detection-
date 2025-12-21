import os
from fastapi import Header, HTTPException

API_KEY = os.getenv("API_KEY", "test-key")  # 👈 TEST FRIENDLY

async def verify_api_key(x_api_key: str = Header(None)):
    if not x_api_key or x_api_key != API_KEY:
        raise HTTPException(status_code=401, detail="Invalid or missing API key")
    return True

def verify_admin_api_key(x_api_key: str = Header(None)):
    expected = os.getenv("ADMIN_API_KEY", "admin-test-key")
    if x_api_key != expected:
        raise HTTPException(status_code=401, detail="Invalid admin API key")
    return True
