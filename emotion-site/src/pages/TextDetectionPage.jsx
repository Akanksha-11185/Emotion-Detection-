// src/pages/TextDetectionPage.jsx
import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import EmotionPanel from "../components/EmotionPanel";
import PredictionHistory from "../components/PredictionHistory";
import { Brain, Lock, UserCheck, History } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TextDetectionPage() {
  const { user } = useAuth();
  const [prediction, setPrediction] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  // 🔒 Route already protected — just safety
  if (!user) return null;

  const handleHistoryUpdate = (entry) => {
    setHistory((prev) => [...prev, entry]);
  };

  const handleClearChat = () => {
    setPrediction(null);
    setSelectedHistory(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
    setSelectedHistory(null);
  };

  const handleSelectHistory = (entry) => {
    setSelectedHistory(entry);
    setPrediction(entry.prediction);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
            <UserCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-400 dark:text-blue-300">
              Logged in as {user.email}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
            Text Emotion Detection
          </h1>

          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Advanced emotion analysis from text — available exclusively for
            authenticated users.
          </p>
        </div>

        {/* Top Grid - Chat and Emotion Panel side by side */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Chat Section */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 shadow-xl shadow-blue-500/10">
            <ChatBox
              onPredict={setPrediction}
              onHistoryUpdate={handleHistoryUpdate}
              onClearChat={handleClearChat}
              selectedHistory={selectedHistory}
            />
          </div>

          {/* Emotion Panel */}
          <div className="lg:col-span-1 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 shadow-xl shadow-indigo-500/10">
            <EmotionPanel prediction={prediction} />
          </div>
        </div>

        {/* Bottom - History Panel (Full Width) */}
        <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700/50 rounded-2xl p-4 shadow-xl shadow-purple-500/10 mb-10">
          <PredictionHistory
            history={history}
            onSelectHistory={handleSelectHistory}
            onClearHistory={handleClearHistory}
          />
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700/50 backdrop-blur-sm rounded-xl p-6 bg-white dark:bg-slate-900/40 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/20">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Higher Accuracy
            </h3>
            <p className="text-sm text-slate-400">
              Logged-in users receive more accurate emotion insights with better
              contextual understanding.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700/50 backdrop-blur-sm rounded-xl p-6 bg-white dark:bg-slate-900/40 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/20">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Secure Access
            </h3>
            <p className="text-sm text-slate-400">
              This feature is protected and accessible only to authenticated
              users.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-slate-800/50 border border-blue-200 dark:border-slate-700/50 backdrop-blur-sm rounded-xl p-6 bg-white dark:bg-slate-900/40 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <History className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              Track History
            </h3>
            <p className="text-sm text-slate-400">
              View your conversation history and emotion patterns over time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
