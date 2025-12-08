import React, { useState } from "react";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import EmotionPanel from "./components/EmotionPanel";
import { mockPredict } from "./api/mockApi";

export default function App() {
  const [lastPrediction, setLastPrediction] = useState(null);

  async function handlePredict(text) {
    const res = await mockPredict(text);
    setLastPrediction(res);
    return res;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatBox onPredict={handlePredict} />
          </div>
          <div className="lg:col-span-1">
            <EmotionPanel prediction={lastPrediction} />
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-slate-400">
        Anonymous, privacy-first demo — do not use for clinical decisions.
      </footer>
    </div>
  );
}
