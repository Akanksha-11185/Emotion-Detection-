// src/components/Home.jsx
import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Brain,
  Shield,
  ArrowRight,
  Image as ImageIcon,
  FileText,
  Zap,
  CheckCircle,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  // -------------------------
  // Typewriter (2nd line only)
  // -------------------------
  const fullText = "Private. Anonymous. Real-time.";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 60 : 120;

    const timer = setTimeout(() => {
      if (!isDeleting && index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      } else if (isDeleting && index > 0) {
        setTypedText(fullText.slice(0, index - 1));
        setIndex(index - 1);
      } else if (!isDeleting && index === fullText.length) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [index, isDeleting, fullText]);

  // -------------------------
  // Data
  // -------------------------
  const features = [
    {
      id: 1,
      icon: <Shield className="w-8 h-8" />,
      title: "Anonymous Browsing",
      description:
        "Chat completely anonymously. No login required, no data stored. Your privacy is our priority.",
      gradient: "from-blue-500 to-blue-600",
      shadow: "hover:shadow-blue-500/50",
      link: "/anonymous",
    },
    {
      id: 2,
      icon: <FileText className="w-8 h-8" />,
      title: "Text Emotion Detection",
      description:
        "Advanced AI analyzes your text messages to detect emotions in real-time with high accuracy.",
      gradient: "from-blue-500 to-blue-600",
      shadow: "hover:shadow-indigo-500/50",
      link: "/text-detection",
    },
    {
      id: 3,
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Chat Screenshot Analysis",
      description:
        "Upload chat screenshots and our AI will analyze emotions from conversations.",
      gradient: "from-blue-500 to-blue-600",
      shadow: "hover:shadow-purple-500/50",
      link: "/screenshot-detection",
    },
  ];

  const stats = [
    {
      label: "Emotions Detected",
      value: "10,000+",
      icon: <Brain className="w-5 h-5" />,
    },
    {
      label: "Anonymous Chats",
      value: "5,000+",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      label: "Privacy First",
      value: "100%",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      label: "Accuracy Rate",
      value: "95%",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Choose Your Method",
      description:
        "Select between anonymous chat, text analysis, or screenshot detection",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      step: "02",
      title: "Share Your Feelings",
      description:
        "Type your message or upload a screenshot of your conversation",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    {
      step: "03",
      title: "Get AI Insights",
      description:
        "Receive real-time emotion analysis powered by advanced machine learning",
      icon: <Brain className="w-6 h-6" />,
    },
  ];

  // -------------------------
  // JSX
  // -------------------------
  return (
    <div className="min-h-screen bg-slate-950">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 pt-20 pb-24">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mt-4 mb-6">
              <Star className="w-4 h-4 text-blue-300" />
              <span className="text-sm text-blue-300">
                🔒 Privacy-First • Anonymous • Research-Driven
              </span>
            </div>

            {/* Heading (2 lines ONLY) */}
            <h1 className="font-bold mb-6 text-center leading-tight">
              <span className="block text-4xl sm:text-5xl md:text-7xl bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                AI-Powered Emotion Understanding
              </span>

              <span className="block mt-2 text-3xl sm:text-4xl md:text-6xl text-white whitespace-nowrap overflow-hidden">
                {typedText}
                <span className="ml-1 animate-pulse">|</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
              Analyze emotional patterns from text using AI — designed for
              privacy-first mental health support.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-6 justify-center">
              <button
                onClick={() => navigate("/anonymous")}
                className="group px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/40 hover:shadow-blue-500/70 transition-all active:scale-95 flex items-center gap-2"
              >
                Try Anonymous Chat
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all active:scale-95"
              >
                How It Works
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900 border border-slate-800/60 rounded-xl p-6 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-center justify-center gap-2 text-blue-300 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              Explore Our <span className="text-blue-300">Key Features</span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Choose the method that works best for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => navigate(feature.link)}
                className={`group bg-slate-900/60 rounded-2xl p-6 border border-slate-700/50 cursor-pointer transition-all ${feature.shadow} hover:shadow-2xl`}
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-500 mb-6">{feature.description}</p>

                <div className="flex items-center text-blue-300 font-semibold">
                  Explore <ArrowRight className="w-5 h-5 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 bg-slate-900/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
              How It <span className="text-blue-300">Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
