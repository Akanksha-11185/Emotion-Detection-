// src/api/adminApi.jsx

const BASE_URL = "http://127.0.0.1:8000";

export async function fetchEscalations() {
  const res = await fetch(`${BASE_URL}/admin/escalations`);

  if (!res.ok) {
    throw new Error("Failed to load escalations");
  }

  return res.json();
}

export async function markReviewed(id) {
  const res = await fetch(`${BASE_URL}/admin/review/${id}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to mark reviewed");
  }

  return res.json();
}
