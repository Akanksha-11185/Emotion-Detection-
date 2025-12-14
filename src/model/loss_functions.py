"""
loss_functions.py
Placeholder: you can add custom losses (focal loss etc.)
For multi-label with transformers you can rely on built-in BCEWithLogitsLoss.
"""

import torch
import torch.nn as nn

def bce_with_logits_loss(outputs, targets):
    loss_fct = nn.BCEWithLogitsLoss()
    return loss_fct(outputs, targets.float())
