// src/components/PredictionHistory.jsx
import React from "react";
import { History, TrendingUp, Trash2, RotateCcw } from "lucide-react";

export default function PredictionHistory({
  history,
  onSelectHistory,
  onClearHistory,
}) {
  const [showClearConfirm, setShowClearConfirm] = React.useState(false);

  const handleClearHistory = () => {
    if (onClearHistory) onClearHistory();
    setShowClearConfirm(false);
  };

  if (!history || history.length === 0) {
    return (
      <div className="h-full flex items-center justify-center py-12">
        <div className="text-center space-y-3">
          <History className="w-12 h-12 text-slate-400 mx-auto" />
          <p className="text-slate-500 dark:text-slate-400">
            Your conversation history will appear here
          </p>
        </div>
      </div>
    );
  }

  const getTopEmotion = (prediction) => {
    const entries = Object.entries(prediction);
    return entries.reduce((top, curr) => (curr[1] > top[1] ? curr : top));
  };

  const emotionEmojis = {
    joy: "😊",
    sadness: "😢",
    anger: "😠",
    fear: "😰",
    surprise: "😲",
    disgust: "🤢",
    neutral: "😐",
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700/50">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Prediction History
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {history.length} {history.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        {/* Clear History Button */}
        {!showClearConfirm ? (
          <button
            onClick={() => setShowClearConfirm(true)}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title="Clear history"
          >
            <Trash2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          </button>
        ) : (
          <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-2 py-1">
            <span className="text-xs text-red-600 dark:text-red-400">
              Clear all?
            </span>
            <button
              onClick={handleClearHistory}
              className="text-xs px-2 py-0.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={() => setShowClearConfirm(false)}
              className="text-xs px-2 py-0.5 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors"
            >
              No
            </button>
          </div>
        )}
      </div>

      {/* History Grid - 3 columns on large screens */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
        {[...history].reverse().map((entry) => {
          const [emotionName, emotionScore] = getTopEmotion(entry.prediction);
          return (
            <button
              key={entry.id}
              onClick={() => onSelectHistory && onSelectHistory(entry)}
              className="text-left bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700/50 hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{emotionEmojis[emotionName]}</span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">
                      {emotionName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {Math.round(emotionScore * 100)}% confidence
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">
                  {entry.timestamp.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-2">
                {entry.userMessage}
              </p>
              <div className="flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400">
                <RotateCcw className="w-3 h-3" />
                <span>Click to load conversation</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
