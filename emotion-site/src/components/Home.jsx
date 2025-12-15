// src/components/Home.jsx
import React, { useState } from "react";
import { useEffect } from "react"; // make sure this exists

import {
  MessageCircle,
  Brain,
  Shield,
  ArrowRight,
  Image as ImageIcon,
  FileText,
  Lock,
  Zap,
  CheckCircle,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Typewriter logic ONLY for bottom line

export default function Home() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  // Typewriter logic ONLY for bottom line
  const fullText = "Through AI Analysis";
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
  }, [index, isDeleting]);

  const features = [
    {
      id: 1,
      icon: <Shield className="w-8 h-8" />,
      title: "Anonymous Browsing",
      description:
        "Chat completely anonymously. No login required, no data stored. Your privacy is our priority.",
      gradient: "from-blue-400 to-cyan-500",
      shadow: "hover:shadow-blue-500/50",
      link: "/anonymous",
    },
    {
      id: 2,
      icon: <FileText className="w-8 h-8" />,
      title: "Text Emotion Detection",
      description:
        "Advanced AI analyzes your text messages to detect emotions in real-time with high accuracy.",
      gradient: "from-indigo-400 to-blue-500",
      shadow: "hover:shadow-indigo-500/50",
      link: "/text-detection",
    },
    {
      id: 3,
      icon: <ImageIcon className="w-8 h-8" />,
      title: "Chat Screenshot Analysis",
      description:
        "Upload chat screenshots and our AI will analyze emotions from conversations.",
      gradient: "from-purple-400 to-indigo-500",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative container mx-auto px-4 pt-20 pb-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-8 animate-in fade-in slide-in-from-top duration-700">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-blue-300">
                AI-Powered Emotion Detection Platform
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 min-h-[10rem] leading-tight">
              {/* Static top line */}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Understand Emotions
              </span>
              <br />

              {/* Animated bottom line */}
              <span className="text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                {typedText}
                <span className="animate-pulse ml-1">|</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "400ms" }}
            >
              Advanced machine learning technology to detect and analyze
              emotions from text, ensuring complete privacy and anonymity.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "600ms" }}
            >
              <button
                onClick={() => navigate("/anonymous")}
                className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white font-semibold rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all hover:scale-105 active:scale-95"
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "800ms" }}
            >
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-2 text-blue-400 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Key Features
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose the method that works best for you. All options ensure
              complete privacy and accurate emotion detection.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={feature.id}
                onMouseEnter={() => setHoveredCard(feature.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(feature.link)}
                className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 cursor-pointer transition-all duration-500 hover:scale-105 ${feature.shadow} hover:shadow-2xl animate-in fade-in slide-in-from-bottom`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="relative text-slate-400 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Arrow */}
                <div className="relative flex items-center text-blue-400 font-semibold group-hover:gap-2 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>

                {/* Hover Effect Border */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative py-20 bg-gradient-to-b from-transparent to-slate-900/50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Get started in three simple steps. It's fast, secure, and
              completely anonymous.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {howItWorks.map((item, idx) => (
                <div
                  key={idx}
                  className="relative group animate-in fade-in slide-in-from-bottom"
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  {/* Connector Line */}
                  {idx < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent -translate-x-1/2 z-0"></div>
                  )}

                  <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/50">
                      {item.step}
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <div className="text-blue-400">{item.icon}</div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-blue-500/50">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"></div>

            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust our platform for anonymous,
                secure emotion detection.
              </p>
              <button
                onClick={() => navigate("/anonymous")}
                className="group px-8 py-4 bg-white hover:bg-slate-100 text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
