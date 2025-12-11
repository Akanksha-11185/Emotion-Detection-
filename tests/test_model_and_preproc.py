from src.data_preprocessing.preprocessing_pipeline import preprocess_text
from src.model.inference import predict


def test_preprocess_basic():
    text = "I'm so sad :("
    cleaned = preprocess_text(text)
    assert isinstance(cleaned, str)
    assert len(cleaned) > 0


def test_predict_shape():
    out = predict("I am happy", threshold=0.3)
    assert isinstance(out, dict)
    assert "probs" in out
    assert "top_k" in out
    assert "preds_multi_hot" in out
