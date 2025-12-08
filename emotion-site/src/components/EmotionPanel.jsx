import React from "react";

function Bar({ label, value }) {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs text-slate-300">
        <span>{label}</span>
        <span>{Math.round(value * 100)}%</span>
      </div>
      <div className="h-2 bg-slate-700 rounded mt-1">
        <div
          style={{ width: `${Math.round(value * 100)}%` }}
          className="h-2 bg-emerald-400 rounded"
        ></div>
      </div>
    </div>
  );
}

export default function EmotionPanel({ prediction }) {
  if (!prediction) {
    return (
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-2">Emotion prediction</h3>
        <p className="text-slate-400 text-sm">
          Send a message to see predicted emotions here (top 5).
        </p>
      </div>
    );
  }

  const top = prediction.top_k;
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-4">Top emotions</h3>
      {top.map(([label, val]) => (
        <Bar key={label} label={label} value={val} />
      ))}
    </div>
  );
}
