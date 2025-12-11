import time
from fastapi import HTTPException

_REQUEST_HISTORY = {}
MAX_REQUESTS = 30
TIME_WINDOW = 60  # seconds

def verify_rate_limit(client_id: str):
    now = int(time.time())
    window_start = now - TIME_WINDOW
    times = _REQUEST_HISTORY.get(client_id, [])
    times = [t for t in times if t >= window_start]
    if len(times) >= MAX_REQUESTS:
        raise HTTPException(status_code=429, detail="Too many requests. Please slow down.")
    times.append(now)
    _REQUEST_HISTORY[client_id] = times
