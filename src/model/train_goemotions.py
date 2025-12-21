"""
train_goemotions.py
Starter script to fine-tune a multi-label classifier on GoEmotions-style CSVs.
Assumes CSV columns: text,labels  (labels comma-separated)
"""

from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
import numpy as np
import os
from sklearn.metrics import f1_score

MODEL_NAME = os.environ.get("MODEL_NAME", "roberta-base")
LABEL_LIST = [
    "admiration","amusement","anger","annoyance","approval","caring","confusion",
    "curiosity","desire","disappointment","disapproval","disgust","embarrassment",
    "excitement","fear","gratitude","grief","joy","love","nervousness","optimism",
    "pride","realization","relief","remorse","sadness","surprise","neutral"
]

def encode_labels(example):
    # empty labels -> neutral? keep as-is; use exact tokens present
    labels = [l.strip() for l in example["labels"].split(",") if l.strip()]
    vector = [1 if label in labels else 0 for label in LABEL_LIST]
    example["label_vec"] = vector
    return example

def prepare_dataset(train_csv, val_csv, test_csv):
    ds = load_dataset("csv", data_files={"train": train_csv, "validation": val_csv, "test": test_csv})
    ds = ds.map(encode_labels)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    def preprocess(batch):
        enc = tokenizer(batch["text"], truncation=True, padding="max_length", max_length=128)
        enc["labels"] = batch["label_vec"]
        return enc
    ds = ds.map(preprocess, batched=True)
    ds.set_format(type="torch", columns=["input_ids","attention_mask","labels"])
    return ds, tokenizer

def compute_metrics(p):
    preds = (p.predictions > 0).astype(int)
    labels = p.label_ids
    return {
        "f1_macro": f1_score(labels, preds, average="macro"),
        "f1_micro": f1_score(labels, preds, average="micro")
    }

def main():
    train_csv = "data/raw/train.csv"
    val_csv = "data/raw/val.csv"
    test_csv = "data/raw/test.csv"
    ds, tokenizer = prepare_dataset(train_csv, val_csv, test_csv)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=len(LABEL_LIST), problem_type="multi_label_classification")

    training_args = TrainingArguments(
        output_dir="models/goemotion_roberta_best",
        evaluation_strategy="epoch",
        save_strategy="epoch",
        per_device_train_batch_size=8,
        per_device_eval_batch_size=16,
        learning_rate=2e-5,
        num_train_epochs=3,
        weight_decay=0.01,
        load_best_model_at_end=True,
        metric_for_best_model="f1_macro"
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=ds["train"],
        eval_dataset=ds["validation"],
        tokenizer=tokenizer,
        compute_metrics=compute_metrics
    )

    trainer.train()
    trainer.save_model("models/goemotion_roberta_best")
    tokenizer.save_pretrained("models/goemotion_roberta_best")

if __name__ == "__main__":
    main()
