"""
inference.py
Production loader using LOCAL trained model (team model)
"""

import os
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# -------------------------------------------------
# ✅ LOCAL MODEL PATH (TEAM MODEL)
# -------------------------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
MODEL_DIR = os.path.join(BASE_DIR, "models", "goemotion_roberta_best")

# -------------------------------------------------
# Load tokenizer + model ONCE
# -------------------------------------------------
tokenizer = AutoTokenizer.from_pretrained(
    MODEL_DIR,
    local_files_only=True,   # 🔑 THIS FIXES IT
    use_fast=False
)
model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_DIR,
    local_files_only=True    # 🔑 THIS TOO
)
model.eval()
torch.set_grad_enabled(False)

# -------------------------------------------------
# GoEmotions labels (fixed order)
# -------------------------------------------------
LABEL_LIST = [
    "admiration","amusement","anger","annoyance","approval","caring","confusion",
    "curiosity","desire","disappointment","disapproval","disgust","embarrassment",
    "excitement","fear","gratitude","grief","joy","love","nervousness","optimism",
    "pride","realization","relief","remorse","sadness","surprise","neutral"
]

def predict(text: str, threshold: float = 0.5, top_k: int = 5):
    if not isinstance(text, str):
        text = str(text)

    inputs = tokenizer(
        text,
        truncation=True,
        padding=True,
        max_length=128,
        return_tensors="pt"
    )

    with torch.no_grad():
        outputs = model(**inputs)

    logits = outputs.logits.cpu().numpy()[0]
    probs = 1 / (1 + np.exp(-logits))

    multi_hot = (probs >= threshold).astype(int)
    idxs = np.argsort(-probs)[:top_k]
    top = [(LABEL_LIST[i], float(probs[i])) for i in idxs]

    return {
        "probs": probs.tolist(),
        "preds_multi_hot": multi_hot.tolist(),
        "top_k": top
    }
