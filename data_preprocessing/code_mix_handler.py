"""
code_mix_handler.py
Handles Hinglish / mixed-language detection
"""

def detect_hinglish(text):
    roman_hindi = ["hai", "nahi", "mat", "kya", "bahut", "thoda"]
    tokens = text.lower().split()

    return any(t in roman_hindi for t in tokens)

def normalize_hinglish(text):
    mapping = {
        "bahut": "very",
        "thoda": "little",
        "nahi": "not",
        "kya": "what"
    }

    tokens = text.split()
    out = [mapping.get(t.lower(), t) for t in tokens]
    return " ".join(out)
