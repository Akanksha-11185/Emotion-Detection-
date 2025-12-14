# app/backend/utils/rate_limiter.py
import os
import time
from fastapi import HTTPException, Request
from collections import defaultdict

USE_REDIS = os.getenv("USE_REDIS", "false").lower() == "true"

# =========================
# In-memory store (Dev/Test)
# =========================
_REQUEST_HISTORY = defaultdict(list)

def verify_rate_limit(
    user_id: str,
    limit: int = 10,
    window: int = 60,
):
    now = time.time()
    history = _REQUEST_HISTORY[user_id]

    history[:] = [t for t in history if now - t < window]

    if len(history) >= limit:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")

    history.append(now)
    return True

# =========================
# FastAPI Dependency
# =========================
def rate_limit(key_prefix: str, limit: int = 10, window_seconds: int = 60):
    async def dependency(request: Request):
        if not USE_REDIS:
            client = request.client.host
            verify_rate_limit(client, limit, window_seconds)
            return True

        # Redis logic (ONLY for prod)
        from redis import Redis
        redis = Redis(host="127.0.0.1", port=6379, decode_responses=True)

        key = f"rl:{key_prefix}:{request.client.host}"
        count = redis.get(key)

        if count and int(count) >= limit:
            raise HTTPException(status_code=429, detail="Rate limit exceeded")

        redis.incr(key)
        redis.expire(key, window_seconds)
        return True

    return dependency
