"""
augment_slang_hinglish.py
Simple, safe augmentation for slang, elongation, emoji injection, and light Hinglish mapping.
Used to expand training data for robustness.
"""

import random
import re

# Small, safe slang map (expand as needed)
SLANG_MAP = {
    "idk": "i don't know",
    "fr": "for real",
    "tbh": "to be honest",
    "bruh": "bro",
    "ngl": "not gonna lie",
    "omg": "oh my god",
    "lol": "laughing"
}

HINGLISH_MAP = {
    "bahut": "very",
    "thoda": "a little",
    "nahi": "not",
    "kya": "what",
    "achha": "okay",
    "yaar": "friend"
}

EMOJI_MAP = {
    "sad": ["😔","😞","😭"],
    "anger": ["😠","😡"],
    "joy": ["😊","😄","🙂"],
    "fear": ["😰","😨"],
    "neutral": ["😐"]
}

def elongate_token(token: str) -> str:
    """Elongate a token (e.g., 'so' -> 'sooo') with low probability."""
    if len(token) <= 2 or random.random() > 0.25:
        return token
    i = random.randint(0, len(token)-1)
    return token[:i] + token[i]*3 + token[i+1:]

def inject_emoji(text: str, emotion_label: str) -> str:
    if emotion_label in EMOJI_MAP and random.random() < 0.5:
        return text + " " + random.choice(EMOJI_MAP[emotion_label])
    return text

def apply_slang_map(text: str) -> str:
    tokens = text.split()
    out = []
    for t in tokens:
        key = re.sub(r"[^\w']", "", t.lower())
        out.append(SLANG_MAP.get(key, t))
    return " ".join(out)

def apply_hinglish_map(text: str) -> str:
    tokens = text.split()
    out = [HINGLISH_MAP.get(t.lower(), t) for t in tokens]
    return " ".join(out)

def apply_elongation(text: str) -> str:
    tokens = text.split()
    idx = random.randrange(len(tokens))
    tokens[idx] = elongate_token(tokens[idx])
    return " ".join(tokens)

def augment_text(text: str, emotion_label: str="neutral", n_variants: int=4):
    """
    Returns a list of augmented variants (including original).
    Keep augmentations conservative to avoid changing meaning.
    """
    variants = {text}

    for _ in range(n_variants):
        txt = text
        # randomly apply one or more augmentations
        if random.random() < 0.6:
            txt = apply_slang_map(txt)
        if random.random() < 0.4:
            txt = apply_hinglish_map(txt)
        if random.random() < 0.3:
            txt = apply_elongation(txt)
        txt = inject_emoji(txt, emotion_label)
        variants.add(txt)

    return list(variants)
