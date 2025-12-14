"""
metrics.py
Utility functions for evaluation.
"""

import numpy as np
from sklearn.metrics import f1_score, precision_recall_fscore_support

def threshold_preds(logits, threshold=0.5):
    probs = 1/(1+np.exp(-logits))  # sigmoid
    return (probs >= threshold).astype(int), probs

def multilabel_f1(y_true, y_pred):
    return {
        "f1_macro": f1_score(y_true, y_pred, average="macro"),
        "f1_micro": f1_score(y_true, y_pred, average="micro")
    }
