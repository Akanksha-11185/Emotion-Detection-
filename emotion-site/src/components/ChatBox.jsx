import React, { useState, useRef } from "react";
import { mockChat, mockPredict } from "../api/mockApi";

export default function ChatBox({ onPredict }) {
  const [messages, setMessages] = useState([
    {
      who: "bot",
      text: "Hi — I’m here to listen. Tell me how you’re feeling.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  async function send(text) {
    if (!text) return;
    const user = { who: "user", text };
    setMessages((m) => [...m, user]);
    inputRef.current.value = "";
    setLoading(true);

    // 1) get emotion prediction
    const pred = await mockPredict(text);
    if (onPredict) onPredict(pred);

    // 2) get chat reply
    const reply = await mockChat(text, pred);
    setMessages((m) => [...m, { who: "bot", text: reply.reply }]);
    setLoading(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const t = inputRef.current.value.trim();
    send(t);
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 shadow-md h-[70vh] flex flex-col">
      <div className="flex-1 overflow-auto space-y-3 mb-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.who === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] ${
                m.who === "user"
                  ? "bg-emerald-400 text-slate-900"
                  : "bg-slate-700 text-slate-100"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-sm text-slate-400">Thinking...</div>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type how you feel..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 focus:outline-none"
        />
        <button className="bg-emerald-400 text-slate-900 px-4 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
