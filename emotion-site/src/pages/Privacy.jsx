export default function Privacy() {
  return (
    <div className="pt-28 pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-5xl font-extrabold mb-10 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <div className="grid gap-6">
          {[
            "No user login or personal identification is required.",
            "Messages are processed temporarily and never permanently stored.",
            "All interactions are completely anonymous.",
            "Admin access is strictly restricted and monitored.",
            "This platform is not a replacement for professional mental health services.",
          ].map((text, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
            >
              <p className="text-slate-300 text-lg">{text}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-slate-400">
          Your privacy and safety are our top priorities.
        </p>
      </div>
    </div>
  );
}
