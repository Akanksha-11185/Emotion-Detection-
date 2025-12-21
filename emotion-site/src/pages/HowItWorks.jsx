export default function HowItWorks() {
  return (
    <div className="pt-20 pb-16 bg-white dark:bg-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen">

      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent mb-5">
          How It Works
        </h1>

        <p className="text-slate-700 dark:text-slate-400 max-w-2xl mb-12">
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
              className="p-6 rounded-xl bg-blue-50 border border-blue-200 dark:bg-slate-800/40 dark:border-slate-700/50 hover:border-blue-400/40 hover:shadow-blue-500/10 transition-all"
            >
              <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-700 dark:text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
