import os
from fastapi.testclient import TestClient
from app.backend.main import app

# Ensure API key for tests
os.environ["API_KEY"] = "test-key"

client = TestClient(app)


def test_chat_reply_ok():
    res = client.post(
        "/chat/reply",
        json={"text": "I feel a bit sad today"},
        headers={"x-api-key": "test-key"}
    )
    assert res.status_code == 200
    body = res.json()
    assert "action" in body
    assert body["action"] in ["reply", "escalate"]


def test_chat_reply_escalate():
    res = client.post(
        "/chat/reply",
        json={"text": "I want to kill myself"},
        headers={"x-api-key": "test-key"}
    )
    assert res.status_code == 200
    body = res.json()
    assert body["action"] == "escalate"
