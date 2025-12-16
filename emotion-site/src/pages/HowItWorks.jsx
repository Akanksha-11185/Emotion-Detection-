export default function HowItWorks() {
  return (
    <div className="pt-20 pb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-blue-400">
          How It Works
        </h1>

        <p className="text-slate-400 max-w-2xl mb-12">
          A simple, privacy-first process designed to help you understand emotions safely and anonymously.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
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
              className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-400/40 hover:shadow-blue-500/20 transition-all"
            >
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
