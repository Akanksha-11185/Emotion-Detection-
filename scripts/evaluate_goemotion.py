# scripts/evaluate_goemotion.py
import os
import json
import numpy as np
from sklearn.metrics import f1_score, recall_score
from datasets import load_dataset
from src.model.inference import predict, LABEL_LIST

DATA_PATH = os.getenv("GOEMOTIONS_TEST_CSV", "data/raw/test.csv")
THRESHOLD = float(os.getenv("EVAL_THRESHOLD", 0.5))

def load_test_csv(path):
    ds = load_dataset("csv", data_files=path)["train"]
    examples = []
    for ex in ds:
        text = ex.get("text") or ex.get("sentence") or ""
        labels_raw = ex.get("labels") or ex.get("label") or ""
        if isinstance(labels_raw, str) and labels_raw.strip():
            gold = [l.strip() for l in labels_raw.split(",") if l.strip()]
        else:
            gold = []
        examples.append({"text": text, "gold": gold})
    return examples

def gold_to_vec(gold_labels, label_list):
    return [1 if lab in gold_labels else 0 for lab in label_list]

def main():
    print("Loading test data:", DATA_PATH)
    examples = load_test_csv(DATA_PATH)
    y_true = []
    y_pred = []

    for ex in examples:
        text = ex["text"]
        gold = ex["gold"]
        true_vec = gold_to_vec(gold, LABEL_LIST)
        out = predict(text, threshold=THRESHOLD)
        pred_vec = out["preds_multi_hot"]
        y_true.append(true_vec)
        y_pred.append(pred_vec)

    y_true = np.array(y_true)
    y_pred = np.array(y_pred)

    micro_f1 = f1_score(y_true, y_pred, average="micro", zero_division=0)
    macro_f1 = f1_score(y_true, y_pred, average="macro", zero_division=0)

    CRISIS_LABELS = os.getenv("CRISIS_LABELS", "suicide,death,self-harm").split(",")
    crisis_idxs = []
    for i, vec in enumerate(y_true):
        has = False
        for c in CRISIS_LABELS:
            if c.strip() == "": continue
            if c.strip() in LABEL_LIST and vec[LABEL_LIST.index(c.strip())] == 1:
                has = True
                break
        if has:
            crisis_idxs.append(i)

    crisis_recall = None
    if crisis_idxs:
        y_true_cr = y_true[crisis_idxs].flatten()
        y_pred_cr = y_pred[crisis_idxs].flatten()
        crisis_recall = recall_score(y_true_cr, y_pred_cr, average="micro", zero_division=0)

    print("Examples evaluated:", len(y_true))
    print("Micro F1:", round(micro_f1, 4))
    print("Macro F1:", round(macro_f1, 4))
    if crisis_recall is not None:
        print("Crisis recall (micro):", round(crisis_recall, 4))
    else:
        print("Crisis labels not found or no crisis examples.")
if __name__ == "__main__":
    main()
