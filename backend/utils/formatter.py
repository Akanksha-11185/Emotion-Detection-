# simple helper to format inference outputs if needed
def top_k_from_probs(label_list, probs, k=5):
    idxs = sorted(range(len(probs)), key=lambda i: -probs[i])[:k]
    return [(label_list[i], float(probs[i])) for i in idxs]
