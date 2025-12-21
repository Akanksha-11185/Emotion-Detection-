// src/components/Header.jsx
import React from "react";
import { Heart, Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 bg-white dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-900 font-bold text-lg shadow-lg">
                <Heart className="w-6 h-6" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Emotion Support
              </h1>
              <p className="text-xs text-slate-400">
                AI-powered emotion detection & mental health support
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <a
              className="px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/70 rounded-lg transition-all duration-150 transform hover:-translate-y-0.5 hover:scale-[1.06] hover:shadow-lg cursor-pointer"
              href="#how"
            >
              How it works
            </a>
            <a
              className="px-4 py-2 text-sm text-slate-300 hover:text-emerald-400 hover:bg-slate-800/70 rounded-lg transition-all duration-150 transform hover:-translate-y-0.5 hover:scale-[1.06] hover:shadow-lg cursor-pointer flex items-center gap-1"
              href="#privacy"
            >
              <Shield className="w-4 h-4 inline mr-1" />
              Privacy
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
