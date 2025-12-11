"""
stopword_handler.py
Custom stopword removal for MH domain (keeping important cues)
"""

import spacy

nlp = spacy.load("en_core_web_sm", disable=["ner"])

# Start with spaCy's stopwords
STOPWORDS = set(nlp.Defaults.stop_words)

# Keep emotional cues
KEEP_WORDS = ["no", "not", "never", "n't", "i", "me", "my", "you"]

for w in KEEP_WORDS:
    if w in STOPWORDS:
        STOPWORDS.remove(w)

def remove_stopwords(text):
    doc = nlp(text)
    filtered = [t.text for t in doc if t.text.lower() not in STOPWORDS]
    return " ".join(filtered)
