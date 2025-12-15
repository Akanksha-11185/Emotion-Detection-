// src/pages/TextDetectionPage.jsx
import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import EmotionPanel from "../components/EmotionPanel";
import { Brain, Lock, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TextDetectionPage({ user }) {
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState(null);

  // 🔐 Auth guard
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; // prevents flicker

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-4">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">
              Logged in as {user.email}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Text Emotion Detection
            </span>
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Analyze emotions from text with higher accuracy. This feature is
            available only for logged-in users.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Chat Section */}
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4 shadow-xl shadow-blue-500/10">
            <ChatBox onPredict={setPrediction} />
          </div>

          {/* Emotion Panel */}
          <div className="lg:col-span-1 bg-slate-900/40 border border-slate-700/50 rounded-2xl p-4 shadow-xl shadow-indigo-500/10">
            <EmotionPanel prediction={prediction} />
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/20">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Higher Accuracy
            </h3>
            <p className="text-sm text-slate-400">
              Logged-in users get enhanced emotion analysis with better context
              handling.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/20">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Secure Access
            </h3>
            <p className="text-sm text-slate-400">
              This feature is protected and available only to authenticated
              users.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <UserCheck className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Personalized
            </h3>
            <p className="text-sm text-slate-400">
              Emotion insights can later be personalized per user account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
