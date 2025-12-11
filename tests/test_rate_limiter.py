import time
from fastapi import HTTPException
from app.backend.utils.rate_limiter import verify_rate_limit, _REQUEST_HISTORY


def test_rate_limiter_basic():
    client_id = "pytest-client"

    # Reset client history
    _REQUEST_HISTORY.pop(client_id, None)

    # Few allowed requests
    for _ in range(3):
        verify_rate_limit(client_id)

    # Force limit exceeded
    _REQUEST_HISTORY[client_id] = [int(time.time())] * 100

    try:
        verify_rate_limit(client_id)
        assert False, "Expected rate limit HTTPException"
    except HTTPException:
        pass

    # Cleanup
    _REQUEST_HISTORY.pop(client_id, None)
