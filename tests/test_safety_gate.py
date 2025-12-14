"""
Test safety gate logic
"""
from src.safety.safety_gate import safety_check

def test_safety_normal():
    out = safety_check("I'm feeling okay today")
    assert isinstance(out, dict)
    assert out["safe"] is True

def test_safety_critical():
    out = safety_check("I want to kill myself")
    assert isinstance(out, dict)
    assert out["safe"] is False
    assert out["severity"] == "severe"  # ✅ Changed from "critical" to "severe"