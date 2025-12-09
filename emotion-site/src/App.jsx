// src/App.jsx
import React, { useState } from "react";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import EmotionPanel from "./components/EmotionPanel";
import { Shield, Brain, Heart } from "lucide-react";

export default function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Main Grid: Chat + Emotion Panel */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ChatBox onPredict={setPrediction} />
          </div>

          {/* Emotion Panel - Takes 1 column */}
          <div className="lg:col-span-1">
            <EmotionPanel prediction={prediction} />
          </div>
        </div>

        {/* Info Cards Section */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl hover:border-emerald-400/40 cursor-pointer">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              100% Private
            </h3>
            <p className="text-sm text-slate-400">
              Your conversations are anonymous and confidential. We never store
              identifiable information.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl hover:border-purple-400/30 cursor-pointer">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              AI-Powered
            </h3>
            <p className="text-sm text-slate-400">
              Advanced emotion detection using state-of-the-art machine learning
              models.
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl hover:border-blue-400/30 cursor-pointer">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-100 mb-2">
              Always Here
            </h3>
            <p className="text-sm text-slate-400">
              24/7 support whenever you need someone to talk to. Not a
              replacement for professional help.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
