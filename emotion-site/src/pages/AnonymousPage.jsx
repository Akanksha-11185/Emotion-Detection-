// src/pages/AnonymousPage.jsx
import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import EmotionPanel from "../components/EmotionPanel";
import { Shield, Brain, Heart } from "lucide-react";

export default function AnonymousPage() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* Page Header */}
      <div className="container mx-auto px-4 py-6 mt-4">
        <div className="text-center mb-12">
          <div className="inline-flex justify-center items-center mt-10 dark:mt-10 gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-400 dark:text-blue-300">
              100% Anonymous & Secure
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white mb-3">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Anonymous Emotional Support
            </span>
          </h1>
          <p className="text-slate-700 dark:text-slate-400 max-w-xl mx-auto mb-4">
            A private space to express yourself. AI-assisted emotion insights, in real time.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-700 dark:text-slate-400 mt-4">
            <span className="flex items-center gap-2">🔒 No login required</span>
            <span className="flex items-center gap-2">🛡 No data stored</span>
            <span className="flex items-center gap-2">⚡ Real-time analysis</span>
          </div>
          </div>
        {/* Main Grid: Chat + Emotion Panel */}
        <div className="grid lg:grid-cols-3 gap-5 mb-8 mt-6">
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
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 backdrop-blur-sm rounded-xl p-6 dark:bg-slate-800/50 dark:border-slate-700/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/20">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              100% Private
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-400">
              Your conversations are anonymous and confidential. We never store
              identifiable information.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 backdrop-blur-sm rounded-xl p-6 dark:bg-slate-800/50 dark:border-slate-700/50 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/20">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              AI-Powered
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-400 ">
              Advanced emotion detection using state-of-the-art machine learning
              models.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 backdrop-blur-sm rounded-xl p-6 dark:bg-slate-800/50 dark:border-slate-700/50 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/20">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              Always Here
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-400">
              24/7 support whenever you need someone to talk to. Not a
              replacement for professional help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
