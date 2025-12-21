# scripts/quantize_dynamic.py
import torch
from transformers import AutoModelForSequenceClassification
import os
import shutil
import sys
from pathlib import Path

MODEL_DIR = os.environ.get("MODEL_DIR", "models/goemotion_roberta_best")
OUT_DIR = os.environ.get("QUANT_DIR", "models/goemotion_roberta_int8")

MODEL_DIR = Path(MODEL_DIR)
OUT_DIR = Path(OUT_DIR)
OUT_DIR.mkdir(parents=True, exist_ok=True)

print("Loading model from:", MODEL_DIR)
model = AutoModelForSequenceClassification.from_pretrained(str(MODEL_DIR))
model.eval()

print("Applying dynamic quantization (this may be slow)...")
# dtype torch.qint8 is typical for dynamic quantization; fallback to qint8 if needed
try:
    qmodel = torch.quantization.quantize_dynamic(
        model, {torch.nn.Linear}, dtype=torch.qint8
    )
except Exception as e:
    print("Warning: quantize_dynamic raised:", e)
    print("Trying without explicit dtype...")
    qmodel = torch.quantization.quantize_dynamic(model, {torch.nn.Linear})

# Try to save in transformers-style first
try:
    print("Attempting qmodel.save_pretrained(...)")
    qmodel.save_pretrained(str(OUT_DIR))
    # copy tokenizer + config if present
    for fname in ("config.json", "tokenizer.json", "tokenizer_config.json", "vocab.json", "merges.txt", "special_tokens_map.json"):
        src = MODEL_DIR / fname
        if src.exists():
            shutil.copy(str(src), str(OUT_DIR / src.name))
    print("Quantized model saved with save_pretrained() at", OUT_DIR)
    sys.exit(0)
except Exception as e:
    print("save_pretrained() failed:", repr(e))
    print("Falling back to saving state_dict() and copying config/tokenizer files.")

# Fallback: save state_dict and minimal metadata
try:
    state_path = OUT_DIR / "pytorch_model.bin"
    print("Saving quantized state_dict to:", state_path)
    torch.save(qmodel.state_dict(), str(state_path))

    # copy config & tokenizer files so the folder looks like a transformers model directory
    copied = []
    for fname in ("config.json", "tokenizer.json", "tokenizer_config.json", "vocab.json", "merges.txt", "special_tokens_map.json"):
        src = MODEL_DIR / fname
        if src.exists():
            shutil.copy(str(src), str(OUT_DIR / src.name))
            copied.append(src.name)

    print("Copied files:", copied)
    print("Saved quantized state_dict. NOTE: transformers.from_pretrained() may not directly load this quantized model.")
    print("You can either:")
    print("  - load the model code and call `model.load_state_dict(torch.load('.../pytorch_model.bin'))` manually, or")
    print("  - use an ONNX/optimum/bitsandbytes approach for production-ready quantized artifacts.")
except Exception as e2:
    print("Failed to save fallback state_dict:", repr(e2))
    raise
