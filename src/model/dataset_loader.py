"""
dataset_loader.py
Utility helpers to load and inspect datasets.
"""

import pandas as pd

def load_csv(path):
    return pd.read_csv(path)

def explode_labels(df, label_col="labels", sep=","):
    # returns exploded DataFrame for EDA
    df2 = df.copy()
    df2[label_col] = df2[label_col].fillna("")
    df2[label_col] = df2[label_col].apply(lambda s: [x.strip() for x in s.split(sep) if x.strip()])
    return df2.explode(label_col)
