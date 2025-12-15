// emotion-site/src/api/adminApi.jsx

const BASE_URL = import.meta.env.VITE_API_BASE;
const ADMIN_KEY = import.meta.env.VITE_ADMIN_API_KEY;

const HEADERS = {
  "Content-Type": "application/json",
  "x-api-key": ADMIN_KEY, // 🔐 admin key from env
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
