from fastapi import APIRouter
from pydantic import BaseModel
from src.data_preprocessing.preprocessing_pipeline import preprocess_text
from src.model.inference import predict

router = APIRouter()

class PredictRequest(BaseModel):
    text: str
    threshold: float = 0.5

@router.post("/predict")
def predict_emotion(req: PredictRequest):

    pre = preprocess_text(req.text, remove_sw=False)
    model_out = predict(pre, threshold=req.threshold)
    return {"input": req.text, "cleaned": pre, "model": model_out}

