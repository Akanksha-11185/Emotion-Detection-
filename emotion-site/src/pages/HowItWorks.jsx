export default function HowItWorks() {
  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold mb-12 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          How It Works
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Anonymous Input",
              desc: "Users interact without login or personal identification.",
            },
            {
              title: "AI Analysis",
              desc: "Text is analyzed using advanced NLP emotion models.",
            },
            {
              title: "Support & Escalation",
              desc: "High-risk cases are flagged securely for admin review.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="p-8 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-400/40 hover:shadow-xl hover:shadow-blue-500/20 transition-all"
            >
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
