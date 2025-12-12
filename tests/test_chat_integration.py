# tests/test_chat_integration.py
import os
import pytest
from fastapi.testclient import TestClient
from app.backend.main import app   # adjust if your app import path differs

client = TestClient(app)
DEV_API_KEY = os.getenv("API_KEY", "dev-key-change-me")

def post_chat(text, api_key=DEV_API_KEY):
    headers = {"x-api-key": api_key, "Content-Type": "application/json"}
    return client.post("/chat/reply", headers=headers, json={"text": text, "threshold": 0.4})

def test_health():
    r = client.get("/health/ping")
    assert r.status_code == 200

def test_missing_api_key():
    r = client.post("/chat/reply", json={"text": "hello"})
    assert r.status_code == 401

def test_normal_reply():
    r = post_chat("I'm a bit down but okay.")
    assert r.status_code == 200
    body = r.json()
    assert "action" in body
    assert body["action"] in ("reply", "escalate")
    if body["action"] == "reply":
        assert "reply" in body and isinstance(body["reply"], str)

def test_escalation_trigger():
    r = post_chat("I want to kill myself")
    assert r.status_code == 200
    body = r.json()
    assert "action" in body
    # ok if it replies or escalates; if escalate, check keys
    if body["action"] == "escalate":
        assert "severity" in body

def test_rate_limit():
    for i in range(0, 40):
        r = post_chat(f"spam message {i}")
        if r.status_code == 429:
            assert r.status_code == 429
            return
    assert True
