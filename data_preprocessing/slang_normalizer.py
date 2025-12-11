"""
slang_normalizer.py
Handles slang normalization for emotion detection (safe)
"""

SLANG_MAP = {
    "idk": "i don't know",
    "fr": "for real",
    "tbh": "to be honest",
    "bruh": "bro",
    "ngl": "not gonna lie"
}

def normalize_slang(text):
    tokens = text.split()
    out = [SLANG_MAP.get(t.lower(), t) for t in tokens]
    return " ".join(out)
