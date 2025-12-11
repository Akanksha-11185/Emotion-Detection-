// src/components/ChatBox.jsx
import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, AlertCircle } from "lucide-react";
import {
  analyzeEmotion,
  getChatReply,
  mockChatLocal,
  mockPredictLocal,
} from "../api/chatApi";
import { v4 as uuidv4 } from "uuid";

// Typing Indicator Component
function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2 px-4 py-3 bg-slate-700/50 rounded-lg max-w-[100px] transition-all duration-200 hover:scale-105 cursor-default">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        ></div>
        <div
          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        ></div>
      </div>
    </div>
  );
}

export default function ChatBox({ onPredict = null }) {
  const [messages, setMessages] = useState([
    {
      id: "bot-start",
      who: "bot",
      text: "Hi — I'm here to listen. Tell me how you're feeling.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const messagesRef = useRef(null);
  const inputRef = useRef(null);

  // Session ID
  const [sessionId] = useState(() => {
    try {
      const s = localStorage.getItem("anon_session_id");
      if (s) return s;
      const newId = uuidv4();
      localStorage.setItem("anon_session_id", newId);
      return newId;
    } catch {
      return uuidv4();
    }
  });

  // Auto-scroll to bottom
  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Handle send message
  async function handleSend() {
    setErrorText("");
    const text = input.trim();
    if (!text) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      who: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 1) Predict emotion
      let pred;
      try {
        pred = await analyzeEmotion(text);
      } catch (err) {
        console.warn("analyzeEmotion failed, using mock:", err);
        pred = mockPredictLocal(text);
      }

      if (onPredict) {
        try {
          onPredict(pred);
        } catch {
          /* ignore */
        }
      }

      // 2) Get chat reply
      let chatReply;
      try {
        chatReply = await getChatReply(text, sessionId);
      } catch (err) {
        console.warn("getChatReply failed, using mockChatLocal:", err);
        chatReply = mockChatLocal(text, pred);
      }

      const botMsg = {
        id: `b-${Date.now()}`,
        who: "bot",
        text: chatReply.reply || "Sorry — something went wrong.",
        timestamp: new Date(),
      };

      setMessages((m) => [...m, botMsg]);

      if (chatReply.flagged) {
        setMessages((m) => [
          ...m,
          {
            id: `sys-${Date.now()}`,
            who: "system",
            text: "⚠️ Message flagged for review (human team).",
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error(err);
      setErrorText(
        "There was an error sending your message. Please try again."
      );
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col h-full min-h-[600px] bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl shadow-2xl overflow-hidden border border-slate-700/50">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-slate-900" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">
                AI Assistant
              </h3>
              <p className="text-xs text-slate-400">Here to listen & support</p>
            </div>
          </div>
          <div className="text-xs text-slate-500">
            Session: <span className="font-mono">{sessionId.slice(0, 8)}</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 overflow-auto p-5 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.who === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] flex flex-col space-y-1 ${
                m.who === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`inline-block px-4 py-3 rounded-2xl shadow-lg transition-transform transition-colors duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-2xl ${
                  m.who === "user"
                    ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-slate-900 rounded-br-md hover:brightness-105 cursor-default"
                    : m.who === "bot"
                    ? "bg-slate-700/80 backdrop-blur-sm text-slate-100 rounded-bl-md border border-slate-600/50 hover:brightness-105 cursor-pointer"
                    : "bg-yellow-600/20 text-yellow-300 border border-yellow-600/30 rounded-lg cursor-default hover:brightness-110"
                }`}
              >
                <p className="text-sm leading-relaxed break-words">{m.text}</p>
              </div>
              <span className="text-xs text-slate-500 px-1">
                {formatTime(m.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}

        {errorText && (
          <div className="flex items-center space-x-2 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <p className="text-sm text-red-400">{errorText}</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-4 py-4 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="space-y-2">
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              aria-label="Type your message"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Share how you're feeling..."
              className="flex-1 resize-none bg-slate-800 rounded-xl px-4 py-3 text-slate-100 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all placeholder:text-slate-500"
              style={{ maxHeight: "120px" }}
            />
            <button
              type="button"
              onClick={handleSend}
              className="bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-slate-900 font-semibold px-5 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 flex items-center space-x-2"
              disabled={loading || !input.trim()}
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-slate-500">
              Press{" "}
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-400">
                Enter
              </kbd>{" "}
              to send,{" "}
              <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-slate-400">
                Shift+Enter
              </kbd>{" "}
              for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
