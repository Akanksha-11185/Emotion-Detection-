# app/backend/routers/meta.py
import os
import json
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Try to locate labels.json or model dir
LABELS_FILE = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "data", "labels.json")
# Fallback model dir (matches inference.py default)
MODEL_DIR = os.environ.get("MODEL_DIR", os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "models", "goemotion_roberta_best"))

def load_labels():
    # 1) if data/labels.json exists, load it
    if os.path.isfile(LABELS_FILE):
        try:
            return json.loads(open(LABELS_FILE, "r", encoding="utf-8").read())
        except Exception:
            pass

    # 2) try to read model config id2label (if transformers installed & model saved)
    try:
        # reading config.json in MODEL_DIR if present
        cfg_path = os.path.join(MODEL_DIR, "config.json")
        if os.path.isfile(cfg_path):
            cfg = json.loads(open(cfg_path, "r", encoding="utf-8").read())
            id2label = cfg.get("id2label") or cfg.get("label2id")  # sometimes label2id exists
            if isinstance(id2label, dict):
                # id2label may be {"0":"sadness", ...} => sort by int key
                return [id2label[str(i)] for i in sorted(map(int, id2label.keys()))]
    except Exception:
        pass

    # 3) fallback (small set)
    return [
        "admiration","amusement","anger","annoyance","approval","caring","confusion",
        "curiosity","desire","disappointment","disapproval","disgust","embarrassment",
        "excitement","fear","gratitude","grief","joy","love","nervousness","optimism",
        "pride","realization","relief","remorse","sadness","surprise","neutral"
    ]

@router.get("/meta/labels")
async def get_labels():
    labels = load_labels()
    if not labels:
        raise HTTPException(status_code=500, detail="Unable to load label list")
    return {"labels": labels, "count": len(labels), "model_dir": MODEL_DIR}
