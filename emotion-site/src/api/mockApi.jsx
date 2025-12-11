const LABELS = [
  "joy",
  "sadness",
  "anger",
  "fear",
  "surprise",
  "neutral",
  "love",
  "disgust",
  "optimism",
  "annoyance",
];

function softmax(logits) {
  const ex = logits.map((l) => Math.exp(l));
  const s = ex.reduce((a, b) => a + b, 0);
  return ex.map((e) => e / s);
}

export async function mockPredict(text) {
  const seed = text.length % 10;
  const base = Array.from({ length: LABELS.length }, (_, i) =>
    Math.sin(i + seed)
  );
  const probs = softmax(base);
  const idx = [...probs.keys()].sort((a, b) => probs[b] - probs[a]).slice(0, 5);
  const top_k = idx.map((i) => [LABELS[i], probs[i]]);
  return { top_k, probs, multi_hot: probs.map((p) => (p > 0.2 ? 1 : 0)) };
}

export async function mockChat(text, prediction) {
  const crisisKeywords = ["kill myself", "i cant live", "suicide", "die"];
  const low = text.toLowerCase();
  const flagged = crisisKeywords.some((k) => low.includes(k));
  if (flagged) {
    return {
      reply:
        "I’m really sorry you’re feeling this way. If you're in immediate danger, contact emergency services. We are flagging this for human support.",
      flagged: true,
    };
  }
  return {
    reply: "Thanks for sharing — that sounds tough. Can you tell me more?",
    flagged: false,
  };
}
