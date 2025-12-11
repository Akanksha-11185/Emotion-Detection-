"""
cleaner.py
Basic text cleaning functions for GoEmotions + MH Support App
"""

import re
import string

def clean_text(text: str) -> str:
    if not isinstance(text, str):
        return ""

    text = text.strip()

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text)

    # Remove links
    text = re.sub(r"http\S+|www\S+", "", text)

    # Remove weird unicode characters
    text = text.encode("ascii", "ignore").decode()

    return text
