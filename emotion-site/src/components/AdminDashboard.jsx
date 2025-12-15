import { useEffect, useState } from "react";
import { fetchEscalations, markReviewed } from "../api/adminApi";

export default function AdminDashboard() {
  const [escalations, setEscalations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadData() {
    try {
      setLoading(true);
      const data = await fetchEscalations();
      setEscalations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleReview(id) {
    try {
      await markReviewed(id);
      setEscalations((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert("Failed to mark as reviewed");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) return <p>Loading escalations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚨 Admin Review Dashboard</h2>

      {escalations.length === 0 ? (
        <p>No pending escalations 🎉</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Severity</th>
              <th>Hashed Text</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {escalations.map((e) => (
              <tr key={e.id}>
                <td>{e.timestamp}</td>
                <td>{e.severity}</td>
                <td style={{ fontFamily: "monospace" }}>{e.text_hash}</td>
                <td>
                  <button onClick={() => handleReview(e.id)}>
                    Mark Reviewed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
