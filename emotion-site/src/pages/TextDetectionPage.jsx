import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import EmotionPanel from "../components/EmotionPanel";
import { Brain, Lock, UserCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function TextDetectionPage() {
  const { user } = useAuth();
  const [prediction, setPrediction] = useState(null);

  if (!user) return null; // ProtectedRoute already guards this

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full mb-4">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-300">
              Logged in as {user.email}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-white">
            Text Emotion Detection
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto">
            This feature is available only for logged-in users.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-700 rounded-2xl p-4">
            <ChatBox onPredict={setPrediction} />
          </div>

          <div className="bg-slate-900/40 border border-slate-700 rounded-2xl p-4">
            <EmotionPanel prediction={prediction} />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <InfoCard icon={<Brain />} title="Higher Accuracy" />
          <InfoCard icon={<Lock />} title="Secure Access" />
          <InfoCard icon={<UserCheck />} title="Personalized" />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title }) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="w-12 h-12 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 text-indigo-400">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400">
        Available only for authenticated users.
      </p>
    </div>
  );
}
