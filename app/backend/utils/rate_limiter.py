import time
import os
from fastapi import HTTPException, Request
from redis import Redis

REDIS_HOST = os.getenv("REDIS_HOST", "127.0.0.1")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))

redis_client = Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)

def rate_limit(
    key_prefix: str,
    limit: int = 10,
    window_seconds: int = 30,
):
    async def dependency(request: Request):
        client_ip = request.client.host
        key = f"rl:{key_prefix}:{client_ip}"

        current = redis_client.get(key)

        if current:
            current = int(current)
        else:
            redis_client.set(key, 0, ex=window_seconds)
            current = 0

        # If user exceeded limit → block
        if current >= limit:
            ttl = redis_client.ttl(key)
            raise HTTPException(
                status_code=429,
                detail=f"Rate limit exceeded. Try again in {ttl} seconds.",
                headers={
                    "X-RateLimit-Limit": str(limit),
                    "X-RateLimit-Remaining": "0",
                    "X-RateLimit-Reset": str(ttl),
                }
            )

        # Increment usage
        redis_client.incr(key)

        # Calculate remaining quota and reset time
        remaining = max(0, limit - current - 1)
        ttl = redis_client.ttl(key)

        # Attach headers to the Request object so the route can return them
        request.state.rate_limit_headers = {
            "X-RateLimit-Limit": str(limit),
            "X-RateLimit-Remaining": str(remaining),
            "X-RateLimit-Reset": str(ttl),
        }

        return True

    return dependency
