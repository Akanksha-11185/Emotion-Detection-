import { useEffect, useState } from "react";
import { fetchEscalations, markReviewed } from "../api/adminApi";

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEscalations();
  }, []);

  async function loadEscalations() {
    try {
      const data = await fetchEscalations();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleReview(id) {
    await markReviewed(id);
    setItems(items.filter(item => item.id !== id));
  }

  if (loading) return <p>Loading escalations...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚨 Admin Review Dashboard</h2>

      {items.length === 0 && <p>No pending escalations 🎉</p>}

      {items.map(item => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <p><strong>Time:</strong> {item.timestamp}</p>
          <p><strong>Severity:</strong> {item.severity}</p>
          <p><strong>Hashed Text:</strong> {item.hashed_text}</p>

          <button onClick={() => handleReview(item.id)}>
            Mark Reviewed
          </button>
        </div>
      ))}
    </div>
  );
}
