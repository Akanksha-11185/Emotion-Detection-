# placeholder simple rate limiter (in-memory). Replace with redis/fast limiter for prod.
import time
from fastapi import HTTPException

_REQUESTS = {}
LIMIT = 30  # requests
WINDOW = 60  # seconds

def check_rate(client_id: str):
    now = int(time.time())
    window_start = now - WINDOW
    times = _REQUESTS.get(client_id, [])
    # drop old
    times = [t for t in times if t >= window_start]
    if len(times) >= LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    times.append(now)
    _REQUESTS[client_id] = times
