// src/components/EmotionPanel.jsx
import React from "react";
import { Brain, Zap, TrendingUp } from "lucide-react";

function EmotionBar({ label, value, index }) {
  const getEmotionColor = (emotion) => {
    const colors = {
      joy: "from-yellow-400 to-orange-400",
      happiness: "from-yellow-400 to-orange-400",
      sadness: "from-blue-400 to-indigo-500",
      anger: "from-red-400 to-rose-500",
      fear: "from-purple-400 to-violet-500",
      surprise: "from-pink-400 to-fuchsia-500",
      disgust: "from-green-400 to-emerald-500",
      neutral: "from-slate-400 to-slate-500",
    };
    return colors[emotion.toLowerCase()] || "from-emerald-400 to-teal-500";
  };

  const getEmotionIcon = (emotion) => {
    const icons = {
      joy: "😊",
      happiness: "😊",
      sadness: "😢",
      anger: "😠",
      fear: "😨",
      surprise: "😲",
      disgust: "🤢",
      neutral: "😐",
    };
    return icons[emotion.toLowerCase()] || "🎭";
  };

  return (
    <div
      className="mb-3 animate-in fade-in slide-in-from-left-2 duration-300 transition-all hover:scale-[1.01] hover:brightness-105"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex justify-between items-center text-xs text-slate-300 mb-1.5">
        <span className="flex items-center gap-2 font-medium">
          <span className="text-lg">{getEmotionIcon(label)}</span>
          <span className="capitalize">{label}</span>
        </span>
        <span className="font-semibold text-emerald-400">
          {Math.round(value * 100)}%
        </span>
      </div>
      <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/50 transition-all hover:shadow-lg hover:border-emerald-400/40 cursor-pointer">
        <div
          style={{ width: `${Math.round(value * 100)}%` }}
          className={`h-full bg-gradient-to-r ${getEmotionColor(
            label
          )} rounded-full transition-all duration-700 ease-out hover:brightness-110 shadow-sm`}
        >
          <div className="h-full w-full bg-white/10 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function EmotionPanel({ prediction }) {
  // If prediction is null/undefined, show the empty panel:
  if (!prediction) {
    return (
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-100">
            Emotion Analysis
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-slate-400 text-sm mb-2">
            Send a message to see AI-powered emotion detection
          </p>
          <p className="text-xs text-slate-500">
            Our model analyzes your text in real-time
          </p>
        </div>
      </div>
    );
  }

  // --- Defensive parsing: backend may return the model inside prediction.model
  // Accept either: prediction = { top_k, probs, preds_multi_hot } OR
  // prediction = { model: { top_k, probs, ... }, ... }
  const model = prediction.model ? prediction.model : prediction;

  // top_k might be a list of [label, score] OR something similar.
  // Normalize top_k to [{label, score}, ...]
  let topList = [];
  if (Array.isArray(model.top_k)) {
    topList = model.top_k
      .map((item) => {
        if (Array.isArray(item) && item.length >= 2) {
          return { label: String(item[0]), score: Number(item[1]) };
        }
        if (item && item.label && (item.score || item.prob)) {
          return {
            label: String(item.label),
            score: Number(item.score ?? item.prob),
          };
        }
        return null;
      })
      .filter(Boolean);
  }

  // If top_k is empty but probs + LABEL list exists, try to construct top_k
  if (topList.length === 0 && Array.isArray(model.probs)) {
    // MODEL_LABELS are not available here -- we'll use indices names as "label_X"
    topList = model.probs
      .map((p, i) => ({ label: `label_${i}`, score: Number(p) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }

  // Ensure sorted descending by score:
  topList.sort((a, b) => b.score - a.score);

  // Limit to top 5:
  const top = topList.slice(0, 5);

  const topEmotion = top[0]?.label || "neutral";
  const topValue = top[0]?.score || 0;

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center animate-pulse">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">
              Emotion Analysis
            </h3>
            <p className="text-xs text-slate-400">Top detected emotions</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400">
          <TrendingUp className="w-3 h-3" />
          <span>Live</span>
        </div>
      </div>

      {/* Primary Emotion Card */}
      <div className="mb-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer">
        <p className="text-xs text-slate-400 mb-2">Primary Emotion</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold capitalize text-slate-100">
            {topEmotion}
          </span>
          <span className="text-3xl font-bold text-emerald-400">
            {Math.round(topValue * 100)}%
          </span>
        </div>
      </div>

      {/* All Emotions */}
      <div className="space-y-1">
        {top.map((t, idx) => (
          <EmotionBar
            key={t.label}
            label={t.label}
            value={t.score}
            index={idx}
          />
        ))}
      </div>

      {/* Info Footer */}
      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <p className="text-xs text-slate-500 text-center">
          Analysis updated in real-time • Powered by ML
        </p>
      </div>
    </div>
  );
}
