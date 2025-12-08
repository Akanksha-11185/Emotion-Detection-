import React from "react";

export default function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-emerald-400 flex items-center justify-center text-slate-900 font-bold">
            ES
          </div>
          <div>
            <h1 className="text-lg font-semibold">Emotion Support</h1>
            <p className="text-xs text-slate-400">
              Anonymous emotion detection & supportive chat
            </p>
          </div>
        </div>
        <nav className="text-sm text-slate-300">
          <a className="px-3" href="#how">
            How it works
          </a>
          <a className="px-3" href="#privacy">
            Privacy
          </a>
        </nav>
      </div>
    </header>
  );
}
