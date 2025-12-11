import os, json, hashlib, time

LOG_FILE = os.getenv('SAFETY_LOG', 'logs/safety_events.log')
os.makedirs(os.path.dirname(LOG_FILE) or '.', exist_ok=True)

def sha256_hex(s: str) -> str:
    return hashlib.sha256(s.encode('utf-8')).hexdigest()

def append_safety_event(event: dict):
    event['ts'] = int(time.time())
    with open(LOG_FILE, 'a', encoding='utf-8') as fh:
        fh.write(json.dumps(event, ensure_ascii=False) + '\n')
