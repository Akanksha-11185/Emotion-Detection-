const BASE_URL = "http://127.0.0.1:8000";

const HEADERS = {
  "Content-Type": "application/json",
  "X-API-Key": "test-key",
};

export async function fetchEscalations() {
  const res = await fetch(`${BASE_URL}/admin/escalations`, {
    headers: HEADERS,
  });

  if (!res.ok) {
    throw new Error("Failed to fetch escalations");
  }

  return res.json();
}

export async function markReviewed(id) {
  const res = await fetch(`${BASE_URL}/admin/review/${id}`, {
    method: "POST",
    headers: HEADERS,
  });

  if (!res.ok) {
    throw new Error("Failed to mark reviewed");
  }

  return res.json();
}
