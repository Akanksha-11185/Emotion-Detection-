"""
preprocessing_pipeline.py
Full preprocessing pipeline combining all steps
"""

from .cleaner import clean_text
from .stopword_handler import remove_stopwords
from .slang_normalizer import normalize_slang
from .code_mix_handler import detect_hinglish, normalize_hinglish

def preprocess_text(text: str, remove_sw=False):
    text = clean_text(text)
    text = normalize_slang(text)

    # If Hinglish detected, normalize
    if detect_hinglish(text):
        text = normalize_hinglish(text)

    if remove_sw:
        text = remove_stopwords(text)

    return text

if __name__ == "__main__":
    s = "Broooo I'm sooooo done yaar 😭 https://link"
    print(preprocess_text(s))
