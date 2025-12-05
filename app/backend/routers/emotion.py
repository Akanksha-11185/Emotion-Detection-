from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Any, Dict
from src.data_preprocessing.preprocessing_pipeline import preprocess_text
from src.model.inference import predict
from src.safety.safety_gate import safety_check

router = APIRouter()

class PredictRequest(BaseModel):
    text: str
    threshold: float = 0.5

@router.post("/predict")
def predict_emotion(req: PredictRequest):
    text = req.text or ""
    if not text.strip():
        raise HTTPException(status_code=400, detail="Empty text")

    # 1) Preprocess (conservative)
    pre = preprocess_text(text, remove_sw=False)

    # 2) Model inference
    model_out = predict(pre, threshold=req.threshold)

    # 3) Safety gate
    # model_out['top_k'] expected as list of (label,score)
    safety = safety_check(text, model_out)

    response = {
        "input": text,
        "preprocessed": pre,
        "model": model_out,
        "safety": safety,
    }
    return response
