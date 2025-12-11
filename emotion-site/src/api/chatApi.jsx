// src/api/chatApi.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
const API_KEY = import.meta.env.VITE_API_KEY || "dev-key-change-me";

/**
 * Helper to POST JSON and return parsed JSON or throw error
 */
async function postJson(path, body, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });
    clearTimeout(timer);
    const text = await res.text().catch(() => "");
    let payload = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = text;
    }
    if (!res.ok) {
      const err = new Error(payload?.detail || `API Error (${res.status})`);
      err.status = res.status;
      err.payload = payload;
      throw err;
    }
    return payload;
  } catch (err) {
    clearTimeout(timer);
    // Normalize abort error
    if (err.name === "AbortError") {
      const e = new Error("Request timed out");
      e.status = 408;
      throw e;
    }
    throw err;
  }
}

/**
 * Calls backend emotion predict endpoint (POST /emotion/predict)
 * Returns object { preds_multi_hot, top_k, probs } or throws.
 */
export async function analyzeEmotion(text) {
  return postJson("/emotion/predict", { text });
}

/**
 * Calls backend chat reply endpoint (POST /chat/reply)
 * Backend returns shape:
 * { action: "reply"|"escalate", reply?, model?, safety?, message? }
 */
export async function getChatReply(text, session_id = null) {
  const body = { text };
  if (session_id) body.session_id = session_id;
  return postJson("/chat/reply", body, 20000);
}

/**
 * Fallback local mock (used if backend unreachable)
 */
export function mockPredictLocal(text) {
  const labels = ["joy", "sadness", "anger", "fear", "neutral"];
  const seed = (text || "").length % 10;
  const probs = labels.map((_, i) =>
    Math.max(0, Math.sin(i + seed) * 0.5 + 0.5)
  );
  const idxs = [...probs.keys()]
    .sort((a, b) => probs[b] - probs[a])
    .slice(0, 3);
  const top_k = idxs.map((i) => [labels[i], probs[i]]);
  const multi_hot = probs.map((p) => (p > 0.5 ? 1 : 0));
  return { top_k, probs, preds_multi_hot: multi_hot };
}

export function mockChatLocal(text, prediction) {
  const low = (text || "").toLowerCase();
  const crisis = ["kill myself", "i want to die", "suicide", "cant live"];
  const flagged = crisis.some((k) => low.includes(k));
  if (flagged) {
    return {
      reply:
        "I’m really sorry you feel this way. If you're in immediate danger contact your local emergency services. We've flagged this for human review.",
      flagged: true,
    };
  }
  const replies = [
    "Thanks for sharing — that sounds important. Can you tell me a bit more?",
    "I hear you. How long have you been feeling like this?",
    "That must be difficult. Do you want to explore what triggered this feeling?",
    "I’m listening — thank you for telling me.",
  ];
  const reply = replies[text.length % replies.length];
  return { reply, flagged: false, emotion: prediction };
}
