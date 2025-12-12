from time import time
clients = {}

def verify_rate_limit(client_id, max_calls=10, window=60):
    now = int(time())
    calls = clients.get(client_id, [])
    calls = [t for t in calls if t > now - window]
    if len(calls) >= max_calls:
        return False
    calls.append(now)
    clients[client_id] = calls
    return True
