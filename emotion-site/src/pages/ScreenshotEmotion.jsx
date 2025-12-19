// src/pages/ScreenshotEmotion.jsx
import React, { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  FileText,
  Brain,
  Zap,
  AlertCircle,
  CheckCircle,
  X,
  MessageCircle,
} from "lucide-react";
import EmotionPanel from "../components/EmotionPanel";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

// Emotion badge component
function EmotionBadge({ emotion, score }) {
  const colors = {
    joy: "bg-yellow-100 text-yellow-700 border-yellow-300",
    happiness: "bg-yellow-100 text-yellow-700 border-yellow-300",
    sadness: "bg-blue-100 text-blue-700 border-blue-300",
    anger: "bg-red-100 text-red-700 border-red-300",
    fear: "bg-purple-100 text-purple-700 border-purple-300",
    neutral: "bg-slate-100 text-slate-700 border-slate-300",
    disgust: "bg-green-100 text-green-700 border-green-300",
    surprise: "bg-pink-100 text-pink-700 border-pink-300",
  };

  const emojis = {
    joy: "😊",
    happiness: "😊",
    sadness: "😢",
    anger: "😠",
    fear: "😨",
    neutral: "😐",
    disgust: "🤢",
    surprise: "😲",
  };

  const colorClass = colors[emotion?.toLowerCase()] || colors.neutral;
  const emoji = emojis[emotion?.toLowerCase()] || "🎭";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}
    >
      <span>{emoji}</span>
      <span className="capitalize">{emotion}</span>
      <span className="font-bold">{Math.round(score * 100)}%</span>
    </span>
  );
}

export default function ScreenshotEmotion() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    processFile(selected);
  };

  const processFile = (selected) => {
    if (!selected.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError("");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError("");
  };

  const analyzeScreenshot = async () => {
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${API_BASE}/vision/analyze`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Analysis failed");
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Server error. Please check if the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-20 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
            <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-400 dark:text-blue-300">
              Powered by AI
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
              Screenshot Emotion Analysis
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 dark:text-slate-400 max-w-2xl mx-auto">
            Upload a chat screenshot and let AI analyze emotions from each
            message with precision
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Upload & Preview */}
          <div className="lg:col-span-2 space-y-6">
            {!preview ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-slate-800 p-8 hover:shadow-2xl hover:border-blue-200 transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                      Upload Your Screenshot
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-500">Quick & Secure</p>
                  </div>
                </div>

                <label
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`relative block w-full cursor-pointer transition-all ${
                    dragActive
                      ? "border-blue-500 bg-blue-50 scale-[1.02]"
                      : "border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 hover:border-blue-400 hover:shadow-lg"
                  } border-3 border-dashed rounded-2xl p-12`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />

                  <div className="text-center">
                    <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <Upload className="w-10 h-10 text-blue-600" />
                    </div>

                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
                      Click to upload or drag and drop
                    </h3>
                    <p className="text-slate-600 mb-4">
                      PNG, JPG, or any image format • Max 10MB
                    </p>

                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-400 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                      <Upload className="w-5 h-5" />
                      <span>Choose an image to begin</span>
                    </div>
                  </div>
                </label>

                {error && (
                  <div className="mt-6 flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/40 border-2 border-red-200 dark:border-red-800 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-800 dark:text-red-300">{error}</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-slate-800 p-8 hover:shadow-2xl transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                        <ImageIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                          Preview
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-500">{file?.name}</p>
                      </div>
                    </div>

                    <button
                      onClick={clearFile}
                      className="p-2 hover:bg-red-50 dark:bg-red-950/40 rounded-lg transition-colors group"
                    >
                      <X className="w-5 h-5 text-slate-400 group-hover:text-red-600" />
                    </button>
                  </div>

                  <div className="relative rounded-xl overflow-hidden border-2 border-blue-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={analyzeScreenshot}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5" />
                          <span>Analyze Emotions</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={clearFile}
                      className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-semibold rounded-xl transition-all"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/40 border-2 border-red-200 dark:border-red-800 rounded-xl">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-red-800 dark:text-red-300">{error}</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Column - Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-400 dark:from-blue-600 dark:to-indigo-800 rounded-2xl shadow-xl p-8 text-white dark:text-slate-200 sticky top-24">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold mb-4">How It Works</h3>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Upload Chat Screenshot
                    </h4>
                    <p className="text-blue-100 dark:text-slate-400 text-sm">
                      Select a chat image from your device
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">AI Message Detection</h4>
                    <p className="text-blue-100 dark:text-slate-400 text-sm">
                      Extracts and analyzes each message separately
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Emotion Per Message</h4>
                    <p className="text-blue-100 dark:text-slate-400 text-sm">
                      View emotions for each individual message
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>100% Secure & Private</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
            {/* Individual Messages with Emotions */}
            {result.messages && result.messages.length > 0 && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-slate-800 p-8 hover:shadow-2xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        Messages with Emotions
                      </h2>
                      <p className="text-sm text-slate-500 dark:text-slate-500">
                        {result.message_count} messages analyzed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {result.messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border-2 border-blue-100 dark:border-slate-800 hover:border-blue-200 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-slate-700 dark:text-slate-200 flex-1">{msg.text}</p>
                        {msg.emotion &&
                          msg.emotion.top_k &&
                          msg.emotion.top_k[0] && (
                            <EmotionBadge
                              emotion={msg.emotion.top_k[0][0]}
                              score={msg.emotion.top_k[0][1]}
                            />
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extracted Text */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-slate-800 p-8 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    Extracted Text
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    AI-powered OCR results
                  </p>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border-2 border-blue-100 dark:border-slate-800">
                <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {result.extracted_text || "No text detected"}
                </pre>
              </div>
            </div>

            {/* Overall Emotion Analysis */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border-2 border-blue-100 dark:border-slate-800 p-8 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    Overall Emotion Analysis
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-500">
                    Aggregated emotions from all messages
                  </p>
                </div>
              </div>

              <EmotionPanel prediction={result.emotion} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
