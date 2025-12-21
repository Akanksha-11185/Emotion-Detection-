import pytest
import numpy as np

@pytest.fixture(autouse=True)
def mock_model(monkeypatch):

    def fake_predict(text, threshold=0.5, top_k=5):
        return {
            "preds_multi_hot": [0] * 28,
            "top_k": [("joy", 0.9)],
            "probs": [0.1] * 28
        }

    monkeypatch.setattr(
        "src.model.inference.predict",
        fake_predict
    )
