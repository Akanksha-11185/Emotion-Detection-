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
  }, [index, isDeleting]);

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
      gradient: "from-blue-500 to-indigo-600",

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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gradient-to-b dark:from-slate-950 dark:to-slate-900">

        {/* Background Effects */}

        <div className="relative container mx-auto px-4 pt-14 pb-28">


          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-300 dark:bg-slate-900/60 dark:border-slate-700">
              
              <span className="text-sm font-medium text-blue-400 dark:text-blue-300">


               🔒 Privacy-First • Anonymous • Research-Driven

              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-5 min-h-[10rem] leading-tight pb-2">

              {/* Static top line */}
             <span className="block text-4xl sm:text-5xl md:text-7xl leading-[1.2] pb-2 tracking-tight bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">

                 AI-Powered Emotion Understanding
              </span>
              

              {/* Animated bottom line */}
              <span className="text-slate-700 dark:text-slate-100 text-4xl md:text-5xl font-semibold">
                {typedText}
               
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "400ms" }}
            >
              Analyze emotional patterns from text using AI — designed for privacy-first mental health support.

            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-6 justify-center animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: "600ms" }}
            >
              <button
                onClick={() => navigate("/anonymous")}
                className="group px-8 py-4 bg-blue-500 hover:bg-blue-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all active:scale-95 flex items-center gap-2"
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
                className="px-8 py-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-all active:scale-95"
              >
                How It Works
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
                  className="bg-white dark:bg-slate-900 border border-blue-200 dark:border-slate-800/60 rounded-xl p-6 transition-all"

                >
                  <div className="flex items-center justify-center gap-2 text-blue-500 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-blue-500 dark:text-blue-400 mb-1"
>

                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 ">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 bg-white dark:bg-slate-950">

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4">
              Explore Our{" "}
              <span className="text-blue-400">

                Key Features
              </span>
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
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
                className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-blue-400 transition-all"


                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5   rounded-2xl transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-semibold text-slate-900 dark:text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="relative text-slate-500 mb-6 leading-relaxed">
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
       className="relative py-20 bg-white dark:bg-slate-950"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-4">


              How It{" "}
              <span className="text-blue-400">


                Works
              </span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">

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
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent -translate-x-1/2 z-0"></div>
                  )}
                  <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all">

                    {/* Step Number */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 dark:bg-gradient-to-br dark:from-blue-500 dark:to-indigo-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 dark:shadow-none">

                      {item.step}
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <div className="text-blue-500">{item.icon}</div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">

                      {item.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
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
      <section className="relative py-20 bg-slate-50 dark:bg-slate-950">


        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-500 to-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl shadow-blue-500/30">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-blue-100 mb-5 max-w-2xl mx-auto">
                Join thousands of users who trust our platform for anonymous,
                secure emotion detection.
              </p>
              <button
                onClick={() => navigate("/anonymous")}
                className="group px-8 py-4 bg-white hover:bg-slate-100 text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2 mx-auto"
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
