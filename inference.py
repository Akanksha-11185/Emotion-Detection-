"""
inference.py
Fast, production-oriented loader for a pretrained emotion model (Option 2).
- Loads model once at startup
- Works on CPU (will use GPU automatically if available)
- Returns multi-label probabilities and top-k list
"""

import os
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Change this if you prefer a different HF checkpoint
HF_MODEL = os.environ.get("HF_EMOTION_MODEL", "bhadresh-savani/roberta-base-go-emotions")
# Optional: override to use your saved local model folder:
# HF_MODEL = "models/goemotion_roberta_best"

# Load tokenizer + model once (on import)
tokenizer = AutoTokenizer.from_pretrained(HF_MODEL)
model = AutoModelForSequenceClassification.from_pretrained(HF_MODEL)
model.eval()

# Disable gradient computation for speed
torch.set_grad_enabled(False)

# If GPU is available and you want GPU inference uncomment:
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# model.to(device)

# Ensure label list matches the model. Many GoEmotions checkpoints follow the 28-label order:
LABEL_LIST = [
    "admiration","amusement","anger","annoyance","approval","caring","confusion",
    "curiosity","desire","disappointment","disapproval","disgust","embarrassment",
    "excitement","fear","gratitude","grief","joy","love","nervousness","optimism",
    "pride","realization","relief","remorse","sadness","surprise","neutral"
]

def predict(text: str, threshold: float = 0.5, top_k: int = 5):
    """
    Args:
      text: user text
      threshold: probability threshold for multi-label selection
      top_k: return top-k labels by probability

    Returns:
      dict with 'probs' (list), 'preds_multi_hot' (list of 0/1), 'top_k' ([(label,score)...])
    """
    if not isinstance(text, str):
        text = str(text)

    # Tokenize
    inputs = tokenizer(
        text,
        truncation=True,
        padding=True,
        max_length=128,
        return_tensors="pt"
    )

    # If you're using GPU, move inputs to device:
    # inputs = {k:v.to(device) for k,v in inputs.items()}

    # Forward
    with torch.no_grad():
        outputs = model(**inputs)

    # logits shape: (1, num_labels)
    logits = outputs.logits.cpu().numpy()[0]

    # Convert logits -> probabilities (sigmoid for multi-label)
    probs = 1.0 / (1.0 + np.exp(-logits))

    # Multi-hot predictions at threshold
    multi_hot = (probs >= threshold).astype(int)

    # Top-k by probability
    idxs = np.argsort(-probs)[:top_k]
    top = [(LABEL_LIST[i], float(probs[i])) for i in idxs]

    return {
        "probs": probs.tolist(),
        "preds_multi_hot": multi_hot.tolist(),
        "top_k": top
    }
