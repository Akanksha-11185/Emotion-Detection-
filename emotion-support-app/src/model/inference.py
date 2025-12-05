"""
inference.py
Simple inference wrapper for the fine-tuned multi-label model.
Returns top-K predicted labels with confidences.
"""

import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import os

LABEL_LIST = [
    "admiration","amusement","anger","annoyance","approval","caring","confusion",
    "curiosity","desire","disappointment","disapproval","disgust","embarrassment",
    "excitement","fear","gratitude","grief","joy","love","nervousness","optimism",
    "pride","realization","relief","remorse","sadness","surprise","neutral"
]

MODEL_DIR = os.environ.get("MODEL_DIR", "models/goemotion_roberta_best")

tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_DIR)
model.eval()

def predict(text, threshold=0.5, top_k=5):
    inputs = tokenizer(text, truncation=True, padding=True, max_length=128, return_tensors="pt")
    with torch.no_grad():
        logits = model(**inputs).logits.cpu().numpy()[0]
    probs = 1/(1+np.exp(-logits))
    preds = (probs >= threshold).astype(int)
    # top-k labels by probability
    top_idx = np.argsort(-probs)[:top_k]
    top = [(LABEL_LIST[i], float(probs[i])) for i in top_idx]
    return {"preds_multi_hot": preds.tolist(), "top_k": top, "probs": probs.tolist()}
