from src.safety.safety_gate import safety_check


def test_safety_normal():
    out = safety_check("I had a really nice day")
    assert isinstance(out, dict)
    assert out["safe"] is True


def test_safety_critical():
    out = safety_check("I want to kill myself")
    assert isinstance(out, dict)
    assert out["safe"] is False
    assert out["severity"] == "critical"
