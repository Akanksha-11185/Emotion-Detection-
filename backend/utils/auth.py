# app/backend/utils/auth.py
"""
Very simple API-key based authentication for FastAPI.

- Client must send:  X-API-Key: <your-secret-key>
- Backend compares it with BACKEND_API_KEY env variable (or a default).
"""

import os
from fastapi import Header, HTTPException, status
from typing import Optional

# You can override this from environment: BACKEND_API_KEY=...
DEFAULT_API_KEY = "super-secret-dev-key"


def get_api_key_from_env() -> str:
    return os.environ.get("BACKEND_API_KEY", DEFAULT_API_KEY)


async def verify_api_key(x_api_key: Optional[str] = Header(None)) -> str:
    """
    Dependency for FastAPI routes.
    - Reads X-API-Key header
    - Compares with expected key
    - Raises 401 if invalid / missing
    """
    expected = get_api_key_from_env()

    if x_api_key is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing X-API-Key header.",
        )

    if x_api_key != expected:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key.",
        )

    return x_api_key
